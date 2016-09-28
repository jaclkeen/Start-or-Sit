"use strict"

app.factory('ApiFactory', function($q, $http){

  let week = 4

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
        resolve(playerStats)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  let getWeekPlayerStats = function(week){
    return $q(function(resolve, reject){
      $http.get(`http://api.fantasy.nfl.com/v1/players/weekstats?&week=${week}&format=json`)
      .success(function(playerStats){
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
      $http.get(`http://api.fantasy.nfl.com/v1/players/editorweekranks?&count=30&season=2016&week=${week}&position=${position}&format=json`)
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
      $http.get("http://api.fantasy.nfl.com/v1/players/researchinfo?&count=200&format=json")
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
    console.log(position)
    return $q(function(resolve, reject){
      $http.get(`http://api.fantasy.nfl.com/v1/players/scoringleaders?&count=30&season=2016&position=${position}&format=json`)
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

  let getTeamSchedule = function(){
    return $q(function(resolve, reject){
      $http.get('gameSchedule.json')
      .success(function(games){
        console.log(games)
        resolve(games)
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
    getTeamSchedule,
    getWeekPlayerStats,
    getEditorWeekRanks,
    getFantasyResearchInfo,
    getMostRecentPlayerNews,
    getFantasyScoringLeaders
  }

})
