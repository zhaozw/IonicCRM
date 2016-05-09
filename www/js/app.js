angular.module('starter', ['ionic', 'starter.controllers','ngMaterial','ngCookies','ngMessages'])

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
    salestype:2,
    Tername:'A01',
    supsale:false,
    dirsale:false,
    mastertype:2,
    sterritory:'',
    nterritory:'',
    termas:'BC1C0346-06E5-E511-80E1-005056A71F87',
    masname:'U01',
    Empid:'EXAMPLE',
    mailtomail:'test@gmail.com;leader@gmail.com;ccmail@gmail.com',
    getguid:guid(),
    dataguid:''
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
  .state('app.sendplan', {
    url: '/sendplan/:territory/:mastertype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/sendplan.html',
        controller:'PlanSendPlanCtrl'
      }
    }
  })
  .state('app.listtersup', {
    url: '/listtersup/:mastertype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/listtersup.html',
        controller:'PlanListMasterCtrl'
      }
    }
  })
  .state('app.listplaning', {
    url: '/listplaning/:mastertype/:territoryid',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/listplaning.html',
        controller:'PlanListDetailCtrl'
      }
    }
  })
  .state('app.sendplanning', {
    url: '/sendplanning/:mastertype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/sendplanning.html',
        controller:'PlanSendSupCtrl'
      }
    }
  })
  .state('app.approveplanning', {
    url: '/approveplanning/:mastertype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/approveplanning.html',
        controller:'PlanApproveSupCtrl'
      }
    }
  })
  .state('app.listapprove', {
    url: '/listapprove/:mastertype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/listapprove.html',
        controller:'PlanListApproveCtrl'
      }
    }
  })
///////////////// End /////////////////////////////////////
//////////////// planned /////////////////////////////////
.state('app.resultplan', {
  url: '/resultplan/:mastertype/:sterritory',
  views: {
    'menuContent': {
      templateUrl: 'templates/planned/resultplan.html',
      controller:'PlanedCtrl'
    }
  }
})
.state('app.listplanned', {
  url: '/listplanned/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/planned/listplan.html',
      controller:'PlanedListCtrl'
    }
  }
})
.state('app.planneddetail', {
  url: '/planneddetail/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/planned/planneddetail.html',
      controller:'PlanedDetailCtrl'
    }
  }
})
////////////////// End ///////////////////////////////////
////////////////// new account //////////////////////////
.state('app.openaccount', {
  url: '/openaccount/:territoryid/:mastertype/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/openaccount.html',
      controller:'OpenAccountCtrl'
    }
  }
})
.state('app.accountcontact', {
  url: '/accountcontact/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/accountcontact.html',
      controller:'AccountContactCtrl'
    }
  }
})
.state('app.addresstran', {
  url: '/addresstran/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/addresstran.html',
      controller:'AccountAddressCtrl'
    }
  }
})
.state('app.accountmeetting', {
  url: '/accountmeetting/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/accountmeetting.html',
      controller:'AccountMeetingCtrl'
    }
  }
})
.state('app.addressinvoice', {
  url: '/addressinvoice/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/addressinvoice.html',
      controller:'AccountAddressInvoiceCtrl'
    }
  }
})
.state('app.addressother', {
  url: '/addressother/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/addressother.html',
      controller:'AccountAddressOtherCtrl'
    }
  }
})
.state('app.infotransport', {
  url: '/infotransport/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/infotransport.html',
      controller:'AccountTransportCtrl'
    }
  }
})
.state('app.document', {
  url: '/document/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/document.html',
      controller:'AccountDocumentCtrl'
    }
  }
})
///////////////////// end ///////////////////////////////
//////////////////  account list //////////////////////////
.state('app.accountlist', {
  url: '/accountlist/:terriid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/account/accountlist.html',
      controller:'AccountListCtrl'
    }
  }
})
.state('app.accountdetail', {
  url: '/accountdetail/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/account/accountdetail.html',
      controller:'AccountDetailCtrl'
    }
  }
})
.state('app.accountinvoice', {
  url: '/accountinvoice/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/account/accountinvoice.html',
      controller:'AccountInvoiceCtrl'
    }
  }
})
.state('app.accountbilling', {
  url: '/accountbilling/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/account/accountbilling.html',
      controller:'AccountBillingCtrl'
    }
  }
})
///////////////////// end ///////////////////////////////

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
