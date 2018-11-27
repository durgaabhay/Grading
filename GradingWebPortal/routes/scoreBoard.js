const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Evaluations = require('../models/evaluations');


router.get('/', function(req,res) {
   console.log("get requests for score board");
});

router.post('/', function(req,res){
    console.log('Inserting the evaluations');
    const scores = new Evaluations({
        _id: new mongoose.Types.ObjectId(),
        teamName: req.body.teamName,
        evaluatorName: req.body.evaluatorName,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3,
        answer4: req.body.answer4,
        answer5: req.body.answer5,
        answer6: req.body.answer6,
        answer7: req.body.answer7,
        answer8: req.body.answer8
    });
    scores.save().then(result => {
        console.log("Scores updated to DB :", result);
        res.status(200).json({
            message: 'Success',
            result: result
        })
    }).catch(err => {
        console.log('Error saving scores ', err);
        res.status(500).json({
            message : 'Error',
            error: err
        });
    });
});

module.exports = router;
