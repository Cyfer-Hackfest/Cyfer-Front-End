import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import ConnectWalletButton from "./ConnectWalletButton";
import { useWeb3 } from "../context/provider";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <Container maxW="90vw" paddingY="10">
      <Flex w="100%" justify="space-between" alignItems="center">
        <Heading as="h2" onClick={() => router.push("/")}>
          Gallery
        </Heading>
        <ConnectWalletButton />
      </Flex>
      <Box my={9}>{children}</Box>
    </Container>
  );
};

export default Layout;
