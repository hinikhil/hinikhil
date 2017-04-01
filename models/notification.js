var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var notificationSchema = new Schema({
	firstName:{type:String},
	sharedWith:[{
		firstName:{type:String},
		isRead:{type:Boolean, default:false}
	}],
	reportId:{type:String, ref:'userreport'}
})

module.exports = mongoose.model('notification', notificationSchema);