"use strict"

app.controller('HomeCtrl', function($scope, DbFactory){

  $scope.showAllQ = true
  $scope.showMyQ = false
  $scope.showSearch = false
  $scope.showPlayerInfo = false
  $scope.showResearch = false
  $scope.crumbs = "Show All Qs"
  $scope.plays = []
  $scope.showVotes = false
  $scope.p1Votes = 0
  $scope.p2Votes = 0
  $scope.isEnabled = true

  $scope.addQArea = function(){
    $scope.showAllQ = false
    $scope.showMyQ = false
    $scope.showSearch = false
    $scope.showResearch = false
    $scope.showPlayerInfo = false
    $scope.crumbs = 'Add New Q'
  }

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

  $scope.loadTickets = function(){
    DbFactory.getAllPlaysFromFirebase()
    .then(function(plays){
      let idArr = Object.keys(plays)
      idArr.forEach(function(item){
        plays[item].id = item
      })
      $scope.plays = []
      for(var key in plays){
        console.log(key, plays, plays[key])
        $scope.plays.push(plays[key])
      }
    })
  }

  $scope.addVote = function(player, id, votes){
    votes++
    DbFactory.updateVotes(player, id, votes)
    .then(function(data){
      console.log(data)
      $scope.isEnabled = false
      $scope.loadTickets()
    })
  }

  $scope.loadTickets()

})
