const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
  req.body.cityName;
  const apiKey = "a135f916e1e9b30e68f472dd2a2ee597";
  const query =req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=" + apiKey;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const feel = weatherData.main.feels_like;
      const descr = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const country = weatherData.sys.country;
      const imgURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
      res.write("<p>The weather is currently "+ descr + ".<p>");
      res.write("<h1>The temperature in "+ query + ", " + country + " is " + Math.round(temp) + " degrees Celcius.</h1>");
      res.write("<h2>The wind chill is " + Math.round(feel) + " degrees Celcius.</h2>");
      res.write("<img src=" + imgURL +">");


      res.send();
    });
  });
})



app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
