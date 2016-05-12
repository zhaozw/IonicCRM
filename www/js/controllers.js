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
  },3000);
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
  $scope.setdmaster = function(id){
    Data.mastertype = id;
  }
})
.controller('PlaylistsCtrl', function($scope,Data) {
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
  //Data.mastertype = 1; //$stateParams.mastertype;
  Data.sterritory = $stateParams.sterritory;
  Data.nterritory = $stateParams.nterritory;
  Data.dirsale = false;
  if(Data.sterritory == '0' || Data.sterritory == 0){
    Data.sterritory = '40791CA7-D5E1-E511-80E1-005056A71F87';
  }
  //alert('$stateParams.mastertype:'+$stateParams.mastertype);
  GetGPSLocation(function(res){
      Data.latitude = res.latitude;
      Data.longitude = res.longitude;
  });
  $scope.dvTodos = true;
  GetAppointStatus(Data.sterritory,0,Data.mastertype,function(data){
    if(data){
      $scope.dvTodos = false;
      $scope.todos = data;
    }else{
      $scope.dvTodos = true;
    }
  });
  $scope.reloaddata = function(){
    GetAppointStatus(Data.sterritory,0,Data.mastertype,function(data){
      if(data){
        $scope.dvTodos = false;
        $scope.todos = [];
        for(var i in data){
          $scope.todos.push({
            activityid:data[i].activityid,
            ivz_customer:data[i].ivz_customer,
            ivz_territoryid:data[i].ivz_territoryid,
            ivz_empid:data[i].ivz_empid,
            start:data[i].start,
            end:data[i].end,
            ivz_saleprospect:data[i].ivz_saleprospect,
            title:data[i].title,
            ivz_visit:data[i].ivz_visit,
            ivz_visitbilling:data[i].ivz_visitbilling,
            ivz_visitclaimorder:data[i].ivz_visitclaimorder,
            ivz_visitcollection:data[i].ivz_visitcollection,
            ivz_visitopenaccount:data[i].ivz_visitopenaccount,
            ivz_visitorder:data[i].ivz_visitorder,
            ivz_visitadjustment:data[i].ivz_visitadjustment,
            ivz_visitcompetitors:data[i].ivz_visitcompetitors,
            ivz_visitmarket:data[i].ivz_visitmarket,
            ivz_visitpostpect:data[i].ivz_visitpostpect,
            ivz_visitproductrecall:data[i].ivz_visitproductrecall,
            ivz_visitactivities:data[i].ivz_visitactivities,
            ivz_visitsuggest:data[i].ivz_visitsuggest,
            ivz_employeeposition:data[i].ivz_employeeposition,
            ivz_addressprovince:data[i].ivz_addressprovince,
            ivz_addressdistrict:data[i].ivz_addressdistrict,
            territoryid:data[i].territoryid,
            accountnumber:data[i].accountnumber,
            ivz_planningstatus:data[i].ivz_planningstatus,
            ivz_emailcontact:data[i].ivz_emailcontact,
            ivz_leadermail:data[i].ivz_leadermail,
            ivz_ccmail:data[i].ivz_ccmail,
            ivz_balancecredit:data[i].ivz_balancecredit,
            filtername:data[i].filtername,
            mailtomail:data[i].mailtomail,
            ivz_scheduledstarttime:data[i].ivz_scheduledstarttime,
            ivz_scheduledendtime:data[i].ivz_scheduledendtime
          });
        }
      }else{
        $scope.dvTodos = true;
      }
      $scope.$apply();
    });
  }
  $scope.removeplanning = function(index){
    $scope.todos.splice(index,1);
  }
  $scope.mailreport = function(){
    try{
      var data = $scope.todos;
      for(var i in data){
        if(data[i].ivz_employeeposition == Data.mastertype){
          var ins = new MobileCRM.DynamicEntity('appointment',data[i].activityid);
             ins.properties.ivz_planningstatus = parseInt(1);
             ins.save(function(err){
               if(err){
                 alert("ex insert "+err);
               }
           });
        }
      }
    }catch(er){
      alert(er);
    }finally{
      SendMail(Data.mailtomail,'text title','text body');
      setTimeout(function(){
        $scope.reloaddata();
      },3000);
    }
  }
})
.controller('Plan2Ctrl',function($scope, $stateParams,$cookies,$location,Data){
  $scope.Data = Data;
  Data.mastertype = 2; //$stateParams.mastertype;
  Data.sterritory = $stateParams.sterritory;
  Data.nterritory = $stateParams.nterritory;
  Data.dirsale = false;
  if(Data.sterritory == '0' || Data.sterritory == 0){
    Data.sterritory = '40791CA7-D5E1-E511-80E1-005056A71F87';
  }
  //alert('$stateParams.mastertype:'+$stateParams.mastertype);
  GetGPSLocation(function(res){
      Data.latitude = res.latitude;
      Data.longitude = res.longitude;
  });
  $scope.dvTodos = true;
  GetAppointStatus(Data.sterritory,0,Data.mastertype,function(data){
    if(data){
      $scope.dvTodos = false;
      $scope.todos = data;
    }else{
      $scope.dvTodos = true;
    }
  });
  $scope.reloaddata = function(){
    GetAppointStatus(Data.sterritory,0,Data.mastertype,function(data){
      if(data){
        $scope.dvTodos = false;
        $scope.todos = [];
        for(var i in data){
          $scope.todos.push({
            activityid:data[i].activityid,
            ivz_customer:data[i].ivz_customer,
            ivz_territoryid:data[i].ivz_territoryid,
            ivz_empid:data[i].ivz_empid,
            start:data[i].start,
            end:data[i].end,
            ivz_saleprospect:data[i].ivz_saleprospect,
            title:data[i].title,
            ivz_visit:data[i].ivz_visit,
            ivz_visitbilling:data[i].ivz_visitbilling,
            ivz_visitclaimorder:data[i].ivz_visitclaimorder,
            ivz_visitcollection:data[i].ivz_visitcollection,
            ivz_visitopenaccount:data[i].ivz_visitopenaccount,
            ivz_visitorder:data[i].ivz_visitorder,
            ivz_visitadjustment:data[i].ivz_visitadjustment,
            ivz_visitcompetitors:data[i].ivz_visitcompetitors,
            ivz_visitmarket:data[i].ivz_visitmarket,
            ivz_visitpostpect:data[i].ivz_visitpostpect,
            ivz_visitproductrecall:data[i].ivz_visitproductrecall,
            ivz_visitactivities:data[i].ivz_visitactivities,
            ivz_visitsuggest:data[i].ivz_visitsuggest,
            ivz_employeeposition:data[i].ivz_employeeposition,
            ivz_addressprovince:data[i].ivz_addressprovince,
            ivz_addressdistrict:data[i].ivz_addressdistrict,
            territoryid:data[i].territoryid,
            accountnumber:data[i].accountnumber,
            ivz_planningstatus:data[i].ivz_planningstatus,
            ivz_emailcontact:data[i].ivz_emailcontact,
            ivz_leadermail:data[i].ivz_leadermail,
            ivz_ccmail:data[i].ivz_ccmail,
            ivz_balancecredit:data[i].ivz_balancecredit,
            filtername:data[i].filtername,
            mailtomail:data[i].mailtomail,
            ivz_scheduledstarttime:data[i].ivz_scheduledstarttime,
            ivz_scheduledendtime:data[i].ivz_scheduledendtime
          });
        }
      }else{
        $scope.dvTodos = true;
      }
    });
  }
  $scope.removeplanning = function(index){
    $scope.todos.splice(index,1);
  }
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
         if(i == data.length){
           $scope.reloaddata();
           SendMail(Data.mailtomail,'text title','text body');
         }
      }
    }catch(er){
      alert(er);
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
.controller('PlanAccuntDetailCtrl', function($scope, $stateParams,$cookies,Data,$ionicHistory) {
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
                       $ionicHistory.goBack(-1);
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
  Data.dirsale = false;
  Data.mastertype = 2;
  //alert('$stateParams.mastertype:'+$stateParams.mastertype);
})
.controller('PlanListMasterCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  // if($stateParams.mastertype == 1 || $stateParams.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if($stateParams.mastertype == 2 || $stateParams.mastertype == '2' || $stateParams.mastertype == 3 || $stateParams.mastertype == '3'){
  //   Data.dirsale = true;
  // }
  gettername(Data.masname,function(data){
    if(data){
      $scope.listmaster = data;
    }
  });
})
.controller('PlanListDetailCtrl',function($scope, $stateParams,$cookies,Data,$ionicHistory){
  $scope.Data = Data;
  $scope.vCheckAll = 0;
  $scope.listappointment = [];
  GetAppointStatus($stateParams.territoryid,0,1,function(data){
     for(var i in data){
       $scope.listappointment.push({
         activityid:data[i].activityid,
         ivz_customer:data[i].ivz_customer,
         ivz_territoryid:data[i].ivz_territoryid,
         ivz_empid:data[i].ivz_empid,
         start:data[i].start,
         end:data[i].end,
         ivz_saleprospect:data[i].ivz_saleprospect,
         title:data[i].title,
         ivz_visit:data[i].ivz_visit,
         ivz_visitbilling:data[i].ivz_visitbilling,
         ivz_visitclaimorder:data[i].ivz_visitclaimorder,
         ivz_visitcollection:data[i].ivz_visitcollection,
         ivz_visitopenaccount:data[i].ivz_visitopenaccount,
         ivz_visitorder:data[i].ivz_visitorder,
         ivz_visitadjustment:data[i].ivz_visitadjustment,
         ivz_visitcompetitors:data[i].ivz_visitcompetitors,
         ivz_visitmarket:data[i].ivz_visitmarket,
         ivz_visitpostpect:data[i].ivz_visitpostpect,
         ivz_visitproductrecall:data[i].ivz_visitproductrecall,
         ivz_visitactivities:data[i].ivz_visitactivities,
         ivz_visitsuggest:data[i].ivz_visitsuggest,
         ivz_employeeposition:data[i].ivz_employeeposition,
         ivz_addressprovince:data[i].ivz_addressprovince,
         ivz_addressdistrict:data[i].ivz_addressdistrict,
         territoryid:data[i].territoryid,
         accountnumber:data[i].accountnumber,
         ivz_planningstatus:data[i].ivz_planningstatus,
         ivz_emailcontact:data[i].ivz_emailcontact,
         ivz_leadermail:data[i].ivz_leadermail,
         ivz_ccmail:data[i].ivz_ccmail,
         ivz_balancecredit:data[i].ivz_balancecredit,
         filtername:data[i].filtername,
         mailtomail:data[i].mailtomail,
         ivz_scheduledstarttime:data[i].ivz_scheduledstarttime,
         ivz_scheduledendtime:data[i].ivz_scheduledendtime
       });
     }
  });
  $scope.removeplanning = function(id){
    $scope.listappointment.splice(id,1);
  }
  $scope.reloaddata = function (){
    GetAppointStatus($stateParams.territoryid,0,1,function(data){
      $scope.listappointment = data;
    });
  }
  $scope.confirmcopy = function (){
    var data = $scope.listappointment;
    for(var i in data){
      var guidfor = guid();
      try{
        var ins = new MobileCRM.DynamicEntity.createNew("appointment");
           ins.properties.activityid = guidfor;
           ins.properties.subject = data[i].title;
           ins.properties.ivz_custname = data[i].title;
           ins.properties.ivz_planningstatus = parseInt(0);
           ins.properties.scheduledstart = new Date(data[i].start);
           ins.properties.scheduledend = new Date(data[i].end);
           ins.properties.ivz_scheduledstarttime = parseInt(data[i].ivz_scheduledstarttime);
           ins.properties.ivz_scheduledendtime = parseInt(data[i].ivz_scheduledendtime);
           ins.properties.ivz_visitdate = new Date(data[i].start);
           if(data[i].ivz_customer){
             ins.properties.ivz_customer = new MobileCRM.Reference('account',data[i].ivz_customer.id);
           }else if(data[i].ivz_saleprospect){
             ins.properties.ivz_saleprospect = new MobileCRM.Reference('ivz_saleprospect',data[i].ivz_saleprospect.id);
           }
          //  ins.properties.ivz_employeeposition = parseInt(Data.mastertype);
           ins.properties.ivz_employeeposition = parseInt(Data.mastertype);
           ins.properties.ivz_visitopenaccount = parseInt(CtoNum(data[i].ivz_visitopenaccount));
           ins.properties.ivz_visitorder = parseInt(CtoNum(data[i].ivz_visitorder));
           ins.properties.ivz_visitclaimorder = parseInt(CtoNum(data[i].ivz_visitclaimorder));
           ins.properties.ivz_visitadjustment = parseInt(CtoNum(data[i].ivz_visitadjustment));
           ins.properties.ivz_visitpostpect = parseInt(CtoNum(data[i].ivz_visitpostpect));
           ins.properties.ivz_visitproductrecall = parseInt(CtoNum(data[i].ivz_visitproductrecall));
           ins.properties.ivz_visitmarket = parseInt(CtoNum(data[i].ivz_visitmarket));
           ins.properties.ivz_visitcompetitors = parseInt(CtoNum(data[i].ivz_visitcompetitors));
           ins.properties.ivz_visitcollection = parseInt(CtoNum(data[i].ivz_visitcollection));
           ins.properties.ivz_visitbilling = parseInt(CtoNum(data[i].ivz_visitbilling));
           ins.properties.ivz_visitsuggest = parseInt(CtoNum(data[i].ivz_visitsuggest));
           ins.properties.ivz_visitactivities = data[i].ivz_visitactivities;
           ins.properties.ivz_empid = Data.Empid;
           ins.properties.location = Data.latitude,Data.longitude;
           ins.properties.ivz_latilong = Data.latitude,Data.longitude;
           ins.properties.ivz_state =  new MobileCRM.Reference('ivz_addressprovince',data[i].ivz_addressprovince.id);
           ins.properties.ivz_city =  new MobileCRM.Reference('ivz_addressdistrict',data[i].ivz_addressdistrict.id);
           ins.properties.ivz_territoryid = new MobileCRM.Reference('territory',data[i].territoryid.id);
           ins.save(function(err){
             if(err){
               alert('เกิดข้อผิดพลาดในการคัดลอกแผนการดำเนินงาน '+err);
             }
         });
      }catch(er){
        alert('เกิดข้อผิดพลาดในการคัดลอกแผนการดำเนินงาน '+er);
      }
    }
    setTimeout(function(){
      $ionicHistory.goBack(-1);
    },3000);
  }
  $scope.cancelcp = function (){
    $ionicHistory.goBack(-1);
  }
})
.controller('PlanSendSupCtrl',function($scope, $stateParams,$cookies,Data,$ionicHistory){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
  $scope.exprchk = function(ethis){
    console.log(ethis);
  }
  $scope.reloaddata = function (){

  }
  $scope.confirmcopy = function (){
    $ionicHistory.goBack(-1);
  }
  $scope.cancelcp = function (){
    $ionicHistory.goBack(-1);
  }
})
.controller('PlanApproveSupCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.vCheckAll = 0;
  gettername(Data.masname,function(data){
    if(data){
      $scope.listmaster = data;
    }
  });
})
.controller('PlanListApproveCtrl',function($scope, $stateParams,$cookies,Data,$ionicHistory){
  $scope.Data = Data;
  Data.sterritory = $stateParams.territoryid;
  $scope.vCheckAll = 0;
  // $scope.reloaddata();
  var itype;
  if(Data.mastertype === 2 || Data.mastertype === '2'){
    itype = 1;
  }else if(Data.mastertype === 3 || Data.mastertype === '3'){
    itype = 2;
  }else{
    itype = Data.mastertype;
  }
  GetAppointStatus($stateParams.territoryid,1,itype,function(data){
    $scope.bnklist = data;
    $scope.listappointment = data;
  });
  $scope.reloaddata = function(){
    GetAppointStatus($stateParams.territoryid,1,itype,function(data){
         $scope.listappointment = data;
         $scope.$apply();
    });
  }
  $scope.removeplanning = function(index){
    $scope.listappointment.splice(index,1);
  }
  $scope.cancelcp = function(){
    $ionicHistory.goBack(-1);
  }
  $scope.confirmcopy = function(){
    var data = $scope.listappointment;
    //Data.DataList = $scope.listappointment;
    for(var i in data){
      try{
        var ins = new MobileCRM.DynamicEntity('appointment',data[i].activityid);
            ins.properties.ivz_planningstatus = parseInt(2);
            ins.save(function(er){
              if(er){
                alert(er);
              }
            });
      }catch(er){
        alert("เกิดข้อผิดพลาดรหัส 695 "+er);
      }
    }
    setTimeout(function(){
      $scope.reloaddata();
    },3000);
  }
  $scope.rejectplan = function(){
    Data.DataList = $scope.listappointment;
    window.location.href="#/app/rejectplan/"+Data.sterritory+"/"+Data.salename+"/"+Data.tername;
  }
})
.controller('PlanRejectCtrl',function($scope, $stateParams,$cookies,Data,$rootScope,$ionicHistory){
  $scope.Data = Data;
  $scope.territoryid = $stateParams.territoryid;
  $scope.salename = $stateParams.salename;
  $scope.tername = $stateParams.tername;
  $scope.reject = {
    txtreject:''
  };
  $scope.hidden = true;
  $scope.cancelcp = function(){
    $ionicHistory.goBack(-1);
  }
  $scope.confirmplan = function(){
    var txtreject = $scope.reject.txtreject;
    if($scope.reject.txtreject){
      $scope.hidden = true;
      var data = Data.DataList;
      SendMail(Data.mailtomail,'text title','text body'+$scope.reject.txtreject);
      setTimeout(function(){
        $ionicHistory.goBack(-1);
      },3000);
      for(var i in data){
        try{
          var ins = new MobileCRM.DynamicEntity('appointment',data[i].activityid);
              ins.properties.ivz_planningstatus = parseInt(3);
              ins.properties.ivz_txtremark = $scope.reject.txtreject;
              ins.save(function(er){
                if(er){
                  alert(er);
                }
              });
        }catch(er){
          alert("เกิดข้อผิดพลาดรหัส 708 "+er);
        }
      }
    }else{
      $scope.hidden = false;
      console.log(txtreject.length);
    }
  }
})
////////////////// End //////////////////////
/////////////////// Planned ///////////////////
.controller('PlanedCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
})
.controller('PlanedListCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
})
.controller('PlanedDetailCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.goop = function(idval){
    var guidreg = guid();
    var terriid = '6C791CA7-D5E1-E511-80E1-005056A71F87';
    if(idval == 1 || idval == '1'){
      //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
      console.log('insert visit openaccount');
      window.location.href="#/app/openaccount/"+terriid+"/"+Data.mastertype+"/"+guidreg;
    }else if(idval == 2 || idval == '2'){
      //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
      console.log('insert visit adjustment');
      window.location.href="#/app/adjustment/"+terriid+"/"+Data.mastertype;
    }else if(idval == 3 || idval == '3'){
      //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
      console.log('insert visit open order');
    }else if(idval == 4 || idval == '4'){
      //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
      console.log('insert visit open claim');
    }else if(idval == 5 || idval == '5'){
      //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
      console.log('insert visit open postpect');
    }else if(idval == 6 || idval == '6'){
      //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
      console.log('insert visit open marketting');
    }else if(idval == 7 || idval == '7'){
      //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
      console.log('insert visit open computitor');
    }else if(idval == 8 || idval == '8'){
      //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
      console.log('insert visit open billing');
    }else if(idval == 9 || idval == '9'){
      //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
      console.log('insert visit open product recall');
    }else if(idval == 10 || idval == '10'){
      //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
      console.log('insert visit 10');
    }else if(idval == 11 || idval == '11'){
      //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
      console.log('insert visit 11');
    }else{
      console.log('insert '+idval);
    }
  }
})
///////////////////  End //////////////////////
/////////////////// Open Account //////////////
.controller('OpenAccountCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  Data.dataguid = $stateParams.getguid;
  $scope.insertaccount = function(){
    window.location.href="#/app/accountcontact/"+Data.dataguid;
  }
})
.controller('AccountContactCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.dataguid = $stateParams.getguid;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
  $scope.insertaccount = function(){
    window.location.href="#/app/accountmeetting/"+Data.dataguid;
  }
})
.controller('AccountMeetingCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.dataguid = $stateParams.getguid;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
  $scope.insertaccount = function(){
    window.location.href="#/app/addresstran/"+Data.dataguid;
  }
})
.controller('AccountAddressCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.dataguid = $stateParams.getguid;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
  $scope.insertaccount = function(){
    window.location.href="#/app/addressinvoice/"+Data.dataguid;
  }
})
.controller('AccountAddressInvoiceCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.dataguid = $stateParams.getguid;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
  $scope.insertaccount = function(){
    window.location.href="#/app/addressother/"+Data.dataguid;
  }
})
.controller('AccountAddressOtherCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.dataguid = $stateParams.getguid;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
  $scope.insertaccount = function(){
    window.location.href="#/app/infotransport/"+Data.dataguid;
  }
})
.controller('AccountTransportCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.dataguid = $stateParams.getguid;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
  $scope.insertaccount = function(){
    window.location.href="#/app/document/"+Data.dataguid;
  }
})
.controller('AccountDocumentCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.dataguid = $stateParams.getguid;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
  document.getElementById('doc001').addEventListener('change',function(){
    console.log('channn');
  });
  $('#doc001').change(function() {
    GetAtt('#doc001','#idcImg01','canvas01',function(data){
      console.log(data.length);
    });
  });
  $('#doc002').change(function() {
    GetAtt('#doc002','#idcImg02','canvas02',function(data){
      console.log(data.length);
    });
  });
  $('#doc003').change(function() {
    GetAtt('#doc003','#idcImg03','canvas03',function(data){
      console.log(data.length);
    });
  });
  $('#doc004').change(function() {
    GetAtt('#doc004','#idcImg04','canvas04',function(data){
      console.log(data.length);
      alert('doc004 '+data.length);
    });
  });
  $('#doc005').change(function() {
    GetAtt('#doc005','#idcImg05','canvas05',function(data){
      console.log(data.length);
      alert('doc005 '+data.length);
    });
  });

  $scope.insertaccount = function(){
    window.location.href="#/app/accountcredit/"+Data.dataguid;
  }
})
.controller('AccountCreditCtrl',function($scope, $stateParams,$cookies,Data,$compile){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
  $scope.insertaccount = function(){
    window.location.href="#/app/infomart/"+Data.dataguid;
  }
})
.controller('AccountInfoMartCtrl',function($scope, $stateParams,$cookies,Data,$compile){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
  $scope.MiniMart = {
    doc:[]
  };
  $scope.removeimg = function(id){
    $('.divimg').remove();
    console.log("Click remove "+id);
    var data = $scope.MiniMart.doc;
    data.splice(id,1);
    if(data.length > 0){
      for(var i in data){
        var html = '<div class="col col-20 divimg">'+
                   '<img class="thumbnail" src="data:image/jpeg;base64,'+data[i]+'" width="100" height="100" ng-click="removeimg('+i+')"/>'+
                   '</div>';
        angular.element(document.getElementById('divspace')).append($compile(html)($scope));
      }
    }
  }
  $('#doc006').change(function() {
			GetAtt('#doc006','#idcImg06','canvas06',function(data){
				$('.divimg').remove();
				console.log(data.length);
				$scope.MiniMart.doc.push(data);
				var datapush = $scope.MiniMart.doc;
				if(datapush.length > 0){
					for(var i in datapush){
            var html = '<div class="col col-20 divimg">'+
											 '<img class="thumbnail" src="data:image/jpeg;base64,'+datapush[i]+'" width="100" height="100" ng-click="removeimg('+i+')"/>'+
											 '</div>';
            angular.element(document.getElementById('divspace')).append($compile(html)($scope));
					}
				}else{
					var html = '<div class="col col-20">'+
										 '<img class="thumbnail" src="data:image/jpeg;base64,'+data+'่" width="100" height="100"  ng-click="removeimg('+i+')"/>'+
										 '</div>';
            angular.element(document.getElementById('divspace')).append($compile(html)($scope));
				}
			});
		});

  $scope.insertaccount = function(){
    window.location.href="#/app/accountcredit/"+Data.dataguid;
  }
})
////////////////////// end /////////////////
/////////////////// Account List //////////////
.controller('AccountListCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
})
.controller('AccountDetailCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
})
.controller('AccountInvoiceCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
})
.controller('AccountBillingCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  $scope.vCheckAll = 0;
  // if(Data.mastertype == 1 || Data.mastertype == '1'){
  //   Data.dirsale = false;
  // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
  //   Data.dirsale = true;
  // }
})
////////////////////// end /////////////////
////////////////////// Adjustment ///////////////
.controller('AdjustmentCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
})
//////////////////////// End ////////////////////
;
