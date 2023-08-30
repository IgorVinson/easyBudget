
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Setting Up the Database for Development

### 1. Install MongoDB
#### For Windows:
- Download the MongoDB installer from [MongoDB Download Center](https://www.mongodb.com/try/download/community).
- Install with default settings.

#### For macOS:
- Use Homebrew:
    ```sh
    brew tap mongodb/brew
    brew install mongodb-community@5.0
    ```

### 2. Set Up MongoDB as a Replica Set

#### For Both Windows & macOS:
- Start MongoDB without the `--fork` option:
    ```sh
    mongod --port 27017 --dbpath YOUR_DB_PATH --replSet "rs"
    ```

- Start a new terminal and connect to the MongoDB instance:
    ```sh
    mongo --port 27017
    ```

- Initialize the replica set:
    ```javascript
    rs.initiate()
    ```

### 3. Clone the Project Repository
```sh
git clone YOUR_PROJECT_REPOSITORY_URL
cd YOUR_PROJECT_DIRECTORY
```

### 4. Install Dependencies
Run the following command to install all necessary dependencies:
```sh
npm install
```

### 5. Set Up Prisma

- Ensure that your `schema.prisma` file points to your MongoDB instance. Update the connection string if necessary.

- If there are any migrations or additional setup steps for your specific project, execute them:
    ```sh
    prisma migrate deploy
    ```

### 6. Start DB

  ```sh 
  mongod --config mongod.conf



/opt/homebrew/Cellar/mongodb-community@5.0/5.0.17/bin/mongo --port 27018
  ```




