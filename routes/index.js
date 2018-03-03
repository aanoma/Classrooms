var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://anoma:112233@ds019143.mlab.com:19143/classroom').then(function () {
    console.log("Database Connected!")
}).catch(function (error) {
    console.log(error.message)
});

var User = mongoose.model('User',{
    username:String,
    password:String,
    email:String
});

var Student = mongoose.model('Student',{
   name : String,
   stage: String,
    birthday:Object,
    image:String,
    department:String,
    score1:Number,
    score2:Number,
    score3:Number,
    score4:Number,
    score5:Number
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


router.get('/my-students', function(req, res) {
    var email = req.param('email');
    if (email==='true'){
    res.render('my-students');}
    else{res.render('error')}
});

router.get('/student', function(req, res) {
    res.render('student');
});

router.get('/api',function (req,res) {
        User.find(function (error, users) {
            res.json(users);
        })
});

router.get('/api/students',function (req,res) {
    Student.find(function (error, student) {
        res.json(student);
    })
});

router.delete('/api/students',function (req,res) {
    var id = req.param('id');
    Student.findByIdAndRemove(id).then(function () {
        res.json({
            isSuccess: true,
            message: "Deleted!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        });
    })
});

router.post('/api/students', function (req, res) {
    var object = req.param('student')
    var newStudent = new Student(object);
    newStudent.save().then(function () {
        res.json({
            isSuccess: true,
            message: "Cartoon Saved!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        });
    })
});



router.post('/api',function (req,res) {
    var object = req.param('account');
    new User(object).save().then(function () {
        console.log( "Saved!")
        }).catch(function (error) {
        console.log(error.message);
        });

});

router.put('/api/students',function (req,res) {
    var editing = req.param('edit');
    Student.findByIdAndUpdate(editing._id,editing).then(function () {
        res.json({
            isSuccess: true,
            message: "Updated!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        });
    });
});


module.exports = router;
