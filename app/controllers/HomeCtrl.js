"use strict"

app.controller('HomeCtrl', function($scope, DbFactory, $mdToast, AuthFactory){

  let showToast = function(playerName) {
    $mdToast.show(
      $mdToast.simple()
        .hideDelay(4000)
        .textContent(`You voted for ${playerName}!`)
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

  $scope.currentUser = AuthFactory.getUser()
  $scope.userStuff = ""
  $scope.crumbs = "All Plays"
  $scope.plays = []
  $scope.showVotes = false
  $scope.p1Votes = 0
  $scope.p2Votes = 0
  $scope.isEnabled = true
  $scope.userMessages = []
  $scope.comment = [{
    text: "",
    playId: "",
    userId: $scope.currentUser,
    userName: ""
  }]

  $scope.showNav = function(){
    return AuthFactory.isAuthenticated()
  }

  $scope.addQArea = function(){
    $scope.crumbs = 'Add New Play'
  }

  $scope.showResearchArea = function(){
    $scope.crumbs = 'Research'
  }

  $scope.showAllQs = function(){
    $scope.crumbs = 'All Plays'
  }

  $scope.showMyQs = function(){
    $scope.crumbs = 'My Plays'
  }

  $scope.showPlayerSearch = function(){
    $scope.crumbs = 'Player Search'
  }

  $scope.newTicketArea = function(){
    $scope.crumbs = 'Add New Ticket'
  }

  $scope.retrieveComments = function(){
    $scope.userStuff = AuthFactory.getUserInfo()
    DbFactory.getComments()
    .then(function(data){
      $scope.userMessages = []
      if(data){
      let idArr = Object.keys(data)
      idArr.forEach(function(item){
        data[item].id = item
      })
        for(var key in data){
          $scope.userMessages.push(data[key])
        }
      }
    })
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
        $scope.plays.push(plays[key])
        $scope.comment.push({ text: "",
                              playId: "",
                              userId: $scope.currentUser,
                              userName: ""
                            })
      }
      $scope.retrieveComments()
    })
  }

  $scope.addVote = function(playerName, player, id, votes){
    votes++
    var player1 = this.play.player1.name
    var player2 = this.play.player2.name
    DbFactory.updateVotes(player, id, votes)
    .then(function(data){
      $scope.isEnabled = false
      $scope.loadTickets()
    })
    showToast(playerName)
  }

  $scope.addComment = function(index, id){
    $scope.comment[index].playId = id
    $scope.comment[index].userName = AuthFactory.getUserInfo()
    DbFactory.storeComment(id, $scope.comment[index])
      .then(function(data){
        $scope.comment[index].text = ""
        $scope.retrieveComments()
        showCommentAddedToast()
      })
  }

  $scope.loadTickets()

})
