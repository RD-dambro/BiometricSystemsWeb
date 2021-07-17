FROM node:14

# Create app directory
WORKDIR /usr/src/web

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

# RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# COPY ./ormconfig.json .
# COPY ./.env .
# ENV TYPEORM_CONNECTION postgres
# ENV TYPEORM_DATABASE  postgres
# ENV TYPEORM_HOST  localhost
# ENV TYPEORM_USERNAME  postgres
# ENV TYPEORM_PASSWORD  mysecretpassword
# ENV TYPEORM_PORT  5432
# ENV TYPEORM_ENTITIES  dest/entity/*.js
# ENV TYPEORM_SYNCHRONIZE  true

COPY . .

RUN npm install

# RUN tsc

CMD [ "npm", "test" ]
EXPOSE 3000