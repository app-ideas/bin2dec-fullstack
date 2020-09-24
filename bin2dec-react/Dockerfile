FROM node:10 as dev

WORKDIR /src

COPY package.json ./
RUN npm install
COPY . .

RUN yarn build

FROM nginx:alpine 
COPY --from=dev /src/dist /usr/share/nginx/html
EXPOSE 80
