export interface Base64VecU8 {
  // Define the structure of Base64VecU8 if it's not already defined
  // It could be something like { data: string }
}

export interface TokenMetadata {
  title?: string;
  description?: string;
  media?: string;
  media_hash?: Base64VecU8 | null;
  copies?: number | null;
  issued_at?: number | null;
  expires_at?: number | null;
  starts_at?: number | null;
  updated_at?: number | null;
  extra?: string;
  reference?: string;
  reference_hash?: Base64VecU8 | null;
}

// Example usage:
const metadata: TokenMetadata = {
  title: "Arch Nemesis: Mail Carrier",
  description: "A fearsome mail carrier NFT",
  media: "https://example.com/nft-media",
  media_hash: {
    // Define the structure for Base64VecU8 here
  },
  copies: 10,
  issued_at: Date.now(),
  expires_at: Date.now() + 86400000, // One day from now
  starts_at: Date.now(),
  updated_at: Date.now(),
  extra: JSON.stringify({ key: "value" }),
  reference: "https://example.com/nft-reference",
  reference_hash: {
    // Define the structure for Base64VecU8 here
  },
};
