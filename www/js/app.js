angular.module('starter', ['ionic', 'starter.controllers','ngMaterial','ngCookies','ngMessages','ngAnimate','ngCordova'])

.run(function($ionicPlatform, $rootScope, $ionicHistory) {
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
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
     $ionicHistory.clearCache();
  });
})
.factory('Data',function(){
  return {
    sBilling:0,
    scollecttion:0,
    latitude:'',
    longitude:'',
    salestype:'',
    Tername:'',
    supsale:false,
    dirsale:false,
    mastertype:'',//set default null
    sterritory:'',
    nterritory:'',
    termas:'',//A02
    pricelevel:'0F6889BA-3D46-E511-80D1-005056A71F87',//บาท
    transactioncurrency:'83008D3A-1A05-E511-80C7-005056A71F87',// บาท
    countrymaster:'6EF2ECB7-D5E1-E511-80E1-005056A71F87',//address th
    masname:'',
    Empid:'',
    mailtomail:'',
    getguid:guid(),
    getparaaccount:'',
    getparaname:'',
    gettxtid:'',
    dataguid:'',
    emnot:'',
    salename:'',
    tername:'',
    DataList:'',
    countserve:[10,20,30,40,50,60,70,80,90,100,110,120,130,140,150],
    recivename:'',
    businessname:'',
    listregist:'',
    logonstatus:true,
    logontype:true,
    StoreDoc:'',
    custermertype:'',
    statustypecode:''
  }
})
.factory('Darray',function(){
  return{
    txtname:'',
    txtaddress:'',
    provinceid:'',
    districtid:'',
    zipcode:''
  }
})
.factory('actype',function(){
  return{
    actype:''
  }
})
.factory('arcontact',function(){
  return {
    contact:[],
    company:[]
  }
})
.factory('arrlist',function(){
  return {
    listac:[]
  }
})
.factory('datauser',function(){
  return {
    territoryid:'',
    ivz_empname:'',
    ivz_empid:'',
    ivz_password:'',
    ivz_emailcontact:'',
    ivz_leadermail:'',
    ivz_ccmail:'',
    name:'',
    description:'',
    ivz_statusempid:''
  }
})
.factory('dataaccount',function(){
  return {
    user:[]
  }
})
.service('rego',function(){
  this.regoserv = function(){
    window.history.back(-1);
  },
  this.reChkTxtId = function(txtid){
    if(txtid){
      if(txtid.length >= 13){
        var a = new MobileCRM.FetchXml.Entity('account');
      		  a.addAttribute('ivz_taxid');//0
        var filter = new MobileCRM.FetchXml.Filter();
            filter.where('ivz_taxid','eq',txtid);
            a.filter = filter;
      	var fetch = new MobileCRM.FetchXml.Fetch(a);
      		  fetch.execute('array',function(data){
            alert("data length:"+txtid+' == '+data.length);
            return data.length;
            $scope.$apply();
      		},function(er){alert(er);},null);
      }
    }
  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
 .state('app', {
    url:'/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  ///////////////// Calendar /////////////////////////
  .state('app.search', {
    url:'/search/:mastertype/:sterritory/:nterritory',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/search.html',
        controller:'PlanCtrl'
      }
    }
  })
  .state('app.search2', {
    url:'/search/:mastertype/:sterritory/:nterritory',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/search2.html',
        controller:'Plan2Ctrl'
      }
    }
  })
  .state('app.searchplan', {
    url:'/searchplan/:mastertype/:sterritory/:nterritory',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/searchplan.html',
        controller:'PlanCtrl'
      }
    }
  })
  .state('app.calendarlist', {
    url:'/calendarlist',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/calendarlist.html',
        controller:'PlanCalendarCtrl'
      }
    }
  })
  .state('app.listaccount', {
    url:'/listaccount/:accountype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/accountlist.html',
        controller:'PlanListAccountCtrl'
      }
    }
  })
  .state('app.accountid', {
    url:'/accountid/:accountid/:accountname/:accountype/:proviceid/:districtid/:territoryid',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/accountid.html',
        controller:'PlanAccuntDetailCtrl'
      }
    }
  })
  .state('app.searchsup', {
    url:'/searchsup/:mastertype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/searchsup.html',
        controller:'PlanSupCtrl'
      }
    }
  })
  .state('app.sendplan', {
    url:'/sendplan/:territory/:mastertype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/sendplan.html',
        controller:'PlanSendPlanCtrl'
      }
    }
  })
  .state('app.listtersup', {
    url:'/listtersup/:mastertype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/listtersup.html',
        controller:'PlanListMasterCtrl'
      }
    }
  })
  .state('app.listplaning', {
    url:'/listplaning/:mastertype/:territoryid/:mailtomail',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/listplaning.html',
        controller:'PlanListDetailCtrl'
      }
    }
  })
  .state('app.sendplanning', {
    url:'/sendplanning/:mastertype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/sendplanning.html',
        controller:'PlanSendSupCtrl'
      }
    }
  })
  .state('app.approveplanning', {
    url:'/approveplanning/:mastertype',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/approveplanning.html',
        controller:'PlanApproveSupCtrl'
      }
    }
  })
  .state('app.listapprove', {
    url:'/listapprove/:territoryid',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/listapprove.html',
        controller:'PlanListApproveCtrl'
      }
    }
  })
  .state('app.rejectplan', {
    url:'/rejectplan/:territoryid/:salename/:tername',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/rejectplan.html',
        controller:'PlanRejectCtrl'
      }
    }
  })
