"use strict"

app.controller('HomeCtrl', function($scope, DbFactory){

  $scope.showAllQ = true
  $scope.showMyQ = false
  $scope.showSearch = false
  $scope.showPlayerInfo = false
  $scope.showResearch = false
  $scope.crumbs = "Show All Qs"
  $scope.plays = []

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

  $scope.plays = []

  $scope.loadTickets = function(){
    $scope.plays = []
    DbFactory.getAllPlaysFromFirebase()
    .then(function(plays){
      for(var key in plays){
        $scope.plays.push(plays[key])
      }
    })
  }

  $scope.loadTickets()

})
