app.controller('loginCtrl', function($scope, $rootScope , $window, $state, myService) {
     $(window).scrollTop(0, 0);
     $scope.myFrom = {};
    
 //-----log in Controller
    $scope.login = function(){

    	  var data = {_id:$scope.id}
    
    	console.log(JSON.stringify($scope.myFromLogin))

        
       
		
	

		var data = {
			"email":$scope.myFromLogin.email,
			"password":$scope.myFromLogin.password,
			
			}
			
			//console.log(JSON.stringify(myService.arr))
			console.log(JSON.stringify($scope.myFromLogin))

		  myService.postLoginMethod(data,'login').then(function(objS){
			console.log('success:    '+JSON.stringify(objS))
			if(objS.code==200) {

				alert("Success : User exist.")
				

				if(objS.user_info.userType=='admin')
				{	$state.go('getUserList');	}
				else{
				$state.go('info');	


				 myService.arr.firstName=objS.user_info.user_name
				myService.arr.lastName=objS.user_info.lastName

				 myService.arr.email=objS.user_info.email
				myService.arr.password=objS.user_info.password


	// 			info.firstName = myService.arr.firstName;
	// info.lastName = myService.arr.lastName;
	// info.age = myService.arr.age;
	// info.date = myService.arr.date;
	// info.company = myService.arr.company;
	// info.address = myService.arr.address;
	// info.gender = myService.arr.gender;
	// info.mobile = myService.arr.mobile;
	// info.education = myService.arr.education;

	// info.username = myService.arr.education;
	// info.education = myService.arr.education;

			}
			
			} else if(objS.code==400) {

				alert('User does not exist');

				if(objS.message=='Error') {

					alert('User does not exist.');
				}
			}
			
		},function(objE){
			console.log('error:    '+JSON.stringify(objE))
		});
		
    }

//----------newly added code for login 


//////////Facebook Login////////////
	$scope.fbLogin = function(){

		FB.getLoginStatus(function(response) {
		    if (response.status === 'connected') {
		    	console.log('Logged in.');
		    }else {
			    FB.login(function(response) 
			    {
				    if (response.authResponse){
				     console.log('Welcome!  Fetching your information.... ');
				     FB.api('/me', function(response) {
				     	$rootScope.logo = response.name;
				       console.log('Good to see you, ' + response.name + '.');  
				     });
				    }else {
			            //user hit cancel button
			        	console.log('User cancelled login or did not fully authorize.');     
			    	}
			    })
		    }
		});
	};


	$scope.logout = function () {

		FB.getLoginStatus(function(response) {
			//var accessToken = response.authResponse.accessToken;
			if (response.status === 'connected') {
				FB.logout(function(response) {
		 			console.log('Logout -->'+ JSON.stringify(response))
				});    
			}else{
				console.log('Already Logged out');
			} 
		});
	}

//////////////Google Plus//////////////////
    
    $scope.onGoogleLogin = function(){
        //alert('Welcome')
        var params = {
            'clientid': '47044236049-cn5nl19h4uamd2tkf418o4nigcgmmv3h.apps.googleusercontent.com',
            'cookiepolicy': 'single_host_origin',
            'callback':'onLoadFunction',
            'approvalprompt': 'force',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
        };
        gapi.auth.signIn(params);
    }
    
    onLoadFunction = function() {
        gapi.client.setApiKey('AIzaSyC3Eg004v4rEpTH6nQHdHGoampulvYKnag');
        gapi.client.load('plus', 'v1', function(){
               gapi.client.load('plus','v1', function(){ 
                var request = gapi.client.plus.people.get({'userId' : 'me'});
                request.execute(function(err,response) {
                    console.log('ID: ' + response.id);
                    console.log('Display Name: ' + response.displayName);
                    console.log('Image URL: ' + response.image.url);
                    console.log('Profile URL: ' + response.url);
                });
            });
        });
    }

//-----------newly added code end

})




//--------- old comment start 1

// app.controller('loginCtrl', function($scope, $window, $state) {
//     $(window).scrollTop(0, 0);
//     $scope.myFrom = {};



//     $scope.login = function() {
//         console.log(JSON.stringify($scope.myFromLogin))
//     }

// })


// $scope.logout = function() {
//         $state.go('login')
//         delete $window.sessionStorage.token;
//         localStorage.removeItem('token');
//         localStorage.isLogged = false;

//     }


// -------------- old comments end 1
