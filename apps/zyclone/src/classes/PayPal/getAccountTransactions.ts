import https from "https";
import dotenv from "dotenv";

dotenv.config();

const getAccountTransactions = () => {
  // Credenziali API di PayPal
  const clientId = process.env.ZYCLONE;
  const clientSecret = process.env.ZSECRET;
  console.log(clientSecret);

  // Codifica le credenziali per l'autenticazione base64
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  // Configurazione della richiesta
  const options = {
    hostname: "api.paypal.com",
    path: "/v1/reporting/transactions",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
  };

  // Effettua la richiesta
  const req = https.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      if (res.statusCode === 200) {
        const transactions = JSON.parse(data);
        console.log("Movimenti account PayPal:");
        console.log(transactions);
      } else {
        console.error(
          `Errore durante il recupero dei movimenti: ${res.statusCode}`
        );
      }
    });
  });

  req.on("error", (error) => {
    console.error(`Errore durante la richiesta: ${error}`);
  });

  req.end();
};

// Esempio di utilizzo
getAccountTransactions();
