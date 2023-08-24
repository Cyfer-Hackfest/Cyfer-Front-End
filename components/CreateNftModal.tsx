import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { TokenMetadata } from "../types";
import { NFTContract, Wallet } from "../utils";
import axios from "axios";
import { PINATA_JWT } from "../contants";

interface CreateNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  nftContract: NFTContract;
  wallet: Wallet;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px;
  width: 100%;
  border: solid thin blue;
`;

const Button = styled.button`
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  cursor: pointer;
  margin: 5px;

  :hover {
    background-color: blue;
  }
`;

const Title = styled.h1`
  font-size: 30px;
`;

const CreateNFTModal: React.FC<CreateNFTModalProps> = ({
  isOpen,
  onClose,
  nftContract,
  wallet,
}) => {
  const [tokenId, setTokenId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [metadata, setMetadata] = useState<TokenMetadata>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (wallet) {
      setReceiverId(wallet.accountId);
    }
  }, [wallet]);

  const handleTokenIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenId(event.target.value);
  };

  const handleReceiverIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReceiverId(event.target.value);
  };

  const handleMetadataChange = (field: keyof TokenMetadata, value: string) => {
    setMetadata((prevMetadata) => ({ ...prevMetadata, [field]: value }));
  };

  const handleSubmit = async () => {
    const rs = await nftContract.mintNft(tokenId, receiverId, metadata);

    console.log(rs);
    onClose();
  };

  const handleMediaUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files[0]; // Get the selected file
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();

    formData.append("file", file);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: PINATA_JWT,
          },
        }
      );
      handleMetadataChange("media", res.data.IpfsHash);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Work Of Art</Title>
        <Input
          type="text"
          placeholder="ID"
          value={tokenId}
          onChange={handleTokenIdChange}
        />
        <Input
          type="text"
          placeholder="Author"
          value={receiverId}
          onChange={handleReceiverIdChange}
        />
        {/* Input fields for metadata */}
        <Input
          type="text"
          placeholder="Title"
          value={metadata.title || ""}
          onChange={(e) => handleMetadataChange("title", e.target.value)}
        />

        <Input
          type="text"
          placeholder="Description"
          value={metadata.description || ""}
          onChange={(e) => handleMetadataChange("description", e.target.value)}
        />

        {!isLoading ? (
          <Input
            type="file"
            accept="image/*" // Specify the accepted file types
            onChange={handleMediaUpload}
          />
        ) : (
          <div
            style={{
              padding: "10px",
              margin: "5px",
              width: "100%",
              border: "solid thin blue",
            }}>
            Loading...
          </div>
        )}
        {metadata.media && (
          <img
            src={`https://amethyst-disabled-tyrannosaurus-478.mypinata.cloud/ipfs/${metadata.media}`}
            width={50}
            height={50}
            style={{
              margin: 5,
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}>
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: "blue",
            }}>
            POST
          </Button>
          <Button
            onClick={onClose}
            style={{
              backgroundColor: "red",
            }}>
            Cancel
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateNFTModal;
