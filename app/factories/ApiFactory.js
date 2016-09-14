"use strict"

app.factory('ApiFactory', function($q, $http){

  let getPlayers = function(){
    return $q(function(resolve, reject){
      $http.get('players.json')
      .success(function(data){
        resolve(data)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  return {
    getPlayers
  }

})
