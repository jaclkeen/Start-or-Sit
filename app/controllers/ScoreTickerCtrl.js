"use strict"

app.controller("ScoreTickerCtrl", function($scope, $http, ApiFactory){

  $scope.games = []

  let domStuff = function(games){
    console.log(games.ss)
    games.ss.forEach(function(game){
      console.log(game)
    })
  }

  let getScores = function(){
    var xml = new XMLHttpRequest()
    xml.open('GET', 'http://www.nfl.com/liveupdate/scorestrip/scorestrip.json')
    xml.addEventListener('load', function(){
      // console.log(xml.responseText.replace(/,(?=,)/gm, ",\"\""))
      $scope.games.push(xml.responseText.replace(/,(?=,)/gm, ",\"\""))
      $scope.games = JSON.parse($scope.games)
      domStuff($scope.games)
    })
      xml.send()
  }

  getScores()

})
