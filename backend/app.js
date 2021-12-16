const express = require('express');

const app = express();

app.use('/posts' ,(req, res, next) => {
    const posts = [
        {id: "jsadksad", title: "first title", content: "first content"},
        {id: "djsakljasld", title: "second title", content: "second content"}
    ];
    // could have also just done res.json(posts) but demonstrating that complex objects can also be sent. 
    // Also add chain method .status(200) to check success status before returning the response
    // No need to add return before res as it is the last statement it will be executed 
    res.status(200).json({
        message: "post fetched successfully",
        posts: posts
    });

    // Note: No next() call here as we dont want to do anything after this 
});

module.exports = app;