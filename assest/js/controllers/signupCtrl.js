app.controller('signupCtrl', function($scope,$window, $state, myService) {
    $(window).scrollTop(0, 0);
    $scope.si = {};
    
    var si = this;
    
//----------Newly Added Code 

//--------------dob dynamic data
    $scope.date = function(){
    	$scope.dob = new Date();	
    }
//---------dynamic data end
//---------filter 
    //$scope.listView=['ankit','utkarsh','subham','tiwari','neha','anurag']
	// $scope.myClick=function(dd){

	// 	alert(dd)
	// }
//-----------filter end
  
//----------newly added code end


//-------singup data 
    $scope.signup = function(){

    	console.log(JSON.stringify($scope.si))
        
        myService.arr.firstName=si.firstName;
		myService.arr.lastName=si.lastName;
		myService.arr.age=si.age;
		myService.arr.email=si.email;
		myService.arr.password=si.password;
		myService.arr.date=si.date.toLocaleDateString();
		myService.arr.company=si.company;
		myService.arr.address=si.address;
		myService.arr.gender=si.gender;
		myService.arr.mobile=si.mobile;
		myService.arr.education=si.education;
//---------singup data end
		var data = {
			"firstName":si.firstName,
			"lastName":si.lastName,
			"age":si.age,
			"email":si.email,
			"password":si.password,
			"date":si.date.toLocaleDateString(),
			"company":si.company,
			"address":si.address,
			"gender":si.gender,
			"mobile":si.mobile,
			"education":si.education
			}
			//console.log(JSON.stringify(myService.arr))
			console.log("now here "+JSON.stringify(si))

		myService.postMethod(data,'signup').then(function(objS){
			console.log('success:    '+JSON.stringify(objS))
			if(objS.code==200) {
				//undefined is displayed
				//alert(objS.message)
				alert("User signed up.")
			} else if(objS.code==400) {
				if(objS.message=='Error') {
					alert('User already exist.');
				}
			}
			
			$state.go('info');	
		},function(objE){
			console.log('error:    '+JSON.stringify(objE))
		});
		
    }
//---------singup perinthise end
})
