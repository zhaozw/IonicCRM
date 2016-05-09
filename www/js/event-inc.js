$(function(){
  console.log('Loadding');
  var ip = location.host;
  console.log(ip);
});
$(function(){
		$('.divContact').hide();
		$('.divMeetting').hide();
		$('.divAddrTrans').hide();
		$('.divAddrInvoice').hide();
		$('.divAddrOther').hide();
		$('.divInfoTransport').hide();
		$('.divDocument').hide();
		$('.divCredit').hide();
		$('.divMiniMart').hide();
		$('.divContactUs').hide();
		$('.divFormContactUs').hide();
		$('.divPublicContact').hide();
		$('.divFormPublic').hide();
		$('.divComfirm').hide();
		$('.divFnMeet').hide();
		$('.publicdoc,.rowdoc001,.rowdoc002,.rowdoc003,.rowdoc004,.rowdoc005').hide();
		$('#doc001').change(function() {
			GetAtt('#doc001','#idcImg01','canvas01',function(data){
				console.log(data.length);
				angular.element('[ng-controller="newaccount"]').scope().doc.doc001 = data;
			});
		});
		$('#doc002').change(function() {
			GetAtt('#doc002','#idcImg02','canvas02',function(data){
				console.log(data.length);
				angular.element('[ng-controller="newaccount"]').scope().doc.doc002 = data;
			});
		});
		$('#doc003').change(function() {
			GetAtt('#doc003','#idcImg03','canvas03',function(data){
				console.log(data.length);
				angular.element('[ng-controller="newaccount"]').scope().doc.doc003 = data;
			});
		});
		$('#doc004').change(function() {
			GetAtt('#doc004','#idcImg04','canvas04',function(data){
				console.log(data.length);
				alert('doc004 '+data.length);
				angular.element('[ng-controller="newaccount"]').scope().doc.doc004 = data;
			});
		});
		$('#doc005').change(function() {
			GetAtt('#doc005','#idcImg05','canvas05',function(data){
				console.log(data.length);
				alert('doc005 '+data.length);
				angular.element('[ng-controller="newaccount"]').scope().doc.doc005 = data;
			});
		});
		$('#doc006').change(function() {
			GetAtt('#doc006','#idcImg06','canvas06',function(data){
				$('.divimg').remove();
				console.log(data.length);
				angular.element('[ng-controller="newaccount"]').scope().MiniMart.doc.push(data);
				var datapush = angular.element('[ng-controller="newaccount"]').scope().MiniMart.doc;
				if(datapush.length > 0){
					for(var i in datapush){
						$('.divspace').append('<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 divimg">'+
																	'<img class="thumbnail" src="data:image/jpeg;base64,'+datapush[i]+'" width="100" height="100" onclick="removeimg('+i+')"/>'+
																	'</div>');
					}
				}else{
					$('.divspace').append('<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 divimg">'+
																'<img class="thumbnail" src="data:image/jpeg;base64,'+data+'่" width="100" height="100" onclick="removeimg(0)"/>'+
																'</div>');
				}
			});
		});
		$('#doc081').change(function() {
			clearimg01();
			GetAtt('#doc081','#idcImg081','canvas081',function(data){
				//alert('doc081 '+data.length);
				angular.element('[ng-controller="newaccount"]').scope().contact1.doc = data;
				$('.spaceimg').append('<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 divimg01">'+
															'<img class="thumbnail" src="data:image/jpeg;base64,'+data+'" width="100" height="100"/>'+
															'</div>');
			});
		});
	});
