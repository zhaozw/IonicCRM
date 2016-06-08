angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $cookies, Data, $ionicLoading, $state, $ionicHistory, $ionicModal, DataOrder) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;

        var chUser = $cookies.get('name');
        if (chUser) {
            console.log('logon true');
            if ($cookies.get('mastertype') == 3 || $cookies.get('mastertype') == 2) {
                Data.logontype = true;
            } else {
                Data.logontype = false;
            }
            Data.logonstatus = false;
            Data.mastertype = $cookies.get('mastertype'); //set default null
            Data.termas = $cookies.get('territoryid'); //A02
            Data.Tername = $cookies.get('name');
            Data.territoryadjust = $cookies.get('territoryid'); //A02
        } else {
            Data.logonstatus = true;
            console.log('logon false');
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.playlists', {}, {
                reload: true
            });
        }
        $scope.showLoadingProperTimesReg = function (txtname) {
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner><div class="row">' +
                    '<div class="col"><h4>กรุณารอสักครู่กำลังบันทึกข้อมูลเอกสาร ' + txtname + ' อาจใช้เวลา 1-2 นาทีในการบันทึก</h4></div>' +
                    '</div>',
                noBackdrop: true
            });
        };
        $scope.showLoadingProperTimesRegter = function (txt) {
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner><div class="row">' +
                    '<div class="col"><h4>กรุณารอสักครู่ ' + txt + '</h4></div>' +
                    '</div>',
                noBackdrop: true
            });
        };
        $scope.showLoadGPS = function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner><div class="row">' +
                    '<div class="col"><h4>โปรดรอสักครู่ กำลังโหลดข้อมูล GPS อยู่อาจใช้เวลา 1-2 ในการโหลดข้อมูล</h4></div>' +
                    '</div>',
                noBackdrop: true
            });
        };
        $scope.showLoadingProperTimesRegterComplete = function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner><div class="row">' +
                    '<div class="col"><h4>บันทึกข้อมูลเสร็จแล้ว</h4></div>' +
                    '</div>',
                noBackdrop: true
            });
        };
        $scope.showLoadingComplete = function (txt) {
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles"  class="success text-l spinner-energized"></ion-spinner><div class="row">' +
                    '<div class="col"><h4>' + txt + '</h4></div>' +
                    '</div>',
                noBackdrop: true
            });
        };
        $scope.showLoadingProperTimesRegAll = function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles" class="spinner-energized"></ion-spinner><div class="row">' +
                    '<div class="col"><h4>กรุณารอสักครู่กำลังบันทึกข้อมูลอาจใช้เวลา 1-2 นาทีในการบันทึก</h4></div>' +
                    '</div>',
                noBackdrop: true
            });
        };
        $scope.showLoadingProperTimes = function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles" class="success text-l spinner-energized"></ion-spinner>',
                noBackdrop: true
            });
        };
        setTimeout(function () {
            $ionicLoading.hide();
        }, 3000);
        $scope.showLoadingProperTimes();
        GetGPSLocation(function (res) {
            Data.latitude = res.latitude;
            Data.longitude = res.longitude;
        });
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };
        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };
        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            var username = $scope.loginData.username;
            var pwdname = $scope.loginData.password;
            if (!username || !pwdname) {
                alert('กรุณากรอกข้อมูลให้ครบด้วย');
            } else {
                console.log('Doing login', $scope.loginData);
                $cookies.username = username;
                $cookies.pwdname = pwdname;
            }
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
        $scope.setdmaster = function (id) {
            Data.mastertype = id;
        }
        $scope.calldoc = function (cClick, ethis) {
            $('#' + cClick).trigger('click');
        }
        $scope.InAnnoteAttract = function (table, id, base64String, title, objid, callback) {
            $scope.showLoadingProperTimesReg(title);
            try {
                var note = MobileCRM.DynamicEntity.createNew("annotation");
                note.properties.objectid = new MobileCRM.Reference(table, id);
                note.properties.notetext = objid;
                note.properties.subject = title;
                note.properties.documentbody = base64String;
                note.properties.mimetype = fileType;
                note.properties.isdocument = true;
                note.properties.filesize = parseInt(sizeKB);
                note.properties.filename = fileName;
                note.save(
                    function (er) {
                        if (er) {
                            alert(title + '\n' + er);
                            callback('null ' + er);
                        } else {
                            callback('บันทึกไฟล์แนบ' + title);
                        }
                    });
            } catch (er) {
                alert('insert doc ' + title + '\n' + er);
            }
        };

        $scope.clicklnk = function (id) {
            if (id == 1 || id == '1') {
                $state.go('app.openaccount', {
                    territoryid: Data.termas,
                    mastertype: Data.mastertype,
                    getguid: guid(),
                    pricelevel: Data.pricelevel,
                    transactioncurrency: Data.transactioncurrency
                }, {
                    reload: true
                });
            }
        };
        $scope.clicklogout = function () {
            $state.go('app.logout', {}, {
                reload: true
            });
        };
        $scope.clicktaccountlist = function () {
            $state.go('app.accountlist', {
                terriid: Data.termas,
                mastertype: Data.mastertype
            }, {
                reload: true
            });
        };
        $scope.clickter = function () {
            $state.go('app.accountlistsup', {
                terriid: Data.termas,
                mastertype: Data.mastertype
            }, {
                reload: true
            });
        };

        $scope.sendmailtosup = function (id, title, txt, callback) {
            getTerEmp(id, function (data) {
                if (data) {
                    var text = "เรียน  Sup./Sales Manger, รบกวนดำเนินการอนุมัติ" + txt + "เขตการขาย " + data[0].name + "ให้ด้วยครับ  ขอบคุณครับ  (อีเมลฉบับนี้ส่งอัตโนมัติจากระบบ CRM)";
                    SendMail(data[0].ivz_leadermail, title, text);
                    setTimeout(function () {
                        callback();
                    }, 2000);
                }
            });
        }
        $scope.sendmailtosales = function (id, title, txt, callback) {
            getTerEmp(id, function (data) {
                if (data) {
                    var text = "เรียน  พนักงานขายเขต " + data[0].name + ' Sup./Sales Manger,' + txt + "  ขอบคุณครับ  (อีเมลฉบับนี้ส่งอัตโนมัติจากระบบ CRM)";
                    SendMail(data[0].ivz_emailcontact, title, text);
                    setTimeout(function () {
                        callback();
                    }, 2000);
                }
            });
        }
        $scope.confirmrejectadjust = function (id, txt, callback) {
            console.log(id + '::::' + txt);
        }
        $scope.confirmordercart = function () {
            if (DataOrder.order.length > 0) {
                $state.go('app.listorder', {}, {
                    reload: true
                });
            } else {
                alert('ไม่พบรายการเปิดใบสั่งขาย');
            }
        }
        $scope.orderlink = function (expression) {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            switch (expression) {
            case 1:
                var getguid = guid();
                $state.go('app.productlist', {
                    accountid: null,
                    mastertype: Data.mastertype,
                    ordertype: 0,
                    getguid: getguid
                }, {
                    reload: true
                });
                break;
            case 2:
                $state.go('app.orderlistpending', {
                    terid: $cookies.get('territoryid'),
                    mastertype: Data.mastertype,
                    ordertype: 0
                }, {
                    reload: true
                });
                break;
            default:

            }
        }
    })
    /*-------------- เข้าสู่ระบบ -------------------*/
    .controller('PlaylistsCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, datauser, $ionicScrollDelegate) {
        $state.reload();
        Data.showcart = false;
        $ionicHistory.clearHistory();

        $scope.scrolling = 0;
        var a = [];
        var j = 1;
        $scope.logscroll = function () {
            // $scope.scrolling = parseInt($ionicScrollDelegate.getScrollPosition().top);
            // var x = $scope.scrolling;
            // var y =  -100;
            // var z = x - y;
            // if(z  <= 100){
            //   j++;
            //   a.push(j);
            //   console.log('a.length:'+a.length+'::'+(a.length - z)+'::'+ j );
            //   $scope.showLoadingProperTimesRegter(z+'::'+a.length);
            //   console.log(z);
            //   setTimeout(function(){
            //     $ionicLoading.hide();
            //   },2000);
            // }
        }
        $scope.$on("$ionicView.enter", function () {
            console.log('reload complete');
        });
        $scope.clicknext = function () {
            $state.go('app.orderlist', {
                terid: 12345,
                mastertype: 1,
                ordertype: 1
            }, {
                reload: true
            });
        }
        var chUser = $cookies.get('ivz_empid');
        if (chUser) {
            if ($cookies.get('mastertype') == 3 || $cookies.get('mastertype') == 2) {
                Data.logontype = true;
            } else {
                Data.logontype = false;
            }
            Data.logonstatus = false;
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.browse', {}, {
                reload: true
            });
        } else {
            $scope.Data = Data;
            datauser.territoryid = '';
            datauser.ivz_empname = '';
            datauser.ivz_empid = '';
            datauser.ivz_password = '';
            datauser.ivz_emailcontact = '';
            datauser.ivz_leadermail = '';
            datauser.ivz_ccmail = '';
            datauser.name = '';
            datauser.description = '';
            datauser.ivz_statusempid = '';
            $scope.chk = {
                check: true,
                checknull: true
            };
            $scope.user = {
                txtname: '',
                pwdname: ''
            };
            Data.logonstatus = true;
            $scope.checkuser = function (user, pwd) {
                console.log(user + '::' + pwd);
                if (!(user) && !(pwd)) {
                    $scope.chk.checknull = false;
                    $scope.user.txtname = '';
                    $scope.user.pwdname = '';
                    console.log('null');
                } else {
                    $scope.chk.checknull = true;
                    console.log('ok');
                    $scope.showLoadingProperTimesRegter('กำลังตรวจสอบผู้ใช้งานอยู่ .');
                    getUserCheck(user, pwd, function (data) {
                        if (data) {
                            var x = 0;
                            var loopArray = function (arr) {
                                chkuser(x, function () {
                                    x++;
                                    if (x < arr.length) {
                                        loopArray(arr);
                                    } else {
                                        $scope.chk.check = true;
                                        Data.logonstatus = false;
                                        setTimeout(function () {
                                            $ionicLoading.hide();
                                            $scope.user.txtname = '';
                                            $scope.user.pwdname = '';
                                            $ionicHistory.nextViewOptions({
                                                disableBack: true
                                            });
                                            $state.go('app.browse', {}, {
                                                reload: true
                                            });
                                        }, 2000);
                                    }
                                });
                            };
                            loopArray(data);

                            function checkmatch(str) {
                                if (str) {
                                    if (str.match('M')) {
                                        return 3;
                                    } else if (str.match('U')) {
                                        return 2;
                                    } else {
                                        return 1;
                                    }
                                }
                            }

                            function chkuser(i, callback) {
                                $scope.showLoadingProperTimesRegter('กำลังตรวจสอบผู้ใช้งานอยู่ ..');
                                var dType = checkmatch(data[i].ivz_name);
                                Data.mastertype = checkmatch(data[i].ivz_name);
                                if (dType == 3 || dType == 2) {
                                    Data.logontype = true;
                                } else {
                                    Data.logontype = false;
                                }
                                try {
                                    var d = new Date();
                                    var exp = new Date(d.getFullYear(), d.getMonth(), d.getDate()+1);//set 24 hour
                                    $cookies.put('mastertype', dType, {'expires': exp});
                                    Data.Empid = data[i].ivz_empid;
                                    Data.Tername = data[i].ivz_name;
                                    Data.termas = data[i].territoryid;
                                    $cookies.put('territoryid', data[i].territoryid, {'expires': exp});
                                    $cookies.put('ivz_empname', data[i].ivz_empname, {'expires': exp});
                                    $cookies.put('ivz_empid', data[i].ivz_empid, {'expires': exp});
                                    $cookies.put('ivz_password', data[i].ivz_password, {'expires': exp});
                                    $cookies.put('ivz_emailcontact', data[i].ivz_emailcontact, {'expires': exp});
                                    $cookies.put('ivz_leadermail', data[i].ivz_leadermail, {'expires': exp});
                                    $cookies.put('ivz_ccmail', data[i].ivz_ccmail, {'expires': exp});
                                    $cookies.put('name', data[i].ivz_name, {'expires': exp});
                                    $cookies.put('description', data[i].ter_description, {'expires': exp});
                                    $cookies.put('ivz_statusempid', data[i].ivz_statusempid, {'expires': exp});
                                    datauser.territoryid = data[i].territoryid;
                                    datauser.ivz_empname = data[i].ivz_empname;
                                    datauser.ivz_empid = data[i].ivz_empid;
                                    datauser.ivz_password = data[i].ivz_password;
                                    datauser.ivz_emailcontact = data[i].ivz_emailcontact;
                                    datauser.ivz_leadermail = data[i].ivz_leadermail;
                                    datauser.ivz_ccmail = data[i].ivz_ccmail;
                                    datauser.name = data[i].ivz_name;
                                    datauser.description = data[i].ter_description;
                                    datauser.ivz_statusempid = data[i].ivz_statusempid;
                                } catch (er) {
                                    alert('error logon ' + er);
                                }
                                setTimeout(function () {
                                    $ionicLoading.hide();
                                    $scope.showLoadingProperTimesRegter('กำลังตรวจสอบผู้ใช้งานอยู่ ...');
                                    callback();
                                }, 2000);
                            }
                        } else {
                            $scope.chk.check = false;
                        }
                        $scope.$apply();
                    });
                }
            }
        }
    })
    /*--------------------------------------------*/

