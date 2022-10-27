FROM node:latest as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM nginx:stable-alpine
# RUN rm -rf /etc/nginx/conf.d/defalut.conf
# COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d/default.conf

# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=build-stage /app/dist /usr/share/nginx/html

# EXPOSE 3000
# ENTRYPOINT ["nginx", "-g", "daemon off;"]


WORKDIR /var/jenkins_home/workspace/ApiCloud/frontend
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/ApiCloud/frontend/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g","daemon off;"]