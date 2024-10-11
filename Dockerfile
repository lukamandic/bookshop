FROM node:18-alpine AS frontend-build

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build

FROM golang:1.20-alpine AS backend-build

WORKDIR /backend

COPY backend/go.mod backend/go.sum ./

RUN go mod download

COPY backend/ .

COPY --from=frontend-build /app/build ./build

RUN go build -o app main.go

FROM alpine:3.18

WORKDIR /app

COPY start.sh .

RUN chmod +x start.sh

EXPOSE 8080

CMD ["./start.sh"]