FROM node:18.14 as build

WORKDIR /front

COPY src/ src
COPY package.json angular.json tsconfig.app.json tsconfig.json tsconfig.spec.json ./
RUN npm install

RUN npm run build


FROM nginx:latest

COPY --from=build /front/dist/frontend /usr/share/nginx/html

EXPOSE 80
