const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();
mongoose.connect("mongodb+srv://jaskamal999:kIwZnbyLReAInf7l@cluster0.gbsea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch(() => {
        console.log("Database connection failed!");
    });


// we need body parser to parse data that comes in request body
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

app.post("/posts", (req, res, next) => {
    // created post using our Post model
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    // we need to return a response as it is still an endpoint to an incoming request and to ensure this req doesnt timeout on client
    // we could have just said res.status(201), no need to send any json data for now, just sending a message though
    res.status(201).json({
        message: 'post added successfully'
    });
    // we are not using next here as we are sending a response, it shouldnt anyway go ahead
});

// we can narrow the following middleware using app.get now instead of app.use 
app.get('/posts' ,(req, res, next) => {
    Post.find()
    .then(documents => {
        // we have moved the following snippet inside then as we want to wait for documents to be ready in this async function
        // and we deleted our hard coded posts now we send the document (which currently have that _id problem, but does the work) 
        res.status(200).json({
            message: "post fetched successfully",
            posts: documents
        });
    });
    // could have also just done res.json(posts) but demonstrating that complex objects can also be sent. 
    // Also add chain method .status(200) to check success status before returning the response
    // No need to add return before res as it is the last statement it will be executed 
    // res.status(200).json({
    //     message: "post fetched successfully",
    //     posts: posts
    // });

    // Note: No next() call here as we dont want to do anything after this 
});

module.exports = app;