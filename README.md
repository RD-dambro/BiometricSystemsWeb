# Biometric Systems REST API

Before you begin:

you need a database, possibly postgres, set up

https://hub.docker.com/_/postgres/

create ormconfig.json

{
    "name": "default",
    "type": "postgres",
    "host": your_host,
    "port": your_port,
    "username": your_username,
    "password": your_secret_password,
    "database": your_database,
    "entities": ["dest/entity/*.js"],
    "synchronize": true
}

npm install

then:

npm test

if it asks about rabbit, comment the refences