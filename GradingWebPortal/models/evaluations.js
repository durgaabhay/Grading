const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    teamName: {type: String},
    evaluatorName : {type: String},
    answer1: {type: String},
    answer2: {type: String},
    answer3: {type: String},
    answer4: {type: String},
    answer5: {type: String},
    answer6: {type: String},
    answer7: {type: String},
    answer8: {type: String}
});

module.exports = mongoose.model('Evaluations', evaluationSchema);