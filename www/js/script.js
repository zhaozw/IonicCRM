//////////////////////////// import script //////////////////////
document.writeln('<script src="lib/ionic/js/ionic.bundle.js"></script>');
document.writeln('<script src="js/jquery.js"></script>');
document.writeln('<script src="js/JSBridge.min.js"></script>');
document.writeln('<script src="js/alasql.min.js"></script>');
document.writeln('<script src="lib/ionic/js/angular/angular-animate.min.js"></script>');
document.writeln('<script src="lib/ionic/js/angular/angular-aria.min.js"></script>');
document.writeln('<script src="lib/ionic/js/angular/angular-messages.min.js"></script>');
document.writeln('<script src="lib/ionic/js/angular/angular-material.min.js"></script>');
document.writeln('<script src="lib/ionic/js/angular/angular-cookies.min.js"></script>');
document.writeln('<script src="lib/ionic/js/ng-cordova.min.js"></script>');
document.writeln('<script src="lib/ionic/js/ng-cordova-mocks.min.js"></script>');
document.writeln('<script src="js/app.js"></script>');
document.writeln('<script src="js/controllers.js"></script>');

function alerter(er){
	alert(er);
}
/*--------------------------- Check User --------------------------*/
function getUserCheck(uid,upwd,callback){
	/*alert('Get user:'+uid+'=='+upwd);*/
	var a = new MobileCRM.FetchXml.Entity('territory');
		a.addAttribute('territoryid');//0
		a.addAttribute('ivz_empname');//1
		a.addAttribute('ivz_empid');//2
		a.addAttribute('ivz_password');//3
		a.addAttribute('ivz_emailcontact');//4
		a.addAttribute('ivz_leadermail');//5
		a.addAttribute('ivz_ccmail');//6
		a.addAttribute('name');//7
		a.addAttribute('description');//8
		a.addAttribute('ivz_statusempid');//9
	var filter = new MobileCRM.FetchXml.Filter();
		filter.where('name','eq',uid);
		a.filter = filter;
	var fetch = new MobileCRM.FetchXml.Fetch(a);
		fetch.execute('array',function(data){
			var b = [];
			if(data){
				for(var i in data){
					if(data[0][3] === upwd){
						b.push({
								territoryid:data[0][0],
								ivz_empname:data[0][1],
								ivz_empid:data[0][2],
								ivz_password:data[0][3],
								ivz_emailcontact:data[i][4],
								ivz_leadermail:data[i][5],
								ivz_ccmail:data[i][6],
								ivz_name:data[i][7],
								ter_description:data[i][8],
								ivz_statusempid:data[i][9]
							});
					}
				}
				callback(b);
			}else{
				callback();
			}
		},function(er){alert(er);},null);
}
/*-------------------------- Chk Adjustment --------------------*/
function chkAdjustment(id,callback){
	var c = new MobileCRM.FetchXml.Entity('ivz_accountadjustment');
			c.addAttribute('ivz_accountadjustmentid');//0
			c.addAttribute('ivz_customernumber');//1
			c.addAttribute('statuscode');//2
	var filter = new MobileCRM.FetchXml.Filter();
			filter.where('ivz_customernumber','eq',id);
			c.filter = filter;
	var fetch = new MobileCRM.FetchXml.Fetch(c);
			fetch.execute('array',function(data){
				//alert('adjust '+data.length);
				var b = [];
				if(data){
					for(var i in data){
						//alert(data[i][2]);
						if(data[i][2] == 917970000){
							b.push({
								ivz_accountadjustmentid:data[i][0],
								ivz_customernumber:data[i][1],
								statuscode:data[i][2]
							});
						}
					}
				}
				callback(b);
			},function(er){alert(er);},null);
}
/* ----------------------------- Get Task ----------------------*/
function gettaskaccont(id,callback){
	var a = new MobileCRM.FetchXml.Entity('ivz_tasknewaccount');
		a.addAttribute('ivz_tasknewaccountid');//0
		a.addAttribute('ivz_name');//1
		a.addAttribute('ivz_customer');//2
		a.addAttribute('ivz_saletype');//3
		a.addAttribute('ivz_statusdoc');//4
		a.addAttribute('ivz_statuscustomer');//5
		a.addAttribute('ivz_territory');//6
		a.addAttribute('ivz_remarkcomment');//7
		a.addAttribute('ivz_statuscomplete');//8
	var filter = new MobileCRM.FetchXml.Filter();
		filter.where('ivz_customer','eq',id);
		a.filter = filter;
		var l = a.addLink('territory','territoryid','ivz_territory','outer');
				l.addAttribute('ivz_emailcontact');//9
				l.addAttribute('ivz_leadermail');//10
				l.addAttribute('ivz_ccmail');//11
				l.addAttribute('ivz_empid');//12
				l.addAttribute('ivz_empname');//13
				l.addAttribute('ivz_statusempid');//14
				l.addAttribute('description');//15
	var fetch = new MobileCRM.FetchXml.Fetch(a);
		fetch.execute('array',function(data){
			var b = [];
			for(var i in data){
					b.push({
							ivz_tasknewaccountid:data[0][0],
							ivz_name:data[0][1],
							ivz_customer:data[0][2],
							ivz_saletype:data[0][3],
							ivz_statusdoc:data[i][4],
							ivz_statuscustomer:data[i][5],
							ivz_territory:data[i][6],
							ivz_remarkcomment:data[i][7],
							ivz_statuscomplete:data[i][8],
							ivz_emailcontact:data[i][9],
							ivz_leadermail:data[i][10],
							ivz_ccmail:data[i][11],
							ivz_empid:data[i][12],
							ivz_empname:data[i][13],
							ivz_statusempid:data[i][14],
							description:data[i][15]
						});
			}
			callback(b);
		},function(er){alert(er);},null);
}
function gettaskaccontbyter(id,callback){
	var a = new MobileCRM.FetchXml.Entity('ivz_tasknewaccount');
		a.addAttribute('ivz_tasknewaccountid');//0
		a.addAttribute('ivz_name');//1
		a.addAttribute('ivz_customer');//2
		a.addAttribute('ivz_saletype');//3
		a.addAttribute('ivz_statusdoc');//4
		a.addAttribute('ivz_statuscustomer');//5
		a.addAttribute('ivz_territory');//6
		a.addAttribute('ivz_remarkcomment');//7
		a.addAttribute('ivz_statuscomplete');//8
	var filter = new MobileCRM.FetchXml.Filter();
		filter.where('ivz_territory','eq',id);
		a.filter = filter;
		var l = a.addLink('territory','territoryid','ivz_territory','outer');
				l.addAttribute('ivz_emailcontact');//9
				l.addAttribute('ivz_leadermail');//10
				l.addAttribute('ivz_ccmail');//11
				l.addAttribute('ivz_empid');//12
				l.addAttribute('ivz_empname');//13
				l.addAttribute('ivz_statusempid');//14
				l.addAttribute('description');//15
	var fetch = new MobileCRM.FetchXml.Fetch(a);
		fetch.execute('array',function(data){
			var b = [];
			for(var i in data){
					b.push({
							ivz_tasknewaccountid:data[i][0],
							ivz_name:data[i][1],
							ivz_customer:data[i][2],
							ivz_saletype:data[i][3],
							ivz_statusdoc:data[i][4],
							ivz_statuscustomer:data[i][5],
							ivz_territory:data[i][6],
							ivz_remarkcomment:data[i][7],
							ivz_statuscomplete:data[i][8],
							ivz_emailcontact:data[i][9],
							ivz_leadermail:data[i][10],
							ivz_ccmail:data[i][11],
							ivz_empid:data[i][12],
							ivz_empname:data[i][13],
							ivz_statusempid:data[i][14],
							description:data[i][15]
						});
			}
			callback(b);
		},function(er){alert(er);},null);
}
//////////////////////////// call doc ///////////////////////////

