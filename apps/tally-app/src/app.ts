interface Web3 {
  getChainId(network: any): app.chainIds;
}
interface Contract {
  sendVestReleaseTx: (
    vestingContract: any,
    withdrawAmount: any,
    account: any
  ) => Promise<any>;
}
interface Provider {}
interface HTMLElement {}
interface UI {
  withdraw(e: any): Promise<void>;
  approve(e: any): Promise<void>;
  updateButtonState(connected: any): void;
  confirmTx: (receipt: any) => void;
  rejectTx: () => void;
}

interface Logs {
  isMetamaskConnectedFalse(): void;
  metamaskNotInstalled(): void;
}

interface Context<
  A extends string[] | never[] | undefined,
  M extends boolean | undefined,
  U extends boolean | undefined,
  W extends Web3 | undefined,
  VC extends Contract | undefined,
  UBT extends number | 0,
  H extends HTMLElement | null,
  L extends boolean
> {
  accounts: A;
  isMetamask: M;
  isUserConnected: U;
  web3: W;
  vestingContract: VC;
  selectedNetwork: app.selecteNetworks;
  balanceTokenBeneficiarioOfUser: UBT;

  withdrawBtn: H;
  approveBtn: H;
  button: H;

  contractAddress: string;
  contractAddUsdc: string;
  contractAddTawlie: string;

  loaded: L;

  ui: UI;
  logs: Logs;
}

interface UndefinedMetamask
  extends Context<
    undefined,
    undefined,
    undefined,
    Web3,
    undefined,
    0,
    HTMLElement,
    true
  > {
  checkIsMetamask(): Promise<boolean>; // former isMetamask()
}

interface HasMetamasUndefinedConnetionState
  extends Context<
    undefined,
    true,
    undefined,
    Web3,
    undefined,
    0,
    HTMLElement,
    true
  > {
  metamaskFound(): Promise<void>;
  isMetaMaskConnected(): Promise<boolean>;
}

interface HasMetamasNotConnetedState
  extends Context<never[], true, false, Web3, undefined, 0, HTMLElement, true> {
  connectToMetaMask(): Promise<void>;
}

interface UserConnectedState
  extends Context<
    string[],
    true,
    true,
    Web3,
    Contract,
    number,
    HTMLElement,
    true
  > {
  displayAccountBalance(account: any): Promise<void>;
  displayVestingData(account: any): Promise<void>;
  switchNetwork(): Promise<void>;
  logAndRunThread(): Promise<void>;
  runThread(): Promise<void>;
}

interface app {
  start(): void;
}
namespace app {
  export enum selecteNetworks {
    mainnet = "mainnet",
    goerli = "goerli",
  }
  export enum chainIds {
    "0x1" = "0x1",
    "0x3" = "0x3",
    "0x4" = "0x4",
    "0x5" = "0x5",
    "0x2a" = "0x2a",
    "0x89" = "0x89",
    "0x64" = "0x64",
  }
}
