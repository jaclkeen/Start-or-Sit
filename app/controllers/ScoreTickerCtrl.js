"use strict"

app.controller("ScoreTickerCtrl", function($scope, $http, ApiFactory){

  $scope.games = []
  $scope.gameInfo = []

  let formatTime = function(mTime){

  }

  let domStuff = function(games){
    games.ss.forEach(function(game){
      $scope.gameInfo.push(game)
    })
  }

  let getScores = function(){
    var xml = new XMLHttpRequest()
    xml.open('GET', 'http://www.nfl.com/liveupdate/scorestrip/scorestrip.json')
    xml.addEventListener('load', function(){
      $scope.games.push(xml.responseText.replace(/,(?=,)/gm, ",\"\""))
      $scope.games = JSON.parse($scope.games)
      domStuff($scope.games)
    })
      xml.send()
  }

  getScores()

})
