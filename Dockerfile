
FROM scratch

COPY --chown=0:0 dist/linux-amd64-normal/slick /
COPY web/dist /web/

EXPOSE 443

ENTRYPOINT ["/slick", "serve"]