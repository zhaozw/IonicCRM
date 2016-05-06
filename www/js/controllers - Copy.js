angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$cookies,Data) {
  $scope.Data = Data;
  GetGPSLocation(function(res){
      Data.latitude = res.latitude;
      Data.longitude = res.longitude;
  });

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    var username = $scope.loginData.username;
    var pwdname = $scope.loginData.password;
    if(!username || !pwdname){
      alert('กรุณากรอกข้อมูลให้ครบด้วย');
    }else{
      console.log('Doing login', $scope.loginData);
      $cookies.username = username;
      $cookies.pwdname = pwdname;
    }
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope,Data) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
  $scope.Data = Data;
  GetGPSLocation(function(res){
      Data.latitude = res.latitude;
      Data.longitude = res.longitude;
  });
})

.controller('PlaylistCtrl', function($scope, $stateParams,Data) {
  $scope.Data = Data;
  GetGPSLocation(function(res){
      Data.latitude = res.latitude;
      Data.longitude = res.longitude;
  });
})
////////////// Calendar ///////////////////////////
.controller('PlanCtrl',function($scope, $stateParams,$cookies,$location,Data){
  $scope.Data = Data;
  GetGPSLocation(function(res){
      Data.latitude = res.latitude;
      Data.longitude = res.longitude;
  });
  console.log($cookies.username);
  GetAppointStatus('ivz_leftterritory',1,function(data){
    $scope.todos = data;
  });
})
.controller('PlanCalendarCtrl', function($scope, $stateParams,$cookies,Data) {
  $scope.Data = Data;
  GetGPSLocation(function(res){
      Data.latitude = res.latitude;
      Data.longitude = res.longitude;
  });
})
.controller('PlanListAccountCtrl', function($scope, $stateParams,$cookies,Data) {
  $scope.Data = Data;
  GetGPSLocation(function(res){
      Data.latitude = res.latitude;
      Data.longitude = res.longitude;
  });
  $scope.arInvoice = true;
  $scope.arAccount = true;
  $scope.arPostpect = true;
  $scope.arLoading = false;
  $scope.Data = Data;
  $scope.accountype = $stateParams.accountype;
  if($scope.accountype == '1'){
    console.log('insert ค้นหาลูกค้าที่ค้างชำระ');
    Data.sBilling = 1;
    Data.scollecttion = 1;
    getInvoiceByAccountid('3E791CA7-D5E1-E511-80E1-005056A71F87',function(data){
      $scope.arInvoice = false;
      $scope.todos = data;
    });
  }else if($scope.accountype == '2'){
    Data.sBilling = 0;
    Data.scollecttion = 0;
    console.log('insert ค้นหาลูกค้าทั่วไป');
    GetAccount('3E791CA7-D5E1-E511-80E1-005056A71F87',2,function(data){
      $scope.arAccount = false;
      $scope.todos = data;
    });
  }else if($scope.accountype == '3'){
    Data.sBilling = 0;
    Data.scollecttion = 0;
    //console.log('insert ค้นหาลูกค้าเป้าหมาย');
    GetPostpectByTer('3E791CA7-D5E1-E511-80E1-005056A71F87',function(data){
      $scope.arPostpect = false;
      $scope.todos = data;
    });
  }
})
.controller('PlanAccuntDetailCtrl', function($scope, $stateParams,$cookies,Data) {
    $scope.Data = Data;
    $scope.infoDate = true;
    $scope.infoTime = true;
    $scope.infoActivities = true;
    $scope.infoActivitiesSpe = true;
    $scope.user = {
      submissionDate:'',
      mStart:917970016,
      mEnd:917970036,
      vOpenAccount:0,
      vAdjustment:0,
      vOpenOrder:0,
      vOpenClaim:0,
      vPostpect:0,
      vComputitor:0,
      vMarketSumu:0,
      vConllecttion:Data.scollecttion,
      vProductRecall:0,
      vBilling:Data.sBilling,
      vSuggust:0
    };
    GetAvailablefromtime(function(data){
      $scope.listtime = data;
    });
    GetActivities(function(data){
      $scope.activities = data;
    });
    GetGPSLocation(function(res){
        $scope.latitude = res.latitude;
        $scope.longitude = res.longitude;
    });
  $scope.accountid = $stateParams.accountid;
  $scope.accountname = $stateParams.accountname;
  $scope.accountype = $stateParams.accountype;
  $scope.proviceid = $stateParams.proviceid;
  $scope.districtid = $stateParams.districtid;
  $scope.territoryid = $stateParams.territoryid;
  if($scope.accountname){
    $scope.txtcustomer = $scope.accountname;
  }
  var bActivi = [];
  $scope.exActivities = function(ethis,gthis){
    bActivi.push(ethis);
  }
  $scope.fnActivities = function(ethis){
    alert($scope.proviceid);
  }

  $scope.insertCollect = function(gtype,accountid,accountname,accountype,proviceid,districtid,territoryid,latitude,longitude){
    try{
      alert('gtype:'+gtype.trim());
      //  var ins = new MobileCRM.DynamicEntity.createNew("appointment");
      //     ins.properties.activityid = gtype.trim();
      //     ins.properties.subject = accountname;
      //     ins.properties.ivz_custname = accountname;
      //     ins.properties.ivz_planningstatus = parseInt(0);
      //     ins.properties.scheduledstart = new Date($scope.user.submissionDate);
      //     ins.properties.scheduledend = new Date($scope.user.submissionDate);
      //     ins.properties.ivz_scheduledstarttime = parseInt($scope.user.mStart);
      //     ins.properties.ivz_scheduledendtime = parseInt($scope.user.mEnd);
      //     ins.properties.ivz_visitdate = new Date($scope.user.submissionDate);
      //     ins.properties.ivz_customer = new MobileCRM.Reference('account',accountid);
      //     ins.properties.ivz_visitopenaccount = parseInt($scope.user.vOpenAccount);
      //     ins.properties.ivz_visitorder = parseInt($scope.user.vOpenOrder);
      //     ins.properties.ivz_visitclaimorder = parseInt($scope.user.vOpenClaim);
      //     ins.properties.ivz_visitadjustment = parseInt($scope.user.vAdjustment);
      //     ins.properties.ivz_visitpostpect = parseInt($scope.user.vPostpect);
      //     ins.properties.ivz_visitproductrecall = parseInt($scope.user.vProductRecall);
      //     ins.properties.ivz_visitmarket = parseInt($scope.user.vMarketSumu);
      //     ins.properties.ivz_visitcompetitors = parseInt($scope.user.vComputitor);
      //     ins.properties.ivz_visitcollection = parseInt(1);
      //     ins.properties.ivz_visitbilling = parseInt(1);
      //     ins.properties.ivz_visitsuggest = parseInt($scope.user.vSuggust);
      //     ins.properties.ivz_visitactivities = bActivi.toString();
      //     ins.properties.ivz_empid = 'EXAMP';
      //     ins.properties.location = latitude,longitude;
      //     ins.properties.ivz_latilong = latitude,longitude;
      //     ins.properties.ivz_state =  new MobileCRM.Reference('ivz_addressprovince',proviceid);
      //     ins.properties.ivz_city =  new MobileCRM.Reference('ivz_addressdistrict',districtid);
      //     ins.properties.ivz_territoryid = new MobileCRM.Reference('territory',territoryid);
      //     ins.save(function(err){
      //       if(err){
      //         alert("excbnacc "+err);
      //       }else{
      //         alert("บันทึกข้อมูลเสร็จแล้ว");
      //         window.history.go(-1);
      //       }
      //   });
    }catch(er){
      alert('excbn01 '+er);
    }
  }


  $scope.cbnAppoint = function(accountid,accountname,accountype,proviceid,districtid,territoryid,latitude,longitude){
    var gyuid = guid();
    var swToggleActivities = $('#swToggleActivities').hasClass('md-checked');
    console.log($scope.user.vConllecttion);
    if($scope.user.submissionDate){
      $scope.infoDate = true;
    }else{
      $scope.infoDate = false;
    };
    if(bActivi.length <= 0){
      $scope.infoActivities = false;
    }else{
      $scope.infoActivities = true;
    }
    if(bActivi.length > 0){
      console.log(bActivi.toString());
      if(accountype == '1' || accountype == 1){
        if(gyuid){
          $scope.insertCollect(gyuid,accountid,accountname,accountype,proviceid,districtid,territoryid,latitude,longitude);
        }else{
          alert('เกิดข้อผิดพลาดในการสร้าง guid กรุณาปิดแอพและเข้าสู่ระบบใหม่ครับ');
        }
      }else if(accountype == 2 || accountype == '2'){
        try{
           var ins = new MobileCRM.DynamicEntity.createNew("appointment");
              ins.properties.activityid = gyuid;
              ins.properties.subject = accountname;
              ins.properties.ivz_custname = accountname;
              ins.properties.ivz_planningstatus = parseInt(0);
              ins.properties.scheduledstart = new Date($scope.user.submissionDate);
              ins.properties.scheduledend = new Date($scope.user.submissionDate);
              ins.properties.ivz_scheduledstarttime = parseInt($scope.user.mStart);
              ins.properties.ivz_scheduledendtime = parseInt($scope.user.mEnd);
              ins.properties.ivz_visitdate = new Date($scope.user.submissionDate);
              ins.properties.ivz_customer = new MobileCRM.Reference('account',accountid);
              ins.properties.ivz_visitopenaccount = parseInt($scope.user.vOpenAccount);
              ins.properties.ivz_visitorder = parseInt($scope.user.vOpenOrder);
              ins.properties.ivz_visitclaimorder = parseInt($scope.user.vOpenClaim);
              ins.properties.ivz_visitadjustment = parseInt($scope.user.vAdjustment);
              ins.properties.ivz_visitpostpect = parseInt($scope.user.vPostpect);
              ins.properties.ivz_visitproductrecall = parseInt($scope.user.vProductRecall);
              ins.properties.ivz_visitmarket = parseInt($scope.user.vMarketSumu);
              ins.properties.ivz_visitcompetitors = parseInt($scope.user.vComputitor);
              ins.properties.ivz_visitcollection = parseInt($scope.user.vConllecttion);
              ins.properties.ivz_visitbilling = parseInt($scope.user.vBilling);
              ins.properties.ivz_visitsuggest = parseInt($scope.user.vSuggust);
              ins.properties.ivz_visitactivities = bActivi.toString();
              ins.properties.ivz_empid = 'EXAMP';
              ins.properties.location = latitude,longitude;
              ins.properties.ivz_latilong = latitude,longitude;
              ins.properties.ivz_state =  new MobileCRM.Reference('ivz_addressprovince',proviceid);
              ins.properties.ivz_city =  new MobileCRM.Reference('ivz_addressdistrict',districtid);
              ins.properties.ivz_territoryid = new MobileCRM.Reference('territory',territoryid);
              ins.save(function(err){
                if(err){
                  alert("excbnacc "+err);
                }else{
                  alert("บันทึกข้อมูลเสร็จแล้ว");
                  window.history.go(-1);
                }
            });
        }catch(er){
          alert('excbn02 '+er);
        }
      }else if(accountype == '3' || accountype == 3){
        console.log('insert ค้นหาลูกค้าเป้าหมาย');
        try{
          //  var ins = new MobileCRM.DynamicEntity.createNew("appointment");
          //     ins.properties.activityid = gyuid;
          //     ins.properties.subject = accountname;
          //     ins.properties.ivz_custname = accountname;
          //     ins.properties.ivz_planningstatus = parseInt(0);
          //     ins.properties.scheduledstart = new Date($scope.user.submissionDate);
          //     ins.properties.scheduledend = new Date($scope.user.submissionDate);
          //     ins.properties.ivz_scheduledstarttime = parseInt($scope.user.mStart);
          //     ins.properties.ivz_scheduledendtime = parseInt($scope.user.mEnd);
          //     ins.properties.ivz_visitdate = new Date($scope.user.submissionDate);
          //     ins.properties.ivz_customer = new MobileCRM.Reference('ivz_saleprospect',accountid);
          //     ins.properties.ivz_visitopenaccount = parseInt($scope.user.vOpenAccount);
          //     ins.properties.ivz_visitorder = parseInt($scope.user.vOpenOrder);
          //     ins.properties.ivz_visitclaimorder = parseInt($scope.user.vOpenClaim);
          //     ins.properties.ivz_visitadjustment = parseInt($scope.user.vAdjustment);
          //     ins.properties.ivz_visitpostpect = parseInt($scope.user.vPostpect);
          //     ins.properties.ivz_visitproductrecall = parseInt($scope.user.vProductRecall);
          //     ins.properties.ivz_visitmarket = parseInt($scope.user.vMarketSumu);
          //     ins.properties.ivz_visitcompetitors = parseInt($scope.user.vComputitor);
          //     ins.properties.ivz_visitcollection = parseInt($scope.user.vConllecttion);
          //     ins.properties.ivz_visitbilling = parseInt($scope.user.vBilling);
          //     ins.properties.ivz_visitsuggest = parseInt($scope.user.vSuggust);
          //     ins.properties.ivz_visitactivities = bActivi.toString();
          //     ins.properties.ivz_empid = 'EXAMP';
          //     ins.properties.location = latitude,longitude;
          //     ins.properties.ivz_latilong = latitude,longitude;
          //     ins.properties.ivz_state =  new MobileCRM.Reference('ivz_addressprovince',proviceid);
          //     ins.properties.ivz_city =  new MobileCRM.Reference('ivz_addressdistrict',districtid);
          //     ins.properties.ivz_territoryid = new MobileCRM.Reference('territory',territoryid);
          //     ins.save(function(err){
          //       if(err){
          //         alert("excbnpostpect "+err);
          //       }else{
          //         alert("บันทึกข้อมูลเสร็จแล้ว");
          //         window.history.go(-1);
          //       }
          //   });
        }catch(er){
          alert('excbn03 '+er);
        }
      }
    }else{
      alert('not match evething');
    }
  }
})
////////////////// End //////////////////////
;
