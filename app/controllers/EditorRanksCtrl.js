"use strict"

app.controller('EditorRanksCtrl', function($scope, ApiFactory){

  $scope.editorRanks = []

  ApiFactory.getEditorWeekRanks('QB')
  .then(function(ranks){
    let playerRanks = ranks.players
    for(var key in playerRanks){
        $scope.editorRanks.push(playerRanks[key])
    }
  })

})
