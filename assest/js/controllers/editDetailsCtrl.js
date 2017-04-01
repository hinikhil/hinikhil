app.controller('editDetailsCtrl', function($scope, $window, userService, $stateParams, $state) {
    $(window).scrollTop(0, 0);
    $scope.adminDetails={};
 
    //var id = $stateParams.id;
    //console.log("firstName====>>>" + firstName)
    // userService.adminDetails(firstName).success(function(res) {
    //     if (res.responseCode == 200) {

    //         //$scope.adminDetails = res.result

    //         console.log("Login successfully--2" + JSON.stringify($scope.adminDetails))
    //     } else if (res.responseCode == 404) {
    //         //toastr.error(res.responseMessage);
    //     }

    // }).error(function(status, data) {

    // })

    $scope.saveChanges=function(){
         console.log("firstName====>>>" + $stateParams.firstName+"and "+$stateParams.id)
    	userService.editAdminDetails($stateParams.firstName,$scope.adminDetails).success(function(res) {
        if (res.responseCode == 200) {
            //alert("result="+res.result);
            $state.go('getUserList')
        } else if (res.responseCode == 404) {
            //toastr.error(res.responseMessage);
            console.log("error");
        }

    }).error(function(status, data) {

    })
    }

})
