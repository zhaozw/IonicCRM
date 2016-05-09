angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$cookies,Data,$ionicLoading) {
  $scope.Data = Data;

  $scope.showLoadingProperTimes = function() {
       $ionicLoading.show({
           template:  '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner>',
           noBackdrop: true
       });
   };

setTimeout(function(){
  $ionicLoading.hide();
},10000);

 $scope.showLoadingProperTimes();


  GetGPSLocation(function(res){
      Data.latitude = res.latitude;
      Data.longitude = res.longitude;
  });
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
  Data.mastertype = $stateParams.mastertype;
  Data.sterritory = $stateParams.sterritory;
  Data.nterritory = $stateParams.nterritory;
  if(Data.sterritory == '0' || Data.sterritory == 0){
    Data.sterritory = '40791CA7-D5E1-E511-80E1-005056A71F87';
    //Data.masname = 'A02';
  }
  if(Data.mastertype == 1 || Data.mastertype == '1'){
    Data.dirsale = false;
  }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
    Data.dirsale = true;
  }
  GetGPSLocation(function(res){
      Data.latitude = res.latitude;
      Data.longitude = res.longitude;
  });
  //console.log($cookies.username);
  $scope.dvTodos = true;
  GetAppointStatus(Data.sterritory,0,function(data){
    if(data){
      $scope.dvTodos = false;
      $scope.todos = data;
    }else{
      $scope.dvTodos = true;
    }
  });
  $scope.mailreport = function(){
    try{
      var data = $scope.todos;
      for(var i in data){
        var ins = new MobileCRM.DynamicEntity('appointment',data[i].activityid);
           ins.properties.ivz_planningstatus = parseInt(1);
           ins.save(function(err){
             if(err){
               alert("ex insert "+err);
             }
         });
      }
    }catch(er){
      alert(er);
    }finally{
      SendMail(Data.mailtomail,'text title','text body');
    }
  }
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
    getInvoiceByAccountid(Data.sterritory,function(data){
      $scope.arInvoice = false;
      $scope.todos = data;
    });
  }else if($scope.accountype == '2'){
    Data.sBilling = 0;
    Data.scollecttion = 0;
    console.log('insert ค้นหาลูกค้าทั่วไป');
    GetAccount(Data.sterritory,2,function(data){
      $scope.arAccount = false;
      $scope.todos = data;
    });
  }else if($scope.accountype == '3'){
    Data.sBilling = 0;
    Data.scollecttion = 0;
    //console.log('insert ค้นหาลูกค้าเป้าหมาย');
    GetPostpectByTer(Data.sterritory,function(data){
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
      if(accountype){
        try{
          if(gyuid){
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
               if(accountype == '1' || accountype == 1 || accountype == 2 || accountype == '2'){
                 ins.properties.ivz_customer = new MobileCRM.Reference('account',accountid);
               }else{
                 ins.properties.ivz_saleprospect = new MobileCRM.Reference('ivz_saleprospect',accountid);
               }
               ins.properties.ivz_employeeposition = parseInt(Data.mastertype);
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
               ins.properties.ivz_empid = Data.Empid;
               ins.properties.location = latitude,longitude;
               ins.properties.ivz_latilong = latitude,longitude;
               ins.properties.ivz_state =  new MobileCRM.Reference('ivz_addressprovince',proviceid);
               ins.properties.ivz_city =  new MobileCRM.Reference('ivz_addressdistrict',districtid);
               ins.properties.ivz_territoryid = new MobileCRM.Reference('territory',territoryid);
               ins.save(function(err){
                 if(err){
                   $scope.txerr = err;
                   insertcodeex('เกิดข้อผิดพลาด exappointment','controller.js PlanAccuntDetailCtrl scope.cbnAppoint','บันทึกข้อมูล appointment account:'+accountname,'243',err,Data.masname,1,function(data){
                     if(data){
                       alert("exappointment "+err);
                     }
                   });
                 }else{
                   insertcodeex('บันทึกข้อมูล exappointment','controller.js PlanAccuntDetailCtrl scope.cbnAppoint','บันทึกข้อมูล appointment account:'+accountname,'243','ไม่พบข้อผิดพลาด',Data.masname,0,function(data){
                     if(data){
                       alert("บันทึกข้อมูลเสร็จแล้ว");
                       window.history.go(-1);
                     }
                   });
                 }
             });
          }else{
            insertcodeex('เกิดข้อผิดพลาดไม่พบ GUID','controller.js PlanAccuntDetailCtrl scope.cbnAppoint','บันทึกข้อมูล appointment account:'+accountname,'252',$scope.txerr,Data.masname,1,function(data){
              if(data){
                  alert('เกิดข้อผิดพลาดไม่พบ GUID กรุณาปิดแอพและเข้าสู่ระบบใหม่ครับ');
              }
            });
          }
        }catch(er){
          alert('excbn02 '+er);
        }
      }
    }
  }
})
.controller('PlanSupCtrl', function($scope, $stateParams,$cookies,Data) {
  $scope.Data = Data;
   Data.mastertype = $stateParams.mastertype;
  if(Data.mastertype == 1 || Data.mastertype == '1'){
    Data.dirsale = false;
  }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
    Data.dirsale = true;
  }
  GetGPSLocation(function(res){
      Data.latitude = res.latitude;
      Data.longitude = res.longitude;
  });
  gettername(Data.masname,function(data){
    if(data){
      $scope.listmaster = data;
    }
  });
})
.controller('PlanSendPlanCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  if(Data.mastertype == 1 || Data.mastertype == '1'){
    Data.dirsale = false;
  }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
    Data.dirsale = true;
  }
})
.controller('PlanListMasterCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  if(Data.mastertype == 1 || Data.mastertype == '1'){
    Data.dirsale = false;
  }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
    Data.dirsale = true;
  }
  gettername(Data.masname,function(data){
    if(data){
      $scope.listmaster = data;
    }
  });
})
.controller('PlanListDetailCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.vCheckAll = 0;
  if(Data.mastertype == 1 || Data.mastertype == '1'){
    Data.dirsale = false;
  }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
    Data.dirsale = true;
  }

  GetAppointStatus($stateParams.territoryid,0,function(data){
    $scope.listappointment = data;
  });
  $scope.copyplanning = function(id){
    $scope.listappointment.slice(id,1);
  }
  $scope.exprchk = function(ethis){
    console.log(ethis);
  }
  $scope.reloaddata = function (){
    GetAppointStatus($stateParams.territoryid,0,function(data){
      $scope.listappointment = data;
    });
  }
  $scope.confirmcopy = function (){
    //SendMail($stateParams.mailtomail,'title','text');
    window.history.go(-1);
  }
  $scope.cancelcp = function (){
    window.history.go(-1);
  }
})
.controller('PlanSendSupCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.vCheckAll = 0;
  if(Data.mastertype == 1 || Data.mastertype == '1'){
    Data.dirsale = false;
  }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
    Data.dirsale = true;
  }
  $scope.exprchk = function(ethis){
    console.log(ethis);
  }
  $scope.reloaddata = function (){

  }
  $scope.confirmcopy = function (){
    window.history.go(-1);
  }
  $scope.cancelcp = function (){
    window.history.go(-1);
  }
})
.controller('PlanApproveSupCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.vCheckAll = 0;
  if(Data.mastertype == 1 || Data.mastertype == '1'){
    Data.dirsale = false;
  }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
    Data.dirsale = true;
  }
})
.controller('PlanListApproveCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.vCheckAll = 0;
  if(Data.mastertype == 1 || Data.mastertype == '1'){
    Data.dirsale = false;
  }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
    Data.dirsale = true;
  }
})
////////////////// End //////////////////////
/////////////////// Planned ///////////////////
.controller('PlanedCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.vCheckAll = 0;
  if(Data.mastertype == 1 || Data.mastertype == '1'){
    Data.dirsale = false;
  }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
    Data.dirsale = true;
  }
})
///////////////////  End //////////////////////
;
