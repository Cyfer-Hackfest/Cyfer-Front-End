import React from "react";
import { Wallet } from "../utils"; // Replace with the actual import path
import styled from "@emotion/styled";

interface ConnectButtonProps {
  isSignedIn: boolean;
}

interface ConnectWalletButtonProps {
  isSignedIn: boolean;
  wallet: Wallet;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  isSignedIn,
  wallet,
}) => {
  const handleSignIn = async () => {
    if (!isSignedIn) {
      await wallet.signIn();
    }
  };

  const handleSignOut = async () => {
    if (isSignedIn) {
      await wallet.signOut();
    }
  };

  return (
    <Container>
      {isSignedIn && <Text>{wallet.accountId}</Text>}

      <Button
        isSignedIn={isSignedIn}
        onClick={isSignedIn ? handleSignOut : handleSignIn}>
        {isSignedIn ? "Disconnect" : "Connect Wallet"}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.p`
  margin-right: 10px;
`;

const Button = styled.button<ConnectButtonProps>`
  padding: 10px 20px;
  background-color: ${(props) => (props.isSignedIn ? "#E63946" : "#2ECC40")};
  color: #ffffff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isSignedIn ? "#b0363d" : "#29a738")};
  }
`;

export default ConnectWalletButton;
