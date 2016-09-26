"use strict"

app.controller("NewTicketCtrl", function($location, $scope, ApiFactory, DbFactory, AuthFactory, $mdToast){

  var allVals = false
  $scope.showLoader = false
  $scope.p1Input = ""
  $scope.p2Input = ""
  $scope.p1Results = true
  $scope.p2Results = true

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
    img: "",
    votes: 0
  }

  $scope.p2Object = {
    name: "",
    position: "",
    team: "",
    img: "",
    votes: 0
  }

  let showToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .hideDelay(4000)
        .textContent('Play added!')
        .theme("success-toast")
    );
  };

  $scope.buildP1Object = function(fName, lName, position){
    $scope.p1Players = []
    $scope.p2Players = []
    let playerName = fName + " " + lName
    let dPlayerName = lName + " " + fName
    console.log(playerName, 'PLAYERNAME')
    $scope.showLoader = true
    ApiFactory.getPlayerStats()
      .then(function(playerData){
        var playerCollections = playerData.players
        playerCollections.forEach(function(collection){
          if(collection.name === playerName || collection.name === dPlayerName){
            $scope.p1Object.name = collection.name
            $scope.p1Object.position = collection.position
            $scope.p1Object.team = collection.teamAbbr
            if(position !== 'D'){
              $scope.p1Object.img = `http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/${collection.esbid}.png`
              console.log('position', position)
            }
            else if(position === 'D'){
              $scope.p1Object.img = `http://i.nflcdn.com/static/site/7.4/img/teams/${collection.teamAbbr}/${collection.teamAbbr}_logo-80x90.gif`
              console.log('D', collection)
            }
              selectedPlayers.player1 = $scope.p1Object
          }
        })
        console.log(selectedPlayers)
        $scope.showLoader = false
      })
  }

  $scope.buildP2Object = function(fName, lName, position){
    $scope.p1Players = []
    $scope.p2Players = []
    let playerName = fName + " " + lName
    let dPlayerName = lName + " " + fName
    $scope.showLoader = true
    ApiFactory.getPlayerStats()
      .then(function(playerData){
        var playerCollections = playerData.players
        playerCollections.forEach(function(collection){
          if(collection.name === playerName || collection.name === dPlayerName){
            $scope.p2Object.name = collection.name
            $scope.p2Object.position = collection.position
            $scope.p2Object.team = collection.teamAbbr
            if(position !== 'D'){
              $scope.p2Object.img = `http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/${collection.esbid}.png`
            }
            else{
              $scope.p2Object.img = `http://i.nflcdn.com/static/site/7.4/img/teams/${collection.teamAbbr}/${collection.teamAbbr}_logo-80x90.gif`
            }
            selectedPlayers.player2 = $scope.p2Object
          }
        })
        $scope.showLoader = false
      })
    }

  $scope.p1Search = function(){
    ApiFactory.getPlayers()
    .then(function(players){
      $scope.p1Players = []
      let count = 0
      let playerData = players.playerentry
      playerData.forEach(function(item){
        let fullName = item.player.FirstName.toLowerCase() + " " + item.player.LastName.toLowerCase()
        let position = item.player.Position
        if($scope.p1Input.toLowerCase() == item.player.FirstName.toLowerCase() || $scope.p1Input.toLowerCase() == item.player.LastName.toLowerCase() || $scope.p1Input.toLowerCase() == fullName){
          if(position === "WR" || position === "RB" || position === "TE" || position === "QB" || position === "K" || position === "D"){
            if(count < 5){
              $scope.p1Players.push(item.player)
              count++
            }
          }
        }
      })
    })
  }

  $scope.p2Search = function(){
    ApiFactory.getPlayers()
    .then(function(players){
      $scope.p2Players = []
      let count = 0
      let playerData = players.playerentry
      playerData.forEach(function(item){
        let fullName = item.player.FirstName.toLowerCase() + " " + item.player.LastName.toLowerCase()
        let position = item.player.Position
        if($scope.p2Input.toLowerCase() == item.player.FirstName.toLowerCase() || $scope.p2Input.toLowerCase() == item.player.LastName.toLowerCase() || $scope.p2Input.toLowerCase() == fullName){
          if(position === "WR" || position === "RB" || position === "TE" || position === "QB" || position === "K" || position === "D"){
            if(count < 5){
              $scope.p2Players.push(item.player)
              count++
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
          $location.url('home')
          showToast()
        })
    }
    else{
      console.log('NOT TODAY MY FRIEND')
    }
  }

})
