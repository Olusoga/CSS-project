const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs')
const bodyParser=require('body-parser');
mongoose.connect('mongodb://localhost/nodekb');

let db = mongoose.connection;

//check connection
db.once('open',  ()=>{
    console.log('connected to MongoDB')
});

//check for DB Errors

db.on('error', (err)=>{
    console.log(err)
});
//init app
const app = express();

//bring in model
const Article = require('./model/article');
const article = require('./model/article');


//load view engine
app.use(express.static(__dirname));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// public folder

app.use(express.static(path.join(__dirname, 'public')));


//home route
app.get('/' , (req, res)=>{
    Article.find({}, function(err, articles){
        // console.log(articles);
        if(err){
            console.log(err);

        }else{
            res.render('index', { articles });
            
        }
    
    });
});

//add another route
app.get('/article/add_articles' , (req, res)=>{
    res.render('add_articles');

});
app.get('/article/:id', (req, res)=>{
    Article.findById(req.params.id, function(err, article){
        res.render('article', {
            article:article
        });

    });
});    

app.get('/article/edit/:id', (req, res)=>{
    Article.findById(req.params.id, function(err, article){
        res.render('edit_article', {
            article:article
        });

    });
});    


app.post('/article/add_articles', (req, res)=>{

    console.log(req.body)
    let article = new Article();
    article.title=req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    
    article.save(function(err){
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/');
        }

    })
    
});
app.listen(5000, ()=>{
    console.log("listening on the 5000");
});
      