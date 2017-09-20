FROM node:boron
# Create app directory
WORKDIR /opt/nodeapps/
# Install app dependencies
COPY package.json .

RUN npm install
# Bundle app source
COPY . .
ENV folder "/var/log"
EXPOSE 3000
CMD [ "npm", "start" ]