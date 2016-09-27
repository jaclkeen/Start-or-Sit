"use strict"

app.controller('LoginCtrl', function($scope, $location, $window, AuthFactory, DbFactory){

  $scope.loginPage = true
  $scope.signUpPage = false
  $scope.logoutUser = true

  $scope.logBtn = function(){
    return AuthFactory.isAuthenticated()
  }

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
    AuthFactory.loginUser($scope.account)
    .then(function(data){
      if(data){
        let email = data.email
        AuthFactory.setUser(data.uid)
        DbFactory.getUserFromFB()
        .then(function(users){
          for(var key in users){
            if(users[key].email === email){
              console.log(users[key], 'USERSKEY')
              AuthFactory.setUserInfo(users[key])
            }
          }
        })
        $window.location.href = '#home'
      }
    })
    .catch(function(error){
      console.log('Error logging in: ', error)
    })
    $scope.logoutUser = true
  }

  $scope.googleLogin = function(){
    AuthFactory.authWithProvider()
    .then(function(result){
      var user = result.user.uid
      if(user){
        $scope.logoutUser = true
        AuthFactory.setUser(user)
        AuthFactory.setGoogleUserInfo(result.user.displayName)
        $window.location.href = '#home'
      }
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
      $window.location.href = '#login'
    })
    $scope.logoutUser = false
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
