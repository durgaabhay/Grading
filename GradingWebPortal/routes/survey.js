const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Survey = require('../models/surveyList');

router.get('/showSurveyPage', function(req,res) {
   console.log("Showing a new survey with the total number of question:");
   res.render('survey',{title:'Surveys'});
});

router.get('/viewSurvey', function (ewq,res) {
   console.log("Viewing the latest survey questions");
   Survey.find().exec().then(data => {
      console.log("Displaying the current survey: ", data);
      res.render('surveyResults',{title:'Current Survey'});
   }).catch(err => {
      console.log("Error loading the current survey: ", err);
   });
});

router.post('/addSurvey', function(req,res){
   console.log('Adding new survey request', req.body);
   Survey.find().exec()
       .then(survey => {
            if(survey.length > 0){
               Survey.remove().exec();
            }
           const newSurvey = new Survey({
               _id: new mongoose.Types.ObjectId(),
               question1: req.body.ques1,
               question2: req.body.ques2,
               question3: req.body.ques3,
               question4: req.body.ques4,
               question5: req.body.ques5,
               question6: req.body.ques6,
               question7: req.body.ques7,
               question8: req.body.ques8
           });
           newSurvey.save().then(result => {
               res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
               res.render('dashboard',{title:'Dashboard'});
           })
       }).catch(err=> {
            res.status(500).json({
                message : "Error adding the survey",
                error: err
            });
   });
});


module.exports = router;