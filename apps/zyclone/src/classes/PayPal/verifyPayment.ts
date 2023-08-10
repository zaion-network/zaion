import https from "https";

const verifyPayment = (paymentId: string) => {
  // Credenziali API di PayPal
  const clientId = "TUO_CLIENT_ID";
  const clientSecret = "TUO_CLIENT_SECRET";

  // Codifica le credenziali per l'autenticazione base64
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  // Configurazione della richiesta
  const options = {
    hostname: "api.paypal.com",
    path: `/v1/payments/payment/${paymentId}`,
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
        const payment = JSON.parse(data);
        const paymentStatus = payment.state;

        console.log(`Stato pagamento: ${paymentStatus}`);
      } else {
        console.error(
          `Errore durante la verifica del pagamento: ${res.statusCode}`
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
const paymentId = "ID_DEL_PAGAMENTO"; // Sostituisci con l'ID del pagamento effettivo
verifyPayment(paymentId);
