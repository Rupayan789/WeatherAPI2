const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const env=require('dotenv')
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))
const port=3000;
env.config();
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html");
});
app.post("/",(req,res)=>{
  console.log(req.body);
  const query=req.body.city;
  const apikey=`${process.env.API_KEY}`;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric";
  https.get(url,(response)=>{
    response.on("data",(data)=>{
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const description=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const iconurl="https://openweathermap.org/img/wn/10d@2x.png";
      res.write("<h1>the temperature of "+query+" is "+temp+" degree celcius.</h1>");
      res.write("<h1>"+description+"</h1>");
      res.write("<img src="+iconurl+" >");


    })
  })
})
app.listen(port,()=>{
  console.log("server started");
})
