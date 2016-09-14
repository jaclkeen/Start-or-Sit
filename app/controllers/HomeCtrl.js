"use strict"

app.controller('HomeCtrl', function($scope, ApiFactory){

  // $scope.playerInput = ""
  // $scope.players = []
  // $scope.teams = []
  $scope.showAllQ = true
  $scope.showMyQ = false
  $scope.showSearch = false
  $scope.showPlayerInfo = false
  $scope.showResearch = false
  $scope.crumbs = "Show All Qs"

  $scope.showResearchArea = function(){
    $scope.showAllQ = false
    $scope.showMyQ = false
    $scope.showSearch = false
    $scope.showResearch = true
    $scope.showPlayerInfo = false
    $scope.crumbs = 'Research'
  }

  $scope.showAllQs = function(){
    $scope.showAllQ = true
    $scope.showMyQ = false
    $scope.showSearch = false
    $scope.showResearch = false
    $scope.showPlayerInfo = false
    $scope.crumbs = 'Show All Qs'
  }

  $scope.showMyQs = function(){
    $scope.showAllQ = false
    $scope.showMyQ = true
    $scope.showSearch = false
    $scope.showResearch = false
    $scope.showPlayerInfo = false
    $scope.crumbs = 'Show My Qs'
  }

  $scope.showPlayerSearch = function(){
    $scope.showAllQ = false
    $scope.showMyQ = false
    $scope.showSearch = true
    $scope.showResearch = false
    $scope.showPlayerInfo = false
    $scope.crumbs = 'Player Search'
  }

  // $scope.playerSearch = function(){
  //   $scope.players = []
  //   ApiFactory.getPlayers()
  //   .then(function(players){
  //     if($scope.playerInput.includes(" ")){
  //       var lastname = $scope.playerInput.slice($scope.playerInput.indexOf(" ")+1, $scope.playerInput.length)
  //     }
  //     let playerData = players.playerentry
  //     playerData.forEach(function(item){
  //       var position = item.player.Position
  //       if($scope.playerInput.toLowerCase() == item.player.FirstName.toLowerCase()){ //&& lastname.toLowerCase() === item.player.LastName.toLowerCase()){
  //         if(position !== "DE" && position !== "OLB" && position !== "DT" && position !== "T" && position !== "LB" && position !== "P" && position !== "FS" && position !== "FB" && position !== "OT"){
  //           if(position !== "SS" && position !== "G" && position !== "MLB" && position !== "C" && position !== "LS" && position !== "DB" && position !== "CB"){
  //             $scope.players.push(item.player)
  //             // $scope.teams.push(item.team)
  //             console.log($scope.players)
  //           }
  //         }
  //       }
  //     })
  //   })
  // }

  // $scope.getPlayerInfo = function(fName, lName){
  //   console.log('NAME', fName + " " + lName)
  // }

})
