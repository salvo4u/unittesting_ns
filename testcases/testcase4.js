//testcase for a RESTlet
define({
	generateData : function(auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow){
		log.debug('generated 4');
		return {};
	},
	assertData : function(arr,auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow){
		log.debug('assert 4');
		return true;
	},
	deleteData : function(arr,auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow){
		log.debug('deleted 4');
		return 'deleted4';
	}
});