"use strict"

let app = angular.module("StartOrSit", ["ngRoute"])
  .constant('FirebaseURL', "https://start-or-sit.firebaseio.com/")

  app.config(function($routeProvider){
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/home', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
      })
      .when('/newTicket', {
        templateUrl: 'partials/newTicket',
        controller: 'NewTicketCtrl'
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
