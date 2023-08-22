interface NFT {
  id: number;
  owner: string;
  image: string;
  name: string;
  price: number;
}

const mockNFTs: NFT[] = [
  {
    id: 1,
    owner: "0x123456789abcdef",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg",
    name: "Cool NFT 1",
    price: 0.1,
  },
  {
    id: 2,
    owner: "0x987654321fedcba",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg",
    name: "Awesome NFT 2",
    price: 0.2,
  },
  {
    id: 3,
    owner: "0xfedcba987654321",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg",
    name: "Amazing NFT 3",
    price: 0.3,
  },
  {
    id: 4,
    owner: "0xfedcba9876543212",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg",
    name: "Amazing NFT 3",
    price: 0.3,
  },
  {
    id: 5,
    owner: "0xfedcba9876543213",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg",
    name: "Amazing NFT 3",
    price: 0.3,
  },
  {
    id: 6,
    owner: "0xfedcba987654321",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg",
    name: "Amazing NFT 3",
    price: 0.3,
  },
  // Add more mock NFT data here...
];

export default mockNFTs;
