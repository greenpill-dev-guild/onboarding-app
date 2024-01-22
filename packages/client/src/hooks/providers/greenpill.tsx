import { useAccount } from "wagmi";
import { UseQueryExecute, gql, useQuery } from "urql";
import { createContext, useContext } from "react";

export interface GreenpillDataProps {
  hypercerts: HypercertUI[];
  hypercertNfts?: HypercertNFT[];
  attestationTokenMap: Map<string, Attestation>; // attestation contract => attestation data
  hypercertGreenpillMap: Map<string, string[]>; // hypercert contract => attestation contracts
  fetchHypercerts: UseQueryExecute;
  fetchHypercertNfts: UseQueryExecute;
  // fetchAttestationNfts: UseQueryExecute;
}

type Props = {
  children: React.ReactNode;
};

const GreenpillContext = createContext<GreenpillDataProps | null>(null);

const HypercertNFTsQuery = gql`
  query {
    hypercertNFTs {
      id
      nftOwnershipRequired
      artist
      organizer
      name
      blockNumber
      blockTimestamp
      transactionHash

      nftWhitelist
      artWhitelist
      attestationNFTs {
        attestationNft {
          id
          startTime
          duration
          artist
          creative
          name
          data
          blockNumber
          blockTimestamp
          transactionHash
        }
      }
    }
  }
`;

const HypercertsQuery = gql`
  query {
    hypercerts {
      id
      owner
      contract
      tokenId
      blockNumber
      blockTimestamp
      transactionHash

      attestations {
        attestation {
          id
          owner
          contract
          tokenId
          blockNumber
          blockTimestamp
          transactionHash
        }
      }
    }
  }
`;

export const GreenpillProvider = ({ children }: Props) => {
  const currentValue = useContext(GreenpillContext);

  if (currentValue) throw new Error("GreenpillProvider can only be used once");

  const { address } = useAccount();

  const [nfts, fetchHypercertNfts] = useQuery<{
    hypercertNFTs: HypercertNFT[];
  }>({
    query: HypercertNFTsQuery,
  });
  // const [attestationNfts, fetchAttestationNfts] = useQuery<{ attestationNFTs: AttestationNFT[] }>({
  //   query: AttestationNFTsQuery,
  // });
  const [tokens, fetchHypercerts] = useQuery<{ hypercerts: Hypercert[] }>({
    query: HypercertsQuery,
  });

  const attestationTokenMap: Map<string, Attestation> = new Map(); // attestation contract => attestation data
  const hypercertGreenpillMap: Map<string, string[]> = new Map(); // hypercert contract => attestation contracts
  const hypercertTokenMap: Map<string, Hypercert> | undefined =
    tokens.data?.hypercerts && tokens.data.hypercerts.length > 0
      ? tokens.data.hypercerts
          ?.filter(
            (token) => token.owner?.toLowerCase() === address?.toLowerCase(),
          )
          .reduce((acc, token) => {
            if (token.contract) {
              acc.set(token.contract, token);

              if (token.attestations) {
                token.attestations?.forEach(({ attestation }) => {
                  attestation.contract &&
                    attestationTokenMap.set(attestation.contract, attestation);
                });

                hypercertGreenpillMap.set(token.contract, [
                  ...token.attestations.map(
                    ({ attestation }) => attestation.contract ?? "",
                  ),
                ]);
              }
            }

            return acc;
          }, new Map<string, Hypercert>())
      : undefined;

  // attestationNfts.data &&
  //   attestationNfts.data.attestationNFTs.length > 0 &&
  //   attestationNfts.data.attestationNFTs.forEach((nft) => {
  //     attestationNftMap.set(nft.id, nft);
  //   });

  const hypercerts: HypercertUI[] =
    nfts.data?.hypercertNFTs && nfts.data?.hypercertNFTs.length > 0
      ? nfts.data?.hypercertNFTs.reduce<HypercertUI[]>((acc, nft) => {
          const hypercert = hypercertTokenMap && hypercertTokenMap.get(nft.id);

          const hypercertUI: HypercertUI = {
            ...nft,
          };

          if (hypercert) {
            hypercertUI.attestations = nft.attestationNFTs?.map(
              ({ attestationNft }) => {
                const attestation = attestationTokenMap.get(attestationNft.id);
                if (attestation) {
                  return {
                    ...attestation,
                    ...attestationNft,
                  };
                }

                return {
                  ...attestationNft,
                };
              },
            );

            hypercertUI.owner = hypercert.owner;
            hypercertUI.account = hypercert.id;
            hypercertUI.tokenId = hypercert.tokenId;

            return [...acc, hypercertUI];
          }

          hypercertUI.attestations =
            nft.attestationNFTs?.map(({ attestationNft }) => {
              const attestation = attestationTokenMap.get(attestationNft.id);

              if (attestation) {
                return {
                  ...attestation,
                  ...attestationNft,
                };
              }

              return {
                ...attestationNft,
              };
            }) ?? [];

          return acc;
        }, [])
      : [];

  return (
    <GreenpillContext.Provider
      value={{
        hypercerts,
        hypercertNfts: nfts.data?.hypercertNFTs ?? [],
        attestationTokenMap,
        hypercertGreenpillMap,
        fetchHypercerts,
        fetchHypercertNfts,
        // fetchAttestationNfts,
      }}
    >
      {children}
    </GreenpillContext.Provider>
  );
};

export const useGreenpill = () => {
  const value = useContext(GreenpillContext);
  if (!value) throw new Error("Must be used within a GreenpillProvider");
  return value;
};
