/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
//TESTING DEMO
define(['N/https','N/file','N/record','N/search','N/url','N/ui/serverWidget','/SuiteScripts/NS_2.0_new/unit.testing.1/framework/testcase.generator.js'],
function(https,file,record,search,url,serverWidget,runner){
	/**
	 * Definition of the Suitelet script trigger point.
	 * 
	 * @param {Object}
	 *            context
	 * @param {ServerRequest}
	 *            context.request - Encapsulation of the incoming request
	 * @param {ServerResponse}
	 *            context.response - Encapsulation of the Suitelet response
	 * @Since 2015.2
	 */
	function generateUi(context){
	}
	function loadAndRunSearch(){
		var res = {};
		var mySearch = search.load({
			id : 'customsearch_unit_test_saved_search'
		});
		mySearch.run().each(function(result){
			var name = result.getValue({
				name : 'name'
			});
			var fname = result.getValue({
				name : 'custrecord_unit_file_name'
			});
			res[fname+''] = {
				    'name' : name,
				    'filename' : fname
				};
			return true;
		});
		log.debug('UnitTest Json is', res);
		return res;
	}

	function onRequest(context){
		
		var testjson = loadAndRunSearch(),i=0;
		if (context.request.method === 'GET') {
			var form = serverWidget.createForm({
				title : 'MY FORM' 
			});
			form.addField({
			    id : 'tjlength',
			    type : serverWidget.FieldType.TEXT,
			    label : 'Length',
			    defaultValue : 2
			});
			for (var key in testjson) {
				log.debug(key);
				var json = JSON.parse(JSON.stringify(testjson[key]));
				log.debug(json.name + "  " + json.filename);
				var fieldgroup = form.addFieldGroup({
				    id : 'fieldgroupid' + i,
				    label : 'TEST' + i
				});
				form.addField({
				    id : 'cbfield' + i,
				    type : serverWidget.FieldType.CHECKBOX,
				    label : 'CB',
				    container : 'fieldgroupid' + i
				});
				var x = form.addField({
				    id : 'testnamefield' + i,
				    type : serverWidget.FieldType.TEXT,
				    label : json.name,
				    container : 'fieldgroupid' + i
				});
				x.defaultValue = json.name;
				var y = form.addField({
				    id : 'testfilefield' + i,
				    type : serverWidget.FieldType.TEXT,
				    label : json.filename,
				    container : 'fieldgroupid' + i
				});
				y.defaultValue = json.filename;
				i++;
			}
			// field.breakType = serverWidget.FieldBreakType.STARTCOL;
			form.addSubmitButton({
				label : 'Submit'
			});
			context.response.writePage(form);
		} else {
			var tjlength = context.request.parameters.tjlength;
			var i , searchres = [];
			log.debug(' -- ' + tjlength);
			for (i = 0; i < tjlength; i++) {
				var cb = context.request.parameters['cbfield' + i];
				var fname = context.request.parameters['testfilefield' + i];
				if (cb === 'T') {
					searchres.push(fname);
				}
				log.debug(cb + '  ' + fname);
			}
			var str = runner.generateModuleCode(searchres);
			var filestr = '/**\n * @NApiVersion 2.x \n * @NScriptType RESTlet \n */\n';
			var fileObj = file.create({
			    name : 'unit.test.runner.js',// TODO:change the name of the file
			    fileType : file.Type.PLAINTEXT,
			    contents : filestr + str
			});
			fileObj.folder = 1015;// TODO:
			var id = fileObj.save();
			// File generated
			// NOW EXECUTE THE FILE
			var runnerurl = url.resolveScript({
			    scriptId : 'customscript_unit_testrunner_restlet',
			    deploymentId : 'customdeploy1',
			    returnExternalUrl : true
			});
			log.debug('runnerurl', runnerurl);// https://system.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=149&deploy=1
			var header = {};
			header['Authorization'] = 'NLAuth nlauth_account= TSTDRV1150989,nlauth_email=anshulgupta4@deloitte.com, nlauth_signature=Jaisriram123@,nlauth_role=3';
			var response1 = https.get({
			    url : runnerurl,
			    headers : header
			});
			log.debug('response', response1.body);
			var body = JSON.parse(response1.body);
			log.debug('response body', body);
			i=0;
			var text = '<html><body><b><tr><td>TESTCASE         </td><td>TIME       </td><td>RESULT      </td></tr></b><br/>';
			for(key in body){
				log.debug('key ', key);
				log.debug('key ', body[key]);
				text += '<tr><td>    '+ key +'</td><td>    '+body[key]['time']+'</td><td>   '+ body[key]['result'] + '</td></tr>';
			}
			text+='</body></html>';
			context.response.write(body+"  \n  " +text);
		}
	}
	return {
		onRequest : onRequest
	};
});
