
import * as express from "express";

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    "OK":"it's work"
  });
});


export var Routes: express.Express = app;
