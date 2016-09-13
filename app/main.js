"use strict"

let app = angular.module("StartOrSit", ["ngRoute"])
  .constant('FirebaseURL', "https://start-or-sit.firebaseio.com/")

  app.config(function($routeProvider){
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .otherwise('/login')
  })

  app.run(function(FBCreds){
    let creds = FBCreds
    console.log(creds)
    let authConfig = {
      apiKey: creds.apiKey,
      authDomain: creds.authDomain
    }

    firebase.initializeApp(authConfig)
  })
