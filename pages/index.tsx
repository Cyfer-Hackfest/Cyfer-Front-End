import styled from "@emotion/styled";
import { useWeb3 } from "../context/provider";
import NFTCard from "../components/NftCard";
import mockNFTs from "../data/nfts";
import { useEffect, useState } from "react";
import CreateNFTModal from "../components/CreateNftModal";
import { NFT_EACH_PAGE } from "../contants";

const NFTGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  cursor: pointer;

  :hover {
    background-color: purple;
  }
`;

const PaginateButton = styled.button`
  background-color: blue;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  cursor: pointer;
  width: fit-content;

  :hover {
    background-color: red;
  }
`;

const Home: React.FC = () => {
  const { web3, nfts, setNfts } = useWeb3();
  const { wallet, nftContract, isSignedIn, totalSupply } = web3;

  const [showCreateNftModal, setShowCreateNftModal] = useState<boolean>(false);
  const [numberOfPagination, setNumberOfPagination] = useState<number>(1);
  const [currentPageNum, setCurrentPageNum] = useState<number>(0);

  useEffect(() => {
    setNumberOfPagination(Math.ceil(totalSupply / NFT_EACH_PAGE));
  }, [totalSupply]);

  useEffect(() => {
    const getNftByPagination = async () => {
      if (nftContract) {
        const from_index = NFT_EACH_PAGE * currentPageNum;
        const _nfts = await nftContract.getNfts(
          from_index.toString(),
          NFT_EACH_PAGE
        );

        setNfts(_nfts);
      }
    };

    getNftByPagination();
  }, [currentPageNum, nftContract]);

  const handleBuyClick = (nftId: string) => {
    // Logic to handle buying the NFT
  };

  return (
    <div>
      <Button
        onClick={() => {
          setShowCreateNftModal(true);
        }}>
        Post
      </Button>
      <NFTGrid>
        {nfts &&
          nfts.map((nft) => (
            <NFTCard
              key={nft.token_id}
              nft={nft}
              isOwner={nft.owner_id === wallet.accountId} // Replace with your logic
              onBuyClick={handleBuyClick}
            />
          ))}
      </NFTGrid>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}>
        {Array(numberOfPagination)
          .fill()
          .map((_, index) => (
            <PaginateButton
              style={{
                backgroundColor: `${currentPageNum == index ? "red" : ""}`,
              }}
              onClick={() => setCurrentPageNum(index)}>
              {index + 1}
            </PaginateButton>
          ))}
      </div>
      <CreateNFTModal
        isOpen={showCreateNftModal}
        onClose={() => {
          setShowCreateNftModal(false);
        }}
        nftContract={nftContract}
        wallet={wallet}
      />
    </div>
  );
};

export default Home;
