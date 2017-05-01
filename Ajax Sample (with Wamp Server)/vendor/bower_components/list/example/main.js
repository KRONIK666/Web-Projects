var t_table= Handlebars.compile($("#list_tpl").html());
var url='../data/page.json';

var options={
	url:url,
	dataName:"data",
	totalName:"total",
	rowLimit:10,
	tpl:t_table,
	target:"#list"
};
var list=new List(options);