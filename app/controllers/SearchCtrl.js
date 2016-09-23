"use strict"

app.controller("SearchCtrl", function($scope, ApiFactory){

  var lastname

  $scope.playerNewsObj = []
  $scope.players = []
  $scope.showPlayerNav = false
  $scope.showPlayerInfo = false
  $scope.showNews = false
  $scope.loader = false
  $scope.playerId = ""
  $scope.esbid = ""
  $scope.pName = ""
  $scope.imgSrc = ""
  $scope.teamAbbr = ""
  $scope.position = ""
  $scope.seasonProjectedPts = 0
  $scope.weekProjectedPts = 0
  $scope.seasonPts = 0
  $scope.passAttempts = 0
  $scope.completions = 0
  $scope.pYards = 0
  $scope.pTD = 0
  $scope.int = 0
  $scope.rushAttempts = 0
  $scope.rushYards = 0
  $scope.rTD = 0
  $scope.receptions = 0
  $scope.recYards = 0
  $scope.recTD = 0
  $scope.fumblesLost = 0
  $scope.twoPtMade = 0
  $scope.patMade = 0
  $scope.patMiss = 0
  $scope.shortFG = 0
  $scope.twentyFG = 0
  $scope.thirtyFG = 0
  $scope.fourtyFG = 0
  $scope.longFG = 0


  $scope.activatePlayerNews = function(){
    $scope.showPlayerInfo = false
    $scope.showVideos = false
    $scope.showNews = true
  }

  $scope.activateStats = function(){
    $scope.showPlayerInfo = true
    $scope.showVideos = false
    $scope.showNews = false
  }

  $scope.playerSearch = function(){
    $scope.showPlayerInfo = false
    $scope.showPlayerNav = false
    ApiFactory.getPlayers()
    .then(function(players){
      $scope.playerNewsObj = []
      $scope.players = []
      $scope.esbid = ""
      $scope.pName = ""
      $scope.imgSrc = ""
      $scope.teamAbbr = ""
      $scope.position = ""
      $scope.seasonProjectedPts = ""
      $scope.seasonPts = ""
      $scope.seasonProjectedPts = 0
      $scope.weekProjectedPts = 0
      $scope.seasonPts = 0
      $scope.passAttempts = 0
      $scope.completions = 0
      $scope.pYards = 0
      $scope.pTD = 0
      $scope.int = 0
      $scope.rushAttempts = 0
      $scope.rushYards = 0
      $scope.rTD = 0
      $scope.receptions = 0
      $scope.recYards = 0
      $scope.recTD = 0
      $scope.fumblesLost = 0
      $scope.twoPtMade = 0
      $scope.patMade = 0
      $scope.patMiss = 0
      $scope.shortFG = 0
      $scope.twentyFG = 0
      $scope.thirtyFG = 0
      $scope.fourtyFG = 0
      $scope.longFG = 0

      if($scope.playerInput.includes(" ")){
        lastname = $scope.playerInput.slice($scope.playerInput.indexOf(" ")+1, $scope.playerInput.length)
      }else{
        lastname = ""
      }
      let playerData = players.playerentry
      playerData.forEach(function(item){
        var position = item.player.Position
        if($scope.playerInput.toLowerCase() == item.player.FirstName.toLowerCase() || lastname.toLowerCase() === item.player.LastName.toLowerCase()){
          if(position !== "DE" && position !== "OLB" && position !== "DT" && position !== "T" && position !== "LB" && position !== "P" && position !== "FS" && position !== "FB" && position !== "OT"){
            if(position !== "SS" && position !== "G" && position !== "MLB" && position !== "C" && position !== "LS" && position !== "DB" && position !== "CB" && position !== "ILB"){
              $scope.players.push(item.player)
            }
          }
        }
      })
    })
  }

  $scope.getPlayerInfo = function(fName, lName){
    $scope.loader = true
    var playerName = fName + " " + lName
    $scope.showNews = false
    ApiFactory.getPlayerStats()
      .then(function(playerData){
        var playerCollections = playerData.players
        playerCollections.forEach(function(collection){
          if(collection.name === playerName){
            $scope.imgSrc = `http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/${collection.esbid}.png`
            $scope.pName = playerName
            $scope.teamAbbr = collection.teamAbbr
            $scope.position = collection.position
            $scope.seasonProjectedPts = collection.seasonProjectedPts
            $scope.seasonPts = collection.seasonPts
            $scope.playerId = collection.id
            console.log(collection)
            for(var key in collection.stats){
              if(key == 1){
                $scope.gamesPlayed = collection.stats[key]
              }
              if(key == 2){
                $scope.passAttempts = collection.stats[key]
              }
              if(key == 3){
                $scope.completions = collection.stats[key]
              }
              if(key == 5){
                $scope.pYards = collection.stats[key]
              }
              if(key == 6){
                $scope.pTD = collection.stats[key]
              }
              if(key == 7){
                $scope.int = collection.stats[key]
              }
              if(key == 13){
                $scope.rushAttempts = collection.stats[key]
              }
              if(key == 14){
                $scope.rushYards = collection.stats[key]
              }
              if(key == 15){
                $scope.rTD = collection.stats[key]
              }
              if(key == 20){
                $scope.receptions = collection.stats[key]
              }
              if(key == 21){
                $scope.recYards = collection.stats[key]
              }
              if(key == 22){
                $scope.recTD = collection.stats[key]
              }
              if(key == 30){
                $scope.fumblesLost = collection.stats[key]
              }
              if(key == 32){
                $scope.twoPtMade = collection.stats[key]
              }
              if(key == 33){
                $scope.patMade = collection.stats[key]
              }
              if(key == 34){
                $scope.patMiss = collection.stats[key]
              }
              if(key == 35){
                $scope.shortFG = collection.stats[key]
              }
              if(key == 36){
                $scope.twentyFG = collection.stats[key]
              }
              if(key == 37){
                $scope.thirtyFG = collection.stats[key]
              }
              if(key == 38){
                $scope.fourtyFG = collection.stats[key]
              }
              if(key == 39){
                $scope.longFG = collection.stats[key]
              }
              $scope.weekProjectedPts = collection.weekProjectedPts
              $scope.currentWeekPts = collection.weekPts
            }
              $scope.showPlayerInfo = true
              $scope.showPlayerNav = true
              $scope.playerInput = ""
              $scope.players = []
              $scope.loader = false
          }
        })
      })
  }

  $scope.getPlayerNews = function(playerId){
    $scope.playerNewsObj = []
    ApiFactory.getNews(playerId)
      .then(function(news){
        let i = 0
        let resultNews = news.players[0].notes
        for(let key in resultNews){
          if(i < 5){
            $scope.playerNewsObj.push(resultNews[key])
            console.log(news)
            i++
          }
        }
      })
  }

})
