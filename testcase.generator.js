define({
    getNsmodules : function(){
	    return ['N/auth','N/crypto','N/currency','N/email','N/encode','N/error','N/file','N/format','N/http','N/https','N/log','N/plugin','N/record','N/redirect','N/render','N/runtime','N/search',
	            'N/sso','N/task','N/transaction','N/ui/serverWidget','N/url','N/util',
	            'N/workflow'];
    },
    nsmodulenames : "auth,crypto,currency,email,encode,error,file,format,http,https,log,plugin,record,redirect,render,runtime,search,sso,task,transaction,serverWidget,url,util,workflow",
    getNsobject : function(name){
	    var arr = name.split("/");// remove N/ from the config
	    return arr[arr.length - 1];
    },
    generateModuleCode : function(searchres){
	    var filestr = 'define([';
	    var nsmodules = this.getNsmodules();
	    // var modules = this.getModules();
	    var modules = searchres;
	    for ( var m in nsmodules) {
		    var module = nsmodules[m];
		    filestr += ("'" + module + "',");
	    }
	    for ( var m in modules) {
		    var module = modules[m];
		    log.debug('Module Name', module);
		    filestr += ("'" + module + "',");
	    }
	    filestr = filestr.substring(0, filestr.length - 1);
	    filestr += ']\n,function(';
	    for ( var m in nsmodules) {// this generates the modules inside
		    var module = nsmodules[m];
		    filestr += (this.getNsobject(module) + ",");
	    }
	    for ( var m in modules) {
		    filestr += ('mod' + m + ",");
	    }
	    filestr = filestr.substring(0, filestr.length - 1);
	    filestr += '){\nfunction doGet(params){\n var assert,arr,resjson = {};\n';
	    for (var m in modules) {
	    	var mname = modules[m]; 
		    filestr += ("var t1 = new Date().getTime();\narr = " + "mod" + m + ".generateData(" + this.nsmodulenames + ");\n");
		    filestr += ("assert = mod" + m + ".assertData(arr," + this.nsmodulenames + ");\n");
		    filestr += ("mod" + m + ".deleteData(arr," + this.nsmodulenames + ");\n" + 
		    		"var t2 = new Date().getTime();");
		    filestr += ("\nlog.debug(\'time taken\',(t2 - t1)/1000);");
		    filestr += ("resjson['"+mname +"'] = {result:assert,time:(t2 - t1)/1000};\n");
	    }
	    filestr += "return JSON.stringify(resjson);\n}	" + "return {'get': doGet};\n" + // end of execute
	    "}    );";
	    return filestr;
    }
});