.controller('ProfileCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, datauser) {
        $scope.Data = Data;
        Data.showcart = false;
        $state.reload();
        Data.showcart = false;
        $ionicHistory.clearHistory();
        $scope.user = {
            territoryid: $cookies.get('territoryid'),
            ivz_empname: $cookies.get('ivz_empname'),
            ivz_empid: $cookies.get('ivz_empid'),
            ivz_password: $cookies.get('ivz_password'),
            ivz_emailcontact: $cookies.get('ivz_emailcontact'),
            ivz_leadermail: $cookies.get('ivz_leadermail'),
            ivz_ccmail: $cookies.get('ivz_ccmail'),
            name: $cookies.get('name'),
            description: $cookies.get('description'),
            ivz_statusempid: $cookies.get('ivz_statusempid')
        };
    })
    .controller('LogoutCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.showLoadingProperTimesRegter('กำลังออกจากระบบ');
        $scope.Data = Data;

        Data.logonstatus = true;
        Data.logontype = true;
        Data.mastertype = '';
        Data.Empid = '';
        Data.Tername = '';
        Data.termas = '';
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $cookies.remove('territoryid');
        $cookies.remove('ivz_empname');
        $cookies.remove('ivz_empid');
        $cookies.remove('ivz_password');
        $cookies.remove('ivz_emailcontact');
        $cookies.remove('ivz_leadermail');
        $cookies.remove('ivz_ccmail');
        $cookies.remove('name');
        $cookies.remove('description');
        $cookies.remove('ivz_statusempid');
        $cookies.remove('mastertype');
        setTimeout(function () {
            $ionicLoading.hide();
            $state.go('app.playlists', {}, {
                reload: true
            });
        }, 3000);
    })
    ////////////// Calendar ///////////////////////////
    .controller('PlanCtrl', function ($scope, $stateParams, $cookies, $location, Data) {
        $scope.Data = Data;
        Data.showcart = false;
        //Data.mastertype = 1; //$stateParams.mastertype;
        Data.sterritory = $stateParams.sterritory;
        Data.nterritory = $stateParams.nterritory;
        Data.dirsale = false;
        if (Data.sterritory == '0' || Data.sterritory == 0) {
            Data.sterritory = '40791CA7-D5E1-E511-80E1-005056A71F87';
        }
        //alert('$stateParams.mastertype:'+$stateParams.mastertype);
        GetGPSLocation(function (res) {
            Data.latitude = res.latitude;
            Data.longitude = res.longitude;
        });
        $scope.dvTodos = true;
        GetAppointStatus(Data.sterritory, 0, Data.mastertype, function (data) {
            if (data) {
                $scope.dvTodos = false;
                $scope.todos = data;
            } else {
                $scope.dvTodos = true;
            }
        });
        $scope.reloaddata = function () {
            GetAppointStatus(Data.sterritory, 0, Data.mastertype, function (data) {
                if (data) {
                    $scope.dvTodos = false;
                    $scope.todos = [];
                    for (var i in data) {
                        $scope.todos.push({
                            activityid: data[i].activityid,
                            ivz_customer: data[i].ivz_customer,
                            ivz_territoryid: data[i].ivz_territoryid,
                            ivz_empid: data[i].ivz_empid,
                            start: data[i].start,
                            end: data[i].end,
                            ivz_saleprospect: data[i].ivz_saleprospect,
                            title: data[i].title,
                            ivz_visit: data[i].ivz_visit,
                            ivz_visitbilling: data[i].ivz_visitbilling,
                            ivz_visitclaimorder: data[i].ivz_visitclaimorder,
                            ivz_visitcollection: data[i].ivz_visitcollection,
                            ivz_visitopenaccount: data[i].ivz_visitopenaccount,
                            ivz_visitorder: data[i].ivz_visitorder,
                            ivz_visitadjustment: data[i].ivz_visitadjustment,
                            ivz_visitcompetitors: data[i].ivz_visitcompetitors,
                            ivz_visitmarket: data[i].ivz_visitmarket,
                            ivz_visitpostpect: data[i].ivz_visitpostpect,
                            ivz_visitproductrecall: data[i].ivz_visitproductrecall,
                            ivz_visitactivities: data[i].ivz_visitactivities,
                            ivz_visitsuggest: data[i].ivz_visitsuggest,
                            ivz_employeeposition: data[i].ivz_employeeposition,
                            ivz_addressprovince: data[i].ivz_addressprovince,
                            ivz_addressdistrict: data[i].ivz_addressdistrict,
                            territoryid: data[i].territoryid,
                            accountnumber: data[i].accountnumber,
                            ivz_planningstatus: data[i].ivz_planningstatus,
                            ivz_emailcontact: data[i].ivz_emailcontact,
                            ivz_leadermail: data[i].ivz_leadermail,
                            ivz_ccmail: data[i].ivz_ccmail,
                            ivz_balancecredit: data[i].ivz_balancecredit,
                            filtername: data[i].filtername,
                            mailtomail: data[i].mailtomail,
                            ivz_scheduledstarttime: data[i].ivz_scheduledstarttime,
                            ivz_scheduledendtime: data[i].ivz_scheduledendtime
                        });
                    }
                } else {
                    $scope.dvTodos = true;
                }
                $scope.$apply();
            });
        }
        $scope.removeplanning = function (index) {
            $scope.todos.splice(index, 1);
        }
        $scope.mailreport = function () {
            try {
                var data = $scope.todos;
                for (var i in data) {
                    if (data[i].ivz_employeeposition == Data.mastertype) {
                        var ins = new MobileCRM.DynamicEntity('appointment', data[i].activityid);
                        ins.properties.ivz_planningstatus = parseInt(1);
                        ins.save(function (err) {
                            if (err) {
                                alert("ex insert " + err);
                            }
                        });
                    }
                }
            } catch (er) {
                alert(er);
            } finally {
                SendMail(Data.mailtomail, 'text title', 'text body');
                setTimeout(function () {
                    $scope.reloaddata();
                }, 3000);
            }
        }
    })
    .controller('Plan2Ctrl', function ($scope, $stateParams, $cookies, $location, Data) {
        $scope.Data = Data;
        Data.showcart = false;
        Data.mastertype = 2; //$stateParams.mastertype;
        Data.sterritory = $stateParams.sterritory;
        Data.nterritory = $stateParams.nterritory;
        Data.dirsale = false;
        if (Data.sterritory == '0' || Data.sterritory == 0) {
            Data.sterritory = '40791CA7-D5E1-E511-80E1-005056A71F87';
        }
        //alert('$stateParams.mastertype:'+$stateParams.mastertype);
        GetGPSLocation(function (res) {
            Data.latitude = res.latitude;
            Data.longitude = res.longitude;
        });
        $scope.dvTodos = true;
        GetAppointStatus(Data.sterritory, 0, Data.mastertype, function (data) {
            if (data) {
                $scope.dvTodos = false;
                $scope.todos = data;
            } else {
                $scope.dvTodos = true;
            }
        });
        $scope.reloaddata = function () {
            GetAppointStatus(Data.sterritory, 0, Data.mastertype, function (data) {
                if (data) {
                    $scope.dvTodos = false;
                    $scope.todos = [];
                    for (var i in data) {
                        $scope.todos.push({
                            activityid: data[i].activityid,
                            ivz_customer: data[i].ivz_customer,
                            ivz_territoryid: data[i].ivz_territoryid,
                            ivz_empid: data[i].ivz_empid,
                            start: data[i].start,
                            end: data[i].end,
                            ivz_saleprospect: data[i].ivz_saleprospect,
                            title: data[i].title,
                            ivz_visit: data[i].ivz_visit,
                            ivz_visitbilling: data[i].ivz_visitbilling,
                            ivz_visitclaimorder: data[i].ivz_visitclaimorder,
                            ivz_visitcollection: data[i].ivz_visitcollection,
                            ivz_visitopenaccount: data[i].ivz_visitopenaccount,
                            ivz_visitorder: data[i].ivz_visitorder,
                            ivz_visitadjustment: data[i].ivz_visitadjustment,
                            ivz_visitcompetitors: data[i].ivz_visitcompetitors,
                            ivz_visitmarket: data[i].ivz_visitmarket,
                            ivz_visitpostpect: data[i].ivz_visitpostpect,
                            ivz_visitproductrecall: data[i].ivz_visitproductrecall,
                            ivz_visitactivities: data[i].ivz_visitactivities,
                            ivz_visitsuggest: data[i].ivz_visitsuggest,
                            ivz_employeeposition: data[i].ivz_employeeposition,
                            ivz_addressprovince: data[i].ivz_addressprovince,
                            ivz_addressdistrict: data[i].ivz_addressdistrict,
                            territoryid: data[i].territoryid,
                            accountnumber: data[i].accountnumber,
                            ivz_planningstatus: data[i].ivz_planningstatus,
                            ivz_emailcontact: data[i].ivz_emailcontact,
                            ivz_leadermail: data[i].ivz_leadermail,
                            ivz_ccmail: data[i].ivz_ccmail,
                            ivz_balancecredit: data[i].ivz_balancecredit,
                            filtername: data[i].filtername,
                            mailtomail: data[i].mailtomail,
                            ivz_scheduledstarttime: data[i].ivz_scheduledstarttime,
                            ivz_scheduledendtime: data[i].ivz_scheduledendtime
                        });
                    }
                } else {
                    $scope.dvTodos = true;
                }
            });
        }
        $scope.removeplanning = function (index) {
            $scope.todos.splice(index, 1);
        }
        $scope.mailreport = function () {
            try {
                var data = $scope.todos;
                for (var i in data) {
                    var ins = new MobileCRM.DynamicEntity('appointment', data[i].activityid);
                    ins.properties.ivz_planningstatus = parseInt(1);
                    ins.save(function (err) {
                        if (err) {
                            alert("ex insert " + err);
                        }
                    });
                    if (i == data.length) {
                        $scope.reloaddata();
                        SendMail(Data.mailtomail, 'text title', 'text body');
                    }
                }
            } catch (er) {
                alert(er);
            }
        }
    })
    .controller('PlanCalendarCtrl', function ($scope, $stateParams, $cookies, Data) {
        $scope.Data = Data;
        Data.showcart = false;
        GetGPSLocation(function (res) {
            Data.latitude = res.latitude;
            Data.longitude = res.longitude;
        });
    })
    .controller('PlanListAccountCtrl', function ($scope, $stateParams, $cookies, Data) {
        $scope.Data = Data;
        Data.showcart = false;
        GetGPSLocation(function (res) {
            Data.latitude = res.latitude;
            Data.longitude = res.longitude;
        });
        $scope.arInvoice = true;
        $scope.arAccount = true;
        $scope.arPostpect = true;
        $scope.arLoading = false;
        $scope.Data = Data;
        $scope.accountype = $stateParams.accountype;
        if ($scope.accountype == '1') {
            console.log('insert ค้นหาลูกค้าที่ค้างชำระ');
            Data.sBilling = 1;
            Data.scollecttion = 1;
            getInvoiceByAccountid(Data.sterritory, function (data) {
                $scope.arInvoice = false;
                $scope.todos = data;
            });
        } else if ($scope.accountype == '2') {
            Data.sBilling = 0;
            Data.scollecttion = 0;
            console.log('insert ค้นหาลูกค้าทั่วไป');
            GetAccount(Data.sterritory, Data.mastertype, 1, function (data) {
                $scope.arAccount = false;
                $scope.todos = data;
            });
        } else if ($scope.accountype == '3') {
            Data.sBilling = 0;
            Data.scollecttion = 0;
            //console.log('insert ค้นหาลูกค้าเป้าหมาย');
            GetPostpectByTer(Data.sterritory, function (data) {
                $scope.arPostpect = false;
                $scope.todos = data;
            });
        }
    })
    .controller('PlanAccuntDetailCtrl', function ($scope, $stateParams, $cookies, Data, $ionicHistory, $state, $ionicLoading) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.showcart = false;
        $scope.infoDate = true;
        $scope.infoTime = true;
        $scope.infoActivities = true;
        $scope.infoActivitiesSpe = true;
        $scope.user = {
            submissionDate: '',
            mStart: 917970016,
            mEnd: 917970036,
            vOpenAccount: 0,
            vAdjustment: 0,
            vOpenOrder: 0,
            vOpenClaim: 0,
            vPostpect: 0,
            vComputitor: 0,
            vMarketSumu: 0,
            vConllecttion: Data.scollecttion,
            vProductRecall: 0,
            vBilling: Data.sBilling,
            vSuggust: 0
        };
        GetAvailablefromtime(function (data) {
            $scope.listtime = data;
        });
        GetActivities(function (data) {
            $scope.activities = data;
        });
        GetGPSLocation(function (res) {
            $scope.latitude = res.latitude;
            $scope.longitude = res.longitude;
        });
        $scope.accountid = $stateParams.accountid;
        $scope.accountname = $stateParams.accountname;
        $scope.accountype = $stateParams.accountype;
        $scope.proviceid = $stateParams.proviceid;
        $scope.districtid = $stateParams.districtid;
        $scope.territoryid = $stateParams.territoryid;
        if ($scope.accountname) {
            $scope.txtcustomer = $scope.accountname;
        }
        var bActivi = [];
        $scope.exActivities = function (ethis, gthis) {
            bActivi.push(ethis);
        }
        $scope.fnActivities = function (ethis) {
            alert($scope.proviceid);
        }
        $scope.cbnAppoint = function (accountid, accountname, accountype, proviceid, districtid, territoryid, latitude, longitude) {
            var gyuid = guid();
            var swToggleActivities = $('#swToggleActivities').hasClass('md-checked');
            console.log($scope.user.vConllecttion);
            if ($scope.user.submissionDate) {
                $scope.infoDate = true;
            } else {
                $scope.infoDate = false;
            };
            if (bActivi.length <= 0) {
                $scope.infoActivities = false;
            } else {
                $scope.infoActivities = true;
            }
            if (bActivi.length > 0) {
                console.log(bActivi.toString());
                if (accountype) {
                    try {
                        if (gyuid) {
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
                            if (accountype == '1' || accountype == 1 || accountype == 2 || accountype == '2') {
                                ins.properties.ivz_customer = new MobileCRM.Reference('account', accountid);
                            } else {
                                ins.properties.ivz_saleprospect = new MobileCRM.Reference('ivz_saleprospect', accountid);
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
                            ins.properties.location = latitude, longitude;
                            ins.properties.ivz_latilong = latitude, longitude;
                            ins.properties.ivz_state = new MobileCRM.Reference('ivz_addressprovince', proviceid);
                            ins.properties.ivz_city = new MobileCRM.Reference('ivz_addressdistrict', districtid);
                            ins.properties.ivz_territoryid = new MobileCRM.Reference('territory', territoryid);
                            ins.save(function (err) {
                                if (err) {
                                    $scope.txerr = err;
                                    insertcodeex('เกิดข้อผิดพลาด exappointment', 'controller.js PlanAccuntDetailCtrl scope.cbnAppoint', 'บันทึกข้อมูล appointment account:' + accountname, '243', err, Data.masname, 1, function (data) {
                                        if (data) {
                                            alert("exappointment " + err);
                                        }
                                    });
                                } else {
                                    insertcodeex('บันทึกข้อมูล exappointment', 'controller.js PlanAccuntDetailCtrl scope.cbnAppoint', 'บันทึกข้อมูล appointment account:' + accountname, '243', 'ไม่พบข้อผิดพลาด', Data.masname, 0, function (data) {
                                        if (data) {
                                            alert("บันทึกข้อมูลเสร็จแล้ว");
                                            $ionicHistory.goBack(-1);
                                        }
                                    });
                                }
                            });
                        } else {
                            insertcodeex('เกิดข้อผิดพลาดไม่พบ GUID', 'controller.js PlanAccuntDetailCtrl scope.cbnAppoint', 'บันทึกข้อมูล appointment account:' + accountname, '252', $scope.txerr, Data.masname, 1, function (data) {
                                if (data) {
                                    alert('เกิดข้อผิดพลาดไม่พบ GUID กรุณาปิดแอพและเข้าสู่ระบบใหม่ครับ');
                                }
                            });
                        }
                    } catch (er) {
                        alert('excbn02 ' + er);
                    }
                }
            }
        }
    })
    .controller('PlanSupCtrl', function ($scope, $stateParams, $cookies, Data) {
        $scope.Data = Data;
        Data.showcart = false;
        Data.mastertype = $stateParams.mastertype;
        GetGPSLocation(function (res) {
            Data.latitude = res.latitude;
            Data.longitude = res.longitude;
        });
        gettername(Data.masname, function (data) {
            if (data) {
                $scope.listmaster = data;
            }
        });
    })
    .controller('PlanSendPlanCtrl', function ($scope, $stateParams, $cookies, Data) {
        $scope.Data = Data;
        Data.showcart = false;
        Data.dirsale = false;
        Data.mastertype = 2;
        //alert('$stateParams.mastertype:'+$stateParams.mastertype);
    })
    .controller('PlanListMasterCtrl', function ($scope, $stateParams, $cookies, Data) {
        $scope.Data = Data;
        Data.showcart = false;
        Data.mastertype = $stateParams.mastertype;
        // if($stateParams.mastertype == 1 || $stateParams.mastertype == '1'){
        //   Data.dirsale = false;
        // }else if($stateParams.mastertype == 2 || $stateParams.mastertype == '2' || $stateParams.mastertype == 3 || $stateParams.mastertype == '3'){
        //   Data.dirsale = true;
        // }
        gettername(Data.masname, function (data) {
            if (data) {
                $scope.listmaster = data;
            }
        });
    })
    .controller('PlanListDetailCtrl', function ($scope, $stateParams, $cookies, Data, $ionicHistory) {
        $scope.Data = Data;
        Data.showcart = false;
        $scope.vCheckAll = 0;
        $scope.listappointment = [];
        GetAppointStatus($stateParams.territoryid, 0, 1, function (data) {
            for (var i in data) {
                $scope.listappointment.push({
                    activityid: data[i].activityid,
                    ivz_customer: data[i].ivz_customer,
                    ivz_territoryid: data[i].ivz_territoryid,
                    ivz_empid: data[i].ivz_empid,
                    start: data[i].start,
                    end: data[i].end,
                    ivz_saleprospect: data[i].ivz_saleprospect,
                    title: data[i].title,
                    ivz_visit: data[i].ivz_visit,
                    ivz_visitbilling: data[i].ivz_visitbilling,
                    ivz_visitclaimorder: data[i].ivz_visitclaimorder,
                    ivz_visitcollection: data[i].ivz_visitcollection,
                    ivz_visitopenaccount: data[i].ivz_visitopenaccount,
                    ivz_visitorder: data[i].ivz_visitorder,
                    ivz_visitadjustment: data[i].ivz_visitadjustment,
                    ivz_visitcompetitors: data[i].ivz_visitcompetitors,
                    ivz_visitmarket: data[i].ivz_visitmarket,
                    ivz_visitpostpect: data[i].ivz_visitpostpect,
                    ivz_visitproductrecall: data[i].ivz_visitproductrecall,
                    ivz_visitactivities: data[i].ivz_visitactivities,
                    ivz_visitsuggest: data[i].ivz_visitsuggest,
                    ivz_employeeposition: data[i].ivz_employeeposition,
                    ivz_addressprovince: data[i].ivz_addressprovince,
                    ivz_addressdistrict: data[i].ivz_addressdistrict,
                    territoryid: data[i].territoryid,
                    accountnumber: data[i].accountnumber,
                    ivz_planningstatus: data[i].ivz_planningstatus,
                    ivz_emailcontact: data[i].ivz_emailcontact,
                    ivz_leadermail: data[i].ivz_leadermail,
                    ivz_ccmail: data[i].ivz_ccmail,
                    ivz_balancecredit: data[i].ivz_balancecredit,
                    filtername: data[i].filtername,
                    mailtomail: data[i].mailtomail,
                    ivz_scheduledstarttime: data[i].ivz_scheduledstarttime,
                    ivz_scheduledendtime: data[i].ivz_scheduledendtime
                });
            }
        });
        $scope.removeplanning = function (id) {
            $scope.listappointment.splice(id, 1);
        }
        $scope.reloaddata = function () {
            GetAppointStatus($stateParams.territoryid, 0, 1, function (data) {
                $scope.listappointment = data;
            });
        }
        $scope.confirmcopy = function () {
            var data = $scope.listappointment;
            for (var i in data) {
                var guidfor = guid();
                try {
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
                    if (data[i].ivz_customer) {
                        ins.properties.ivz_customer = new MobileCRM.Reference('account', data[i].ivz_customer.id);
                    } else if (data[i].ivz_saleprospect) {
                        ins.properties.ivz_saleprospect = new MobileCRM.Reference('ivz_saleprospect', data[i].ivz_saleprospect.id);
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
                    ins.properties.location = Data.latitude, Data.longitude;
                    ins.properties.ivz_latilong = Data.latitude, Data.longitude;
                    ins.properties.ivz_state = new MobileCRM.Reference('ivz_addressprovince', data[i].ivz_addressprovince.id);
                    ins.properties.ivz_city = new MobileCRM.Reference('ivz_addressdistrict', data[i].ivz_addressdistrict.id);
                    ins.properties.ivz_territoryid = new MobileCRM.Reference('territory', data[i].territoryid.id);
                    ins.save(function (err) {
                        if (err) {
                            alert('เกิดข้อผิดพลาดในการคัดลอกแผนการดำเนินงาน ' + err);
                        }
                    });
                } catch (er) {
                    alert('เกิดข้อผิดพลาดในการคัดลอกแผนการดำเนินงาน ' + er);
                }
            }
            setTimeout(function () {
                $ionicHistory.goBack(-1);
            }, 3000);
        }
        $scope.cancelcp = function () {
            $ionicHistory.goBack(-1);
        }
    })
    .controller('PlanSendSupCtrl', function ($scope, $stateParams, $cookies, Data, $ionicHistory) {
        $scope.Data = Data;
        Data.showcart = false;
        Data.mastertype = $stateParams.mastertype;
        $scope.vCheckAll = 0;
        // if(Data.mastertype == 1 || Data.mastertype == '1'){
        //   Data.dirsale = false;
        // }else if(Data.mastertype == 2 || Data.mastertype == '2' || Data.mastertype == 3 || Data.mastertype == '3'){
        //   Data.dirsale = true;
        // }
        $scope.exprchk = function (ethis) {
            console.log(ethis);
        }
        $scope.reloaddata = function () {

        }
        $scope.confirmcopy = function () {
            $ionicHistory.goBack(-1);
        }
        $scope.cancelcp = function () {
            $ionicHistory.goBack(-1);
        }
    })
    .controller('PlanApproveSupCtrl', function ($scope, $stateParams, $cookies, Data) {
        $scope.Data = Data;
        Data.showcart = false;
        Data.mastertype = $stateParams.mastertype;
        $scope.vCheckAll = 0;
        gettername(Data.masname, function (data) {
            if (data) {
                $scope.listmaster = data;
            }
        });
    })
    .controller('PlanListApproveCtrl', function ($scope, $stateParams, $cookies, Data, $ionicHistory) {
        $scope.Data = Data;
        Data.showcart = false;
        Data.sterritory = $stateParams.territoryid;
        $scope.vCheckAll = 0;
        // $scope.reloaddata();
        var itype;
        if (Data.mastertype === 2 || Data.mastertype === '2') {
            itype = 1;
        } else if (Data.mastertype === 3 || Data.mastertype === '3') {
            itype = 2;
        } else {
            itype = Data.mastertype;
        }
        GetAppointStatus($stateParams.territoryid, 1, itype, function (data) {
            $scope.bnklist = data;
            $scope.listappointment = data;
        });
        $scope.reloaddata = function () {
            GetAppointStatus($stateParams.territoryid, 1, itype, function (data) {
                $scope.listappointment = data;
                $scope.$apply();
            });
        }
        $scope.removeplanning = function (index) {
            $scope.listappointment.splice(index, 1);
        }
        $scope.cancelcp = function () {
            $ionicHistory.goBack(-1);
        }
        $scope.confirmcopy = function () {
            var data = $scope.listappointment;
            //Data.DataList = $scope.listappointment;
            for (var i in data) {
                try {
                    var ins = new MobileCRM.DynamicEntity('appointment', data[i].activityid);
                    ins.properties.ivz_planningstatus = parseInt(2);
                    ins.save(function (er) {
                        if (er) {
                            alert(er);
                        }
                    });
                } catch (er) {
                    alert("เกิดข้อผิดพลาดรหัส 695 " + er);
                }
            }
            setTimeout(function () {
                $scope.reloaddata();
            }, 3000);
        }
        $scope.rejectplan = function () {
            Data.DataList = $scope.listappointment;
            window.location.href = "#/app/rejectplan/" + Data.sterritory + "/" + Data.salename + "/" + Data.tername;
        }
    })
    .controller('PlanRejectCtrl', function ($scope, $stateParams, $cookies, Data, $rootScope, $ionicHistory) {
        $scope.Data = Data;
        Data.showcart = false;
        $scope.territoryid = $stateParams.territoryid;
        $scope.salename = $stateParams.salename;
        $scope.tername = $stateParams.tername;
        $scope.reject = {
            txtreject: ''
        };
        $scope.hidden = true;
        $scope.cancelcp = function () {
            $ionicHistory.goBack(-1);
        }
        $scope.confirmplan = function () {
            var txtreject = $scope.reject.txtreject;
            if ($scope.reject.txtreject) {
                $scope.hidden = true;
                var data = Data.DataList;
                SendMail(Data.mailtomail, 'text title', 'text body' + $scope.reject.txtreject);
                setTimeout(function () {
                    $ionicHistory.goBack(-1);
                }, 3000);
                for (var i in data) {
                    try {
                        var ins = new MobileCRM.DynamicEntity('appointment', data[i].activityid);
                        ins.properties.ivz_planningstatus = parseInt(3);
                        ins.properties.ivz_txtremark = $scope.reject.txtreject;
                        ins.save(function (er) {
                            if (er) {
                                alert(er);
                            }
                        });
                    } catch (er) {
                        alert("เกิดข้อผิดพลาดรหัส 708 " + er);
                    }
                }
            } else {
                $scope.hidden = false;
                console.log(txtreject.length);
            }
        }
    })
    ////////////////// End //////////////////////
    /////////////////// Planned ///////////////////
    .controller('PlanedCtrl', function ($scope, $stateParams, $cookies, Data) {
        $scope.Data = Data;
        Data.showcart = false;
        Data.mastertype = $stateParams.mastertype;
        //$stateParams.accountid;
    })
    .controller('PlanedListCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, $ionicModal) {
        $state.reload();
        $scope.Data = Data;
        Data.showcart = false;
        Data.mastertype = $stateParams.mastertype;
        $scope.territoryid = Data.termas;
        $scope.filtertxt = '';
        $scope.user = {
          cards:true,
          checkaccount:true
        }
        $scope.$on('$ionicView.enter',function(){
            $scope.listaccount = [];
            $scope.loadprocress(id);
        });
        $scope.loadprocress = function(id){
          if(id){
            $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล');
            switch (id) {
              case 1:
                $scope.user.checkaccount = true;
                $scope.loaddata();
                break;
              case 2:
                $scope.user.checkaccount = true;
                $scope.loadinvoice();
                break;
              case 3:
                $scope.user.checkaccount = false;
                $scope.loadpostpect();
                break;
              default:
                $scope.user.checkaccount = true;
                $scope.loaddata();
                break;
            }
          }else{
            $scope.user.checkaccount = true;
            $scope.loaddata();
          }
        }
        $scope.loaddata = function(){
          GetAccount($scope.territoryid, Data.mastertype, 1, function (data) {
              if (data) {
                $scope.user.cards = false;
                  var x = 0;
                  var loopArray = function (arr) {
                      getPush(x, function () {
                          x++;
                          if (x < arr.length) {
                              loopArray(arr);
                          } else {
                              $ionicLoading.hide();
                          }
                      });
                  }
                  loopArray(data);
                  function getPush(i, callback) {
                      if (data[i].statuscode == 1 || data[i].statuscode == '1') {
                          $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล ' + data[i].filtername);
                          $scope.listaccount.push({
                              accountid: data[i].accountid,
                              name: data[i].name,
                              ivz_addresscountry: data[i].ivz_addresscountry,
                              ivz_addressprovince: data[i].ivz_addressprovince,
                              ivz_addressdistrict: data[i].ivz_addressdistrict,
                              ivz_availablefromtime: data[i].ivz_availablefromtime,
                              ivz_availabletotime: data[i].ivz_availabletotime,
                              territoryid: data[i].territoryid,
                              customertypecode: data[i].customertypecode,
                              statuscode: data[i].statuscode,
                              accountnumber: data[i].accountnumber,
                              filtername: data[i].filtername,
                              ivz_customer: data[i].ivz_customer,
                              accountype: data[i].accountype,
                              ivz_statuscomplete: data[i].ivz_statuscomplete,
                              remarkreject: data[i].remarkreject,
                              ivz_taxid: data[i].ivz_taxid,
                              customertypecode: data[i].customertypecode
                          });
                      }
                      setTimeout(function () {
                          callback();
                      }, 10);
                  };
              }
              $scope.$apply();
          });
        }
        $scope.loadinvoice = function(){
          GetAccountInvoice(Data.termas,function(data){
            //alert(data.length+'::'+Data.termas);
            if(data){
              $scope.user.cards = false;
              var x = 0;
              var loopArray = function(arr){
                getPush(x,function(){
                  x++;
                  if(x < arr.length){
                    loopArray(arr);
                  }else{
                    $ionicLoading.hide();
                  }
                });
              }
              loopArray(data);
              function getPush(i,callback){
                    $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล ' + data[i].filtername);
                    if(data[i].statuscode == 1 || data[i].statuscode == '1'){
                      $scope.listaccount.push({
                            accountid:data[i].accountid,
                						name:data[i].name,
                						ivz_addresscountry:data[i].ivz_addresscountry,
                						ivz_addressprovince:data[i].ivz_addressprovince,
                						ivz_addressdistrict:data[i].ivz_addressdistrict,
                						ivz_availablefromtime:data[i].ivz_availablefromtime,
                						ivz_availabletotime:data[i].ivz_availabletotime,
                						territoryid:data[i].territoryid,
                						customertypecode:data[i].customertypecode,
                						statuscode:data[i].statuscode,
                						accountnumber:data[i].accountnumber,
                						filtername:data[i].filtername,
                						ivz_statuscomplete:data[i].ivz_statuscomplete,
                						ivz_remarkreject:data[i].ivz_remarkreject,
                						ivz_taxid:data[i].ivz_taxid,
                						customertypecode:data[i].customertypecode,
                						ivz_statustype:data[i].ivz_statustype,
                						ivz_doc01:data[i].ivz_doc01,
                						ivz_doc02:data[i].ivz_doc02,
                						ivz_doc03:data[i].ivz_doc03,
                						ivz_dochouseholdregis:data[i].ivz_dochouseholdregis,
                						ivz_docidcard:data[i].ivz_docidcard,
                						ivz_satatusempid:data[i].ivz_satatusempid,
                						creditlimit:data[i].creditlimit,
                						ivz_integrationid:data[i].ivz_integrationid,
                						ivz_billingnumber:data[i].ivz_billingnumber,
                						createdon:new Date(data[i].createdon)
                      });
                    }
                setTimeout(function(){
                  callback();
                },10);
              }
            }
            $scope.$apply();
          });
        }
        $scope.loadpostpect = function(){
          GetPostpectByTer(Data.termas,function(data){
            if(data){
              $scope.user.cards = false;
              var x = 0;
              var loopArray = function(arr){
                getPush(x,function(){
                  x++;
                  if(x < arr.length){
                    loopArray(arr);
                  }else{
                    $ionicLoading.hide();
                  }
                });
              }
              loopArray(data);
              function getPush(i,callback){
                    $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล ' + data[i].filtername);
                    $scope.listaccount.push({
                      ivz_saleprospectid:data[i].ivz_saleprospectid,
                      ivz_name:data[i].ivz_name,
                      accountid:data[i].ivz_saleprospectid,
                      filtername:data[i].ivz_name,
                      ivz_prospectgroup:data[i].ivz_prospectgroup,
                      ivz_prospectname:data[i].ivz_prospectname,
                      ivz_saledistict:data[i].ivz_saledistict,
                      ivz_saleprovinceid:data[i].ivz_saleprovinceid,
                      ivz_territory:data[i].ivz_territory,
                      ivz_taxid:'',
                      accountype:3
                    });
                setTimeout(function(){
                  callback();
                },10);
              }
            }
            $scope.$apply();
          });
        }
    })
    .controller('PlanedDetailCtrl', function ($scope, $stateParams, $cookies, Data, $ionicHistory, $ionicLoading, $state) {
        $scope.Data = Data;
        Data.showcart = false;
        Data.mastertype = $stateParams.mastertype;
        Data.getparaaccount = $stateParams.accountid;
        Data.getparaname = $stateParams.accountname;
        Data.gettxtid = $stateParams.txtid;
        var tct = $stateParams.txtid + '\n' +
            $stateParams.terid + '\n' +
            $stateParams.distid + '\n' +
            $stateParams.province;
        console.log(tct);
        var getduig = guid();

        function insertactivities(type, statc, stata, typearr, callback) {
            try {
                var ins = MobileCRM.DynamicEntity.createNew("ivz_resultappoint");
                ins.properties.ivz_resultappointid = getduig;
                ins.properties.ivz_resultname = $stateParams.accountname;
                ins.properties.ivz_customer = new MobileCRM.Reference('account', $stateParams.accountid);
                ins.properties.ivz_visit = parseInt(1);
                if (type == 1 || type == '1') {
                    ins.properties.ivz_visitopenaccount = parseInt(1);
                } else if (type == 2 || type == '2') {
                    ins.properties.ivz_visitadjustment = parseInt(1);
                } else if (type == 3 || type == '3') {
                    ins.properties.ivz_visitorder = parseInt(1);
                } else if (type == 4 || type == '4') {
                    ins.properties.ivz_visitclaimorder = parseInt(1);
                } else if (type == 5 || type == '5') {
                    ins.properties.ivz_visitpostpect = parseInt(1);
                } else if (type == 6 || type == '6') {
                    ins.properties.ivz_visitmarket = parseInt(1);
                } else if (type == 7 || type == '7') {
                    ins.properties.ivz_visitcompetitor = parseInt(1);
                } else if (type == 8 || type == '8') {
                    ins.properties.ivz_visitbilling = parseInt(1);
                } else if (type == 9 || type == '9') {
                    ins.properties.ivz_visitproductrecall = parseInt(1);
                } else if (type == 10 || type == '10') {
                    ins.properties.ivz_visitactivities = typearr.toString();
                }
                ins.properties.ivz_latitude = Data.latitude;
                ins.properties.ivz_longtitude = Data.langtitude;
                ins.properties.ivz_shedulestart = new Date();
                ins.properties.ivz_sheduleend = new Date();
                ins.properties.ivz_resultstatus = parseInt(statc);
                ins.properties.ivz_statuscomplete = parseInt(stata);
                ins.properties.ivz_territory = new MobileCRM.Reference('territory', $stateParams.terid);
                ins.properties.ivz_addressdistrict = new MobileCRM.Reference('ivz_addressdistrict', $stateParams.distid);
                ins.properties.ivz_addressprovince = new MobileCRM.Reference('ivz_addressprovince', $stateParams.province);
                ins.properties.ivz_empid = Data.Empid;
                ins.save(function (er) {
                    if (er) {
                        alert(er);
                    } else {
                        callback();
                    }
                });
            } catch (er) {
                alert('error 846 ' + er);
            }
        }

        $scope.goop = function (idval) {
            var guidreg = guid();
            var terriid = $cookies.get('territoryid'); //'6C791CA7-D5E1-E511-80E1-005056A71F87';
            if (idval == 1 || idval == '1') {
                console.log('insert visit openaccount');
                insertactivities(1, 0, 2, null, function () {
                    $state.go('app.openaccount', {
                        territoryid: Data.termas,
                        mastertype: Data.mastertype,
                        getguid: $stateParams.accountid,
                        pricelevel: Data.pricelevel,
                        transactioncurrency: Data.transactioncurrency
                    });
                });
            } else if (idval == 2 || idval == '2') {
                //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
                console.log('insert visit adjustment');
                window.location.href = "#/app/adjustment/" + $stateParams.accountid + "/" + Data.mastertype;
            } else if (idval == 3 || idval == '3') {
                console.log('insert activities');
                $state.go('app.order', {
                    accountid: $stateParams.accountid,
                    mastertype: Data.mastertype
                }, {
                    reload: true
                });
            } else if (idval == 4 || idval == '4') {
                //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
                console.log('insert visit open claim');
            } else if (idval == 5 || idval == '5') {
                //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
                console.log('insert visit open postpect');
            } else if (idval == 6 || idval == '6') {
                //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
                console.log('insert visit open marketting');
            } else if (idval == 7 || idval == '7') {
                //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
                console.log('insert visit open computitor');
            } else if (idval == 8 || idval == '8') {
                console.log('insert visit open billing');
                // $state.go('app.billingcollection',{
                //                                     accountid: $stateParams.accountid,
                //                                     mastertype: Data.mastertype,
                //                                     retype:0,
                //                                     terid:Data.termas
                //                                   },{reload:true});app.billingcollectionoption
                $state.go('app.billingcollectionoption',{
                                                    accountid: $stateParams.accountid,
                                                    mastertype: Data.mastertype,
                                                    retype:1,
                                                    terid:Data.termas
                                                  },{reload:true});
            } else if (idval == 9 || idval == '9') {
                //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
                console.log('insert visit open product recall');
            } else if (idval == 10 || idval == '10') {
                //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
                console.log('insert visit 10');
            } else if (idval == 11 || idval == '11') {
                //var ins = new MobileCRM.DynamicEntity.createNew('ivz_result');
                console.log('insert visit 11');
            } else {
                console.log('insert ' + idval);
            }
        }
    })
    ///////////////////  End //////////////////////
    /*----------------- Billing and collect -------------------*/
    .controller('ListBillingAccountCtrl', function ($scope, $compile,$state, Dtest,$stateParams, $cookies, Data, rego, $ionicHistory, $ionicLoading,$ionicModal) {
      $state.reload();
      $scope.Data = Data;
      $scope.group = {
        billing:'',
        resultactivities:'',
        typebilling:''
      }
      $scope.user ={
        filedoc01:[],
        filedoc02:[],
        class:'shake',
        class01:'shake',
        class02:'shake',
        txtname:$stateParams.txtname,
        txtbilling:$stateParams.txtbilling,
        txttatol:$stateParams.txttatol,
        txtdate:new Date(),
        txtcomment:''
      }
      $scope.$on('$ionicView.enter',function(){
        $scope.loadlink($stateParams.retype);
      });
      $scope.loadlink = function(id){
        $scope.showLoadingComplete('กำลังโหลดข้อมูล');
        switch (id) {
          case '0':
              $scope.loaddata();
              console.log('retype 0');
            break;
          case '1':
              $scope.reloadbilling();
              console.log('retype 1');
            break;
          default:

        }
        setTimeout(function(){
          $ionicLoading.hide();
        },1000);
      }
      $scope.loaddata = function(){
        // $scope.listaccount = [];
        // var data = ["Banana", "Orange", "Apple", "Mango","Lemon","Potato"];
        // for(var i = 0;i <= 5;i++){
        //   console.log(data[i]);
        //   $scope.listaccount.push({
        //     accountid:guid(),
        //     name:data[i],
        //     filtername:guid()+''+data[i],
        //     territoryid:'D09'
        //   });
        // }
        // $scope.$apply();
      }
      $scope.calldocfile = function(id,ethis){
        console.log(ethis);
        $(id).trigger('click');
      }
      /*------------------ begin img --------------------*/
      $('#filedoc01').change(function(){
        $scope.user.class = 'shake';
        $scope.user.class01 = 'shake';
        GetAtt('#filedoc01', '', 'canvas01', function (data) {
            $scope.user.filedoc01.push({id:$scope.group.billing,docfile:data,title:'แนบใบวางบิลที่ Sale เซ็น'});
            pushImg('imgdoc01');
        });
      });
      function pushImg(dClass){
        $('.divimg').remove();
        if($scope.user.filedoc01){
          for(var i in $scope.user.filedoc01){
            var html = '<div class="col col-20 divimg">' +
                '<img class="thumbnail" src="data:image/jpeg;base64,' + $scope.user.filedoc01[i].docfile + '" width="100" height="100" ng-click="removeimg(' + i + ')"/>' +
                '</div>';
            angular.element(document.getElementById(dClass)).append($compile(html)($scope));
          }
        }
      }
      $scope.removeimg = function(id){
        $scope.user.filedoc01.splice(id,1);
        pushImg('imgdoc01');
      }
      /*---- img 02 ----*/
      $('#filedoc02').change(function(){
        GetAtt('#filedoc02', '', 'canvas02', function (data) {
            $scope.user.class = 'shake';
            $scope.user.class02 = 'shake';
            $scope.user.filedoc02.push({id:$scope.group.billing,docfile:data,title:'แนบใบ Pay  In  Slip'});
            pushImg2('imgdoc02');
        });
      });
      function pushImg2(dClass){
        $('.divimg2').remove();
        if($scope.user.filedoc02){
          for(var i in $scope.user.filedoc02){
            var html = '<div class="col col-20 divimg2">' +
                '<img class="thumbnail" src="data:image/jpeg;base64,' + $scope.user.filedoc02[i].docfile + '" width="100" height="100" ng-click="removeimg2(' + i + ')"/>' +
                '</div>';
            angular.element(document.getElementById(dClass)).append($compile(html)($scope));
          }
        }
      }
      $scope.removeimg2 = function(id){
        $scope.user.filedoc02.splice(id,1);
        pushImg2('imgdoc02');
      }
      /*------------------ end --------------------*/
      $scope.reloadbilling = function(){
        $scope.billingdata = [];
        // var data = [];
        // for(var i = 0;i <= 20;i++){
        //   //console.log('push data :'+i);
        //   $scope.billingdata.push({
        //     billingid:guid(),
        //     billingnumber:'Bullet'+('0'+i).slice(-2),
        //     filtername:'Bullet'+('0'+i).slice(-2),
        //     billingtatol:(i+1)+'00000',
        //     createdon:new Date()
        //   });
        // }
        GetBillingByIaccount($stateParams.accountid,function(data){
          alert(data.length);
          if(data.length > 0){
            var x = 0;
            var loopArray = function(arr){
              getPush(x,function(){
                x++;
                if(x < arr.length){

                }else{
                  $ionicLoading.hide();
                }
              });
            }
            loopArray(data);
            function getPush(i,callback){
              $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล '+data[i].ivz_name);
              $scope.billingdata.push({
                ivz_billingnotestableid:data[i].ivz_billingnotestableid,
                ivz_name:data[i].ivz_name,
                ivz_billingnumber:data[i].ivz_billingnumber,
                ivz_sumbillingamount:data[i].ivz_sumbillingamount,
                ivz_billingdate:data[i].ivz_billingdate,
                ivz_customername:data[i].ivz_customername,
                createdon:data[i].createdon,
                ivz_customernumber:data[i].ivz_customernumber,
                ivz_addressdistrict:data[i].ivz_addressdistrict,
                ivz_addressprovince:data[i].ivz_addressprovince,
                territoryid:data[i].territoryid,
                ivz_leadermail:data[i].ivz_leadermail,
                ivz_emailcontact:data[i].ivz_emailcontact,
                ivz_ccmail:data[i].ivz_ccmail
              });
              setTimeout(function(){
                callback();
              },5);
            }
          }
          $scope.$apply();
        });
      }
      // $scope.gettarget = function(id){
      //   console.log(id);
      //   $state.go('app.billingcollectionoption',{retype:1});
      // }
      $scope.reback = function(){
        $scope.user = {
          filedoc01:[],
          filedoc02:[],
          class:'shake',
          class01:'shake',
          class02:'shake',
          txtname:'',
          txtbilling:'',
          txttatol:'',
          txtdate:new Date(),
          txtcomment:''
        };
        $ionicHistory.goBack(-1);
      }
      $scope.$watch('group.resultactivities',function(){
        switch ($scope.group.resultactivities) {
          case 1:
          alert($scope.group.billing+':ไม่ทำกิจกรรม');
            console.log($scope.group.billing+':ไม่ทำกิจกรรม');
            $state.go('app.billingcollectionnotdo',{
                                                      billingid:$scope.group.billing,
                                                      txtname:$scope.billingdata[0].filtername,
                                                      txtbilling:$scope.billingdata[0].billingnumber,
                                                      txttatol:$scope.billingdata[0].billingtatol,
                                                      groupbilling:$scope.group.typebilling
                                                    },{reload:true});
            break;
          case 2:
          alert($scope.group.billing+':ทำกิจกรรม');
            console.log($scope.group.billing+':ทำกิจกรรม');
            switch ($scope.group.typebilling) {
              case 0:
                console.log($scope.group.billing);
                $state.go('app.billingcollectioncash',{
                                                        billingid:$scope.group.billing,
                                                        txtname:$scope.billingdata[0].filtername,
                                                        txtbilling:$scope.billingdata[0].billingnumber,
                                                        txttatol:$scope.billingdata[0].billingtatol,
                                                        groupbilling:$scope.group.typebilling
                                                      },{reload:true});
                break;
              case 1:
                console.log($scope.group.billing);
                $state.go('app.billingcollectioncheck',{
                                                        billingid:$scope.group.billing,
                                                        txtname:$scope.billingdata[0].filtername,
                                                        txtbilling:$scope.billingdata[0].billingnumber,
                                                        txttatol:$scope.billingdata[0].billingtatol,
                                                        groupbilling:$scope.group.typebilling
                                                      },{reload:true});
                break;
              case 2:
                console.log($scope.group.billing);
                $state.go('app.billingcollectiontrans',{
                                                        billingid:$scope.group.billing,
                                                        txtname:$scope.billingdata[0].filtername,
                                                        txtbilling:$scope.billingdata[0].billingnumber,
                                                        txttatol:$scope.billingdata[0].billingtatol,
                                                        groupbilling:$scope.group.typebilling
                                                      },{reload:true});
                break;
              case 3:
                console.log($scope.group.billing);
                $state.go('app.billingcollectionother',{
                                                        billingid:$scope.group.billing,
                                                        txtname:$scope.billingdata[0].filtername,
                                                        txtbilling:$scope.billingdata[0].billingnumber,
                                                        txttatol:$scope.billingdata[0].billingtatol,
                                                        groupbilling:$scope.group.typebilling
                                                      },{reload:true});
                break;
              case 4:
                console.log($scope.group.billing);
                break;
            }
            break;
        }
      });
      $ionicModal.fromTemplateUrl('templates/comment/optioncheck.html', {
          id: 1,
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function (modal) {
          $scope.modal1 = modal;
      });
      $scope.closemodal = function(id){
        $scope.modal1.hide();
      }
      $scope.cBilling = function(id){
        if($scope.group.billing){
          $scope.group.typebilling = id;
          $scope.group.resultactivities = '';
          $scope.modal1.show();
        }else{
          alert('กรุณาเลือกรายการที่ค้างชำระด้วย');
        }
      }
      var insertResultplan = function(arr,taskresult,annote1,annote2){
        console.log(arr[0].typeid+'::'+arr[0].guid+'::'+arr[0].txt);
        taskresult(arr,function(){
          annote1(arr,function(){
            annote2(arr);
          });
        });
      }
      var insertaskresult = function(options,callback){
        //console.log('insert task result plan');
        setTimeout(function(){
          console.log('insert task result plan:'+options);
          callback();
        },5000);
      }
      var insertannote01 = function(options,callback){
        //console.log('insert annote1');
        setTimeout(function(){
          console.log('options note1:'+options);
          callback();
        },3000);
      }
      var insertannote02 = function(options){
        console.log('insert annote2');
        $scope.reback();
      }
      var notnullfn = function(option){
        console.log('not null event');
        $scope.reback();
      }
      $scope.cBillingConfirm = function(id){
        switch (id) {
          case 0:
            console.log($stateParams.billingid);
            if($scope.user.filedoc01.length <= 0){
              $scope.user.class = 'shakepoint';
              $scope.user.class01 = 'shakepoint';
            }else{
              $scope.user.class = 'shake';
              $scope.user.class01 = 'shake';
            }
            if($scope.user.filedoc02.length <= 0){
              $scope.user.class = 'shakepoint';
              $scope.user.class02 = 'shakepoint';
            }else{
              $scope.user.class = 'shake';
              $scope.user.class02 = 'shake';
            }
            if($scope.user.filedoc01.length > 0 && $scope.user.filedoc02.length > 0){
              console.log('insert billing collect');
              var arr = [{typeid:0,guid:guid(),txt:null}];
              insertResultplan(arr,insertaskresult,insertannote01,insertannote02);
            }
            break;
          case 1:
            console.log($stateParams.billingid);
            if($scope.user.filedoc01.length <= 0){
              $scope.user.class = 'shakepoint';
              $scope.user.class01 = 'shakepoint';
            }else{
              $scope.user.class = 'shake';
              $scope.user.class01 = 'shake';
            }
            if($scope.user.filedoc01.length > 0){
              console.log('insert billing collect');
              var arr = [{typeid:0,guid:guid(),txt:null}];
              insertResultplan(arr,insertaskresult,insertannote01,notnullfn);
            }
            break;
          case 2:
            console.log($stateParams.billingid);
            if($scope.user.filedoc01.length <= 0){
              $scope.user.class = 'shakepoint';
              $scope.user.class01 = 'shakepoint';
            }else{
              $scope.user.class = 'shake';
              $scope.user.class01 = 'shake';
            }
            if($scope.user.filedoc02.length <= 0){
              $scope.user.class = 'shakepoint';
              $scope.user.class02 = 'shakepoint';
            }else{
              $scope.user.class = 'shake';
              $scope.user.class02 = 'shake';
            }
            if($scope.user.filedoc01.length > 0 && $scope.user.filedoc02.length > 0){
              console.log('insert billing collect');
              var arr = [{typeid:0,guid:guid(),txt:null}];
              insertResultplan(arr,insertaskresult,insertannote01,insertannote02);
            }
            break;
          case 3:
            console.log($stateParams.billingid);
            if($scope.user.filedoc01.length <= 0){
              $scope.user.class = 'shakepoint';
              $scope.user.class01 = 'shakepoint';
            }else{
              $scope.user.class = 'shake';
              $scope.user.class01 = 'shake';
            }
            if($scope.user.filedoc01.length > 0){
              console.log('insert billing collect');
              var arr = [{typeid:0,guid:guid(),txt:null}];
              insertResultplan(arr,insertaskresult,insertannote01,notnullfn);
            }
            break;
          case 4:
            console.log($stateParams.billingid);
            if($scope.user.filedoc01.length <= 0){
              $scope.user.class = 'shakepoint';
              $scope.user.class01 = 'shakepoint';
            }else{
              $scope.user.class = 'shake';
              $scope.user.class01 = 'shake';
            }
            if($scope.user.filedoc01.length > 0){
              console.log('insert billing collect');
              var arr = [{typeid:0,guid:guid(),txt:null}];
              insertResultplan(arr,insertaskresult,insertannote01,notnullfn);
            }
            break;
        }
      }
    })
    /////////////////// Open Account //////////////
    .controller('OpenAccountCtrl', function ($scope, $state, $stateParams, $cookies, Data, rego, $ionicHistory, $ionicLoading) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.showcart = false;
        Data.mastertype = $stateParams.mastertype;
        Data.dataguid = $stateParams.getguid;
        if (!$stateParams.getguid) {
            $stateParams.getguid = guid();
        }
        //alert('$stateParams.getguid:'+$stateParams.getguid.trim());
        //Data.dataguid = guid();
        // Data.getparaaccount
        // Data.getparaname
        // var acid = Data.getparaaccount;
        if (Data.getparaaccount) {
            Data.getguid = Data.getparaaccount;
        }
        //$stateParams.pricelevel;
        //$stateParams.transactioncurrency;
        //$stateParams.territoryid
        console.log($stateParams.mastertype);
        $scope.chk = {
            determinateValue: 0,
            buffervalue: 0,
            infomat: true,
            infocheck: false,
            infomattxtname: false,
            txtid: false
        };
        $scope.user = {
            branchselect: 0,
            txtid: Data.gettxtid,
            txtname: Data.getparaname,
            txtbrancher: ''
        };
        GetGPSLocation(function (res) {
            if (res) {
                //alert(res.latitude);
                Data.latitude = res.latitude;
                Data.longitude = res.longitude;
            }
            $scope.$apply();
        });
        /////////////// Check Txtid ////////////
        $scope.checktxt = function (txtid) {
            if (txtid) {
                //$scope.chk.infocheck = rego.reChkTxtId(txtid);
                if (txtid.length > 0) {
                    $scope.chk.infomat = true;
                    if (txtid.length > 12) {
                        $scope.chk.txtid = false;
                        var a = new MobileCRM.FetchXml.Entity('account');
                        a.addAttribute('ivz_taxid'); //0
                        var filter = new MobileCRM.FetchXml.Filter();
                        filter.where('ivz_taxid', 'eq', txtid);
                        a.filter = filter;
                        var fetch = new MobileCRM.FetchXml.Fetch(a);
                        fetch.execute('array', function (data) {
                            //alert("data length:"+txtid+' == '+data.length);
                            if (data.length > 0) {
                                $scope.chk.infocheck = true;
                            } else {
                                $scope.chk.infocheck = false;
                            };
                            $scope.$apply();
                        }, function (er) {
                            alert(er);
                        }, null);
                    } else {
                        $scope.chk.txtid = true;
                    }
                } else {
                    $scope.chk.infomat = false;
                }
            }
        }
        $scope.checkname = function (txtname) {
            if (txtname) {
                if (txtname.length >= 0) {
                    $scope.chk.infomattxtname = false;
                } else {
                    $scope.chk.infomattxtname = true;
                }
            } else {
                $scope.chk.infomattxtname = true;
            }
        }
        $scope.insertaccount = function () {
            //alert('test GPS Sign'+Data.latitude);
            if ($scope.user.txtid) { //Check txtid null
                var j = $scope.user.txtid;
                if (j.length > 12) {
                    $scope.chk.infomat = true;
                    $scope.chk.txtid = false;
                } else {
                    $scope.chk.txtid = true;
                }
            } else {
                $scope.chk.infomat = false;
            }
            if ($scope.user.txtname) { //check name null
                $scope.chk.infomattxtname = false;
            } else {
                $scope.chk.infomattxtname = true;
            }
            ////////////////// insert /////////////////////////
            $ionicLoading.hide();
            if ($scope.chk.infomat == true && $scope.chk.txtid == false && $scope.chk.infomattxtname == false) {
                Data.listregist = $scope.user.txtname;
                console.log('insert DB');
                try {
                    var a = new MobileCRM.FetchXml.Entity('account');
                    a.addAttribute('accountid'); //0
                    var filter = new MobileCRM.FetchXml.Filter();
                    filter.where('accountid', 'eq', $stateParams.getguid);
                    a.filter = filter;
                    var fetch = new MobileCRM.FetchXml.Fetch(a);
                    fetch.execute('array', function (data) {
                        if (data.length > 0) {
                            var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid);
                            ins.properties.ivz_taxid = $scope.user.txtid;
                            ins.properties.name = $scope.user.txtname;
                            ins.properties.ivz_branch = parseInt($scope.user.branchselect);
                            if ($scope.user.branchselect == 0 || $scope.user.branchselect == '0') {
                                ins.properties.ivz_branchdetail = 'สำนักงานใหญ่';
                                ins.properties.ivz_taxbranch = 'สำนักงานใหญ่';
                            } else {
                                ins.properties.ivz_branchdetail = 'สำนักงานย่อย';
                                ins.properties.ivz_taxbranch = 'สำนักงานย่อย';
                            }
                            ins.properties.ivz_empid = Data.Empid; ///get cookies
                            ins.properties.ivz_satatusempid = parseInt($stateParams.mastertype);
                            ins.properties.territoryid = new MobileCRM.Reference('territory', $stateParams.territoryid); //A02
                            ins.properties.transactioncurrencyid = new MobileCRM.Reference('transactioncurrency', $stateParams.transactioncurrency); //บาท
                            ins.properties.defaultpricelevelid = new MobileCRM.Reference('pricelevel', $stateParams.pricelevel); //บาท
                            ins.properties.ivz_addresscountry = new MobileCRM.Reference('ivz_addresscountry', Data.countrymaster); //th
                            ins.properties.customertypecode = parseInt(2);
                            ins.properties.accountcategorycode = parseInt(100000001);
                            ins.properties.statuscode = parseInt(917970003);
                            ins.properties.ivz_statuscomplete = parseInt(0);
                            ins.save(function (er) {
                                if (er) {
                                    alert('error ac 902 ' + er);
                                } else {
                                    window.location.href = "#/app/accountcontact/" + $stateParams.getguid.trim();
                                }
                            });
                        } else {
                            var ins = new MobileCRM.DynamicEntity.createNew("account");
                            ins.properties.accountid = $stateParams.getguid.trim();
                            ins.properties.ivz_taxid = $scope.user.txtid;
                            ins.properties.name = $scope.user.txtname;
                            ins.properties.ivz_branch = parseInt($scope.user.branchselect);
                            if ($scope.user.branchselect == 0 || $scope.user.branchselect == '0') {
                                ins.properties.ivz_branchdetail = 'สำนักงานใหญ่';
                                ins.properties.ivz_taxbranch = 'สำนักงานใหญ่';
                            } else {
                                ins.properties.ivz_branchdetail = 'สำนักงานย่อย';
                                ins.properties.ivz_taxbranch = 'สำนักงานย่อย';
                            }
                            ins.properties.ivz_empid = Data.Empid; ///get cookies
                            ins.properties.ivz_satatusempid = parseInt($stateParams.mastertype);
                            ins.properties.territoryid = new MobileCRM.Reference('territory', $stateParams.territoryid); //A02
                            ins.properties.transactioncurrencyid = new MobileCRM.Reference('transactioncurrency', $stateParams.transactioncurrency); //บาท
                            ins.properties.defaultpricelevelid = new MobileCRM.Reference('pricelevel', $stateParams.pricelevel); //บาท
                            ins.properties.ivz_addresscountry = new MobileCRM.Reference('ivz_addresscountry', Data.countrymaster); //th
                            ins.properties.customertypecode = parseInt(2);
                            ins.properties.accountcategorycode = parseInt(100000001);
                            ins.properties.statuscode = parseInt(917970003);
                            ins.properties.ivz_statuscomplete = parseInt(0);
                            ins.save(function (er) {
                                if (er) {
                                    alert('error ac 903 ' + er);
                                } else {
                                    window.location.href = "#/app/accountcontact/" + $stateParams.getguid;
                                }
                            });
                        };
                        $scope.$apply();
                    }, function (er) {
                        alert(er);
                    }, null);
                } catch (er) {
                    alert("step error 907 " + er);
                }
                Data.businessname = $scope.user.txtname;
            }
            ///////////////////////////////////////////////////
        }

        $scope.goback = function () {
            console.log('click back');
            $ionicHistory.goBack(-1);
        }

    })
    .controller('OpenAccountSupCtrl', function ($scope, $state, $stateParams, $cookies, Data, rego, $ionicHistory, $ionicLoading) {
        $state.reload();
        Data.showcart = false;
        var ckUser = $cookies.get('name');
        $scope.masname = $cookies.get('name');
        if (ckUser) {
            $scope.listmaster = [];
            gettername($cookies.get('name'), function (data) {
                if (data) {
                    var x = 0;
                    var loopArray = function (arr) {
                        getPush(x, function () {
                            x++;
                            if (x < arr.length) {
                                loopArray(arr);
                            } else {
                                $scope.showLoadingComplete('โหลดข้อมูลเสร็จแล้ว');
                                setTimeout(function () {
                                    $ionicLoading.hide();
                                }, 2000);
                            }
                        });
                    }
                    loopArray(data);

                    function getPush(i, callback) {
                        $scope.showLoadingProperTimesRegter('โหลดข้อมูลเขตการขาย ' + data[i].description);
                        $scope.listmaster.push({
                            ivz_territorymasterid: data[i].ivz_territorymasterid,
                            ivz_mastername: data[i].ivz_mastername,
                            ivz_leftterritory: data[i].ivz_leftterritory,
                            ivz_emailcontact: data[i].ivz_emailcontact,
                            ivz_leadermail: data[i].ivz_leadermail,
                            ivz_ccmail: data[i].ivz_ccmail,
                            ivz_empid: data[i].ivz_empid,
                            ivz_empname: data[i].ivz_empname,
                            ivz_statusempid: data[i].ivz_statusempid,
                            description: data[i].description
                        });
                        setTimeout(function () {
                            callback();
                        }, 600);
                    }
                }
                $scope.$apply();
            });
        } else {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.playlists', {}, {
                reload: true
            });
        }
        $scope.goaccountlist = function (id) {
            Data.termas = id;
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.openaccount', {
                territoryid: id,
                mastertype: Data.mastertype,
                getguid: guid(),
                pricelevel: Data.pricelevel,
                transactioncurrency: Data.transactioncurrency
            }, {
                reload: true
            });
        }
    })
    /* --------------------------------- Contact ----------------------------------------- */
    .controller('AccountContactCtrl', function ($scope, $state, $stateParams, $cookies, Data, $ionicHistory, $ionicLoading) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;

        //Data.dataguid = $stateParams.getguid;
        $scope.chk = {
            infomatfirstname: true,
            infomatlastname: true,
            infomattelhome: true,
            infomatmobile: true,
            infomatmobilenum: true,
            infomatfax: true,
            infomatemailname: true
        };
        $scope.user = {};
        // $scope.user = {
        //   firstname:'',
        //   lastname:'',
        //   telhome:'',
        //   mobile:'',
        //   fax:'',
        //   emailname:''
        // };
        $scope.chknull = function (idval, chktxt) {
            if (idval == 1) {
                if (chktxt) {
                    $scope.chk.infomatfirstname = true;
                } else {
                    $scope.chk.infomatfirstname = false;
                }
            } else if (idval == 2) {
                if (chktxt) {
                    $scope.chk.infomatlastname = true;
                } else {
                    $scope.chk.infomatlastname = false;
                }
            } else if (idval == 3) {
                var nNum = !(isNaN(chktxt));
                //console.log(nNum);
                if (chktxt) {
                    $scope.chk.infomatmobile = true;
                    if (chktxt.length > 9) {
                        $scope.chk.infomatmobilenum = nNum;
                    } else {
                        $scope.chk.infomatmobile = false;
                    }
                } else {
                    $scope.chk.infomatmobile = false;
                }
            }
        };
        $scope.insertaccount = function () {
            if ($scope.user.firstname) { //Check null Name
                $scope.chk.infomatfirstname = true;
            } else {
                $scope.chk.infomatfirstname = false;
            }

            if ($scope.user.lastname) { //Check null Name
                $scope.chk.infomatlastname = true;
            } else {
                $scope.chk.infomatlastname = false;
            }

            if ($scope.user.mobile) { //Check Null Mobile
                var sNumL = $scope.user.mobile;
                var nNum = !(isNaN($scope.user.mobile));
                if (sNumL.length <= 0) {
                    $scope.chk.infomatmobile = false;
                } else {
                    $scope.chk.infomatmobilenum = nNum;
                    $scope.chk.infomatmobile = true;
                }
            } else {
                $scope.chk.infomatmobile = false;
            }

            if ($scope.chk.infomatfirstname == true && $scope.chk.infomatlastname == true && $scope.chk.infomatmobile == true && $scope.chk.infomatmobilenum == true) {
                //alert('update db :'+$stateParams.getguid.trim());
                $scope.showLoadingProperTimes();
                $scope.genguid = guid();
                //alert($stateParams.getguid+'::::'+$scope.genguid);
                try {
                    var a = new MobileCRM.FetchXml.Entity('contact');
                    a.addAttribute('contactid'); //0
                    var filter = new MobileCRM.FetchXml.Filter();
                    filter.where('contactid', 'eq', $scope.genguid);
                    a.filter = filter;
                    var fetch = new MobileCRM.FetchXml.Fetch(a);
                    fetch.execute('array', function (data) {
                        if (data.length > 0) {
                            var ins = new MobileCRM.DynamicEntity("contact", $scope.genguid);
                            ins.properties.parentcustomerid = new MobileCRM.Reference('account', $stateParams.getguid.trim());
                            ins.properties.firstname = $scope.user.firstname;
                            ins.properties.lastname = $scope.user.lastname;
                            ins.properties.telephone1 = $scope.user.telhome;
                            ins.properties.mobilephone = $scope.user.mobile;
                            ins.properties.fax = $scope.user.fax;
                            ins.properties.emailaddress1 = $scope.user.emailname;
                            ins.properties.statuscode = parseInt(917970001);
                            ins.save(function (er) {
                                if (er) {
                                    alert("ER1087CODE:" + er);
                                }
                            });
                        } else {
                            var ins = new MobileCRM.DynamicEntity.createNew("contact");
                            ins.properties.contactid = $scope.genguid;
                            ins.properties.parentcustomerid = new MobileCRM.Reference('account', $stateParams.getguid.trim());
                            ins.properties.firstname = $scope.user.firstname;
                            ins.properties.lastname = $scope.user.lastname;
                            ins.properties.telephone1 = $scope.user.telhome;
                            ins.properties.mobilephone = $scope.user.mobile;
                            ins.properties.fax = $scope.user.fax;
                            ins.properties.emailaddress1 = $scope.user.emailname;
                            ins.properties.statuscode = parseInt(917970001);
                            ins.save(function (er) {
                                if (er) {
                                    alert("ER1103CODE:" + er);
                                }
                            });
                        };
                        $scope.$apply();
                    }, function (er) {
                        alert(er);
                    }, null);
                    try {
                        var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid.trim());
                        ins.properties.telephone1 = $scope.user.telhome;
                        ins.properties.fax = $scope.user.fax;
                        ins.properties.telephone2 = $scope.user.mobile;
                        ins.properties.emailaddress1 = $scope.user.emailname;
                        ins.properties.ivz_phonemobile = $scope.user.mobile;
                        ins.save(function (er) {
                            if (er) {
                                alert('error ac contact 167 ' + er);
                            }
                        });
                    } catch (er) {
                        alert("error149 " + er);
                    }
                    setTimeout(function () {
                        Data.recivename = $scope.user.firstname + ' ' + $scope.user.lastname;
                        $ionicLoading.hide();
                        window.location.href = "#/app/accountmeetting/" + $stateParams.getguid.trim();
                    }, 3000);
                } catch (er) {
                    alert("insert contact 488:" + er);
                }
            }
            //comment
            //window.location.href="#/app/accountmeetting/"+$stateParams.getguid;
        }
        $scope.goback = function () {
            $ionicHistory.goBack(-1);
        }
    })
    /* --------------------------------- Meetting --------------------------------------- */
    .controller('AccountMeetingCtrl', function ($scope, $state, $stateParams, $cookies, Data, $ionicHistory, $ionicLoading) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;

        //Data.dataguid = $stateParams.getguid;
        $scope.user = {
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
            dataSun: false
        };
        $scope.chk = {
            infomatoptionDay: true,
            infomatoptionBillingDay: true
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
        GetAvailablefromtime(function (data) {
            $scope.datetimer = data;
        });
        $scope.insertaccount = function () {
            try {
                var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid);
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
                ins.save(function (er) {
                    if (er) {
                        alert('error ac 196 ' + er);
                    }
                });
            } catch (er) {
                alert("error300 " + er);
            }
            setTimeout(function () {
                $ionicLoading.hide();
                window.location.href = "#/app/addresstran/" + $stateParams.getguid;
            }, 2000);
            $scope.showLoadingProperTimes();
        }
        $scope.goback = function () {
            $ionicHistory.goBack(-1);
        }
    })



