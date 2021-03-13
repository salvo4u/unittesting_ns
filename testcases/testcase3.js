define({
    generateData : function(auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow){
	    log.debug('generated 3');
	    var nameData = {
	        firstname : 'Unit Test'+new Date().getTime(),
	        middlename : 'Customer'+new Date().getTime()
	    };
	    log.debug('Names',nameData);
	    var objRecord = record.create({
	        type : record.Type.CONTACT,
	        isDynamic : false
	    });
	    objRecord.setValue({
	        fieldId : 'subsidiary',
	        value : '1'
	    });
	    for ( var key in nameData) {
		    if (nameData.hasOwnProperty(key)) {
			    objRecord.setValue({
			        fieldId : key,
			        value : nameData[key]
			    });
		    }
	    }
	    log.debug('Record',objRecord);
	    var recordId = objRecord.save({
	        enableSourcing : false,
	        ignoreMandatoryFields : false
	    });
	    log.debug('RECORD IS',recordId);
	    return [recordId];
    },
    //This function must return a true or false
    assertData : function(arr,auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow){
	    log.debug('assert 3');
	    for(var int = 0; int < arr.length; int++) {
		    var objRecord = record.load({
		    	id: arr[int],
		        type : record.Type.CONTACT,
		        isDynamic : false
		    });
		    log.debug('Name is',objRecord['middlename']);
		    if(objRecord.middlename != 'Customer11')//Checks 
		    	return false;
        }
	    return true;
    },
    deleteData : function(arr,auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow){
	    log.debug('deleted 3');
	    return 'deleted 3';
    }
});