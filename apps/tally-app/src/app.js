let accounts;
let web3;
let vestingContract;
let provider;
let selectedNetwork = "goerli";
let balanceTokenBeneficiarioOfUser;
const withdrawBtn = document.getElementById("withdraw-btn");
const approveBtn = document.getElementById("approve-btn");
const contractAddress = "0x4A90b534C12C39c58C98b07D522BBB68A6277Cf6";
const contractAddUsdc = "0x02f8740eD9c71F17710c8DDC09cB767a6D13628B";
const contractAddTawlie = "0x1314ab5498A1238F3F95B71dd786f9541C68C1A6";

async function logAndRunThread() {
  // Se sei già connesso a MetaMask, stampa direttamente l'indirizzo
  console.log("Indirizzo del tuo account: ", accounts[0]);
  // Esegui il thread di funzioni dopo la stampa dell'indirizzo
  console.log("PARTENZA DEL TREHAD DI FUNZIONI....");
  await runThread();
}
function isMetamaskConnectedFalse() {
  console.log("l'if di isConnected è false");
}
function metamaskNotInstalled() {
  console.log("MetaMask non è installato");
}

async function metamaskFound() {
  web3 = new Web3(window.ethereum);
  // provider = new ethers.providers.Web3Provider(window.ethereum);
  vestingContract = new web3.eth.Contract(contractABI, contractAddress);

  accounts = await web3.eth.getAccounts();
  console.log("console.log =", web3);
  if (await isMetaMaskConnected()) await logAndRunThread();
  else isMetamaskConnectedFalse();
}
(async function () {
  console.log(await isMetamask());
  if (await isMetamask()) await metamaskFound();
  else metamaskNotInstalled();
})();

// CONNECTION BUTTON
function updateButtonState(connected) {
  const button = document.getElementById("connectButton");
  if (connected) {
    button.innerHTML = "Connected";
    button.disabled = true;
  } else {
    button.innerHTML = "Connetti a MetaMask";
    button.disabled = false;
  }
}

// APPROVE E PRELIEVO BUTTONS

if (withdrawBtn) {
  withdrawBtn.addEventListener("click", withdraw);
} else window.alert("no button in the dom");

if (approveBtn) {
  approveBtn.addEventListener("click", approve);
}

const confirmTx = (receipt) => {
  console.log("Transazione andata a buon fine:", receipt);
  // Aggiorna la UI qui
  location.reload(); // Esegui il refresh della pagina
};
const rejectTx = () => {
  console.log("Transaction fallita:", receipt);
};

const sendVestReleaseTx = async (vestingContract, withdrawAmount, account) => {
  return await vestingContract.methods
    .release(withdrawAmount) // Passa il valore come parametro nella chiamata al metodo release()
    .send({ from: account[0] })
    .on("transactionHash", function (hash) {
      console.log(
        "Transazione confermata dal wallet web3 e correttamente inviata alla blockchain, in attesa di conferma.... Hash:",
        hash
      );
    })
    .catch((e) => alert(e.message));
};

async function withdraw(e) {
  e.preventDefault();
  if (web3) {
    const withdrawAmountInput = document.getElementById("withdrawAmount");
    const withdrawAmount = withdrawAmountInput.value; // Ottieni il valore inserito dall'utente
    console.log("Wallet web3 in apertura... continuare su di esso...");
    let receipt = await sendVestReleaseTx(
      vestingContract,
      withdrawAmount,
      accounts
    );
    if (receipt.status) confirmTx(receipt);
    else rejectTx();
  } else alert("no web3");
}

