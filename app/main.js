"use strict"

let app = angular.module("StartOrSit", ["ngRoute", "ngMaterial"])
  .constant('FirebaseURL', "https://start-or-sit.firebaseio.com/")

  let isSignedIn = function(AuthFactory){
    new Promise(function(resolve, reject){
      if(AuthFactory.isAuthenticated()){
        resolve()
      }
      else{
        reject()
      }
    })
  }

  app.config(function($routeProvider){
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/home', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl',
        resolve: {isSignedIn}
      })
      .when('/newTicket', {
        templateUrl: 'partials/newTicket',
        controller: 'NewTicketCtrl',
        resolve: {isSignedIn}
      })
      .when('/editorRanks', {
        templateUrl: 'partials/researchAreaPartials/editorRanks',
        controller: 'EditorRanksCtrl',
        resolve: {isSignedIn}
      })
      .when('/scoringLeaders', {
        templateUrl: 'partials/researchAreaPartials/scoringLeaders',
        controller: 'ScoringLeadersCtrl',
        resolve: {isSignedIn}
      })
      .when('/fantasyResearch', {
        templateUrl: 'partials/researchAreaPartials/playerResearch',
        controller: 'PlayerResearchCtrl',
        resolve: {isSignedIn}
      })
      .when('/recentNews', {
        templateUrl: 'partials/researchAreaPartials/recentNews',
        controller: 'RecentNewsCtrl',
        resolve: {isSignedIn}
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
