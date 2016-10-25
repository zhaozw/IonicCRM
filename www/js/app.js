angular.module('starter', ['ionic', 'starter.controllers','ngMaterial','ngCookies','ngMessages','ng-file-model'])

.run(function($ionicPlatform, $rootScope, $ionicHistory ,Data) {
  Data.getOsVersion = getOS();
  var setprice = setInterval(function(){
    try {
      var price = new MobileCRM.FetchXml.Entity('pricelevel');
          price.addAttribute('pricelevelid');
          price.filter = new MobileCRM.FetchXml.Filter();
          price.filter.where('name','eq','THB');
      var fetch = new MobileCRM.FetchXml.Fetch(price);
          fetch.execute('array',function(data){
            if(data.length > 0){
              Data.pricelevel = data[0][0];
              clearInterval(setprice);
            }
          },alerterror,null);
    } catch (e) {
      console.log('error 22 '+e);
    }
  },100);

  var setcurrency = setInterval(function(){
    try {
      var currency = new MobileCRM.FetchXml.Entity('transactioncurrency');
          currency.addAttribute('transactioncurrencyid');
          currency.filter = new MobileCRM.FetchXml.Filter();
          currency.filter.where('currencyname','eq','บาท');
      var fetch = new MobileCRM.FetchXml.Fetch(currency);
          fetch.execute('array',function(data){
            if(data.length > 0){
              Data.transactioncurrency = data[0][0];
              clearInterval(setcurrency);
            }
          },alerterror,null);
    } catch (e) {
      console.log('error 37 '+e);
    }
  },500);
  var setcountrymaster = setInterval(function(){
    try {
      var countrymaster = new MobileCRM.FetchXml.Entity('ivz_addresscountry');
          countrymaster.addAttribute('ivz_addresscountryid');
          countrymaster.filter = new MobileCRM.FetchXml.Filter();
          countrymaster.filter.where('ivz_name','eq','TH');
      var fetch = new MobileCRM.FetchXml.Fetch(countrymaster);
          fetch.execute('array',function(data){
            if(data.length > 0){
              Data.countrymaster = data[0][0];
              clearInterval(setcountrymaster);
            }
          },alerterror,null);
    } catch (e) {
      console.log('error 55 '+e);
    }
  },1000);
  setTimeout(function(){
    Data.getguid = guid();
    clearInterval(setprice);
    clearInterval(setcurrency);
    clearInterval(setcountrymaster);
    try {
      // MobileCRM.AboutInfo.requestObject(
      //   	function (aboutInfo) {
      //   		/// <param name="aboutInfo" type="MobileCRM.AboutInfo"/>
      //   		var appReport = "About Info : \n" +
      //   			aboutInfo.productTitle + "\n" +
      //   			aboutInfo.productSubTitle;
      //   		MobileCRM.bridge.alert(appReport);
      //   	},
      //   	MobileCRM.bridge.alert  // alerts an error
      //   );
      // MobileCRM.UI.EntityForm.requestObject(
      // 	function (entityForm) {
      // 		// get media tab by its name
      // 		var media = entityForm.getMediaTab("DocumentAction");
      // 		// bind media tab operations handlers to button onclick event.
      // 		document.getElementById("capturePhoto").onclick = function () {
      // 			media.capturePhoto();
      // 		}
      // 		document.getElementById("selectPhoto").onclick = function () {
      // 			media.selectPhoto();
      // 		}
      // 		document.getElementById("selectFile").onclick = function () {
      // 			media.selectFile();
      // 		}
      // 		document.getElementById("recordAudio").onclick = function () {
      // 			media.recordAudio();
      // 		}
      // 		document.getElementById("recordVideo").onclick = function () {
      // 			media.recordVideo();
      // 		}
      // 	},
      // 	MobileCRM.bridge.alert
      // );
    } catch (e) {
      console.log(navigator.geolocation);
    }
  },1100);

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
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams ,Data){
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
    pricelevel:'',//บาท
    transactioncurrency:'',// บาท
    countrymaster:'',//address th
    masname:'',
    Empid:'',
    mailtomail:'',
    getguid:'',
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
    statustypecode:'',
    territoryadjmust:'',
    showcart:false,
    tatolmatch:0,
    balancecredit:0,
    tatolminplus:0,
    creditlimit:0,
    gid:'',//begin data
    taxid:'',
    cusname:'',
    bracher:'',
    contactname:'',
    lastcontactname:'',
    tel:'',
    mobile:'',
    fax:'',
    email:'',
    actionfn: false,
    optionDay: 0,
    optionStarttime: 917970016, //set default timer option
    optionEndtime: 917970036, //set default timer option
    optionBillingDay: 0,
    optionStartBilltime: 917970016, //set default timer option
    optionEndBilltime: 917970036, //set default timer option
    ///////////////// option ///////////////////////
    optionStartNormaltime: 917970016, //set default timer option
    optionEndNormaltime: 917970036, //set default timer option
    /////////////////////////////////////////////
    optionStarttimeAvailable: 917970016, //set default timer option
    optionEndtimeAvailable: 917970036, //set default timer option
    dataMon: true,
    dataTue: true,
    dataWen: true,
    dataThu: true,
    dataFri: true,
    dataSat: true,
    dataSun: false,
    nametype:'',
    addressname:'',
    provincename:'',
    provinceid:'',
    districtname:'',
    districtid:'',
    zipcode:'',
    invname:'',
    invprovince:'',
    invprovinceid:'',
    invdistrict:'',
    invdistrictid:'',
    invzipcode:'',
    othername:'',
    otheraddress:'',
    otherprovince:'',
    otherprovinceid:'',
    otherdistrict:'',
    otherdistrictid:'',
    otherzipcode:'',
    transname:'',
    teltran:'',
    billvat:false,
    txtRemarkTransport:'',
    peoplela1: false,
    peoplela2: false,
    statustype: '',
    bs1: '',
    bs2: '',
    bs3: '',
    bs4: '',
    bs5: '',
    docStatus: true,
    doc001: true,
    doc004: true,
    doc005: true,
    optionPayment: '', //Set SD-
    txtCreditlimit: 0,
    optionPaymentType: '',
    optionPaymentBank: '',
    txtBankAccount:'',
    txtBankBranch: '',
    optionPaymentbnkYss: 917970001, //yss bank กสิกร ออมทรัพย์
    optionPayment: true,
    txtCreditlimit: true,
    optionPaymentType: true,
    optionPaymentbnkYss: true,
    diabledcredit: false,
    /////////////////////////////
    SalePart1: false,
    SalePart2: false,
    SalePart3: false,
    //////////////////////////////
    SalePart4: false,
    SalePart5: false,
    SalePart6: false,
    doc: [],
    PlaceStatus1: '',
    PlaceStatus2: '',
    tatofactory: '',
    tatolnumber: '',
    SalesPart1: true,
    SalesPart2: true,
    doc006: true,
    PlaceStatus: true,
    tatofactory: true,
    tatolnumber: true,
    /////////////////////////
    datacontact:[],
    databusiness:[],
    tersupselect:'',
    selfshare:[],
    doccomputiter:[],
    idrpoductclaim:'',
    listitem:[],
    accountspring:0,
    spingid:0,
    onhandpajero:0,
    onhandfortuner:0,
    onhandallnewfortuner:0,
    remainfortuner:0,
    remainallnewfortuner:0,
    remainpajero:0,
    getOsVersion:false
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
.factory('DataOrderSpec',function(){
  return {
    order:[]
  }
})
.factory('DataOrder',function(){
  return {
    order:[],
    account:[],
    tatol:0,
    matcher:0,
    fortuner:0,
    allnewfortuner:0,
    pajero:0,
    allnewpajero:0,
    resultallnewpajero:0
  }
})
.factory('Setting',function(){
  return{
    requestproduct:10,
    setValorder:10000,
    transportname:'รถ YSS',
    transporttel:' 027063700',
    dateday:[{id: 0,name: "จันทร์"},
             {id: 1,name: "อังคาร"},
             {id: 2,name: "พุธ"},
             {id: 3,name: "พฤหัส"},
             {id: 4,name: "ศุกร์"},
             {id: 5,name: "เสาร์"},
             {id: 6,name: "อาทิตย์"}],
    orderoption:[{id:0,orderlink:1,ordername:"ขาย 1",avator:"img/ionic.png"},
                 {id:1,orderlink:2,ordername:"ขาย 2",avator:"img/ionic.png"},
                 {id:2,orderlink:3,ordername:"ขาย 3",avator:"img/ionic.png"}],
    orderoptionspec:[{id:0,orderlink:1,ordername:"ขาย 1",avator:"img/ionic.png"},
                 {id:1,orderlink:2,ordername:"ขาย 2",avator:"img/ionic.png"},
                 {id:2,orderlink:3,ordername:"ขาย 3",avator:"img/ionic.png"}]
  }
})
.factory('Dtest',function(){
  return {
    data:["Banana", "Orange", "Apple", "Mango","Lemon"]
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
      		},function(er){alert(er);},null);
      }
    }
  }
})
.directive('myclick', function() {
    return function(scope, element, attrs) {
        element.bind('touchstart click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            scope.$apply(attrs['myclick']);
        });
    };
})
.directive('appFilereader', function($q) {
    var slice = Array.prototype.slice;

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return;

                ngModel.$render = function() {};

                element.bind('change', function(e) {
                    var element = e.target;

                    $q.all(slice.call(element.files, 0).map(readFile))
                        .then(function(values) {
                            if (element.multiple) ngModel.$setViewValue(values);
                            else ngModel.$setViewValue(values.length ? values[0] : null);
                        });

                    function readFile(file) {
                        var deferred = $q.defer();

                        var reader = new FileReader();
                        reader.onload = function(e) {
                            deferred.resolve(e.target.result);
                        };
                        reader.onerror = function(e) {
                            deferred.reject(e);
                        };
                        reader.readAsDataURL(file);

                        return deferred.promise;
                    }

                }); //change

            } //link
    }; //return
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
  .state('app.calendarplanninglist', {
    url:'/calendarplanninglist',
    views: {
      'menuContent': {
        templateUrl: 'templates/planning/calendarplanninglist.html',
        controller:'PlanListCtrl'
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
    url:'/listapprove/:territoryid/:salename/:tername',
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
      controller:'PlanListMasterCtrl'
    }
  }
})
.state('app.listtername', {
  url:'/listtersup/:mastertype/:typego',
  views: {
    'menuContent': {
      templateUrl: 'templates/planned/listtersup.html',
      controller:'PlanListMasterCtrl'
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
.state('app.accountmap', {
  url:'/accountdetail/:accountid/:mastertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/account/accountmap.html',
      controller:'AccountMapCtrl'
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
  url:'/adjustmentaddress/:accountid/:statustypecode/:mastertype/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/optionaddress.html',
      controller:'AdjustmentOptionCtrl'
    }
  }
})
.state('app.adjustmentaddressform', {
  url:'/adjustmentaddressform/:addressid/:accountid/:statustypecode/:mastertype/:typeinsert/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/formaddress.html',
      controller:'AdjustmentAddressFormCtrl'
    }
  }
})
.state('app.adjustmenttransport', {
  url:'/adjustmenttransport/:accountid/:mastertype/:cusname',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/adjustmenttransport.html',
      controller:'AdjustmentTransportCtrl'
    }
  }
})
.state('app.adjustmentcontact', {
  url:'/adjustmentcontact/:accountid/:mastertype/:cusname',
  views: {
    'menuContent': {
      templateUrl: 'templates/adjustment/adjustmentcontact.html',
      controller:'AdjustmentContactCtrl'
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
.state('app.selectaddressorder', {
  url:'/selectaddressorder/:accountid/:mastertype/:typelnk',
  views: {
    'menuContent': {
      templateUrl: 'templates/order/selectaddress.html',
      controller:'OrderAddressCtrl'
    }
  }
})
.state('app.order', {
  url:'/order/:accountid/:mastertype/:addressid',
  views: {
    'menuContent': {
      templateUrl: 'templates/order/option.html',
      controller:'OrderCtrl'
    }
  }
})
.state('app.productlist', {
  url:'/productlist/:accountid/:mastertype/:ordertype/:getguid/:addressid',
  views: {
    'menuContent': {
      templateUrl: 'templates/productlist/productlist.html',
      controller:'ProductLisCtrl'
    }
  }
})
.state('app.listorder', {
  url:'/listorder',
  views: {
    'menuContent': {
      templateUrl: 'templates/order/listorder.html',
      controller:'ListOrderCtrl'
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
.state('app.waitapproveadjust', {
  url:'/waitapproveadjust/:masname/:mastertype/:typego',
  views: {
    'menuContent': {
      templateUrl: 'templates/approveadjust/territory.html',
      controller:'WaitAdjustCtrl'
    }
  }
})
.state('app.approveadjust', {
  url:'/approveadjust/:terid/:mastertype/:typego',
  views: {
    'menuContent': {
      templateUrl: 'templates/approveadjust/waitaccount.html',
      controller:'WaitAccountAdjustCtrl'
    }
  }
})
.state('app.waitapproveorder', {
  url:'/waitapproveorder/:masname/:mastertype/:typego',
  views: {
    'menuContent': {
      templateUrl: 'templates/approveorder/territory.html',
      controller:'WaitOrderCtrl'
    }
  }
})
.state('app.approveorder', {
  url:'/approveorder/:terid/:mastertype/:typego',
  views: {
    'menuContent': {
      templateUrl: 'templates/approveorder/waitorder.html',
      controller:'WaitOrderListCtrl'
    }
  }
})
.state('app.approveorderdetail', {
  url:'/approveorderdetail/:terid/:orderid/:mastertype/:name/:tername',
  views: {
    'menuContent': {
      templateUrl: 'templates/approveorder/orderdetail.html',
      controller:'WaitOrderDetailCtrl'
    }
  }
})
.state('app.waitapproveclaim', {
  url:'/waitapproveclaim',
  views: {
    'menuContent': {
      templateUrl: 'templates/claim/option.html',
      controller:'WaitClaimCtrl'
    }
  }
})
.state('app.waitclaimlist', {
  url:'/waitclaimlist/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/claim/claimlist.html',
      controller:'WaitClaimListCtrl'
    }
  }
})
.state('app.waitclaimdetail', {
  url:'/waitclaimdetail/:claimid',
  views: {
    'menuContent': {
      templateUrl: 'templates/claim/claimdetail.html',
      controller:'WaitClaimDetailCtrl'
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
.state('app.orderlistpending', {
  url:'/orderlistpending/:terid/:mastertype/:ordertype',
  views: {
    'menuContent': {
      templateUrl: 'templates/order/orderlistpending.html',
      controller:'ListOrderPendingCtrl'
    }
  }
})
.state('app.orderlistother', {
  url:'/orderlistother/:orderid/:mastertype/:ordertype/:accountname/:terid/:salestype/:typehide',
  views: {
    'menuContent': {
      templateUrl: 'templates/order/orderother.html',
      controller:'ListOrderOtherCtrl'
    }
  }
})
/******************** billing And collection **************************/
.state('app.billingcollection', {
  url:'/billingcollection/:accountid/:mastertype/:retype/:terid',
  //url:'/billingcollection/:retype',
  views: {
    'menuContent': {
      templateUrl: 'templates/billcollect/employee.html',
      controller:'ListBillingAccountCtrl'
    }
  }
})
.state('app.billingcollectionoption', {
  //url:'/billingcollection/:orderid/:mastertype/:ordertype/:accountname/:terid/:salestype',
  url:'/billingcollectionoption/:accountid/:mastertype/:retype/:terid/:accountname/:province/:distid/:guip',
  views: {
    'menuContent': {
      templateUrl: 'templates/billcollect/option.html',
      controller:'ListBillingAccountCtrl'
    }
  }
})
.state('app.billingcollectioncash', {
  //url:'/billingcollection/:orderid/:mastertype/:ordertype/:accountname/:terid/:salestype',
  url:'/billingcollectioncash/:accountid/:accountname/:province/:distid/:billing/:txttatol/:resultstatus/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/billcollect/optioncash.html',
      controller:'ListBillingAccountCashCtrl'
    }
  }
})
.state('app.billingcollectionnotdo', {
  url:'/billingcollectionnotdo/:accountid/:accountname/:province/:distid/:billing/:txttatol/:resultstatus/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/billcollect/optionnotdo.html',
      controller:'ListBillingAccountNotDoCtrl'
    }
  }
})
.state('app.billingcollectioncheck', {
  url:'/billingcollectioncheck/:accountid/:accountname/:province/:distid/:billing/:txttatol/:resultstatus/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/billcollect/optioncheck.html',
      controller:'ListBillingAccountCheckCtrl'
    }
  }
})
.state('app.billingcollectiontrans', {
  //url:'/billingcollection/:orderid/:mastertype/:ordertype/:accountname/:terid/:salestype',
  //url:'/billingcollectionnotdo/:billingid',
  url:'/billingcollectiontrans/:accountid/:accountname/:province/:distid/:billing/:txttatol/:resultstatus/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/billcollect/optiontrans.html',
      controller:'ListBillingAccountTransferCtrl'
    }
  }
})
.state('app.billingcollectionother', {
  //url:'/billingcollection/:orderid/:mastertype/:ordertype/:accountname/:terid/:salestype',
  //url:'/billingcollectionnotdo/:billingid',
  url:'/billingcollectionother/:accountid/:accountname/:province/:distid/:billing/:txttatol/:resultstatus/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/billcollect/optionother.html',
      controller:'ListBillingAccountOtherCtrl'
    }
  }
})
.state('app.waitapproveactivities', {
  url:'/waitapproveactivities/:tername',
  //url:'/approvebillingcollection/:accountid/:accountname/:province/:distid/:billing/:txttatol/:resultstatus/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/billcollect/territoryid.html',
      controller:'ListWaitApproveBillingAccountCtrl'
    }
  }
})
.state('app.approvebillingcollection', {
  url:'/approvebillingcollection/:terid',
  //url:'/approvebillingcollection/:accountid/:accountname/:province/:distid/:billing/:txttatol/:resultstatus/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/billcollect/approve.html',
      controller:'ListApproveBillingAccountCtrl'
    }
  }
})
.state('app.approvebillingcollectiondetail', {
  url:'/approvebillingcollectiondetail/:resultid/:accountid/:txtname/:territorid/:txtterritory/:txtcomment/:txtremarcomment/:txtbillingnumber/:txtamount/:ivz_visitbilling/:ivz_visitsuggest/:ivz_visitprospect/:ivz_visitorder/:ivz_visitopenaccount/:ivz_visitadjustment/:ivz_visitmarket/:ivz_visitcompetitor/:ivz_visitclaimorder/:ivz_visitactivities/:ivz_productrecall',
  //url:'/approvebillingcollection/:accountid/:accountname/:province/:distid/:billing/:txttatol/:resultstatus/:terid',
  ///:ivz_visitbilling/:ivz_visitsuggest/:ivz_visitprospect/:ivz_visitorder/:ivz_visitopenaccount/:ivz_visitadjustment/:ivz_visitmarket/:ivz_visitcompetitor/:ivz_visitclaimorder/:ivz_visitactivities/:ivz_productrecall
  views: {
    'menuContent': {
      templateUrl: 'templates/billcollect/approvedetail.html',
      controller:'ListApproveBillingAccountDetailCtrl'
    }
  }
})
.state('app.detailpic', {
  url:'/detailpic/:tableresult/:idguid',
  //url:'/approvebillingcollection/:accountid/:accountname/:province/:distid/:billing/:txttatol/:resultstatus/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/detailpic/detailpic.html',
      controller:'ListDetailPicCtrl'
    }
  }
})
.state('app.plannedactivities', {
  url:'/plannedactivities/:accountid/:mastertype/:retype/:terid/:accountname/:province/:distid',
  //url:'/approvebillingcollection/:accountid/:accountname/:province/:distid/:billing/:txttatol/:resultstatus/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/activities/activities.html',
      controller:'ListActivitiesCtrl'
    }
  }
})
.state('app.plannedactivitiesnotdo', {
  url:'/plannedactivitiesdetail/:activitieslist/:accountid/:mastertype/:retype/:terid/:accountname/:province/:distid',
  //url:'/approvebillingcollection/:accountid/:accountname/:province/:distid/:billing/:txttatol/:resultstatus/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/activities/plannedactivitiesnotdo.html',
      controller:'ListActivitiesDetailNotDoCtrl'
    }
  }
})
.state('app.plannedactivitiesdetail', {
  url:'/plannedactivitiesdetail/:activitieslist/:accountid/:mastertype/:retype/:terid/:accountname/:province/:distid',
  //url:'/approvebillingcollection/:accountid/:accountname/:province/:distid/:billing/:txttatol/:resultstatus/:terid',
  views: {
    'menuContent': {
      templateUrl: 'templates/activities/plannedactivitiesdetail.html',
      controller:'ListActivitiesDetailCtrl'
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
      })
  .state('app.productdetail', {
        url:'/productdetail',
        views: {
          'menuContent': {
            templateUrl: 'templates/productlist/productdetail.html',
            controller: 'ExamplCtrl'
          }
        }
      })
  .state('app.editprofile',{
    url:'/editprofile/:masterterid/:txtname/:txtempid/:txtemail',
    views: {
      'menuContent': {
        templateUrl: 'templates/empid/editprofile.html',
        controller: 'EmpidProfileCtrl'
      }
    }
  })
.state('app.exmpid', {
            url:'/exmpid',
            views: {
              'menuContent': {
                templateUrl: 'templates/exmpid.html',
                controller: 'ExamplCtrl'
              }
            }
      })
.state('app.listmarketting', {
            url:'/listmarketting/:mastertype/:terid',
            views: {
              'menuContent': {
                templateUrl: 'templates/market/listmarketting.html',
                controller: 'ListMarketCtrl'
              }
            }
      })
.state('app.addformmarket', {
        url:'/addformmarket/:mastertype/:terid',
        views: {
          'menuContent': {
            templateUrl: 'templates/market/form.html',
            controller: 'MarketFormCtrl'
          }
        }
      })
.state('app.optioncomputitor',{
  url:'/optioncomputitor/:accountid/:accountiname',
  views:{
    'menuContent':{
      templateUrl:'templates/computitor/option.html',
      controller:'ComputitorCtrl'
    }
  }
})
.state('app.optioncomputitorproduct',{
  url:'/optioncomputitorproduct/:retype/:accountid/:accountiname',
  views:{
    'menuContent':{
      templateUrl:'templates/computitor/optioncomputitorproduct.html',
      controller:'ComputitorProductCtrl'
    }
  }
})
.state('app.optioncomputitorpromotion',{
  url:'/optioncomputitorpromotion/:retype/:accountid/:accountiname',
  views:{
    'menuContent':{
      templateUrl:'templates/computitor/optioncomputitorpromotion.html',
      controller:'ComputitorProductPromotionCtrl'
    }
  }
})
.state('app.optioncomputitorproductscream',{
  url:'/optioncomputitorproductscream/:retype/:accountid/:accountiname',
  views:{
    'menuContent':{
      templateUrl:'templates/computitor/optioncomputitorproductscam.html',
      controller:'ComputitorProductScamCtrl'
    }
  }
})
.state('app.optioncomputitorshelfshare',{
  url:'/optioncomputitorshelfshare/:accountid/:accountiname',
  views:{
    'menuContent':{
      templateUrl:'templates/computitor/optioncomputitorshelfshare.html',
      controller:'ComputitorProductShelfShareCtrl'
    }
  }
})
.state('app.addformselfshare',{
  url:'/addformselfshare/:accountid/:accountiname',
  views:{
    'menuContent':{
      templateUrl:'templates/computitor/listslfshare.html',
      controller:'FormShelfShareCtrl'
    }
  }
})
.state('app.addprospect',{
  url:'/addprospect',
  views:{
    'menuContent':{
      templateUrl:'templates/postpect/option.html',
      controller:'ProspectCtrl'
    }
  }
})
.state('app.promote',{
  url:'/promote/:accountid/:terid/:accountname/:province/:distid',
  views:{
    'menuContent':{
      templateUrl:'templates/promote/option.html',
      controller:'PromoteCtrl'
    }
  }
})
.state('app.promotex',{
  url:'/promotex',
  views:{
    'menuContent':{
      templateUrl:'templates/exmpid.html',
      controller:'PromotexCtrl'
    }
  }
})
.state('app.map',{
  url:'/map',
  views:{
    'menuContent':{
      controller:'mapCtrl'
    }
  }
})
//open claim
.state('app.openclaim', {
  url: '/openclaim/:accountid/:specailclaim/:intid',
  views: {
    'menuContent': {
      templateUrl: 'templates/openclaim/claim.html',
      controller: 'OpenclaimCtrl'
    }
  }
})
.state('app.openclaimserial', {
  url: '/openclaimserial/:gettype/:accountid/:itemamount/:productclaim/:productname/:productid/:rduset/:intid/:claimnewid',
  views: {
    'menuContent': {
      templateUrl: 'templates/openclaim/claimserial.html',
      controller: 'ClaimSerialCtrl'
    }
  }
})
.state('app.showlistorder', {
  url: '/showlistorder/:gettype/:accountid/:itemamount/:claimtxt/:productclaim/:claimstatus/:rduset/:claimserial/:specailclaim/:cdateby/:claimid/:optiontype/:intid/:claimnewid',
  views: {
    'menuContent': {
      templateUrl: 'templates/openclaim/showlistorder.html',
      controller: 'ShowListOrderCtrl'
    }
  }
})
.state('app.addmantain', {
  url: '/addmantain/:gettype/:accountid/:itemamount/:claimtxt/:productclaim/:claimstatus/:rduset/:claimid/:claimserial/:specailclaim/:cdateby/:intid/:claimnewid',
  views: {
    'menuContent': {
      templateUrl: 'templates/openclaim/addmantain.html',
      controller: 'MaintainancesCtrl'
    }
  }
})
.state('app.claimoption', {
  url: '/claimoption/:gettype/:accountid/:itemamount/:productclaim/:claimstatus/:rduset/:claimserial/:specailclaim/:cdateby/:intid/:claimnewid',
  views: {
    'menuContent': {
      templateUrl: 'templates/openclaim/claimoption.html',
      controller: 'ClaimOptionCtrl'
    }
  }
})
.state('app.claimpicture', {
  url: '/claimpicture/:gettype/:accountid/:itemamount/:claimtxt/:productclaim/:claimstatus/:rduset/:claimid/:optiontype/:claimserial/:specailclaim/:cdateby/:intid/:claimnewid',
  views: {
    'menuContent': {
      templateUrl: 'templates/openclaim/claimpicture.html',
      controller: 'ClaimPicCtrl'
     }
  }
})
.state('app.claimdetail', {
  url: '/claimdetail/:gettype/:accountid/:specailclaim/:itemamount/:claimtxt/:productclaim/:claimstatus/:rduset/:claimid/:optiontype/:claimserial/:cdateby/:intid/:claimnewid',
  views: {
    'menuContent': {
      templateUrl: 'templates/openclaim/claimdetail.html',
      controller: 'ClaimDetailCtrl'
    }
  }
})
.state('app.productrecall', {
  url: '/productrecall',
  views: {
    'menuContent': {
      templateUrl: 'templates/productrecall/productrecall.html',
      controller: 'ProductRecallCtrl'
    }
  }
})
.state('app.salesordertransport', {
  url: '/salesordertransport',
  views: {
    'menuContent': {
      templateUrl: 'templates/transport/salesordertransport.html',
      controller: 'SalesTransportCtrl'
    }
  }
})
.state('app.listfilter', {
  url: '/listfilter',
  views: {
    'menuContent': {
      templateUrl: 'templates/gpstransport/gps.html',
      controller: 'GPSAddressCtrl'
    }
  }
})
.state('app.neworder', {
  url: '/neworder/:accountid/:mastertype/:ordertype/:getguid/:addressid',
  views: {
    'menuContent': {
      templateUrl: 'templates/order4/option.html',
      controller: 'NewOrderCtrl'
    }
  }
})
.state('app.orderitem', {
  url: '/orderitem/:accountid/:mastertype/:ordertype/:getguid/:addressid/:itemid',
  views: {
    'menuContent': {
      templateUrl: 'templates/order4/listproduct.html',
      controller: 'OrderItemCtrl'
    }
  }
});
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
