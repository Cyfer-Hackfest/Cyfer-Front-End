import * as React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { NFT, TokenMetadata } from "../types";
import { useWeb3 } from "../context/provider";
import { MARKET_CONTRACT_ID, NFT_CONTRACT_ID } from "../contants";

interface ShowNftModalProps {
  nft: NFT;
  onClose: () => void;
  sale: any;
}

const ContainerOverlay = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  border: 1px solid #ccc;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 600px;
  margin: 0 auto;
`;

const ArtImage = styled.img`
  height: 300px;
  width: auto;
  margin-bottom: 10px;
`;

const ArtTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const ArtDescription = styled.p`
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px 15px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  text-align: center;
  background-color: ${(props) => props.color || "#007bff"};
  color: white;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export default function ShowNftModal(props: ShowNftModalProps) {
  const { marketContract, nftContract, wallet, balance } = useWeb3().web3;

  const [isModalOpen, setIsModalOpen] = React.useState(false); // State to manage modal open/close
  const [updatedPrice, setUpdatedPrice] = React.useState<string>(
    props.sale?.sale_conditions ?? null
  ); // State to hold updated price
  const [isSaling, setIsSaling] = React.useState<boolean>(false);

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaleClick = () => {
    nftContract.approve(props.nft.token_id, MARKET_CONTRACT_ID, updatedPrice);
  };

  const handleBuyClick = async () => {
    !wallet.accountId
      ? await wallet.signIn()
      : await marketContract.buyNft(
          NFT_CONTRACT_ID,
          props.nft.token_id,
          props.sale?.sale_conditions
        );
  };

  const handleRemoveClick = () => {
    marketContract.removeSale(NFT_CONTRACT_ID, props.nft.token_id);
  };

  const handleUpdatePrice = () => {
    handleModalClose();
    marketContract.updatePrice(
      NFT_CONTRACT_ID,
      props.nft.token_id,
      updatedPrice
    );
  };

  console.log(props.sale);

  return (
    <ContainerOverlay onClick={props.onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <ArtImage
          src={`https://gateway.pinata.cloud/ipfs/${props.nft.metadata.media}`}
          alt={props.nft.metadata.title}
        />
        <ArtTitle>{props.nft.metadata.title}</ArtTitle>
        <p>By {props.nft.owner_id}</p>
        <ArtDescription>{props.nft.metadata.description}</ArtDescription>
        {props.sale?.sale_conditions && (
          <p>Price: {props.sale?.sale_conditions}</p>
        )}
        <ButtonContainer>
          {wallet.accountId === props.nft.owner_id ? (
            props.sale ? (
              <>
                <Button color="red" onClick={handleRemoveClick}>
                  Remove
                </Button>
                <Button
                  color="blue"
                  onClick={() => {
                    handleShowModal();
                    setIsSaling(false);
                  }}>
                  Update
                </Button>
              </>
            ) : (
              <>
                {balance == "0" ? (
                  <div>
                    <p style={{ color: "red" }}>
                      Your balance is not enough, please deposit first
                    </p>
                    <Button
                      color="blue"
                      onClick={async () => {
                        await marketContract.storageDeposit();
                      }}>
                      Deposit
                    </Button>
                  </div>
                ) : (
                  <Button
                    color="blue"
                    onClick={() => {
                      handleShowModal();
                      setIsSaling(true);
                    }}>
                    Sale
                  </Button>
                )}
              </>
            )
          ) : props.sale ? (
            <Button color="#28a745" onClick={handleBuyClick}>
              Buy
            </Button>
          ) : (
            ""
          )}
        </ButtonContainer>

        {/* modal */}
        {isModalOpen && (
          <ModalOverlay onClick={handleModalClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <p>Price:</p>
              <input
                style={{
                  width: "100%",
                  marginBottom: 5,
                  marginTop: 5,
                  height: 50,
                  border: "solid thin black",
                  padding: 5,
                }}
                type="text"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
              />
              {isSaling ? (
                <Button color="#28a745" onClick={handleSaleClick}>
                  Confirm
                </Button>
              ) : (
                <Button color="#28a745" onClick={handleUpdatePrice}>
                  Confirm
                </Button>
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </ContainerOverlay>
  );
}
