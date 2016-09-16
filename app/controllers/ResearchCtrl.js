"use strict"

app.controller('ResearchCtrl', function($scope, ApiFactory){
  $scope.editorRanks = []
  $scope.scoringLeaders = []
  $scope.playerResearch = []
  $scope.recentNews = []

  ApiFactory.getEditorWeekRanks('QB')
  .then(function(ranks){
    let count = 0
    let playerRanks = ranks.players
    for(var key in playerRanks){
      if(count < 5){
        $scope.editorRanks.push(playerRanks[key])
        count++
      }
    }
  })

  ApiFactory.getFantasyScoringLeaders('QB')
  .then(function(leaders){
    let count = 0
    console.log('LEADERS', leaders)
    let playerLeaders = leaders.positions.QB
    for(var key in playerLeaders){
      if(count < 5){
        $scope.scoringLeaders.push(playerLeaders[key])
        count++
      }
    }
  })

  ApiFactory.getFantasyResearchInfo()
  .then(function(researchInfo){
    let count = 0
    let info = researchInfo.players
    for(var key in info){
      if(count < 5){
        $scope.playerResearch.push(info[key])
        count++
      }
    }
  })

  ApiFactory.getMostRecentPlayerNews()
  .then(function(news){
    let count = 0
    console.log('NEWS', news)
    let playerNews = news.news
    for(var key in playerNews){
      if(count < 5){
        if(playerNews.position !== "DE" && playerNews.position !== "OLB" && playerNews.position !== "DT" && playerNews.position !== "T" && playerNews.position !== "LB" && playerNews.position !== "P" && playerNews.position !== "FS" && playerNews.position !== "FB" && playerNews.position !== "OT"){
        if(playerNews.position !== "SS" && playerNews.position !== "G" && playerNews.position !== "MLB" && playerNews.position !== "C" && playerNews.position !== "LS" && playerNews.position !== "DB" && playerNews.position !== "CB" && playerNews.position !== "ILB"){
          $scope.recentNews.push(playerNews[key])
          count++
        }
        }
      }
    }
  })

})