.controller('AccountAddressCtrl', function ($scope, $state, $stateParams, $cookies, Data, $ionicHistory, $ionicLoading, Darray) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;

        //Data.dataguid = $stateParams.getguid;
        $scope.user = {
            txtConName: Data.recivename,
            txtAddressProduct: '',
            optionProvince: '',
            optionDistrict: '',
            txtPostCode: ''
        };
        $scope.chk = {
            infomattxtConName: true,
            infomattxtAddressProduct: true,
            infomatoptionProvince: true,
            infomatoptionDistrict: true,
            infomattxtPostCode: true
        };
        ////////// Get Province
        GetProvinceList(function (data) {
            $scope.ProvinceDataList = data;
            $scope.$apply();
        });
        ////////// Get districtid
        $scope.getdistricttranspot = function (darray) {
                GetDistrictById(darray, function (data) {
                    $scope.DistrictlistTransport = data;
                });
            }
            ///////// check null ///////////////
        $scope.chknull = function (idval, txtname) {
            if (idval == 1) {
                if (txtname) {
                    $scope.chk.infomattxtConName = true;
                } else {
                    $scope.chk.infomattxtConName = false;
                }
            } else if (idval == 2) {
                if (txtname) {
                    $scope.chk.infomattxtAddressProduct = true;
                } else {
                    $scope.chk.infomattxtAddressProduct = false;
                }
            } else if (idval == 3) {
                if (txtname) {
                    $scope.chk.infomattxtPostCode = true;
                } else {
                    $scope.chk.infomattxtPostCode = false;
                }
            }
        }

        $scope.insertaccount = function () {
            if ($scope.user.txtConName) {
                $scope.chk.infomattxtConName = true;
            } else {
                $scope.chk.infomattxtConName = false;
            }
            if ($scope.user.txtAddressProduct) {
                $scope.chk.infomattxtAddressProduct = true;
            } else {
                $scope.chk.infomattxtAddressProduct = false;
            }
            if ($scope.user.optionProvince) {
                $scope.chk.infomatoptionProvince = true;
            } else {
                $scope.chk.infomatoptionProvince = false;
            }
            if ($scope.user.optionDistrict) {
                $scope.chk.infomatoptionDistrict = true;
            } else {
                $scope.chk.infomatoptionDistrict = false;
            }
            if ($scope.user.txtPostCode) {
                $scope.chk.infomattxtPostCode = true;
            } else {
                $scope.chk.infomattxtPostCode = false;
            }

            if ($scope.chk.infomattxtConName == true &&
                $scope.chk.infomattxtAddressProduct == true &&
                $scope.chk.infomatoptionProvince == true &&
                $scope.chk.infomatoptionDistrict == true &&
                $scope.chk.infomattxtPostCode == true) {

                Darray.txtname = $scope.user.txtConName; //Set Parameter
                Darray.txtaddress = $scope.user.txtAddressProduct; //Set Parameter
                Darray.provinceid = $scope.user.optionProvince; //Set Parameter
                Darray.districtid = $scope.user.optionDistrict; //Set Parameter
                Darray.zipcode = $scope.user.txtPostCode; //Set Parameter

                console.log('Update DB');
                try {
                    var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid);
                    ins.properties.address2_addresstypecode = parseInt(2); //delivery
                    ins.properties.address2_name = $scope.user.txtConName;
                    ins.properties.address2_line1 = $scope.user.txtAddressProduct;
                    ins.properties.ivz_address2province = new MobileCRM.Reference('ivz_addressprovince', $scope.user.optionProvince);
                    ins.properties.ivz_address2district = new MobileCRM.Reference('ivz_addressdistrict', $scope.user.optionDistrict);
                    ins.properties.address2_postalcode = $scope.user.txtPostCode;
                    ins.save(function (er) {
                        if (er) {
                            alert('error ac 432 ' + er);
                        }
                    });
                } catch (er) {
                    alert("error436 " + er);
                }
                $scope.loadpage();
            }
            //comment
            //$scope.loadpage();
        }
        $scope.loadpage = function () {
            setTimeout(function () {
                $ionicLoading.hide();
                window.location.href = "#/app/addressinvoice/" + $stateParams.getguid;
            }, 600);
            $scope.showLoadingProperTimes();
        }
        $scope.goback = function () {
            $ionicHistory.goBack(-1);
        }
    })
    .controller('AccountAddressInvoiceCtrl', function ($scope, $state, $stateParams, $cookies, Data, $ionicHistory, $ionicLoading, Darray) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;

        //Data.dataguid = $stateParams.getguid;
        $scope.user = {
            txtConName: Darray.txtname,
            txtAddressProduct: Darray.txtaddress,
            optionProvince: Darray.provinceid,
            optionDistrict: Darray.districtid,
            txtPostCode: Darray.zipcode
        };
        $scope.chk = {
            infomattxtConName: true,
            infomattxtAddressProduct: true,
            infomatoptionProvince: true,
            infomatoptionDistrict: true,
            infomattxtPostCode: true
        };
        ////////// Get Province
        GetProvinceList(function (data) {
            $scope.ProvinceDataList = data;
            $scope.$apply();
        });
        ////////// Get districtid
        $scope.getdistricttranspot = function (darray) {
            //alert(darray+' :p: '+$scope.user.optionProvince)
            GetDistrictById(darray, function (data) {
                $scope.DistrictlistTransport = data;
                $scope.$apply();
            });
        }
        $scope.getdistricttranspot($scope.user.optionProvince);
        ///////// check null ///////////////
        $scope.chknull = function (idval, txtname) {
            if (idval == 1) {
                if (txtname) {
                    $scope.chk.infomattxtConName = true;
                } else {
                    $scope.chk.infomattxtConName = false;
                }
            } else if (idval == 2) {
                if (txtname) {
                    $scope.chk.infomattxtAddressProduct = true;
                } else {
                    $scope.chk.infomattxtAddressProduct = false;
                }
            } else if (idval == 3) {
                if (txtname) {
                    $scope.chk.infomattxtPostCode = true;
                } else {
                    $scope.chk.infomattxtPostCode = false;
                }
            }
        }


        $scope.insertaccount = function () {
            if ($scope.user.txtConName) {
                $scope.chk.infomattxtConName = true;
            } else {
                $scope.chk.infomattxtConName = false;
            }
            if ($scope.user.txtAddressProduct) {
                $scope.chk.infomattxtAddressProduct = true;
            } else {
                $scope.chk.infomattxtAddressProduct = false;
            }
            if ($scope.user.optionProvince) {
                $scope.chk.infomatoptionProvince = true;
            } else {
                $scope.chk.infomatoptionProvince = false;
            }
            if ($scope.user.optionDistrict) {
                $scope.chk.infomatoptionDistrict = true;
            } else {
                $scope.chk.infomatoptionDistrict = false;
            }
            if ($scope.user.txtPostCode) {
                $scope.chk.infomattxtPostCode = true;
            } else {
                $scope.chk.infomattxtPostCode = false;
            }

            if ($scope.chk.infomattxtConName == true &&
                $scope.chk.infomattxtAddressProduct == true &&
                $scope.chk.infomatoptionProvince == true &&
                $scope.chk.infomatoptionDistrict == true &&
                $scope.chk.infomattxtPostCode == true) {
                try {
                    var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid);
                    ins.properties.address1_addresstypecode = parseInt(1); //invoice
                    ins.properties.address1_name = $scope.user.txtConName;
                    ins.properties.address1_line1 = $scope.user.txtAddressProduct;
                    ins.properties.ivz_addressprovince = new MobileCRM.Reference('ivz_addressprovince', $scope.user.optionProvince);
                    ins.properties.ivz_addressdistrict = new MobileCRM.Reference('ivz_addressdistrict', $scope.user.optionDistrict);
                    ins.properties.address1_postalcode = $scope.user.txtPostCode;
                    ins.save(function (er) {
                        if (er) {
                            alert('error ac 512 ' + er);
                        }
                    });
                } catch (er) {
                    alert("error516 " + er);
                }
                console.log('Update DB');
                $scope.loadpage();
            }
            //comment
            //$scope.loadpage();
        }
        $scope.loadpage = function () {
            setTimeout(function () {
                $ionicLoading.hide();
                window.location.href = "#/app/addressother/" + $stateParams.getguid;
            }, 600);
            $scope.showLoadingProperTimes();
        }
        $scope.goback = function () {
            $ionicHistory.goBack(-1);
        }
    })

.controller('AccountAddressOtherCtrl', function ($scope, $stateParams, $cookies, Data, $ionicHistory, $ionicLoading, $state) {
    $state.reload();
    Data.showcart = false;
    $scope.Data = Data;
    //Data.dataguid = $stateParams.getguid;

    $scope.loadpage = function () {
            setTimeout(function () {
                $ionicLoading.hide();
                window.location.href = "#/app/infotransport/" + $stateParams.getguid;
            }, 600);
            $scope.showLoadingProperTimes();
        }
        ////////// Get Province
    GetProvinceList(function (data) {
        $scope.ProvinceDataList = data;
        $scope.$apply();
    });
    ////////// Get districtid
    $scope.getdistricttranspot = function (darray) {
        GetDistrictById(darray, function (data) {
            $scope.DistrictlistTransport = data;
            $scope.$apply();
        });
    }

    $scope.user = {
        txtConName: '',
        txtAddressProduct: '',
        optionProvince: '',
        optionDistrict: '',
        txtPostCode: ''
    };

    $scope.goback = function () {
        $ionicHistory.goBack(-1);
    }
    $scope.insertaccount = function () {
        if ($scope.user.txtConName) {
            try {
                var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid);
                ins.properties.ivz_address3_name = $scope.user.txtConName;
                ins.properties.ivz_docaddress = $scope.user.txtAddressProduct;
                ins.properties.ivz_docprovinceid = new MobileCRM.Reference('ivz_addressprovince', $scope.user.optionProvince);
                ins.properties.ivz_docdistrict = new MobileCRM.Reference('ivz_addressdistrict', $scope.user.optionDistrict);
                ins.properties.ivz_doczipcode = $scope.user.txtPostCode;
                ins.save(function (er) {
                    if (er) {
                        alert('error ac 548 ' + er);
                    }
                });
            } catch (er) {
                alert("error552 " + er);
            }
            console.log('update other address');
        } else {
            console.log('Not Update');
        }
        $scope.loadpage();
    }
})


.controller('AccountTransportCtrl', function ($scope, $stateParams, $cookies, Data, $ionicHistory, $state) {
    $state.reload();
    Data.showcart = false;
    $scope.Data = Data;
    //Data.dataguid = $stateParams.getguid;
    $scope.user = {
        txtTransport: 'รถ YSS',
        telTransport: '08XXXXXXX',
        billvat: false,
        txtRemarkTransport: ''
    };
    $scope.chk = {
        infomattxtTransport: true,
        infomattelTransport: true
    };
    $scope.chknull = function (idval, txtname) {
        if (idval == 1) {
            if (txtname) {
                $scope.chk.infomattxtTransport = true;
            } else {
                $scope.chk.infomattxtTransport = false;
            }
        } else if (idval == 2) {
            if (txtname) {
                $scope.chk.infomattelTransport = true;
            } else {
                $scope.chk.infomattelTransport = false;
            }
        }
    }
    $scope.insertaccount = function () {
        if ($scope.chk.infomattxtTransport == true && $scope.chk.infomattelTransport == true) {
            try {
                var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid);
                ins.properties.ivz_transport = $scope.user.txtTransport;
                ins.properties.ivz_transporttel = $scope.user.telTransport;
                ins.properties.ivz_remarktransporter = $scope.user.txtRemarkTransport;
                ins.properties.ivz_printbillvat = converttrue($scope.user.billvat);
                ins.save(function (er) {
                    if (er) {
                        alert('error ac 613 ' + er);
                    } else {
                        window.location.href = "#/app/document/" + $stateParams.getguid;
                    }
                });
            } catch (er) {
                alert("error617 " + er);
            }
            console.log('Insert DB');
        } else {
            console.log('Not Insert');
        }
    }
    $scope.goback = function () {
        $ionicHistory.goBack(-1);
    }
})


