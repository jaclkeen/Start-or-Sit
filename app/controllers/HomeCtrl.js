"use strict"

app.controller('HomeCtrl', function($scope, DbFactory, $mdToast){

  let showToast = function(playerName) {
    $mdToast.show(
      $mdToast.simple()
        .hideDelay(4000)
        .textContent(`You voted for ${playerName}`)
        .theme("success-toast")
    );
  };

  let showCommentAddedToast = function() {
  $mdToast.show(
    $mdToast.simple()
      .hideDelay(4000)
      .textContent("Comment posted!")
      .theme("success-toast")
  );
};

  $scope.showAllQ = true
  $scope.showMyQ = false
  $scope.showSearch = false
  $scope.showPlayerInfo = false
  $scope.showResearch = false
  $scope.crumbs = "All Plays"
  $scope.plays = []
  $scope.showVotes = false
  $scope.p1Votes = 0
  $scope.p2Votes = 0
  $scope.isEnabled = true
  $scope.comment = {
    text: ""
  }

  $scope.addQArea = function(){
    $scope.showAllQ = false
    $scope.showMyQ = false
    $scope.showSearch = false
    $scope.showResearch = false
    $scope.showPlayerInfo = false
    $scope.crumbs = 'Add New Play'
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
    $scope.crumbs = 'All Plays'
  }

  $scope.showMyQs = function(){
    $scope.showAllQ = false
    $scope.showMyQ = true
    $scope.showSearch = false
    $scope.showResearch = false
    $scope.showPlayerInfo = false
    $scope.crumbs = 'My Plays'
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
        // console.log(key, plays, plays[key])
        $scope.plays.push(plays[key])
      }
    })
  }

  $scope.addVote = function(playerName, player, id, votes){
    votes++
    var player1 = this.play.player1.name
    var player2 = this.play.player2.name
    console.log(player)
    DbFactory.updateVotes(player, id, votes)
    .then(function(data){
      // console.log('IS THIS WORKIN YET?!?!', player1, player2, playerName)
      // console.log('IS THIS WORKIN YET?!?!', player2)
      // if (playerName === player1 || player2) {
        $scope.isEnabled = false
      // }
      $scope.loadTickets()
    })
    console.log('PLAYERNAME', playerName)
    showToast(playerName)
  }

  $scope.addComment = function(id){
    if($scope.comment.text !== "" || " "){
      DbFactory.storeComment(id, $scope.comment)
      .then(function(data){
        showCommentAddedToast()
      })
    }
  }

  $scope.loadTickets()

})
