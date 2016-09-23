"use strict"

let app = angular.module("StartOrSit", ["ngRoute", "ngMaterial"])
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
      .when('/editorRanks', {
        templateUrl: 'partials/researchAreaPartials/editorRanks',
        controller: 'EditorRanksCtrl'
      })
      .when('/scoringLeaders', {
        templateUrl: 'partials/researchAreaPartials/scoringLeaders',
        controller: 'ScoringLeadersCtrl'
      })
      .when('/fantasyResearch', {
        templateUrl: 'partials/researchAreaPartials/playerResearch',
        controller: 'PlayerResearchCtrl'
      })
      .when('/recentNews', {
        templateUrl: 'partials/researchAreaPartials/recentNews',
        controller: 'RecentNewsCtrl'
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
