import * as express from "express";
import { MarkovController } from "./controller/markov.controller";
import * as bodyParser from "body-parser";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    "Get Sentence": "GET /markov/",
    "Get multiple sentences": "GET /markov/:sentenceNumber",
    "Get scenary by end": "POST /markov/end",
    "Get scenary by end with min length": "POST /markov/end/:maxLength",
    "Get multiple sentences with sentences":" POST /markov/sentences"
  });
});

app.get("/markov/", (req: express.Request, res: express.Response) => {
  MarkovController.CreateSentences()
    .then(sentences => {
      res.status(200).json({
        data: sentences
      });
    })
    .catch(error => {
      res.sendStatus(500);
    });
});

app.get(
  "/markov/:sentenceNumber",
  (req: express.Request, res: express.Response) => {
    const sentenceNumber = req.params["sentenceNumber"];
    MarkovController.CreateSentences(sentenceNumber)
      .then(sentences => {
        res.status(200).json({
          data: sentences
        });
      })
      .catch(error => {
        res.sendStatus(500);
      });
  }
);

app.post(
  "/markov/end",
  (req: express.Request, res: express.Response) => {
    const end = req.body["end"];
    MarkovController.CreateSentencesWithEnd(end)
      .then(result => {
        res.status(200).json({
          data: result
        });
      })
      .catch(error => {
        res.sendStatus(500);
      });
  }
);

app.post(
  "/markov/end/:maxLength",
  (req: express.Request, res: express.Response) => {
    const maxLength = req.params["maxLength"];
    const end = req.body["end"];
    MarkovController.CreateSentencesWithEnd(end, maxLength)
      .then(result => {
        res.status(200).json({
          data: result
        });
      })
      .catch(error => {
        res.sendStatus(500);
      });
  }
);

app.post(
  "/markov/sentences/",
  (req: express.Request, res: express.Response) => {
    const data = req.body["data"];
    MarkovController.CreateSentences(1,data)
      .then(result => {
        res.status(200).json({
          data: result
        });
      })
      .catch(error => {
        res.sendStatus(500);
      });
  }
);
app.post(
  "/markov/sentences/:sentenceNumber",
  (req: express.Request, res: express.Response) => {
    const sentenceNumber = req.params["sentenceNumber"];
    const data = req.body["data"];
    MarkovController.CreateSentences(sentenceNumber,data)
      .then(result => {
        res.status(200).json({
          data: result
        });
      })
      .catch(error => {
        res.sendStatus(500);
      });
  }
);

export var Routes: express.Express = app;
