const express = require('express');
const utils = require('utility');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const _filter = {pwd: 0, __v: 0};

Router.get('/list', function (req, res) {
    // User.remove({}, function () {
    //
    // })
    User.find({}, function (err, doc) {
        if (!err) {
            return res.json(doc)
        }
    })
});
Router.post('/login', function (req, res) {
    const {user, pwd} = req.body;
    User.findOne({user, pwd:md5Pwd(pwd)},_filter, function (err, doc) {
        if (!doc) {
            return res.json({code:1,msg: '用户名或者密码不存在'})
        }
        res.cookie('userid', doc._id);
        return res.json({code: 0, data: doc})
    })

});
Router.post('/register', function (req, res) {
    console.log(req.body);
    const {user, pwd, type } = req.body;
    User.findOne({user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名已存在'})
        }
        //save可以获取id
        const userModel = new User({user,type, pwd: md5Pwd(pwd)});
        userModel.save(function (e, d) {
            if (e) {
                return res.json({code:1, msg:'后端出错了'})
            }
            const {user, type, _id} = d;
            res.cookie('userid', _id);
            return res.json({code:0, data: {user, type, _id}});
        });
        //create不能获取id换成生面的save
        // User.create({user, type, pwd: md5Pwd(pwd)}, function (e, d) {
        //     if (e) {
        //         return res.json({code: 1, msg: '后端出错'})
        //     }
        //     return res.json({code: 0})
        // })
    })
});
Router.get('/info', function (req, res) {
    const {userid} = req.cookies;
    if (!userid) {
        //用户cookie校验
        return res.json({code: 1})
    }
    User.findOne({_id: userid},_filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
});

function md5Pwd (pwd) {
    const salt = 'chenliuyangyan_is_best_jaskljfkla2@L;'
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;