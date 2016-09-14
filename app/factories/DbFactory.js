"use strict"

app.factory("DbFactory", function($q, $http, FirebaseURL){

  let storeUser = function(userObj){
    return $q(function(resolve, reject){
      $http.post(`${FirebaseURL}users.json`,
      JSON.stringify(userObj))
      .success(function(objFromFirebase){
        resolve(objFromFirebase.rosterPlayers)
        console.log(objFromFirebase)
      })
      .error(function(error){
        reject(error)
      })
    })
  }

  return {
    storeUser
  }

})
