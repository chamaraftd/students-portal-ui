#stage 1
FROM node:16.14.0 as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm config get proxy
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm install --verbose
COPY . .
RUN npm run build --prod

#stage 2
FROM nginx:stable-alpine
EXPOSE 80
COPY --from=node /usr/src/app/dist/students-portal-ui /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
