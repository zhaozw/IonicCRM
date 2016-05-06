angular.module('starter', ['ionic', 'starter.controllers','ngMaterial','ngCookies'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.factory('Data',function(){
  return {
    sBilling:0,
    scollecttion:0,
    latitude:'',
    longitude:'',
    salestype:1,
    Tername:'A01',
    supsale:false,
    dirsale:false,
    mastertype:0,
    sterritory:'',
    nterritory:'',
    termas:'BC1C0346-06E5-E511-80E1-005056A71F87',
    masname:'U01',
    Empid:'EXAMPLE'
  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

 .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  ///////////////// Calendar /////////////////////////
  .state('app.search', {
    url: '/search/:mastertype/:sterritory/:nterritory',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/search.html',
        controller:'PlanCtrl'
      }
    }
  })
  .state('app.calendarlist', {
    url: '/calendarlist',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/calendarlist.html',
        controller:'PlanCalendarCtrl'
      }
    }
  })
  .state('app.listaccount', {
    url: '/listaccount/:accountype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/accountlist.html',
        controller:'PlanListAccountCtrl'
      }
    }
  })
  .state('app.accountid', {
    url: '/accountid/:accountid/:accountname/:accountype/:proviceid/:districtid/:territoryid',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/accountid.html',
        controller:'PlanAccuntDetailCtrl'
      }
    }
  })
  .state('app.searchsup', {
    url: '/searchsup/:mastertype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/searchsup.html',
        controller:'PlanSupCtrl'
      }
    }
  })
///////////////// End /////////////////////////////////////


  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