.controller('AccountDocumentCtrl', function ($scope, $stateParams, $cookies, Data, $ionicHistory, $ionicLoading, actype, $state) {
    $state.reload();
    Data.showcart = false;
    $scope.Data = Data;
    //Data.dataguid = $stateParams.getguid;
    $scope.user = {
        peoplela1: false,
        peoplela2: false,
        statustype: '',
        bs1: '',
        bs2: '',
        bs3: '',
        bs4: '',
        bs5: ''
    };
    $scope.chk = {
        docStatus: true,
        doc001: true,
        doc004: true,
        doc005: true
    };


    $scope.loadpage = function () {
        setTimeout(function () {
            $ionicLoading.hide();
        }, 600);
        $scope.showLoadingProperTimesInsert();
    }
    $scope.chkswitch = function (idval, swtrue) {
        $scope.chk.docStatus = true;
        if ($scope.user.statustype) {
            if ($scope.user.statustype == 1) {
                $scope.user.peoplela2 = true;
                //$scope.chk.doc001 = true;
                $scope.user.peoplela1 = false;
            } else if ($scope.user.statustype == 2) {
                $scope.user.peoplela2 = false;
                //$scope.chk.doc001 = false;
                $scope.user.peoplela1 = true;
            }
        }
        ///////////////////////////////////
        if (idval == 1) {
            if (swtrue == true) {
                $scope.user.statustype = 2;
            } else {
                $scope.user.statustype = 1;
            }
        } else if (idval == 2) {
            if (swtrue == true) {
                $scope.user.statustype = 1;
            } else {
                $scope.user.statustype = 2;
            }
        }
    }
    $('#doc001').change(function () {
        GetAtt('#doc001', '#idcImg01', 'canvas01', function (data) {
            $ionicLoading.hide();
            $scope.chk.doc001 = true;
            $scope.user.bs1 = data;
            //console.log(data.length);
        });
    });
    $('#doc002').change(function () {
        GetAtt('#doc002', '#idcImg02', 'canvas02', function (data) {
            $ionicLoading.hide();
            $scope.chk.doc001 = true;
            $scope.user.bs2 = data;
            console.log(data.length);
        });
    });
    $('#doc003').change(function () {
        GetAtt('#doc003', '#idcImg03', 'canvas03', function (data) {
            $ionicLoading.hide();
            $scope.chk.doc001 = true;
            $scope.user.bs3 = data;
        });
    });
    $('#doc004').change(function () {
        GetAtt('#doc004', '#idcImg04', 'canvas04', function (data) {
            $ionicLoading.hide();
            $scope.chk.doc004 = true;
            $scope.user.bs4 = data;
        });
    });
    $('#doc005').change(function () {
        GetAtt('#doc005', '#idcImg05', 'canvas05', function (data) {
            $ionicLoading.hide();
            $scope.chk.doc005 = true;
            $scope.user.bs5 = data;
        });
    });
    $scope.insertaccount = function () {
        var a = $scope.user.bs1;
        var b = $scope.user.bs2;
        var c = $scope.user.bs3;
        var d = $scope.user.bs4;
        var e = $scope.user.bs5;
        if ($scope.user.statustype) {
            $scope.chk.docStatus = true;
            if ($scope.user.statustype == 2) {
                if (a.length >= 1 || b.length >= 1 || c.length >= 1) {
                    $scope.chk.doc001 = true;
                } else {
                    $scope.chk.doc001 = false;
                }
                if (d.length >= 1) {
                    $scope.chk.doc004 = true;
                } else {
                    $scope.chk.doc004 = false;
                }
                if (e.length >= 1) {
                    $scope.chk.doc005 = true;
                } else {
                    $scope.chk.doc005 = false;
                }
                if ($scope.chk.doc001 == true && $scope.chk.doc004 == true && $scope.chk.doc005 == true) {
                    actype.actype = 2;
                    /// insert a
                    if (a.length >= 1) {
                        setTimeout(function () {
                            $scope.InAnnoteAttract('account', Data.dataguid, $scope.user.bs1, 'สำเนาหนังสือรับรองการจดทะเบียนพาณิชย์ร้านของร้าน' + Data.businessname + ' ', 3, function (ert) {
                                if (ert) {
                                    //alert(ert);
                                }
                            });
                            console.log('insert a');
                        }, 10000);
                    }
                    /// insert b
                    if (b.length >= 1) {
                        setTimeout(function () {
                            $scope.InAnnoteAttract('account', Data.dataguid, $scope.user.bs2, 'ทะเบียนภาษีมูลค่าเพิ่ม( ภพ. 20)ของร้าน' + Data.businessname + ' ', 3, function (ert) {
                                if (ert) {
                                    //alert(ert);
                                }
                            });
                            console.log('insert b');
                        }, 15000);
                    }
                    /// insert c
                    if (c.length >= 1) {
                        setTimeout(function () {
                            $scope.InAnnoteAttract('account', Data.dataguid, $scope.user.bs3, 'หนังสือรับรองบริษัทของร้าน' + Data.businessname + ' ', 3, function (ert) {
                                if (ert) {
                                    //alert(ert);
                                }
                            });
                            console.log('insert c');
                        }, 20000);
                    }
                    /// insert d
                    if (d.length >= 1) {
                        $scope.InAnnoteAttract('account', Data.dataguid, $scope.user.bs4, 'สำเนาทะเบียนบ้านของร้าน' + Data.businessname + ' ', 3, function (ert) {
                            if (ert) {
                                //alert(ert);
                            }
                        });
                        console.log('insert d');
                    }
                    /// insert e
                    if (e.length >= 1) {
                        setTimeout(function () {
                            $scope.InAnnoteAttract('account', Data.dataguid, $scope.user.bs5, 'สำเนาประจำตัวบัตรประชาชนของร้าน' + Data.businessname + ' ', 3, function (ert) {
                                if (ert) {
                                    //alert(ert);
                                }
                            });
                            console.log('insert e');
                        }, 6000);
                    }
                    setTimeout(function () {
                        $ionicLoading.hide();
                        window.location.href = "#/app/accountcredit/" + $stateParams.getguid;
                        try {
                            Data.StoreDoc = 1;
                            Data.custermertype = 2;
                            var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid);
                            ins.properties.ivz_statustype = parseInt(2);
                            if (a.length > 1) {
                                ins.properties.ivz_doc01 = parseInt(1);
                            } else {
                                ins.properties.ivz_doc01 = parseInt(0);
                            }
                            if (b.length > 1) {
                                ins.properties.ivz_doc02 = parseInt(1);
                            } else {
                                ins.properties.ivz_doc02 = parseInt(0);
                            }
                            if (c.length > 1) {
                                ins.properties.ivz_doc03 = parseInt(1);
                            } else {
                                ins.properties.ivz_doc03 = parseInt(0);
                            }
                            if (d.length > 1) {
                                ins.properties.ivz_dochouseholdregis = parseInt(1);
                            } else {
                                ins.properties.ivz_dochouseholdregis = parseInt(0);
                            }
                            if (e.length > 1) {
                                ins.properties.ivz_docidcard = parseInt(1);
                            } else {
                                ins.properties.ivz_docidcard = parseInt(0);
                            }
                            ins.save(function (er) {
                                if (er) {
                                    alert('error ac 664 ' + er);
                                }
                            });
                        } catch (er) {
                            alert("error668" + er);
                        }
                        console.log('update people 2');
                    }, 25000);

                } else {
                    console.log('not update');
                }
            } else if ($scope.user.statustype == 1) {
                actype.actype = 1;
                if (d.length >= 1) {
                    $scope.chk.doc004 = true;
                } else {
                    $scope.chk.doc004 = false;
                }
                if (e.length >= 1) {
                    $scope.chk.doc005 = true;
                } else {
                    $scope.chk.doc005 = false;
                }
                if ($scope.chk.doc004 == true && $scope.chk.doc005 == true) {
                    $scope.showLoadingProperTimesReg();
                    /// insert d
                    if (d.length >= 1) {
                        $scope.InAnnoteAttract('account', Data.dataguid, $scope.user.bs4, 'สำเนาทะเบียนบ้านของร้าน' + Data.businessname + ' ', 3, function (ert) {
                            if (ert) {
                                //alert(ert);
                            }
                        });
                        console.log('insert d');
                    }
                    /// insert e
                    if (e.length >= 1) {
                        setTimeout(function () {
                            $scope.InAnnoteAttract('account', Data.dataguid, $scope.user.bs5, 'สำเนาประจำตัวบัตรประชาชนร้าน' + Data.businessname + ' ', 3, function (ert) {
                                if (ert) {
                                    //  alert(ert);
                                }
                            });
                            console.log('insert e');
                        }, 6000);
                    }
                    setTimeout(function () {
                        $ionicLoading.hide();
                        try {
                            Data.StoreDoc = 1;
                            Data.custermertype = 1;
                            var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid);
                            ins.properties.ivz_statustype = parseInt(1);
                            ins.properties.ivz_doc01 = parseInt(0);
                            ins.properties.ivz_doc02 = parseInt(0);
                            ins.properties.ivz_doc03 = parseInt(0);
                            if (d.length > 1) {
                                ins.properties.ivz_dochouseholdregis = parseInt(1);
                            } else {
                                ins.properties.ivz_dochouseholdregis = parseInt(0);
                            }
                            if (e.length > 1) {
                                ins.properties.ivz_docidcard = parseInt(1);
                            } else {
                                ins.properties.ivz_docidcard = parseInt(0);
                            }
                            ins.save(function (er) {
                                if (er) {
                                    alert('error ac 664 ' + er);
                                }
                            });
                        } catch (er) {
                            alert("error668" + er);
                        }
                        window.location.href = "#/app/accountcredit/" + $stateParams.getguid;
                        console.log('update people 1');
                    }, 10000);
                } else {
                    console.log('not update');
                }
            }
        } else {
            $scope.chk.docStatus = false;
        }
        // console.log('Status type:'+$scope.user.statustype);
    }
    $scope.goback = function () {
        $ionicHistory.goBack(-1);
    }
})



.controller('AccountCreditCtrl', function ($scope, $stateParams, $cookies, Data, $compile, actype, $ionicHistory, $ionicLoading, $state) {
        $state.reload();
        $scope.$on('$ionicView.enter',function(){
          Data.showcart = false;
        });
        $scope.Data = Data;
        //Data.mastertype = $stateParams.getguid;
        GetPayMentTerm(function (data) {
            $scope.PaymentTermOptions = data;
        });
        GetPayMentOption(function (data) {
            $scope.PaymentOptions = data;
        });
        GetBankName(function (data) {
            $scope.bankname = data;
        });
        GetBankNameYss(function (data) {
            $scope.banknameyss = data;
        });
        $scope.user = {
            optionPayment: '', //Set SD-
            txtCreditlimit: 0,
            optionPaymentType: '',
            optionPaymentBank: '',
            txtBankAccount: '',
            txtBankBranch: '',
            optionPaymentbnkYss: 917970001 //yss bank กสิกร ออมทรัพย์
        };
        $scope.chk = {
            optionPayment: true,
            txtCreditlimit: true,
            optionPaymentType: true,
            optionPaymentbnkYss: true,
            diabledcredit: false
        };
        if (actype.actype == 1) {
            $scope.user.optionPayment = 100000011; //Set SD-cash
            $scope.user.optionPaymentType = 917970002;
            $scope.chk.diabledcredit = true;
        } else if (actype.actype == 2) {
            $scope.user.optionPayment = 100000014; //Set SD-30 โอน
            $scope.user.optionPaymentType = 917970000;
            $scope.chk.diabledcredit = false;
        }
        $scope.chknull = function (txtname) {
            if (txtname > 1) {
                $scope.chk.txtCreditlimit = true;
            } else {
                $scope.chk.txtCreditlimit = false;
            }
        }
        $scope.insertaccount = function () {
            Data.creditlimit = $scope.user.txtCreditlimit;
            //window.location.href="#/app/infomart/"+$stateParams.getguid;
            if (actype.actype == 1) {
                try {
                    var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid);
                    ins.properties.paymenttermscode = parseInt($scope.user.optionPayment);
                    ins.properties.creditlimit = $scope.user.txtCreditlimit;
                    ins.properties.ivz_paymentoption = parseInt($scope.user.optionPaymentType);
                    ins.properties.ivz_banknamecustomer = parseInt($scope.user.optionPaymentBank);
                    ins.properties.ivz_bankaccount = $scope.user.txtBankAccount;
                    ins.properties.ivz_bankaccountnumber = $scope.user.txtBankBranch;
                    ins.properties.ivz_bankname = $scope.user.optionPaymentbnkYss;
                    ins.save(function (er) {
                        if (er) {
                            alert('error ac 804 ' + er);
                        }
                    });
                } catch (er) {
                    alert("error809" + er);
                }
                console.log('insert credit 1');
                window.location.href = "#/app/infomart/" + $stateParams.getguid;
            } else if (actype.actype == 2) {
                var j = parseInt($scope.user.txtCreditlimit);
                if (j > 0) {
                    try {
                        var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid);
                        ins.properties.paymenttermscode = parseInt($scope.user.optionPayment);
                        ins.properties.creditlimit = $scope.user.txtCreditlimit;
                        ins.properties.ivz_paymentoption = parseInt($scope.user.optionPaymentType);
                        ins.properties.ivz_banknamecustomer = parseInt($scope.user.optionPaymentBank);
                        ins.properties.ivz_bankaccount = $scope.user.txtBankAccount;
                        ins.properties.ivz_bankaccountnumber = $scope.user.txtBankBranch;
                        ins.properties.ivz_bankname = $scope.user.optionPaymentbnkYss;
                        ins.save(function (er) {
                            if (er) {
                                alert('error ac 804 ' + er);
                            }
                        });
                    } catch (er) {
                        alert("error809" + er);
                    }
                    console.log('insert credit 2');
                    $scope.chk.txtCreditlimit = true;
                    window.location.href = "#/app/infomart/" + $stateParams.getguid;
                } else {
                    $scope.chk.txtCreditlimit = false;
                }
            }
        }
        $scope.goback = function () {
            $ionicHistory.goBack(-1);
        }
    })
    /*------------------------------- info mar----------------------------*/
    .controller('AccountInfoMartCtrl', function ($scope, $state, $stateParams, $cookies, Data, $compile, $ionicHistory, $ionicLoading) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        //Data.mastertype = $stateParams.getguid;
        $scope.user = {
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
            tatolnumber: ''
        };
        $scope.chk = {
            SalesPart1: true,
            SalesPart2: true,
            doc006: true,
            PlaceStatus: true,
            tatofactory: true,
            tatolnumber: true
        };
        $scope.removeimg = function (id) {
            console.log(id);
            $('.divimg').remove();
            //console.log("Click remove "+id);
            var data = $scope.user.doc;
            data.splice(id, 1);
            if (data.length > 0) {
                for (var i in data) {
                    var html = '<div class="col col-20 divimg">' +
                        '<img class="thumbnail" src="data:image/jpeg;base64,' + data[i] + '" width="100" height="100" ng-click="removeimg(' + i + ')"/>' +
                        '</div>';
                    angular.element(document.getElementById('divspace')).append($compile(html)($scope));
                }
            }
        }
        $('#doc006').change(function () {
            GetAtt('#doc006', '#idcImg06', 'canvas06', function (data) {
                $('.divimg').remove();
                // 	console.log(data.length);
                $scope.user.doc.push(data);
                var datapush = $scope.user.doc;
                //console.log(datapush.length);
                if (datapush.length > 0) {
                    for (var i in datapush) {
                        var html = '<div class="col col-20 divimg">' +
                            '<img class="thumbnail" src="data:image/jpeg;base64,' + datapush[i] + '" width="100" height="100" ng-click="removeimg(' + i + ')"/>' +
                            '</div>';
                        angular.element(document.getElementById('divspace')).append($compile(html)($scope));
                    }
                } else {
                    var html = '<div class="col col-20">' +
                        '<img class="thumbnail" src="data:image/jpeg;base64,' + data + '่" width="100" height="100"  ng-click="removeimg(' + i + ')"/>' +
                        '</div>';
                    angular.element(document.getElementById('divspace')).append($compile(html)($scope));
                }
            });
        });

        $scope.chknull = function (idval, txtnull) {
            console.log(txtnull);
            if (idval == 1) {
                if (txtnull) {
                    $scope.chk.tatofactory = true;
                } else {
                    $scope.chk.tatofactory = false;
                }
            } else if (idval == 2) {
                if (txtnull) {
                    $scope.chk.tatolnumber = true;
                } else {
                    $scope.chk.tatolnumber = false;
                }
            }
        }
        $scope.insertaccount = function () {
            if ($scope.user.SalePart1 == true || $scope.user.SalePart2 == true || $scope.user.SalePart3 == true) {
                $scope.chk.SalesPart1 = true;
            } else {
                $scope.chk.SalesPart1 = false;
            }
            if ($scope.user.SalePart4 == true || $scope.user.SalePart5 == true || $scope.user.SalePart6 == true) {
                $scope.chk.SalesPart2 = true;
            } else {
                $scope.chk.SalesPart2 = false;
            }
            var j = $scope.user.doc;
            if (j.length > 0) {
                $scope.chk.doc006 = true;
            } else {
                $scope.chk.doc006 = false;
            }
            if ($scope.user.PlaceStatus1 == true || $scope.user.PlaceStatus2 == true) {
                $scope.chk.PlaceStatus = true;
            } else {
                $scope.chk.PlaceStatus = false;
            }
            var a = $scope.user.tatofactory;
            var b = $scope.user.tatolnumber;
            if (a) {
                $scope.chk.tatofactory = true;
            } else {
                $scope.chk.tatofactory = false;
            }
            if (b) {
                $scope.chk.tatolnumber = true;
            } else {
                $scope.chk.tatolnumber = false;
            }

            if ($scope.chk.SalesPart1 == true &&
                $scope.chk.SalesPart2 == true &&
                $scope.chk.doc006 == true &&
                $scope.chk.PlaceStatus == true &&
                $scope.chk.tatofactory == true &&
                $scope.chk.tatolnumber == true) {

                try {
                    $scope.showLoadingProperTimesRegter('กำลังบันทึกข้อมูลเกี่ยวกับร้าน' + Data.businessname);
                    var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid);
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
                    ins.save(function (er) {
                        if (er) {
                            alert('error ac 966 ' + er);
                        }
                    });
                } catch (er) {
                    alert("error970" + er);
                }


                var datapush = $scope.user.doc;
                var x = 0;
                var loopArray = function (arr) {
                    inserta(x, function () {
                        x++;
                        if (x < arr.length) {
                            loopArray(arr);
                        } else {
                            $scope.showLoadingProperTimesRegterComplete();
                            setTimeout(function () {
                                $ionicLoading.hide();
                                $state.go('app.contactus', {
                                    getguid: $stateParams.getguid
                                });
                            }, 2000);
                        }
                    });
                }
                loopArray(datapush);

                function inserta(j, callback) {
                    try {
                        $scope.showLoadingProperTimesRegter('กำลังบันทึกข้อมูลเกี่ยวกับร้าน' + Data.businessname + ' รูปที่ ' + j);
                        var note = MobileCRM.DynamicEntity.createNew("annotation");
                        note.properties.objectid = new MobileCRM.Reference('account', Data.dataguid);
                        note.properties.notetext = 2;
                        note.properties.subject = 'ข้อมูลเกี่ยวกับร้าน' + Data.businessname + ' รูปที่ ' + j;
                        note.properties.documentbody = datapush[j];
                        note.properties.mimetype = fileType;
                        note.properties.isdocument = true;
                        note.properties.filesize = parseInt(sizeKB);
                        note.properties.filename = fileName;
                        note.save(
                            function (er) {
                                if (er) {
                                    alert(Data.businessname + '\n' + er);
                                } else {
                                    callback();
                                }
                            });
                    } catch (er) {
                        alert('insert doc ' + Data.businessname + ' รูปที่ ' + j + '\n' + er);
                    }
                }
            }
        }
        $scope.goback = function () {
            $ionicHistory.goBack(-1);
        }
    })
    /*----------------------- contact us ---------------------------*/
    .controller('AccountContactUsCtrl', function ($scope, Darray, $stateParams, $cookies, Data, arcontact, $compile, $ionicHistory, $ionicLoading, $state) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        //Data.mastertype = $stateParams.getguid;
        console.log('load :' + $stateParams.getguid);
        $scope.getguid = $stateParams.getguid;
        $scope.user = {
            doc: []
        };
        $scope.chk = {
            othercontact: true
        }
        $scope.listcontact = arcontact.contact;
        $scope.removecontact = function (index) {
            $scope.listcontact.splice(index, 1);
        }
        $scope.insertaccount = function () {
            var contact = $scope.listcontact;
            console.log('click ' + contact.length);
            if (contact.length > 0) {
                $scope.chk.othercontact = true;
                var x = 0;
                var loopArray = function (arr) {
                    customInsert(x, function (diug) {
                        customAttract(x, diug, function () {
                            x++;
                            if (x < arr.length) {
                                loopArray(arr);
                            } else {
                                //alert('Complete');
                                $ionicLoading.hide();
                                window.location.href = "#/app/companyus/" + $stateParams.getguid;
                            }
                        });
                    });
                }
                loopArray(contact);

                function customInsert(msg, callback) {
                    //alert('customInsert:'+contact[msg].firstname);
                    try {
                        $scope.showLoadingProperTimesRegter('กำลังบันทึกข้อมูลผู้ติดต่อ ' + contact[msg].firstname + ' ' + contact[msg].lastname);
                        var cuid = guid();
                        var ins = MobileCRM.DynamicEntity.createNew("contact");
                        ins.properties.contactid = cuid;
                        ins.properties.parentcustomerid = new MobileCRM.Reference('account', Data.dataguid);
                        ins.properties.firstname = contact[msg].firstname;
                        ins.properties.lastname = contact[msg].lastname;
                        ins.properties.telephone1 = contact[msg].tel;
                        ins.properties.address1_line1 = Darray.txtaddress;
                        ins.properties.ivz_addressprovince = new MobileCRM.Reference('ivz_addressprovince', Darray.provinceid);
                        ins.properties.ivz_addressdistrict = new MobileCRM.Reference('ivz_addressdistrict', Darray.districtid);
                        ins.properties.address1_postalcode = Darray.zipcode;
                        ins.properties.statuscode = parseInt(917970001);
                        ins.properties.ivz_contacttype = parseInt(contact[msg].contacttype.val);
                        ins.save(function (er) {
                            if (er) {
                                alert("error 2329 " + er);
                            } else {
                                setTimeout(function () {
                                    callback(cuid);
                                }, 1000);
                            }
                        });
                    } catch (er) {
                        alert('error 2351 ' + er);
                    }
                }

                function customAttract(msg, diug, callback) {
                    var docl = contact[msg].doc;
                    //alert('customAttract:'+contact[msg].firstname+'::'+docl.length);
                    var title = contact[msg].firstname + ' ' + contact[msg].lastname + ' ผู้ติดต่อร้าน ' + Data.businessname;
                    $scope.InAnnoteAttract('contact', diug, contact[msg].doc, title, 1, function (er) {
                        if (er) {
                            setTimeout(function () {
                                callback();
                            }, 2000);
                        }
                    });
                }
                console.log('insert contact');
            } else {
                $scope.chk.othercontact = false;
                console.log('Not insert');
            }
        }
        $scope.goback = function () {
            $ionicHistory.goBack(-1);
        }
    })
    .controller('AccountContactUsAddCtrl', function ($scope, $stateParams, $cookies, Data, arcontact, $compile, $ionicHistory, $ionicLoading, $state) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        //Data.mastertype = $stateParams.getguid;
        $scope.getguid = $stateParams.getguid;
        $scope.user = {
            firstname: '',
            lastname: '',
            tel: '',
            type: '',
            contact: [],
            doc: ''
        };
        GetOptionContact(function (data) {
            $scope.contacttype = data;
        });

        $('#doc081').change(function () {
            GetAtt('#doc081', '#idcImg081', 'canvas081', function (data) {
                $scope.user.doc = data;
                $ionicLoading.hide();
            });
        });
        $scope.listcontact = $scope.user.contact;
        $scope.addcontact = function () {
            var j = $scope.user.contact;
            arcontact.contact.push({
                id: j.length + 1,
                firstname: $scope.user.firstname,
                lastname: $scope.user.lastname,
                tel: $scope.user.tel,
                contacttype: $scope.user.type,
                doc: $scope.user.doc
            });
            this.goback2();
        }
        $scope.insertaccount = function () {

        }
        $scope.goback2 = function () {
            $scope.user.firstname = '';
            $scope.user.lastname = '';
            $scope.user.tel = '';
            $scope.user.type = '';
            $scope.user.doc = '';
            $('#idcImg081').attr('src', '');
            $scope.listcontact = $scope.user.contact;
            window.location.href = "#/app/contactus/" + $stateParams.getguid;
        }
        $scope.goback = function () {
            $ionicHistory.goBack(-1);
        }
    })

.controller('AccountCompanyCtrl', function ($scope, $stateParams, $cookies, Data, $compile, $ionicHistory, $ionicLoading, arcontact, $state) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        $scope.getguid = $stateParams.getguid;
        $scope.chk = {
            othercontact: true
        }
        $scope.listcompany = arcontact.company;
        $scope.removecontact = function (index) {
            $scope.listcompany.splice(index, 1);
        }
        $scope.insertcompany = function () {
            //alert('Click');
            var cota = $scope.listcompany;
            if (cota.length > 0) {
                var x = 0;
                var loopArray = function (arr) {
                    insertdocu(x, function () {
                        //alert('Inser company:'+x);
                        x++;
                        if (x < arr.length) {
                            loopArray(arr);
                        } else {
                            $ionicLoading.hide();
                            window.location.href = "#/app/confirmreg/" + $stateParams.getguid;
                        }
                    });
                }
                loopArray($scope.listcompany);

                function insertdocu(i, callback) {
                    if (cota[i].companyname) {
                        $scope.showLoadingProperTimesRegter('กำลังบันทึกข้อมูลติดต่อกับร้านค้า ' + cota[i].companyname);
                        console.log("insert cota");
                        try {
                            var ins = MobileCRM.DynamicEntity.createNew("ivz_custconnectiontable");
                            ins.properties.ivz_historycusttable = new MobileCRM.Reference('account', Data.dataguid);
                            ins.properties.ivz_name = cota[i].companyname;
                            ins.properties.ivz_ownername = cota[i].firstlastname;
                            ins.properties.ivz_phonemobile = cota[i].tel;
                            ins.properties.ivz_phonenumber = cota[i].tel;
                            ins.properties.ivz_salepoduct = cota[i].itemtype;
                            ins.save(
                                function (er) {
                                    if (er) {
                                        alert('error2424 ' + er);
                                    } else {
                                        callback();
                                    }
                                });
                        } catch (er) {
                            alert('error 2431 ' + er);
                        }
                    }
                }
                console.log('insert DB');
            } else {
                console.log('not update');
                window.location.href = "#/app/confirmreg/" + $stateParams.getguid;
            }
        }
        $scope.goback = function () {
            $ionicHistory.goBack(-1);
        }
    })
    .controller('AccountCompanyAddCtrl', function ($scope, $stateParams, $cookies, Data, $compile, $ionicHistory, $ionicLoading, arcontact, $state) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        $scope.getguid = $stateParams.getguid;
        $scope.user = {
            companyname: '',
            firstlastname: '',
            orderper: '',
            tel: '',
            itemtype: ''
        };
        $scope.addcompany = function () {
            arcontact.company.push({
                companyname: $scope.user.companyname,
                firstlastname: $scope.user.firstlastname,
                orderper: $scope.user.orderper,
                tel: $scope.user.tel,
                itemtype: $scope.user.itemtype
            });
            this.goback();
        }
        $scope.goback = function () {
            $scope.user.companyname = '';
            $scope.user.firstlastname = '';
            $scope.user.orderper = '';
            $scope.user.tel = '';
            $scope.user.itemtype = '';
            window.location.href = "#/app/companyus/" + $stateParams.getguid;
        };
    })
    /*------------------------- Confirm Account -------------------------*/
    .controller('AccountConfirmCtrl', function ($scope, $state, $stateParams, $cookies, Data, $compile, $ionicHistory, $ionicLoading, $ionicViewService) {
        $state.reload();
        $scope.$on('$ionicView.enter',function(){
          Data.showcart = false;
        });
        $scope.Data = Data;
        $scope.getguid = $stateParams.getguid;
        $scope.chk = {
            infomat: ''
        };
        $scope.territoryid = $cookies.get('territoryid'); // set default from login
        var tol = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130];
        var tltxt = ['กำลังทำการบันทึกข้อมูลทั่วไป', 'กำลังทำการบันทึกข้อมูลเงื่อนไขการเข้าพบ', 'กำลังทำการบันทึกข้อมูลที่อยู่ส่งของ'
            , 'กำลังทำการบันทึกข้อมูลที่อยู่ Invoice', 'กำลังทำการบันทึกที่อยู่อื่นๆ'
            , 'กำลังทำการบันทึกข้อมูลที่อยู่ขนส่ง', 'กำลังทำการบันทึกข้อมูลเอกสารประกอบการเปิดบัญชี'
            , 'กำลังทำการบันทึกข้อมูลเครดิต', 'กำลังทำการบันทึกข้อมูลร้านค้า'
            , 'กำลังทำการบันทึกข้อมูลผู้ติดต่อข้อมูลร้านค้าที่ติดต่อ', 'กำลังทำการบันทึกยืนยันการเปิดบัญชี'
            , 'โปรดรอสักครู่', 'บันทึกข้อมูลเสร็จแล้ว'];

        var x = 0;
        var loopArray = function (arr) {
            updatecomfirm(x, function () {
                x++;
                if (x < arr.length) {
                    loopArray(arr);
                } else {
                    getTerEmp($scope.territoryid, function (data) {
                        if (data) {
                            confirmnew(function () {
                                try {
                                    insertTask(function () {
                                        if(Data.creditlimit > 100000){
                                          var title = 'เปิดบัญชีลูกค้าใหม่';
                                          var text = "เรียน  Sup./Sales Manger, รบกวนดำเนินการอนุมัติเปิดบัญชีลูกค้าใหม่เขตการขาย " + data[0].name + "  ลูกค้าชื่อ " +
                                              Data.listregist + " ให้ด้วยครับ  ขอบคุณครับ  (อีเมลฉบับนี้ส่งอัตโนมัติจากระบบ CRM)";
                                          SendMail(data[0].ivz_leadermail, title, text);
                                        }else{
                                          var title = 'เปิดบัญชีลูกค้าใหม่';
                                          var text = "เรียน  Sup./Sales Manger, รบกวนดำเนินการอนุมัติเปิดบัญชีลูกค้าใหม่เขตการขาย " + data[0].name + "  ลูกค้าชื่อ " +
                                              Data.listregist + " ให้ด้วยครับ  ขอบคุณครับ  (อีเมลฉบับนี้ส่งอัตโนมัติจากระบบ CRM)";
                                          SendMail(data[0].ivz_leadermail+';'+data[0].ivz_ccmail, title, text);
                                        }
                                        setTimeout(function () {
                                            $ionicLoading.hide();
                                            $ionicHistory.nextViewOptions({
                                                disableBack: true
                                            });
                                            $state.go('app.accountlist', {
                                                terriid: Data.termas,
                                                mastertype: Data.mastertype
                                            }, {
                                                reload: true
                                            });
                                        }, 2000);
                                    });
                                } catch (er) {
                                    alert('error 2888 ' + er);
                                }
                            });
                        }
                    });

                }
            });
        }
        loopArray(tltxt);
        /*-------------------- updatecomfirm -------------------------*/
        function updatecomfirm(i, callback) {
            $scope.showLoadingProperTimesRegter(tltxt[i]);
            $scope.chk.infomat = parseInt(tol[i]);
            setTimeout(function () {
                callback();
            }, 2000);
        }

        function insertTask(callback) {
            try {
                var ins = new MobileCRM.DynamicEntity.createNew("ivz_tasknewaccount");
                ins.properties.ivz_name = Data.listregist;
                ins.properties.ivz_customer = new MobileCRM.Reference('account', Data.dataguid);
                ins.properties.ivz_saletype = parseInt(Data.mastertype);
                ins.properties.ivz_statusdoc = parseInt(Data.StoreDoc);
                ins.properties.ivz_statuscustomer = parseInt(Data.custermertype);
                ins.properties.ivz_territory = new MobileCRM.Reference('territory', Data.termas);
                ins.properties.ivz_statuscomplete = parseInt(3); //new Account
                ins.save(function (er) {
                    if (er) {
                        alert('error ac 2897 tasknew ' + er);
                    } else {
                        callback();
                    }
                });
            } catch (er) {
                alert("error2919" + er);
            }
        }

        function confirmnew(callback) {
            try {
                var ins = new MobileCRM.DynamicEntity("account", $stateParams.getguid);
                ins.properties.statuscode = parseInt(917970000);
                ins.properties.ivz_statuscomplete = parseInt(2);
                ins.properties.address1_latitude = parseFloat(Data.latitude);
                ins.properties.address1_longitude = parseFloat(Data.longitude);
                ins.save(function (er) {
                    if (er) {
                        alert('error ac 2932 confirm ' + er);
                    } else {
                        callback();
                    }
                });
            } catch (er) {
                alert("error2938" + er);
            }
            //console.log('update guid sendmail'+ $scope.chk.infomat);
        }
        $scope.goback = function () {
            $ionicHistory.goBack(-1);
        }
    })
    ////////////////////// end /////////////////


