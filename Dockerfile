FROM alpine:latest

RUN apk add --no-cache \
    go \
    nodejs \
    npm

WORKDIR /app

COPY start.sh .

COPY frontend ./frontend
COPY backend ./backend
COPY revisions ./revisions

RUN chmod +x start.sh

RUN cat start.sh

EXPOSE 8080

RUN ls -l

CMD ["/bin/sh","./start.sh"]