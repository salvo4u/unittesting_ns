/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/auth','N/crypto','N/currency','N/email','N/encode','N/error','N/file','N/format','N/http','N/https','N/log','N/plugin','N/record','N/redirect','N/render','N/runtime','N/search','N/sso',
        'N/task','N/transaction','N/ui/serverWidget','N/url','N/util','N/workflow','/SuiteScripts/NS_2.0_new/testcase2.js','/SuiteScripts/NS_2.0_new/testcase1.js'], 
        function(auth,crypto,currency,
        email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow,mod0,mod1){

	/**
	 * Function called upon sending a GET request to the RESTlet.
	 * 
	 * @param {Object}
	 *            requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
	 * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
	 * @since 2015.1
	 */
	function doGet(requestParams){
		var assert , arr , resjson = {};
		var t1 = new Date().getTime();
		arr = mod0.generateData(auth, crypto, currency, email, encode, error, file, format, http, https, log, plugin, record, redirect, render, runtime, search, sso, task, transaction, serverWidget,
		        url, util, workflow);
		assert = mod0.assertData(arr, auth, crypto, currency, email, encode, error, file, format, http, https, log, plugin, record, redirect, render, runtime, search, sso, task, transaction,
		        serverWidget, url, util, workflow);
		mod0.deleteData(arr, auth, crypto, currency, email, encode, error, file, format, http, https, log, plugin, record, redirect, render, runtime, search, sso, task, transaction, serverWidget,
		        url, util, workflow);
		var t2 = new Date().getTime();
		log.debug('time taken', (t2 - t1) / 1000);
		resjson['mod0'] = {
		    result : assert,
		    time : (t2 - t1) / 1000
		};
		var t1 = new Date().getTime();
		arr = mod1.generateData(auth, crypto, currency, email, encode, error, file, format, http, https, log, plugin, record, redirect, render, runtime, search, sso, task, transaction, serverWidget,
		        url, util, workflow);
		assert = mod1.assertData(arr, auth, crypto, currency, email, encode, error, file, format, http, https, log, plugin, record, redirect, render, runtime, search, sso, task, transaction,
		        serverWidget, url, util, workflow);
		mod1.deleteData(arr, auth, crypto, currency, email, encode, error, file, format, http, https, log, plugin, record, redirect, render, runtime, search, sso, task, transaction, serverWidget,
		        url, util, workflow);
		var t2 = new Date().getTime();
		log.debug('time taken', (t2 - t1) / 1000);
		resjson['mod1'] = {
		    result : assert,
		    time : (t2 - t1) / 1000
		};
		return JSON.stringify(resjson);
	}

	/**
	 * Function called upon sending a PUT request to the RESTlet.
	 * 
	 * @param {string |
	 *            Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
	 * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
	 * @since 2015.2
	 */
	function doPut(requestBody){

	}

	/**
	 * Function called upon sending a POST request to the RESTlet.
	 * 
	 * @param {string |
	 *            Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
	 * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
	 * @since 2015.2
	 */
	function doPost(requestBody){

	}

	/**
	 * Function called upon sending a DELETE request to the RESTlet.
	 * 
	 * @param {Object}
	 *            requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
	 * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
	 * @since 2015.2
	 */
	function doDelete(requestParams){

	}

	return {
	    'get' : doGet,
	    put : doPut,
	    post : doPost,
	    'delete' : doDelete
	};

});