/////////////////// Account List //////////////
.controller('AccountListSupCtrl', function ($scope, $state, $stateParams, $cookies, Data, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        var ckUser = $cookies.get('name');
        $scope.masname = $cookies.get('name');
        if (ckUser) {
            $scope.listmaster = [];
            gettername($cookies.get('name'), function (data) {
                if (data) {
                    var x = 0;
                    var loopArray = function (arr) {
                        getPush(x, function () {
                            x++;
                            if (x < arr.length) {
                                loopArray(arr);
                            } else {
                                $scope.showLoadingComplete('โหลดข้อมูลเสร็จแล้ว');
                                setTimeout(function () {
                                    $ionicLoading.hide();
                                }, 2000);
                            }
                        });
                    }
                    loopArray(data);

                    function getPush(i, callback) {
                        $scope.showLoadingProperTimesRegter('โหลดข้อมูลเขตการขาย ' + data[i].description);
                        $scope.listmaster.push({
                            ivz_territorymasterid: data[i].ivz_territorymasterid,
                            ivz_mastername: data[i].ivz_mastername,
                            ivz_leftterritory: data[i].ivz_leftterritory,
                            ivz_emailcontact: data[i].ivz_emailcontact,
                            ivz_leadermail: data[i].ivz_leadermail,
                            ivz_ccmail: data[i].ivz_ccmail,
                            ivz_empid: data[i].ivz_empid,
                            ivz_empname: data[i].ivz_empname,
                            ivz_statusempid: data[i].ivz_statusempid,
                            description: data[i].description
                        });
                        setTimeout(function () {
                            callback();
                        }, 600);
                    }
                }
                $scope.$apply();
            });

        } else {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.playlists', {}, {
                reload: true
            });
        }
        $scope.goaccountlist = function (id) {
            Data.termas = id;
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.accountlist', {
                terriid: id,
                mastertype: Data.mastertype
            }, {
                reload: true
            });
        }
    })
    .controller('AccountListCtrl', function ($scope, $state, $stateParams, $cookies, Data, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        var ckUser = $cookies.get('ivz_empid');
        if (ckUser) {
            $scope.Data = Data;
            $ionicHistory.clearHistory();
            $scope.territoryid = $stateParams.terriid;
            $scope.filtertxt = '';
            $scope.listaccount = [];
            GetAccount($stateParams.terriid, Data.mastertype, 1, function (data) {
                $scope.showLoadingProperTimesRegter('โหลดข้อมูล');
                if (data) {
                    var x = 0;
                    var loopArray = function (arr) {
                        getPush(x, function () {
                            x++;
                            if (x < arr.length) {
                                loopArray(arr);
                            } else {
                                $scope.showLoadingComplete('โหลดข้อมูลเสร็จแล้ว');
                                setTimeout(function () {
                                    $ionicLoading.hide();
                                }, 2000);
                            }
                        });
                    }
                    loopArray(data);

                    function getPush(i, callback) {
                        if (data[i].statuscode == 1 || data[i].statuscode == '1') {
                            $scope.showLoadingProperTimesRegter('โหลดข้อมูลของ ' + data[i].name);
                            $scope.listaccount.push({
                                accountid: data[i].accountid,
                                name: data[i].name,
                                ivz_addresscountry: data[i].ivz_addresscountry,
                                ivz_addressprovince: data[i].ivz_addressprovince,
                                ivz_addressdistrict: data[i].ivz_addressdistrict,
                                ivz_availablefromtime: data[i].ivz_availablefromtime,
                                ivz_availabletotime: data[i].ivz_availabletotime,
                                territoryid: data[i].territoryid,
                                customertypecode: data[i].customertypecode,
                                statuscode: data[i].statuscode,
                                accountnumber: data[i].accountnumber,
                                filtername: data[i].filtername,
                                ivz_customer: data[i].ivz_customer,
                                accountype: data[i].accountype,
                                ivz_statuscomplete: data[i].ivz_statuscomplete,
                                remarkreject: data[i].remarkreject,
                                ivz_taxid: data[i].ivz_taxid,
                                customertypecode: data[i].customertypecode
                            });
                        }
                        setTimeout(function () {
                            callback();
                        }, 25);
                    }
                }
                $scope.$apply();
            });
            $scope.openaccount = function () {
                $state.go('app.openaccount', {
                    territoryid: Data.termas,
                    mastertype: Data.mastertype,
                    getguid: guid(),
                    pricelevel: Data.pricelevel,
                    transactioncurrency: Data.transactioncurrency
                }, {
                    reload: true
                });
            };
            $scope.reloaddata = function () {
                    $scope.showLoadingProperTimesRegter('โหลดข้อมูล');
                    $scope.listaccount = [];
                    GetAccount($cookies.get('territoryid'), Data.mastertype, 1, function (data) {
                        $scope.showLoadingProperTimesRegter('โหลดข้อมูล');
                        if (data) {
                            var x = 0;
                            var loopArray = function (arr) {
                                getPush(x, function () {
                                    x++;
                                    if (x < arr.length) {
                                        loopArray(arr);
                                    } else {
                                        $scope.showLoadingComplete('โหลดข้อมูลเสร็จแล้ว');
                                        setTimeout(function () {
                                            $ionicLoading.hide();
                                        }, 2000);
                                    }
                                });
                            }
                            loopArray(data);

                            function getPush(i, callback) {
                                if (data[i].statuscode == 1 || data[i].statuscode == '1') {
                                    $scope.showLoadingProperTimesRegter('โหลดข้อมูลของ ' + data[i].name);
                                    $scope.listaccount.push({
                                        accountid: data[i].accountid,
                                        name: data[i].name,
                                        ivz_addresscountry: data[i].ivz_addresscountry,
                                        ivz_addressprovince: data[i].ivz_addressprovince,
                                        ivz_addressdistrict: data[i].ivz_addressdistrict,
                                        ivz_availablefromtime: data[i].ivz_availablefromtime,
                                        ivz_availabletotime: data[i].ivz_availabletotime,
                                        territoryid: data[i].territoryid,
                                        customertypecode: data[i].customertypecode,
                                        statuscode: data[i].statuscode,
                                        accountnumber: data[i].accountnumber,
                                        filtername: data[i].filtername,
                                        ivz_customer: data[i].ivz_customer,
                                        accountype: data[i].accountype,
                                        ivz_statuscomplete: data[i].ivz_statuscomplete,
                                        remarkreject: data[i].remarkreject,
                                        ivz_taxid: data[i].ivz_taxid,
                                        customertypecode: data[i].customertypecode
                                    });
                                }
                                setTimeout(function () {
                                    callback();
                                }, 25);
                            }
                        }
                        $scope.$apply();
                    });
                }
                //$scope.filtertype = 0 = no,1=complete,2=wait,3=reject,4=yes
            $scope.filtertype = '';
            $scope.setfilter = function (txtfilter) {
                $scope.listaccount = [];
                GetAccount($cookies.get('territoryid'), Data.mastertype, 1, function (data) {
                    $scope.showLoadingProperTimesRegter('โหลดข้อมูล');
                    if (data) {
                        var x = 0;
                        var loopArray = function (arr) {
                            getPush(x, function () {
                                x++;
                                if (x < arr.length) {
                                    loopArray(arr);
                                } else {
                                    $scope.showLoadingComplete('โหลดข้อมูลเสร็จแล้ว');
                                    setTimeout(function () {
                                        $ionicLoading.hide();
                                    }, 2000);
                                }
                            });
                        }
                        loopArray(data);

                        function getPush(i, callback) {
                            if (data[i].statuscode == txtfilter) {
                                $scope.showLoadingProperTimesRegter('โหลดข้อมูลของ ' + data[i].name);
                                $scope.listaccount.push({
                                    accountid: data[i].accountid,
                                    name: data[i].name,
                                    ivz_addresscountry: data[i].ivz_addresscountry,
                                    ivz_addressprovince: data[i].ivz_addressprovince,
                                    ivz_addressdistrict: data[i].ivz_addressdistrict,
                                    ivz_availablefromtime: data[i].ivz_availablefromtime,
                                    ivz_availabletotime: data[i].ivz_availabletotime,
                                    territoryid: data[i].territoryid,
                                    customertypecode: data[i].customertypecode,
                                    statuscode: data[i].statuscode,
                                    accountnumber: data[i].accountnumber,
                                    filtername: data[i].filtername,
                                    ivz_customer: data[i].ivz_customer,
                                    accountype: data[i].accountype,
                                    ivz_statuscomplete: data[i].ivz_statuscomplete,
                                    remarkreject: data[i].remarkreject,
                                    ivz_taxid: data[i].ivz_taxid,
                                    customertypecode: data[i].customertypecode
                                });
                            }
                            setTimeout(function () {
                                callback();
                            }, 25);
                        }
                    }
                    $scope.$apply();
                });
            }
            $scope.setfilterPendding = function (txtfilter, txtfilter2) {
                //alert(txtfilter);
                $scope.showLoadingProperTimes();
                $scope.listaccount = [];
                GetAccount($cookies.get('territoryid'), Data.mastertype, 1, function (data) {
                    $scope.showLoadingProperTimesRegter('โหลดข้อมูล');
                    if (data) {
                        var x = 0;
                        var loopArray = function (arr) {
                            getPush(x, function () {
                                x++;
                                if (x < arr.length) {
                                    loopArray(arr);
                                } else {
                                    $scope.showLoadingComplete('โหลดข้อมูลเสร็จแล้ว');
                                    setTimeout(function () {
                                        $ionicLoading.hide();
                                    }, 2000);
                                }
                            });
                        }
                        loopArray(data);

                        function getPush(i, callback) {
                            if (data[i].statuscode == txtfilter || data[i].statuscode == txtfilter2) {
                                $scope.showLoadingProperTimesRegter('โหลดข้อมูลของ ' + data[i].name);
                                $scope.listaccount.push({
                                    accountid: data[i].accountid,
                                    name: data[i].name,
                                    ivz_addresscountry: data[i].ivz_addresscountry,
                                    ivz_addressprovince: data[i].ivz_addressprovince,
                                    ivz_addressdistrict: data[i].ivz_addressdistrict,
                                    ivz_availablefromtime: data[i].ivz_availablefromtime,
                                    ivz_availabletotime: data[i].ivz_availabletotime,
                                    territoryid: data[i].territoryid,
                                    customertypecode: data[i].customertypecode,
                                    statuscode: data[i].statuscode,
                                    accountnumber: data[i].accountnumber,
                                    filtername: data[i].filtername,
                                    ivz_customer: data[i].ivz_customer,
                                    accountype: data[i].accountype,
                                    ivz_statuscomplete: data[i].ivz_statuscomplete,
                                    remarkreject: data[i].remarkreject,
                                    ivz_taxid: data[i].ivz_taxid,
                                    customertypecode: data[i].customertypecode
                                });
                            }
                            setTimeout(function () {
                                callback();
                            }, 25);
                        }
                    }
                    $scope.$apply();
                });
            }
        } else {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.playlists', {}, {
                reload: true
            });
        }
    })
    /*------------------------------- account editor ---------------------------*/
    .controller('AccountEditorCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data; //accountid;accountname
        Data.mastertype = $stateParams.mastertype;
        Data.getparaaccount = $stateParams.accountid;
        Data.getparaname = $stateParams.accountname;
        Data.gettxtid = $stateParams.accounttxtid;
        $scope.uistate = function () {
            $state.go('app.openaccount', {
                territoryid: Data.termas,
                mastertype: Data.mastertype,
                getguid: $stateParams.accountid,
                pricelevel: Data.pricelevel,
                transactioncurrency: Data.transactioncurrency
            }, {
                reload: true
            });
        }
        $scope.deteaccount = function () {
            $scope.showLoadingProperTimes();
            try {
                var ins = new MobileCRM.DynamicEntity("account", $stateParams.accountid);
                ins.properties.statuscode = parseInt(2);
                ins.properties.ivz_statuscomplete = parseInt(0);
                ins.save(function (er) {
                    if (er) {
                        alert('error deteaccount 2697 ' + er);
                    } else {
                        setTimeout(function () {
                            $ionicLoading.hide();
                            $ionicHistory.goBack(-1);
                        }, 2000);
                    }
                });
            } catch (er) {
                alert("error27006" + er);
            }
        }
    })
    /*-------------------------- Wait Controller -------------------------*/
    .controller('WaitCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.mastertype = $stateParams.mastertype;
        $scope.typego = $stateParams.typego;
        //:masname/:mastertype/:typego
        $scope.listmaster = [];
        gettername($cookies.get('name'), function (data) {
            if (data) {
                var x = 0;
                var loopArray = function (arr) {
                    getPush(x, function () {
                        x++;
                        if (x < arr.length) {
                            loopArray(arr);
                        } else {
                            $scope.showLoadingComplete('โหลดข้อมูลเสร็จแล้ว');
                            setTimeout(function () {
                                $ionicLoading.hide();
                            }, 2000);
                        }
                    });
                }
                loopArray(data);

                function getPush(i, callback) {
                    $scope.showLoadingProperTimesRegter('โหลดข้อมูลเขตการขาย ' + data[i].description);
                    $scope.listmaster.push({
                        ivz_territorymasterid: data[i].ivz_territorymasterid,
                        ivz_mastername: data[i].ivz_mastername,
                        ivz_leftterritory: data[i].ivz_leftterritory,
                        ivz_emailcontact: data[i].ivz_emailcontact,
                        ivz_leadermail: data[i].ivz_leadermail,
                        ivz_ccmail: data[i].ivz_ccmail,
                        ivz_empid: data[i].ivz_empid,
                        ivz_empname: data[i].ivz_empname,
                        ivz_statusempid: data[i].ivz_statusempid,
                        description: data[i].description
                    });
                    setTimeout(function () {
                        callback();
                    }, 10);
                }
            }
            $scope.$apply();
        });
        $scope.clickgo = function (idter) {
            if ($stateParams.typego == 1 || $stateParams.typego == '1') {
                $state.go('app.waitaccount', {
                    terid: idter
                }, {
                    reload: true
                });
            }
        }
    })
    .controller('WaitAccountCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        $scope.$on('$ionicView.enter',function(){
          Data.showcart = false;
          $scope.Data = Data;
          $scope.loaddata();
        });
        $scope.loaddata = function(){
          $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล');
          $scope.loadaccount();
        }
        $scope.loadaccount = function(){
          $scope.listaccount = [];
          GetAccount($stateParams.terid,Data.mastertype,1,function(data){
            //alert(data.length);
            if(data.length > 0){
              var x = 0;
              var loopArray = function(arr){
                loopPush(x,function(){
                  x++;
                  if(x < arr.length){
                    loopArray(arr);
                  }else{
                    $ionicLoading.hide();
                  }
                });
              }
              loopArray(data);
              function loopPush(i,callback){
                switch (data[i].statuscode) {
                  case 917970000:
                  case '917970000':
                  $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล : '+data[i].name);
                        $scope.listaccount.push({
                          accountid:data[i].accountid,
                          name:data[i].name,
                          ivz_addresscountry:data[i].ivz_addresscountry,
                          ivz_addressprovince:data[i].ivz_addressprovince,
                          ivz_addressdistrict:data[i].ivz_addressdistrict,
                          ivz_availablefromtime:data[i].ivz_availablefromtime,
                          ivz_availabletotime:data[i].ivz_availabletotime,
                          territoryid:data[i].territoryid,
                          customertypecode:data[i].customertypecode,
                          statuscode:data[i].statuscode,
                          accountnumber:data[i].accountnumber,
                          filtername:data[i].filtername,
                          ivz_customer:data[i].ivz_customer,
                          accountype:data[i].accountype,
                          ivz_statuscomplete:data[i].ivz_statuscomplete,
                          remarkreject:data[i].remarkreject,
                          ivz_taxid:data[i].ivz_taxid,
                          customertypecode:data[i].customertypecode,
                          statustype:data[i].statustype,
                          ivz_doc01:data[i].ivz_doc01,
                          ivz_doc02:data[i].ivz_doc02,
                          ivz_doc03:data[i].ivz_doc03,
                          ivz_dochouseholdregis:data[i].ivz_dochouseholdregis,
                          ivz_docidcard:data[i].ivz_docidcard,
                          matchtype:data[i].matchtype,
                          statusempid:data[i].statusempid,
                          ivz_balancecredit:data[i].ivz_balancecredit,
                          ivz_integrationid:data[i].ivz_integrationid
                        });
                        setTimeout(function(){
                          callback();
                        },5);
                    break;
                  default:
                  callback();
                }
              }
            }
          });
        }
        $scope.detailaccount = function(accountid,statustype,balancecredit,territoryid,accountname){
          alert(accountid+'\n'+
                statustype+'\n'+
                balancecredit+'\n'+
                territoryid+'\n'+
                accountname);
          $state.go('app.accountdetailnew',{accountid:accountid,statustype:statustype,credit:balancecredit,terid:territoryid,acname:accountname},{reload:true});
        };
    })
    .controller('WaitListCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        $scope.gotoleft = function (txt) {
            if (txt == 0 || txt == '0') {
                $state.go('app.approveplanning', {
                    mastertype: Data.mastertype
                });
            } else if (txt == 1 || txt == '1') {
                $state.go('app.waitapprove', {
                    masname: $cookies.get('name'),
                    mastertype: Data.mastertype,
                    typego: 1
                }, {
                    reload: true
                });
            } else if (txt == 2 || txt == '2') {
                $state.go('app.waitapproveadjust', {
                    masname: $cookies.get('name'),
                    mastertype: Data.mastertype,
                    typego: 1
                }, {
                    reload: true
                });
            } else if (txt == 3 || txt == '3') {
                $state.go('app.waitapproveorder', {
                    masname: $cookies.get('name'),
                    mastertype: Data.mastertype,
                    typego: 2
                }, {
                    reload: true
                });
            }
        }
    })

