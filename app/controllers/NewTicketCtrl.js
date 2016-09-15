"use strict"

app.controller("NewTicketCtrl", function($scope, ApiFactory, DbFactory, AuthFactory){

  var lastname = ""
  var lastname2 = ""
  var allVals = false
  $scope.showLoader = false
  $scope.p1Input = ""
  $scope.p2Input = ""
  $scope.p1Results = true
  $scope.p2Results = true
  // $scope.p1Players = []
  // $scope.p2Players = []
  var selectedPlayers = {
    uid: AuthFactory.getUser(),
    player1: {

    },
    player2: {

    }
  }

  $scope.p1Object = {
    name: "",
    position: "",
    team: "",
    img: ""
  }

  $scope.p2Object = {
    name: "",
    position: "",
    team: "",
    img: ""
  }

  $scope.buildP1Object = function(fName, lName){
    $scope.p1Players = []
    $scope.p2Players = []
    let playerName = fName + " " + lName
    $scope.showLoader = true
    ApiFactory.getPlayerStats()
      .then(function(playerData){
        var playerCollections = playerData.players
        playerCollections.forEach(function(collection){
          if(collection.name === playerName){
            $scope.p1Object.name = collection.name
            $scope.p1Object.position = collection.position
            $scope.p1Object.team = collection.teamAbbr
            $scope.p1Object.img = `http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/${collection.esbid}.png`
            // selectedPlayers.push($scope.p1Object)
            selectedPlayers.player1 = $scope.p1Object
          }
        })
        console.log(selectedPlayers)
        $scope.showLoader = false
      })
  }

  $scope.buildP2Object = function(fName, lName){
    $scope.p1Players = []
    $scope.p2Players = []
    let playerName = fName + " " + lName
    $scope.showLoader = true
    ApiFactory.getPlayerStats()
      .then(function(playerData){
        var playerCollections = playerData.players
        playerCollections.forEach(function(collection){
          if(collection.name === playerName){
            $scope.p2Object.name = collection.name
            $scope.p2Object.position = collection.position
            $scope.p2Object.team = collection.teamAbbr
            $scope.p2Object.img = `http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/${collection.esbid}.png`
            // selectedPlayers.push($scope.p1Object)
            selectedPlayers.player2 = $scope.p2Object
          }
        })
        console.log(selectedPlayers)
        $scope.showLoader = false
      })
    }

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

  $scope.addPlayToFirebase = function(){
    for(var key in selectedPlayers.player1){
      for(var item in selectedPlayers.player2){
        if(selectedPlayers.player1[key] === "" || selectedPlayers.player2[key] === ""){
          allVals = false
        }
        else{
          allVals = true
        }
      }
    }
    if(allVals){
      DbFactory.storeToFirebase(selectedPlayers)
        .then(function(data){
          console.log(data)
          selectedPlayers.player1 = {}
          selectedPlayers.player2 = {}
        })
    }
    else{
      console.log('NOT TODAY MY FRIEND')
    }
  }

})
