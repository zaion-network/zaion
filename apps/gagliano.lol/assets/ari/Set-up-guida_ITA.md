# CONFIGURAZIONE SERVER

# INDICE

- [UBUNTU UPDATE UPGRADE](#ubuntu-update-upgrade)
- [CONFIGURARE UN INDIRIZZO IP STATICO](#configurare-un-indirizzo-ip-statico)
- [AUTOLOGIN](#autologin)
- [CONNESSIONE SSH](#connessione-ssh)
  - [Prerequisiti](#prerequisiti)
    - [UFW](#ufw)
  - [Abilitazione](#abilitazione)
  - [Connessione tramite pc](#connessione-tramite-pc)
- [BACKUP DELLA SD](#backup-della-sd)
- [ERRORE RIAVVIO UBUNTU](#errore-riavvio-ubuntu)
- [DOCKERFILE](#dockerfile)
- [KUBERNETES](#kubernetes)
- [COMMAND LINE](#command-line)
  - [SUDO](#sudo)
  - [NANO EDITOR](#nano-editor)

# UBUNTU UPDATE E UPGRADE

> Questa guida fornisce una serie di comandi da utilizzare per effettuare l'aggiornamento e l'upgrade del sistema operativo Ubuntu.

Ripuliamo la cache locale dei pacchetti:

```
sudo apt-get clean
```

Successivamente dobbiamo scaricare la lista aggiornata dei pacchetti e delle nuove versioni disponibili nei repository. Questo comando si limita a recuperare informazioni, ma, in concreto, non installa nulla:

```
sudo apt-get update
```

Questo è il comando principale, poiché scarica ed installa le ultime versioni dei pacchetti, delle dipendenze ed, eventualmente, il kernel più recente. In ogni caso, non esegue mai l’avanzamento di versione:

```
sudo apt-get dist-upgrade -y
```

In questo caso, invece se necessario, si esegue l’avanzamento di versione, passando alla release di Ubuntu successiva:

```
sudo do-release-upgrade
```

Infine, puoi rimuove tutti i pacchetti obsoleti e non più necessari:

```
sudo apt-get autoremove -y
```

# CONFIGURARE UN INDIRIZZO IP STATICO

Per impostare manualmente l'indirizzo IP della scheda di rete Ethernet del tuo Raspberry Pi 4, puoi accedere al file di configurazione network-config sulla scheda SD del tuo Raspberry Pi 4 da un PC Windows seguendo questi passaggi:

- Inserisci la scheda SD nel PC.
- Apri Esplora file e individua la scheda SD.
- Vai alla cartella in cui si trova il file di configurazione network-config.

  > Il file network-config è un file di configurazione per la scheda di rete del Raspberry Pi che viene utilizzato per impostare l'indirizzo IP e altre opzioni di rete. Questo file utilizza una specifica sintassi ed è eseguito all'avvio del sistema.

- Fai clic destro sul file e seleziona "Apri con" e scegli un editor di testo come Notepad o WordPad.
  Se stai usando Ubuntu dovresti vedere quanto segue:

```
# This file contains a netpan-compatible configuration wich cloud-init
# will apply on firt-boot. Please refer to the cloud-init documentation and
# the netplan reference for full details:
#
# https://cloudinit.readthedocs.io/
# https://netplan.io/reference
#
# Some additional examples are commented out below

version: 2
ethernets:
  eth0:
    dhcp4: true
    optional: true
#wifis:
#  wlan0:
#       dhcp4: true
#       optional: true
#       access-points:
#         myhomewifi:
#           password: "S3kr1t"
#         myworkwifi:
#           password: "correct battery horse staple"
#         workssid:
#           auth:
#             key-management: eap
#             method: peap
#             identity: "me@example.com"
#             password: "passw0rd"
#             ca-certificate: /etc/my_ca.pem
```

- Adattiamo ora il network alla tua connessione di rete desiderata; dovresti vedere che dhcph4 è impostato su "true", ma per configurare un indirizzo IP statico è necessario rimuovere oppure modificare la riga dhcp4. Modifica il file inserendo le seguenti righe per impostare corretamente l'indirizzo IP statico:

```
#[...]
#
# Some additional examples are commented out below

version: 2
ethernets:
    eth0:
        dhcp4: no
        addresses:
[192.168.1.254/24]
        gateway4: 192.168.1.1
        nameservers:
            addresses:
[8.8.8.8, 8.8.4.4]
optional: true
#wifis:
#  wlan0:
#       dhcp4: true
#       optional: true
#[...]
```

In questo esempio, l'indirizzo IP statico è impostato su 192.168.1.254 con una subnet mask di /24, il gateway predefinito è impostato su 192.168.1.1 e i server DNS di Google sono utilizzati come risolutori DNS.
Si noti che "dhcp4" indica che il protocollo di configurazione dinamica degli host (DHCP) non viene utilizzato per ottenere l'indirizzo IP dinamicamente, ma viene invece impostato manualmente con l'opzione "addresses".

- Salva le modifiche e chiudi il file di configurazione.
  > È importante salvare il file con il nome "network-config" nella directory principale della scheda SD, poiché questo è il nome del file utilizzato dal sistema operativo Raspberry Pi per leggere le impostazioni di rete durante l'avvio

## Notes:

La parte "nameservers: addresses: [8.8.8.8, 8.8.4.4]" indica che i server DNS di Google sono stati impostati come risolutori DNS per il Raspberry Pi. Quando un dispositivo si connette a Internet, utilizza un risolutore DNS per tradurre i nomi di dominio (ad esempio www.google.com) in corrispondenti indirizzi IP che identificano i server web. In questo caso, i due indirizzi IP specificati (8.8.8.8 e 8.8.4.4) appartengono ai server DNS di Google. In altre parole, il Raspberry Pi utilizzerà questi server per risolvere i nomi di dominio in indirizzi IP quando necessario. Altri risolutori DNS possono essere utilizzati se necessario modificando i valori dell'opzione "addresses".

> Ci sono molti altri risolutori DNS oltre a quelli di Google che possono essere utilizzati. Alcuni esempi sono:
>
> - OpenDNS (208.67.222.222, 208.67.220.220)
> - Cloudflare DNS (1.1.1.1, 1.0.0.1)
> - Quad9 (9.9.9.9, 149.112.112.112)
> - Level3 DNS (4.2.2.1, 4.2.2.2)

Tuttavia, la scelta del risolutore DNS da utilizzare dipende dalle esigenze e dalla posizione geografica. Si consiglia di effettuare una ricerca online per trovare il risolutore DNS che meglio soddisfa le proprie esigenze.

# AUTOLOGIN

Eseguendo i seguenti comandi andremo a creare una cartella ed un file in una directory specifica nel sistema operativo Linux, per consentirci di configurare l'accesso automatico dell'utente "ubuntu" sulla tty1 del sistema.

Navighiamo nel percorso `/etc/systemd/system`:

```
$ cd /etc/systemd/system
```

Adesso all'inetno di system creiamo una cartella denominata : `getty@tty1.service`.d:

```
$ mkdir getty@tty1.service.d
```

Navighiamo all'interno della cartella appena creata :

```
$ cd getty@tty1.service.d
```

Aquesto punto creiamo un file chiamto `autologin.conf` :

```
$ touch autologin.conf
```

Scriviamo all'interno del file:

```
[Service]
ExecStart=
ExecStart=-/sbin/agetty -o '-p -f -- \\u' --noclear --autologin ubuntu - $TERM
```

## VERIFICA CONFIGURAZIONE

Per verificare se la configurazione dell'autologin su tty1 del tuo server Ubuntu installato su Raspberry funziona correttamente, puoi seguire questi passaggi:

1. Verifica lo stato del servizio getty di tty1 con il seguente comando:
   css

```
systemctl status getty@tty1.service
```

2. Se il servizio è attivo, dovresti vedere un output simile a questo:

```
● getty@tty1.service - Getty on tty1
     Loaded: loaded (/lib/systemd/system/getty@.service; enabled; vendor preset: enabled)
     Active: active (running) since Mon 2023-05-01 12:00:00 CEST; 3 days ago
       Docs: man:agetty(8)
             man:systemd-getty-generator(8)
             https://www.freedesktop.org/wiki/Software/systemd/catalog/daemons/
   Main PID: 1234 (agetty)
      Tasks: 1 (limit: 4915)
     Memory: 272.0K
     CGroup: /system.slice/system-getty.slice/getty@tty1.service
             └─1234 /sbin/agetty --autologin NOME_UTENTE --noclear %I $TERM

```

Assicurati che il servizio sia "active (running)" e che mostri l'opzione di autologin che hai inserito. 3. Verifica lo stato del servizio systemd con il seguente comando:
lua

```
systemctl status systemd-logind.service
```

4. Se il servizio è attivo, dovresti vedere un output simile a questo:

```
● systemd-logind.service - Login Service
     Loaded: loaded (/lib/systemd/system/systemd-logind.service; static; vendor preset: enabled)
     Active: active (running) since Mon 2023-05-01 12:00:00 CEST; 3 days ago
       Docs: man:systemd-logind.service(8)
             man:logind.conf(5)
             https://www.freedesktop.org/wiki/Software/systemd/catalog/daemons/
             https://www.freedesktop.org/wiki/Software/systemd/multiseat/
   Main PID: 1234 (systemd-logind)
      Tasks: 1 (limit: 4915)
     Memory: 1.1M
     CGroup: /system.slice/systemd-logind.service
             └─1234 /lib/systemd/systemd-logind

```

Una volta che abbiamo configurato l'accesso automatico dell'utente "ubuntu" sulla tty1 del sistema, è necessario riavviare il server Ubuntu per rendere effettive le modifiche. Per fare ciò, possiamo digitare il comando:

```
sudo reboot
```

Dopo il riavvio, se l'autologin è stato configurato correttamente, dovremmo vedere una schermata nera sulla tty1 del sistema.
In questo modo, possiamo continuare ad utilizzare il server tramite connessione SSH o, se preferiamo, possiamo passare ad un altro TTY (ad esempio, premendo CTRL + ALT + F2) e accedere alla riga di comando utilizzando una tastiera e uno schermo collegati direttamente al server.

# CONNESSIONE SSH

## Prerequisiti

### UFW

UFW (Uncomplicated Firewall) è un’utilità di configurazione del firewall fornita con Ubuntu. Tuttavia, non è sempre installato per impostazione predefinita su tutti i sistemi Ubuntu. Per verificare se UFW è già installato sul tuo sistema Ubuntu, puoi utilizzare il comando:

```
sudo ufw status
```

Se UFW è già installato e abilitato sul tuo sistema, vedrai un output simile a questo:

```
Status: active
```

In caso contrario, vedrai un messaggio che indica che UFW non è attualmente abilitato o installato. In questo caso, puoi installarlo utilizzando il comando:

```
sudo apt install ufw
```

## Abilitazione

Abilitiamo SSH su Ubuntu Server, agisci come root o utente con privilegi sudo per installare e abilitare SSH sul tuo sistema Ubuntu puoi seguire questi passaggi:

Installa il pacchetto openssh-server:

```
sudo apt update
sudo apt install openssh-server
```

Al termine dell’installazione, il servizio SSH verrà avviato automaticamente. Puoi verificare se SSH funziona digitando:

```
sudo systemctl status ssh
```

Ubuntu viene fornito con un’utilità di configurazione del firewall chiamata UFW. Se il tuo sistema ha un firewall abilitato, assicurati di aprire la porta SSH:

```
sudo ufw allow ssh
```

## Connessione tramite pc

      ssh utente@ip -p porta
      utente@ip -p porta's password:
      Welcome to Ubuntu 21.10 (GNU/Linux 5.13.0-1011-raspi aarch64)

      * Documentation:  https://help.ubuntu.com
      * Management:     https://landscape.canonical.com
      * Support:        https://ubuntu.com/advantage

        System information as of Mon Feb  7 11:46:29 CET 2022

        System load:              0.02
        Usage of /:               30.1% of 29.34GB
        Memory usage:             38%
        Swap usage:               0%
        Temperature:              38.0 C
        Processes:                217
        Users logged in:          3
        IPv4 address for docker0: 172.17.0.1
        IPv4 address for eth0:    192.168.1.60
        IPv6 address for eth0:    2001:b07:2ec:f92a:dea6:32ff:fea0:5b17
        IPv4 address for tun0:    10.8.0.1


      0 updates can be applied immediately.

# BACKUP DELLA SD

Questa è la guida passo passo su come utilizzare ApplePi-Baker per effettuare il backup della scheda SD del Raspberry Pi senza spazi vuoti e ripristinare il backup su una nuova schedina utilizzando Raspberry Pi Imager. Ricorda di prestare sempre attenzione durante il processo di backup e ripristino per evitare di perdere dati importanti.

### Effettuare il backup della scheda SD del Raspberry Pi senza spazi vuoti con ApplePi-Baker

1. Scaricare e installare ApplePi-Baker sul proprio computer.

2. Inserire la scheda SD del Raspberry Pi nel computer tramite un adattatore SD.

3. Aprire ApplePi-Baker e selezionare la scheda SD del Raspberry Pi dall'elenco dei dispositivi disponibili.

4. Selezionare la scheda SD e fare clic sul pulsante "Read Backup".

5. Selezionare la posizione in cui si desidera salvare il backup della scheda SD e fare clic su "Save".

6. Attendere il completamento del processo di backup. Ci vorrà del tempo a seconda delle dimensioni della scheda SD e della velocità di lettura del computer.

7. Una volta completato il processo di backup, rimuovere la scheda SD dal computer.

### Ripristinare il backup su una nuova schedina con Raspberry Pi Imager

1. Scaricare e installare Raspberry Pi Imager sul proprio computer.

2. Inserire la nuova scheda SD nel computer tramite un adattatore SD.

3. Aprire Raspberry Pi Imager e selezionare l'opzione "Use custom" dalla finestra principale.

4. Selezionare il file di backup creato con ApplePi-Baker e fare clic su "Open".

5. Selezionare la nuova scheda SD come destinazione per il ripristino del backup.

6. Fare clic sul pulsante "Write" e attendere il completamento del processo di ripristino.

7. Una volta completato il processo di ripristino, rimuovere la nuova scheda SD dal computer e inserirla nel Raspberry Pi.

8. Accendere il Raspberry Pi e verificare che il sistema operativo sia stato ripristinato correttamente.

POSIZIONI CONNESSE:
`diskutil list `
PROCESSI ATTIVI
`ps aux | grep dd `  
CON NUMERO PROCESSO TROVATO PRECEDENTEMENTE CONTROLLO DATI TRASFERITI
`sudo kill -INFO 1821`

Ripristino SD dall'immagine di backup

`/Users/Ari/Zion_Backup/zion23_2.img`

# ERRORE RIAVVIO UBUNTU

Dopo un riavvio inaspettato del sistema ci si puo ritrovare ad un errore di avvio, sarà impossibile accedervi da remoto, dovremo manualmente accedere al raspberry connettendolo ad uno schermo tramite cavo hdmi - mini/hdmi ed una tastiera USB. avviamo il dispositivo e ci troviamo , all'interno della shell initramfs, davanti ad una schermata così:

```
fsck from util-linux 2.26.2
/dev/sda6 contains a file system with errors, check forced.
/dev/sda6: Inodes that were part of a corrupted orphan linked list found.

/dev/sda6: UNEXPECTED INCONSISTENCY; RUN fsck MANUALLY.
        (i.e., without -a or -p options)
fsck exited with status code 4
The root filesystem on /dev/sda6 requires a manual fsck

Busybox v1.22.1 (Ubuntu 1:1.22.0-15ubuntu1) built in shell (ash)
Enter 'help' for a list of built-in commands.

(initramfs) _
```

Digitare - Try this:
(where /dev/sda6 is the partition mentioned)

```
fsck /dev/sda6
```

And enter Yes (y) to for each error. Or press ‘a’ one time for always-yes.
Then reboot and it should be fine.

```
reboot -f
```

# DOCKERFILE

Per testare l'immagine Docker creata con il Dockerfile fornito, puoi seguire questi passaggi:

Dockerfile:

`````
## Usa un'immagine base leggera di Linux

```FROM oven/bun:latest as builder```

## Copia i file sorgente nella directory del builder

```WORKDIR /src COPY . .```

## Installa le dipendenze e esegui il comando yarn build per compilare i file
```RUN bun install RUN bun run build```

## Seconda fase per creare l'immagine finale
```FROM alpine:latest```

## Aggiorna il sistema e installa Lighttpd
```RUN apk update && apk add lighttpd```

## Copia i file compilati nella directory del server
```COPY --from=builder ./src/dist /var/www/localhost/htdocs/```

## Esponi la porta 80 per il server Lighttpd
```EXPOSE 80```

Costruisci l'immagine: Vai nella directory in cui hai il tuo Dockerfile e apri un terminale. Esegui il seguente comando per costruire l'immagine Docker:
````docker build -t my-lighttpd-image .````
# Avvia Lighttpd quando il contenitore viene eseguito
```CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]```
`````

### Costruisci l'immagine:

Vai nella directory in cui hai il tuo Dockerfile e apri un terminale. Esegui il seguente comando per costruire l'immagine Docker(Questo comando crea un'immagine Docker con il tag "my-lighttpd-image" utilizzando il Dockerfile nella directory corrente "assicurati di essere nella stessa directory del Dockerfile"):

```
docker buildx build -t tnl_wip .

```

### Esegui il contenitore:

Dopo aver costruito l'immagine, puoi eseguire un contenitore basato su di essa con il seguente comando:

```
docker run -d -p 8080:80 --name tnl_wip tnl_wip
```

### Testa il server Lighttpd:

Apri il tuo browser web e visita l'indirizzo `http://localhost:8080` per accedere al server Lighttpd. Se tutto è stato configurato correttamente nel tuo Dockerfile e i file dell'applicazione sono stati copiati correttamente, dovresti vedere l'applicazione in esecuzione.

### Arresta il contenitore:

Per arrestare il contenitore quando hai finito, puoi premere Ctrl + C nel terminale in cui hai eseguito il contenitore o eseguire il seguente comando:

```
docker stop <container_id>

```

Sostituisci `<container_id>` con l'ID del contenitore, che puoi ottenere utilizzando il comando `docker ps`.

# KUBERNETES

DISABILITARE MEMORIA SWAP:
Kubernetes si rifiuterà di funzionare se il sistema utilizza la memoria di swap. Prima di procedere ulteriormente, assicurarsi che il nodo master e il nodo di lavoro abbiano disabilitato la memoria di swap con questo comando:

``sudo swapoff -a`

Questo comando disabiliterà la memoria di swap fino al riavvio dei sistemi, quindi per rendere persistente questa modifica, usa nano o il tuo editor di testo preferito per aprire questo file:

`$ sudo nano /etc/fstab`

All'interno di questo file, se presente, commentare la riga precedundola con un simbolo, come mostrato di seguito. Quindi, chiudere questo file e salvare le modifiche./swapfile# (Aggiungi # per commentare la riga del file di scambio)
Accedi al tuo nodo master: Puoi farlo utilizzando SSH o qualsiasi altro metodo che preferisci per accedere al tuo server.

Imposta l’hostname: Puoi impostare l’hostname del tuo nodo master utilizzando il comando hostnamectl. Ad esempio:

`sudo hostnamectl set-hostname kubernetes-master`

Installa Kubernetes: Se non hai già installato Kubernetes sul tuo nodo master, dovrai farlo.

Inizializza il cluster Kubernetes: Una volta installato Kubernetes, puoi inizializzare il cluster utilizzando il comando kubeadm init. Questo comando avvierà il cluster con il nodo master1.

`sudo kubeadm init --node-name=kubernetes-master`

In questo comando, kubernetes-master è l’hostname del tuo nodo master2. Puoi sostituire kubernetes-master con qualsiasi nome tu preferisca per il tuo nodo.

# COMMAND LINE

## SUDO

| Comando                                | Descrizione                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------- |
| sudo su                                | Avvia una shell come utente root.                                                     |
| cp [origine] [destinazione]            | Crea una copia del file o della directory specificata nella destinazione specificata. |
| mv [origine] [destinazione]            | Sposta o rinomina il file o la directory specificata nella destinazione specificata.  |
| rm [file/directory]                    | Elimina il file o la directory specificata.                                           |
| mkdir [directory]                      | Crea una nuova directory con il nome specificato.                                     |
| cd [directory]                         | Naviga nella directory specificata.                                                   |
| ls                                     | Mostra un elenco dei file e delle directory nella directory corrente.                 |
| ls -l                                  | Mostra un elenco dettagliato dei file e delle directory nella directory corrente.     |
| pwd                                    | Mostra il percorso della directory corrente.                                          |
| chown [utente:gruppo] [file/directory] | Modifica il proprietario e il gruppo del file o della directory specificati.          |
| chmod [permessi] [file/directory]      | Modifica i permessi di accesso del file o della directory specificati.                |

## NANO EDITOR

Nano è un editor di testo a riga di comando, utilizzato principalmente su sistemi Linux e Unix. In pratica, Nano è uno strumento che consente di modificare il contenuto di file di testo direttamente dal terminale.
Puoi utilizzare Nano per modificare file di configurazione, script, documenti di testo e qualsiasi altro tipo di file di testo. L'editor è molto utile per coloro che lavorano su server Linux e non hanno accesso a un'interfaccia grafica per la modifica dei file.

COME USARE NANO

Per entrare in modalità di modifica, basta aprire un file con nano e iniziare a digitare. Quando hai finito di modificare il file, puoi salvarlo e chiudere premendo Ctrl + X, seguito da Y per confermare la salvataggio e poi Invio per confermare il nome del file. Per chiudere il file senza salvare le modifiche, premere Ctrl + X, seguito da N.

|                  Comando                   |                                            Descrizione                                            |
| :----------------------------------------: | :-----------------------------------------------------------------------------------------------: |
|                nano [file]                 |                         Apre il file specificato in Nano per la modifica                          |
|                  Ctrl + G                  |                                    Visualizza la guida di Nano                                    |
|                  Ctrl + X                  |                  Chiude il file in modifica e chiede di salvarlo, se necessario                   |
|                  Ctrl + O                  |                                     Salva il file in modifica                                     |
|                  Ctrl + R                  |                                Inserisce un file nel file corrente                                |
|                  Ctrl + W                  |                                    Cerca una stringa nel file                                     |
|                  Ctrl + K                  |                                      Taglia la riga corrente                                      |
|                  Ctrl + U                  |                             Incolla la riga precedentemente tagliata                              |
|                  Ctrl + J                  |                              Giustifica il testo nella riga corrente                              |
|                  Alt + U                   |                                     Annulla l'ultima modifica                                     |
|                  Alt + E                   |                              Ripristina l'ultima modifica annullata                               |
|                  Alt + A                   |                                 Seleziona tutto il testo del file                                 |
|                  Alt + 6                   |                               Commenta/Decommenta la riga corrente                                |
|                  Ctrl + C                  |                             Mostra la posizione del cursore nel file                              |
|                 Ctrl + \_                  |                        Inserisce un carattere specifico (in formato octal)                        |
| Ctrl + \|Va alla riga specificata nel file |
|                  Ctrl + T                  |                     Consente di effettuare una sostituzione in tutto il file                      |
|                  Ctrl + V                  | Passa al menu visuale di Nano, in cui si possono tagliare, copiare e incollare testo con il mouse |

```

`sgsggsg``

```
