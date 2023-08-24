import { providers } from "near-api-js";
import "@near-wallet-selector/modal-ui/styles.css";
import { setupModal } from "@near-wallet-selector/modal-ui";
import {
  setupWalletSelector,
  NetworkId,
  Network,
  WalletSelector,
  Wallet as WalletBrowser,
} from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { CodeResult } from "near-api-js/lib/providers/provider";

const THIRTY_TGAS = "30000000000000";
const NO_DEPOSIT = "0";

interface WalletOptions {
  network: NetworkId | Network;
  modules: any[]; // Add proper type for modules
  createAccessKeyFor: string;
}

export class Wallet {
  walletSelector: WalletSelector;
  wallet: WalletBrowser;
  network: NetworkId | Network;
  createAccessKeyFor: string | undefined;
  accountId: string | null;

  constructor({
    createAccessKeyFor = undefined,
    network = "testnet",
  }: WalletOptions) {
    this.createAccessKeyFor = createAccessKeyFor;
    this.network = network;
  }

  async startUp(): Promise<boolean> {
    this.walletSelector = await setupWalletSelector({
      network: this.network,
      modules: [setupMyNearWallet()],
    });

    const isSignedIn = this.walletSelector.isSignedIn();

    if (isSignedIn) {
      this.wallet = await this.walletSelector.wallet();
      this.accountId =
        this.walletSelector.store.getState().accounts[0].accountId;
    }

    return isSignedIn;
  }

  signIn(): void {
    const description = "Please select a wallet to sign in.";
    const modal = setupModal(this.walletSelector, {
      contractId: this.createAccessKeyFor,
      description,
    });
    modal.show();
  }

  signOut(): void {
    this.wallet.signOut();
    this.wallet = null;
    this.accountId = null;
    this.createAccessKeyFor = null;
    window.location.replace(window.location.origin + window.location.pathname);
  }

  async viewMethod({ contractId, method, args = {} }: any): Promise<any> {
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const res: CodeResult = await provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });

    return JSON.parse(Buffer.from(res.result).toString());
  }

  async callMethod({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }: any): Promise<any> {
    console.log({
      methodName: method,
      args,
      gas,
      deposit,
    });

    return await this.wallet.signAndSendTransaction({
      signerId: this.accountId!,
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });
  }

  async getTransactionResult(txhash: string): Promise<any> {
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const transaction = await provider.txStatus(txhash, "unused");
    return providers.getTransactionLastResult(transaction);
  }
}
