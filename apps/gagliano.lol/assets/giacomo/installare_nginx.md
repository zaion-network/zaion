# Nginx

## Use case.

### Scenario

Abbiamo delle applicazioni che girano sul server su svariate porte, ad esempio

| applicazione | porta |
| ------------ | ----- |
| miaapp1.app  | 8080  |
| miaapp2.app  | 8081  |

per facilitarne l'accesso sulla rete inerna, editiamo il file `/etc/hosts` (su mac e linux, su windows non saprei).
Ammettendo che il server abbia questo ip `192.1.1.2`, possiamo configurare il file nel seguente modo

```
miaapp1.app 192.1.1.2
miaapp2.app 192.1.1.2
```

### Problema

a questo punto per accedere alle app però. nel browser, bisogna comunque scrivere il seguente url:

`http://miaapp1:8080`
`http://miaapp2:8081`

il che non è molto conveniente.

### Risoluzione

si può risolvere la situazione utilizzando `nginx` per creare un reverse proxy.

## Installare Nginx

per installare `nginx` su linux facciamo

    $ sudo apt-get update
    $ sudo apt-get install nginx

controlla se `nginx` è installato

    $ systemctl status nginx

## Configurare Nginx

Configurare il file nel seguente modo (assicurarsi di modificare l'IP per far si che coincida con quello del server sulla tua rete)

```nginx
server {
    listen 80;
    server_name miosito.app;

    location / {
        proxy_pass http://192.1.1.2:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

server {
    listen 80;
    server_name miapp2.app;

    location / {
        proxy_pass http://192.1.1.2:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## Salvataggio del file

I file di configurazione di Nginx si trovano solitamente nella directory `/etc/nginx/1`[^1].
Questa directory contiene il file di configurazione principale, chiamato `nginx.conf`,
e gli eventuali file di configurazione richiamati dal principale[^1].

Per far sì che Nginx prenda in carica il file di configurazione, dovrai inserirlo in una delle directory
da cui Nginx carica i file di configurazione.
Ad esempio, potresti inserirlo nella directory `/etc/nginx/conf.d` o nella directory `/etc/nginx/sites-enabled2`[^2].

## Nome del file

Il nome del file di configurazione di Nginx può essere qualsiasi cosa tu voglia, purché abbia l’estensione `.conf`.
Ad esempio, potresti chiamare il tuo file di configurazione miosito.conf o miapp2.conf.

## Riavvio del server

Dopo aver inserito il tuo file di configurazione nella directory appropriata, dovrai ricaricare o riavviare Nginx
per far sì che le modifiche vengano prese in carico. Puoi farlo utilizzando uno dei seguenti comandi[^3]:

- `sudo systemctl reload nginx` per ricaricare la configurazione senza interrompere il servizio.
- `sudo systemctl restart nginx` per riavviare completamente Nginx.

[^1]: [html.it](https://www.html.it/pag/377241/configurazione-il-file-nginx-conf/)
[^2]: [learn.microsoft](https://learn.microsoft.com/it-it/troubleshoot/developer/webapps/aspnetcore/practice-troubleshoot-linux/2-2-install-nginx-configure-it-reverse-proxy)
[^3]: [ionos.it](https://www.ionos.it/digitalguide/server/configurazione/tutorial-nginx-primi-passi-con-nginxconf/)
