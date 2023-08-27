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

  async approve(token_id: string, account_id: string, msg: string | null) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "nft_approve",
      args: {
        token_id,
        account_id,
        msg: `{"sale_conditions": "${msg}"}`,
      },
      gas: "30000000000000",
      deposit: "100000000000000000000000", // 0.01 NEAR
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

  async getBalanceOfUser(account_id: string) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "storage_balance_of",
      args: {
        account_id,
      },
    });
  }

  async getPaymentPerSale() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "storage_minimum_balance",
      args: {},
    });
  }

  async getSale(nft_contract_token: string) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_sale",
      args: {
        nft_contract_token,
      },
    });
  }

  async storageDeposit(deposit: string = "1000000000000000000000000") {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "storage_deposit",
      args: {},
      gas: "30000000000000",
      deposit,
    });
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

  async updatePrice(nft_contract_id: string, token_id: string, price: string) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "update_price",
      args: {
        nft_contract_id,
        token_id,
        price,
      },
      gas: "30000000000000",
      deposit: "1", // 0.01 NEAR
    });
  }

  async removeSale(nft_contract_id: string, token_id: string) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "remove_sale",
      args: {
        nft_contract_id,
        token_id,
      },
      gas: "30000000000000",
      deposit: "1", // 0.01 NEAR
    });
  }
}
