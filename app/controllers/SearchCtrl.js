"use strict"

app.controller("SearchCtrl", function($scope, ApiFactory, StatFactory){

  var lastname
  $scope.players = []
  $scope.esbid = ""
  $scope.pName = ""
  $scope.imgSrc = ""
  $scope.teamAbbr = ""
  $scope.position = ""
  $scope.seasonProjectedPts = ""
  $scope.seasonPts = ""


  $scope.playerSearch = function(){
    // $scope.players = []
    console.log('loading.....')
    ApiFactory.getPlayers()
    .then(function(players){
      $scope.esbid = ""
      $scope.pName = ""
      $scope.imgSrc = ""
      $scope.teamAbbr = ""
      $scope.position = ""
      $scope.seasonProjectedPts = ""
      $scope.seasonPts = ""

      if($scope.playerInput.includes(" ")){
        lastname = $scope.playerInput.slice($scope.playerInput.indexOf(" ")+1, $scope.playerInput.length)
      }else{
        lastname = ""
      }
      let playerData = players.playerentry
      playerData.forEach(function(item){
        var position = item.player.Position
        if($scope.playerInput.toLowerCase() == item.player.FirstName.toLowerCase() || lastname.toLowerCase() === item.player.LastName.toLowerCase()){
          if(position !== "DE" && position !== "OLB" && position !== "DT" && position !== "T" && position !== "LB" && position !== "P" && position !== "FS" && position !== "FB" && position !== "OT"){
            if(position !== "SS" && position !== "G" && position !== "MLB" && position !== "C" && position !== "LS" && position !== "DB" && position !== "CB" && position !== "ILB"){
              $scope.players.push(item.player)
            }
          }
        }
      })
    })
  }

  $scope.getPlayerInfo = function(fName, lName){
    var playerName = fName + " " + lName
    ApiFactory.getPlayerStats()
      .then(function(playerData){
        var playerCollections = playerData.players
        playerCollections.forEach(function(collection){
          if(collection.name === playerName){
            // $scope.esbid = collection.esbid
            $scope.imgSrc = `http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/${collection.esbid}.png`
            $scope.pName = playerName
            $scope.teamAbbr = collection.teamAbbr
            $scope.position = collection.position
            $scope.seasonProjectedPts = collection.seasonProjectedPts
            $scope.seasonPts = collection.seasonPts
            console.log(playerName, collection.stats)
          }
        })
      })
  }

})

  // $scope.esbid
  // $scope.pName
  // $scope.imgSrc
  // $scope.teamAbbr
  // $scope.position
  // $scope.seasonProjectedPts
  // $scope.seasonPts
