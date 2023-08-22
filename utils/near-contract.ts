import { Wallet } from "./near-wallet";

interface ContractParams {
  contractId: string;
  wallet: Wallet;
}

export class Contract {
  contractId: string;
  wallet: Wallet;

  constructor({ contractId, wallet }: ContractParams) {
    this.contractId = contractId;
    this.wallet = wallet;
  }

  async getGreeting() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_greeting",
    });
  }

  async setGreeting(message: string) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "set_greeting",
      args: {
        message: message,
      },
    });
  }
}
