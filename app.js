// Download module
const express = require("express");
const bodyParser = require("body-parser");

const https   = require("https");   //https dosen't require download


const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

});

// API

app.post("/", function(req, res){
    const query  = req.body.cityName;
    const apiKey = "your api key";
    const unit   =  "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;

    //Making an HTTP get request 
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)   // Get the data as a JSON format

            //fetching items
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].Description
            const icon = weatherData.weather[0].icon

            //send  Data back to the browser
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The Weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
            res.write("<img src =" + imageURL + ">");
            res.send()
        })
    })
});


// server  will run on port 3000

app.listen(3000, function(){
    console.log("server is running on port 3000");

})