async function approve(e) {
  e.preventDefault();
  console.log("called");
  if (web3) {
    web3 = new Web3(window.ethereum);
    const account = await web3.eth.getAccounts();
    web3.eth.defaultAccount = account[0];
    console.log(account[0]);
    console.log(web3.eth.defaultAccount);
    const tawlieContract = new web3.eth.Contract(
      contractABItawlie,
      contractAddTawlie
    );
    if (balanceTokenBeneficiarioOfUser) {
      console.log("Wallet web3 in apertura... continuare su di esso...");
      let receipt = await tawlieContract.methods
        .approve(contractAddress, balanceTokenBeneficiarioOfUser)
        .send({ from: account[0] })
        .on("transactionHash", function (hash) {
          console.log(
            "Transazione confermata dal wallet web3 e correttamente inviata alla blockchain, in attesa di conferma.... Hash:",
            hash
          );
        })
        .catch((e) => alert(e.message));
      // console.log("Transazione inviata con successo alla blockchain, in attesa di conferma...:", receipt);
      if (receipt.status) {
        console.log("Transazione andata a buon fine:", receipt);
        // Aggiorna la UI qui
        location.reload(); // Esegui il refresh della pagina
      } else {
        console.log("Transaction fallita:", receipt);
      }
    } else alert("amount not retrieved yet");
  } else alert("no web3");
}
// BALACE OF TOKEN
async function displayAccountBalance(account) {
  console.log("account balance");
  const balanceInfo = document.getElementById("balanceInfo");
  // console.log(web3);
  let balanceText = "Saldo: ";
  if (selectedNetwork === "mainnet") {
    const balance = await web3.eth.getBalance(account);
    const formattedBalance = web3.utils.fromWei(balance);
    balanceText += `${parseFloat(formattedBalance).toFixed(4)} ETH`;
  } else if (selectedNetwork === "polygon-mainnet") {
    // Replace with the contract address of the token on Polygon Mainnet
    const balance = await web3.eth.getBalance(account);
    const formattedBalance = web3.utils.fromWei(balance);
    balanceText += `${parseFloat(formattedBalance).toFixed(4)} MATIC`;
  } else if (selectedNetwork === "goerli") {
    // Replace with the contract address of the token on goerli Mainnet
    const balance = await web3.eth.getBalance(account);
    const formattedBalance = web3.utils.fromWei(balance);
    balanceText += `${parseFloat(formattedBalance).toFixed(4)} goerliETH`;
    //"dbtbbrggl" contract address and ABI of the token on Goerli
    const tokenContractAddress = "0x06192931da9ece8c3aa3c31b1e6a6684e38101fb";

    // Crea un'istanza del contratto del token "dbtbbrggl"
    const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

    // Recupera il saldo del token "dbtbbrggl" per l'indirizzo specifico
    const tokenBalance = await tokenContract.methods.balanceOf(account).call();
    balanceText += `\n\n Saldo dbtbbrggl: ${parseFloat(tokenBalance).toFixed(
      4
    )}`;
  }

  balanceInfo.innerHTML = balanceText;
}

