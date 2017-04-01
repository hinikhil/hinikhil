app.service('adminServices',function(){
this.userDetail="null"; 
this.eventDetail="null";  
this.myForm={};

});

app.service('userService',function($http){
this.myForm={};
	return{
    // login: function(data) {
    //   alert(data);
    //   return $http.post('/user/login', data);
    // },
    // normalLogin: function(data) {
    //   return $http.post('/user/login', data);
    // },
    // addAdmin: function(data) {
    //   return $http.post('/user/addAdmin', data);
    // },    
    adminDetails: function(firstName) {
      return $http.get('/user/'+firstName+'/adminDetails');
    },    
    editAdminDetails: function(firstName, data) {
      return $http.post('/user/'+firstName+'/updateUser', data);
    },        
    deleteUser: function(firstName, data) {
      return $http.put('/user/'+firstName+'/deleteUser', data);
    },
    listOfAllAdmin: function(data) {
      return $http.get('/user/listOfAllAdmin');
    },
    listOfAllPost: function(data) {
      return $http.get('/post/listOfAllPost');
    },        
    deletePost: function(id, data) {
      return $http.put('/post/deletePost/'+id);
    }
	}


});