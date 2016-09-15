"use strict"

app.controller('NavCtrl', function($scope, AuthFactory){
  console.log('NavCtrl working')
  $scope.logout = true
  if(AuthFactory.getUser()){
    $scope.logout = true
  }
})
