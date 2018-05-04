import * as fs from "fs";
import * as path from "path";
const dataFolder = "./src/data/";

export class MarkovController {
  public static LoadFiles(): void {}

  public static CreateSentences(sentenceNumber: number = 1, text?:string): Promise<any> {
    const rita = require("rita");
    const markov = new rita.RiMarkov(4  );
    const files = fs.readdirSync(path.resolve(dataFolder));

    if(text){
      markov.loadText(text);
    }

    files.forEach(f => {
      const textToLoad = fs.readFileSync(path.resolve(dataFolder + f), "utf-8");
      markov.loadText(textToLoad);
    });

    const promise = new Promise<any>(resolve => {
      resolve(markov.generateSentences(sentenceNumber));
    });

    return promise;
  }

  public static CreateSentencesWithEnd(end: string, maxLength:number=10) {
    const rita = require("rita");
    const markov = new rita.RiMarkov(3);
    const files = fs.readdirSync(path.resolve(dataFolder));
    markov.loadText(end);
    files.forEach(f => {
      const textToLoad = fs.readFileSync(path.resolve(dataFolder + f), "utf-8");
      markov.loadText(textToLoad);
    });

    const promise = new Promise<any>((resolve,reject)=>{
      resolve(markov.generateUntil(end,10, maxLength).join(" "));
    });

    return promise;
    
  }
}
