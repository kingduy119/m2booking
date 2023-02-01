import next from "next";
import express from "express";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    const app = express();

    // Middlewares
    app.use(express.json());

    // Give all Nextjs's request to Nextjs server
    app.get("/_next/*", (req, res) => {
      handle(req, res);
    });
    app.get("/static/*", (req, res) => {
      handle(req, res);
    });

    // #Redirect error
    app.get("*", (req, res) => {
      handle(req, res);
    });
    app.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((error: unknown) => {
    console.log(error);
  });
