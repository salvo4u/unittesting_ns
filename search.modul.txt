define({
	stringifyFiltersColumns:function(input) {
		var response = [];
		if (!input) return null;
		for (var i = 0, count = input.length ; i < count ; i++) {
			if (input[i] instanceof nlobjSearchColumn) {
				response.push({
					name:input[i].getName(),
					join:input[i].getJoin() || undefined,
					summary:input[i].getSummary() || undefined,
					sort:input[i].getSort() || undefined,
					formula:input[i].getFormula() || undefined,
					'function':input[i].getFunction() || undefined,
					label:input[i].getLabel() || undefined
				});
			}
			if (input[i] instanceof nlobjSearchFilter) {
				response.push({
					name:input[i].getName() || undefined,
					join:input[i].getJoin() || undefined,
					operator:input[i].getOperator() || undefined,
					value:input[i].values || undefined,
					formula:input[i].getFormula() || undefined,
					summary:input[i].getSummaryType() || undefined
				});
			}
		}
		return response;
	},
	run:function(type, id, filters, columns, limit, returnRaw) {
		var startTime = new Date().getTime();
		log.debug('search.run', {
			type:type,
			id:id,
			filters:this.stringifyFiltersColumns(filters),
			columns:this.stringifyFiltersColumns(columns),
			limit:limit,
			returnRaw:returnRaw
		});

		this.data = [], this.formulaCount = {};

		this.execute(type, id, filters, columns, limit, returnRaw);

		log.debug('search.run', {
			elapsedSeconds:((new Date().getTime()-startTime)/1000).toFixed(2),
			iterations:Math.ceil(this.data.length/1000),
			'results.length':this.data.length
		});
		return this.data;
	},
	
	execute:function(type, id, filters, columns, limit, returnRaw,search) {
		var search = id ? search.load({id : id}) : nlapiCreateSearch(type || null, filters || null, columns || null);
		var continueSearching = true, start = 0, end = 1000;
		columns = search.getColumns();
		do {
			var results = search.runSearch().getResults(start, end) || [];
			for (var i = 0, count = results.length ; i < count ; i++) {
				if (this.data.length === limit) {
					continueSearching = false;
					break;
				}
				if (returnRaw) {
					this.data.push(results[i]);
				} else {
					var temp = {};
					for (var c = 0, countc = columns.length ; c < countc ; c++) {
						var join = columns[c].getJoin(), name = columns[c].getName();
						if (name.indexOf('formula') > -1) name = this.formulaIterator(name);
						var tempValue = results[i].getValue(columns[c]), tempText = results[i].getText(columns[c]) || undefined;
						if (join) {
							if (temp[join]) {
								temp[join][name] = {
									value:tempValue,
									text:tempText
								};
							} else {
								temp[join] = {};
								temp[join][name] = {
									value:tempValue,
									text:tempText
								};
							}
						} else {
							if (temp[name]) {
								temp[name].value = tempValue;
								temp[name].text = tempValue;
							} else {
								temp[name] = {
									value:tempValue,
									text:tempText
								};
							}
						}
					}
					this.data.push(temp);
				}
			}
			if (results.length === 1000) {
				start += 1000;
				end += 1000;
			} else {
				continueSearching = false;
			}
		} while(continueSearching);
	}
});