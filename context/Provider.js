import { createContext, useContext, useEffect, useState } from "react";
import { Contract, Wallet } from "../utils";
import { MarketContract, NFTContract } from "../utils/near-contract";
import { MARKET_CONTRACT_ID, NFT_CONTRACT_ID } from "../contants";

export const Web3Context = createContext(null);

// Simple contract set-get-greeting

function Web3Provider({ children }) {
  const [web3, setWeb3] = useState({
    wallet: null,
    nftContract: null,
    marketContract: null,
    isSignedIn: null,
    totalSupply: null,
    balance: null,
  });
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const loadProvider = async () => {
      const wallet = await new Wallet({
        createAccessKeyFor: NFT_CONTRACT_ID,
        network: "testnet",
      });
      const nftContract = await new NFTContract({
        contractId: NFT_CONTRACT_ID,
        wallet: wallet,
      });

      const marketContract = await new MarketContract({
        contractId: MARKET_CONTRACT_ID,
        wallet: wallet,
      });
      const isSignedIn = await wallet.startUp();
      const totalSupply = await nftContract.getTotalSupply();
      const balance = wallet.accountId
        ? await marketContract.getBalanceOfUser(wallet.accountId)
        : null;

      setWeb3({
        wallet,
        nftContract,
        marketContract,
        isSignedIn,
        totalSupply,
        balance,
      });
    };
    loadProvider();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, nfts, setNfts }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
