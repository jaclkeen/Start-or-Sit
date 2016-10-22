"use strict"

app.controller('LoginCtrl', function($scope, $location, $window, AuthFactory, DbFactory){

  AuthFactory.logoutUser()
  $scope.showHam = true;
  $scope.showMobileMenu = false;
  $scope.loginPage = true
  $scope.signUpPage = false
  $scope.logoutUser = true

  $('.menu li').on('click', function(){
    $('.menu_container').addClass('hidden')
  })

  $scope.logBtn = function(){
    return AuthFactory.isAuthenticated()
  }

  $scope.showMobile = function(){
    $scope.showMobileMenu = true;
    $('.menu_container').toggleClass('hidden')
  }

  $scope.account = {
    email: "",
    password: "",
    name: ""
  }

  $scope.register = function(){
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password,
      name: $scope.account.name
    })
    .then(function(userInfo){
      if(userInfo){
        $scope.login()
        DbFactory.storeUser($scope.account)
        .then(function(firebaseObj){
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
        $('.hamburger').removeClass('hidden')
        let email = data.email
        AuthFactory.setUser(data.uid)
        DbFactory.getUserFromFB()
        .then(function(users){
          for(var key in users){
            if(users[key].email === email){
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
    $('.hamburger').toggleClass('hidden')
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
