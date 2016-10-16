"use strict"

app.controller('RecentNewsCtrl', function($scope, ApiFactory){

  $scope.recentNews = []

  ApiFactory.getMostRecentPlayerNews()
  .then(function(news){
    console.log('NEWS', news)
    let playerNews = news.news
    for(var key in playerNews){
      if(playerNews[key].position !== "DE" && playerNews[key].position !== "OLB" && playerNews[key].position !== "DT" && playerNews[key].position !== "T" && playerNews[key].position !== "LB" && playerNews[key].position !== "P" && playerNews[key].position !== "FS" && playerNews[key].position !== "FB" && playerNews[key].position !== "OT"){
        if(playerNews[key].position !== "DL" && playerNews[key].position !== "SS" && playerNews[key].position !== "G" && playerNews[key].position !== "MLB" && playerNews[key].position !== "C" && playerNews[key].position !== "LS" && playerNews[key].position !== "DB" && playerNews[key].position !== "CB" && playerNews[key].position !== "ILB"){
          $scope.recentNews.push(playerNews[key])
        }
        }
    }
  })

})
