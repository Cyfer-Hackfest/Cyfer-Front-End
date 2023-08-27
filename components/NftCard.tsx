import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { NFT, TokenMetadata } from "../types";
import { useRouter } from "next/router";
import { useWeb3 } from "../context/provider";
import { NFT_CONTRACT_ID } from "../contants";

interface NFTCardProps {
  nft: NFT;
  isOwner: boolean;
  onBuyClick: (nftId: string) => void;
  setNftToShow: (nft: NFT, sale: any) => void;
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

const StatusWidget = styled.div`
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
`;

const IsOwner = styled.div`
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
`;

const OwnerTitle = styled.p`
  padding: 8px 12px;
  font-weight: bold;
`;

const NFTCard: React.FC<NFTCardProps> = ({
  nft,
  isOwner,
  onBuyClick,
  setNftToShow,
}) => {
  const { marketContract } = useWeb3().web3;
  const [isSaling, setIsSaling] = useState<boolean>(false);
  const [sale, setSale] = useState<any>(null);

  useEffect(() => {
    const checkIsSale = async () => {
      const rs = await marketContract.getSale(
        `${NFT_CONTRACT_ID}.${nft.token_id}`
      );
      setSale(rs);

      if (rs != null) {
        setIsSaling(true);
      }
    };

    checkIsSale();
  }, []);

  return (
    <CardContainer onClick={() => setNftToShow(nft, sale)}>
      <IsOwner>{isOwner && <OwnerTitle>Own by You</OwnerTitle>}</IsOwner>

      <StatusWidget>
        {isSaling && <OwnerTitle>On Sale</OwnerTitle>}
      </StatusWidget>

      <Image
        src={`https://gateway.pinata.cloud/ipfs/${nft.metadata.media}`}
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
