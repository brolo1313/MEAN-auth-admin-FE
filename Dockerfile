FROM node:20.11.1 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build

FROM nginx:latest

COPY --from=build app/dist/browser /usr/share/nginx/html

EXPOSE 80