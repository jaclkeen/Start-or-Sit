"use strict"

app.controller('MyQCtrl', function($scope, ApiFactory, AuthFactory, DbFactory, $mdToast){


  $scope.currentUser = AuthFactory.getUser()
  $scope.plays = []
  $scope.userMessages = []
  $scope.userStuff = ""
  $scope.comment = [{
    text: "",
    playId: "",
    userId: $scope.currentUser,
    userName: ""
  }]

  let showToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .hideDelay(4000)
        .textContent('Play deleted!')
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

  $scope.retrieveComments = function(){
    $scope.userStuff = AuthFactory.getUserInfo()
    DbFactory.getAllPlaysFromFirebase()
    .then(function(plays){
      DbFactory.getComments()
      .then(function(data){
        $scope.userMessages = []
        if(data){
          console.log('THIS DATA', data)
          let idArr = Object.keys(data)
          idArr.forEach(function(item){
            data[item].id = item
          })
          for(var key in data){
            $scope.userMessages.push(data[key])
          }
        }
      })
    })
  }

  $scope.getMyPlays = function(){
    DbFactory.getAllPlaysFromFirebase()
    .then(function(plays){
      let idArr = Object.keys(plays)
      idArr.forEach(function(item){
        plays[item].id = item
      })
      for(var key in plays){
        if(plays[key].uid === AuthFactory.getUser()){
          console.log('KEYYYY', key)
          $scope.plays.push(plays[key])
          $scope.comment.push({ text: "",
                              playId: "",
                              userId: $scope.currentUser,
                              userName: ""
                            })
        }
      }
    })
      $scope.retrieveComments()
  }

  $scope.deletePlay = function(id){
    DbFactory.deletePlayFromFirebase(id)
      .then(function(data){
        console.log('deleted')
        DbFactory.getAllPlaysFromFirebase()
          .then(function(plays){
            let idArr = Object.keys(plays)
            idArr.forEach(function(item){
              plays[item].id = item
            })
            $scope.plays = []
            for(var key in plays){
              if(plays[key].uid === AuthFactory.getUser()){
                console.log('KEYYYY', key)
                $scope.plays.push(plays[key])
              }
            }
            showToast()
          })
      })
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


  $scope.getMyPlays()

})
