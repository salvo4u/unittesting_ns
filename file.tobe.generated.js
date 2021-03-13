/**
 * @NApiVersion 2.x
 * @NScriptType RESTlet
 */
define(['N/auth','N/crypto','N/currency','N/email','N/encode','N/error','N/file','N/format','N/http','N/https','N/log','N/plugin','N/record','N/redirect','N/render','N/runtime','N/search','N/sso',
        'N/task','N/transaction','N/ui/serverWidget','N/url','N/util','N/workflow',
        '/SuiteScripts/Anshul_Testcases/testcase3.js',
        '/SuiteScripts/Anshul_Testcases/testcase4.js','xyz.js'], function(auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,
        record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow,mod0,mod1,mod3){
	function doGet(params){
		var assert , arr , resjson = {};
		var t1 = new Date().getTime();
		arr = mod0.generateData();
		assert = mod0.assertData(arr);
		mod0.deleteData(arr);

		arr = mod1.generateData();
		assert = mod1.assertData(arr);
		mod1.deleteData(arr);
		var t2 = new Date().getTime();
		log.debug('time taken', (t2 - t1) / 1000);
		resjson['/SuiteScripts/Anshul_Testcases/testcase4_defines.js'] = {
		    result : assert,
		    time : (t2 - t1) / 1000
		};
		return JSON.stringify(resjson);
	}
	return {
		'get' : doGet
	};
});