.controller('WaitAccountRejectCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, arrlist) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.mastertype = $stateParams.mastertype;
        //$stateParams.salename,$stateParams.tername
        $scope.salename = $stateParams.salename;
        $scope.tername = $stateParams.tername;
        $scope.txtreject;
        $scope.txthidden = true;
        $scope.user = {
                txtreject: ''
            }
            /*-------------reject account ---------------*/
        $scope.confirmreject = function (comment) {
            var listac = arrlist.listac;
            if (comment) {
                $scope.txthidden = true;
                var x = 0;
                var loopArray = function (arr) {
                    //  alert(x);
                    upins(x, function () {
                        x++;
                        if (x < arr.length) {
                            loopArray(arr);
                        } else {
                            $ionicLoading.hide();
                            var terid = listac[0].territoryid;
                            //alert(terid.id);
                            getTerEmp(terid.id, function (data) {
                                if (data) {
                                    var title = 'ไม่อนุมัติเปิดบัญชีลูกค้าใหม่';
                                    var text = "เรียน พนักงานขายเขต " + data[0].name + " ไม่สามารถเปิดบัญชีลูกค้าใหม่ได้เนื่องจาก" + comment +
                                        " ขอบคุณครับ  (อีเมลฉบับนี้ส่งอัตโนมัติจากระบบ CRM)";
                                    SendMail(data[0].ivz_emailcontact, title, text);
                                    setTimeout(function () {
                                        $ionicHistory.goBack(-1);
                                    }, 2000);
                                }
                                $scope.$apply();
                            });
                        }
                    });
                }
                loopArray(listac);

                function upins(i, callback) {
                    $scope.showLoadingProperTimesRegter('บันทึกข้อมูลลูกค้า ' + listac[i].name);
                    var ins = new MobileCRM.DynamicEntity('account', listac[i].accountid);
                    ins.properties.statuscode = parseInt(917970003);
                    ins.properties.ivz_remarkreject = comment;
                    ins.save(function (es) {
                        if (es) {
                            alert('error 2918 ' + es);
                        } else {
                            setTimeout(function () {
                                callback();
                            }, 1000);
                        }
                    });
                }
            } else {
                $scope.txthidden = false;
            }
        };
        $scope.cancelback = function () {
            $ionicHistory.goBack(-1);
        }
    })
    .controller('WaitAdjustCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, arrlist) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        $scope.reloaddata = function () {
            $scope.listmaster = [];
            gettername($cookies.get('name'), function (data) {
                if (data) {
                    var x = 0;
                    var loopArray = function (arr) {
                        getPush(x, function () {
                            x++;
                            if (x < arr.length) {
                                loopArray(arr);
                            } else {
                                $scope.showLoadingComplete('โหลดข้อมูลเสร็จแล้ว');
                                setTimeout(function () {
                                    $ionicLoading.hide();
                                }, 2000);
                            }
                        });
                    }
                    loopArray(data);

                    function getPush(i, callback) {
                        $scope.showLoadingProperTimesRegter('โหลดข้อมูลเขตการขาย ' + data[i].description);
                        $scope.listmaster.push({
                            ivz_territorymasterid: data[i].ivz_territorymasterid,
                            ivz_mastername: data[i].ivz_mastername,
                            ivz_leftterritory: data[i].ivz_leftterritory,
                            ivz_emailcontact: data[i].ivz_emailcontact,
                            ivz_leadermail: data[i].ivz_leadermail,
                            ivz_ccmail: data[i].ivz_ccmail,
                            ivz_empid: data[i].ivz_empid,
                            ivz_empname: data[i].ivz_empname,
                            ivz_statusempid: data[i].ivz_statusempid,
                            description: data[i].description
                        });
                        setTimeout(function () {
                            callback();
                        }, 10);
                    }
                }
                $scope.$apply();
            });
        }
        $scope.$on("$ionicView.enter", function () {
            $scope.reloaddata();
        })
        $scope.adjustaccountlist = function (id) {
            $state.go('app.approveadjust', {
                terid: id,
                mastertype: Data.mastertype,
                typego: $stateParams.typego
            }, {
                reload: true
            });
        }
    })
    ///////////////////////////// Account Adjustment/////////////////////////////////////////
    .controller('WaitAccountAdjustCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, $ionicModal) {
        $state.reload();
        Data.showcart = false;
        $ionicLoading.hide();
        //alert($stateParams.typego);
        $scope.typego = $stateParams.typego;
        $scope.user = {
            id: '',
            adjustid: '',
            txtname: '',
            tername: '',
            terid: '',
            filetername: '',
            remarkname: '',
            typego: ''
        };
        $scope.chk = {
            remark: true
        };

        $scope.reload = function () {
            $scope.listaccount = [];
            GetAcAdjustmentByTerid($stateParams.terid, function (data) {
                //$scope.listaccount = data;
                var x = 0;
                var loopArray = function (arr) {
                    getPush(x, function () {
                        x++;
                        if (x < arr.length) {
                            loopArray(arr);
                        } else {
                            $ionicLoading.hide();
                        }
                    });
                }
                loopArray(data);

                function getPush(i, callback) {
                    $scope.showLoadingProperTimesRegter(' กำลังโหลดข้อมูล ' + data[i].ivz_customernumber.primaryName);
                    if (data[i].statuscode === 917970000 || data[i].statuscode === '917970000') {
                        $scope.listaccount.push({
                            ivz_accountadjustmentid: data[i].ivz_accountadjustmentid,
                            ivz_name: data[i].ivz_name,
                            ivz_transdate: new Date(data[i].ivz_transdate),
                            ivz_adjcredcloseaccount: data[i].ivz_adjcredcloseaccount,
                            ivz_adjcredclosereason: data[i].ivz_adjcredclosereason,
                            ivz_adjcredit: data[i].ivz_adjcredit,
                            ivz_adjcredreopenaccount: data[i].ivz_adjcredreopenaccount,
                            ivz_adjcredreopenreason: data[i].ivz_adjcredreopenreason,
                            ivz_adjgenaddress: data[i].ivz_adjgenaddress,
                            ivz_adjgencontact: data[i].ivz_adjgencontact,
                            ivz_adjgeneral: data[i].ivz_adjgeneral,
                            ivz_adjgenname: data[i].ivz_adjgenname,
                            ivz_adjgentransport: data[i].ivz_adjgentransport,
                            ivz_newcredcredit: data[i].ivz_newcredcredit,
                            ivz_newcredcreditincdec: data[i].ivz_newcredcreditincdec,
                            ivz_newcredcreditlimitnew: data[i].ivz_newcredcreditlimitnew,
                            ivz_newcredcreditlimitold: data[i].ivz_newcredcreditlimitold,
                            ivz_newgenaddresspostalcode: data[i].ivz_newgenaddresspostalcode,
                            ivz_newgenaddressstreet1: data[i].ivz_newgenaddressstreet1,
                            ivz_newgenaddressstreet2: data[i].ivz_newgenaddressstreet2,
                            ivz_newgenaddressstreet3: data[i].ivz_newgenaddressstreet3,
                            ivz_newgencontactfirstname: data[i].ivz_newgencontactfirstname,
                            ivz_newgencontactlastname: data[i].ivz_newgencontactlastname,
                            ivz_newgenname: data[i].ivz_newgenname,
                            ivz_newgentransport: data[i].ivz_newgentransport,
                            ivz_customernumber: data[i].ivz_customernumber,
                            ivz_newgenaddresscountry: data[i].ivz_newgenaddresscountry,
                            ivz_newgenaddressdistrict: data[i].ivz_newgenaddressdistrict,
                            ivz_newgenaddressprovince: data[i].ivz_newgenaddressprovince,
                            ivz_adjgenaddressoption: data[i].ivz_adjgenaddressoption,
                            ivz_adjgenaddresstype: data[i].ivz_adjgenaddresstype,
                            ivz_adjgencontactoption: data[i].ivz_adjgencontactoption,
                            ivz_adjgenother: data[i].ivz_adjgenother,
                            ivz_adjgenotherdescription: data[i].ivz_adjgenotherdescription,
                            ivz_newcredcreditoption: data[i].ivz_newcredcreditoption,
                            ivz_empid: data[i].ivz_empid,
                            ivz_approvaldate: data[i].ivz_approvaldate,
                            ivz_approvedby: data[i].ivz_approvedby,
                            ivz_territory: data[i].ivz_territory,
                            ivz_remark: data[i].ivz_remark,
                            statuscode: data[i].statuscode,
                            typego: $stateParams.typego,
                            ivz_remarkcredit: data[i].ivz_remarkcredit
                        });
                    }
                    setTimeout(function () {
                        callback();
                    }, 50);
                }
                $scope.$apply();
            });
        }
        $scope.reload();
        $scope.removeitem = function (index) {
            $scope.listaccount.splice(index, 1);
        }
        $scope.approveaccount = function () {
            var x = 0;
            var loopArray = function (arr) {
                getUpdate(x, function () {
                    x++;
                    if (x < arr.length) {
                        //$scope.listaccount.splice(x,1);
                        loopArray(arr);
                    } else {
                        $ionicLoading.hide();
                    }
                });
            }
            loopArray($scope.listaccount);

            function getUpdate(i, callback) {
                $scope.showLoadingProperTimesRegter('กำลังทำการบันทึก ' + $scope.listaccount[i].name);
                console.log($scope.listaccount[i].name);
                setTimeout(function () {
                    callback();
                }, 2000);
            }
            console.log('update to approve');
            setTimeout(function () {
                console.log('sendmail');
            }, 2000);
        }

        $scope.rejectapprove = function () {
            console.log('update to Reject ');
            setTimeout(function () {
                console.log('sendmail');
            }, 2000);
        }

        $ionicModal.fromTemplateUrl('templates/comment/commentrejapprov.html', {
            id: 1,
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal1 = modal;
        });
        $ionicModal.fromTemplateUrl('templates/comment/rejectall.html', {
            id: 2,
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal2 = modal;
        });

        // Triggered in the login modal to close it
        $scope.closereject = function () {
            $scope.modal1.hide();
        };
        $scope.closereject2 = function () {
            $scope.modal2.hide();
        };
        // Open the login modal
        $scope.showcomment = function (index, id, txt, ter, contxt) {
            //alert(ter.id);
            $scope.user.id = index;
            $scope.user.adjustid = id;
            $scope.user.txtname = txt;
            $scope.user.tername = ter;
            $scope.user.terid = ter.id;
            $scope.user.filetername = contxt;
            $scope.user.remarkname = '';
            $scope.user.typego = $stateParams.typego;
            $scope.modal2.show();
        };
        $scope.rejectapprove = function () {
            $scope.modal1.show();
        };

        function updatestatus(id, code, txt, callback) {
            try {
                var ins = new MobileCRM.DynamicEntity('ivz_accountadjustment', id);
                ins.properties.statuscode = parseInt(code);
                ins.properties.ivz_remarkcomment = txt;
                ins.save(function (er) {
                    if (er) {
                        alert('error 3709 ' + er);
                    } else {
                        callback();
                    }
                });
            } catch (e) {
                alert(e);
            }
        }
        $scope.approveAdj = function (id, txt, statuscode) {
            var data = $scope.listaccount;
            for (var i in data) {
                if (data[i].ivz_accountadjustmentid === txt) {
                    //alert('approve index delete '+txt+'::'+statuscode);
                    //alert(txt);
                    updatestatus(txt, 917970001, null, function () {
                        if ($stateParams.typego === '1' || $stateParams.typego === 1) {
                            $scope.sendmailtosales($scope.user.terid, 'อนุมัติเปลี่ยนแปลงข้อมูลทั่วไป', 'ได้อนุมัติ' + $scope.user.filetername + ' ของลูกค้า' + $scope.user.txtname + 'แล้ว', function () {
                                data.splice(id, 1);
                                $scope.modal2.hide();
                            });
                        } else {
                            $scope.sendmailtosales($scope.user.terid, 'อนุมัติเปลี่ยนแปลงข้อมูลเครดิต', 'ได้อนุมัติ' + $scope.user.filetername + ' ของลูกค้า' + $scope.user.txtname + 'แล้ว', function () {
                                data.splice(id, 1);
                                $scope.modal2.hide();
                            });
                        }
                    });
                    break;
                }
            }
        }
        $scope.rejectAdj = function (id, txt, statuscode) {
            if ($scope.user.remarkname) {
                $scope.chk.remark = true;
                var data = $scope.listaccount;
                for (var i in data) {
                    if (data[i].ivz_accountadjustmentid === txt) {
                        // alert('reject index sendmail '+txt+'::'+statuscode);
                        // data.splice(id,1);
                        // $scope.modal2.hide();
                        //alert(txt);
                        updatestatus(txt, 917970002, $scope.user.remarkname, function () {
                            if ($stateParams.typego === '1' || $stateParams.typego === 1) {
                                $scope.sendmailtosales($scope.user.terid, 'ไม่อนุมัติเปลี่ยนแปลงข้อมูลทั่วไป', 'ไม่สามารถอนุมัติ' + $scope.user.filetername + ' ของลูกค้า' + $scope.user.txtname + 'ได้เนื่องจาก' + $scope.user.remarkname, function () {
                                    data.splice(id, 1);
                                    $scope.modal2.hide();
                                });
                            } else {
                                $scope.sendmailtosales($scope.user.terid, 'ไม่อนุมัติเปลี่ยนแปลงข้อมูลเครดิต', 'ไม่สามารถอนุมัติ' + $scope.user.filetername + ' ของลูกค้า' + $scope.user.txtname + 'ได้เนื่องจาก' + $scope.user.remarkname, function () {
                                    data.splice(id, 1);
                                    $scope.modal2.hide();
                                });
                            }
                        });
                        break;
                    }
                }
            } else {
                $scope.chk.remark = false;
            }
        }
        $scope.changetxt = function (txt) {
            if (txt) {
                $scope.chk.remark = true;
            } else {
                $scope.chk.remark = false;
            }
        }
        $scope.confirmAdjTer = function (territory, statuscode) {
            if ($scope.user.remarkname) {
                $scope.chk.remark = true;
                var data = $scope.listaccount;
                var x = 0;
                var loopArray = function (arr) {
                    getUpdate(x, function () {
                        x++;
                        if (x < arr.length) {
                            loopArray(arr);
                        } else {
                            $scope.modal1.hide();
                            $ionicLoading.hide();
                        }
                    });
                }
                loopArray(data);

                function getUpdate(i, callback) {
                    $scope.showLoadingProperTimesRegter('กำลังทำการบันทึก ' + data[i].ivz_customernumber);
                    setTimeout(function () {
                        callback();
                    }, 2000);
                }
            } else {
                $scope.chk.remark = false;
            }
        }
        $scope.reback = function () {
            $ionicHistory.goBack(-1);
        }
    })
    ///////////////////////////// order territory /////////////////////////
    .controller('WaitOrderCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, arrlist) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        $scope.reloaddata = function () {
            $scope.listmaster = [];
            gettername($cookies.get('name'), function (data) {
                if (data) {
                    var x = 0;
                    var loopArray = function (arr) {
                        getPush(x, function () {
                            x++;
                            if (x < arr.length) {
                                loopArray(arr);
                            } else {
                                $scope.showLoadingComplete('โหลดข้อมูลเสร็จแล้ว');
                                setTimeout(function () {
                                    $ionicLoading.hide();
                                }, 2000);
                            }
                        });
                    }
                    loopArray(data);

                    function getPush(i, callback) {
                        $scope.showLoadingProperTimesRegter('โหลดข้อมูลเขตการขาย ' + data[i].description);
                        $scope.listmaster.push({
                            ivz_territorymasterid: data[i].ivz_territorymasterid,
                            ivz_mastername: data[i].ivz_mastername,
                            ivz_leftterritory: data[i].ivz_leftterritory,
                            ivz_emailcontact: data[i].ivz_emailcontact,
                            ivz_leadermail: data[i].ivz_leadermail,
                            ivz_ccmail: data[i].ivz_ccmail,
                            ivz_empid: data[i].ivz_empid,
                            ivz_empname: data[i].ivz_empname,
                            ivz_statusempid: data[i].ivz_statusempid,
                            description: data[i].description
                        });
                        setTimeout(function () {
                            callback();
                        }, 10);
                    }
                }
                $scope.$apply();
            });
        }
        $scope.$on("$ionicView.enter", function () {
            $scope.reloaddata();
        })

        $scope.orderlist = function (id) {
          //alert(id);
            $state.go('app.approveorder', {
                terid: id,
                mastertype: Data.mastertype,
                typego: 2
            }, {
                reload: true
            });
        }
    })
    .controller('WaitOrderListCtrl',function ($scope, $ionicModal,Setting, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, $compile, $ionicPopup, $timeout) {
      $state.reload();
      $scope.Data = Data;
      $scope.$on('$ionicView.enter',function(){
        $scope.ordedetail();
      });
      $scope.ordedetail = function () {
          $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล');
          setTimeout(function () {
              $ionicLoading.hide();
              $scope.loadData();
          }, 3000);
      }
      $scope.loadData = function(){
        GetOrder($stateParams.terid,Setting.setValorder,1,function(data){
          if(data){
            $scope.listorder = [];
            var x = 0;
            var loopArray = function(arr){
              getPush(x,function(){
                x++;
                if(x < arr.length){
                  loopArray(arr);
                }else{
                  $ionicLoading.hide();
                }
              });
            }
            loopArray(data);
            function getPush(i,callback){
              $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล '+data[i].name);
              $scope.listorder.push({
                salesorderid:data[i].salesorderid,
                customerid:data[i].customerid,
                name:data[i].name,
                transactioncurrencyid:data[i].transactioncurrencyid,
                requestdeliveryby:data[i].requestdeliveryby,
                pricelevelid:data[i].pricelevelid,
                shippingmethodcode:data[i].shippingmethodcode,
                paymenttermscode:data[i].paymenttermscode,
                ivz_province:data[i].ivz_province,
                ivz_district:data[i].ivz_district,
                ivz_territory:data[i].ivz_territory,
                ivz_balancecredit:data[i].ivz_balancecredit,
                totalamount:data[i].totalamount,
                ivz_empid:data[i].ivz_empid,
                statuscode:data[i].statuscode,
                ivz_statussales:data[i].ivz_statussales,
                description:data[i].description,
                ivz_ordernumber:data[i].ivz_ordernumber,
                ordernumber:data[i].ordernumber,
                createdon:new Date(data[i].createdon)
              });
              setTimeout(function(){
                callback();
              },10);
            }
          }
          $scope.$apply();
        });
      }
      $scope.showdetail = function(index,name,tername){
        //$scope.listorder.splice(index,1);
        $state.go('app.approveorderdetail',{
          terid:$stateParams.terid,
          orderid:index,
          mastertype:Data.mastertype,
          name:name,
          tername:tername
        },{reload:true});
      }
      $scope.reback = function(){
        $ionicHistory.goBack(-1);
      }
    })
    .controller('WaitOrderDetailCtrl',function ($scope, $ionicModal,Setting, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, $compile, $ionicPopup, $timeout) {
      $state.reload();
      $scope.Data = Data;
      $scope.user = {
        name:$stateParams.name,
        tername:$stateParams.tername,
        remarkname:''
      };
      $scope.chk = {
        remark:true
      };
      $scope.$on('$ionicView.enter',function(){
        $scope.ordedetail();
      });
      $scope.ordedetail = function () {
          $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล');
          setTimeout(function () {
              $ionicLoading.hide();
              $scope.loadData();
          }, 3000);
      }
      $scope.loadData = function(){
        $scope.listorderdetail = [];
        var a = new MobileCRM.FetchXml.Entity('salesorderdetail');
          a.addAttribute('salesorderdetailid');//0
          a.addAttribute('salesorderid');//1
          a.addAttribute('productid');//2
          a.addAttribute('priceperunit');//3
          a.addAttribute('uomid');//4
          a.addAttribute('quantity');//5
        var l = a.addLink('product','productid','productid','outer');
          l.addAttribute('price');//6
          l.addAttribute('productnumber');//7
        var filter = new MobileCRM.FetchXml.Filter();
          filter.where('salesorderid','eq',$stateParams.orderid.trim());
          a.filter = filter;
        var fetch = new MobileCRM.FetchXml.Fetch(a);
          fetch.execute('array',function(data){
              if(data){
                  for(var i in data){
                    $scope.listorderdetail.push({
                      salesorderdetail:data[i][0],
                      salesorderid:data[i][1],
                      productid:data[i][2].id,
                      productname:data[i][2].primaryName,
                      priceperunit:data[i][3],
                      uomid:data[i][4].id,
                      quality:data[i][5],
                      price:data[i][6],
                      productnumber:data[i][7],
                      tatol:parseInt(data[i][3]) * parseInt(data[i][5])
                    });
                  }
                }
                $scope.$apply();
          },function(er){
            alert("ERROR 6333:"+er);
          },null);
      }
      $scope.addpluss = function (data) {
          var m = 0;
          for (var i in $scope.listorderdetail) {
              m += parseInt($scope.listorderdetail[i].quality) * parseInt($scope.listorderdetail[i].priceperunit);
          }
          return m;
      }
      function approveorder(statuscode,txt,callback){
        var ups = new MobileCRM.DynamicEntity('salesorder',$stateParams.orderid);
            ups.properties.statuscode = parseInt(statuscode);
            ups.properties.ivz_remarkcomment = txt;
            ups.save(function(er){
              if(er){
                alert('error 4259 '+er);
              }else{
                setTimeout(function(){
                  callback();
                },1000);
              }
            });
      }
      $scope.confirmapproveorder = function(){
        approveorder(917970000,'',function(){
          $ionicHistory.goBack(-1);
        });
      }
      $scope.confirmrej = function(statecode,remarktxt){
        if(remarktxt){
          approveorder(4,remarktxt,function(){
            $scope.sendmailtosales($stateParams.terid,'ไม่อนุมัติเปิดใบสั่งขาย','ไม่สามารถอนุมัติเปิดใบสั่งขายให้กลับลูกค้า'+$scope.user.name+'ได้เนื่องจาก'+remarktxt,function(){
              $scope.closereject();
              $ionicHistory.goBack(-1);
            });
          });
        }
      }
      $scope.closereject = function(){
        $scope.modal2.hide();
      }
      $scope.confirmrejectorder = function(){
        $scope.modal2.show();
      }
      $ionicModal.fromTemplateUrl('templates/comment/rejapprovorder.html', {
          id: 2,
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function (modal) {
          $scope.modal2 = modal;
      });
    })
    ///////////////////////////////////////////////////////////////////////
    .controller('AccountNewCtrl', function ($scope, $ionicModal, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, $compile, $ionicPopup, $timeout) {
        $state.reload();
        $scope.user = {
            accountid: '',
            txtname: '',
            txtstate: '',
            txtcredit: '',
            txtresult: '',
            territory: '',
            txtcomment: '',
            stateture: false
        };
        $scope.$on('$ionicView.enter',function(){
          Data.showcart = false;
          $scope.user.txtname = "Test Accountid";
          var x = $stateParams.accountid + '\n' +
              $stateParams.acname + '\n' +
              $stateParams.statustype + '\n' +
              $stateParams.credit + '\n' +
              $stateParams.credit + '\n' +
              $stateParams.terid;
          //alert(x);
          $scope.user = {
              accountid: $stateParams.accountid,
              txtname: $stateParams.acname ,
              txtstate: $stateParams.statustype,
              txtcredit: $stateParams.credit,
              txtresult: $stateParams.credit,
              territory: $stateParams.terid,
              txtcomment: '',
              stateture: false
          };
          $scope.annoteable();
        });
        $scope.Data = Data;
        Data.mastertype = $stateParams.mastertype;
        $scope.txtname = $stateParams.acname;
        var checkstate = $stateParams.statustype;
        if (checkstate.length > 10) {
            $scope.user.stateture = true;
        } else {
            $scope.user.stateture = false;
        }
        $scope.annote = [];

        $scope.annoteable = function(){
          getAnnote($stateParams.accountid.trim(), function (data) {
              if (data) {
                  if (data.length > 0) {
                      $scope.showLoadingProperTimesRegter('');
                      var x = 0;
                      var loopArray = function (arr) {
                          GetPush(x, function () {
                              x++;
                              if (x < arr.length) {
                                  loopArray(arr);
                              } else {
                                  $ionicLoading.hide();
                              }
                          });
                      }
                      loopArray(data);

                      function GetPush(i, callback) {
                          $scope.showLoadingComplete('กำลังโหลดข้อมูล ' + data[i].subject);
                          //alert(data[i].documentbody);
                          MobileCRM.DynamicEntity.loadDocumentBody("annotation", data[i].annotationid.trim(), function (result) {
                              if (result) {
                                  $scope.annote.push({
                                      documentbody: "data:image/jpeg;base64," + result,
                                      subject: data[i].subject
                                  });
                              }
                          });
                          //alert(data[i].annotationid);
                          setTimeout(function () {
                              callback();
                          }, 60);
                      };
                  }
              } else {
                  alert('ไม่พบข้อมูลเอกสารไฟล์แนบ');
              }
              $scope.$apply();
          });
        }
        $scope.opop = function (baby, title) {
            $scope.imageSrc = baby;
            $scope.titlem = title;
            $scope.openModal(1);
        };
        $scope.clickmodel = function () {
            console.log('click logout');
            $scope.showcomment();
        }
        $ionicModal.fromTemplateUrl('templates/comment/comment.html', {
            id: '2',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal2 = modal;
        });

        $ionicModal.fromTemplateUrl('templates/modal-1.html', {
            id: '1',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal1 = modal;
        });

        $scope.openModal = function (index) {
            if (index == 1) $scope.oModal1.show();
            else $scope.oModal2.show();
        };

        $scope.closeModal = function (index) {
            if (index == 1) $scope.oModal1.hide();
            else $scope.oModal2.hide();
        };

        function updateconfirm(id, callback) {
            $scope.showLoadingProperTimesRegter('กำลังบันทึกข้อมูล');
            var ins = new MobileCRM.DynamicEntity('account', id);
            ins.properties.statuscode = parseInt(917970001);
            ins.properties.ivz_balancecredit = parseInt($scope.user.txtresult);
            ins.properties.creditlimit = parseInt($scope.user.txtresult);
            ins.save(function (es) {
                if (es) {
                    alert('error 3613 ' + es);
                } else {
                    setTimeout(function () {
                        callback();
                    }, 1000);
                }
            });
        }

        function rejectconfirm(id, txtcomment, callback) {
            $scope.showLoadingProperTimesRegter('กำลังบันทึกข้อมูล');
            var ins = new MobileCRM.DynamicEntity('account', id);
            ins.properties.statuscode = parseInt(917970002);
            ins.properties.ivz_remarkreject = txtcomment;
            ins.save(function (es) {
                if (es) {
                    alert('error 3613 ' + es);
                } else {
                    setTimeout(function () {
                        callback();
                    }, 1000);
                }
            });
        }
        $scope.cAdjustment = function () {
            //alert($stateParams.accountid);
            if ($stateParams.accountid) {
                $scope.showLoadingProperTimesRegter('กำลังบันทึกข้อมูล');
                updateconfirm($stateParams.accountid.trim(), function () {
                    $scope.showLoadingProperTimesRegter('บันทึกข้อมูลเสร็จแล้ว');
                    setTimeout(function () {
                        //$state.reload(); Data.showcart = false;
                        $ionicLoading.hide();
                        $ionicHistory.goBack(-1);
                    }, 2000);
                });
            }
        }
        $scope.forwardback = function () {
            $ionicHistory.goBack(-1);
        }
        $scope.confirmreject = function (accountid, txtcomment) {
            if (txtcomment) {
                rejectconfirm(accountid, txtcomment, function () {
                    getTerEmp($scope.user.territory, function (data) {
                        if (data) {
                            var title = 'ไม่อนุมัติเปิดบัญชีลูกค้าใหม่';
                            var text = "เรียน พนักงานขายเขต " + data[0].name + " ไม่สามารถเปิดบัญชีลูกค้าใหม่ได้เนื่องจาก" + txtcomment +
                                " ขอบคุณครับ  (อีเมลฉบับนี้ส่งอัตโนมัติจากระบบ CRM)";
                            SendMail(data[0].ivz_emailcontact, title, text);
                            $scope.closeModal(2);
                            setTimeout(function () {
                                $ionicLoading.hide();
                                $ionicHistory.goBack(-1);
                            }, 2000);
                        }
                        $scope.$apply();
                    });
                });
            } else {
                alert('กรุณาระบบเหตุผลที่ไม่อนุมัติด้วย');
            }
        }
        $scope.cAdjustmentCancel = function () {
            $scope.showcomment();
        }
    })
    /*
    ------------------------------------------------------------------------------------------
    */
    .controller('AccountDetailCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.mastertype = $stateParams.mastertype;
    })
    .controller('AccountInvoiceCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.mastertype = $stateParams.mastertype;
        $scope.vCheckAll = 0;
    })
    .controller('AccountBillingCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.mastertype = $stateParams.mastertype;
        $scope.vCheckAll = 0;
    })
    ////////////////////// end /////////////////
    ////////////////////// Adjustment ///////////////
    .controller('AdjustmentListCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, dataaccount) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        $scope.dataaccount = dataaccount;
        Data.territoryadjust = $stateParams.terid;
        $scope.group = {
            accountid: ''
        };
        //alert($stateParams.terid);
        $scope.listaccount = [];
        $scope.reloader = function () {
            GetAccount(Data.territoryadjust, Data.mastertype, 1, function (data) {
                var x = 0;
                var loopArray = function (arr) {
                    getPush(x, function () {
                        x++;
                        if (x < arr.length) {
                            loopArray(arr);
                        } else {
                            $ionicLoading.hide();
                        }
                    });
                }
                loopArray(data);

                function getPush(i, callback) {
                    if (data[i].statuscode === '1' || data[i].statuscode === 1) {
                        $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล ' + data[i].filtername);
                        $scope.listaccount.push({
                            accountid: data[i].accountid,
                            name: data[i].name,
                            ivz_addresscountry: data[i].ivz_addresscountry,
                            ivz_addressprovince: data[i].ivz_addressprovince,
                            ivz_addressdistrict: data[i].ivz_addressdistrict,
                            ivz_availablefromtime: data[i].ivz_availablefromtime,
                            ivz_availabletotime: data[i].ivz_availabletotime,
                            territoryid: data[i].territoryid,
                            customertypecode: data[i].customertypecode,
                            statuscode: data[i].statuscode,
                            accountnumber: data[i].accountnumber,
                            filtername: data[i].filtername,
                            ivz_customer: data[i].ivz_customer,
                            accountype: data[i].accountype,
                            ivz_statuscomplete: data[i].ivz_statuscomplete,
                            remarkreject: data[i].remarkreject,
                            ivz_taxid: data[i].ivz_taxid,
                            customertypecode: data[i].customertypecode,
                            statustype: data[i].statustype,
                            ivz_doc01: data[i].ivz_doc01,
                            ivz_doc02: data[i].ivz_doc02,
                            ivz_doc03: data[i].ivz_doc03,
                            ivz_dochouseholdregis: data[i].ivz_dochouseholdregis,
                            ivz_docidcard: data[i].ivz_docidcard,
                            matchtype: data[i].matchtype,
                            statusempid: data[i].statusempid
                        });
                        // dataaccount.user.push({
                        //   accountid:data[i].accountid,
                        //   name:data[i].name,
                        //   ivz_addresscountry:data[i].ivz_addresscountry,
                        //   ivz_addressprovince:data[i].ivz_addressprovince,
                        //   ivz_addressdistrict:data[i].ivz_addressdistrict,
                        //   ivz_availablefromtime:data[i].ivz_availablefromtime,
                        //   ivz_availabletotime:data[i].ivz_availabletotime,
                        //   territoryid:data[i].territoryid,
                        //   customertypecode:data[i].customertypecode,
                        //   statuscode:data[i].statuscode,
                        //   accountnumber:data[i].accountnumber,
                        //   filtername:data[i].filtername,
                        //   ivz_customer:data[i].ivz_customer,
                        //   accountype:data[i].accountype,
                        //   ivz_statuscomplete:data[i].ivz_statuscomplete,
                        //   remarkreject:data[i].remarkreject,
                        //   ivz_taxid:data[i].ivz_taxid,
                        //   customertypecode:data[i].customertypecode,
                        //   statustype:data[i].statustype,
                        //   ivz_doc01:data[i].ivz_doc01,
                        //   ivz_doc02:data[i].ivz_doc02,
                        //   ivz_doc03:data[i].ivz_doc03,
                        //   ivz_dochouseholdregis:data[i].ivz_dochouseholdregis,
                        //   ivz_docidcard:data[i].ivz_docidcard,
                        //   matchtype:data[i].matchtype,
                        //   statusempid:data[i].statusempid
                        // });
                    }
                    setTimeout(function () {
                        callback();
                    }, 5);
                }
                $scope.$apply();
            });
        }
        $scope.reloader();
        $scope.cAdjustment = function () {
            //alert($scope.group.accountid);
            if ($scope.group.accountid) {
                $scope.showLoadingProperTimes();
                $state.go('app.adjustment', {
                    accountid: $scope.group.accountid,
                    mastertype: Data.mastertype
                }, {
                    reload: true
                });
            }
        }
        $scope.cAdjustmentCredit = function () {
            if ($scope.group.accountid) {
                $scope.showLoadingProperTimes();
                $state.go('app.adjustmentcredit', {
                    accountid: $scope.group.accountid,
                    mastertype: Data.mastertype
                }, {
                    reload: true
                });
            };
        }
    })
    .controller('AdjustmentCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, dataaccount) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        $ionicLoading.hide();
        $scope.dataaccount = dataaccount;
        Data.mastertype = $stateParams.mastertype;
        //  var index = $stateParams.id;
        var acountid = $stateParams.accountid;
        //alert(dataaccount.user[0].accountid);
        $scope.group = {
            accountid: ''
        }
        $scope.user = {
            accountid: '',
            name: '',
            ivz_addresscountry: '',
            ivz_addressprovince: '',
            ivz_addressdistrict: '',
            ivz_availablefromtime: '',
            ivz_availabletotime: '',
            territoryid: '',
            customertypecode: '',
            statuscode: '',
            accountnumber: '',
            filtername: '',
            ivz_customer: '',
            accountype: '',
            ivz_statuscomplete: '',
            remarkreject: '',
            ivz_taxid: '',
            customertypecode: '',
            statustype: '',
            ivz_doc01: '',
            ivz_doc02: '',
            ivz_doc03: '',
            ivz_dochouseholdregis: '',
            ivz_docidcard: '',
            matchtype: '',
            statusempid: '',
            ivz_balancecredit: '',
            ivz_integrationid: '',
            statustypecode: ''
        }
        $scope.chk = {
            doc004: true,
            doc005: true
        }
        try {
            GetAccountById($stateParams.accountid.trim(), Data.mastertype, function (data) {
                $scope.user.accountid = data[0].accountid;
                $scope.user.name = data[0].name;
                $scope.user.ivz_addresscountry = data[0].ivz_addresscountry;
                $scope.user.ivz_addressprovince = data[0].ivz_addressprovince;
                $scope.user.ivz_addressdistrict = data[0].ivz_addressdistrict;
                $scope.user.ivz_availablefromtime = data[0].ivz_availablefromtime;
                $scope.user.ivz_availabletotime = data[0].ivz_availabletotime;
                $scope.user.territoryid = data[0].territoryid;
                $scope.user.customertypecode = data[0].customertypecode;
                $scope.user.statuscode = data[0].statuscode;
                $scope.user.accountnumber = data[0].accountnumber;
                $scope.user.filtername = data[0].filtername;
                $scope.user.ivz_customer = data[0].ivz_customer;
                $scope.user.accountype = data[0].accountype;
                $scope.user.ivz_statuscomplete = data[0].ivz_statuscomplete;
                $scope.user.remarkreject = data[0].remarkreject;
                $scope.user.ivz_taxid = data[0].ivz_taxid;
                $scope.user.customertypecode = data[0].customertypecode;
                $scope.user.statustype = data[0].statustype;
                $scope.user.ivz_doc01 = data[0].ivz_doc01;
                $scope.user.ivz_doc02 = data[0].ivz_doc02;
                $scope.user.ivz_doc03 = data[0].ivz_doc03;
                $scope.user.ivz_dochouseholdregis = data[0].ivz_dochouseholdregis;
                $scope.user.ivz_docidcard = data[0].ivz_docidcard;
                $scope.user.matchtype = data[0].matchtype;
                $scope.user.statusempid = data[0].statusempid;
                $scope.user.ivz_balancecredit = data[0].ivz_balancecredit;
                $scope.user.ivz_integrationid = data[0].ivz_integrationid;
                $scope.user.statustypecode = data[0].statustypecode;
                Data.statustypecode = data[0].statustypecode;
                $scope.$apply();
            });

        } catch (er) {
            document.getElementById('log').innerHTML = 'loop ' + er + '<br />';
        }

        $scope.goop = function (id) {
            if (id == 1 || id == '1') {
                var xc = $scope.user.accountid + '\n' +
                    $scope.user.name + '\n' +
                    $stateParams.mastertype + '\n' +
                    $scope.user.territoryid.id;

                $scope.showLoadingProperTimes();
                $state.go('app.adjustmentname', {
                    accountid: $scope.user.accountid,
                    accountname: $scope.user.name,
                    mastertype: $stateParams.mastertype,
                    terid: $scope.user.territoryid.id,
                    ivz_integrationid: $scope.user.ivz_integrationid
                }, {
                    reload: true
                });
            } else if (id == 2 || id == '2') {
                $scope.showLoadingProperTimes();
                $state.go('app.adjustmentaddress', {
                    accountid: $scope.user.accountid,
                    statustypecode: $scope.user.statustypecode,
                    mastertype: $stateParams.mastertype
                }, {
                    reload: true
                });
            } else if (id == 3 || id == '3') {
                $scope.showLoadingProperTimes();
                $state.go('app.adjustmenttransport', {
                    accountid: $scope.user.accountid,
                    mastertype: $stateParams.mastertype,
                    cusname: $scope.user.name
                }, {
                    reload: true
                });
            } else if (id == 4 || id == '4') {
                $scope.showLoadingProperTimes();
                $state.go('app.adjustmentcontact', {
                    accountid: $scope.user.accountid,
                    mastertype: $stateParams.mastertype,
                    cusname: $scope.user.name
                }, {
                    reload: true
                });
              } else if (id == 5 || id == '5') {
                  $scope.showLoadingProperTimes();
                  $state.go('app.adjustmentcontact', {
                      accountid: $scope.user.accountid,
                      mastertype: $stateParams.mastertype,
                      cusname: $scope.user.name
                  }, {
                      reload: true
                  });
              }else if (id == 6 || id == '6') {
                  $scope.showLoadingProperTimes();
                  $state.go('app.adjustmentcontact', {
                      accountid: $scope.user.accountid,
                      mastertype: $stateParams.mastertype,
                      cusname: $scope.user.name
                  }, {
                      reload: true
                  });
              }else if (id == 7 || id == '7') {
                  $scope.showLoadingProperTimes();
                  $state.go('app.adjustmentcontact', {
                      accountid: $scope.user.accountid,
                      mastertype: $stateParams.mastertype,
                      cusname: $scope.user.name
                  }, {
                      reload: true
                  });
              }else if (id == 8 || id == '8') {
                  $scope.showLoadingProperTimes();
                  $state.go('app.adjustmentcontact', {
                      accountid: $scope.user.accountid,
                      mastertype: $stateParams.mastertype,
                      cusname: $scope.user.name
                  }, {
                      reload: true
                  });
              }
        }

        $scope.cAdjustmentCancel = function () {
            console.log('back');
            $ionicHistory.goBack(-1);
        }
    })
    .controller('AdjustmentNameCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        $ionicLoading.hide();
        $scope.user = {
            accountid: $stateParams.accountid.trim(),
            txtname: $stateParams.accountname,
            bs4: '',
            bs5: ''
        };
        $scope.chk = {
            doc004: true,
            doc005: true
        };
        $('#doc004').change(function () {
            GetAtt('#doc004', '#idcImg04', 'canvas04', function (data) {
                $ionicLoading.hide();
                $scope.chk.doc004 = true;
                console.log(data.length);
                $scope.user.bs4 = data;
                //document.getElementById('log').innerHTML = 'bs4 '+data;
            });
        });
        $('#doc005').change(function () {
            GetAtt('#doc005', '#idcImg05', 'canvas05', function (data) {
                $ionicLoading.hide();
                $scope.chk.doc005 = true;
                $scope.user.bs5 = data;
                //document.getElementById('log').innerHTML = 'bs5 '+data;
            });
        });
        $scope.cAdjustmentCancel = function () {
            //document.getElementById('log').innerHTML = 'Click Back';
            $ionicHistory.goBack(-1);
        }
        $scope.cAdjustment = function () {
            var a = $scope.user.bs4;
            var b = $scope.user.bs5;
            if (a) {
                $scope.chk.doc004 = true;
            } else {
                $scope.chk.doc004 = false;
            }
            if (b) {
                $scope.chk.doc005 = true;
            } else {
                $scope.chk.doc005 = false;
            }

            function insertadjustment(diug, id, txt, name, callback) {
                var ins = new MobileCRM.DynamicEntity.createNew('ivz_accountadjustment');
                ins.properties.ivz_accountadjustmentid = diug;
                ins.properties.ivz_adjgeneral = parseInt(1);
                ins.properties.ivz_adjgenname = parseInt(1);
                ins.properties.ivz_newgenname = txt;
                ins.properties.ivz_name = $scope.user.txtname;
                ins.properties.ivz_refrecid = parseInt($stateParams.ivz_integrationid);
                ins.properties.ivz_customernumber = new MobileCRM.Reference('account', id);
                ins.properties.ivz_statusempid = parseInt(Data.mastertype);
                ins.properties.ivz_empid = $cookies.get('ivz_empid');
                ins.properties.ivz_territory = new MobileCRM.Reference('territory', Data.territoryadjust);
                ins.properties.statuscode = parseInt(917970000);
                ins.save(function (er) {
                    if (er) {
                        alert("ADJUSTMENT4157:" + er);
                    } else {
                        callback();
                    }
                });
            }

            function updateadjustment(idadj, id, txt, name, callback) {
                var ins = new MobileCRM.DynamicEntity('ivz_accountadjustment', idadj);
                ins.properties.ivz_name = $scope.user.txtname;
                ins.properties.ivz_adjgeneral = parseInt(1);
                ins.properties.ivz_adjgenname = parseInt(1);
                ins.properties.ivz_newgenname = txt;
                ins.properties.ivz_refrecid = parseInt($stateParams.ivz_integrationid);
                ins.properties.ivz_customernumber = new MobileCRM.Reference('account', id);
                ins.properties.ivz_statusempid = parseInt(Data.mastertype);
                ins.properties.ivz_empid = $cookies.get('ivz_empid');
                ins.properties.ivz_territory = new MobileCRM.Reference('territory', Data.territoryadjust);
                ins.properties.statuscode = parseInt(917970000);
                ins.save(function (er) {
                    if (er) {
                        alert("ADJUSTMENT4176:" + er);
                    } else {
                        callback();
                    }
                });
            }
            if ($scope.chk.doc004 == true && $scope.chk.doc005 == true) {
                //$stateParams.terid;
                chkAdjustment($stateParams.accountid.trim(), function (data) {
                    if (data) {
                        //alert(data.length);
                        if (data.length > 0) {
                            $scope.showLoadingProperTimesRegter('กำลังบันทึกข้อมูล');
                            var x = 'update ' + data[0].ivz_accountadjustmentid + '::' + data[0].ivz_customernumber.id;
                            //alert(x);
                            updateadjustment(data[0].ivz_accountadjustmentid, data[0].ivz_customernumber.id, $scope.user.txtname, $stateParams.accountname, function () {
                                console.log('insert ad');
                                $scope.InAnnoteAttract('ivz_accountadjustment', data[0].ivz_accountadjustmentid, $scope.user.bs4, 'สำเนาทะเบียนบ้าน(ต้องมี) เปลี่ยนแปลงข้อมูล ' + data[0].ivz_customernumber.primaryName, 3, function () {
                                    console.log('ok att');
                                });
                                setTimeout(function () {
                                    $scope.InAnnoteAttract('ivz_accountadjustment', data[0].ivz_accountadjustmentid, $scope.user.bs5, 'สำเนาประจำตัวบัตรประชาชน(ต้องมี) เปลี่ยนแปลงข้อมูล ' + data[0].ivz_customernumber.primaryName, 3, function () {
                                        console.log('ok att');
                                        $scope.showLoadingComplete('บันทึกข้อมูลเสร็จแล้ว');
                                    });
                                }, 1000);
                            });
                        } else {
                            var x = 'insert ' + $stateParams.accountid + '::' + $stateParams.ivz_integrationid;
                            //alert(x);
                            var dui = guid();
                            insertadjustment(dui, $stateParams.accountid, $scope.user.txtname, $stateParams.accountname, function () {
                                console.log('insert ad');
                                $scope.InAnnoteAttract('ivz_accountadjustment', dui, $scope.user.bs4, 'สำเนาทะเบียนบ้าน(ต้องมี) เปลี่ยนแปลงข้อมูล ' + $stateParams.accountname, 3, function () {
                                    console.log('ok att');
                                });
                                setTimeout(function () {
                                    $scope.InAnnoteAttract('ivz_accountadjustment', dui, $scope.user.bs5, 'สำเนาประจำตัวบัตรประชาชน(ต้องมี) เปลี่ยนแปลงข้อมูล ' + $stateParams.accountname, 3, function () {
                                        console.log('ok att');
                                        $scope.showLoadingComplete('บันทึกข้อมูลเสร็จแล้ว');
                                    });
                                }, 1000);
                            });
                        }
                        setTimeout(function () {
                            $ionicHistory.goBack(-1);
                            $ionicLoading.hide();
                            $scope.sendmailtosup($stateParams.terid, 'เปลี่ยนแปลงข้อมูลทั่วไป', 'เปลี่ยนแปลงข้อมูลชื่อลูกค้า', function () {
                                console.log('ok');
                            });
                        }, 3000);
                    }
                    $scope.$apply();
                });
            } else {
                console.log('not insert');
            }
        }
    })
    .controller('AdjustmentOptionCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.mastertype = $stateParams.mastertype;
        var getCusAds = function (id) {
            $scope.listaddressaccount = [];
            GetCustomerAddres(id, function (data) {
                var x = 0;
                var loopArray = function (arr) {
                    getPush(x, function () {
                        x++;
                        if (x < arr.length) {
                            loopArray(arr);
                        } else {
                            $ionicLoading.hide();
                        }
                    });
                }
                loopArray(data);

                function getPush(i, callback) {
                    $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล' + data[i].addressname);
                    $scope.listaddressaccount.push({
                        customeraddressid: data[i].customeraddressid,
                        addressname: data[i].addressname,
                        line1: data[i].line1,
                        city: data[i].city,
                        stateorprovince: data[i].stateorprovince,
                        postalcode: data[i].postalcode,
                        addrscode: data[i].addrscode,
                        addresstypecode: data[i].addresstypecode,
                        ivz_integrationid: data[i].ivz_integrationid,
                        parentid: data[i].parentid,
                        addresscode: data[i].addresscode
                    });
                    setTimeout(function () {
                        callback();
                    }, 10);
                };
                $scope.$apply();
            });
        }
        $scope.$on("$ionicView.enter", function () {
            //console.log('reload complete');
            getCusAds($stateParams.accountid);
        });
        $scope.goaddress = function (id) {
            ///$state.go('app.adjustmentaddressform',{reload:true});
            $scope.showLoadingProperTimes();
            $state.go('app.adjustmentaddressform', {
                addressid: id,
                accountid: $stateParams.accountid,
                statustypecode: $stateParams.statustypecode,
                mastertype: Data.mastertype,
                typeinsert: 1
            }, {
                reload: true
            });
        }

        $scope.cAdjustment = function () {
            $state.go('app.adjustmentaddressform', {
                addressid: '',
                accountid: $stateParams.accountid,
                statustypecode: $stateParams.statustypecode,
                mastertype: Data.mastertype,
                typeinsert: 2
            }, {
                reload: true
            });
        }
        $scope.cAdjustmentCancel = function () {
            $ionicHistory.goBack(-1);
        }
    })
    .controller('AdjustmentAddressFormCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        // Data.mastertype = $stateParams.mastertype;
        // alert(Data.statustypecode);
        $scope.user = {
            customeraddressid: '',
            txtcode: '',
            txtname: '',
            txtaddress: '',
            txtprovice: '',
            provinceid: '',
            txtdistrict: '',
            districtid: '',
            txtzipcode: '',
            addrscode: '',
            addresstypecode: '',
            ivz_integrationid: '',
            parentid: '',
            mastertype: '',
            doc01: '',
            doc02: '',
            doc03: '',
            doc04: '',
            doc05: ''
        };
        $scope.chk = {
            accounttype: true,
            addresprovice: true,
            addressdistrict: true,
            section: Data.statustypecode,
            doc01: true,
            doc02: true,
            doc03: true,
            doc04: true,
            doc05: true
        };
        var getCusAds = function (id) {
            if (id) {
                GetCustomerAddresById(id, function (data) {
                    //alert(id+'::'+data[0].stateorprovince+'::'+data[0].city);
                    var x = 0;
                    var loopArray = function (arr) {
                        getPush(x, function () {
                            x++;
                            if (x < arr.length) {
                                loopArray(arr);
                            } else {
                                $ionicLoading.hide();
                            }
                        });
                    };
                    loopArray(data);

                    function getPush(i, callback) {
                        try {
                            $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล ' + data[i].addressname);
                            $scope.user.customeraddressid = data[i].customeraddressid;
                            $scope.user.txtcode = data[i].addresstypecode;
                            $scope.user.txtname = data[i].addressname;
                            $scope.user.txtaddress = data[i].line1;
                            $scope.user.txtprovice = data[i].stateorprovince;
                            $scope.user.txtdistrict = data[i].city;
                            $scope.user.txtzipcode = data[i].postalcode;
                            $scope.user.addresstypecode = data[i].addresscode;
                            $scope.user.ivz_integrationid = data[i].ivz_integrationid;
                            $scope.user.parentid = data[i].parentid.id;
                            $scope.user.mastertype = $stateParams.mastertype;
                            setTimeout(function () {
                                callback();
                            }, 1000);
                        } catch (er) {
                            alert('error 4375 ' + er);
                        }
                    }
                    $scope.$apply();
                });
            } else {
                alert($stateParams.accountid);
                try {
                    $scope.user.customeraddressid = '';
                    $scope.user.txtcode = '';
                    $scope.user.txtname = '';
                    $scope.user.txtaddress = '';
                    $scope.user.txtprovice = '';
                    $scope.user.provinceid = '';
                    $scope.user.txtdistrict = '';
                    $scope.user.districtid = '';
                    $scope.user.txtzipcode = '';
                    $scope.user.addresstypecode = '';
                    $scope.user.ivz_integrationid = '';
                    $scope.user.parentid = $stateParams.accountid;
                    $scope.user.mastertype = $stateParams.mastertype;
                } catch (er) {
                    alert('error 4396 ' + er);
                }
            }

            Getivz_CustomerAddress(function (data) {
                $scope.adjusttype = data;
                $scope.$apply();
            });

            GetProvinceList(function (data) {
                $scope.provincelist = data;
                $scope.$apply();
            });

        }


        $scope.$on("$ionicView.enter", function () {
            $ionicLoading.hide();
            //console.log('reload complete');
            getCusAds($stateParams.addressid);
            $(function () {
                //alert('loading ok');
                $('#doc01').change(function () {
                    GetAtt('#doc01', '#idcImg01', 'canvas01', function (data) {
                        //alert('changer');
                        if (data) {
                            //$scope.debuglog = data;
                            $scope.chk.doc01 = false;
                            $scope.user.doc01 = data;
                        }
                        $scope.$apply();
                    });
                });
                $('#doc02').change(function () {
                    GetAtt('#doc02', '#idcImg02', 'canvas02', function (data) {
                        if (data) {
                            $scope.chk.doc02 = false;
                            $scope.user.doc02 = data;
                        }
                        $scope.$apply();
                    });
                });
                $('#doc03').change(function () {
                    GetAtt('#doc03', '#idcImg03', 'canvas03', function (data) {
                        if (data) {
                            $scope.chk.doc03 = false;
                            $scope.user.doc03 = data;
                        }
                        $scope.$apply();
                    });
                });
                $('#doc04').change(function () {
                    GetAtt('#doc04', '#idcImg04', 'canvas04', function (data) {
                        if (data) {
                            $scope.chk.doc04 = false;
                            $scope.user.doc04 = data;
                        }
                        $scope.$apply();
                    });
                });
                $('#doc05').change(function () {
                    GetAtt('#doc05', '#idcImg05', 'canvas05', function (data) {
                        if (data) {
                            $scope.chk.doc05 = false;
                            $scope.user.doc05 = data;
                        }
                        $scope.$apply();
                    });
                });
            }); //documnetload
            $scope.mdSlProv = function (id) {
                $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล');
                GetDistrictById(id, function (data) {
                    $scope.showLoadingComplete('โหลดข้อมูลเสร็จแล้ว');
                    setTimeout(function () {
                        $ionicLoading.hide();
                    }, 1000);
                    $scope.districtlist = data;
                    $scope.$apply();
                });
            };
        }); //end on view
        //get just
        $scope.searchtype = function (txt) {
            if (txt) {
                $scope.chk.accounttype = false;
            } else {
                $scope.chk.accounttype = true;
            }
        }
        $scope.cSetType = function (id, txt) {
            console.log(id);
            if (id) {
                $scope.user.addrscode = id;
                $scope.user.txtcode = txt;
                $scope.chk.accounttype = true;
            } else {
                $scope.user.addrscode = null;
                $scope.user.txtcode = null;
                $scope.chk.accounttype = true;
            }
        }

        //Data.mastertype = $stateParams.mastertype;
        /////////////////////// Chk change ////////////////////
        $scope.searchtype = function (txt) {
            if (txt) {
                $scope.chk.accounttype = false;
            } else {
                $scope.chk.accounttype = true;
            }
        }
        $scope.cSetType = function (id, txt) {
            console.log(id + '::' + txt.length);
            if (txt.length > 0) {
                $scope.chk.accounttype = true;
                $scope.user.txtcode = txt;
                $scope.user.addresstypecode = id;
                console.log(id + '::' + txt);
            } else {
                $scope.chk.accounttype = false;
                $scope.user.txtcode = null;
                $scope.user.addresstypecode = null;
                console.log('null id txt');
            }
        }

        $scope.searchProvince = function (txt) {
            if (txt) {
                $scope.chk.addresprovice = false;
            } else {
                $scope.chk.addresprovice = true;
            }
        }
        $scope.cSetTypeProvince = function (id, txt) {
            $scope.user.txtdistrict = null;
            $scope.user.districtid = null;
            if (txt.length > 0) {
                $scope.chk.addresprovice = true;
                $scope.user.txtprovice = txt;
                $scope.user.provinceid = id;
                console.log(id + '::' + txt);
            } else {
                $scope.chk.addresprovice = false;
                $scope.user.txtprovice = null;
                $scope.user.provinceid = null;
                console.log('null id txt');
            }
        }

        $scope.searchDistrict = function (txt) {
            if (txt) {
                $scope.chk.addressdistrict = false;
            } else {
                $scope.chk.addressdistrict = true;
            }
        }
        $scope.cSetTypeDistrict = function (id, txt) {
            if (txt.length > 0) {
                $scope.chk.addressdistrict = true;
                $scope.user.txtdistrict = txt;
                $scope.user.districtid = id;
                console.log(id + '::' + txt);
            } else {
                $scope.chk.addressdistrict = false;
                $scope.user.txtdistrict = null;
                $scope.user.districtid = null;
                console.log('null id txt');
            }
        }
        var invarrible = 0;
        $scope.$watch('user.doc01', function () {
            if ($scope.user.doc01) {
                invarrible = 1;
            }
            console.log('watch::' + $scope.user.doc01.length);
        });
        $scope.$watch('user.doc02', function () {
            if ($scope.user.doc02) {
                invarrible = 1;
            }
            console.log('watch::' + $scope.user.doc02.length);
        });
        $scope.$watch('user.doc03', function () {
            if ($scope.user.doc03) {
                invarrible = 1;
            }
            console.log('watch::' + $scope.user.doc03.length);
        });
        $scope.$watch('user.provinceid', function () {
            if ($scope.user.provinceid) {
                //alert($scope.user.provinceid);
                $scope.mdSlProv($scope.user.provinceid);
            }
        });
        ///////////////////////// End ////////////////////////
        $scope.cAdjustment = function () {
            var diug = guid();
            var type = $stateParams.statustypecode;
            if (type == 1) {
                if ($scope.user.doc04 && $scope.user.doc05 && $scope.user.txtcode && $scope.user.txtname && $scope.user.txtaddress && $scope.user.txtprovice && $scope.user.txtdistrict && $scope.user.txtzipcode) {
                    //alert('insert DB 1');
                    $scope.showLoadingProperTimesRegter('กำลังทำการบันทึกข้อมูล');
                    //console.log('Insert DB');
                    try {
                        insertnewaddress(diug, function () {
                            $scope.showLoadingProperTimesRegter('กำลังทำการบันทึกข้อมูลเอกสาร');
                            if ($scope.user.doc04) {
                                $scope.InAnnoteAttract('ivz_accountadjustment', diug, $scope.user.doc04, 'เปลี่ยนแปลงข้อมูลที่อยู่ ' + $scope.user.txtname, 1, function () {
                                    console.log('ok');
                                });
                            }
                            if ($scope.user.doc05) {
                                setTimeout(function () {
                                    $scope.InAnnoteAttract('ivz_accountadjustment', diug, $scope.user.doc05, 'เปลี่ยนแปลงข้อมูลที่อยู่ ' + $scope.user.txtname, 1, function () {
                                        console.log('ok');
                                    });
                                }, 3000);
                            }
                        });
                    } catch (e) {
                        alert('error 4660 ' + e);
                    }
                    setTimeout(function () {
                        $scope.sendmailtosup($cookies.get('territoryid'), 'ขออนุมัติเปลี่ยนแปลงข้อมูลที่อยู่', 'เปลี่ยนแปลงข้อมูลที่อยู่ของลูกค้า' + $scope.user.txtname, function () {
                            $scope.showLoadingComplete('บันทึกข้อมูลเสร็จแล้ว');
                            $ionicLoading.hide();
                            $ionicHistory.goBack(-1);
                        });
                    }, 6000);
                }
            } else {
                if (invarrible == 1 && $scope.user.doc04 && $scope.user.doc05 && $scope.user.txtcode && $scope.user.txtname && $scope.user.txtaddress && $scope.user.txtprovice && $scope.user.txtdistrict && $scope.user.txtzipcode) {
                    //alert('insert DB 2');
                    try {
                        insertnewaddress(diug, function () {
                            $scope.showLoadingProperTimesRegter('กำลังทำการบันทึกข้อมูลเอกสาร');
                            if ($scope.user.doc01) {
                                $scope.InAnnoteAttract('ivz_accountadjustment', diug, $scope.user.doc01, 'เปลี่ยนแปลงข้อมูลที่อยู่ ' + $scope.user.txtname, 1, function () {
                                    console.log('ok');
                                });
                            }
                            if ($scope.user.doc02) {
                                setTimeout(function () {
                                    $scope.InAnnoteAttract('ivz_accountadjustment', diug, $scope.user.doc02, 'เปลี่ยนแปลงข้อมูลที่อยู่ ' + $scope.user.txtname, 1, function () {
                                        console.log('ok');
                                    });
                                }, 3000);
                            }
                            if ($scope.user.doc03) {
                                setTimeout(function () {
                                    $scope.InAnnoteAttract('ivz_accountadjustment', diug, $scope.user.doc03, 'เปลี่ยนแปลงข้อมูลที่อยู่ ' + $scope.user.txtname, 1, function () {
                                        console.log('ok');
                                    });
                                }, 4000);
                            }
                            if ($scope.user.doc04) {
                                setTimeout(function () {
                                    $scope.InAnnoteAttract('ivz_accountadjustment', diug, $scope.user.doc04, 'เปลี่ยนแปลงข้อมูลที่อยู่ ' + $scope.user.txtname, 1, function () {
                                        console.log('ok');
                                    });
                                }, 5000);
                            }
                            if ($scope.user.doc05) {
                                setTimeout(function () {
                                    $scope.InAnnoteAttract('ivz_accountadjustment', diug, $scope.user.doc05, 'เปลี่ยนแปลงข้อมูลที่อยู่ ' + $scope.user.txtname, 1, function () {
                                        console.log('ok');
                                    });
                                }, 6000);
                            }
                        });
                    } catch (e) {
                        alert('error 4661 ' + e);
                    }
                    setTimeout(function () {
                        //alert($cookies.get('territoryid'));
                        $scope.sendmailtosup($cookies.get('territoryid'), 'ขออนุมัติเปลี่ยนแปลงข้อมูลที่อยู่', 'เปลี่ยนแปลงข้อมูลที่อยู่ของลูกค้า' + $scope.user.txtname, function () {
                            $scope.showLoadingComplete('บันทึกข้อมูลเสร็จแล้ว');
                            $ionicLoading.hide();
                            $ionicHistory.goBack(-1);
                        });
                    }, 10000);
                }
            }
        }

        function insertnewaddress(typeid, callback) {
            //alert($scope.user.parentid+'::'+typeid);
            $scope.showLoadingProperTimesRegter('กำลังทำการบันทึกข้อมูล');
            var ins = new MobileCRM.DynamicEntity.createNew('ivz_accountadjustment');
            ins.properties.ivz_accountadjustmentid = typeid;
            ins.properties.ivz_name = $scope.user.txtname;
            ins.properties.ivz_transdate = new Date();
            ins.properties.ivz_adjgeneral = parseInt(1);
            ins.properties.ivz_adjgenaddress = parseInt(1);
            ins.properties.ivz_adjgenaddressoption = parseInt($stateParams.typeinsert);
            ins.properties.ivz_adjgenaddresstype = parseInt($scope.user.addresstypecode); //set invoice deliverry
            ins.properties.ivz_refrecid = $scope.user.ivz_integrationid;
            ins.properties.ivz_newgenaddressname = $scope.user.txtname;
            ins.properties.ivz_newgenaddressstreet1 = $scope.user.txtaddress;
            ins.properties.ivz_newgenaddressprovince = new MobileCRM.Reference('ivz_addressprovince', $scope.user.provinceid);
            ins.properties.ivz_newgenaddressdistrict = new MobileCRM.Reference('ivz_addressdistrict', $scope.user.districtid);
            ins.properties.ivz_newgenaddresspostalcode = $scope.user.txtzipcode;
            ins.properties.ivz_empid = $cookies.get('ivz_empid');
            ins.properties.ivz_statusempid = parseInt(Data.mastertype);
            ins.properties.ivz_territory = new MobileCRM.Reference('territory', Data.territoryadjust);
            ins.properties.statuscode = parseInt(917970000);
            ins.properties.ivz_customernumber = new MobileCRM.Reference('account', $scope.user.parentid);
            ins.save(function (er) {
                if (er) {
                    alert("error 4682 :" + er);
                } else {
                    callback();
                }
            });
        }

        $scope.cAdjustmentCancel = function () {
            $scope.showLoadingProperTimes();
            $scope.user.customeraddressid = '';
            $scope.user.txtcode = '';
            $scope.user.txtname = '';
            $scope.user.txtaddress = '';
            $scope.user.txtprovice = '';
            $scope.user.provinceid = '';
            $scope.user.txtdistrict = '';
            $scope.user.districtid = '';
            $scope.user.txtzipcode = '';
            $scope.user.addrscode = '';
            $scope.user.addresstypecode = '';
            $scope.user.ivz_integrationid = '';
            $scope.user.parentid = '';
            $scope.user.mastertype = '';
            $scope.user.doc01 = '';
            $scope.user.doc02 = '';
            $scope.user.doc03 = '';
            $scope.user.doc04 = '';
            $scope.user.doc05 = '';
            setTimeout(function () {
                $ionicLoading.hide();
                $ionicHistory.goBack(-1);
            }, 1000);
        }
    })
    .controller('AdjustmentTransportCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $ionicLoading.hide();
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.mastertype = $stateParams.mastertype;
        $scope.user = {
            txtname: '',
            txttel: ''
        };

        function inserttransport(callback) {
            var ins = new MobileCRM.DynamicEntity.createNew('ivz_accountadjustment');
            //ins.properties.ivz_accountadjustmentid = $scope.uid;
            ins.properties.ivz_name = $stateParams.cusname;
            ins.properties.ivz_transdate = new Date();
            ins.properties.ivz_adjgeneral = parseInt(1);
            ins.properties.ivz_adjgentransport = parseInt(1);
            ins.properties.ivz_newgentransport = $scope.user.txtname;
            ins.properties.ivz_newgenphonetransport = $scope.user.txttel;
            //ins.properties.ivz_refrecid = $scope.ivz_integrationid;
            ins.properties.ivz_empid = $cookies.get('ivz_empid');
            ins.properties.ivz_statusempid = parseInt(Data.mastertype);
            ins.properties.ivz_territory = new MobileCRM.Reference('territory', Data.territoryadjust);
            ins.properties.statuscode = parseInt(917970000);
            ins.properties.ivz_customernumber = new MobileCRM.Reference('account', $stateParams.accountid);
            ins.save(function (er) {
                if (er) {
                    alert("ADJUSTMENT4796:" + er);
                } else {
                    callback();
                }
            });
        }
        $scope.cAdjustment = function () {
            console.log('insert address');
            if ($scope.user.txtname && $scope.user.txttel) {
                $scope.showLoadingProperTimesRegAll();
                inserttransport(function () {
                    setTimeout(function () {
                        $scope.sendmailtosup($cookies.get('territoryid'), 'ขออนุมัติเปลี่ยนแปลงข้อมูลขนส่ง', 'เปลี่ยนแปลงข้อมูลที่อยู่ขนส่งของลูกค้า' + $stateParams.cusname, function () {
                            $scope.showLoadingComplete('บันทึกข้อมูลเสร็จแล้ว');
                            $ionicLoading.hide();
                            $ionicHistory.goBack(-1);
                        });
                    }, 2000);
                });
            }
        }
        $scope.cAdjustmentCancel = function () {
            console.log('back');
            $scope.txtname = '';
            $scope.txttel = '';
            $ionicLoading.hide();
            $ionicHistory.goBack(-1);
        }
    })
    .controller('AdjustmentCreditCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.mastertype = $stateParams.mastertype;
        $ionicLoading.hide();
        $scope.$on("$ionicView.enter", function () {
            $scope.user = {
                accountid: '',
                txtname: '',
                swCloseAccount: false,
                slRemark: '',
                swCredit: false,
                txtCreditOld: '',
                txtCreditNew: 0
            }
            GetResionStatus(function (data) {
                $scope.optionRession = data;
                $scope.$apply();
            });

            GetAccountById($stateParams.accountid, Data.mastertype, function (data) {
                $scope.user.accountid = data[0].accountid;
                $scope.user.txtname = data[0].name;
                $scope.user.swCloseAccount = false;
                $scope.user.slRemark = '';
                $scope.user.swCredit = false;
                $scope.user.txtCreditOld = data[0].ivz_balancecredit;
                $scope.user.txtCreditNew = 0;
                $scope.$apply();
            });
            $scope.chkSwitch = function (id) {
                console.log(id);
                $scope.user.swCloseAccount = id;
                if ($scope.user.swCredit == true) {
                    $scope.user.swCredit = !(id);
                } else {
                    $scope.user.swCredit = false;
                }
            }
            $scope.chkSwitchCredit = function (id) {
                console.log(id);
                $scope.user.swCredit = id;
                if ($scope.user.swCloseAccount == true) {
                    $scope.user.swCloseAccount = !(id);
                } else {
                    $scope.user.swCloseAccount = false;
                }
            }
        });

        function retrue(expression) {
            switch (expression) {
            case false:
                return 0;
                break;
            case expression:
                return 1;
                break;
            default:

            }
        }

        function insertcredit(callback) {
            var ins = new MobileCRM.DynamicEntity.createNew('ivz_accountadjustment');
            if ($scope.user.swCredit == true) {
                ins.properties.ivz_newcredcredit = parseInt(1);
                ins.properties.ivz_adjcredit = parseInt(1);
                if (parseInt($scope.user.txtCreditOld) > parseInt($scope.user.txtCreditNew)) {
                    ins.properties.ivz_newcredcreditoption = parseInt(2);
                } else {
                    ins.properties.ivz_newcredcreditoption = parseInt(1);
                }
                ins.properties.ivz_newcredcreditlimitold = parseInt($scope.user.txtCreditOld);
                ins.properties.ivz_newcredcreditlimitnew = parseInt($scope.user.txtCreditNew);
            } else {
                ins.properties.ivz_adjcredcloseaccount = retrue($scope.user.swCloseAccount);
                ins.properties.ivz_adjcredclosereason = parseInt($scope.user.slRemark);
            }
            ins.properties.ivz_name = $scope.user.txtname;
            ins.properties.ivz_transdate = new Date();
            //ins.properties.ivz_refrecid = $scope.ivz_integrationid;
            ins.properties.ivz_statusempid = parseInt(Data.mastertype);
            ins.properties.ivz_empid = $cookies.get('ivz_empid');
            ins.properties.ivz_territory = new MobileCRM.Reference('territory', Data.territoryadjust);
            ins.properties.statuscode = parseInt(917970000);
            ins.properties.ivz_customernumber = new MobileCRM.Reference('account', $stateParams.accountid);
            ins.save(function (er) {
                if (er) {
                    alert("ADJUSTMENT4920:" + er);
                } else {
                    callback();
                }
            });
        }

        function setclear() {
            $scope.user.accountid = '';
            $scope.user.txtname = '';
            $scope.user.swCloseAccount = false;
            $scope.user.slRemark = '';
            $scope.user.swCredit = false;
            $scope.user.txtCreditOld = 0;
            $scope.user.txtCreditNew = 0;
        }

        $scope.cAdjustment = function () {
            console.log('insert adjustment credit');
            $scope.showLoadingProperTimesRegAll();
            insertcredit(function () {
                setTimeout(function () {
                    if ($scope.user.swCredit == true) {
                        $scope.sendmailtosup($cookies.get('territoryid'), 'ขออนุมัติเปลี่ยนแปลงข้อมูลเครดิต', 'เปลี่ยนแปลงข้อมูลเครดิตของลูกค้า' + $scope.user.txtname, function () {
                            $scope.showLoadingComplete('บันทึกข้อมูลเสร็จแล้ว');
                            $ionicLoading.hide();
                            setclear();
                            $ionicHistory.goBack(-1);
                        });
                    } else {
                        $scope.sendmailtosup($cookies.get('territoryid'), 'ขออนุมัติปิดบัญชี', 'ปิดบัญชีของลูกค้า' + $scope.user.txtname, function () {
                            $scope.showLoadingComplete('บันทึกข้อมูลเสร็จแล้ว');
                            $ionicLoading.hide();
                            setclear();
                            $ionicHistory.goBack(-1);
                        });
                    }
                }, 2000);
            });
        }
        $scope.cAdjustmentCancel = function () {
            console.log('back');
            setclear();
            $ionicHistory.goBack(-1);
        }
    })
    .controller('AdjustmentContactCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.mastertype = $stateParams.mastertype;
        ///adjustmentcontact/:accountid/:mastertype/:cusname',
        $ionicLoading.hide();
        GetOptionContact(function (data) {
            $scope.listcontact = data;
            $scope.$apply();
        });
        $scope.user = {
            accountid: $stateParams.accountid,
            contype: '',
            txtcontactname: '',
            txtcontactlastname: ''
        }

        function insertcontact(callback) {
            var ins = new MobileCRM.DynamicEntity.createNew('ivz_accountadjustment');
            ins.properties.ivz_adjgeneral = parseInt(1);
            ins.properties.ivz_adjgencontact = parseInt(1);
            ins.properties.ivz_newgencontactfirstname = $scope.user.txtcontactname;
            ins.properties.ivz_newgencontactlastname = $scope.user.txtcontactlastname;
            ins.properties.ivz_contacttype = parseInt($scope.user.contype);
            ins.properties.ivz_name = $stateParams.cusname;
            ins.properties.ivz_transdate = new Date();
            //ins.properties.ivz_refrecid = $scope.ivz_integrationid;
            ins.properties.ivz_statusempid = parseInt(Data.mastertype);
            ins.properties.ivz_empid = $cookies.get('ivz_empid');
            ins.properties.ivz_territory = new MobileCRM.Reference('territory', Data.territoryadjust);
            ins.properties.statuscode = parseInt(917970000);
            ins.properties.ivz_customernumber = new MobileCRM.Reference('account', $stateParams.accountid);
            ins.save(function (er) {
                if (er) {
                    alert("ADJUSTMENT4888:" + er);
                } else {
                    callback();
                }
            });
        }

        function setclear() {
            $scope.user.accountid = '';
            $scope.user.contype = '';
            $scope.user.txtcontactname = '';
            $scope.user.txtcontactlastname = '';
        }

        $scope.cAdjustment = function () {
            console.log('insert adjustment credit');
            $scope.showLoadingProperTimesRegAll();
            insertcontact(function () {
                setTimeout(function () {
                    $scope.sendmailtosup($cookies.get('territoryid'), 'ขออนุมัติเปลี่ยนแปลงข้อมูลผู้ติดต่อ', 'เปลี่ยนแปลงข้อมูลผู้ติดต่อของลูกค้า' + $stateParams.cusname, function () {
                        $scope.showLoadingComplete('บันทึกข้อมูลเสร็จแล้ว');
                        $ionicLoading.hide();
                        setclear();
                        $ionicHistory.goBack(-1);
                    });
                }, 2000);
            });
        }
        $scope.cAdjustmentCancel = function () {
            console.log('back');
            setclear();
            $ionicHistory.goBack(-1);
        }
    })

