#

## Come aggiungere uno user

    $ useradd <nomeuser>

## aggiungere uno user ad un gruppo

    $ usermod -aG <nomegruppo> <nomeuser>

## aggiungere a vscode un remote con una porta diversa da quella di default

- apri vscode
- apri explorer remote
- accanto ad ssh c'è un `+`, cliccare
- aggiungere i dati richiesti (user@ip-addres)
- dovrebbe aprirsi un editor per editare il file `~/.ssh/config`, vicino a `SSH` nell'estensione Remote, cliccare su ⚙️
  e scegliere `/.ssh/config`

## File configuarazione

Nel file di configurazione SSH, la direttiva IdentityFile specifica il percorso della chiave privata da utilizzare per l’autenticazione.
La chiave ssh di default utilizzata per connettersi è `~/.ssh/id_rsa`, nel caso si volesse usare una chiave diversa sarà necessario:

- avere una chiave SSH aggiuntiva, nel caso contrario crearne una
- nel file `~/.ssh/confog` aggiungere `IdentityFile` e il link verso la chiave che si desidera usare

```
Host 192.168.1.254
  HostName 192.168.1.254
  User ubuntu
  Port 42
  IdentityFile ~/.ssh/id_rsa
```

> Se non esiste una chiave privata predefinita o se il server non è configurato per accettare quella chiave, la connessione fallirà. Pertanto, è generalmente una buona pratica
> specificare una IdentityFile per ogni utente nel file di configurazione SSH.

## Aggiungere gruppo alla scrittura di una cartella

Può essere necessario dare autorizzazione ad un gruppo di user di scrivere in una cartella, per farlo passare il comando:

    $ sudo chmod g+w <nomecartella>

Per effettuare i cambiamenti anche nelle sub-cartelle del target passare questo comando:

> non del tutto vero

    $ sudo chmod -R g+w <nomecartella>
