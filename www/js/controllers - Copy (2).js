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
