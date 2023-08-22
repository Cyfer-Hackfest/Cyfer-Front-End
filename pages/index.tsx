import styled from "@emotion/styled";
import { useWeb3 } from "../context/provider";
import NFTCard from "../components/NftCard";
import mockNFTs from "../data/nfts";

const NFTGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Home: React.FC = () => {
  const { wallet, contract, isSignedIn, message } = useWeb3();

  const handleBuyClick = (nftId: number) => {
    // Logic to handle buying the NFT
  };

  return (
    <NFTGrid>
      {mockNFTs.map((nft) => (
        <NFTCard
          key={nft.id}
          nft={nft}
          isOwner={nft.owner === "0x123456789abcdef"} // Replace with your logic
          onBuyClick={handleBuyClick}
        />
      ))}
    </NFTGrid>
  );
};

export default Home;
