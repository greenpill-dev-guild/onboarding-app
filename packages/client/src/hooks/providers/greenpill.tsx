import { useQuery } from "@tanstack/react-query";
import { createWalletClient, custom } from 'viem';
import { HypercertClient } from "@hypercerts-org/sdk";
import { mainnet, optimism, sepolia } from 'viem/chains';
import { createContext, useContext, useState, useEffect } from "react";

import { useWeb3 } from "./web3"

export interface GreenpillDataProps {
  hypercerts: HypercertUI[];
  fetchHypercerts: () => Promise<void>;
}

type Props = {
  children: React.ReactNode;
};

const GreenpillContext = createContext<GreenpillDataProps | null>(null);

export const GreenpillProvider = ({ children }: Props) => {
  const currentValue = useContext(GreenpillContext);
  
  if (currentValue) throw new Error("GreenpillProvider can only be used once");

  const [hypercertClient, setHypercertClient] = useState<HypercertClient | null>();
  
  const { address, wallets } = useWeb3();

  const getViemWalletClient = async () => {
      await wallets[0]?.switchChain(optimism.id); // TODO: update work for multiple chains
      const ethereumProvider = await wallets[0]?.getEthereumProvider();
      const walletClient = await createWalletClient({
          account: address,
          chain: mainnet,
          transport: custom(ethereumProvider)
      });
      
      return walletClient;
  }

  const claims = await client.indexer.fractionsByOwner(owner),


  
  export const useFractionsByOwner = (owner: `0x${string}`) => {
    const {
      client: { indexer },
    } = useHypercertClient();
  
  return useQuery(
      ["hypercerts", "fractions", "owner", owner],
      () => indexer.fractionsByOwner(owner),
      { enabled: !!owner, refetchInterval: 5000 },
    );
  };

  const hypercerts: HypercertUI[] = []

  console.log("hypercerts: \n", hypercerts);

  useEffect(() => {
    getViemWalletClient().then(walletClient => {
      setHypercertClient(new HypercertClient({
        chainId: 11155111, // Sepolia testnet
        walletClient,
      }));
    })
  }, [address])

  return (
    <GreenpillContext.Provider
      value={{
        hypercerts,
        fetchHypercerts,
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
