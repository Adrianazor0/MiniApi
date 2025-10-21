import express from "express"
import { format } from 'date-and-time';
import os from "os";

const app = express();

app.use(express.json());

const PORT = 3000;

const currentTime = format(new Date(), 'hh:mm:ss.SSS A');

const adrianPc = {
    platform: os.platform(),
    arquitecture: os.arch(),
    cpus: os.cpus()
}

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

app.get('', (req, res) => {
    res.status(404);
    res.send("Error 404, Page not found")
})

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else 
        console.log("Error occurred, server can't start", error);
})
