"use strict"

app.controller('LoginCtrl', function($scope, $location, $window, AuthFactory, DbFactory){

  $scope.loginPage = true
  $scope.signUpPage = false
  $scope.loginTxt = true

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
        console.log('DATA', data)
        $window.location.href = '#home'
        $scope.loginTxt = true
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
        $scope.loginTxt = true
      }
      $scope.$apply()
    }).catch(function(error){
      let errorCode = error.code,
          errorMessage = error.message,
          credential = error.credential
    })
  }

  $scope.logout = function(){
    AuthFactory.logoutUser()
    .then(function(data){
      console.log('logout')
      $scope.loginTxt = false
      $window.location.href = '#login'
    })
  }

  $scope.showLogin = function(){
    $scope.loginPage = true
    $scope.signUpPage = false
  }

  $scope.showSignUp = function(){
    $scope.loginPage = false
    $scope.signUpPage = true
  }

})
