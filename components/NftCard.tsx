import React from "react";
import styled from "@emotion/styled";

interface NFT {
  id: number;
  name: string;
  image: string;
  owner: string;
  price: number;
}

interface NFTCardProps {
  nft: NFT;
  isOwner: boolean;
  onBuyClick: (nftId: number) => void;
}

const CardContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 300px;
`;

const Image = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin-top: 8px;
`;

const Price = styled.p`
  font-weight: bold;
`;

const BuyButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;

  :hover {
    background-color: blue;
  }
`;

const StatusWidget = styled.div`
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
`;

const OwnerTitle = styled.p`
  padding: 8px 12px;
  font-weight: bold;
`;

const NFTCard: React.FC<NFTCardProps> = ({ nft, isOwner, onBuyClick }) => {
  return (
    <CardContainer>
      <StatusWidget>
        {!isOwner ? (
          <BuyButton onClick={() => onBuyClick(nft.id)}>Buy</BuyButton>
        ) : (
          <OwnerTitle>Own by You</OwnerTitle>
        )}
      </StatusWidget>
      <Image src={nft.image} alt={nft.name} />
      <Title>{nft.name}</Title>
      <Price>{nft.price} ETH</Price>
    </CardContainer>
  );
};

export default NFTCard;