function calldoc(cClick,ethis){
		$('#'+cClick).trigger('click');
	}
function GetAtt(idAttact,idimg,canvasid,callback){
var MAX_HEIGHT = 800;
input = $(idAttact)[0];
                try {
                    if (input.files && input.files[0]) {
                        var FR = new FileReader();
                        FR.onload = function (e){
                        	var imgElem = $(idimg); // document.getElementById("imgId");
	                            imgElem.attr("style", "display=block"); //imgElem.style.display = "block";
	                            imgElem.attr("src", e.target.result); //imgElem.setAttribute("src", e.target.result);
	                            imgElem.attr("width", "100");
	                            imgElem.attr("heigth", "100");
							var image = new Image();
								image.onload = function(){
								var canvas = document.getElementById(canvasid);
									if(image.height > MAX_HEIGHT) {
										image.width *= MAX_HEIGHT / image.height;
										image.height = MAX_HEIGHT;
									}
									var ctx = canvas.getContext("2d");
									ctx.clearRect(0, 0, canvas.width, canvas.height);
									canvas.width = image.width;
									canvas.height = image.height;
									ctx.drawImage(image, 0, 0, image.width, image.height);
									sizeKB = input.files[0].size / 1024;
                            		fileName = input.files[0].name;
                            		fileType = input.files[0].type;
									var dataURL = canvas.toDataURL();
									var fullQuality = canvas.toDataURL("image/jpeg", 1.0);
									var mediumQuality = canvas.toDataURL("image/jpeg", 0.5);
									var lowQuality = canvas.toDataURL("image/jpeg", 0.1);
									var idbase64 = Getstringbase64(canvas.toDataURL("image/jpeg", 0.5));
									callback(idbase64);
									//alert('Original sizeKB:'+sizeKB+'\n fileName:'+fileName+'\n fileType:'+fileType);
								};
								image.src = e.target.result;
                        };
                        FR.readAsDataURL(input.files[0]);
                    }
                }
                catch (ex) {
                    alert('Base64:'+er);
                }
}
function Getstringbase64(data) {
                if (data === undefined || data.length <= 0) {
                    return;
                }
                var index = data.indexOf(',');
                if (index > 1) {
                    return data.substring(index + 1, data.length);
                }
          }
////////////////////// change status appointment ////////////////
function changestappoint(id,ids,stt,callback){
  try{
    var ins = new MobileCRM.DynamicEntity.createNew("ivz_contentex");
       ins.properties.ivz_name = txtname;
       ins.properties.ivz_filename = filename;
       ins.properties.ivz_codename = codename;
       ins.properties.ivz_line = txtline;
       ins.properties.ivz_codeex = codeex;
       ins.properties.ivz_territoryid = territoryid;
       ins.properties.ivz_logtype = parseInt(typelog);
       ins.save(function(err){
         if(err){
           alert("ex insert "+err);
           callback('error ex insert '+err);
         }else{
           callback('success');
         }
     });
  }catch(er){
    alert(er);
  }
}
////////////////////// inser contenctex /////////////
function insertcodeex(txtname,filename,codename,txtline,codeex,territoryid,typelog,callback){
  try{
    var ins = new MobileCRM.DynamicEntity.createNew("ivz_contentex");
       ins.properties.ivz_name = txtname;
       ins.properties.ivz_filename = filename;
       ins.properties.ivz_codename = codename;
       ins.properties.ivz_line = txtline;
       ins.properties.ivz_codeex = codeex;
       ins.properties.ivz_territoryid = territoryid;
       ins.properties.ivz_logtype = parseInt(typelog);
       ins.save(function(err){
         if(err){
           alert("ex insert "+err);
           callback('error ex insert '+err);
         }else{
           callback('success');
         }
     });
  }catch(ex){
    alert('function ex '+ex);
  }
}
////////////////////// Send Mail /////////////////////
function SendMail(mail,title,text){
		try{
      MobileCRM.Platform.email(mail,title,text,MobileCRM.bridge.alert,null);
    }catch(er){
      alert(er);
    }
}
///////////////////// return guid ///////////////////
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +  s4() + '-' + s4() + s4() + s4();
}

///////////////////// option ////////////////////
function GetGPSLocation(callback){
	// MobileCRM.Platform.getLocation(function(res){
	// 	callback(res);
	// },MobileCRM.bridge.alert);
}
function getGPSCoords() {
	var wait = MobileCRM.UI.EntityForm.showPleaseWait("Getting the GPS coordinates...");
	MobileCRM.Platform.getLocation(
		function (coords) {
			wait.close();
			if (res.latitude && res.longitude)
				MobileCRM.bridge.alert("latitude : " + res.latitude + " longitude : " + res.longitude);
		},
		function (err) {
			wait.close();
			MobileCRM.bridge.alert(err);
		}
	);
}
function CtoTrue(idval){
	var idreal;
	if(idval === "True"){
		idreal = true;
	}else{
		idreal = false;
	}
	return(idreal);
}
function CtoNum(idval){
	var idreal;
	if(idval === "True" || idval === true){
		idreal = 1;
	}else{
		idreal = 0;
	}
	return(idreal);
}
function CtoType(idval){
	var idreal;
	if(idval === "1" || idval === 1){
		idreal = 'บุคคลธรรมดา';
	}else{
		idreal = 'นิติบุคคล';
	}
	return(idreal);
}
function converttrue(idval){
	var ids;
	if(idval === "True" || idval === true){
		ids = 1;
	}else{
		ids = 0;
	}
	return(ids);
}

function GetAvailablefromtime(callback){
	MobileCRM.Metadata.getOptionSetValues("account","ivz_availablefromtime",function(optionSetValues){
		var b = [];
		for (var name in optionSetValues) {
			 var val = optionSetValues[name];
			b.push({'val':val,'name':name});
		}
	   callback(b);
	  },function(err){alert(er);},null);
}
function Getivz_adjgenaddressoption(callback){
	MobileCRM.Metadata.getOptionSetValues("ivz_accountadjustment","ivz_adjgenaddresstype",function(optionSetValues){
		var b = [];
		for (var name in optionSetValues) {
			 var val = optionSetValues[name];
			b.push({
				'val':val,'name':name
			});
		}
	   callback(b);
	  },function(err){alert(er);},null);
}
function Getivz_adjaddressoption(callback){
	MobileCRM.Metadata.getOptionSetValues("ivz_accountadjustment","ivz_adjgenaddressoption",function(optionSetValues){
		var b = [];
		for (var name in optionSetValues) {
			 var val = optionSetValues[name];
			b.push({
				'val':val,'name':name
			});
		}
	   callback(b);
	  },function(err){alert(er);},null);
}
function Getivz_CustomerAddress(callback){
	MobileCRM.Metadata.getOptionSetValues("customeraddress","addresstypecode",function(optionSetValues){
		var b = [];
		for (var name in optionSetValues) {
			 var val = optionSetValues[name];
				if(val == 1 || val == 2){
					b.push({
						'val':val,'name':name
					});
				}
		}
	   callback(b);
	  },function(err){alert(er);},null);
}
function GetOptionContact(callback){
	MobileCRM.Metadata.getOptionSetValues("contact","ivz_contacttype",function(optionSetValues){
		var b = [];
		for (var name in optionSetValues) {
			 var val = optionSetValues[name];
			b.push({
				'val':val,'name':name
			});
		}
	   callback(b);
	 },function(err){ alert(er);},null);
}

