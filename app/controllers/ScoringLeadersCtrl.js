"use strict"

app.controller('ScoringLeadersCtrl', function($scope, ApiFactory){

  $scope.scoringLeaders = []
  $scope.position = "QB"

  $scope.getLeaders = function(position){
    ApiFactory.getFantasyScoringLeaders(position)
    .then(function(leaders){
      let playerLeaders = leaders
      $scope.scoringLeaders = []
      for(var key in playerLeaders.positions){
        $scope.scoringLeaders = playerLeaders.positions[key]
      }
    })
  }

  $scope.getLeaders('QB')

})
