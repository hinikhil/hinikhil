var express = require('express'),
	app = express(),
	bodyParser =  require('body-parser'),
	Signup = require('./models/signup'),
	config = require('./config'),
	jwt = require('jsonwebtoken'),
	UserReport = require('./models/user_report');
	//---------OTP MODIFY
	var nodemailer = require('nodemailer');
	var Notification = require('./models/notification');


exports.getUserFromToken = function(headers, res){
	var token = headers.authorization;
	if(!headers || !headers.authorization){
		return res.json({code:400, message:"Unauthorized action."})
	}
	var decoded = jwt.decode(token, config.secret);
	return decoded._doc;
}

//save details of user in mongodb
exports.userSignUp = function(req, res){
	console.log("req body of signup111--", JSON.stringify(req.body));
	var signup = new Signup(req.body);
	signup.save(function(err, resultUser){
		if(err){
			res.send({code:400, message: "Error"});
			console.log(err);
		}
		else{
			var token = jwt.sign(resultUser, config.secret);// Token generating
			res.send({code: 200, user: resultUser, token: token});
		}
	});
}

exports.login = function(req, res){
	 console.log("sssss"+req.body.email+"pass"+ req.body.password);
	Signup.findOne({email:req.body.email, password:req.body.password}, function(err, user_info){
		if(err){
			return res.json({code:400, message:"Unexpected error"})
		}else if(!user_info){
			return res.json({code:404, message: "User not found."})
		}else{
			var token = jwt.sign(user_info, config.secret);// Token generating
			res.send({code: 200, user_info: user_info, token: token});
		}
	})
}

exports.adminDetails = function(req, res) {
        console.log("firstName : "+req.params.firstName );
        User.findOne({ firstName: req.params.firstName  }, avoid).exec(function(err, result) {
            if (err) throw err;
            res.send({
                result: result,
                responseCode: 200,
                responseMessage: "Show data successfully."});
        });
    }
    


//sto generate user report
exports.userReport = function(req, res){
	console.log("req body of userReport--", JSON.stringify(req.body));
	UserReport.findOne({firstName:req.params.firstName}, function(err, report){
		console.log("report---", report);
		if(err){
			return res.json({code:400, message:"Unexpected error"})
		}else if(!report){
			var report = new UserReport({firstName:req.params.firstName, report_details:req.body.report_details});
			report.save(function(err, report){
				if(err){
					res.send({code:400, message: "Error"});
					console.log(err);
				}
				else{
					res.send({code: 200, report: report});
				}
			});
		}else{
			return res.json({code:401, message: "already submitted."})
		}
	})	
}

// exports.getUserList = function(req,res){
// 	if(!req.params.page){
// 		return res.json({code:400, message: "Page number is missing."})
// 	}
// 	Signup.paginate({status:"Active"},{page:req.params.page, limit:config.limit}).then(function(userList){
// 		res.json({code:200, userList:userList});
// 	})
// }


exports.getUserList = function(req,res){
	console.log("req");
	Signup.find(function(err, user_info){
		if(err){
			return res.json({code:400, message: "User not found."})
		}else{
			res.send({code: 200, user_info: user_info});
		}
})
}


exports.getUser = function(req, res){
	var username = req.params.username;
	if(!username){
		return res.json({code:400, message: "username is missing."})
	}
	var user_selecting = 'firstName email userType';
	Signup.findOne({firstName:username}).select(user_selecting).exec(function(err, user_info){
		if(err){
					res.send({code:400, message: "Error"});
					console.log(err);
				}else{
					return res.json({code:200, user_info:user_info});
				}
	})
}

 exports.updateUser = function(req, res){
 	console.log("req body--update>>>" + JSON.stringify(req.body)+" req params firstname "+req.params.firstName + "req.body.firstName" +req.body.firstName);

 	//Signup.findOneAndUpdate({firstName:req.params.firstName},{$set:{email:req.body.email}},{new:true}, function(err, updateResult){
 	 	Signup.findOneAndUpdate({firstName:req.params.firstName},req.body,{new:true}, function(err, updateResult){
 		if(err){
			res.send({code:400, message: "Error"});
			console.log(err);
		}else{
			console.log("success-3");
                res.send({
                    result: updateResult,
                    responseCode: 200,
                    responseMessage: "Details update successfully."
                });
		}
 	})
 }

 // exports.updateAllDetailsUser = function(req, res){
 // 	Signup.findOneAndUpdate({firstName:req.params.username},req.body,{new:true}, function(err, updateResult){
 // 		if(err){
	// 		res.send({code:400, message: "Error"});
	// 		console.log(err);
	// 	}else{
	// 		return res.json({code:200, updateResult:updateResult});
	// 	}
 // 	})
 // }

 // exports.deleteuser = function(req, res){
 // 	console.log("req body--delete>>>" + JSON.stringify(req.body)+" req params firstname "+req.params.firstName + "req.body.firstName" +req.body.firstName);

 // 	Signup.remove({firstName: req.params.firstName}, function(err, userDeleted){
 // 		return res.json({code:200, message:userDeleted});
 // 	})
 // }

