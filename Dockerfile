
FROM scratch

COPY /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY dist/linux-amd64-normal/slick /
COPY web/dist /web

EXPOSE 443

ENTRYPOINT ["/slick", "serve"]