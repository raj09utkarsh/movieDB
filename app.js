var express = require("express");
var request = require("request");
var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.set('port', (process.env.PORT  || 3000));

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    request("http://www.omdbapi.com/?s=" + req.query.search + "&apikey=[ENTER AN API KEY]", function(err, response, body){
        if(err){
            console.log("Error");
            res.redirect("/");
        }else if(!err && response.statusCode==200){
            var parsedData = JSON.parse(body);
            if(parsedData === undefined){
                res.redirect("/");
            }
            else{
                res.render("index", {data: parsedData});
            }
        }
    });
});

app.get("/results/:id", function(req, res){
    request("http://www.omdbapi.com/?i=" + req.params.id + "&apikey=5ded979c", function(err, response, body){
        if(err){
            console.log("Error");
            res.redirect("/");
        }
        else if(!err && response.statusCode==200){
            var parsedData = JSON.parse(body);
            res.render("show", {data: parsedData});
        }
    });
});

app.listen(app.get('port'), function(){
    console.log("Server has started!");
});