function GetResionStatus(callback){
	MobileCRM.Metadata.getOptionSetValues("ivz_accountadjustment","ivz_adjcredclosereason",function(optionSetValues){
		var b = [];
		for (var name in optionSetValues) {
			 var val = optionSetValues[name];
			b.push({
				'val':val,'name':name
			});
		}
	   callback(b);
	  },function(err){MsgBox(er);},null);
}


function gettername(tername,callback){
  try{
    var n = new MobileCRM.FetchXml.Entity('ivz_territorymaster');
				n.addAttribute('ivz_territorymasterid');//0
				n.addAttribute('ivz_mastername');//1
				n.addAttribute('ivz_leftterritory');//2
    var filter = new MobileCRM.FetchXml.Filter();
        filter.where('ivz_mastername','eq',tername);
        n.filter = filter;
    var l = n.addLink('territory','territoryid','ivz_leftterritory','outer');
    	  l.addAttribute('ivz_emailcontact');//3
		    l.addAttribute('ivz_leadermail');//4
		    l.addAttribute('ivz_ccmail');//5
				l.addAttribute('ivz_empid');//6
				l.addAttribute('ivz_empname');//7
				l.addAttribute('ivz_statusempid');//8
				l.addAttribute('description');//9
    var fetch = new MobileCRM.FetchXml.Fetch(n);
		    fetch.execute('array',function(data){
		var b = [];
			for (var i in data) {
              b.push({
                      ivz_territorymasterid:data[i][0],
              				ivz_mastername:data[i][1],
              				ivz_leftterritory:data[i][2],
                      ivz_emailcontact:data[i][3],
              		    ivz_leadermail:data[i][4],
              		    ivz_ccmail:data[i][5],
											ivz_empid:data[i][6],
											ivz_empname:data[i][7],
											ivz_statusempid:data[i][8],
											description:data[i][9]
          				});
			}
			callback(b);
		},function(er){alert(er);},null);
  }catch(er){
    insertcodeex('เกิดข้อผิดพลาดในการดึงข้อมูล masterterritory','script.js gettername','query master territory','110',er,ter,1,function(data){
      if(data){
        alert("error1109"+er);
      }
    });
  }
}
function GetProvinceList(callback){
	var n = new MobileCRM.FetchXml.Entity('ivz_addressprovince');
		n.addAttribute('ivz_addressprovinceid');//0
		n.addAttribute('ivz_name');//1
		n.addAttribute('ivz_description');//2
	var fetch = new MobileCRM.FetchXml.Fetch(n);
		fetch.execute('array',function(data){
      var b = [];
      for(var i in data){
        b.push({
          ivz_addressprovinceid:data[i][0],
      		ivz_name:data[i][1],
      		ivz_description:data[i][2]
        });
      }
			callback(b);
		},function(er){alert(er);},null);
}
function GetDistrictById(id,callback){
	var n = new MobileCRM.FetchXml.Entity('ivz_addressdistrict');
		n.addAttribute('ivz_addressdistrictid');//0
		n.addAttribute('ivz_name');//1
		n.addAttribute('ivz_provinceid');//2
	var filter = new MobileCRM.FetchXml.Filter();
		filter.where('ivz_provinceid','eq',id);
		n.filter = filter;
	var fetch = new MobileCRM.FetchXml.Fetch(n);
		fetch.execute('array',function(data){
			var b = [];
			for(var i in data){
				b.push({
					ivz_addressdistrictid:data[i][0],
					ivz_name:data[i][1],
					ivz_provinceid:data[i][2]
				});
			}
			callback(b);
		},function(er){alert(er);},null);
}

