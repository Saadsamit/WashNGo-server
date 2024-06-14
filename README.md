# Car Washing System

### [car-washing-system.vercel.app](car-washing-system.vercel.app)

## 🛠️ Technology I Can Use

- Node.js
- Express.js
- Mongoose
- TypeScript
- zod
- jwt

## Features

- login system roles `admin` `user`,
- admin can create service
- admin can create slot
- user can book slot and can see his all bookings

## How to run the application locally.

First you need to install all dependencies. For installing you need to run **`yarn`** in your terminal.

```
yarn
```

Then you need to add **`.env`** file in projects Root directory. On **`.env`** file you need to add `PORT`, `DATABASE_URL`
`BCRYPT_HASH_ROUND`, `JWT_ACCESS_SECRET` and `JWT_ACCESS_EXPIRES_IN`

**`Example:`**

```
//The env should be placed on project root

PORT=3000 // add a port like that

DATABASE_URL=mongodb+srv://car-doctor:lgrOvzRSR0Xk5P@cluster0.amhrtlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0  //add a mongoDB database url like that

BCRYPT_HASH_ROUND=12

JWT_ACCESS_SECRET=b6b3cc3ca9c501c531155466385fca64a3ef0beae48d913f7db2c95641cfbe9e

JWT_ACCESS_EXPIRES_IN=7d

```

Then you can run server useing **`yarn dev`** on your terminal.

```
yarn dev
```

Now to can run the server locally.