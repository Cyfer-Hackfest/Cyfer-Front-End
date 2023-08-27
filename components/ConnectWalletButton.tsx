import React from "react";
import styled from "@emotion/styled";
import { useWeb3 } from "../context/provider";

interface ConnectButtonProps {
  isSignedIn: boolean | null;
  bg: string | null;
}

const ConnectWalletButton = () => {
  const { web3 } = useWeb3();

  const handleSignIn = async () => {
    if (!web3.isSignedIn) {
      await web3.wallet.signIn();
    }
  };

  const handleSignOut = async () => {
    if (web3.isSignedIn) {
      await web3.wallet.signOut();
    }
  };

  const handleDeposit = async () => {
    await web3.marketContract.storageDeposit();
  };

  return (
    <Container>
      {web3.isSignedIn && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}>
          <div>
            <Text>{web3.wallet.accountId}</Text>
            <Text>Balance: {web3.balance}</Text>
          </div>
          {web3.balance == "0" && (
            <Button bg={"blue"} isSignedIn={null} onClick={handleDeposit}>
              Deposit 1 NEAR
            </Button>
          )}
        </div>
      )}

      <Button
        bg={null}
        isSignedIn={web3.isSignedIn}
        onClick={web3.isSignedIn ? handleSignOut : handleSignIn}>
        {web3.isSignedIn ? "Disconnect" : "Connect web3.wallet"}
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
  background-color: ${(props) => (props.bg ? props.bg : "")};
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
