
import express from "express";
import https from "https";
import bodyParser from "body-parser";

import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url); // for dirname use .
const __dirname = dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({extended:true}));







app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/" , function(req , res) {
const query = req.body.cityName;   
const apiKey = "8d9bef6257657ff9924cc309a2b0cad0";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url , function(response){

        response.on("data" , function(data){
           const weatherData = JSON.parse(data); // JS nesnesine dönüştürdük apıden gelen veriyi.
           const temp = weatherData.main.temp;  // js nesnesinden özelliklere erişim.
           const weatherDescription = weatherData.weather[0].description;
           const icon = weatherData.weather[0].icon;
           const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

           res.send("<h1>Hava durumu :" + temp +"derece</h1>"+ "</br>"+"<p> Hava durumu aciklamasi : " + weatherDescription +". <p> " + 
           "</br> <img src ="+imageUrl+">") ;
         
    
        });
    });
    
});




app.listen(3000 , function(){
    console.log("Server 3000 nolu portta çalışıyor");
});