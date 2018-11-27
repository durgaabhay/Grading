const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Evaluator = require('../models/evaluator');
const checkAuth = require('../auth/check-auth');
const private_secret_key = "JWTAuthValue";
const qrCode = require('qrcode');

router.get('/showEval', function(req,res) {
   console.log("Show the evaluators screen");
    res.render('evaluators',{title:'Evaluators'});
});

router.get('/', checkAuth, function(req,res){
   console.log("inside get of evaluators");
    console.log("inside get");
    Evaluator.find().exec()
        .then( data => {
            console.log('Evaluator info : ' , data);
            res.status(200).json({data});
        }).catch( err => {
        res.status(500).json({err});
    });
});

router.post('/', checkAuth, function(req,res){
   console.log("inside post of evaluators");
    Evaluator.find({evaluatorName : req.body.evaluatorName})
        .exec()
        .then(team => {
            if(team.length >= 1) {
                res.status(409);
                res.statusMessage = "Error creating user";
                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                res.render('error',{title:'Error'});
            }else {
                let generatedCode = jwt.sign({
                    evaluatorName : req.body.evaluatorName
                },private_secret_key,{expiresIn : "15 days"});
                console.log("The generated QR Code ," , generatedCode);
                qrCode.toFile('qrcodes/evaluators/eval1.png', generatedCode).catch(err => {
                    console.log(err);
                });
                const newEvaluator = new Evaluator({
                    _id: new mongoose.Types.ObjectId(),
                    evaluatorName: req.body.evaluatorName,
                    qrCode: generatedCode
                });
                newEvaluator.save().then(result => {
                    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                    res.render('dashboard',{title:'Dashboard'});
                }).catch(err => {
                    res.status(500).json({
                        message : "Error adding new evaluator",
                        error: err
                    })
                });
            }
        }).catch(err => {
        res.status(500).json({
            message : "Error encountered",
            error: err
        })
    });
});


module.exports = router;