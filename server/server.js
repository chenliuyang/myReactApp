const express = require('express');
const mongoose = require('mongoose');
//链接创建集合react
const DB_URL = 'mongodb://127.0.0.1:27017/react';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log('mongo connected success');
});
const User = mongoose.model('user', new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    }
}));
// 学习到2.4了



const app = express();

app.get('/', function (req, res) {
    res.send('<h1>Hello World</h1>')
});

app.get('/data', function (req, res) {
    res.json({name: 'react', type: 'IT man'})
});

app.listen(9093, function () {
    console.log('Node app start at port 9093')
});