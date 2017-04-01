
//-----------/.model/user
//
Signup schem 
        otp:{type:String},
		otpStatus:{type:String, default: ""}


//----------------- server.js


apiRoutes.post('/verifyOtp',user_action.verifyOtp);

apiRoutes.post('/forgetPassword',user_action.forgetPassword);

apiRoutes.post('/updatePwd',user_action.updatePwd);






//------------user_action.js 
var nodemailer = require('nodemailer');



exports.forgetPassword = function(req,res){
		if(!req.body.email){
			res.json({code:400,message:"Please enter valid email"})
		}
		else
		{
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
					       user: "utkarshvashishtha1995@gmail.com",
					       pass: "anshika@#0131"
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
						from: "utkarshvashishtha1995@gmail.com", // sender address.  Must be the same as authenticated user if using Gmail.
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




	