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
    let playerNews = news.news
    for(var key in playerNews){
      if(count < 5){
        if(playerNews[key].position !== "DE" && playerNews[key].position !== "OLB" && playerNews[key].position !== "DT" && playerNews[key].position !== "T" && playerNews[key].position !== "LB" && playerNews[key].position !== "P" && playerNews[key].position !== "FS" && playerNews[key].position !== "FB" && playerNews[key].position !== "OT"){
          if(playerNews[key].position !== "SS" && playerNews[key].position !== "G" && playerNews[key].position !== "MLB" && playerNews[key].position !== "C" && playerNews[key].position !== "LS" && playerNews[key].position !== "DB" && playerNews[key].position !== "CB" && playerNews[key].position !== "ILB" && playerNews[key].position !== "DL"){
            $scope.recentNews.push(playerNews[key])
            count++
          }
        }
      }
    }
  })

})
