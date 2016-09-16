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

  let getEditorWeekRanks = function(position){
    return $q(function(resolve, reject){
      $http.get(`http://api.fantasy.nfl.com/v1/players/editorweekranks?&count=50&season=2016&week=2&position=${position}&format=json`)
      .success(function(ranks){
        resolve(ranks)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  let getFantasyResearchInfo = function(){
    return $q(function(resolve, reject){
      $http.get("http://api.fantasy.nfl.com/v1/players/researchinfo?&count=100&format=json")
      .success(function(ranks){
        resolve(ranks)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  let getFantasyScoringLeaders = function(position){
    return $q(function(resolve, reject){
      $http.get(`http://api.fantasy.nfl.com/v1/players/scoringleaders?&count=50&season=2016&position=${position}&format=json`)
      .success(function(ranks){
        resolve(ranks)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  let getMostRecentPlayerNews = function(){
    return $q(function(resolve, reject){
      $http.get("http://api.fantasy.nfl.com/v1/players/news?&count=50&format=json")
      .success(function(ranks){
        resolve(ranks)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  return {
    getNews,
    getPlayers,
    getPlayerStats,
    getEditorWeekRanks,
    getFantasyResearchInfo,
    getMostRecentPlayerNews,
    getFantasyScoringLeaders
  }

})