exports.shareReport = function(req, res){
	if(!req.body.reportId){
		return res.json({code:400, message:"Report id is missing."})
	}
 	var usernames = req.body.sharedUsernames; // ["abhishek", "abc", "rew"];
 	var shareWith = [];
 	for(var i =0; i<usernames.length; i++){
 		var obj = {};
 		obj.firstName = usernames[i];
 		shareWith.push(obj)
 	}
 	var notification = new Notification({
 		firstName: req.body.username,
 		sharedWith: shareWith,
 		reportId:req.body.reportId
 	})
 	notification.save(function(err, notifications){
 		if(err){
 			return res.json(err)
 		}
 		return res.json({code:200, notification:notification})
 	})
 }

 exports.viewNotification = function(req, res){
 	Notification.find({'sharedWith.firstName':{$in:[req.params.firstName]}}).populate('reportId').exec(function(err,data)
 	{
 		res.json({code:200,message:data});
 	})
 }

 exports.searchWithkey = function(req, res){
 	Signup.find({firstName:{$regex:req.params.key, $options:'i'}}, function(err, result){
 		res.send(result);
 	})
 }
 exports.useOfIn = function(req, res){
 	Signup.find({firstName:{$in:req.body.names}}, function(err, result){
 		res.send(result);
 	})
 }

	
//----- Mailer (otp) start

 exports.forgetPassword = function(req,res){
 	if(!req.body.email){
 		res.json({code:400,message:"Please enter valid email"})
 	}
 	else
 	{
 		console.log("jjj="+JSON.stringify(req.body.email));
 		Signup.findOne({email:req.body.email},function(err,data){
 			if(err){
 				throw err;
 			}
 			else if(!data){
 				res.json({code:401, message:"email id does not exist."})
 			}else{
 				var smtpTransport = nodemailer.createTransport({
					   service: "Gmail",  // sets automatically host, port and connection security settings
					   auth: {
					   	user: "nj7870@gmail.com",
					   	pass: "Nikhil.1"
					   }
					});
 				var text="";
 				var otppossible ="abcdefghijkl123456780";
 				for(var i=0;i<5;i++)
 				{
 					text += otppossible.charAt(Math.floor(Math.random() * otppossible.length));

 				}

 				console.log("otp---",text);
					smtpTransport.sendMail({  //email options
						from: "XYZ@info.com", // sender address.  Must be the same as authenticated user if using Gmail.
						to: req.body.email, // receiver
						subject: "Forget password otp", // subject
						text: "Your otp is "+ text // body
						}, function(error, response){  //callback
							if(error){
								console.log(error);
								res.send({code:400, message:error})
							}else{
							//res.send({code:200, message:"mail sent."})


							data.otp = text;
							data.otpStatus = "otpSend";
							data.save(function(err,data){
								if(err){
									return res.json({code:400,message:"not found"})
								}else{
									return res.json({code:200,data:data})
								}
							})
						}

					});
				}

			})
 	}
 }

 exports.verifyOtp= function(req,res){
 	console.log(req.body.otp);
 	if(!req.body.otp){
 		return res.json({code:400,message:"please enter otp first"})
 	}
 	else
 	{

 		Signup.findOne({email:req.body.email},{password:0},function(err,result)
 		{
 			if(err)
 			{
 				res.json({code:400,message:"error in finding data"});
 			}
 			else
 			{
 				if(result.otp==req.body.otp)
 				{
 					result.otpStatus="verfied";
 					result.save(function(err,result)
 					{
 						if(err)
 						{
 							res.json({code:400,message:"error in finding data"});
 						}
 						else
 						{
 							res.json({code:200,message:"successfully"});
 						}

 					});
 				}
 				else
 				{
 					res.json({code:401,message:"you entered wrong otp"})
 				}
 			}
 		})
 	}
 }

 exports.updatePwd = function(req,res){

 	Signup.findOneAndUpdate({email:req.body.email},{$set:{password:req.body.password}},{new:true}, function(err, updateResult){
 		if(err){
 			res.send({code:400, message: "Error"});
 			console.log(err);
 		}else{
 			return res.json({code:200, message:"Password Updated"});
 		}
 	})

 }

//----- Mailer (otp) end 