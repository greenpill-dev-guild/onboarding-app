declare interface GenreData {
  id: GenreID;
  name: GenreName;
}

declare interface BlockData {
  blockNumber?: BigInt;
  blockTimestamp?: BigInt;
  transactionHash?: string;
}

declare interface UIData {
  image?: string;
  description?: string;
}

declare interface HypercertMetaData {
  date: string;
  image: string;
  location: string;
  description: string;
}

declare interface HypercertNFT extends BlockData {
  id: string; // Hypercert ERC-721 Address
  name: string;
  nftOwnershipRequired: boolean;
  artist: string; // Generative Artist
  organizer: string; // Live Event Organizer
  metadata: string;

  attestationNFTs?: { attestationNft: AttestationNFT }[];
}

declare interface AttestationNFT extends BlockData {
  id: string; // Attestation ERC-721 Address
  data: string; // Either url string or color hex code
  name: string;
  artist: string; // Generative Artist
  creative: string; // Musicians, Performers, Artists, etc.
}

declare interface Hypercert extends BlockData {
  id: string; // ERC-6551 Account Address
  owner?: string; // EOA Address
  contract?: string; // Hypercert ERC-721 Address
  tokenId?: number; // Hypercert Token ID

  attestations?: { attestation: Attestation }[];
}

declare interface Attestation extends BlockData {
  id: string;
  owner?: string; // Hypercert Account (ERC-6551) Address
  contract?: string; // Attestation ERC-721 Address
  tokenId?: number; // Attestation Token ID
}

declare interface HypercertUI extends HypercertNFT, Hypercert, UIData {
  account?: string; // Hypercert Account (ERC-6551) Address

  attestations?: AttestationUI[];
}

declare interface AttestationUI extends AttestationNFT, Attestation, UIData {}