function GetOptionContact(callback){
	MobileCRM.Metadata.getOptionSetValues("contact","ivz_contacttype",function(optionSetValues){
		var b = [];
		for (var name in optionSetValues) {
			 var val = optionSetValues[name];
			b.push({
				'val':val,'name':name
			});
		}
	   callback(b);
	 },function(err){ alert(er);},null);
}
function GetPayMentTerm(callback){
	MobileCRM.Metadata.getOptionSetValues("account","paymenttermscode",function(optionSetValues){
		var b = [];
		for (var name in optionSetValues) {
			 var val = optionSetValues[name];
			b.push({
				'val':val,'name':name
			});
		}
	   callback(b);
	  },function(err){alert(er);},null);
}
function GetPayMentOption(callback){
	MobileCRM.Metadata.getOptionSetValues("account","ivz_paymentoption",function(optionSetValues){
		var b = [];
		for (var name in optionSetValues) {
			 var val = optionSetValues[name];
			b.push({
				'val':val,'name':name
			});
		}
	   callback(b);
	  },function(err){alert(er);},null);
}
function GetBankName(callback){
	MobileCRM.Metadata.getOptionSetValues("account","ivz_banknamecustomer",function(optionSetValues){
		var b = [];
		for (var name in optionSetValues) {
			 var val = optionSetValues[name];
			b.push({
				'val':val,'name':name
			});
		}
	   callback(b);
	  },function(err){ alert(er);},null);
}
function GetBankNameYss(callback){
	MobileCRM.Metadata.getOptionSetValues("account","ivz_banknameyss",function(optionSetValues){
		var b = [];
		for (var name in optionSetValues) {
			 var val = optionSetValues[name];
			b.push({
				'val':val,'name':name
			});
		}
	   callback(b);
	  },function(err){ alert(er);},null);
}
///////////////// End Option /////////////////////////
function GetAppointStatus(ivz_leftterritory,ist,typ,callback){
	//alert('typ:'+ist+'--'+typ+'--'+ivz_leftterritory);
  var n = new MobileCRM.FetchXml.Entity('appointment');
      n.addAttribute('activityid');//0
      n.addAttribute('ivz_customer');//1
      n.addAttribute('ivz_territoryid');//2
      n.addAttribute('ivz_empid');//3
      n.addAttribute('scheduledstart');//4
      n.addAttribute('scheduledend');//5
      n.addAttribute('ivz_saleprospect');//6
      n.addAttribute('subject');//7
      n.addAttribute('ivz_scheduledstarttime');//8
      n.addAttribute('ivz_scheduledendtime');//9
      n.addAttribute('ivz_visit');//10
      n.addAttribute('ivz_visitbilling');//11
      n.addAttribute('ivz_visitclaimorder');//12
      n.addAttribute('ivz_visitcollection');//13
      n.addAttribute('ivz_visitopenaccount');//14
      n.addAttribute('ivz_visitorder');//15
      n.addAttribute('ivz_visitadjustment');//16
      n.addAttribute('ivz_visitcompetitors');//17
      n.addAttribute('ivz_visitmarket');//18
      n.addAttribute('ivz_visitpostpect');//19
      n.addAttribute('ivz_visitproductrecall');//20
      n.addAttribute('ivz_visitactivities');//21
      n.addAttribute('ivz_visitsuggest');//22
      n.addAttribute('ivz_planningstatus');//23
      n.addAttribute('ivz_employeeposition');//24
      n.filter = new MobileCRM.FetchXml.Filter();
      n.filter.where('ivz_territoryid','eq',ivz_leftterritory);
    var m = n.addLink('account','accountid','ivz_customer','outer');
        m.addAttribute('ivz_addressprovince');//25
        m.addAttribute('ivz_addressdistrict');//26
        m.addAttribute('territoryid');//27
        m.addAttribute('accountnumber');//28
        m.addAttribute('ivz_balancecredit');//29
    var o = m.addLink('territory','territoryid','territoryid','outer');
        o.addAttribute('ivz_emailcontact');//30
        o.addAttribute('ivz_leadermail');//31
        o.addAttribute('territoryid');//32
        o.addAttribute('ivz_ccmail');//33
    var fetch = new MobileCRM.FetchXml.Fetch(n,10000,1);
      fetch.execute('array',function(data){
        var b = [];
        for(var i in data){
              if(data[i][23] == ist){
								if(data[i][24] == typ){
									b.push({
	                        activityid:data[i][0],
	                        ivz_customer:data[i][1],
	                        ivz_territoryid:data[i][2],
	                        ivz_empid:data[i][3],
	                        start:data[i][4],
	                        end:data[i][5],
	                        ivz_saleprospect:data[i][6],
	                        title:data[i][7],
	                        ivz_visit:CtoTrue(data[i][10]),
	                        ivz_visitbilling:CtoTrue(data[i][11]),
	                        ivz_visitclaimorder:CtoTrue(data[i][12]),
	                        ivz_visitcollection:CtoTrue(data[i][13]),
	                        ivz_visitopenaccount:CtoTrue(data[i][14]),
	                        ivz_visitorder:CtoTrue(data[i][15]),
	                        ivz_visitadjustment:CtoTrue(data[i][16]),
	                        ivz_visitcompetitors:CtoTrue(data[i][17]),
	                        ivz_visitmarket:CtoTrue(data[i][18]),
	                        ivz_visitpostpect:CtoTrue(data[i][19]),
	                        ivz_visitproductrecall:CtoTrue(data[i][20]),
	                        ivz_visitactivities:data[i][21],
	                        ivz_visitsuggest:CtoTrue(data[i][22]),
	                        ivz_employeeposition:data[i][24],
	                        ivz_addressprovince:data[i][25],
	                        ivz_addressdistrict:data[i][26],
	                        territoryid:data[i][27],
	                        accountnumber:data[i][28],
	                        ivz_planningstatus:data[i][23],
	                        ivz_emailcontact:data[i][30],
	                        ivz_leadermail:data[i][31],
	                        ivz_ccmail:data[i][33],
	                        ivz_balancecredit:data[i][29],
	                        filtername:data[i][28]+'-'+data[i][1],
	                        mailtomail:data[i][30]+','+data[i][31]+','+data[i][33],
													ivz_scheduledstarttime:data[i][8],
													ivz_scheduledendtime:data[i][9]
	              });
								}
              }
        }
        callback(b);
      },function(er){alert(er);},null);
}
function GetAcAdjustmentByTerid(terid,callback){
	var a = new MobileCRM.FetchXml.Entity('ivz_accountadjustment');
			a.addAttribute('ivz_accountadjustmentid');//0
			a.addAttribute('ivz_name');//1
			a.addAttribute('ivz_adjcredcloseaccount');//2
			a.addAttribute('ivz_adjcredclosereason');//3
			a.addAttribute('ivz_adjcredit');//4
			a.addAttribute('ivz_adjcredreopenaccount');//5
			a.addAttribute('ivz_adjcredreopenreason');//6
			a.addAttribute('ivz_adjgenaddress');//7
			a.addAttribute('ivz_adjgencontact');//8
			a.addAttribute('ivz_adjgeneral');//9
			a.addAttribute('ivz_adjgenname');//10
			a.addAttribute('ivz_adjgentransport');//11
			a.addAttribute('ivz_newcredcredit');//12
			a.addAttribute('ivz_newcredcreditincdec');//13
			a.addAttribute('ivz_newcredcreditlimitnew');//14
			a.addAttribute('ivz_newcredcreditlimitold');//15
			a.addAttribute('ivz_newgenaddresspostalcode');//16
			a.addAttribute('ivz_newgenaddressstreet1');//17
			a.addAttribute('ivz_newgenaddressstreet2');//18
			a.addAttribute('ivz_newgenaddressstreet3');//19
			a.addAttribute('ivz_newgencontactfirstname');//20
			a.addAttribute('ivz_newgencontactlastname');//21
			a.addAttribute('ivz_newgenname');//22
			a.addAttribute('ivz_newgentransport');//23
			a.addAttribute('ivz_customernumber');//24
			a.addAttribute('ivz_newgenaddresscountry');//25
			a.addAttribute('ivz_newgenaddressdistrict');//26
			a.addAttribute('ivz_newgenaddressprovince');//27
			a.addAttribute('ivz_adjgenaddressoption');//28
			a.addAttribute('ivz_adjgenaddresstype');//29
			a.addAttribute('ivz_adjgencontactoption');//30
			a.addAttribute('ivz_adjgenother');//31
			a.addAttribute('ivz_adjgenotherdescription');//32
			a.addAttribute('ivz_newcredcreditoption');//33
			a.addAttribute('ivz_empid');//34
			a.addAttribute('ivz_approvaldate');//35
			a.addAttribute('ivz_approvedby');//36
			a.addAttribute('ivz_territory');//37
			a.addAttribute('ivz_transdate');//38
			a.addAttribute('statuscode');//39
	var filter = new MobileCRM.FetchXml.Filter();
			filter.where('ivz_territory','eq',terid);
			a.filter = filter;
	var fetch = new MobileCRM.FetchXml.Fetch(a,10000,1);
		fetch.execute('array',function(data){
			//alert(data.length);
			var b = [];
			for (var i  in data) {
					b.push({
						ivz_accountadjustmentid:data[i][0],
						ivz_name:data[i][1],
						ivz_adjcredcloseaccount:CtoTrue(data[i][2]),
						ivz_adjcredclosereason:data[i][3],
						ivz_adjcredit:CtoTrue(data[i][4]),
						ivz_adjcredreopenaccount:data[i][5],
						ivz_adjcredreopenreason:data[i][6],
						ivz_adjgenaddress:CtoTrue(data[i][7]),
						ivz_adjgencontact:CtoTrue(data[i][8]),
						ivz_adjgeneral:CtoTrue(data[i][9]),
						ivz_adjgenname:CtoTrue(data[i][10]),
						ivz_adjgentransport:CtoTrue(data[i][11]),
						ivz_newcredcredit:data[i][12],
						ivz_newcredcreditincdec:data[i][13],
						ivz_newcredcreditlimitnew:data[i][14],
						ivz_newcredcreditlimitold:data[i][15],
						ivz_newgenaddresspostalcode:data[i][16],
						ivz_newgenaddressstreet1:data[i][17],
						ivz_newgenaddressstreet2:data[i][18],
						ivz_newgenaddressstreet3:data[i][19],
						ivz_newgencontactfirstname:data[i][20],
						ivz_newgencontactlastname:data[i][21],
						ivz_newgenname:data[i][22],
						ivz_newgentransport:data[i][23],
						ivz_customernumber:data[i][24],
						ivz_newgenaddresscountry:data[i][25],
						ivz_newgenaddressdistrict:data[i][26],
						ivz_newgenaddressprovince:data[i][27],
						ivz_adjgenaddressoption:data[i][28],
						ivz_adjgenaddresstype:data[i][29],
						ivz_adjgencontactoption:data[i][30],
						ivz_adjgenother:data[i][31],
						ivz_adjgenotherdescription:data[i][32],
						ivz_newcredcreditoption:data[i][33],
						ivz_empid:data[i][34],
						ivz_approvaldate:data[i][35],
						ivz_approvedby:data[i][36],
						ivz_territory:data[i][37],
						ivz_transdate:data[i][38],
						ivz_remark: getRemarkName(data[i][10])+' '+getRemarkTransport(data[i][11])+' '+getRemarkContact(data[i][8])+' '+getRemarkAddress(data[i][7]),
						ivz_remarkcredit:getRemarkCredit(data[i][4])+' '+getRemarkcolse(data[i][2],data[i][3]),
						statuscode:data[i][39]
					});
			}
			callback(b);
		},function(er){alert(er);},null);
}
function getRemarkName(id){
	if(id === 'True' || id === true){
		return 'ปรับปรุงข้อมูลชื่อ';
	}else{
		return '';
	}
}
function getRemarkTransport(id){
	if(id === 'True' || id === true){
		return 'ปรับปรุงข้อมูลขนส่ง';
	}else{
		return '';
	}
}
function getRemarkContact(id){
	if(id === 'True' || id === true){
		return 'ปรับปรุงข้อมูลผู้ติดต่อ';
	}else{
		return '';
	}
}
function getRemarkAddress(id){
	if(id === 'True' || id === true){
		return 'ปรับปรุงข้อมูลที่อยู่';
	}else{
		return '';
	}
}
function getRemarkCredit(id){
	if(id === 'True' || id === true){
		return 'ปรับปรุงข้อมูลเครดิต';
	}else{
		return '';
	}
}
function getRemarkcolse(id,remark){
	if(id === 'True' || id === true){
		var x = '';
		if(remark === '917970000'){
			return 'ขอปิดบัญชีเนื่องจากเลิกกิจการ';
		}else{
			return 'ขอปิดบัญชีเนื่องจากปัญหาทางการเงิน';
		}
	}else{
		return '';
	}
}

