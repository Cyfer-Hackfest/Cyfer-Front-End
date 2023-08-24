import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import ConnectWalletButton from "./ConnectWalletButton";
import { useWeb3 } from "../context/provider";

const Layout = ({ children }) => {
  const { wallet, isSignedIn } = useWeb3().web3;

  return (
    <Container maxW="90vw" paddingY="10">
      <Flex w="100%" justify="space-between" alignItems="center">
        <Heading as="h2">Guestbook</Heading>
        <ConnectWalletButton isSignedIn={isSignedIn} wallet={wallet} />
      </Flex>
      <Box my={9}>{children}</Box>
    </Container>
  );
};

export default Layout;
