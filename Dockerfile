FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    bash grep find coreutils sed awk curl \
    python3 python3-pip \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY scripts/ /app/scripts/
COPY data/ /app/data/
COPY web/ /app/web/
COPY entrypoint.sh /app/entrypoint.sh
COPY README.md /app/README.md

ENV APK_DIR=/app/data/apk_descompilado
ENV OUT_DIR=/app/web/reports

RUN mkdir -p /app/web/reports && chmod +x /app/scripts/*.sh /app/entrypoint.sh

EXPOSE 8080
CMD ["/app/entrypoint.sh"]
