"use strict"

app.controller('MyQCtrl', function($scope, ApiFactory, AuthFactory, DbFactory){
  $scope.plays = []

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
      }
    }
  })

  $scope.deletePlay = function(id){
    DbFactory.deletePlayFromFirebase(id)
      .then(function(data){
        console.log('deleted')
        DbFactory.getAllPlaysFromFirebase()
          .then(function(plays){
            $scope.plays = []
            let idArr = Object.keys(plays)
            idArr.forEach(function(item){
              plays[item].id = item
            })
            for(var key in plays){
              if(plays[key].uid === AuthFactory.getUser()){
                console.log('KEYYYY', key)
                $scope.plays.push(plays[key])
              }
            }
          })
        })
  }

})
