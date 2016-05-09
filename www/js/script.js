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
                    MsgBox('Base64:'+er);
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
	if(idval === "True"){
		idreal = 1;
	}else{
		idreal = 0;
	}
	return(idreal);
}
function GetAvailablefromtime(callback){
	MobileCRM.Metadata.getOptionSetValues("account","ivz_availablefromtime",function(optionSetValues){
		var b = [];
		for (var name in optionSetValues) {
			 var val = optionSetValues[name];
			b.push({'val':val,'name':name});
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
              		    ivz_ccmail:data[i][5]
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
///////////////// End Option /////////////////////////
function GetAppointStatus(ivz_leftterritory,ist,callback){
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
                        ivz_visitactivities:CtoTrue(data[i][21]),
                        ivz_visitsuggest:CtoTrue(data[i][22]),
                        ivz_employeeposition:data[i][24],
                        ivz_addressprovince:data[i][25],
                        ivz_addressdistrict:data[i][26],
                        territoryid:data[i][27],
                        accountnumber:data[i][28],
                        ivz_planningstatus:data[i][29],
                        ivz_emailcontact:data[i][30],
                        ivz_leadermail:data[i][31],
                        ivz_ccmail:data[i][33],
                        ivz_balancecredit:data[i][29],
                        filtername:data[i][28]+'-'+data[i][1],
                        mailtomail:data[i][30]+','+data[i][31]+','+data[i][33]
              });
              }
        }
        callback(b);
      },function(er){alert(er);},null);
}

function GetAccount(ivz_leftterritory,stype,callback){
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
              a.filter = new MobileCRM.FetchXml.Filter();
              a.filter.where('territoryid','eq',ivz_leftterritory);
         var fetch = new MobileCRM.FetchXml.Fetch(a,5000,1);
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
                      accountype:stype
      							});
      					}
      					callback(b);
        		},function(er){alert("GetOrderPedding:"+er);},null);
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
