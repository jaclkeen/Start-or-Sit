"use strict"

app.factory('ApiFactory', function($q, $http){

  let getPlayers = function(){
    return $q(function(resolve, reject){
      $http.get('players.json')
      .success(function(data){
        resolve(data)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  let getPlayerStats = function(){
    return $q(function(resolve, reject){
      $http.get("http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2016&format=json")
      .success(function(playerStats){
        // console.log(playerStats)
        resolve(playerStats)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  let getNews = function(playerId){
    return $q(function(resolve, reject){
      $http.get(`http://api.fantasy.nfl.com/v1/players/details?playerId=${playerId}&statType=seasonStatsformat=json`)
      .success(function(news){
        resolve(news)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  return {
    getPlayers,
    getPlayerStats,
    getNews
  }

})
