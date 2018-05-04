import * as fs from "fs";
import * as path from "path";
const dataFolder = "./src/data/";

export class MarkovController {
  public static LoadFiles(): void {}

  public static CreateSentences(sentenceNumber: number = 1): Promise<any> {
    const rita = require("rita");
    const markov = new rita.RiMarkov(3);
    const files = fs.readdirSync(path.resolve(dataFolder));
    files.forEach(f=>{
      const textToLoad = fs.readFileSync(path.resolve(dataFolder + f), "utf-8");
      markov.loadText(textToLoad);
    });

    const promise = new Promise<any>(resolve => {
      resolve(markov.generateSentences(sentenceNumber));
    });

    return promise;
  }
}