// SmartContract
async function displayVestingData(account) {
  console.log("called display vest");
  console.log(selectedNetwork);
  if (selectedNetwork === "goerli") {
    console.log(web3);
    const vestInfos = document.getElementById("vestInfos");
    const owner_node = document.getElementById("owner");
    // const relAmount_node = document.getElementById("releaseAmount");
    const matAmount_node = document.getElementById("maturedAmount");
    const rInterval_node = document.getElementById("releaseInterval");
    // const lastReleaseTime_node = document.getElementById("lastReleaseTime");
    const balanceOfSalvadanaio_node = document.getElementById("balanceOf");
    const allowanceOfUser_node = document.getElementById("allowance");
    const balanceTokenBeneficiarioOfUser_node = document.getElementById(
      "balanceTokenBeneficiarioOfUser"
    );
    const approveAmountOfUser_node = document.getElementById("approve-amount");

    // Crea un'istanza del contratto del token di vesting su Goerli
    const vestingContract = new web3.eth.Contract(contractABI, contractAddress);
    const usdcContract = new web3.eth.Contract(
      contractABIusdc,
      contractAddUsdc
    );
    const tawlieContract = new web3.eth.Contract(
      contractABItawlie,
      contractAddTawlie
    );
    try {
      // Recupera i dati dallo smart contract
      const owner = await vestingContract.methods.owner().call();
      // const releaseAmount = await vestingContract.methods
      //   .releaseAmount()
      //   .call();
      const maturedAmount = await vestingContract.methods.matured().call();
      const releaseInterval = await vestingContract.methods
        .releaseInterval()
        .call();
      // const lastReleaseTime = await vestingContract.methods
      //   .lastReleaseTime()
      //   .call();
      const balanceOfSalvadanaio = await usdcContract.methods
        .balanceOf(contractAddress)
        .call();
      const decimalsOfUsdc = await usdcContract.methods.decimals().call();
      const allowanceOfUser = await tawlieContract.methods
        .allowance(account, contractAddress)
        .call();
      balanceTokenBeneficiarioOfUser = await tawlieContract.methods
        .balanceOf(account)
        .call();

      console.log(
        "balanceTokenBeneficiarioOfUser",
        balanceTokenBeneficiarioOfUser
      );
      const allowedBalance = balanceTokenBeneficiarioOfUser - allowanceOfUser;
      owner_node.innerText = owner;
      // relAmount_node.innerText = releaseAmount;
      matAmount_node.innerText = maturedAmount;
      rInterval_node.innerText = releaseInterval + " seconds";

      // rInterval_node.innerText = new Date(releaseInterval * 1000)
      //   .toISOString()
      //   .split("T")[1]
      //   .split(".")[0];
      // lastReleaseTime_node.innerText = new Date(
      //   lastReleaseTime * 1000
      // ).toLocaleString();
      balanceOfSalvadanaio_node.innerText =
        balanceOfSalvadanaio / 10 ** decimalsOfUsdc;
      allowanceOfUser_node.innerText = allowanceOfUser;
      approveAmountOfUser_node.innerText = allowedBalance;
      balanceTokenBeneficiarioOfUser_node.innerText =
        balanceTokenBeneficiarioOfUser;
    } catch (error) {
      console.error(error);
    }
  }
}

// NETWORK
function getChainId(network) {
  switch (network) {
    case "mainnet":
      return "0x1";
    case "ropsten":
      return "0x3";
    case "rinkeby":
      return "0x4";
    case "goerli":
      return "0x5";
    case "kovan":
      return "0x2a";
    case "polygon-mainnet":
      return "0x89";
    case "xdai-mainnet":
      return "0x64";
    default:
      return "0x1";
  }
}

async function switchNetwork() {
  const networkSelect = document.getElementById("networkSelect");
  selectedNetwork = networkSelect.value;
  if (web3 && window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: getChainId(selectedNetwork) }],
      });
      console.log("Switched to network:", selectedNetwork);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("MetaMask non è installato");
  }
}

// METAMASK WEB3 WALLETS
async function isMetamask() {
  if (typeof window.ethereum === "undefined") return false;
  else return true;
}

async function isMetaMaskConnected() {
  // Controlla, la connessione a MetaMask
  try {
    accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      console.log("Sei già connesso a MetaMask");
      console.log("Ora Parte la funzione if con isConnected");
      return true;
    } else {
      console.log("Non sei ancora connesso a MetaMask");
      return false;
    }
  } catch (error) {
    console.error(
      "Errore durante il controllo sulla presenza di una connessione precedente attiva a MetaMask:",
      error
    );
    return false;
  }
}

async function connectToMetaMask() {
  // procedi con la connessione a MetaMask al click del bottone
  try {
    console.log("Metamask, c'è e stai cliccando bottone connessione");
    console.log("In attesa di autorizzazione MetaMask...");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connessione a MetaMask completata!");
    accounts = await web3.eth.getAccounts();
    console.log("Indirizzo del tuo account: ", accounts[0]);
    await runThread();
  } catch (error) {
    console.error("Errore durante la connessione a MetaMask:", error);
  }
}

async function runThread() {
  web3 = new Web3(window.ethereum);
  try {
    // Aggiorna lo stato del pulsante
    updateButtonState(true);
    // Recupera e visualizza il saldo ETH
    displayAccountBalance(accounts[0]);
    // Puoi eseguire altre operazioni qui utilizzando web3
    await displayVestingData(accounts[0]);
    // ...
    console.log("Thread di funzioni completato");
  } catch (error) {
    console.error("Errore durante l'esecuzione del thread di funzioni:", error);
    updateButtonState(false);
  }
}
