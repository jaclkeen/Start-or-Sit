"use strict"

app.factory('AuthFactory', function($window){
//Before we can do this we need to initialize a Firebase app
  let currentUserId = null
  let userInfo = {
    name: null,
    img: null
  }
  // GOOGLE LOGIN
  let provider = new firebase.auth.GoogleAuthProvider()

  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      currentUserId = user.uid
      userInfo.name = user.displayName
      userInfo.img = user.photoURL
    }
  })

  let authWithProvider = function(){
    return firebase.auth().signInWithPopup(provider)
  }
  // END GOOGLE LOGIN

  // BEGIN EMAIL&PASSWORD LOGIN
  let createUser = function(userObject){
    //firebase is universally available because we added it in the script tags. The userObject has the email and password on it.
    return firebase.auth().createUserWithEmailAndPassword(userObject.email, userObject.password)
      .catch(function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
      });
  };

  let loginUser = function(userObject){
    return firebase.auth().signInWithEmailAndPassword(userObject.email, userObject.password)
    .catch(function(error){
      let errorCode = error.code;
      let errorMessage = error.message;
    });
  };

  let logoutUser = function(){
    return firebase.auth().signOut();
  }

  let isAuthenticated = function(){
    return (firebase.auth().currentUser) ? true : false;
  }

  let getUser = function(){
    return currentUserId
  }

  let getUserInfo = function(){
    return userInfo
  }

  return {
    createUser,
    loginUser,
    logoutUser,
    isAuthenticated,
    authWithProvider,
    getUser,
    getUserInfo
  };

})
