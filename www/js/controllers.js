angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('PlanCtrl',function($scope, $stateParams){
  $scope.todos = [
    {
      id:123020,
      who: 'Ake Rabi',
      territory: "D10"
    },
    {
      id:123021,
      who: 'Pin Pung',
      territory: "D20"
    },
    {
      id:1230130,
      who: 'Errwe Query',
      territory: "D30"
    },
    {
      id:1152020,
      who: 'John Yunglai',
      territory: "D09"
    },
    {
      id:1258620,
      who: 'Mar Ma Humsa',
      territory: "D01"
    },
  ];
  $scope.listtype = $stateParams.listtype;

  if($scope.listtype == '1'){
    console.log($scope.listtype+'0');
  }else if($scope.listtype == '2'){
    console.log($scope.listtype+'00');
  }else if($scope.listtype == '3'){
    console.log($scope.listtype+'000');
  }

  $scope.accountid = $stateParams.accountid;
  $scope.accountname = $stateParams.accountname;
  if($scope.accountid){
    $scope.txtcustomer =  $scope.accountname;
    console.log($scope.accountid);
  }
})
;
