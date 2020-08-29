//jshint esversion:6
const express = require("express");
const bodyParse = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

var tasks = ["Wake up"];
var workItems=[];

 app.set('view engine','ejs');
 app.use(bodyParse.urlencoded({extended:true}));
 app.use(express.static("public"));

app.get("/",function(req,res){
  var day=date();

  res.render("list",{listTitle:day, newListItems:tasks});
});

app.post("/",function(req,res){
  var task=req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(task);
    res.redirect("/work");
  }else{
    tasks.push(task);
    res.redirect("/");
  }

});

app.get("/work",function(req,res){
  res.render("list",{listTitle:"Work List", newListItems:workItems});
});
// app.post("/work",function(req,res){
//   let task=req.body.newItem;
//   workItems.push(task);
//   res.redirect("/work");
// });


app.listen(3000,function(){
  console.log("Server is runnning on port 3000");
});
