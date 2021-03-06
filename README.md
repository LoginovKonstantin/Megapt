## Installation

```bash
$ git clone https://github.com/LoginovKonstantin/Megapt.git && cd Megapt
```

## Running the app (locally)
Then you must have Postrges server (local), and show .env file

```bash
# install dependencies 
$ npm install

# build
$ npm run build

# Apply migration
$ knex migrate:latest

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app (docker-compose)

```bash
$ docker-compose up -d
```
* App - ```http://localhost:3000```
* Swagger docs - ```http://localhost:3000/docs/```
* Pgadmin ```http://localhost:5050```
* Postman collection file (root folder) - megapt.postman_collection.json

