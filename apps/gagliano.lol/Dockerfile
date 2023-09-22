# Usa un'immagine base leggera di Linux
FROM oven/bun:latest as builder

# Copia i file sorgente nella directory del builder
WORKDIR /src
COPY . .

# Installa le dipendenze e esegui il comando yarn build per compilare i file
RUN bun install
RUN bun run build

# Avvia Lighttpd quando il contenitore viene eseguito
CMD ["bun", "run", "run"]