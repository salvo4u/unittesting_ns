//test case for a UE
define({	
	generateData : function(auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow){
		log.debug('generated 1');
		var fileObj = file.create({
		    name : 'test11.txt' + new Date().getTime(),
		    fileType : file.Type.PLAINTEXT,
		    contents : JSON.stringify("THIS IS HYDERABAD" + new Date().getTime())
		});
		fileObj.folder = 1115;
		var id = fileObj.save();
		log.debug('id:', id);
		return 'generated 1';
	},
	assertData : function(arr,auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow){
		log.debug('assert 1');
		return false;
	},
	deleteData : function(arr,auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow){
		log.debug('deleted 1');
		return 'deleted 1';
	}
});