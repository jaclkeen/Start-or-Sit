"use strict"

app.controller('EditorRanksCtrl', function($scope, ApiFactory){

  $scope.position = "QB"
  $scope.editorRanks = []

  $scope.getERanks = function(position){
    ApiFactory.getEditorWeekRanks(position)
    .then(function(ranks){
      let playerRanks = ranks.players
      $scope.editorRanks = []
      for(var key in playerRanks){
        $scope.editorRanks.push(playerRanks[key])
      }
    })
  }

  $scope.getERanks("QB")

})
