"use strict"

app.factory('AuthFactory', function($window){
  let currentUserId = ""
  let userInfo = {
    name: "",
    img: ""
  }
  // GOOGLE LOGIN
  let provider = new firebase.auth.GoogleAuthProvider()

  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      currentUserId = user.uid
      // userInfo.name = user.displayName
      // userInfo.img = user.photoURL
    }
  })

  let authWithProvider = function(){
    return firebase.auth().signInWithPopup(provider)
  }
  // END GOOGLE LOGIN

  // BEGIN EMAIL&PASSWORD LOGIN
  let createUser = function(userObject){
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

  let setUser = function(user){
    currentUserId = user
  }

  let setUserInfo = function(name){
    userInfo = name.name
  }

  let setGoogleUserInfo = function(name){
    userInfo = name
  }

  let getUserInfo = function(){
    return userInfo
  }

  return {
    setGoogleUserInfo,
    authWithProvider,
    isAuthenticated,
    setUserInfo,
    getUserInfo,
    logoutUser,
    createUser,
    loginUser,
    getUser,
    setUser
  };

})
