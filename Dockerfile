FROM keymetrics/pm2:latest-alpine

# Bundle APP files
WORKDIR /app
COPY src ./src
COPY package.json .
COPY ecosystem.config.js .
COPY node_modules ./node_modules

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Show current folder structure in logs
RUN pwd && ls -la

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
