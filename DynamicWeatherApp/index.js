// 92edac49c4aba3d1b2f8447cb2809fb0
// api.openweathermap.org/data/2.5/weather?q=Pune&appid=c7ad3cb7f0f49aafbcb1a181c2c71a64

const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8")

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempVal%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);

    return temperature;
}


const server = http.createServer((req, res) => {

    if (req.url == "/") {
        requests('http://api.openweathermap.org/data/2.5/weather?q=Pune&appid=c7ad3cb7f0f49aafbcb1a181c2c71a64')
            .on('data', (chunk) => {
                const objdata = JSON.parse(chunk)
                const arrobj = [objdata];
                // console.log(arrobj)
                const realTimeData = arrData.map((val) => replaceVal(homeFile, Val))
                .join("");    
                res.write(realTimeData)
                    console.log(realTimeData);
            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
                
            });
    }
})

server.listen(8000, "127.0.0.1");


