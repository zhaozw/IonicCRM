$scope.showLoadingProperTimesReg = function() {
       $ionicLoading.show({
           template:   '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner><div class="row">'+
                       '<div class="col"><h4>กรุณารอสักครู่กำลังบันทึกข้อมูลเอกสารอาจใช้เวลา 1-2 นาทีในการบันทึก</h4></div>'+
                       '</div>',
           noBackdrop: true
       });
   };
   $scope.showLoadingProperTimesRegter = function(txt) {
                $ionicLoading.show({
                    template:   '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner><div class="row">'+
                                '<div class="col"><h4>กรุณารอสักครู่ '+ txt +'</h4></div>'+
                                '</div>',
                    noBackdrop: true
                });
            };
$scope.showLoadGPS = function() {
                $ionicLoading.show({
                    template:   '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner><div class="row">'+
                                '<div class="col"><h4>โปรดรอสักครู่ กำลังโหลดข้อมูล GPS อยู่</h4></div>'+
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
$scope.showLoadingComplete = function(txt) {
         $ionicLoading.show({
         template:   '<ion-spinner icon="bubbles" class="success text-l ion-checkmark-circled"></ion-spinner><div class="row">'+
                     '<div class="col"><h4>'+txt+'</h4></div>'+
                     '</div>',
         noBackdrop: true
       });
 };
 $scope.showLoading = function(txt) {
          $ionicLoading.show({
          template:   '<ion-spinner icon="bubbles" class="success text-l ion-checkmark-circled"></ion-spinner><div class="row">'+
                      '<div class="col"><h4>'+txt+'</h4></div>'+
                      '</div>',
          noBackdrop: true
        });
  };

 $scope.InAnnoteAttract = function(table,id,base64String,title,objid,callback)
 var text = "เรียน  Sup./Sales Manger, รบกวนดำเนินการอนุมัติ" + title+"เขตการขาย " + data[0].name+txt + "ให้ด้วยครับ  ขอบคุณครับ  (อีเมลฉบับนี้ส่งอัตโนมัติจากระบบ CRM)";
 if($scope.$phase){$scope.$apply();}

 {
   $state.go('app.playlists',{},{reload:true});//go to home
 }

 if($scope.item.matchitem === 0 || $scope.item.matchitem === '0'){
   alert('กรุณาระบุจำนวนที่ต้องการด้วย');
 }else{
       var minu = 0;
             if (DataOrder.order.length > 0) {
                 for (var i in DataOrder.order) {
                     if (DataOrder.order[i].productid == $scope.item.productid) {
                         console.log('break ' + i);
                         minu = parseInt(DataOrder.order[i].tatol) + parseInt($scope.item.tatol);
                         DataOrder.order[i].tatol = parseInt(DataOrder.order[i].tatol) + parseInt($scope.item.tatol);
                         DataOrder.order[i].quality = parseInt(DataOrder.order[i].quality) + parseInt($scope.item.matchitem);
                         break;
                     }
                 }
                 if (!minu) {
                     DataOrder.order.push({
                         getguid: $stateParams.getguid,
                         accountid: $stateParams.accountid,
                         ordertype: $stateParams.ordertype,
                         productid: $scope.item.productid,
                         productname: $scope.item.productname,
                         priceperunit: $scope.item.priceperunit,
                         pricelevelid: $scope.item.pricelevel,
                         uomid: $scope.item.uomid,
                         tatol: $scope.item.tatol,
                         quality: $scope.item.matchitem,
                         addressid:$stateParams.addressid
                     });
                 }
             } else {
                 DataOrder.order.push({
                     getguid: $stateParams.getguid,
                     accountid: $stateParams.accountid,
                     ordertype: $stateParams.ordertype,
                     productid: $scope.item.productid,
                     productname: $scope.item.productname,
                     priceperunit: $scope.item.priceperunit,
                     pricelevelid: $scope.item.pricelevel,
                     uomid: $scope.item.uomid,
                     tatol: $scope.item.tatol,
                     quality: $scope.item.matchitem,
                     addressid:$stateParams.addressid
                 });
             }
             setTimeout(function () {
                 Data.tatolmatch = parseInt(Data.tatolmatch) + parseInt($scope.item.tatol);
                 $scope.modal1.hide();
             }, 1000);
 }
