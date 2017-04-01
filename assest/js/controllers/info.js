app.controller('infoCtrl',['myService', function(myService,$scope){
	var info=this;
	info.firstName = myService.arr.firstName;
	info.lastName = myService.arr.lastName;
	info.email = myService.arr.email;
	info.password = myService.arr.password;
	



}]);

