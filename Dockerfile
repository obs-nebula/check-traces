FROM registry.access.redhat.com/ubi8/nodejs-18:latest
COPY package*.json ./
RUN npm ci
FROM registry.access.redhat.com/ubi8/nodejs-18-minimal:latest
COPY --from=0 /opt/app-root/src/node_modules /opt/app-root/src/node_modules
COPY . /opt/app-root/src
EXPOSE 8080
CMD ["npm","start"]