import { TokenMetadata } from "../types";
import { Wallet } from "./near-wallet";

interface ContractParams {
  contractId: string;
  wallet: Wallet;
}

export class NFTContract {
  contractId: string;
  wallet: Wallet;

  constructor({ contractId, wallet }: ContractParams) {
    this.contractId = contractId;
    this.wallet = wallet;
  }

  async getTotalSupply() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "nft_total_supply",
    });
  }

  async getNfts(from_index = null, limit = null) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "nft_tokens",
      args: {
        from_index,
        limit,
      },
    });
  }

  async mintNft(
    token_id: string,
    receiver_id: string,
    metadata: TokenMetadata
  ) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "nft_mint",
      args: {
        token_id,
        metadata,
        receiver_id,
      },
      gas: "30000000000000",
      deposit: "100000000000000000000000", // 0.1 NEAR
    });
  }
}

export class MarketContract {
  contractId: string;
  wallet: Wallet;

  constructor({ contractId, wallet }: ContractParams) {
    this.contractId = contractId;
    this.wallet = wallet;
  }

  async buyNft(nft_contract_id: string, token_id: string, price: string) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "offer",
      args: {
        nft_contract_id,
        token_id,
      },
      gas: "30000000000000",
      deposit: price,
    });
  }

  async updatePrice() {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "",
      args: {},
    });
  }

  async removeSale() {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "",
      args: {},
    });
  }
}
