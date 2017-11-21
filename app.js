'use strict';

const express = require('express');
const app = express();

app.use(express.static('views'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(3000, () => {
    console.log('server runnig at http://localhost:3000/');
});
