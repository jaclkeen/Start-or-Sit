"use strict"

let app = angular.module("StartOrSit", ["ngRoute", "ngMaterial", "chart.js"])
  .constant('FirebaseURL', "https://start-or-sit.firebaseio.com/")

  app.config(function($routeProvider, ChartJsProvider){
    ChartJsProvider.setOptions({colors: ['#1A5C21','red','green', 'blue']})
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
      .when('/research', {
        templateUrl: 'partials/research.html',
        controller: 'ResearchCtrl'
      })
      .when('/myPlays', {
        templateUrl: 'partials/myQ.html',
        controller: 'MyQCtrl'
      })
      .when('/playerSearch', {
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl'
      })
      .otherwise('/login')
  })

  app.run(function(FBCreds){
    let creds = FBCreds
    let authConfig = {
      apiKey: creds.apiKey,
      authDomain: creds.authDomain
    }

    firebase.initializeApp(authConfig)
  })
