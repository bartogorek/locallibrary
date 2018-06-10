var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for date formatting using moment
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  if (!!this.date_of_birth) {
    return moment(this.date_of_birth).format('YYYY-MM-DD');
  } else return this.date_of_birth;
});

AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  if (!!this.date_of_death) {
    return moment(this.date_of_death).format('YYYY-MM-DD');
  } else return this.date_of_death;
});


AuthorSchema
.virtual('lifespan')
.get(function () {
  var dob, dod;
  if (!!this.date_of_birth) {
    dob = moment(this.date_of_birth).format('YYYY-MM-DD');
  } else dob = "";
  if (!!this.date_of_death) {
    dod = moment(this.date_of_death).format('YYYY-MM-DD');
  } else dod = "";
  return dob + " - " + dod;
});

  //Export model
module.exports = mongoose.model('Author', AuthorSchema);
