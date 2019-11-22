To start project:
- in dev
docker-compose up --build

-in prod
docker-compose -f docker-compose.prod.yml up -d --build

-----------------------------------------------------------------------

To stop project (with removing containers):
docker-compose down

To stop project (without removing containers):
docker-compose stop

-----------------------------------------------------------------------