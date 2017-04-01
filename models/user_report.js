var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userReportSchema = new Schema({
	firstName:{type:String, required:true},
	report_details:{type:String},
	status:{type:String, default: "Active"}
})


module.exports = mongoose.model('userreport', userReportSchema);