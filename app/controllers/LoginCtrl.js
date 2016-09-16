"use strict"

app.controller('LoginCtrl', function($scope, $window, AuthFactory, DbFactory){
  $scope.account = {
    email: "",
    password: "",
    name: ""
  }

  $scope.register = function(){
    console.log('register clicked')
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password,
      name: $scope.account.name
    })
    .then(function(userInfo){
      console.log($scope.account)
      console.log('userInfo', userInfo)
      if(userInfo){
        $scope.login()
        DbFactory.storeUser($scope.account)
        .then(function(firebaseObj){
          console.log(firebaseObj)
        })
      }
    })
    .catch(function(error){
      console.log('Error creating user', error)
    })
  }

  $scope.login = function(){
    console.log('you clicked login')
    AuthFactory.loginUser($scope.account)
    .then(function(data){
      if(data){
        AuthFactory.setUser(data.uid)
        console.log('AUTHFACTORY SET USER', AuthFactory.getUser())
        $window.location.href = '#home'
      }
    })
    .catch(function(error){
      console.log('Error logging in: ', error)
    })
  }

  $scope.googleLogin = function(){
    AuthFactory.authWithProvider()
    .then(function(result){
      var user = result.user.uid
      if(user){
        AuthFactory.setUser(user)
        console.log('user', user)
        $window.location.href = '#home'
      }
      $scope.$apply()
    }).catch(function(error){
      let errorCode = error.code,
          errorMessage = error.message,
          credential = error.credential
    })
  }

})