///////////////// End /////////////////////////////////////
//////////////// planned /////////////////////////////////
.state('app.resultplan', {
  url:'/resultplan/:mastertype/:sterritory',
  views: {
    'menuContent': {
      templateUrl: 'templates/planned/resultplan.html',
      controller:'PlanedCtrl'
    }
  }
})
.state('app.listplanned', {
  url:'/listplanned/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/planned/listplan.html',
      controller:'PlanedListCtrl'
    }
  }
})
.state('app.planneddetail', {
  url:'/planneddetail/:mastertype/:accountid/:accountname/:terid/:province/:distid/:txtid',
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
  url:'/openaccount/:territoryid/:mastertype/:getguid/:pricelevel/:transactioncurrency',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/openaccount.html',
      controller:'OpenAccountCtrl'
    }
  }
})
.state('app.openaccountsup', {
  url:'/openaccount/:territoryid/:mastertype/:getguid/:tername',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/openaccountsup.html',
      controller:'OpenAccountSupCtrl'
    }
  }
})
.state('app.accountcontact', {
  url:'/accountcontact/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/accountcontact.html',
      controller:'AccountContactCtrl'
    }
  }
})
.state('app.addresstran', {
  url:'/addresstran/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/addresstran.html',
      controller:'AccountAddressCtrl'
    }
  }
})
.state('app.accountmeetting', {
  url:'/accountmeetting/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/accountmeetting.html',
      controller:'AccountMeetingCtrl'
    }
  }
})
.state('app.addressinvoice', {
  url:'/addressinvoice/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/addressinvoice.html',
      controller:'AccountAddressInvoiceCtrl'
    }
  }
})
.state('app.addressother', {
  url:'/addressother/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/addressother.html',
      controller:'AccountAddressOtherCtrl'
    }
  }
})
.state('app.infotransport', {
  url:'/infotransport/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/infotransport.html',
      controller:'AccountTransportCtrl'
    }
  }
})
.state('app.document', {
  url:'/document/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/document.html',
      controller:'AccountDocumentCtrl'
    }
  }
})
.state('app.accountcredit', {
  url:'/accountcredit/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/accountcredit.html',
      controller:'AccountCreditCtrl'
    }
  }
})
.state('app.infomart', {
  url:'/infomart/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/infomart.html',
      controller:'AccountInfoMartCtrl'
    }
  }
})
.state('app.contactus', {
  url:'/contactus/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/contactus.html',
      controller:'AccountContactUsCtrl'
    }
  }
})
.state('app.contactusadd', {
  url:'/contactusadd/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/contactusadd.html',
      controller:'AccountContactUsAddCtrl'
    }
  }
})
.state('app.companyus', {
  url:'/companyus/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/companyus.html',
      controller:'AccountCompanyCtrl'
    }
  }
})
.state('app.companyusadd', {
  url:'/companyusadd/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/companyusadd.html',
      controller:'AccountCompanyAddCtrl'
    }
  }
})
.state('app.confirmreg', {
  url:'/confirmreg/:getguid',
  views: {
    'menuContent': {
      templateUrl: 'templates/newaccount/confirmreg.html',
      controller:'AccountConfirmCtrl'
    }
  }
})
///////////////////// end ///////////////////////////////
//////////////////  account list //////////////////////////
.state('app.accountlist', {
  url:'/accountlist/:terriid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/account/accountlist.html',
      controller:'AccountListCtrl'
    }
  }
})
.state('app.accountlistsup', {
  url:'/accountlistsup/:terriid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/account/accountlistsup.html',
      controller:'AccountListSupCtrl'
    }
  }
})
.state('app.accountdetail', {
  url:'/accountdetail/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/account/accountdetail.html',
      controller:'AccountDetailCtrl'
    }
  }
})
.state('app.accountinvoice', {
  url:'/accountinvoice/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/account/accountinvoice.html',
      controller:'AccountInvoiceCtrl'
    }
  }
})
.state('app.accountbilling', {
  url:'/accountbilling/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/account/accountbilling.html',
      controller:'AccountBillingCtrl'
    }
  }
})
.state('app.accounteditor', {
  url:'/accounteditor/:accountid/:accountname/:accounttxtid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/account/accounteditor.html',
      controller:'AccountEditorCtrl'
    }
  }
})
///////////////////// end ///////////////////////////////
///////////////////// Adjustment ////////////////////////
.state('app.adjustmentlist', {
  url:'/adjustmentlist/:terid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/adjustmentlist.html',
      controller:'AdjustmentListCtrl'
    }
  }
})
.state('app.adjustmentlistsup', {
  url:'/adjustmentlistsup/:tername/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/option.html',
      controller:'AdjustmentCtrl'
    }
  }
})
.state('app.adjustment', {
  url:'/adjustment/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/option.html',
      controller:'AdjustmentCtrl'
    }
  }
})
.state('app.adjustmentname', {
  url:'/adjustmentname/:accountid/:accountname/:mastertype/:terid/:ivz_integrationid',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/formname.html',
      controller:'AdjustmentNameCtrl'
    }
  }
})
.state('app.adjustmentaddress', {
  url:'/adjustmentaddress/:accountid/:statustypecode/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/optionaddress.html',
      controller:'AdjustmentOptionCtrl'
    }
  }
})
// .state('app.adjustmentaddressform', {
//   url:'/adjustmentaddressform',
//   views: {
//     'menuContent': {
//       templateUrl: 'templates/adjustment/formaddress.html',
//       controller:'AdjustmentAddressFormCtrl'
//     }
//   }
// })
.state('app.adjustmentaddressform', {
  url:'/adjustmentaddressform/:addressid/:accountid/:statustypecode/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/formaddress.html',
      controller:'AdjustmentAddressFormCtrl'
    }
  }
})
.state('app.adjustmenttransport', {
  url:'/adjustmenttransport/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/adjustmenttransport.html',
      controller:'AdjustmentTransportCtrl'
    }
  }
})
.state('app.adjustmentcontact', {
  url:'/adjustmentcontact/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/adjustmentcontact.html',
      controller:'AdjustmentContactCtrl'
    }
  }
})
.state('app.adjustmentcontactform', {
  url:'/adjustmentcontactform/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/adjustmentcontactform.html',
      controller:'AdjustmentContactFormCtrl'
    }
  }
})
.state('app.adjustmentcredit', {
  url:'/adjustmentcredit/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/adjustmentcredit.html',
      controller:'AdjustmentCreditCtrl'
    }
  }
})
.state('app.adjustmentlistsupter', {
  url:'/adjustmentlistsupter/:tername/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/adjustsup.html',
      controller:'AdjustmentSupTerCtrl'
    }
  }
})
///////////////////// End ///////////////////////////////
///////////////////// Order ////////////////////////
.state('app.order', {
  url:'/order/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/order/option.html',
      controller:'OrderCtrl'
    }
  }
})
/*---------------------- Approve Wating --------------------*/
.state('app.waitapprove', {
  url:'/waitapprove/:masname/:mastertype/:typego',
  views: {
    'menuContent': {
      templateUrl: 'templates/approve/waitlist.html',
      controller:'WaitCtrl'
    }
  }
})
.state('app.waitlist', {
  url:'/waitlist',
  views: {
    'menuContent': {
      templateUrl: 'templates/approve/menu.html',
      controller:'WaitListCtrl'
    }
  }
})
.state('app.waitaccount', {
  url:'/waitaccount/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/approve/waitaccount.html',
      controller:'WaitAccountCtrl'
    }
  }
})
.state('app.rejectaccount', {
  url:'/rejectaccount/:terid/:salename/:tername',
  views: {
    'menuContent': {
      templateUrl: 'templates/approve/rejectapprove.html',
      controller:'WaitAccountRejectCtrl'
    }
  }
})
.state('app.accountdetailnew', {
  url:'/accountdetailnew/:accountid/:statustype/:credit/:terid/:acname',
  views: {
    'menuContent': {
      templateUrl: 'templates/approve/accountdetailnew.html',
      controller:'AccountNewCtrl'
    }
  }
})
/*------------------- order -----------------------*/
.state('app.orderlist', {
  url:'/orderlist/:terid/:mastertype/:ordertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/productlist/productlist.html',
      controller:'OrderListCtrl'
    }
  }
})
///////////////////// End ///////////////////////////////

  .state('app.browse', {
      url:'/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('app.playlists', {
      url:'/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  .state('app.logout', {
      url:'/playlists',
      views: {
        'menuContent': {
          controller: 'LogoutCtrl'
        }
      }
    })
  .state('app.exampl', {
        url:'/exampl',
        views: {
          'menuContent': {
            templateUrl: 'templates/exampl.html',
            controller: 'ExamplCtrl'
          }
        }
      });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
