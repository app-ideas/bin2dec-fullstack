FROM node:10 as dev

WORKDIR /build

COPY package.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine 
COPY --from=dev /build /usr/share/nginx/html
EXPOSE 80
