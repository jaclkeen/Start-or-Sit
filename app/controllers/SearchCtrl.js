"use strict"

app.controller("SearchCtrl", function($scope, ApiFactory){

  var lastname
  let pID = ""
  let getTeamSchedule = []
  $scope.currentWeek = '1'
  $scope.week = 16
  $scope.statLabels = []
  $scope.nonChartPlayerWeekStats = []

  // FOR LINE CHART
  $scope.statType = 'Pass Yds'
  $scope.playerWeekStats = [[]]
  $scope.chartPlayerStats = ""
  ////////////////
  // FOR PIE CHART
  $scope.labels = ['Adds', 'Drops']
  $scope.data = []
  ////////////////
  $scope.playerNewsObj = []
  $scope.players = []
  $scope.showPlayerNav = false
  $scope.graphs = false
  $scope.showPlayerInfo = false
  $scope.showNews = false
  $scope.loader = false
  $scope.showSeasonStats = false
  $scope.playerId = ""
  $scope.pName = ""
  $scope.imgSrc = ""
  $scope.teamAbbr = ""
  $scope.playerPosition = ""
  $scope.position = ""
  $scope.seasonProjectedPts = 0
  $scope.weekProjectedPts = 0
  $scope.seasonPts = 0

  $scope.weekQBObject = {
    pYds: [0,5],
    pAtt: [0,6],
    comp: [0,2],
    pTD: [0,3],
    int: [0,7],
    rYds: [0,14],
    rTD: [0,15],
    fum: [0,30]
  }

  $scope.weekRBObject = {
    14: 0,
    13: 0,
    15: 0,
    20: 0,
    21: 0,
    22: 0,
    30: 0,
    32: 0
  }

  $scope.weekWRObject = {
    20: 0,
    21: 0,
    22: 0,
    13: 0,
    14: 0,
    15: 0,
    30: 0,
    32: 0
  }

  $scope.weekTEObject = {
    20: 0,
    21: 0,
    22: 0,
    30: 0,
    32: 0
  }

  $scope.weekKObject = {
    33: 0,
    34: 0,
    35: 0,
    36: 0,
    37: 0,
    38: 0,
    39: 0
  }

  $scope.weekDObject = {
    54: 0,
    45: 0,
    46: 0,
    47: 0,
    49: 0,
    50: 0,
    53: 0
  }


  $scope.qbObject = {
    gamesPlayed: 0,
    PassAttempts: 0,
    completions: 0,
    PassYards: 0,
    PassTd: 0,
    int: 0,
    rushYards: 0,
    rushTD: 0,
    fumbles: 0
  }

  $scope.rbWrObject = {
    gamesPlayed: 0,
    rushAttempts: 0,
    rushYards: 0,
    rushTD: 0,
    receptions: 0,
    recYards: 0,
    recTD: 0,
    fumbles: 0,
    twoPtMade: 0
  }

  $scope.teObject = {
    gamesPlayed: 0,
    receptions: 0,
    recYards: 0,
    recTD: 0,
    fumbles: 0,
    twoPtMade: 0
  }

  $scope.kObject = {
    gamesPlayed: 0,
    patMade: 0,
    patMiss: 0,
    shortFG: 0,
    twentyFG: 0,
    thirtyFG: 0,
    fourtyFG: 0,
    fiftyFG: 0
  }

  $scope.dObject = {
    sacks: 0,
    int: 0,
    fumRec: 0,
    safties: 0,
    td: 0,
    returnTD: 0,
    zeroPts: 0,
    sevenPts: 0,
    fourteenPts: 0,
    twentyPts: 0,
    twentyEightPts: 0,
    threeFivePlusPts: 0
  }

  $scope.activatePlayerNews = function(){
    $scope.showPlayerInfo = false
    $scope.showVideos = false
    $scope.showNews = true
    $scope.showSeasonStats = false
    $scope.graphs = false
  }

  $scope.activateStats = function(){
    $scope.showPlayerInfo = true
    $scope.showVideos = false
    $scope.showNews = false
    $scope.showSeasonStats = true
    $scope.graphs = false
  }

  $scope.activateGraphs = function(){
    $scope.showPlayerInfo = false
    $scope.showVideos = false
    $scope.showNews = false
    $scope.showSeasonStats = false
    $scope.graphs = true
  }

  $scope.playerSearch = function(){
    $scope.showPlayerInfo = false
    $scope.showPlayerNav = false
    $scope.showSeasonStats = false
    $scope.graphs = false
    // USED TO CLEAR RESULTS WHEN RB OR WR IS LOADED
    for(var key in $scope.rbWrObject){
      $scope.rbWrObject[key] = 0
    }

    ApiFactory.getPlayers()
    .then(function(players){
      pID = ""
      $scope.playerNewsObj = []
      $scope.players = []
      $scope.pName = ""
      $scope.imgSrc = ""
      $scope.teamAbbr = ""
      $scope.playerPosition = ""
      $scope.seasonProjectedPts = ""
      $scope.seasonPts = ""
      $scope.seasonProjectedPts = 0
      $scope.weekProjectedPts = 0
      $scope.seasonPts = 0
      $scope.position = ""

      let playerData = players.playerentry
      playerData.forEach(function(item){
        let fullName = item.player.FirstName.toLowerCase() + " " + item.player.LastName.toLowerCase()
        let position = item.player.Position
        if($scope.playerInput.toLowerCase() === item.player.FirstName.toLowerCase() || $scope.playerInput.toLowerCase() === item.player.LastName.toLowerCase() || $scope.playerInput.toLowerCase() == fullName){
          if(position === "WR" || position === "RB" || position === "TE" || position === "QB" || position === "K" || position === "D"){
              $scope.players.push(item.player)
          }
        }
      })
    })
  }

  $scope.getPlayerInfo = function(fName, lName){
    $scope.loader = true
    var playerName = fName + " " + lName
    let dPlayerName = lName + " " + fName
    $scope.showNews = false
    ApiFactory.getPlayerStats()
      .then(function(playerData){
        var playerCollections = playerData.players
        playerCollections.forEach(function(collection){
          if(collection.name === playerName || collection.name === dPlayerName){
            if(collection.position === 'DEF'){
              $scope.imgSrc = `http://i.nflcdn.com/static/site/7.4/img/teams/${collection.teamAbbr}/${collection.teamAbbr}_logo-80x90.gif`
            }
            else{
              $scope.imgSrc = `http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/${collection.esbid}.png`
            }
            pID = collection.id
            $scope.pName = playerName
            $scope.teamAbbr = collection.teamAbbr
            $scope.position = collection.position
            $scope.seasonProjectedPts = collection.seasonProjectedPts
            $scope.seasonPts = collection.seasonPts
            $scope.playerId = collection.id
            console.log(collection)
            for(var key in collection.stats){
              if(collection.position === 'QB'){
                if(key == 1){
                  $scope.qbObject.gamesPlayed = collection.stats[key]
                }
                if(key == 2){
                  $scope.qbObject.PassAttempts = collection.stats[key]
                }
                if(key == 3){
                  $scope.qbObject.completions = collection.stats[key]
                }
                if(key == 5){
                  $scope.qbObject.PassYards = collection.stats[key]
                }
                if(key == 6){
                  $scope.qbObject.PassTd = collection.stats[key]
                }
                if(key == 7){
                  $scope.qbObject.int = collection.stats[key]
                }
                if(key == 14){
                  $scope.qbObject.rushYards = collection.stats[key]
                }
                if(key == 15){
                  $scope.qbObject.rushTD = collection.stats[key]
                }
                if(key == 30){
                  $scope.qbObject.fumbles = collection.stats[key]
                }
                  $scope.chartPlayerStats = $scope.qbObject
                  $scope.statType = 5
              }

              else if(collection.position === 'RB' || collection.position === 'WR'){
                if(key == 1){
                  $scope.rbWrObject.gamesPlayed = collection.stats[key]
                }
                if(key == 14){
                  $scope.rbWrObject.rushYards = collection.stats[key]
                }
                if(key == 15){
                  $scope.rbWrObject.rushTD = collection.stats[key]
                }
                if(key == 30){
                  $scope.rbWrObject.fumbles = collection.stats[key]
                }
                if(key == 13){
                  $scope.rbWrObject.rushAttempts = collection.stats[key]
                }
                if(key == 20){
                  $scope.rbWrObject.receptions = collection.stats[key]
                }
                if(key == 21){
                  $scope.rbWrObject.recYards = collection.stats[key]
                }
                if(key == 22){
                  $scope.rbWrObject.recTD = collection.stats[key]
                }
                if(key == 32){
                  $scope.rbWrObject.twoPtMade = collection.stats[key]
                }
                  $scope.chartPlayerStats = $scope.rbWrObject
                  if(collection.position === 'RB'){
                    $scope.statType = 14
                  }else{$scope.statType = 21}
              }

            else if(collection.position === 'K'){
              if(key == 1){
                $scope.kObject.gamesPlayed = collection.stats[key]
              }
              if(key == 33){
                $scope.kObject.patMade = collection.stats[key]
              }
              if(key == 34){
                $scope.kObject.patMiss = collection.stats[key]
              }
              if(key == 35){
                $scope.kObject.shortFG = collection.stats[key]
              }
              if(key == 36){
                $scope.kObject.twentyFG = collection.stats[key]
              }
              if(key == 37){
                $scope.kObject.thirtyFG = collection.stats[key]
              }
              if(key == 38){
                $scope.kObject.fourtyFG = collection.stats[key]
              }
              if(key == 39){
                $scope.kObject.fiftyFG = collection.stats[key]
              }
              $scope.chartPlayerStats = $scope.kObject
              $scope.statType = 33
            }

            else if(collection.position === 'TE'){
                if(key == 1){
                  $scope.teObject.gamesPlayed = collection.stats[key]
                }
                if(key == 20){
                  $scope.teObject.receptions = collection.stats[key]
                }
                if(key == 21){
                  $scope.teObject.recYards = collection.stats[key]
                }
                if(key == 22){
                  $scope.teObject.recTD = collection.stats[key]
                }
                if(key == 32){
                  $scope.teObject.twoPtMade = collection.stats[key]
                }
                if(key == 30){
                  $scope.teObject.fumbles = collection.stats[key]
                }
                $scope.statType = 21
                $scope.chartPlayerStats = $scope.teObject
            }

            else if(collection.position === 'DEF'){
                if(key == 45){
                  $scope.dObject.sacks = collection.stats[key]
                }
                if(key == 46){
                  $scope.dObject.int = collection.stats[key]
                }
                if(key == 47){
                  $scope.dObject.fumRec = collection.stats[key]
                }
                if(key == 49){
                  $scope.dObject.safties = collection.stats[key]
                }
                if(key == 50){
                  $scope.dObject.td = collection.stats[key]
                }
                if(key == 53){
                  $scope.dObject.returnTD = collection.stats[key]
                }
                if(key == 55){
                  $scope.dObject.zeroPts = collection.stats[key]
                }
                if(key == 56){
                  $scope.dObject.sevenPts = collection.stats[key]
                }
                if(key == 57){
                  $scope.dObject.fourteenPts = collection.stats[key]
                }
                if(key == 58){
                  $scope.dObject.twentyPts = collection.stats[key]
                }
                if(key == 59){
                  $scope.dObject.twentyEightPts = collection.stats[key]
                }
                if(key == 60){
                  $scope.dObject.threeFivePlusPts = collection.stats[key]
                }
                $scope.statType = 54
                $scope.chartPlayerStats = $scope.dObject
            }

            $scope.weekProjectedPts = collection.weekProjectedPts
            $scope.currentWeekPts = collection.weekPts
            $scope.showPlayerInfo = true
            $scope.showPlayerNav = true
            $scope.playerInput = ""
            $scope.players = []
            $scope.showSeasonStats = true
            $scope.loader = false
          }
          ApiFactory.getTeamSchedule()
            .then(function(games){
              $scope.statLabels = []
              let schedule = games.ss.gms
              let team = collection.teamAbbr
              schedule.forEach(function(game){
                game.g.forEach(function(item){
                  if(item.home === team){
                    getTeamSchedule.push(item.away)
                  }
                  else if(item.away === team){
                    getTeamSchedule.push("@"+item.home)
                  }
                })
              })
              console.log(getTeamSchedule)
              for(let i = 1; i <= $scope.week; i++){
                $scope.statLabels.push('Wk ' + i + ": " + getTeamSchedule[i-1])
              }
            })
        }
      })
          console.log($scope.statType, 'statstat')
          $scope.getResearchChartData()
          $scope.getWeekChartData($scope.week, $scope.statType)
          $scope.getPlayerWeekStats(1)
    })
  }

  $scope.getResearchChartData = function(){
    ApiFactory.getFantasyResearchInfo()
    .then(function(playerResearch){
    playerResearch.players.forEach(function(player){
      if(player.id === pID){
        $scope.data[0] = player.numAdds
        $scope.data[1] = player.numDrops
      }
    })
    })
  }

  $scope.getWeekChartData = function(week, statTypeNum){
    for(let game = 1; game <= week; game++){
      ApiFactory.getWeekPlayerStats(game)
      .then(function(stats){
        for(let key in stats.playerStats){
          if(key == pID){
            $scope.playerWeekStats[0][game-1] = 0
            for(let stat in stats.playerStats[key]){
              if(stat == statTypeNum){
                $scope.playerWeekStats[0][game-1] = stats.playerStats[key][stat]
              }
            }
          }
        }
      })
    }
  }

  $scope.weekStats = []

  $scope.getPlayerWeekStats = function(week){
    ApiFactory.getWeekPlayerStats(week)
      .then(function(weekStats){
        ApiFactory.getStatExplanations()
        .then(function(explanations){
          $scope.weekStats = []
          let x = explanations.stats
          for(let key in weekStats.playerStats){
            for(var stat in weekStats.playerStats[key]){
              for(var expla in x){
                if(key == pID){
                  if(stat == x[expla].id){
                    $scope.weekStats.push({
                      id: x[expla].id,
                      name: x[expla].shortName,
                      stat: weekStats.playerStats[key][stat]
                    })
                  }
                }
              }
            }
          }
          // console.log(x[expla])
          // console.log($scope.qbStats)
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
            i++
          }
        }
      })
  }

})
