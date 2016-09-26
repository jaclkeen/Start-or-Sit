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

  let storeComment = function(playKey, comments){
    return $q(function(resolve, reject){
      $http.post(`${FirebaseURL}/comments.json`,
      JSON.stringify(comments))
      .success(function(obj){
        console.log(obj)
        resolve(obj)
      })
      .error(function(error){
        console.log(error)
      })
    })
  }

  let getComments = function(){
    return $q(function(resolve, reject){
      $http.get(`${FirebaseURL}comments.json`)
      .success(function(data){
        console.log(data)
        resolve(data)
      })
      .error(function(error){
        console.log(error)
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

  let deletePlayFromFirebase = function(id){
    return $q(function(resolve, reject){
      $http.delete(`${FirebaseURL}plays/${id}.json`)
      .success(function(play){
        resolve(play)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  let updateVotes = function(player, id, votes){
    console.log('PLAYER', player)
    return $q(function(resolve, reject){
      $http.patch(`${FirebaseURL}plays/${id}/${player}.json`,
        JSON.stringify({votes: votes}))
      .success(function(play){
        console.log('success')
        resolve(play)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  let getUserFromFB = function() {
    return $q(function(resolve, reject){
      $http.get(`${FirebaseURL}users.json`)
      .success(function(obj){
        resolve(obj)
      })
      .error(function(error){
        console.log(error)
        reject(error)
      })
    })
  }

  return {
    storeUser,
    updateVotes,
    getComments,
    storeComment,
    getUserFromFB,
    storeToFirebase,
    deletePlayFromFirebase,
    getAllPlaysFromFirebase
  }

})