//////////////////////////////////////////////////////////////////////////////////////
.controller('AdjustmentSupTerCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.mastertype = $stateParams.mastertype;
        $scope.listmaster = [];
        gettername($cookies.get('name'), function (data) {
            if (data) {
                var x = 0;
                var loopArray = function (arr) {
                    getPush(x, function () {
                        x++;
                        if (x < arr.length) {
                            loopArray(arr);
                        } else {
                            $scope.showLoadingComplete('โหลดข้อมูลเสร็จแล้ว');
                            setTimeout(function () {
                                $ionicLoading.hide();
                            }, 2000);
                        }
                    });
                }
                loopArray(data);

                function getPush(i, callback) {
                    $scope.showLoadingProperTimesRegter('โหลดข้อมูลเขตการขาย ' + data[i].description);
                    $scope.listmaster.push({
                        ivz_territorymasterid: data[i].ivz_territorymasterid,
                        ivz_mastername: data[i].ivz_mastername,
                        ivz_leftterritory: data[i].ivz_leftterritory,
                        ivz_emailcontact: data[i].ivz_emailcontact,
                        ivz_leadermail: data[i].ivz_leadermail,
                        ivz_ccmail: data[i].ivz_ccmail,
                        ivz_empid: data[i].ivz_empid,
                        ivz_empname: data[i].ivz_empname,
                        ivz_statusempid: data[i].ivz_statusempid,
                        description: data[i].description
                    });
                    setTimeout(function () {
                        callback();
                    }, 10);
                }
            }
            $scope.$apply();
        });
        $scope.goaccountlist = function (id) {
            //alert(id);
            $state.go('app.adjustmentlist', {
                terid: id,
                mastertype: Data.mastertype
            }, {
                reload: true
            });
        };
    })
    //////////////////////// End ////////////////////
    ////////////////////// Order ///////////////
    .controller('OrderListCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, $ionicModal, $ionicSlideBoxDelegate) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        //Data.mastertype = $stateParams.mastertype;
        $scope.clickmodel = function () {
            console.log('click logout');
            $scope.showcomment();
        }
        $ionicModal.fromTemplateUrl('templates/comment/comment.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closereject = function () {
            $scope.modal.hide();
        };
        // Open the login modal
        $scope.showcomment = function () {
            $scope.modal.show();
        };
        $scope.gobb = function () {
            $ionicHistory.goBack(-1);
        }
    })
    .controller('OrderCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory) {
        $state.reload();
        Data.showcart = false;
        $scope.Data = Data;
        Data.mastertype = $stateParams.mastertype; //$stateParams.accountid
        $scope.gooporder = function (id) {
            var getguid = guid();
            $state.go('app.productlist', {
                accountid: $stateParams.accountid,
                mastertype: $stateParams.mastertype,
                ordertype: id,
                getguid: getguid
            }, {
                reload: true
            });
        }
    })
    .controller('ProductLisCtrl', function ($scope, Setting, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, $ionicModal, DataOrder) {
        $state.reload();
        $scope.Data = Data;
        $scope.filtertxt = '';
        $ionicHistory.clearHistory();
        $scope.$on('$ionicView.enter', function () {
            console.log($stateParams.ordertype);
            if ($stateParams.ordertype == 1 || $stateParams.ordertype == 2) {
                Data.showcart = true;
            } else {
                Data.showcart = false;
            }
            // Data.tatolmatch = Data.tatolmatch;
            // Data.tatolminplus = Data.tatolminplus;
            // if(Data.tatolmatch > 0){
            //     console.log('eeee');
            // }else{
            //   console.log('ffff');
            // }
        });
        $scope.user = {
            id: '',
            adjustid: '',
            txtname: '',
            tername: '',
            filetername: '',
            remarkname: ''
        };
        $scope.chk = {
            remark: true
        };
        $scope.item = {
            adjustid: '',
            productid: '',
            productname: '',
            priceperunit: '',
            uomid: '',
            pricelevel: '',
            tatol: '',
            matchitem: 0,
            tatolmatch: 0,
            itemname: '',
            itemnumber: ''
        };
        $scope.clearfilter = function () {
            console.log('clickkkk');
            $scope.filtertxt = '';
        }
        $scope.minplus = 0;
        $scope.reload = function () {
            $scope.listproduct = [];
            //set show product
            GetProductList(Setting.requestproduct, 1, function (data) {
                var x = 0;
                var loopArray = function (arr) {
                    getPush(x, function () {
                        x++;
                        if (x < arr.length) {
                            loopArray(arr);
                        } else {
                            $ionicLoading.hide();
                        }
                    });
                }
                loopArray(data);

                function getPush(i, callback) {
                    $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล ' + data[i].filtername);
                    $scope.listproduct.push({
                        productid: data[i].productid,
                        name: data[i].name,
                        productnumber: data[i].productnumber,
                        price: data[i].price,
                        uomid: data[i].uomid.id,
                        pricelevelid: data[i].pricelevelid.id,
                        createdon: data[i].createdon,
                        stockstatus: data[i].stockstatus,
                        defaultuomscheduleid: data[i].defaultuomscheduleid,
                        filtername: data[i].filtername
                    });
                    setTimeout(function () {
                        callback();
                    }, 10);
                }
                $scope.$apply();
            });
        }
        $scope.reload();
        $ionicModal.fromTemplateUrl('templates/comment/productdetail.html', {
            id: 1,
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal1 = modal;
        });
        $ionicModal.fromTemplateUrl('templates/comment/searchitem.html', {
            id: 2,
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal2 = modal;
        });
        // Triggered in the login modal to close it
        $scope.chktrueminus = false;
        $scope.closereject = function () {
            Data.tatolminplus = parseInt(Data.tatolminplus) - parseInt($scope.item.matchitem);
            //Data.tatolmatch =  parseInt(Data.tatolmatch) - parseInt($scope.item.tatol);
            $scope.modal1.hide();
        };
        $scope.open1 = function (productid, name, priceperunit, pricelevel, uomid) {
            var y = productid + '\n' + name + '\n' + priceperunit + '\n' + pricelevel + '\n' + uomid;
            //alert(y);
            $scope.item.productid = productid;
            $scope.item.productname = name;
            $scope.item.priceperunit = priceperunit;
            $scope.item.uomid = uomid;
            $scope.item.pricelevel = pricelevel;
            $scope.item.tatol = 0;
            $scope.item.matchitem = 0;
            $scope.modal1.show();
        };
        $scope.closesearch = function () {
            $scope.modal2.hide();
        }
        $scope.opensearch = function () {
            $scope.modal2.show();
        }
        var j = 0;
        $scope.addplus = function (id) {
            if ($scope.item.matchitem <= 0) {
                $scope.item.matchitem = 0 + parseInt(id);
            } else {
                $scope.item.matchitem = parseInt($scope.item.matchitem) + parseInt(id);
                //Data.tatolminplus = parseInt(Data.tatolminplus) + parseInt($scope.item.matchitem);
            }
            if (Data.tatolminplus <= 0) {
                $scope.item.tatol = parseInt($scope.item.priceperunit) * 1;
                Data.tatolminplus = 0 + 1;
            } else {
                $scope.item.tatol = parseInt($scope.item.priceperunit) * parseInt($scope.item.matchitem);
                Data.tatolminplus = parseInt(Data.tatolminplus) + 1;
            }
        };
        $scope.minus = function (id) {
            if ($scope.item.matchitem <= 0) {
                $scope.item.matchitem = 0;
                //$scope.item.tatol = parseInt($scope.item.priceperunit) * 0;
            } else {
                $scope.item.matchitem = parseInt($scope.item.matchitem) - parseInt(id);
            }
            if (Data.tatolminplus <= 0) {
                Data.tatolminplus = 0;
            } else {
                if ($scope.item.matchitem <= 0) {
                    Data.tatolminplus = parseInt(Data.tatolminplus);
                } else {
                    Data.tatolminplus = parseInt(Data.tatolminplus) - 1;
                }
            }
        };
        $scope.$watch('item.matchitem', function () {
            if ($scope.item.matchitem <= 0) {
                $scope.item.matchitem = 0;
                $scope.item.tatol = parseInt($scope.item.priceperunit) * 0;
                //Data.tatolmatch =
            } else {
                $scope.item.tatol = parseInt($scope.item.priceperunit) * parseInt($scope.item.matchitem);
            }
            console.log('$scope.item.matchitem :' + $scope.item.matchitem);
        });
        $scope.searclickitem = function (txtname, itemid) {
            if (txtname) {
                //alert('txtname:'+txtname);
                GetProductListName(txtname, 10000, 1, function (data) {
                    $scope.listproduct = [];
                    if (data) {
                        var x = 0;
                        var loopArray = function (arr) {
                            getPush(x, function () {
                                x++;
                                if (x < arr.length) {
                                    loopArray(arr);
                                } else {
                                    $ionicLoading.hide();
                                    $scope.modal2.hide();
                                }
                            });
                        }
                        loopArray(data);

                        function getPush(i, callback) {
                            $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล ' + data[i].filtername);
                            $scope.listproduct.push({
                                productid: data[i].productid,
                                name: data[i].name,
                                productnumber: data[i].productnumber,
                                price: data[i].price,
                                uomid: data[i].uomid,
                                pricelevelid: data[i].pricelevelid,
                                createdon: data[i].createdon,
                                stockstatus: data[i].stockstatus,
                                defaultuomscheduleid: data[i].defaultuomscheduleid,
                                filtername: data[i].filtername
                            });
                            setTimeout(function () {
                                callback();
                            }, 5);
                        }
                    }
                    $scope.$apply();
                });
            } else if (itemid) {
                //alert('itemid:'+itemid);
                GetProductListNumber(itemid, 10000, 1, function (data) {
                    $scope.listproduct = [];
                    if (data) {
                        var x = 0;
                        var loopArray = function (arr) {
                            getPush(x, function () {
                                x++;
                                if (x < arr.length) {
                                    loopArray(arr);
                                } else {
                                    $ionicLoading.hide();
                                    $scope.modal2.hide();
                                }
                            });
                        }
                        loopArray(data);

                        function getPush(i, callback) {
                            $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล ' + data[i].filtername);
                            $scope.listproduct.push({
                                productid: data[i].productid,
                                name: data[i].name,
                                productnumber: data[i].productnumber,
                                price: data[i].price,
                                uomid: data[i].uomid,
                                pricelevelid: data[i].pricelevelid,
                                createdon: data[i].createdon,
                                stockstatus: data[i].stockstatus,
                                defaultuomscheduleid: data[i].defaultuomscheduleid,
                                filtername: data[i].filtername
                            });
                            setTimeout(function () {
                                callback();
                            }, 5);
                        }
                    }
                    $scope.$apply();
                });
            } else {
                $scope.item.itemname = '';
                $scope.item.itemnumber = '';
                $scope.reload();
                $scope.modal2.hide();
                //console.log('all:'+txtname +'&&' +itemid);
            }
        }
        $scope.itemcart = [];
        $scope.additem = function () {
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
                        quality: $scope.item.matchitem
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
                    quality: $scope.item.matchitem
                });
            }
            setTimeout(function () {
                Data.tatolmatch = parseInt(Data.tatolmatch) + parseInt($scope.item.tatol);
                $scope.modal1.hide();
            }, 1000);
        }
        $scope.confirm = function () {}
    })
    .controller('ListOrderCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, $ionicModal, DataOrder) {
        $state.reload();
        $scope.Data = Data;
        //Data.showcart = false;
        $scope.$on('$ionicView.enter',function(){
          //alert($stateParams.terid);
          //alert('loading list order');
          Data.showcart = false;
        });
        $scope.user = {
          accountid:'',
          name:'',
          territoryname:'',
          terid:'',
          currency:'',
          creditlimit:'',
          district:'',
          provinceid:'',
          shippingmethodcode:'',
          paymenttermscode:'',
          remark:''
        }
        $scope.item = {
          productid:'',
          productname:'',
          priceperunit:'',
          tatol:'',
          matchitem:''
        };
        $scope.loading = function () {
            $scope.listorderdetail = [];
            var dataorder = DataOrder.order;
            var x = 0;
            var loopArray = function (arr) {
                getPush(x, function () {
                    x++;
                    if (x < arr.length) {
                        loopArray(arr);
                    } else {
                        $ionicLoading.hide();
                    }
                });
            }
            loopArray(dataorder);

            function getPush(i, callback) {
                $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล ' + dataorder[i].productname);
                $scope.listorderdetail.push({
                    getguid:dataorder[i].getguid,
                    accountid:dataorder[i].accountid,
                    ordertype:dataorder[i].ordertype,
                    productid:dataorder[i].productid,
                    productname:dataorder[i].productname,
                    priceperunit:dataorder[i].priceperunit,
                    pricelevelid:dataorder[i].pricelevelid,
                    uomid:dataorder[i].uomid,
                    tatol:dataorder[i].tatol,
                    quality:dataorder[i].quality
                });
                setTimeout(function () {
                    callback();
                }, 5);
            }
        }

        $scope.$on('$ionicView.enter', function () {
            $scope.loading();
        });
        $scope.ordedetail = function () {
            $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล');
            setTimeout(function () {
                $ionicLoading.hide();
            }, 3000);
        }
        $scope.opendetail = function(id,name,price,tatol,quality){
          console.log(id+'\n'+name+'\n'+price+'\n'+tatol+'\n'+quality);
          $scope.item.productid = id;
          $scope.item.productname = name;
          $scope.item.priceperunit = price;
          $scope.item.tatol = tatol;
          $scope.item.matchitem = quality;
          $scope.showmodal(2);
        }

        /*------------- add product quality ---------------*/
        $scope.addpluss = function (data) {
            var m = 0;
            for (var i in $scope.listorderdetail) {
                m += parseInt($scope.listorderdetail[i].quality) * parseInt($scope.listorderdetail[i].priceperunit);
            }
            return m;
        }
        $scope.removeitem = function(id){
          $scope.listorderdetail.splice(id,1);
        }
        $scope.addplus = function (id) {
            if ($scope.item.matchitem <= 0) {
                $scope.item.matchitem = 0 + parseInt(id);
            } else {
                $scope.item.matchitem = parseInt($scope.item.matchitem) + parseInt(id);
                //Data.tatolminplus = parseInt(Data.tatolminplus) + parseInt($scope.item.matchitem);
            }
            if (Data.tatolminplus <= 0) {
                $scope.item.tatol = parseInt($scope.item.priceperunit) * 1;
                //Data.tatolminplus = 0 + 1;
            } else {
                $scope.item.tatol = parseInt($scope.item.priceperunit) * parseInt($scope.item.matchitem);
                //Data.tatolminplus = parseInt(Data.tatolminplus) + 1;
            }
        };
        $scope.minus = function (id) {
            if ($scope.item.matchitem <= 0) {
                $scope.item.matchitem = 0;
                //$scope.item.tatol = parseInt($scope.item.priceperunit) * 0;
            } else {
                $scope.item.matchitem = parseInt($scope.item.matchitem) - parseInt(id);
            }
        };
        $scope.$watch('item.matchitem', function () {
            if ($scope.item.matchitem <= 0) {
                $scope.item.matchitem = 0;
                $scope.item.tatol = parseInt($scope.item.priceperunit) * 0;
                //Data.tatolmatch =
            } else {
                $scope.item.tatol = parseInt($scope.item.priceperunit) * parseInt($scope.item.matchitem);
            }
            console.log('$scope.item.matchitem :' + $scope.item.matchitem);
        });
        $scope.additem = function () {
            if (DataOrder.order.length > 0) {
                for (var i in DataOrder.order) {
                    if (DataOrder.order[i].productid == $scope.item.productid) {
                        console.log('break ' + i);
                        DataOrder.order[i].tatol = parseInt($scope.item.tatol);
                        DataOrder.order[i].quality = parseInt($scope.item.matchitem);
                        break;
                    }
                }
            }
            setTimeout(function () {
                Data.tatolmatch = parseInt(Data.tatolmatch) + parseInt($scope.item.tatol);
                $scope.loading();
                $scope.modal2.hide();
            }, 1000);
        }
        /*--------------- end -----------------*/
        $ionicModal.fromTemplateUrl('templates/comment/customerremark.html', {
            id: 1,
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal1 = modal;
        });
        $ionicModal.fromTemplateUrl('templates/comment/orderdetail.html', {
            id: 2,
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal2 = modal;
        });
        $scope.showmodal = function (id) {
            $scope.idmodal = id;
            if (id == 1) {
              console.log('loop accountiid get name territory');
              $scope.modal1.show();
            }else if(id == 2){
              $scope.modal2.show();
            }
        }
        $scope.$watch('idmodal',function(){
          GetAccountById($scope.listorderdetail[0].accountid,Data.mastertype,function(data){
            $scope.user.accountid = data[0].accountid;
            $scope.user.name = data[0].name;
            $scope.user.territoryname = data[0].territoryid;
            $scope.user.terid = data[0].territoryid.id;
            $scope.user.currency =  data[0].currencyid.id;
            $scope.user.creditlimit = data[0].ivz_balancecredit;
            $scope.user.district = data[0].ivz_addressdistrict.id;
            $scope.user.provinceid = data[0].ivz_addressprovince.id;
            $scope.user.shippingmethodcode = data[0].shippingmethodcode;
            $scope.user.paymenttermscode = data[0].paymenttermscode;
            $scope.user.remark = '';
            $scope.$apply();
          });
        });
        $scope.closemodal = function (id) {
            if (id == 1) {
                $scope.user.accountid = '';
                $scope.user.name = '';
                $scope.user.territoryname = '';
                $scope.user.terid = '';
                $scope.user.currency = '';
                $scope.user.creditlimit = '';
                $scope.user.district = '';
                $scope.user.provinceid = '';
                $scope.user.shippingmethodcode = '';
                $scope.user.paymenttermscode = '';
                $scope.user.remark = '';
                $scope.modal1.hide();
              }else if(id == 2){
                $scope.modal2.hide();
              }
        }
        $scope.closereject = function(){
          $scope.modal2.hide();
        }
        function insertorder(){
            $scope.showLoadingProperTimesRegter('กำลังบันทึกข้อมูลออร์เดอร์ของลูกค้า '+'$scope.user.name');
            try {
              //alert('pricreid:'+$scope.listorderdetail[0].pricelevelid+'\n'+$scope.listorderdetail[0].getguid+'\n'+$scope.listorderdetail[0].ordertype);
              var ins = new MobileCRM.DynamicEntity.createNew('salesorder');
                  ins.properties.salesorderid = $scope.listorderdetail[0].getguid;
                  ins.properties.customerid = new MobileCRM.Reference('account',$scope.user.accountid);
                  ins.properties.name = $scope.user.name;
                  ins.properties.transactioncurrencyid = new MobileCRM.Reference('transactioncurrency',$scope.user.currency);
                  ins.properties.requestdeliveryby = new Date();
    							ins.properties.pricelevelid = new MobileCRM.Reference('pricelevel',$scope.listorderdetail[0].pricelevelid);
                  ins.properties.shippingmethodcode = parseInt($scope.user.shippingmethodcode);
                  ins.properties.paymenttermscode = parseInt($scope.user.paymenttermscode);
                  ins.properties.ivz_province = new MobileCRM.Reference('ivz_addressprovince',$scope.user.provinceid);
                  ins.properties.ivz_district =  new MobileCRM.Reference('ivz_addressdistrict',$scope.user.district);
                  ins.properties.ivz_territory = new MobileCRM.Reference('territory',$scope.user.terid);
                  ins.properties.ivz_balancecredit = $scope.user.creditlimit;
                  ins.properties.totalamount = parseInt($scope.addpluss());
                  ins.properties.ivz_empid = $cookies.get('ivz_empid');
                  ins.properties.statuscode = parseInt(2);
    							ins.properties.ivz_statussales = parseInt($scope.listorderdetail[0].ordertype);
    							ins.properties.description = $scope.user.remark;
                  ins.save(function(er){
                    if(er){
                      alert('error 6077 '+er);
                    }else{
                      //alert('insert order');
                      insertorderdetail($scope.listorderdetail[0].getguid);
                    }
                  });
            } catch (e) {
              alert('insert order 6080 '+e);
            }
          }
        function insertorderdetail(id){
            var x = 0;
            var loopArray = function(arr){
              console.log('Detail x:'+x);
              getPush(x,function(){
                x++;
                if(x < arr.length){
                  loopArray(arr);
                }else{
                  $ionicLoading.hide();
                  Data.tatolmatch = 0;
                  Data.tatolminplus = 0;
                  DataOrder.order.length = 0;
                  //$scope.modal1.hide();
                  $ionicHistory.nextViewOptions({
                      disableBack: true
                  });
                  setTimeout(function(){
                    // var expression = $scope.listorderdetail[0].ordertype;//get ordertype
                    // switch (expression) {
                    //   case '1':
                    //       alert('default order');
                    //     break;
                    //   case '2':
                    //       $scope.sendmailtosup($scope.user.terid,'เปิดใบสั่งขาย(สนับสนุนขาย)','เปิดใบสั่งขาย(สนับสนุนขาย) ร้าน'+$scope.user.name,function(){
                    //         alert('special order sendmail');
                    //       });
                    //     break;
                    //   default:
                    // }
                    $state.go('app.orderlistpending', {
                        terid: Data.termas,//$cookies.get('territoryid'),//if direct sale can change get value by Data factory
                        mastertype: Data.mastertype,
                        ordertype: $scope.listorderdetail[0].ordertype
                    }, {
                        reload: true
                    });
                  },100);
                }
              });
            }
          loopArray($scope.listorderdetail);
          function getPush(i,callback){
            $scope.showLoadingProperTimesRegter('กำลังทำการบันทึกข้อมูล '+$scope.listorderdetail[i].productname);
            console.log('insert order detail '+i +'::'+ x);
            var ins = new MobileCRM.DynamicEntity.createNew('salesorderdetail');
                ins.properties.salesorderid = new MobileCRM.Reference('salesorder',id);
                ins.properties.productid = new MobileCRM.Reference('product',$scope.listorderdetail[i].productid);
                ins.properties.ispriceoverridden = parseInt(0);
                ins.properties.priceperunit = $scope.listorderdetail[i].priceperunit;
                ins.properties.uomid = new MobileCRM.Reference('uom',$scope.listorderdetail[i].uomid);
                ins.properties.quantity = $scope.listorderdetail[i].quality;
                ins.save(function(er){if(er){
                  alert(er);
                }else{
                  setTimeout(function(){
                    callback();
                  },1000);
                }
              });
          }
        }
        $scope.confirmordersales = function () {
          $scope.modal1.hide();
          var id = guid();
          //alert(id);
          insertorder();
        }
    })
    .controller('ListOrderPendingCtrl', function ($scope, $stateParams,Setting, $cookies, Data, $state, $ionicLoading, $ionicHistory, $ionicModal, DataOrder) {
        $state.reload();
        $scope.Data = Data;
        $ionicHistory.clearHistory();
        $scope.group = {
                filter: ''
            }
        $scope.user = {
          filtername:''
        }
        $scope.$on('$ionicView.enter',function(){
          Data.showcart = false;
          $scope.loaddata();
        });
        $scope.loaddata = function(){
          GetOrder($stateParams.terid,Setting.setValorder,1,function(data){
            if(data){
              $scope.listorder = [];
              var x = 0;
              var loopArray = function(arr){
                getPush(x,function(){
                  x++;
                  if(x < arr.length){
                    loopArray(arr);
                  }else{
                    $ionicLoading.hide();
                  }
                });
              }
              loopArray(data);
              function getPush(i,callback){
                $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล '+data[i].name);
                $scope.listorder.push({
    							salesorderid:data[i].salesorderid,
    							customerid:data[i].customerid,
    							name:data[i].name,
    							transactioncurrencyid:data[i].transactioncurrencyid,
    							requestdeliveryby:data[i].requestdeliveryby,
    							pricelevelid:data[i].pricelevelid,
    							shippingmethodcode:data[i].shippingmethodcode,
    							paymenttermscode:data[i].paymenttermscode,
    							ivz_province:data[i].ivz_province,
    							ivz_district:data[i].ivz_district,
    							ivz_territory:data[i].ivz_territory,
    							ivz_balancecredit:data[i].ivz_balancecredit,
    							totalamount:data[i].totalamount,
    							ivz_empid:data[i].ivz_empid,
    							statuscode:data[i].statuscode,
    							ivz_statussales:data[i].ivz_statussales,
    							description:data[i].description,
                  ivz_ordernumber:data[i].ivz_ordernumber,
                  ordernumber:data[i].ordernumber
    						});
                setTimeout(function(){
                  callback();
                },10);
              }
            }
            $scope.$apply();
          });
        }
            //Data.showcart = false;
        $scope.ordedetail = function () {
            $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล');
            setTimeout(function () {
                $ionicLoading.hide();
            }, 3000);
        }
        $scope.$watch('group.filter',function(){
          $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล');
          setTimeout(function () {
              $ionicLoading.hide();
          }, 3000);
        });
        $ionicModal.fromTemplateUrl('templates/comment/selectfilter.html', {
            id: 1,
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal1 = modal;
        });
        $scope.showmodal = function (id) {
            if (id == 1) {
                $scope.modal1.show();
            }
        }
        $scope.closemodal = function (id) {
            if (id == 1) {
                $scope.modal1.hide();
            }
        }
        $scope.showdetailorder = function (id,name,terid,salestype) {
          //alert(id);
            $state.go('app.orderlistother', {
                orderid: id,
                mastertype: Data.mastertype,
                ordertype:$stateParams.ordertype,
                accountname:name,
                terid:terid,
                salestype:salestype
            }, {
                reload: true
            });
        }

    })
    .controller('ListOrderOtherCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, $ionicModal, DataOrder) {
        $state.reload();
        $scope.Data = Data;
        $scope.item = {
           productid:'',
           productname:'',
           priceperunit:'',
           tatol:'',
           matchitem:''
        }
        $scope.salestype = true;
        $scope.$on('$ionicView.enter',function(){
          Data.showcart = false;
          $scope.ordedetail();
          if($stateParams.salestype == 1 || $stateParams.salestype == '1'){
            $scope.salestype = true;
          }else{
            $scope.salestype = false;
          }
        });
        $scope.loadData = function(){
          $scope.listorderdetail = [];
          var a = new MobileCRM.FetchXml.Entity('salesorderdetail');
        		a.addAttribute('salesorderdetailid');//0
        		a.addAttribute('salesorderid');//1
        		a.addAttribute('productid');//2
        		a.addAttribute('priceperunit');//3
        		a.addAttribute('uomid');//4
        		a.addAttribute('quantity');//5
        	var l = a.addLink('product','productid','productid','outer');
        		l.addAttribute('price');//6
            l.addAttribute('productnumber');//7
        	var filter = new MobileCRM.FetchXml.Filter();
        		filter.where('salesorderid','eq',$stateParams.orderid.trim());
        		a.filter = filter;
        	var fetch = new MobileCRM.FetchXml.Fetch(a);
        		fetch.execute('array',function(data){
                if(data){
                    for(var i in data){
                      $scope.listorderdetail.push({
                        salesorderdetail:data[i][0],
                        salesorderid:data[i][1],
                        productid:data[i][2].id,
                        productname:data[i][2].primaryName,
                        priceperunit:data[i][3],
                        uomid:data[i][4].id,
                        quality:data[i][5],
                        price:data[i][6],
                        productnumber:data[i][7],
                        tatol:parseInt(data[i][3]) * parseInt(data[i][5])
                      });
                    }
                  }
                  $scope.$apply();
        		},function(er){
              alert("ERROR 6333:"+er);
            },null);
        }

        $scope.plusquery = function(price,tatol){
          return parseInt(price) * parseInt(tatol);
        }

        $scope.ordedetail = function () {
            $scope.showLoadingProperTimesRegter('กำลังโหลดข้อมูล');
            $scope.loadData();
            setTimeout(function () {
                $ionicLoading.hide();
            }, 3000);
        }
        $scope.showmodal = function (id) {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $ionicHistory.goBack(-1);
        }

        $ionicModal.fromTemplateUrl('templates/comment/orderdetail.html', {
            id: 2,
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal2 = modal;
        });
        $scope.showmodal = function (id) {
            $scope.idmodal = id;
            if (id == 1) {
              console.log('loop accountiid get name territory');
              $scope.modal1.show();
            }else if(id == 2){
              $scope.modal2.show();
            }
        }
        $scope.closereject = function(){
          $scope.modal2.hide();
        }
        $scope.opendetail = function(id,name,price,tatol,quality){
          console.log(id+'\n'+name+'\n'+price+'\n'+tatol+'\n'+quality);
          $scope.item.productid = id;
          $scope.item.productname = name;
          $scope.item.priceperunit = price;
          $scope.item.tatol = tatol;
          $scope.item.matchitem = quality;
          $scope.showmodal(2);
        }

        /*------------- add product quality ---------------*/
        $scope.addpluss = function (data) {
            var m = 0;
            for (var i in $scope.listorderdetail) {
                m += parseInt($scope.listorderdetail[i].quality) * parseInt($scope.listorderdetail[i].priceperunit);
            }
            return m;
        }
        $scope.removeitem = function(id){
          $scope.listorderdetail.splice(id,1);
        }
        $scope.addplus = function (id) {
            if ($scope.item.matchitem <= 0) {
                $scope.item.matchitem = 0 + parseInt(id);
            } else {
                $scope.item.matchitem = parseInt($scope.item.matchitem) + parseInt(id);
            }
        };
        $scope.minus = function (id) {
            if ($scope.item.matchitem <= 0) {
                $scope.item.matchitem = 0;
                //$scope.item.tatol = parseInt($scope.item.priceperunit) * 0;
            } else {
                $scope.item.matchitem = parseInt($scope.item.matchitem) - parseInt(id);
            }
        };
        $scope.$watch('item.matchitem', function () {
            if ($scope.item.matchitem <= 0) {
                $scope.item.matchitem = 0;
                $scope.item.tatol = parseInt($scope.item.priceperunit) * 0;
            } else {
                $scope.item.tatol = parseInt($scope.item.priceperunit) * parseInt($scope.item.matchitem);
            }
            console.log('$scope.item.matchitem :' + $scope.item.matchitem);
        });
        $scope.additem = function () {
            if ($scope.listorderdetail.length > 0) {
                for (var i in $scope.listorderdetail) {
                    if ($scope.listorderdetail[i].productid == $scope.item.productid) {
                        console.log('break ' + i);
                        $scope.listorderdetail[i].tatol = parseInt($scope.item.tatol);
                        $scope.listorderdetail[i].quality = parseInt($scope.item.matchitem);
                        break;
                    }
                }
            }
            setTimeout(function () {
                $scope.closereject();
            }, 1000);
        }
        $scope.$watch('listorderdetail',function(){
          $scope.loading();
        });
        function setApproveOrder(){
          var ups = new MobileCRM.DynamicEntity('salesorder',$stateParams.orderid.trim());
              ups.properties.statuscode = parseInt(917970000);
              ups.save(function(er){
                if(er){
                  alert('error 6436 '+er);
                }else{
                  //call function insert deatil
                  //alert('approved done');
                  try {
                    deleteorderdetail();
                  } catch (e) {
                    alert('error 6445 '+e);
                  }
                }
              });
        }

        function deleteorderdetail(){
          $scope.showLoadingProperTimesRegter('กำลังทำแก้ไขข้อมูล');
          console.log('delete orderdetail');
          //call function insert orderdetail
          var x = 0;
          var loopArray = function(arr){
            getDelete(x,function(){
              x++;
              if(x < arr.length){
                loopArray(arr);
              }else{
                //alert('delete done');
                orderdetailproduct();
              }
            });
          }
          loopArray($scope.listorderdetail);
          function getDelete(i,callback){
              try {
                MobileCRM.DynamicEntity.deleteById("salesorderdetail",$scope.listorderdetail[i].salesorderdetail,
                function () {

                },function (er) {
                                  MobileCRM.bridge.alert("An error occurred: " + er);
                              	});
              } catch (e) {
                alert('error 6479 '+er);
              } finally {
                setTimeout(function(){
                  callback();
                },10);
              }
          }
        }

        function orderdetailproduct(){
          //loop approve
          var x = 0;
          var loopArray = function(arr){
            inSertDetail(x,function(){
              x++;
              if(x < arr.length){
                loopArray(arr);
              }else{
                //alert('insert detail done ');
                $ionicLoading.hide();
                setTimeout(function(){
                  switch ($scope.salestype) {
                    case true:
                      $ionicHistory.goBack(-1);
                      break;
                    case false:
                      $scope.sendmailtosup($stateParams.terid.trim(),'เปิดใบสั่งขาย(สนับสนุนขาย)','เปิดใบสั่งขาย(สนับสนุนขาย) ร้าน'+$stateParams.accountname,function(){
                        //alert('special order sendmail');
                        $ionicHistory.goBack(-1);
                      });
                      break;
                  }
                },10);
              }
            });
          }
          loopArray($scope.listorderdetail);
          function inSertDetail(i,callback){
            $scope.showLoadingProperTimesRegter('กำลังทำการบันทึกข้อมูล '+$scope.listorderdetail[i].productname);
            var ins = new MobileCRM.DynamicEntity.createNew('salesorderdetail');
                ins.properties.salesorderid = new MobileCRM.Reference('salesorder',$stateParams.orderid.trim());
                ins.properties.productid = new MobileCRM.Reference('product',$scope.listorderdetail[i].productid);
                ins.properties.ispriceoverridden = parseInt(0);
                ins.properties.priceperunit = $scope.listorderdetail[i].priceperunit;
                ins.properties.uomid = new MobileCRM.Reference('uom',$scope.listorderdetail[i].uomid);
                ins.properties.quantity = $scope.listorderdetail[i].quality;
                ins.save(function(er){
                  if(er){
                    alert(er);
                  }else{
                    setTimeout(function(){
                      callback();
                    },1000);
                  }
              });
          }
        }
        $scope.confirmorder = function(){
          switch ($scope.salestype) {
            case true:
                alert('default order');
                setApproveOrder();
              break;
            case false:
                alert('sales order support');
                deleteorderdetail();
              break;
          }
        }
        /*--------------- end -----------------*/
    })
    /*------------------------------- end order ------------------------------*/


