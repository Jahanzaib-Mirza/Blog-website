const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));


const port = 9000;
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let name = "";

mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : String
})
const Post = mongoose.model("Post",postSchema);
app.get("/",(req,res)=>{
    Post.find().then((posts)=>{
        res.render("home",{homeStartingContent,posts})
    })
    // res.send("hello world")
})

app.get("/about",(req,res)=>{
    console.log();
    res.render("about",{aboutContent})
    // res.send("hello world")
})
app.get("/contact",(req,res)=>{
    res.render("contact",{contactContent})
    // res.send("hello world")
})
app.get("/compose",(req,res)=>{
    res.render("compose")
    // res.send("hello world")
})
app.post("/compose",(req,res)=>{
    const post = new Post({title : req.body.title,content : req.body.content})
    post.save()
    res.redirect("/");
})
app.get("/post/:id",(req,res)=>{
    id = req.params.id;
    // console.log(id)
    Post.findOne({_id : id}).then((post)=>{
        res.render("post",{post})
        // console.log(post)
    })
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})