function GetAccount(ivz_leftterritory,stype,page,callback){
        var a = new MobileCRM.FetchXml.Entity('account');
      			a.addAttribute('accountid');//0
      			a.addAttribute('name');//1
      			a.addAttribute('ivz_addresscountry');//2
      			a.addAttribute('ivz_addressprovince');//3
      			a.addAttribute('ivz_addressdistrict');//4
      			a.addAttribute('ivz_availablefromtime');//5
      			a.addAttribute('ivz_availabletotime');//6
      			a.addAttribute('territoryid');//7
      			a.addAttribute('customertypecode');//8
      			a.addAttribute('statuscode');//9
      			a.addAttribute('accountnumber');//10
						a.addAttribute('ivz_statuscomplete');//11
						a.addAttribute('ivz_remarkreject');//12
						a.addAttribute('ivz_taxid');//13
						a.addAttribute('customertypecode');//14
						a.addAttribute('ivz_statustype');//15
						a.addAttribute('ivz_doc01');//16
						a.addAttribute('ivz_doc02');//17
						a.addAttribute('ivz_doc03');//18
						a.addAttribute('ivz_dochouseholdregis');//19
						a.addAttribute('ivz_docidcard');//20
						a.addAttribute('ivz_satatusempid');//21
						a.addAttribute('creditlimit');//22
						a.addAttribute('ivz_integrationid');//23
        var filter = new MobileCRM.FetchXml.Filter();
      		  filter.where('territoryid','eq',ivz_leftterritory);
						a.filter = filter;
         var fetch = new MobileCRM.FetchXml.Fetch(a,10000,1);
        		 fetch.execute('array',function(data){
                var b = [];
      					for(var i in data){
      							b.push({
      								accountid:data[i][0],
      								name:data[i][1],
      								ivz_addresscountry:data[i][2],
      								ivz_addressprovince:data[i][3],
      								ivz_addressdistrict:data[i][4],
      								ivz_availablefromtime:data[i][5],
      								ivz_availabletotime:data[i][6],
      								territoryid:data[i][7],
      								customertypecode:data[i][8],
      								statuscode:data[i][9],
                      accountnumber:data[i][10],
                      filtername:data[i][10]+'-'+data[i][1],
                      ivz_customer:data[i][1],
                      accountype:stype,
											ivz_statuscomplete:data[i][11],
											remarkreject:data[i][12],
											ivz_taxid:data[i][13],
											customertypecode:data[i][14],
											statustype:CtoType(data[i][15]),
					            ivz_doc01:CtoNum(data[i][16]),
					            ivz_doc02:CtoNum(data[i][17]),
					            ivz_doc03:CtoNum(data[i][18]),
					            ivz_dochouseholdregis:CtoNum(data[i][19]),
					            ivz_docidcard:CtoNum(data[i][20]),
											matchtype:CtoChkDoc(data[i][15],
												CtoNum(data[i][16]),
												CtoNum(data[i][17]),
												CtoNum(data[i][18]),
												CtoNum(data[i][19]),
												CtoNum(data[i][20])),
											statusempid:data[i][21],
											ivz_balancecredit:data[i][22],
											ivz_integrationid:data[i][23]
      							});
      					}
      					callback(b);
        		},function(er){alert(er);},null);
}
function GetAccountById(id,stype,callback){
        var a = new MobileCRM.FetchXml.Entity('account');
      			a.addAttribute('accountid');//0
      			a.addAttribute('name');//1
      			a.addAttribute('ivz_addresscountry');//2
      			a.addAttribute('ivz_addressprovince');//3
      			a.addAttribute('ivz_addressdistrict');//4
      			a.addAttribute('ivz_availablefromtime');//5
      			a.addAttribute('ivz_availabletotime');//6
      			a.addAttribute('territoryid');//7
      			a.addAttribute('customertypecode');//8
      			a.addAttribute('statuscode');//9
      			a.addAttribute('accountnumber');//10
						a.addAttribute('ivz_statuscomplete');//11
						a.addAttribute('ivz_remarkreject');//12
						a.addAttribute('ivz_taxid');//13
						a.addAttribute('customertypecode');//14
						a.addAttribute('ivz_statustype');//15
						a.addAttribute('ivz_doc01');//16
						a.addAttribute('ivz_doc02');//17
						a.addAttribute('ivz_doc03');//18
						a.addAttribute('ivz_dochouseholdregis');//19
						a.addAttribute('ivz_docidcard');//20
						a.addAttribute('ivz_satatusempid');//21
						a.addAttribute('creditlimit');//22
						a.addAttribute('ivz_integrationid');//23
        var filter = new MobileCRM.FetchXml.Filter();
      		  filter.where('accountid','eq',id);
						a.filter = filter;
         var fetch = new MobileCRM.FetchXml.Fetch(a,100000,1);
        		 fetch.execute('array',function(data){
                var b = [];
      					for(var i in data){
      							b.push({
      								accountid:data[i][0],
      								name:data[i][1],
      								ivz_addresscountry:data[i][2],
      								ivz_addressprovince:data[i][3],
      								ivz_addressdistrict:data[i][4],
      								ivz_availablefromtime:data[i][5],
      								ivz_availabletotime:data[i][6],
      								territoryid:data[i][7],
      								customertypecode:data[i][8],
      								statuscode:data[i][9],
                      accountnumber:data[i][10],
                      filtername:data[i][10]+'-'+data[i][1],
                      ivz_customer:data[i][1],
                      accountype:stype,
											ivz_statuscomplete:data[i][11],
											remarkreject:data[i][12],
											ivz_taxid:data[i][13],
											customertypecode:data[i][14],
											statustype:CtoType(data[i][15]),
											statustypecode:data[i][15],
					            ivz_doc01:CtoNum(data[i][16]),
					            ivz_doc02:CtoNum(data[i][17]),
					            ivz_doc03:CtoNum(data[i][18]),
					            ivz_dochouseholdregis:CtoNum(data[i][19]),
					            ivz_docidcard:CtoNum(data[i][20]),
											matchtype:CtoChkDoc(data[i][15],
												CtoNum(data[i][16]),
												CtoNum(data[i][17]),
												CtoNum(data[i][18]),
												CtoNum(data[i][19]),
												CtoNum(data[i][20])),
											statusempid:data[i][21],
											ivz_balancecredit:data[i][22],
											ivz_integrationid:data[i][23]
      							});
      					}
      					callback(b);
        		},function(er){alert(er);},null);
}
function CtoChkDoc(t1,t2,t3,t4,t5,t6){
	if(t1 === '1' || t1 === 1){
		if(t5 == 1 && t6 == 1){
			return 1;
		}else{
			return 0;
		}
	}else{
		if((t2 == 1 || t3 == 1 || t4 == 1) && (t5 == 1 && t6 == 1)){
			return 1;
		}else{
			return 0;
		}
	}
}
function returnaddresscode(idtype){
  switch (idtype) {
    case '0':
      return "NONE";
      break;
    case '1':
      return "INVOICE";
      break;
    case '3':
      return "Alt. Delivery";
      break;
    case '4':
      return "SWIFT";
      break;
    case '5':
      return "Payment";
      break;
    case '6':
      return "Service";
      break;
    case '7':
      return "Home";
      break;
    case '8':
      return "Other";
      break;
    case '9':
      return "Business";
      break;
    case '10':
      return "Remit-10";
      break;
    case '101':
      return "Document";
      break;
  }
}
function GetCustomerAddres(byid,callback){
	var n = new MobileCRM.FetchXml.Entity('customeraddress');
	    n.addAttribute('customeraddressid');//0
	    n.addAttribute('name');//1
	    n.addAttribute('line1');//2
	    n.addAttribute('city');//3
	    n.addAttribute('stateorprovince');//4
	    n.addAttribute('postalcode');//5
	    n.addAttribute('addresstypecode');//6
	    n.addAttribute('ivz_integrationid');//7
	    n.addAttribute('parentid');//8
  var filter = new MobileCRM.FetchXml.Filter();
      filter.where('parentid','eq',byid);
      n.filter = filter;
	var fetch = new MobileCRM.FetchXml.Fetch(n);
		fetch.execute('array',function(data){
      var b = [];
      for(var i in data){
        b.push({
          customeraddressid:data[i][0],
    	    addressname:data[i][1],
    	    line1:data[i][2],
    	    city:data[i][3],
    	    stateorprovince:data[i][4],
    	    postalcode:data[i][5],
          addrscode:data[i][6],
    	    addresstypecode:returnaddresscode(data[i][6]),
    	    ivz_integrationid:data[i][7],
    	    parentid:data[i][8],
					addresscode:data[i][6]
        });
      }
			callback(b);
		},function(er){alert(er);},null);
}
function GetCustomerAddresById(byid,callback){
	var n = new MobileCRM.FetchXml.Entity('customeraddress');
	    n.addAttribute('customeraddressid');//0
	    n.addAttribute('name');//1
	    n.addAttribute('line1');//2
	    n.addAttribute('city');//3
	    n.addAttribute('stateorprovince');//4
	    n.addAttribute('postalcode');//5
	    n.addAttribute('addresstypecode');//6
	    n.addAttribute('ivz_integrationid');//7
	    n.addAttribute('parentid');//8
  var filter = new MobileCRM.FetchXml.Filter();
      filter.where('customeraddressid','eq',byid);
      n.filter = filter;
	var fetch = new MobileCRM.FetchXml.Fetch(n);
		fetch.execute('array',function(data){
      var b = [];
      for(var i in data){
        b.push({
          customeraddressid:data[i][0],
    	    addressname:data[i][1],
    	    line1:data[i][2],
    	    city:data[i][3],
    	    stateorprovince:data[i][4],
    	    postalcode:data[i][5],
          addresscode:data[i][6],
    	    addresstypecode:returnaddresscode(data[i][6]),
    	    ivz_integrationid:data[i][7],
    	    parentid:data[i][8]
        });
      }
			callback(b);
		},function(er){alert(er);},null);
}
/*--------------------- Get Product -----------------------*/
function GetProductList(tatol,page,callback){
	var n = new MobileCRM.FetchXml.Entity('product');
			n.addAttribute('productid');//0
			n.addAttribute('name');//1
			n.addAttribute('productnumber');//2
			n.addAttribute('price');//3
			n.addAttribute('defaultuomid');//4
			n.addAttribute('pricelevelid');//5
			n.addAttribute('createdon');//6
	    //n.addAttribute('ivz_stockstatus');//7//real
	    n.addAttribute('ivz_statustock');//7//test
			n.addAttribute('defaultuomscheduleid');//8
	var fetch = new MobileCRM.FetchXml.Fetch(n,parseInt(tatol),parseInt(page));
		fetch.execute('array',function(data){
			var b = [];
			for(var i in data){
				b.push({
					productid:data[i][0],
					name:data[i][1],
					productnumber:data[i][2],
					price:data[i][3],
					uomid:data[i][4],
					pricelevelid:data[i][5],
					createdon:data[i][6],
			    stockstatus:data[i][7],
					defaultuomscheduleid:data[i][8],
					filtername:data[i][2]+'-'+data[i][1]
				});
			}
			callback(b);
		},function(er){alert(er);},null);
}
function GetProductListName(txtname,tatol,page,callback){
	var n = new MobileCRM.FetchXml.Entity('product');
			n.addAttribute('productid');//0
			n.addAttribute('name');//1
			n.addAttribute('productnumber');//2
			n.addAttribute('price');//3
			n.addAttribute('defaultuomid');//4
			n.addAttribute('pricelevelid');//5
			n.addAttribute('createdon');//6
	    //n.addAttribute('ivz_stockstatus');//7//real
	    n.addAttribute('ivz_statustock');//7//test
			n.addAttribute('defaultuomscheduleid');//8
	var filter = new MobileCRM.FetchXml.Filter();
			filter.where('name','like','%'+txtname+'%');
			n.filter = filter;
	var fetch = new MobileCRM.FetchXml.Fetch(n,parseInt(tatol),parseInt(page));
		fetch.execute('array',function(data){
			var b = [];
			for(var i in data){
				b.push({
					productid:data[i][0],
					name:data[i][1],
					productnumber:data[i][2],
					price:data[i][3],
					uomid:data[i][4],
					pricelevelid:data[i][5],
					createdon:data[i][6],
			    stockstatus:data[i][7],
					defaultuomscheduleid:data[i][8],
					filtername:data[i][2]+'-'+data[i][1]
				});
			}
			callback(b);
		},function(er){alert(er);},null);
}
function GetProductListNumber(txtname,tatol,page,callback){
	var n = new MobileCRM.FetchXml.Entity('product');
			n.addAttribute('productid');//0
			n.addAttribute('name');//1
			n.addAttribute('productnumber');//2
			n.addAttribute('price');//3
			n.addAttribute('defaultuomid');//4
			n.addAttribute('pricelevelid');//5
			n.addAttribute('createdon');//6
	    //n.addAttribute('ivz_stockstatus');//7//real
	    n.addAttribute('ivz_statustock');//7//test
			n.addAttribute('defaultuomscheduleid');//8
	var filter = new MobileCRM.FetchXml.Filter();
			filter.where('productnumber','like','%'+txtname+'%');
			n.filter = filter;
	var fetch = new MobileCRM.FetchXml.Fetch(n,parseInt(tatol),parseInt(page));
		fetch.execute('array',function(data){
			alert(data.length);
			var b = [];
			for(var i in data){
				b.push({
					productid:data[i][0],
					name:data[i][1],
					productnumber:data[i][2],
					price:data[i][3],
					uomid:data[i][4],
					pricelevelid:data[i][5],
					createdon:data[i][6],
			    stockstatus:data[i][7],
					defaultuomscheduleid:data[i][8],
					filtername:data[i][2]+'-'+data[i][1]
				});
			}
			callback(b);
		},function(er){alert(er);},null);
}
/*----------------------- Get Annote ----------------------*/
function getAnnote(id,callback){
	try{
    var n = new MobileCRM.FetchXml.Entity('annotation');
  			n.addAttribute('annotationid');//0
  			n.addAttribute('filename');//1
  			n.addAttribute('subject');//2
  			n.addAttribute('objectid');//3
  			n.addAttribute('notetext');//4
  			n.addAttribute('createdon');//5
        //n.addAttribute('documentbody');//6
  			n.orderBy("createdon", true);
  	var filter = new MobileCRM.FetchXml.Filter();
  			filter.where('objectid','eq',id);
  			n.filter = filter;
  	var fetch = new MobileCRM.FetchXml.Fetch(n);
  			fetch.execute('array',function(data){
  				//alert(data.length)
  				var b = [];
  				for(var i in data){
  						b.push({
  							annotationid:data[i][0],
  							filename:data[i][1],
  							subject:data[i][2],
  							objectid:data[i][3],
  							notetext:data[i][4],
  							createdon:data[i][5],
                documentbody:GetDocBody(data[i][0])
  						});
  				}
  				callback(b);
  		},function(er){alert(er);},null);
  }catch(er){
    alert('error get annote '+er);
  }
}
function GetDocBody(annotationId){
  MobileCRM.DynamicEntity.loadDocumentBody("annotation",annotationId,function (result) {
    if(result){
      return "data:image/jpeg;base64," + result;
    }
  });
}
/*-----------------------------------------------*/

