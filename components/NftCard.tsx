import React from "react";
import styled from "@emotion/styled";
import { TokenMetadata } from "../types";
import { useRouter } from "next/router";

interface NFT {
  owner_id: string;
  token_id: string;
  metadata: TokenMetadata;
  royalty: any;
  approved_account_ids: any;
}

interface NFTCardProps {
  nft: NFT;
  isOwner: boolean;
  onBuyClick: (nftId: string) => void;
}

const CardContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 30%;
`;

const Image = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-top: 8px;
  font-size: 25px;
`;

const Description = styled.h4`
  margin-top: 8px;
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
  const router = useRouter();

  console.log(nft.metadata.media);

  return (
    <CardContainer onClick={() => router.push(`/show/${nft.token_id}`)}>
      <StatusWidget>
        {!isOwner ? (
          <BuyButton onClick={() => onBuyClick(nft.token_id)}>Buy</BuyButton>
        ) : (
          <OwnerTitle>Own by You</OwnerTitle>
        )}
      </StatusWidget>

      <Image
        src={`https://amethyst-disabled-tyrannosaurus-478.mypinata.cloud/ipfs/${nft.metadata.media}`}
        alt={nft.metadata.title}
      />
      <p>by @{nft.owner_id}</p>
      <Title>{nft.metadata.title}</Title>
      <Description>{nft.metadata.description}</Description>
      {/* <Price>{nft.royalty} *</Price> */}
    </CardContainer>
  );
};

export default NFTCard;
