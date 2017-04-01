app.controller('getuserlistCtrl', function($scope,myService){
$scope.abc={};
$scope.showallusers=function()
{

//myService.abc = $scope.abc;
var i=1
$scope.sno = i++;
//<---------------CONNECTIVITY-------------------->

		// var data = {
		// 	"userType":"user"
		// }
		myService.getMethod('getUserList').then(function(objS){
			console.log('success:    '+JSON.stringify(objS))
			//alert(objS);
			//<-----------getting data-------------------->
			$scope.abc = objS.user_info;
			console.log('Success Data   '+JSON.stringify($scope.abc))
//<------------------------------------------------------->
			if(objS.code==200) {
				//alert("check"+objS.user_info)
			}
			//alert('You have successfully Signed up');
			//$location.path('/info');	
		},function(objE){
			console.log('error:    '+JSON.stringify(objE))
		});
}
})

// $scope.delete=function(firstName)
// {
// 	var url=firstName+'/deleteUser'
//     myService.putMethod(url).then(function(objS){
// 			console.log('success:    '+JSON.stringify(objS))
// 			//alert(objS);
			
// //<------------------------------------------------------->
// 			if(objS.code==200) {
// 				//alert("check"+objS.user_info)
// 					console.log('Deleted successfully ')
// 					 $state.go('getUserList')
// 			}
// 			//alert('You have successfully Signed up');
// 			//$location.path('/info');	
// 		},function(objE){
// 			console.log('error:    '+JSON.stringify(objE))
// 		});

// }

