
var path = require('path');
var _ = require('underscore');
var http = require('http');
var fs = require('fs');
var express = require('express'),
	app = express(),
 	bodyParser =  require('body-parser'),
	config = require('./config'),
	mongoose = require('mongoose'),
	user_action = require('./user_action'),
	cors=require('cors');

var port = process.env.PORT || 8090; // used to create, sign, and verify tokens

mongoose.connect(config.db);


app.use(express.static('assest'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/');
});
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');

});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));

var apiRoutes = express.Router();
var userRoutes = express.Router();


 //app.post('/follower',user_action.follower);
 //app.post('/private',user_action.private);
 //app.post('/accept',user_action.accept);
//app.post('/reject',user_action.reject);

app.use('/api', apiRoutes)

apiRoutes.use('/user', userRoutes);
//var user;

// userRoutes.use('/*', function(req, res, next){
// 	 user = user_action.getUserFromToken(req.headers, res);
// 	console.log("user---", user);
// 	if(!user){
// 		return res.json({code:400, message : "Not logged in."})
// 	}
// 	next();
// })


//---cross origin request sharing ---start
// app.use(cors);
// app.all('/*', function(req, res, next) {
//     // CORS headers
//     res.header("Access-Control-Allow-Origin", "http://localhost:8090"); // restrict it to the required domain
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     // Set custom headers for CORS
//     res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
//     if (req.method == 'OPTIONS') {
//         res.status(200).end();
//     } else {
//         next();
//     }
// });
//---------end

//-------- 3 are from allapis
// app.get('/:key/search', user_action.searchWithkey);
// app.post('/useOfIn', user_action.useOfIn);
// apiRoutes.get('/getUserList',user_action.getUserList);

//WORKING
 apiRoutes.post('/signup',user_action.userSignUp);//for user signup

 //WORKING
 apiRoutes.post('/login', user_action.login);

//---------node Mailer
apiRoutes.post('/verifyOtp',user_action.verifyOtp);
apiRoutes.post('/forgetPassword',user_action.forgetPassword);
apiRoutes.post('/updatePwd',user_action.updatePwd);
//---------node Mailer end


//start----other functionality of node.js ----
userRoutes.post('/:firstName/user-report', function(req, res, next){
	if(req.params.firstName != user.firstName){
		return res.json({code:400, message :"Access denied."})
	}
	user_action.userReport(req, res)
});
// userRoutes.patch('/:username/updateUser', user_action.updateUser);
userRoutes.get('/:firstName/:page/userList', function(req, res, next){
	if(req.params.firstName != user.firstName || user.userType != "admin"){
		return res.json({code:400, message :"Access denied."})
	}
	user_action.getUserList(req, res);
})


userRoutes.get('/:username/getuser', function(req, res, next){
	if(user.userType != "admin"){
		return res.json({code:400, message :"Access denied."})
	}
	user_action.getUser(req, res);
})

app.post('/user/:firstName/updateUser',user_action.updateUser);

// app.get('/user/:firstName/deleteUser',user_action.deleteUser);


// userRoutes.post('/:username/updateUser', function(req, res, next){
// 	// if(user.userType != "admin"){
// 	// 	return res.json({code:400, message :"Access denied."})
// 	// }
// 	user_action.updateUser(req, res);
// })


// 	userRoutes.put('/:username/deleteUser', function(req, res, next){
// 	// if(user.userType != "admin"){
// 	// 	return res.json({code:400, message :"Access denied."})
// 	// }
// 	user_action.deleteuser(req, res);
// })
// userRoutes.patch('/:username/updateAllDetailsUser', function(req, res, next){
// 	if(user.userType != "admin"){
// 		return res.json({code:400, message :"Access denied."})
// 	}
// 	user_action.updateAllDetailsUser(req, res);
// })

// userRoutes.delete('/:username/deleteUser', function(req, res, next){
// 	if(user.userType != "admin"){
// 		return res.json({code:400, message :"Access denied."})
// 	}
// 	user_action.deleteuser(req, res);
// })
//end-------


//WORKING
app.get('/getUserList',user_action.getUserList);//missed on updation

//------- Notification start
userRoutes.get('/:firstName/viewNotification',user_action.viewNotification);
userRoutes.post('/shareReport', user_action.shareReport);
//-------- Notification end
// start the server

app.listen(port);

console.log('http://localhost:' + port);

// app.listen(config.port,function(){
// 	console.log("welcome to the node.js world" +config.port);
// });
