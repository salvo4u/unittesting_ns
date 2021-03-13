//testcase for a RESTlet
define({
	generateData : function(auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow){
		log.debug('generated 2');
		return 'generated2';
	},
	assertData : function(arr,auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow){
		log.debug('assert 2');
		return true;
	},
	deleteData : function(arr,auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow){
		log.debug('deleted 2');
		return 'deleted2';
	}
});