"use strict"

app.controller('RecentNewsCtrl', function($scope, ApiFactory){

  $scope.recentNews = []

  ApiFactory.getMostRecentPlayerNews()
  .then(function(news){
    console.log('NEWS', news)
    let playerNews = news.news
    for(var key in playerNews){
        if(playerNews.position !== "DE" && playerNews.position !== "OLB" && playerNews.position !== "DT" && playerNews.position !== "T" && playerNews.position !== "LB" && playerNews.position !== "P" && playerNews.position !== "FS" && playerNews.position !== "FB" && playerNews.position !== "OT"){
        if(playerNews.position !== "SS" && playerNews.position !== "G" && playerNews.position !== "MLB" && playerNews.position !== "C" && playerNews.position !== "LS" && playerNews.position !== "DB" && playerNews.position !== "CB" && playerNews.position !== "ILB"){
          $scope.recentNews.push(playerNews[key])
        }
        }
    }
  })

})
