# Slack Reaction Aggregator

- node v14.10.0
- yarn v1.22.5
- docker-compose v1.27.4

1. `docker-compose up --build -d`
2. `yarn install`
3. `yarn ts-node ./node_modules/.bin/typeorm migration:run`
4. `./node_modules/.bin/tsc`
5. `node ./dist/index.js`
