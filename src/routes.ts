
import * as express from "express";
import { MarkovController } from "./controller/markov.controller";
const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    "Get Sentence":"/markov/",
    "Get multiple sentences":'/markov/:sentenceNumber'
  });
});

app.get('/markov/', (req: express.Request, res: express.Response)=>{
  MarkovController.CreateSentences()
  .then(sentences=>{
    res.status(200).json({
      "data": sentences
    });
  });
});

app.get('/markov/:sentenceNumber', (req: express.Request, res: express.Response)=>{
  const sentenceNumber = req.params['sentenceNumber'];
  MarkovController.CreateSentences(sentenceNumber)
  .then(sentences=>{
    res.status(200).json({
      "data": sentences
    });
  });
});


export var Routes: express.Express = app;