function getTerEmp(txtid,callback){
	var n = new MobileCRM.FetchXml.Entity('territory');
			n.addAttribute('territoryid');//0
			n.addAttribute('name');//1
			n.addAttribute('ivz_ccmail');//2
			n.addAttribute('ivz_emailcontact');//3
			n.addAttribute('ivz_empid');//4
			n.addAttribute('ivz_empname');//5
			n.addAttribute('ivz_leadermail');//6
			n.addAttribute('ivz_statusempid');//7
	var filter = new MobileCRM.FetchXml.Filter();
			filter.where('territoryid','eq',txtid);
			n.filter = filter;
	var fetch = new MobileCRM.FetchXml.Fetch(n);
		fetch.execute('array',function(data){
			var b = [];
			for(var i in data){
					b.push({
						territoryid:data[i][0],
						name:data[i][1],
						ivz_ccmail:data[i][2],
						ivz_emailcontact:data[i][3],
						ivz_empid:data[i][4],
						ivz_empname:data[i][5],
						ivz_leadermail:data[i][6],
						ivz_statusempid:data[i][7]
					});
			}
			callback(b);
		},function(er){
			alert(er);
		},null);
}
function GetActivities(callback){
	var n = new MobileCRM.FetchXml.Entity('ivz_activities');
		n.addAttribute('ivz_activitiesid');//0
		n.addAttribute('ivz_name');//1
		n.addAttribute('ivz_displaystatus');//2
		n.addAttribute('ivz_activitiesgroup');//3
	var fetch = new MobileCRM.FetchXml.Fetch(n);
		fetch.execute('array',function(data){
      var b = [];
      for(var i in data){
          b.push({
            ivz_activitiesid:data[i][0],
            ivz_name:data[i][1],
            ivz_displaystatus:data[i][2],
            ivz_activitiesgroup:data[i][3]
          });
      }
			callback(b);
		},function(er){
			alert(er);
		},null);
}

