var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mongoosePaginate = require('mongoose-paginate');



var userSchema = new Schema({
	firstName:{type:String,required:true},// otp -- firstName
	lastName:{type:String},
	age:{type:String},
	email:{type:String},
	password:{type:String},
	date:{type:Date},
	company:{type:String},
	address:{type:String},
	gender:{type:String},
	mobile:{type:Number},
	education:{type:String},
	userType:{type:String, default: "user"},
	status:{type:String, default:"Active"},
	otp:{type:String},
	otpStatus:{type:String, default: ""}

})

//for admin creation
userSchema.plugin(mongoosePaginate);
var adminCreation = mongoose.model('user', userSchema);
var admin;
var selfInvoke = function(){
	adminCreation.count(function(err, data){
		if(err){
			throw err;
		}
		else if(data!=0){
			console.log("admin already created");
		}
		else{
			admin = new adminCreation({firstName:"rajat", email:"rajat@123", password:"1342", userType:"admin"});
			admin.save(function(err,data){
				if(err){
					console.log("error");
				}
				else{
					console.log("Admin created successfully");
				}
			})
		}
	})
};
selfInvoke();


module.exports = adminCreation;