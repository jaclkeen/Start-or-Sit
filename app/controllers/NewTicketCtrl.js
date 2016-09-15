"use strict"

app.controller("NewTicketCtrl", function($scope, ApiFactory){

  var lastname = ""
  var lastname2 = ""
  $scope.p1Input = ""
  $scope.p2Input = ""
  $scope.p1Players = []
  $scope.p2Players = []

  $scope.p1Search = function(){
    console.log('loading.....')
    ApiFactory.getPlayers()
    .then(function(players){
      $scope.p1Players = []
      if($scope.p1Input.includes(" ")){
        lastname = $scope.p1Input.slice($scope.p1Input.indexOf(" ")+1, $scope.p1Input.length)
      }else{
        lastname = ""
      }
      let count = 0
      let playerData = players.playerentry
      playerData.forEach(function(item){
        var position = item.player.Position
        if($scope.p1Input.toLowerCase() == item.player.FirstName.toLowerCase() || lastname.toLowerCase() === item.player.LastName.toLowerCase()){
          if(position !== "DE" && position !== "OLB" && position !== "DT" && position !== "T" && position !== "LB" && position !== "P" && position !== "FS" && position !== "FB" && position !== "OT"){
            if(position !== "SS" && position !== "G" && position !== "MLB" && position !== "C" && position !== "LS" && position !== "DB" && position !== "CB" && position !== "ILB"){
              if(count < 5){
                $scope.p1Players.push(item.player)
                count++
              }
            }
          }
        }
      })
    })
  }

  $scope.p2Search = function(){
    console.log('loading.....')
    ApiFactory.getPlayers()
    .then(function(players){
      $scope.p2Players = []
      if($scope.p2Input.includes(" ")){
        lastname2 = $scope.p2Input.slice($scope.p2Input.indexOf(" ")+1, $scope.p2Input.length)
      }else{
        lastname2 = ""
      }
      let count = 0
      let playerData = players.playerentry
      playerData.forEach(function(item){
        var position = item.player.Position
        if($scope.p2Input.toLowerCase() == item.player.FirstName.toLowerCase() || lastname2.toLowerCase() === item.player.LastName.toLowerCase()){
          if(position !== "DE" && position !== "OLB" && position !== "DT" && position !== "T" && position !== "LB" && position !== "P" && position !== "FS" && position !== "FB" && position !== "OT"){
            if(position !== "SS" && position !== "G" && position !== "MLB" && position !== "C" && position !== "LS" && position !== "DB" && position !== "CB" && position !== "ILB"){
              if(count < 5){
                $scope.p2Players.push(item.player)
                count++
              }
            }
          }
        }
      })
    })
  }

})
