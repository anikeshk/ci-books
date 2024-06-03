# ci-books

This is a sample application to demonstrate Docker, Docker Compose, and GitHub Actions. 

You can find the articles related to this repository [here](https://anikeshk.com/series/ci).


## Deployment

### Docker

To run the this application using Docker using VS Code,

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) which will install Docker Engine.
2. Install the [Docker VS Code Extention](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker).
3. Right-click the `docker-compose.yml` file and click the `Compose Up` command.
4. The express app will be accessible on `http://localhost:5000`. 
5. You can use Postman to execute queries. If you want example queries, refer to `books.postman_collection.json`.

If you prefer to use the command line, then run the following command in the root of the project:
```
docker-compose up
```

The logs can be monitored using Docker Desktop.

To shut down the todo application, right-click the `docker-compose.yml` file and click the `Compose Down` command.

For the command line:
```
docker-compose down
```

### Local

#### Pre-Requisites
1. Node.js (v20 or greater)
2. MongoDB (MongoDB Compass is optional)

#### Install
1. Clone the GitHub repository.

```
git clone git@github.com:anikeshk/ci-books.git
```

2. Install dependencies.
```
npm install
```

3. Copy the `.env.example` file to `.env` and make any necessary changes.
```
cp .env.example .env
```

#### Run

1. Build and run the server.
```
npm run build && npm run start
```
The backend API is now accessible at `http://localhost:5000`.

#### Tests

1. Run the tests.
```
npm run test
```