function GetPostpectByTer(terid,callback){
	var n = new MobileCRM.FetchXml.Entity('ivz_saleprospect');
		  n.addAttribute('ivz_saleprospectid');//0
		  n.addAttribute('ivz_name');//1
		  n.addAttribute('ivz_prospectgroup');//2
		  n.addAttribute('ivz_prospectname');//3
		  n.addAttribute('ivz_saledistict');//4
      n.addAttribute('ivz_saleprovinceid');//5
		  n.addAttribute('ivz_territory');//6
  //     n.filter = new MobileCRM.FetchXml.Filter();
  //     n.filter.where('ivz_territory','eq',terid);
  // var m = n.addLink('territory','territoryid','ivz_territory','outer');
  //     m.addAttribute('ivz_leadermail');//7
  //     m.addAttribute('ivz_ccmail');//8
  //     m.addAttribute('ivz_emailcontact');//9
	var fetch = new MobileCRM.FetchXml.Fetch(n);
		  fetch.execute('array',function(data){
        alert(data);
        var b = [];
        for(var i in data){
          b.push({
                  ivz_saleprospectid:data[i][0],
                  ivz_name:data[i][1],
                  ivz_prospectgroup:data[i][2],
                  ivz_prospectname:data[i][3],
                  ivz_saledistict:data[i][4],
                  ivz_saleprovinceid:data[i][5],
                  ivz_territory:data[i][6],
                  accountype:3
                });
                // b.push({
                //         ivz_saleprospectid:data[i][0],
                //   		  ivz_name:data[i][1],
                //   		  ivz_prospectgroup:data[i][2],
                //   		  ivz_prospectname:data[i][3],
                //   		  ivz_saledistict:data[i][4],
                //         ivz_saleprovinceid:data[i][5],
                //   		  ivz_territory:data[i][6],
                //         ivz_leadermail:data[i][7],
                //         ivz_ccmail:data[i][8],
                //         ivz_emailcontact:data[i][9],
								// 				accountype:3
                //       });
        }
			callback(b);
		},function(er){alert(er);},null);
}

