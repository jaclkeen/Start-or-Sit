"use strict"

app.controller('ScoringLeadersCtrl', function($scope, ApiFactory){

  $scope.scoringLeaders = []

  ApiFactory.getFantasyScoringLeaders('QB')
  .then(function(leaders){
    console.log('LEADERS', leaders)
    let playerLeaders = leaders.positions.QB
    for(var key in playerLeaders){
        $scope.scoringLeaders.push(playerLeaders[key])
    }
  })

})
