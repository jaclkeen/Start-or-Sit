"use strict"

app.factory("DbFactory", function($q, $http, FirebaseURL){

  let storeUser = function(userObj){
    return $q(function(resolve, reject){
      $http.post(`${FirebaseURL}users.json`,
      JSON.stringify(userObj))
      .success(function(objFromFirebase){
        resolve(objFromFirebase)
        console.log('FIREBASE OBJ', objFromFirebase)
      })
      .error(function(error){
        reject(error)
      })
    })
  }

  let storeToFirebase = function(obj){
    return $q(function(resolve, reject){
      $http.post(`${FirebaseURL}plays.json`,
      JSON.stringify(obj))
      .success(function(firebaseObj){
        resolve(firebaseObj)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  let getAllPlaysFromFirebase = function(){
    return $q(function(resolve, reject){
      $http.get(`${FirebaseURL}plays.json`)
      .success(function(play){
        resolve(play)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  return {
    storeUser,
    storeToFirebase,
    getAllPlaysFromFirebase
  }

})
