"use strict"

app.controller('NavCtrl', function($scope, AuthFactory){
  $scope.loginBtn = "Login"

  if(AuthFactory.getUser()){
    $scope.loginBtn = "Logout"
  }
  else{
    console.log('NOT TRUE')
  }

  $scope.userData = AuthFactory.getUserInfo()
})
