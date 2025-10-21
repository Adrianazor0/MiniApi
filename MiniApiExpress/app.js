import express from "express"
import { format } from 'date-and-time';
import os from "os";
import logger from "./utils/logger.js";
import morgan from "morgan"
import fs from 'node:fs';

const app = express();

app.use(express.json());

const PORT = 3000;

const currentTime = format(new Date(), 'hh:mm:ss.SSS A');

const adrianPc = {
    platform: os.platform(),
    arquitecture: os.arch(),
    cpus: os.cpus()
}

const morganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
    });
  },
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => {{
          const data = JSON.parse(message);
          if(data.status >= 500) {
            logger.error(`Server Error`, data);
          } else if (data.status < 500) {
            logger.error(`Client Error`, data);
          } else if (data.status < 400) {
            logger.error(`Client Error`, data);
          } else if (data.status < 300) {
            logger.info(`Success`, data);
          } 
        }
      },
    },
  }
);

app.use(morganMiddleware);

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to the home page");
});

app.get('/time', (req, res)=>{
    res.status(200);
    res.send(`time: ${currentTime}`);
});

app.get('/about', (req, res)=>{
    res.status(200);
    res.json(adrianPc);
})

app.get('/users', (req, res)=>{
    res.status(200);
    try {
        const data = fs.readFileSync('./data/users.json', 'utf8');
        res.send(data)
    } catch (err) {
        console.error(err);
    }
})

app.all('/{*any}', (req, res) => {
    res.status(404);
    res.send("Error 404, Page not found")
})

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else 
        console.log("Error occurred, server can't start", error);
})
