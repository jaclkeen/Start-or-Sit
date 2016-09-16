"use strict"

app.controller('PlayerResearchCtrl', function($scope, ApiFactory){

  $scope.playerResearch = []
  $scope.searchText = ""

  ApiFactory.getFantasyResearchInfo()
  .then(function(researchInfo){
    let info = researchInfo.players
    for(var key in info){
        $scope.playerResearch.push(info[key])
    }
  })

})
