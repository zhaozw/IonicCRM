angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$cookies,Data,$ionicLoading) {
  $scope.Data = Data;
  $scope.showLoadingProperTimesReg = function(txtname) {
         $ionicLoading.show({
             template:   '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner><div class="row">'+
                         '<div class="col"><h4>กรุณารอสักครู่กำลังบันทึกข้อมูลเอกสาร '+txtname+' อาจใช้เวลา 1-2 นาทีในการบันทึก</h4></div>'+
                         '</div>',
             noBackdrop: true
         });
     };
  $scope.showLoadingProperTimesRegter = function() {
            $ionicLoading.show({
                template:   '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner><div class="row">'+
                            '<div class="col"><h4>กรุณารอสักครู่กำลังบันทึกข้อมูลอาจใช้เวลา 1-2 นาทีในการบันทึก</h4></div>'+
                            '</div>',
                noBackdrop: true
            });
        };
  $scope.showLoadGPS = function() {
                  $ionicLoading.show({
                      template:   '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner><div class="row">'+
                                  '<div class="col"><h4>โปรดรอสักครู่ กำลังโหลดข้อมูล GPS อยู่อาจใช้เวลา 1-2 ในการโหลดข้อมูล</h4></div>'+
                                  '</div>',
                      noBackdrop: true
                  });
              };
  $scope.showLoadingProperTimesRegAll = function() {
            $ionicLoading.show({
                template:   '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner><div class="row">'+
                            '<div class="col"><h4>กรุณารอสักครู่กำลังบันทึกข้อมูลอาจใช้เวลา 1-2 นาทีในการบันทึก</h4></div>'+
                            '</div>',
                noBackdrop: true
            });
        };
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
  $scope.calldoc = function(cClick,ethis){
      //$scope.showLoadingProperTimes();
  		$('#'+cClick).trigger('click');
  }
  $scope.InAnnoteAttract = function(table,id,base64String,title,callback){
    $scope.showLoadingProperTimesReg(title);
      try{
        var note = MobileCRM.DynamicEntity.createNew("annotation");
                note.properties.objectid = new MobileCRM.Reference(table,id);
                note.properties.notetext = title;
                note.properties.subject = title;
                note.properties.documentbody = base64String;
                note.properties.mimetype = fileType;
                note.properties.isdocument = true;
                note.properties.filesize = parseInt(sizeKB);
                note.properties.filename = fileName;
                note.save(
                      function(er){
                        if(er){
                          alert(title+'\n'+er);
                          callback('null '+er);
                        }else{
                          callback('บันทึกไฟล์แนบ'+title);
                        }
                      });
      }catch(er){
        alert('insert doc '+title+'\n'+er);
      }
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
      window.location.href="#/app/order/"+terriid+"/"+Data.mastertype;
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
.controller('OpenAccountCtrl',function($scope, $stateParams,$cookies,Data,rego,$ionicHistory,$ionicLoading){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  Data.dataguid = $stateParams.getguid;
  //$stateParams.pricelevel;
  //$stateParams.transactioncurrency;
  //$stateParams.territoryid
  console.log($stateParams.mastertype);
  $scope.chk = {
    determinateValue:0,
    buffervalue:0,
    infomat:true,
    infocheck:false,
    infomattxtname:false,
    txtid:false
  };
  $scope.user = {
    branchselect:0,
    txtid:'',
    txtname:'',
    txtbrancher:''
  };
  GetGPSLocation(function(res){
      if(res){
        //alert(res.latitude);
        $scope.latitude = res.latitude;
        $scope.longitude = res.longitude;
      }
      $scope.$apply();
  });
  /////////////// Check Txtid ////////////
  $scope.checktxt = function(txtid){
    if(txtid){
      //$scope.chk.infocheck = rego.reChkTxtId(txtid);
      if(txtid.length > 0){
        $scope.chk.infomat = true;
        if(txtid.length > 12){
          $scope.chk.txtid = false;
          var a = new MobileCRM.FetchXml.Entity('account');
        		  a.addAttribute('ivz_taxid');//0
          var filter = new MobileCRM.FetchXml.Filter();
              filter.where('ivz_taxid','eq',txtid);
              a.filter = filter;
        	var fetch = new MobileCRM.FetchXml.Fetch(a);
        		  fetch.execute('array',function(data){
              //alert("data length:"+txtid+' == '+data.length);
              if(data.length > 0){
                $scope.chk.infocheck = true;
              }else{
                $scope.chk.infocheck = false;
              };
              $scope.$apply();
        		},function(er){alert(er);},null);
        }else{
          $scope.chk.txtid = true;
        }
      }else{
        $scope.chk.infomat = false;
      }
    }
  }
  $scope.checkname = function(txtname){
    if(txtname){
      if(txtname.length >= 0){
        $scope.chk.infomattxtname = false;
      }else{
        $scope.chk.infomattxtname = true;
      }
    }else{
      $scope.chk.infomattxtname = true;
    }
  }
  $scope.insertaccount = function(){
    //alert('test GPS Sign'+Data.latitude);
    if($scope.user.txtid){//Check txtid null
      var j = $scope.user.txtid;
      if(j.length > 12){
        $scope.chk.infomat = true;
        $scope.chk.txtid = false;
      }else{
        $scope.chk.txtid = true;
      }
    }else{
      $scope.chk.infomat = false;
    }
    if($scope.user.txtname){//check name null
      $scope.chk.infomattxtname = false;
    }else{
      $scope.chk.infomattxtname = true;
    }
    ////////////////// insert /////////////////////////
    $ionicLoading.hide();
    if($scope.chk.infomat == true && $scope.chk.txtid == false && $scope.chk.infomattxtname == false){
      console.log('insert DB');
      try{
        var a = new MobileCRM.FetchXml.Entity('account');
            a.addAttribute('accountid');//0
        var filter = new MobileCRM.FetchXml.Filter();
            filter.where('accountid','eq',$stateParams.getguid);
            a.filter = filter;
        var fetch = new MobileCRM.FetchXml.Fetch(a);
            fetch.execute('array',function(data){
            if(data.length > 0){
              var ins = new MobileCRM.DynamicEntity("account",$stateParams.getguid);
                  ins.properties.ivz_taxid = $scope.user.txtid;
                  ins.properties.name = $scope.user.txtname;
                  ins.properties.ivz_branch = parseInt($scope.user.branchselect);
                  if($scope.user.branchselect == 0 || $scope.user.branchselect == '0'){
                    ins.properties.ivz_branchdetail = 'สำนักงานใหญ่';
                    ins.properties.ivz_taxbranch = 'สำนักงานใหญ่';
                  }else{
                    ins.properties.ivz_branchdetail = 'สำนักงานย่อย';
                    ins.properties.ivz_taxbranch = 'สำนักงานย่อย';
                  }
                  ins.properties.ivz_empid = Data.Empid;///get cookies
                  ins.properties.ivz_satatusempid = parseInt($stateParams.mastertype);
                  ins.properties.territoryid = new MobileCRM.Reference('territory',$stateParams.territoryid);//A02
                  ins.properties.transactioncurrencyid = new MobileCRM.Reference('transactioncurrency',$stateParams.transactioncurrency);//บาท
                  ins.properties.defaultpricelevelid = new MobileCRM.Reference('pricelevel',$stateParams.pricelevel);//บาท
                  ins.properties.customertypecode = parseInt(2);
                  ins.properties.accountcategorycode = parseInt(100000001);
                  ins.properties.statuscode = parseInt(917970003);
                  ins.save(function(er){
                    if(er){
                      alert('error ac 902 '+er);
                    }else{
                      $scope.showLoadGPS();
                      //////////////////////////// watch //////////////////////////////////
                      $scope.listwatch = setInterval(function(){
                        if($scope.latitude){
                          //alert('Found GPS :'+$scope.latitude+'::'+$stateParams.getguid);
                          $ionicLoading.hide();
                          var ins = new MobileCRM.DynamicEntity("account",$stateParams.getguid);
                              ins.properties.address1_latitude = $scope.latitude;
                              ins.properties.address1_longitude = $scope.longitude;
                              ins.save(function(er){
                                if(er){
                                  alert('error ac location 902 '+er);
                                }else{
                                  window.location.href="#/app/accountcontact/"+$stateParams.getguid;
                                }
                              });
                          clearInterval($scope.listwatch);
                        }
                      },3000);
                      //////////////////////////// end ////////////////////////////////////
                      //window.location.href="#/app/accountcontact/"+$stateParams.getguid;
                    }
                  });
            }else{
              var ins = new MobileCRM.DynamicEntity.createNew("account");
                  ins.properties.accountid = $stateParams.getguid;
                  ins.properties.ivz_taxid = $scope.user.txtid;
                  ins.properties.name = $scope.user.txtname;
                  ins.properties.ivz_branch = parseInt($scope.user.branchselect);
                  if($scope.user.branchselect == 0 || $scope.user.branchselect == '0'){
                    ins.properties.ivz_branchdetail = 'สำนักงานใหญ่';
                    ins.properties.ivz_taxbranch = 'สำนักงานใหญ่';
                  }else{
                    ins.properties.ivz_branchdetail = 'สำนักงานย่อย';
                    ins.properties.ivz_taxbranch = 'สำนักงานย่อย';
                  }
                  ins.properties.ivz_empid = Data.Empid;///get cookies
                  ins.properties.ivz_satatusempid = parseInt($stateParams.mastertype);
                  ins.properties.territoryid = new MobileCRM.Reference('territory',$stateParams.territoryid);//A02
                  ins.properties.transactioncurrencyid = new MobileCRM.Reference('transactioncurrency',$stateParams.transactioncurrency);//บาท
                  ins.properties.defaultpricelevelid = new MobileCRM.Reference('pricelevel',$stateParams.pricelevel);//บาท
                  ins.properties.customertypecode = parseInt(2);
                  ins.properties.accountcategorycode = parseInt(100000001);
                  ins.properties.statuscode = parseInt(917970003);
                  ins.properties.ivz_statuscomplete = parseInt(0);
                  ins.save(function(er){
                    if(er){
                      alert('error ac 903 '+er);
                    }else{
                      $scope.showLoadGPS();
                      //////////////////////////// watch //////////////////////////////////
                      $scope.listwatch = setInterval(function(){
                        if($scope.latitude){
                          //alert('Found GPS :'+$scope.latitude+'::'+$stateParams.getguid);
                          $ionicLoading.hide();
                          var ins = new MobileCRM.DynamicEntity("account",$stateParams.getguid);
                              ins.properties.address1_latitude = $scope.latitude;
                              ins.properties.address1_longitude = $scope.longitude;
                              ins.save(function(er){
                                if(er){
                                  alert('error ac location 902 '+er);
                                }else{
                                  window.location.href="#/app/accountcontact/"+$stateParams.getguid;
                                }
                              });
                          clearInterval($scope.listwatch);
                        }
                      },3000);
                      //////////////////////////// end ////////////////////////////////////
                      //window.location.href="#/app/accountcontact/"+$stateParams.getguid;
                    }
                  });
            };
            $scope.$apply();
          },function(er){alert(er);},null);
      }catch(er){
        alert("step error 907 "+er);
      }
      Data.businessname = $scope.user.txtname;
    }
    ///////////////////////////////////////////////////
  }

  $scope.goback = function(){
    console.log('click back');
    $ionicHistory.goBack(-1);
  }

})
.controller('OpenAccountSupCtrl',function($scope, $stateParams,$cookies,Data,rego,$ionicHistory,$ionicLoading){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
  Data.dataguid = $stateParams.getguid;
  //$stateParams.territoryid;
  $scope.teritype = true;
  console.log($stateParams.mastertype);
  $scope.insertaccount = function(){
    window.location.href="#/app/accountcontact/"+Data.dataguid;
  }
  $scope.vm = {
    determinateValue:0
  };
  $scope.user = {
    branchselect:''
  };
  var i = 0;
  $scope.settime = setInterval(function(){
    var j = rego.countserve;
    $scope.vm.determinateValue = parseInt(j[i++]);
    if(i > 9){
      console.log('Match');
      clearInterval($scope.settime);
    }
  },1000);
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})
/* --------------------------------- Contact ----------------------------------------- */
.controller('AccountContactCtrl',function($scope, $stateParams,$cookies,Data,$ionicHistory,$ionicLoading){
  $scope.Data = Data;
  //Data.dataguid = $stateParams.getguid;
  $scope.chk = {
    infomatfirstname:true,
    infomatlastname:true,
    infomattelhome:true,
    infomatmobile:true,
    infomatmobilenum:true,
    infomatfax:true,
    infomatemailname:true
  };
  $scope.user = {
    firstname:'',
    lastname:'',
    telhome:'',
    mobile:'',
    fax:'',
    emailname:''
  };
  $scope.chknull = function(idval,chktxt){
    if(idval == 1){
      if(chktxt){
        $scope.chk.infomatfirstname = true;
      }else{
        $scope.chk.infomatfirstname = false;
      }
    }else if(idval == 2){
      if(chktxt){
        $scope.chk.infomatlastname = true;
      }else{
        $scope.chk.infomatlastname = false;
      }
    }else if(idval == 3){
      var nNum = !(isNaN(chktxt));
      //console.log(nNum);
      if(chktxt){
        $scope.chk.infomatmobile = true;
        if(chktxt.length > 9){
            $scope.chk.infomatmobilenum = nNum;
        }else{
          $scope.chk.infomatmobile = false;
        }
      }else{
        $scope.chk.infomatmobile = false;
      }
    }
  };
  $scope.insertaccount = function(){
    if($scope.user.firstname){//Check null Name
      $scope.chk.infomatfirstname = true;
    }else{
      $scope.chk.infomatfirstname = false;
    }

    if($scope.user.lastname){//Check null Name
      $scope.chk.infomatlastname = true;
    }else{
      $scope.chk.infomatlastname = false;
    }

    if($scope.user.mobile){//Check Null Mobile
      var sNumL = $scope.user.mobile;
      var nNum = !(isNaN($scope.user.mobile));
      if(sNumL.length <= 0){
        $scope.chk.infomatmobile  = false;
      }else{
        $scope.chk.infomatmobilenum = nNum;
        $scope.chk.infomatmobile  = true;
      }
    }else{
      $scope.chk.infomatmobile  = false;
    }

    if($scope.chk.infomatfirstname == true && $scope.chk.infomatlastname == true && $scope.chk.infomatmobile  == true && $scope.chk.infomatmobilenum == true){
      console.log('update db :'+$stateParams.getguid);
      $scope.showLoadingProperTimes();
      $scope.genguid = guid();
      alert($stateParams.getguid+'::::'+$scope.genguid);
      try{
        var a = new MobileCRM.FetchXml.Entity('contact');
            a.addAttribute('contactid');//0
        var filter = new MobileCRM.FetchXml.Filter();
            filter.where('contactid','eq',$scope.genguid);
            a.filter = filter;
        var fetch = new MobileCRM.FetchXml.Fetch(a);
            fetch.execute('array',function(data){
            if(data.length > 0){
              var ins = new MobileCRM.DynamicEntity("contact",$scope.genguid);
        	  			ins.properties.parentcustomerid = new MobileCRM.Reference('account',Data.getguid);
        	  			ins.properties.firstname = $scope.user.firstname;
        	  			ins.properties.lastname = $scope.user.lastname;
        	  			ins.properties.telephone1 = $scope.user.telhome;
        	  			ins.properties.mobilephone = $scope.user.mobile;
        	  			ins.properties.fax = $scope.user.fax;
        	  			ins.properties.emailaddress1 = $scope.user.emailname;
        	  			ins.properties.statuscode = parseInt(917970001);
        	  			ins.save(function(er){
        	  				if(er){
        	  					alert("ER1087CODE:"+er);
        	  				}
        	  			});
            }else{
              var ins = new MobileCRM.DynamicEntity.createNew("contact");
                  ins.properties.contactid = $scope.genguid;
        	  			ins.properties.parentcustomerid = new MobileCRM.Reference('account',Data.getguid);
        	  			ins.properties.firstname = $scope.user.firstname;
        	  			ins.properties.lastname = $scope.user.lastname;
        	  			ins.properties.telephone1 = $scope.user.telhome;
        	  			ins.properties.mobilephone = $scope.user.mobile;
        	  			ins.properties.fax = $scope.user.fax;
        	  			ins.properties.emailaddress1 = $scope.user.emailname;
        	  			ins.properties.statuscode = parseInt(917970001);
        	  			ins.save(function(er){
        	  				if(er){
        	  					alert("ER1103CODE:"+er);
        	  				}
        	  			});
            };
            $scope.$apply();
          },function(er){alert(er);},null);
          try{
    				var ins = new MobileCRM.DynamicEntity("account",$stateParams.getguid);
    						ins.properties.telephone1 = $scope.user.telhome;
    						ins.properties.fax = $scope.user.fax;
    						ins.properties.telephone2 = $scope.user.mobile;
    						ins.properties.emailaddress1 = $scope.user.emailname;
    						ins.properties.ivz_phonemobile = $scope.user.mobile;
    						ins.save(function(er){
    							if(er){
    								alert('error ac contact 167 '+er);
    							}
    						});
    			}catch(er){
    				alert("error149 "+er);
    			}
          setTimeout(function(){
            Data.recivename = $scope.user.firstname+' '+$scope.user.lastname;
            $ionicLoading.hide();
            window.location.href="#/app/accountmeetting/"+$stateParams.getguid;
          },3000);
	  	}catch(er){
	  		alert("insert contact 488:"+er);
	  	}
    }
    //comment
    //window.location.href="#/app/accountmeetting/"+$stateParams.getguid;
  }
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})
/* --------------------------------- Meetting --------------------------------------- */
.controller('AccountMeetingCtrl',function($scope, $stateParams,$cookies,Data,$ionicHistory,$ionicLoading){
  $scope.Data = Data;
  //Data.dataguid = $stateParams.getguid;

  $scope.user = {
    actionfn:false,
    optionDay:0,
    optionStarttime:917970016,//set default timer option
    optionEndtime:917970036,//set default timer option
    optionBillingDay:0,
    optionStartBilltime:917970016,//set default timer option
    optionEndBilltime:917970036,//set default timer option
    ///////////////// option ///////////////////////
    optionStartNormaltime:917970016,//set default timer option
    optionEndNormaltime:917970036,//set default timer option
    /////////////////////////////////////////////
    optionStarttimeAvailable:917970016,//set default timer option
    optionEndtimeAvailable:917970036,//set default timer option
    dataMon:true,
    dataTue:true,
    dataWen:true,
    dataThu:true,
    dataFri:true,
    dataSat:true,
    dataSun:false
  };
  $scope.chk = {
    infomatoptionDay:true,
    infomatoptionBillingDay:true
  };
  $scope.specialday = [{
                        id: 0,
                        name: "จันทร์"
                      }, {
                        id: 1,
                        name: "อังคาร"
                      }, {
                        id: 2,
                        name: "พุธ"
                      }, {
                        id: 3,
                        name: "พฤหัส"
                      }, {
                        id: 4,
                        name: "ศุกร์"
                      }, {
                        id: 5,
                        name: "เสาร์"
                      }, {
                        id: 6,
                        name: "อาทิตย์"
                      }];
  GetAvailablefromtime(function(data) {
    $scope.datetimer = data;
  });
  $scope.insertaccount = function(){
      try{
        var ins = new MobileCRM.DynamicEntity("account",Data.dataguid);
            ins.properties.ivz_specialcheking = converttrue($scope.user.actionfn);
            ins.properties.ivz_specialchecking = parseInt($scope.user.optionDay);
            ins.properties.ivz_starttimechecking = parseInt($scope.user.optionStarttime);
            ins.properties.ivz_endtimechecking = parseInt($scope.user.optionEndtime);
            ins.properties.ivz_specialbilling = converttrue($scope.user.actionfn);
            ins.properties.ivz_specialday = parseInt($scope.user.optionBillingDay);
            ins.properties.ivz_specialformtime = parseInt($scope.user.optionStartBilltime);
            ins.properties.ivz_specialendtime = parseInt($scope.user.optionEndBilltime);
						ins.properties.ivz_specialcheking = converttrue($scope.user.actionfn);
						ins.properties.ivz_specialbilling = converttrue($scope.user.actionfn);
						ins.properties.ivz_specialoption = converttrue($scope.user.actionfn);
						ins.properties.ivz_specialmonday = converttrue($scope.user.dataMon);
		  			ins.properties.ivz_specialtuesday = converttrue($scope.user.dataTue);
		  			ins.properties.ivz_specialwednesday = converttrue($scope.user.dataWen);
		  			ins.properties.ivz_specialthursday = converttrue($scope.user.dataThu);
		  			ins.properties.ivz_specialfriday = converttrue($scope.user.dataFri);
		  			ins.properties.ivz_specialsaturday = converttrue($scope.user.dataSat);
		  			ins.properties.ivz_specialsunday = converttrue($scope.user.dataSun);
						ins.properties.ivz_availablefromtime = parseInt($scope.user.optionStartNormaltime);
		  			ins.properties.ivz_availabletotime = parseInt($scope.user.optionEndNormaltime);
            ins.properties.ivz_officehourfrom = parseInt($scope.user.optionStarttimeAvailable);
            ins.properties.ivz_officehourto = parseInt($scope.user.optionEndtimeAvailable);
						ins.save(function(er){
							if(er){
								alert('error ac 196 '+er);
							}
						});
			}catch(er){
				alert("error300 "+er);
			}
    setTimeout(function(){
      $ionicLoading.hide();
      window.location.href="#/app/addresstran/"+$stateParams.getguid;
    },2000);
   $scope.showLoadingProperTimes();
  }
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})



.controller('AccountAddressCtrl',function($scope, $stateParams,$cookies,Data,$ionicHistory,$ionicLoading,Darray){
  $scope.Data = Data;
  //Data.dataguid = $stateParams.getguid;
  $scope.user = {
    txtConName:Data.recivename,
    txtAddressProduct:'',
    optionProvince:'',
    optionDistrict:'',
    txtPostCode:''
  };
  $scope.chk = {
    infomattxtConName:true,
    infomattxtAddressProduct:true,
    infomatoptionProvince:true,
    infomatoptionDistrict:true,
    infomattxtPostCode:true
  };
  ////////// Get Province
   GetProvinceList(function(data){
     $scope.ProvinceDataList = data;
     $scope.$apply();
   });
  ////////// Get districtid
  $scope.getdistricttranspot = function(darray){
    GetDistrictById(darray,function(data){
      $scope.DistrictlistTransport = data;
    });
  }
  ///////// check null ///////////////
  $scope.chknull = function(idval,txtname){
    if(idval == 1){
      if(txtname){
        $scope.chk.infomattxtConName = true;
      }else{
        $scope.chk.infomattxtConName = false;
      }
    }else if(idval == 2){
      if(txtname){
        $scope.chk.infomattxtAddressProduct = true;
      }else{
        $scope.chk.infomattxtAddressProduct = false;
      }
    }else if(idval == 3){
      if(txtname){
        $scope.chk.infomattxtPostCode = true;
      }else{
        $scope.chk.infomattxtPostCode = false;
      }
    }
  }

  $scope.insertaccount = function(){
      if($scope.user.txtConName){
        $scope.chk.infomattxtConName = true;
      }else{
        $scope.chk.infomattxtConName = false;
      }
      if($scope.user.txtAddressProduct){
        $scope.chk.infomattxtAddressProduct = true;
      }else{
        $scope.chk.infomattxtAddressProduct = false;
      }
      if($scope.user.optionProvince){
        $scope.chk.infomatoptionProvince = true;
      }else{
        $scope.chk.infomatoptionProvince = false;
      }
      if($scope.user.optionDistrict){
        $scope.chk.infomatoptionDistrict = true;
      }else{
        $scope.chk.infomatoptionDistrict = false;
      }
      if($scope.user.txtPostCode){
        $scope.chk.infomattxtPostCode = true;
      }else{
        $scope.chk.infomattxtPostCode = false;
      }

      if($scope.chk.infomattxtConName == true &&
        $scope.chk.infomattxtAddressProduct == true &&
        $scope.chk.infomatoptionProvince == true &&
        $scope.chk.infomatoptionDistrict == true &&
        $scope.chk.infomattxtPostCode == true){

        Darray.txtname = $scope.user.txtConName;//Set Parameter
        Darray.txtaddress = $scope.user.txtAddressProduct;//Set Parameter
        Darray.provinceid = $scope.user.optionProvince;//Set Parameter
        Darray.districtid = $scope.user.optionDistrict;//Set Parameter
        Darray.zipcode = $scope.user.txtPostCode;//Set Parameter

          console.log('Update DB');
          try{
    				var ins = new MobileCRM.DynamicEntity("account",Data.dataguid);
    						ins.properties.address2_addresstypecode = parseInt(2);//delivery
    						ins.properties.address2_name = $scope.user.txtConName;
    						ins.properties.address2_line1 = $scope.user.txtAddressProduct;
    						ins.properties.ivz_address2province = new MobileCRM.Reference('ivz_addressprovince',$scope.user.optionProvince);
    						ins.properties.ivz_address2district = new MobileCRM.Reference('ivz_addressdistrict',$scope.user.optionDistrict);
    						ins.properties.address2_postalcode = $scope.user.txtPostCode;
    						ins.save(function(er){
    							if(er){
    								alert('error ac 432 '+er);
    							}
    						});
    			}catch(er){
    				alert("error436 "+er);
    			}
          $scope.loadpage();
      }
      //comment
      //$scope.loadpage();
  }
  $scope.loadpage = function(){
    setTimeout(function(){
      $ionicLoading.hide();
      window.location.href="#/app/addressinvoice/"+$stateParams.getguid;
    },600);
   $scope.showLoadingProperTimes();
  }
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})
.controller('AccountAddressInvoiceCtrl',function($scope, $stateParams,$cookies,Data,$ionicHistory,$ionicLoading,Darray){
  $scope.Data = Data;
  //Data.dataguid = $stateParams.getguid;
  $scope.user = {
    txtConName:Darray.txtname,
    txtAddressProduct:Darray.txtaddress,
    optionProvince:Darray.provinceid,
    optionDistrict:Darray.districtid,
    txtPostCode:Darray.zipcode
  };
  $scope.chk = {
    infomattxtConName:true,
    infomattxtAddressProduct:true,
    infomatoptionProvince:true,
    infomatoptionDistrict:true,
    infomattxtPostCode:true
  };
  ////////// Get Province
   GetProvinceList(function(data){
     $scope.ProvinceDataList = data;
     $scope.$apply();
   });
  ////////// Get districtid
  $scope.getdistricttranspot = function(darray){
    //alert(darray+' :p: '+$scope.user.optionProvince)
    GetDistrictById(darray,function(data){
      $scope.DistrictlistTransport = data;
      $scope.$apply();
    });
  }
  $scope.getdistricttranspot($scope.user.optionProvince);
  ///////// check null ///////////////
  $scope.chknull = function(idval,txtname){
    if(idval == 1){
      if(txtname){
        $scope.chk.infomattxtConName = true;
      }else{
        $scope.chk.infomattxtConName = false;
      }
    }else if(idval == 2){
      if(txtname){
        $scope.chk.infomattxtAddressProduct = true;
      }else{
        $scope.chk.infomattxtAddressProduct = false;
      }
    }else if(idval == 3){
      if(txtname){
        $scope.chk.infomattxtPostCode = true;
      }else{
        $scope.chk.infomattxtPostCode = false;
      }
    }
  }


  $scope.insertaccount = function(){
      if($scope.user.txtConName){
        $scope.chk.infomattxtConName = true;
      }else{
        $scope.chk.infomattxtConName = false;
      }
      if($scope.user.txtAddressProduct){
        $scope.chk.infomattxtAddressProduct = true;
      }else{
        $scope.chk.infomattxtAddressProduct = false;
      }
      if($scope.user.optionProvince){
        $scope.chk.infomatoptionProvince = true;
      }else{
        $scope.chk.infomatoptionProvince = false;
      }
      if($scope.user.optionDistrict){
        $scope.chk.infomatoptionDistrict = true;
      }else{
        $scope.chk.infomatoptionDistrict = false;
      }
      if($scope.user.txtPostCode){
        $scope.chk.infomattxtPostCode = true;
      }else{
        $scope.chk.infomattxtPostCode = false;
      }

      if($scope.chk.infomattxtConName == true &&
        $scope.chk.infomattxtAddressProduct == true &&
        $scope.chk.infomatoptionProvince == true &&
        $scope.chk.infomatoptionDistrict == true &&
        $scope.chk.infomattxtPostCode == true){
          try{
    				var ins = new MobileCRM.DynamicEntity("account",Data.dataguid);
    						ins.properties.address1_addresstypecode = parseInt(1);//invoice
    						ins.properties.address1_name = $scope.user.txtConName;
    		  			ins.properties.address1_line1 = $scope.user.txtAddressProduct;
    		  			ins.properties.ivz_addressprovince = new MobileCRM.Reference('ivz_addressprovince',$scope.user.optionProvince);
    		  			ins.properties.ivz_addressdistrict = new MobileCRM.Reference('ivz_addressdistrict',$scope.user.optionDistrict);
    		  			ins.properties.address1_postalcode = $scope.user.txtPostCode;
    						ins.save(function(er){
    							if(er){
    								alert('error ac 512 '+er);
    							}
    						});
    			}catch(er){
    				alert("error516 "+er);
    			}
          console.log('Update DB');
          $scope.loadpage();
      }
      //comment
      //$scope.loadpage();
  }
  $scope.loadpage = function(){
    setTimeout(function(){
      $ionicLoading.hide();
      window.location.href="#/app/addressother/"+$stateParams.getguid;
    },600);
   $scope.showLoadingProperTimes();
  }
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})

.controller('AccountAddressOtherCtrl',function($scope, $stateParams,$cookies,Data,$ionicHistory,$ionicLoading){
  $scope.Data = Data;
  //Data.dataguid = $stateParams.getguid;

  $scope.loadpage = function(){
    setTimeout(function(){
      $ionicLoading.hide();
      window.location.href="#/app/infotransport/"+$stateParams.getguid;
    },600);
   $scope.showLoadingProperTimes();
  }
  ////////// Get Province
   GetProvinceList(function(data){
     $scope.ProvinceDataList = data;
     $scope.$apply();
   });
  ////////// Get districtid
  $scope.getdistricttranspot = function(darray){
    GetDistrictById(darray,function(data){
      $scope.DistrictlistTransport = data;
      $scope.$apply();
    });
  }

  $scope.user = {
    txtConName:'',
    txtAddressProduct:'',
    optionProvince:'',
    optionDistrict:'',
    txtPostCode:''
  };

  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
  $scope.insertaccount = function(){
    if($scope.user.txtConName){
      try{
				var ins = new MobileCRM.DynamicEntity("account",Data.dataguid);
						ins.properties.ivz_address3_name = $scope.user.txtConName;
						ins.properties.ivz_docaddress = $scope.user.txtAddressProduct;
						ins.properties.ivz_docprovinceid = new MobileCRM.Reference('ivz_addressprovince',$scope.user.optionProvince);
						ins.properties.ivz_docdistrict = new MobileCRM.Reference('ivz_addressdistrict',$scope.user.optionDistrict);
						ins.properties.ivz_doczipcode = $scope.user.txtPostCode;
						ins.save(function(er){
							if(er){
								alert('error ac 548 '+er);
							}
						});
			}catch(er){
				alert("error552 "+er);
			}
      console.log('update other address');
    }else{
      console.log('Not Update');
    }
    $scope.loadpage();
  }
})


.controller('AccountTransportCtrl',function($scope, $stateParams,$cookies,Data,$ionicHistory){
  $scope.Data = Data;
  //Data.dataguid = $stateParams.getguid;
  $scope.user = {
    txtTransport:'รถ YSS',
    telTransport:'08XXXXXXX',
    billvat:false,
    txtRemarkTransport:''
  };
  $scope.chk = {
    infomattxtTransport:true,
    infomattelTransport:true
  };
  $scope.chknull = function(idval,txtname){
    if(idval == 1){
      if(txtname){
        $scope.chk.infomattxtTransport = true;
      }else{
        $scope.chk.infomattxtTransport = false;
      }
    }else if(idval == 2){
      if(txtname){
        $scope.chk.infomattelTransport = true;
      }else{
        $scope.chk.infomattelTransport = false;
      }
    }
  }
  $scope.insertaccount = function(){
    if($scope.chk.infomattxtTransport == true && $scope.chk.infomattelTransport == true){
      try{
				var ins = new MobileCRM.DynamicEntity("account",Data.dataguid);
						ins.properties.ivz_transport = $scope.user.txtTransport;
						ins.properties.ivz_transporttel = $scope.user.telTransport;
						ins.properties.ivz_remarktransporter = $scope.user.txtRemarkTransport;
						ins.properties.ivz_printbillvat = converttrue($scope.user.billvat);
						ins.save(function(er){
							if(er){
								alert('error ac 613 '+er);
							}else{
                window.location.href="#/app/document/"+$stateParams.getguid;
              }
						});
			}catch(er){
				alert("error617 "+er);
			}
      console.log('Insert DB');
    }else{
      console.log('Not Insert');
    }
  }
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})


.controller('AccountDocumentCtrl',function($scope, $stateParams,$cookies,Data,$ionicHistory,$ionicLoading,actype){
  $scope.Data = Data;
  //Data.dataguid = $stateParams.getguid;
  $scope.user = {
    peoplela1:false,
    peoplela2:false,
    statustype:'',
    bs1:'',
    bs2:'',
    bs3:'',
    bs4:'',
    bs5:''
  };
  $scope.chk = {
    docStatus:true,
    doc001:true,
    doc004:true,
    doc005:true
  };


  $scope.loadpage = function(){
    setTimeout(function(){
      $ionicLoading.hide();
    },600);
   $scope.showLoadingProperTimesInsert();
  }
  $scope.chkswitch = function(idval,swtrue){
    $scope.chk.docStatus = true;
    if($scope.user.statustype){
      if($scope.user.statustype == 1){
        $scope.user.peoplela2 = true;
        //$scope.chk.doc001 = true;
        $scope.user.peoplela1 = false;
      }else if($scope.user.statustype == 2){
        $scope.user.peoplela2 = false;
        //$scope.chk.doc001 = false;
        $scope.user.peoplela1 = true;
      }
    }
    ///////////////////////////////////
    if(idval == 1){
        if(swtrue == true){
          $scope.user.statustype = 2;
        }else{
          $scope.user.statustype = 1;
        }
    }else if(idval == 2){
      if(swtrue == true){
        $scope.user.statustype = 1;
      }else{
        $scope.user.statustype = 2;
      }
    }
  }
  $('#doc001').change(function() {
    GetAtt('#doc001','#idcImg01','canvas01',function(data){
      $ionicLoading.hide();
      $scope.chk.doc001 = true;
      $scope.user.bs1 = data;
      //console.log(data.length);
    });
  });
  $('#doc002').change(function() {
    GetAtt('#doc002','#idcImg02','canvas02',function(data){
      $ionicLoading.hide();
      $scope.chk.doc001 = true;
      $scope.user.bs2 = data;
      console.log(data.length);
    });
  });
  $('#doc003').change(function() {
    GetAtt('#doc003','#idcImg03','canvas03',function(data){
      $ionicLoading.hide();
      $scope.chk.doc001 = true;
      $scope.user.bs3 = data;
    });
  });
  $('#doc004').change(function() {
    GetAtt('#doc004','#idcImg04','canvas04',function(data){
      $ionicLoading.hide();
      $scope.chk.doc004 = true;
      $scope.user.bs4 = data;
    });
  });
  $('#doc005').change(function() {
    GetAtt('#doc005','#idcImg05','canvas05',function(data){
      $ionicLoading.hide();
      $scope.chk.doc005 = true;
      $scope.user.bs5 = data;
    });
  });
  $scope.insertaccount = function(){
    var a = $scope.user.bs1;
    var b = $scope.user.bs2;
    var c = $scope.user.bs3;
    var d = $scope.user.bs4;
    var e = $scope.user.bs5;
    if($scope.user.statustype){
      $scope.chk.docStatus = true;
      if($scope.user.statustype == 2){
        if(a.length >= 1 || b.length >= 1 || c.length >= 1){
          $scope.chk.doc001 = true;
        }else{
          $scope.chk.doc001 = false;
        }
        if(d.length >= 1){
          $scope.chk.doc004 = true;
        }else{
          $scope.chk.doc004 = false;
        }
        if(e.length >= 1){
          $scope.chk.doc005 = true;
        }else{
          $scope.chk.doc005 = false;
        }
        if($scope.chk.doc001 == true && $scope.chk.doc004 == true && $scope.chk.doc005 == true){
          actype.actype = 2;
          /// insert a
          if(a.length >= 1){
            setTimeout(function(){
              $scope.InAnnoteAttract('account',Data.dataguid,$scope.user.bs1,'สำเนาหนังสือรับรองการจดทะเบียนพาณิชย์ร้านของร้าน'+ Data.businessname+' ',function(ert){
              if(ert){
                //alert(ert);
              }
            });
              console.log('insert a');
            },10000);
          }
          /// insert b
          if(b.length >= 1){
            setTimeout(function(){
              $scope.InAnnoteAttract('account',Data.dataguid,$scope.user.bs2,'ทะเบียนภาษีมูลค่าเพิ่ม( ภพ. 20)ของร้าน'+ Data.businessname+' ',function(ert){
              if(ert){
                //alert(ert);
              }
            });
              console.log('insert b');
            },15000);
          }
          /// insert c
          if(c.length >= 1){
            setTimeout(function(){
              $scope.InAnnoteAttract('account',Data.dataguid,$scope.user.bs3,'หนังสือรับรองบริษัทของร้าน'+ Data.businessname+' ',function(ert){
              if(ert){
                //alert(ert);
              }
            });
              console.log('insert c');
            },20000);
          }
          /// insert d
          if(d.length >= 1){
            $scope.InAnnoteAttract('account',Data.dataguid,$scope.user.bs4,'สำเนาทะเบียนบ้านของร้าน'+ Data.businessname+' ',function(ert){
            if(ert){
              //alert(ert);
            }
          });
            console.log('insert d');
          }
          /// insert e
          if(e.length >= 1){
            setTimeout(function(){
              $scope.InAnnoteAttract('account',Data.dataguid,$scope.user.bs5,'สำเนาประจำตัวบัตรประชาชนของร้าน'+ Data.businessname+' ',function(ert){
              if(ert){
                //alert(ert);
              }
            });
              console.log('insert e');
            },6000);
          }
          setTimeout(function(){
            $ionicLoading.hide();
            window.location.href="#/app/accountcredit/"+$stateParams.getguid;
            try{
    					var ins = new MobileCRM.DynamicEntity("account",Data.dataguid);
    							ins.properties.ivz_statustype = parseInt(2);
                  if(a.length > 1){
                    ins.properties.ivz_doc01 = parseInt(1);
                  }else{
                    ins.properties.ivz_doc01 = parseInt(0);
                  }
                  if(b.length > 1){
                    ins.properties.ivz_doc02 = parseInt(1);
                  }else{
                    ins.properties.ivz_doc02 = parseInt(0);
                  }
                  if(c.length > 1){
                    ins.properties.ivz_doc03 = parseInt(1);
                  }else{
                    ins.properties.ivz_doc03 = parseInt(0);
                  }
                  if(d.length > 1){
                    ins.properties.ivz_dochouseholdregis = parseInt(1);
                  }else{
                    ins.properties.ivz_dochouseholdregis = parseInt(0);
                  }
                  if(e.length > 1){
                    ins.properties.ivz_docidcard = parseInt(1);
                  }else{
                    ins.properties.ivz_docidcard = parseInt(0);
                  }
    							ins.save(function(er){
    								if(er){
    									alert('error ac 664 '+er);
    								}
    							});
    				}catch(er){
    					alert("error668"+er);
    				}
            console.log('update people 2');
          },25000);

        }else{
          console.log('not update');
        }
      }else if($scope.user.statustype == 1){
        actype.actype = 1;
        if(d.length >= 1){
          $scope.chk.doc004 = true;
        }else{
          $scope.chk.doc004 = false;
        }
        if(e.length >= 1){
          $scope.chk.doc005 = true;
        }else{
          $scope.chk.doc005 = false;
        }
        if($scope.chk.doc004 == true && $scope.chk.doc005 == true){
          $scope.showLoadingProperTimesReg();
          /// insert d
          if(d.length >= 1){
            $scope.InAnnoteAttract('account',Data.dataguid,$scope.user.bs4,'สำเนาทะเบียนบ้านของร้าน'+ Data.businessname+' ',function(ert){
            if(ert){
              //alert(ert);
            }
          });
            console.log('insert d');
          }
          /// insert e
          if(e.length >= 1){
            setTimeout(function(){
              $scope.InAnnoteAttract('account',Data.dataguid,$scope.user.bs5,'สำเนาประจำตัวบัตรประชาชนร้าน'+ Data.businessname+' ',function(ert){
              if(ert){
              //  alert(ert);
              }
            });
              console.log('insert e');
            },6000);
          }
          setTimeout(function(){
            $ionicLoading.hide();
            try{
    					var ins = new MobileCRM.DynamicEntity("account",Data.dataguid);
    							ins.properties.ivz_statustype = parseInt(1);
                  ins.properties.ivz_doc01 = parseInt(0);
                  ins.properties.ivz_doc02 = parseInt(0);
                  ins.properties.ivz_doc03 = parseInt(0);
                  if(d.length > 1){
                    ins.properties.ivz_dochouseholdregis = parseInt(1);
                  }else{
                    ins.properties.ivz_dochouseholdregis = parseInt(0);
                  }
                  if(e.length > 1){
                    ins.properties.ivz_docidcard = parseInt(1);
                  }else{
                    ins.properties.ivz_docidcard = parseInt(0);
                  }
    							ins.save(function(er){
    								if(er){
    									alert('error ac 664 '+er);
    								}
    							});
    				}catch(er){
    					alert("error668"+er);
    				}
            window.location.href="#/app/accountcredit/"+$stateParams.getguid;
            console.log('update people 1');
          },10000);
        }else{
          console.log('not update');
        }
      }
    }else{
      $scope.chk.docStatus = false;
    }
    // console.log('Status type:'+$scope.user.statustype);
  }
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})



.controller('AccountCreditCtrl',function($scope, $stateParams,$cookies,Data,$compile,actype,$ionicHistory,$ionicLoading){
  $scope.Data = Data;
  //Data.mastertype = $stateParams.getguid;
  GetPayMentTerm(function(data){
    $scope.PaymentTermOptions = data;
  });
  GetPayMentOption(function(data){
    $scope.PaymentOptions = data;
  });
  GetBankName(function(data){
      $scope.bankname = data;
  });
  GetBankNameYss(function(data){
    $scope.banknameyss = data;
  });
  $scope.user = {
    optionPayment:'',//Set SD-
    txtCreditlimit:0,
    optionPaymentType:'',
    optionPaymentBank:'',
    txtBankBranch:'',
    optionPaymentbnkYss:917970001//yss bank กสิกร ออมทรัพย์
  };
  $scope.chk = {
    optionPayment:true,
    txtCreditlimit:true,
    optionPaymentType:true,
    optionPaymentbnkYss:true,
    diabledcredit:false
  };
  if(actype.actype == 1){
    $scope.user.optionPayment = 100000011;//Set SD-cash
    $scope.user.optionPaymentType = 917970002;
    $scope.chk.diabledcredit = true;
  }else if(actype.actype == 2){
    $scope.user.optionPayment = 100000014;//Set SD-30 โอน
    $scope.user.optionPaymentType = 917970000;
    $scope.chk.diabledcredit = false;
  }
  $scope.chknull = function(txtname){
    if(txtname > 1){
      $scope.chk.txtCreditlimit = true;
    }else{
      $scope.chk.txtCreditlimit = false;
    }
  }
  $scope.insertaccount = function(){
    //window.location.href="#/app/infomart/"+$stateParams.getguid;
    if(actype.actype == 1){
      try{
  			var ins = new MobileCRM.DynamicEntity("account",Data.dataguid);
  					ins.properties.paymenttermscode = parseInt($scope.user.optionPayment);
  					ins.properties.creditlimit = $scope.user.txtCreditlimit;
  					ins.properties.ivz_paymentoption = parseInt($scope.user.optionPaymentType);
  					ins.properties.ivz_banknamecustomer = parseInt($scope.user.optionPaymentBank);
  					ins.properties.ivz_bankaccountnumber = $scope.user.txtBankBranch;
  					ins.properties.ivz_bankname = $scope.user.optionPaymentbnkYss;
  					ins.save(function(er){
  						if(er){
  							alert('error ac 804 '+er);
  						}
  					});
  		}catch(er){
  			alert("error809"+er);
  		}
      console.log('insert credit 1');
      window.location.href="#/app/infomart/"+$stateParams.getguid;
    }else if(actype.actype == 2){
      var j = parseInt($scope.user.txtCreditlimit);
      if(j > 0){
        try{
    			var ins = new MobileCRM.DynamicEntity("account",Data.dataguid);
    					ins.properties.paymenttermscode = parseInt($scope.user.optionPayment);
    					ins.properties.creditlimit = $scope.user.txtCreditlimit;
    					ins.properties.ivz_paymentoption = parseInt($scope.user.optionPaymentType);
    					ins.properties.ivz_banknamecustomer = parseInt($scope.user.optionPaymentBank);
    					ins.properties.ivz_bankaccountnumber = $scope.user.txtBankBranch;
    					ins.properties.ivz_bankname = $scope.user.optionPaymentbnkYss;
    					ins.save(function(er){
    						if(er){
    							alert('error ac 804 '+er);
    						}
    					});
    		}catch(er){
    			alert("error809"+er);
    		}
        console.log('insert credit 2');
        $scope.chk.txtCreditlimit = true;
        window.location.href="#/app/infomart/"+$stateParams.getguid;
      }else{
        $scope.chk.txtCreditlimit = false;
      }
    }
  }
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})
/*------------------------------- info mar----------------------------*/
.controller('AccountInfoMartCtrl',function($scope, $stateParams,$cookies,Data,$compile,$ionicHistory,$ionicLoading){
  $scope.Data = Data;
  //Data.mastertype = $stateParams.getguid;
  $scope.user = {
    SalePart1:false,
    SalePart2:false,
    SalePart3:false,
    //////////////////////////////
    SalePart4:false,
    SalePart5:false,
    SalePart6:false,
    doc:[],
    PlaceStatus1:'',
    PlaceStatus2:'',
    tatofactory:'',
    tatolnumber:''
  };
  $scope.chk = {
    SalesPart1:true,
    SalesPart2:true,
    doc006:true,
    PlaceStatus:true,
    tatofactory:true,
    tatolnumber:true
  };
  $scope.removeimg = function(id){
    console.log(id);
    $('.divimg').remove();
    //console.log("Click remove "+id);
    var data = $scope.user.doc;
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
			// 	console.log(data.length);
			   $scope.user.doc.push(data);
  				var datapush = $scope.user.doc;
          //console.log(datapush.length);
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

  $scope.chknull = function(idval,txtnull){
    console.log(txtnull);
    if(idval == 1){
      if(txtnull){
        $scope.chk.tatofactory = true;
      }else{
        $scope.chk.tatofactory = false;
      }
    }else if(idval == 2){
      if(txtnull){
        $scope.chk.tatolnumber = true;
      }else{
        $scope.chk.tatolnumber = false;
      }
    }
  }
  $scope.insertaccount = function(){
    if($scope.user.SalePart1 == true || $scope.user.SalePart2 == true || $scope.user.SalePart3 == true ){
        $scope.chk.SalesPart1 = true;
    }else{
        $scope.chk.SalesPart1 = false;
    }
    if($scope.user.SalePart4 == true || $scope.user.SalePart5 == true || $scope.user.SalePart6 == true ){
        $scope.chk.SalesPart2 = true;
    }else{
        $scope.chk.SalesPart2 = false;
    }
    var j = $scope.user.doc;
    if(j.length > 0){
      $scope.chk.doc006 = true;
    }else{
      $scope.chk.doc006 = false;
    }
    if($scope.user.PlaceStatus1 == true || $scope.user.PlaceStatus2 == true){
      $scope.chk.PlaceStatus = true;
    }else{
      $scope.chk.PlaceStatus = false;
    }
    var a = $scope.user.tatofactory;
    var b = $scope.user.tatolnumber;
    if(a){
      $scope.chk.tatofactory = true;
    }else{
      $scope.chk.tatofactory = false;
    }
    if(b){
      $scope.chk.tatolnumber = true;
    }else{
      $scope.chk.tatolnumber = false;
    }

    if($scope.chk.SalesPart1 == true &&
        $scope.chk.SalesPart2 == true &&
        $scope.chk.doc006 == true &&
        $scope.chk.PlaceStatus == true &&
        $scope.chk.tatofactory == true &&
        $scope.chk.tatolnumber == true){
          try{
    				var ins = new MobileCRM.DynamicEntity("account",Data.dataguid);
    						ins.properties.ivz_locationlease = converttrue($scope.user.PlaceStatus1);
    						ins.properties.ivz_locationbuy = converttrue($scope.user.PlaceStatus2);
    						ins.properties.ivz_typemoto = converttrue($scope.user.SalePart1);
    						ins.properties.ivz_typeauto = converttrue($scope.user.SalePart2);
    						ins.properties.ivz_typebigbike = converttrue($scope.user.SalePart3);
    						ins.properties.ivz_typeshoporiginal = converttrue($scope.user.SalePart4);
    						ins.properties.ivz_typeshopaccessories = converttrue($scope.user.SalePart5);
    						ins.properties.ivz_typeinstallservice = converttrue($scope.user.SalePart6);
    						ins.properties.ivz_numberofplace = $scope.user.tatofactory;
    		  			ins.properties.ivz_numberofemployee = $scope.user.tatolnumber;
    						ins.save(function(er){
    							if(er){
    								alert('error ac 966 '+er);
    							}
    						});
    			}catch(er){
    				alert("error970"+er);
    			}
          setTimeout(function(){
            $.each($scope.user.doc,function(i,data){
              alert(i);
              $scope.InAnnoteAttract('account',Data.dataguid,data,'ข้อมูลเกี่ยวกับร้าน'+Data.businessname+' รูปที่ '+i+' ',function(er){
                  if(er){

                  }
                });
            });
          },3000);
          var datapush = $scope.user.doc;
          var l = parseInt(datapush.length)+999;
          setTimeout(function(){
            window.location.href="#/app/contactus/"+$stateParams.getguid;
          },l);
          console.log('insert DB mart info');
          //window.location.href="#/app/contactus/"+$stateParams.getguid;
    }else{
      console.log('Not Update');
    }

    //window.location.href="#/app/accountcredit/"+Data.dataguid;
  }
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})
.controller('AccountContactUsCtrl',function($scope, $stateParams,$cookies,Data,arcontact,$compile,$ionicHistory,$ionicLoading){
  $scope.Data = Data;
  //Data.mastertype = $stateParams.getguid;
  console.log('load :'+$stateParams.getguid);
  $scope.getguid = $stateParams.getguid;
  $scope.user = {
    doc:[]
  };
  $scope.chk = {
    othercontact:true
  }
  $scope.listcontact = arcontact.contact;
  $scope.removecontact = function(index){
    $scope.listcontact.splice(index,1);
  }
  $scope.insertaccount = function(){
    var j = $scope.listcontact;
    if(j.length > 0){
      $scope.chk.othercontact = true;
      console.log('insert contact');
      window.location.href = "#/app/companyus/"+$stateParams.getguid;
    }else{
      $scope.chk.othercontact = false;
      console.log('Not insert');
    }
  }
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})
.controller('AccountContactUsAddCtrl',function($scope, $stateParams,$cookies,Data,arcontact,$compile,$ionicHistory,$ionicLoading){
  $scope.Data = Data;
  //Data.mastertype = $stateParams.getguid;
  $scope.getguid = $stateParams.getguid;
  $scope.user = {
    firstname:'',
    lastname:'',
    tel:'',
    type:'',
    contact:[],
    doc:[]
  };
  var j = ['Sale','Boss','Marketting','Delivery','Assi.','F','G','H','I','J','K','L','M','N',
          'O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  $scope.contacttype = [];
  for(var i = 0;i <= 5;i++){
    $scope.contacttype.push({
      val:i,
      name:j[i],
    });
  }

  $('#doc081').change(function() {
    GetAtt('#doc081','#idcImg081','canvas081',function(data){
      $scope.user.doc.push({name:$scope.user.firstname+' '+$scope.user.lastname,doc64:data});
      $ionicLoading.hide();
    });
  });
  $scope.listcontact = $scope.user.contact;
  $scope.addcontact = function(){
    var j = $scope.user.contact;
    arcontact.contact.push({
      id:j.length + 1,
      firstname:$scope.user.firstname,
      lastname:$scope.user.lastname,
      tel:$scope.user.tel,
      contacttype:$scope.user.type
    });
    this.goback2();
  }
  $scope.insertaccount = function(){

  }
  $scope.goback2 = function(){
    $scope.user.firstname = '';
    $scope.user.lastname = '';
    $scope.user.tel = '';
    $scope.user.type = '';
    $('#idcImg081').attr('src','');
    var h = $scope.user.doc;
    console.log(h.length);
    var g = $scope.user.contact;
    for(var i in g){
      console.log(g[i].type.val);
    }
    $scope.listcontact = $scope.user.contact;
    window.location.href="#/app/contactus/"+$stateParams.getguid;
  }
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})
.controller('AccountCompanyCtrl',function($scope, $stateParams,$cookies,Data,$compile,$ionicHistory,$ionicLoading,arcontact){
  $scope.Data = Data;
  $scope.getguid = $stateParams.getguid;
  $scope.chk = {
    othercontact:true
  }
  $scope.listcompany = arcontact.company;
  $scope.removecontact = function(index){
    $scope.listcompany.splice(index,1);
  }
  $scope.insertcompany = function(){
    var j = $scope.listcompany;
    if(j.length > 0){
      console.log('insert DB');
      var l = parseInt(j.length+999);
      setTimeout(function(){
        window.location.href="#/app/confirmreg/"+$stateParams.getguid;
      },l);
    }else{
      console.log('not update');
      window.location.href="#/app/confirmreg/"+$stateParams.getguid;
    }
  }
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})
.controller('AccountCompanyAddCtrl',function($scope, $stateParams,$cookies,Data,$compile,$ionicHistory,$ionicLoading,arcontact){
  $scope.Data = Data;
  $scope.getguid = $stateParams.getguid;
  $scope.user = {
    companyname:'',
    firstlastname:'',
    orderper:'',
    tel:'',
    itemtype:''
  };
  $scope.addcompany = function(){
    arcontact.company.push({
      companyname:$scope.user.companyname,
      firstlastname:$scope.user.firstlastname,
      orderper:$scope.user.orderper,
      tel:$scope.user.tel,
      itemtype:$scope.user.itemtype
    });
    this.goback();
  }
  $scope.goback = function(){
    $scope.user.companyname = '';
    $scope.user.firstlastname = '';
    $scope.user.orderper = '';
    $scope.user.tel = '';
    $scope.user.itemtype = '';
    window.location.href="#/app/companyus/"+$stateParams.getguid;
  };
})
.controller('AccountConfirmCtrl',function($scope, $stateParams,$cookies,Data,$compile,$ionicHistory,$ionicLoading,$ionicViewService){
  $scope.Data = Data;
  $scope.getguid = $stateParams.getguid;

  $scope.chk ={
    infomat:''
  };
  var tol = [10,20,30,40,50,60,70,80,90,100,110,120,130];
  var i = 0;
  var id = setInterval(function(){
    $scope.showLoadingProperTimesRegter();
    $scope.chk.infomat = parseInt(tol[i++]);
    console.log(tol[i++]);
    if(tol[i++] >= 100){
      console.log('Break');
      clearInterval(id);
      $ionicLoading.hide();
    }
  },4000);
  $scope.confirmnew = function(){
    console.log('update guid sendmail'+ $scope.chk.infomat);
    window.location.href="#/app/accountlist/0/"+Data.mastertype;
    //$ionicHistory.goBack(-9);
  }
  $scope.goback = function(){
    $ionicHistory.goBack(-1);
  }
})
////////////////////// end /////////////////


/////////////////// Account List //////////////
.controller('AccountListCtrl',function($scope, $stateParams,$cookies,Data,$ionicLoading,$ionicHistory){
  $scope.Data = Data;
  $ionicHistory.clearHistory();
  $ionicHistory.removeBackView();
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
////////////////////// Order ///////////////
.controller('OrderCtrl',function($scope, $stateParams,$cookies,Data){
  $scope.Data = Data;
  Data.mastertype = $stateParams.mastertype;
})
//////////////////////// End ////////////////////
;