function GetAccountInvoice(terid,callback){
	var n = new MobileCRM.FetchXml.Entity('account');
			n.addAttribute('accountid');//0
			n.addAttribute('name');//1
			n.addAttribute('territoryid');//2
			n.addAttribute('ivz_addressprovince');//3
			n.addAttribute('ivz_addressdistrict');//4
	var filter = new MobileCRM.FetchXml.Filter();
			filter.where('territoryid','eq',terid);
			n.filter = filter;
	var l = n.addLink('ivz_billingnotestable','ivz_customernumber','accountid','outer');
			l.addAttribute('ivz_billingnumber');//5
	var filterb = new MobileCRM.FetchXml.Filter();
			filterb.where('ivz_billingstatus','eq','0');
			l.filter = filterb;
	var m = n.addLink('invoice','accountid','accountid','outer');
	var fetch = new MobileCRM.FetchXml.Fetch(n);
			fetch.execute('array',function(data){
				//alert(data.length);
				var b = [];
				for(var i in data){
					b.push({
						accountid:data[i][0],
						name:data[i][1],
						territoryid:data[i][2],
						ivz_addressprovince:data[i][3],
						ivz_addressdistrict:data[i][4]
					});
				}
				callback(b);
			},function(er){
				alert(er);
			},null);
}

function getInvoiceByAccountid(terid,callback){
	var n = new MobileCRM.FetchXml.Entity('invoice');
		n.addAttribute('ivz_invoicedate');//0
    n.addAttribute('invoicenumber');//1
		n.addAttribute('customerid');//2
	var k = n.addLink('account','accountid','customerid','outer');
		k.addAttribute('territoryid');//3
		k.addAttribute('accountnumber');//4
		k.addAttribute('ivz_addressprovince');//5
		k.addAttribute('ivz_addressdistrict');//6
		k.addAttribute('name');//7
	var filter = new MobileCRM.FetchXml.Filter();
		filter.where('territoryid','eq',terid);
		k.filter = filter;
	var fetch = new MobileCRM.FetchXml.Fetch(n);
		fetch.execute('array',function(data){
			var b = [];
			for(var i in data){
				if(data[i][4]){
					b.push({
	                ivz_invoicedate:data[i][0],
	                invoicenumber:data[i][1],
	            		customerid:data[i][2],
	                territoryid:data[i][3],
	            		accountnumber:data[i][4],
									ivz_addressprovince:data[i][5],
									ivz_addressdistrict:data[i][6],
									filtername:data[i][4]+'-'+data[i][7],
									accountype:1
							});
				}
			}
			callback(b);
		},function(er){alert(er);},null);
}


function GetInvoice(terid,callback){
	var n = new MobileCRM.FetchXml.Entity('invoice');
			n.addAttribute('invoiceid');//0
			n.addAttribute('invoicenumber');//1
		  n.addAttribute('customerid');//2
  var m = n.addLink('account','accountid','customerid','outer');
			m.addAttribute('name');//3
			m.addAttribute('ivz_addressprovince');//4
			m.addAttribute('ivz_addressdistrict');//5
			m.addAttribute('territoryid');//6
			m.addAttribute('accountnumber');//7
	var fetch = new MobileCRM.FetchXml.Fetch(n);
		  fetch.execute('array',function(data){
				alert(data.length);
        var b = [];
        for(var i in data){
					b.push({
									invoiceid:data[i][0],
									invoicenumber:data[i][1],
									customerid:data[i][2],
									name:data[i][3],
									ivz_addressprovince:data[i][4],
									ivz_addressdistrict:data[i][5],
									territoryid:data[i][6],
									accountnumber:data[i][7],
									filtername:data[i][7]+'-'+data[i][3],
									accountype:1
								});
        }
			callback(b);
		},function(er){alert(er);},null);
  }
	/*----------------------------------Get Province ---------------------------------*/
	function GetProvinceList(callback){
	var n = new MobileCRM.FetchXml.Entity('ivz_addressprovince');
		n.addAttribute('ivz_addressprovinceid');//0
		n.addAttribute('ivz_name');//1
		n.addAttribute('ivz_description');//2
	var fetch = new MobileCRM.FetchXml.Fetch(n);
		fetch.execute('array',function(data){
      var b = [];
      for(var i in data){
        b.push({
          ivz_addressprovinceid:data[i][0],
      		ivz_name:data[i][1],
      		ivz_description:data[i][2]
        });
      }
			callback(b);
		},function(er){alert(er);},null);
}
/*------------------------------------ Get District -----------------------------*/
function GetDistrictById(id,callback){
	var n = new MobileCRM.FetchXml.Entity('ivz_addressdistrict');
			n.addAttribute('ivz_addressdistrictid');//0
			n.addAttribute('ivz_name');//1
			n.addAttribute('ivz_provinceid');//2
	var filter = new MobileCRM.FetchXml.Filter();
			filter.where('ivz_provinceid','eq',id);
			n.filter = filter;
	var fetch = new MobileCRM.FetchXml.Fetch(n);
			fetch.execute('array',function(data){
				var b = [];
				for(var i in data){
					b.push({
						ivz_addressdistrictid:data[i][0],
						ivz_name:data[i][1],
						ivz_provinceid:data[i][2]
					});
				}
				callback(b);
		},function(er){alert(er);},null);
}
// function GetDistrictById(id,callback){
// 	var n = new MobileCRM.FetchXml.Entity('ivz_addressdistrict');
// 			n.addAttribute('ivz_addressdistrictid');//0
// 			n.addAttribute('ivz_name');//1
// 			n.addAttribute('ivz_provinceid');//2
// 	var filter = new MobileCRM.FetchXml.Filter();
// 			filter.where('ivz_provinceid','eq',id);
// 			n.filter = filter;
// 	var fetch = new MobileCRM.FetchXml.Fetch(n);
// 			fetch.execute('array',function(data){
// 				var b = [];
// 				for(var i in data){
// 					b.push({
// 						ivz_addressdistrictid:data[i][0],
// 						ivz_name:data[i][1],
// 						ivz_provinceid:data[i][2]
// 					});
// 				}
// 				callback(b);
// 		},function(er){alert(er);},null);
// }
function GetDistrict(callback){
	var n = new MobileCRM.FetchXml.Entity('ivz_addressdistrict');
		n.addAttribute('ivz_addressdistrictid');//0
		n.addAttribute('ivz_name');//1
		n.addAttribute('ivz_provinceid');//2
	var fetch = new MobileCRM.FetchXml.Fetch(n,1000,1);
		fetch.execute('array',function(data){
			var b = [];
			for(var i in data){
				b.push({
					ivz_addressdistrictid:data[i][0],
					ivz_name:data[i][1],
					ivz_provinceid:data[i][2]
				});
			}
			callback(b);
		},function(er){alert(er);},null);
}
