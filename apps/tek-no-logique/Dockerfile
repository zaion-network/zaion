# Usa un'immagine base leggera di Linux
FROM node:14 as builder

# Copia i file sorgente nella directory del builder
WORKDIR /src
COPY . .

# Installa le dipendenze e esegui il comando yarn build per compilare i file
RUN yarn install
RUN yarn build

# Seconda fase per creare l'immagine finale
FROM alpine:latest

# Aggiorna il sistema e installa Lighttpd
RUN apk update && apk add lighttpd

# Copia i file compilati nella directory del server
COPY --from=builder ./src /var/www/localhost/htdocs/

# Esponi la porta 80 per il server Lighttpd
EXPOSE 80

# Avvia Lighttpd quando il contenitore viene eseguito
CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]