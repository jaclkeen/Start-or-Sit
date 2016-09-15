"use strict"

app.controller('MyQCtrl', function($scope, ApiFactory, AuthFactory, DbFactory){
  $scope.plays = []

  DbFactory.getAllPlaysFromFirebase()
  .then(function(plays){
    for(var key in plays){
      if(plays[key].uid === AuthFactory.getUser()){
        console.log('true')
        console.log('UIDTRY', plays[key].uid)
        $scope.plays.push(plays[key])
      }
      else{
        console.log('nope')
      }
    }
  })
})
