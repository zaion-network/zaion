# Creare una chiave asimmetrica secp256k1 condivisa utilizzando OpenSSL e il metodo Diffie-Hellman.

Ecco i passaggi:

## 1 Genera i parametri della curva ellittica:

Generare i parametri della curva ellittica

```sh
openssl ecparam -name secp256k1 -out params.pem
```

## 2 Generare le singole coppie di chiavi per ogni utente

### Generare chiave privata

Ogni utente deve generare la propria coppia di chiavi utilizzando i parametri della curva ellittica. Ad esempio, per l’utente 1:

```sh
openssl ecparam -in params.pem -genkey -noout -out ec_key1.pem
```

### Generare chiave pubblica

Ogni utente deve poi estrarre la chiave pubblica dalla propria chiave privata. Ad esempio, per l’utente 1:

```sh
openssl ec -in ec_key1.pem -pubout -out ec_pub1.pem
```

## 3 Scambiarsi le chiavi pubbliche

Gli utenti devono quindi scambiarsi le chiavi pubbliche. Questo può essere fatto attraverso qualsiasi canale, poiché le chiavi pubbliche possono essere condivise liberamente.

## 4 Generare la chiave segreta condivisa

Dopo aver ricevuto la chiave pubblica degli altri utenti, ogni utente può generare la chiave segreta condivisa. Ad esempio, l’utente 1 può fare così:

```sh
openssl pkeyutl -derive -inkey ec_key1.pem -peerkey ec_pub2.pem -out secret1.bin
openssl pkeyutl -derive -inkey ec_key1.pem -peerkey ec_pub3.pem -out secret2.bin
```

# Firmare un messaggio con la chiave condivisa

```sh
openssl dgst -sha256 -sign private_key.pem -out signature.sig message.txt
```

In questo esempio, private_key.pem è il file che contiene la tua chiave privata, message.txt è il file che contiene il messaggio che vuoi firmare e signature.sig è il file in cui verrà salvata la firma1.

Ricorda che dovresti mantenere la tua chiave privata in un luogo sicuro e non condividerla con nessuno. Chiunque abbia accesso alla tua chiave privata può firmare messaggi come se fossero tu.
