var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  movieName: {
    type: String,
    unique:true
  },
  movieUrl : {
    type: String,
    unique:true
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref:'Note'
  }]
  //Have the Schema take an array named "notes" which consists of an array of ObjectIds from the Note Collection
});

var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
