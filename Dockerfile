
FROM scratch

COPY dist/linux-amd64-normal/slick /
COPY web/dist /web

EXPOSE 443

ENTRYPOINT ["/slick", "serve"]