const express = require('express');
const utils = require('utility');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const models = require('./model');
const Chat =  models.getModel('chat');
const app = express();
// work with express

const server = require('http').Server(app)
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('user login');
    socket.on('sendmsg', function (data) {
        // console.log(data);
        // io.emit('recvmsg', data)
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_');
        if(from && to) {
            Chat.create({chatid, from, to, create_time: new Date().getTime(),content:msg}, function(err, doc){
                io.emit('recvmsg', Object.assign({},doc._doc))
            })
        }

    })
});
// Chat.remove({}, function (err, doc) {
//
// })
const userRouter = require('./user');


app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093, function () {
    console.log('Node app start at port 9093')
});