.controller('ExamplCtrl', function ($scope, $stateParams, $cookies, Data, $state, $ionicLoading, $ionicHistory, $ionicModal, DataOrder) {
        $state.reload();
        $scope.Data = Data;
        $scope.filtertxt = '';
        var b = [
            {
                name: "Alpha Sports",
                priceperunit: 12000,
                status: 'in stock',
                uomid: ''
            },
            {
                name: "Amuza",
                priceperunit: 8000,
                status: 'in stock',
                uomid: ''
            },
            {
                name: "Australian Six",
                priceperunit: 100,
                status: 'out of stock',
                uomid: ''
            },
            {
                name: "Australian Motor",
                priceperunit: 120,
                status: 'in stock',
                uomid: ''
            },
            {
                name: "Industries",
                priceperunit: 120009,
                status: 'in stock',
                uomid: ''
            },
            {
                name: "Birchfield Motor",
                priceperunit: 12,
                status: 'in stock',
                uomid: ''
            },
            {
                name: "Company",
                priceperunit: 590,
                status: 'in stock',
                uomid: ''
            },
            {
                name: "Birrana",
                priceperunit: 3000,
                status: 'out of stock',
                uomid: ''
            },
            {
                name: "Bolwell",
                priceperunit: 6000,
                status: 'in stock',
                uomid: ''
            },
            {
                name: "Buckle Motors",
                priceperunit: 1222,
                status: 'out of stock',
                uomid: ''
            },
            {
                name: "Bulant Bullet",
                priceperunit: 780,
                status: 'out of stock',
                uomid: ''
            },
            {
                name: "Daytona Motors",
                priceperunit: 90,
                status: 'in stock',
                uomid: ''
            },
            {
                name: "Cheetah Racing",
                priceperunit: 10,
                status: 'in stock',
                uomid: ''
            }
          ];

        $scope.user = {
            id: '',
            adjustid: '',
            txtname: '',
            tername: '',
            filetername: '',
            remarkname: ''
        };
        $scope.chk = {
            remark: true
        };
        $scope.item = {
            productid: '',
            productname: '',
            priceperunit: '',
            uomid: '',
            tatol: '',
            matchitem: 0,
            tatolmatch: 0
        };
        $scope.clearfilter = function () {
            //console.log('clickkkk');
            $scope.filtertxt = '';
        }
        $scope.minplus = 0;
        $scope.reload = function () {
            $scope.listproduct = [];
            for (var i = 0; i <= (b.length - 1); i++) {
                //console.log(i);
                $scope.listproduct.push({
                    id: i,
                    productid: i,
                    name: b[i].name,
                    priceperunit: b[i].priceperunit,
                    status: b[i].status,
                    uomid: 'unitid' + i
                });
            }
        }
        $scope.reload();
        $scope.$on("$ionicView.enter", function () {
            Data.showcart = true;
            // Data.tatolmatch = 0;
            // Data.tatolminplus = 0;
        });
        $ionicModal.fromTemplateUrl('templates/comment/productdetail.html', {
            id: 1,
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal1 = modal;
        });
        $ionicModal.fromTemplateUrl('templates/comment/searchitem.html', {
            id: 2,
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal2 = modal;
        });
        // Triggered in the login modal to close it
        $scope.chktrueminus = false;
        $scope.closereject = function () {
            Data.tatolminplus = parseInt(Data.tatolminplus) - parseInt($scope.item.matchitem);
            DataOrder.tatol = parseInt(Data.tatolminplus) - parseInt($scope.item.matchitem);
            //Data.tatolmatch =  parseInt(Data.tatolmatch) - parseInt($scope.item.tatol);
            $scope.modal1.hide();
        };
        $scope.open1 = function (productid, name, priceperunit, priceperunit, uomid) {
            $scope.item.productid = productid;
            $scope.item.productname = name;
            $scope.item.priceperunit = priceperunit;
            $scope.item.uomid = uomid;
            $scope.item.tatol = 0;
            $scope.item.matchitem = 0;
            $scope.modal1.show();
        };
        $scope.closesearch = function () {
            $scope.modal2.hide();
        }
        $scope.opensearch = function () {
            $scope.modal2.show();
        }
        var j = 0;
        $scope.addplus = function (id) {
            if ($scope.item.matchitem <= 0) {
                $scope.item.matchitem = 0 + parseInt(id);
            } else {
                $scope.item.matchitem = parseInt($scope.item.matchitem) + parseInt(id);
                //Data.tatolminplus = parseInt(Data.tatolminplus) + parseInt($scope.item.matchitem);
            }
            if (Data.tatolminplus <= 0) {
                $scope.item.tatol = parseInt($scope.item.priceperunit) * 1;
                Data.tatolminplus = 0 + 1;
            } else {
                $scope.item.tatol = parseInt($scope.item.priceperunit) * parseInt($scope.item.matchitem);
                Data.tatolminplus = parseInt(Data.tatolminplus) + 1;
            }
        };
        $scope.minus = function (id) {
            if ($scope.item.matchitem <= 0) {
                $scope.item.matchitem = 0;
                //$scope.item.tatol = parseInt($scope.item.priceperunit) * 0;
            } else {
                $scope.item.matchitem = parseInt($scope.item.matchitem) - parseInt(id);
            }
            if (Data.tatolminplus <= 0) {
                Data.tatolminplus = 0;
            } else {
                if ($scope.item.matchitem <= 0) {
                    Data.tatolminplus = parseInt(Data.tatolminplus);
                } else {
                    Data.tatolminplus = parseInt(Data.tatolminplus) - 1;
                }
            }
        };
        $scope.$watch('item.matchitem', function () {
            if ($scope.item.matchitem <= 0) {
                $scope.item.matchitem = 0;
                $scope.item.tatol = parseInt($scope.item.priceperunit) * 0;
            } else {
                $scope.item.tatol = parseInt($scope.item.priceperunit) * parseInt($scope.item.matchitem);
            }
            //console.log('$scope.item.matchitem :' + $scope.item.matchitem);
        });
        $scope.searclickitem = function (txtname, itemid) {
            if (txtname) {
                console.log('txtname:' + txtname);
            } else if (itemid) {
                console.log('itemid:' + itemid);
            } else {
                console.log('all:' + txtname + '&&' + itemid);
            }
        }
        $scope.itemcart = [];
        $scope.additem = function () {
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
                        productid: $scope.item.productid,
                        productname: $scope.item.productname,
                        priceperunit: $scope.item.priceperunit,
                        uomid: $scope.item.uomid,
                        tatol: $scope.item.tatol,
                        quality: $scope.item.matchitem
                    });
                }
            } else {
                DataOrder.order.push({
                    productid: $scope.item.productid,
                    productname: $scope.item.productname,
                    priceperunit: $scope.item.priceperunit,
                    uomid: $scope.item.uomid,
                    tatol: $scope.item.tatol,
                    quality: $scope.item.matchitem
                });
            }
            setTimeout(function () {
                Data.tatolmatch = parseInt(Data.tatolmatch) + parseInt($scope.item.tatol);
                DataOrder.matcher = parseInt(Data.tatolmatch) + parseInt($scope.item.tatol);
                $scope.modal1.hide();
            }, 1000);
        }
        $scope.confirm = function () {
            console.log('tatol ' + $scope.item.tatolmatch);
            var x = 0;
            var loopArray = function (arr) {
                getPush(x, function () {
                    x++;
                    if (x < arr.length) {
                        loopArray(arr);
                    } else {
                        $ionicLoading.hide();
                    }
                });
            }
            loopArray(DataOrder.order);

            function getPush(i, callback) {
                $scope.showLoadingProperTimesRegter('กำลังบันทึกข้อมูล ' + DataOrder.order[i].productname);
                console.log('productid:' + DataOrder.order[i].productid + '\n' +
                    'productname:' + DataOrder.order[i].productname + '\n' +
                    'priceperunit:' + DataOrder.order[i].priceperunit + '\n' +
                    'uomid:' + DataOrder.order[i].uomid + '\n' +
                    'tatol:' + DataOrder.order[i].tatol + '\n' +
                    'quality:' + DataOrder.order[i].quality);
                setTimeout(function () {
                    callback();
                }, 100);
            }
        }
    })
    //////////////////////// End ////////////////////
;
