# How to Init Project

## Create Environment

```bash
cd API-NEST-ESGI
DATABASE_URL="mysql://root:passwd@localhost:3306/test"
```

## Run Docker

```bash
docker-compose up
cd API-NEST-ESGI
```

## Run Migration

```bash
npx prisma migrate dev
```
