var Handlebars = require("handlebars");  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['results-view.html'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<th>\n				<div><span>"
    + alias4(((helper = (helper = helpers.browserName || (depth0 != null ? depth0.browserName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"browserName","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.browserVersion || (depth0 != null ? depth0.browserVersion : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"browserVersion","hash":{},"data":data}) : helper)))
    + "</span></div>\n			</th>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=container.escapeExpression;

  return "		<tr>\n			<th><a href=\"#feature-"
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias2(container.lambda(((stack1 = (depth0 != null ? depth0.value : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a></th>\n"
    + ((stack1 = helpers.each.call(alias1,(depths[1] != null ? depths[1].browsers : depths[1]),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</tr>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "			<td class=\"stat-cell "
    + alias3((helpers.browserFeatureSupportClassname || (depth0 && depth0.browserFeatureSupportClassname) || alias2).call(alias1,depth0,(depths[1] != null ? depths[1].value : depths[1]),{"name":"browserFeatureSupportClassname","hash":{},"data":data}))
    + "\">\n				<div>\n					"
    + ((stack1 = (helpers.browserFeatureSupportIcon || (depth0 && depth0.browserFeatureSupportIcon) || alias2).call(alias1,depth0,(depths[1] != null ? depths[1].value : depths[1]),{"name":"browserFeatureSupportIcon","hash":{},"data":data})) != null ? stack1 : "")
    + "\n					<div class=\"stat-cell-details\">\n						"
    + alias3((helpers.browserFeatureSupport || (depth0 && depth0.browserFeatureSupport) || alias2).call(alias1,depth0,(depths[1] != null ? depths[1].value : depths[1]),{"name":"browserFeatureSupport","hash":{},"data":data}))
    + "\n					</div>\n				</div>\n			</td>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=container.escapeExpression;

  return "		<tr>\n			<th colspan=\"5\" id=\"feature-"
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><h3>"
    + alias2(container.lambda(((stack1 = (depth0 != null ? depth0.value : depth0)) != null ? stack1.title : stack1), depth0))
    + "</h3></th>\n		</tr>\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.value : depth0)) != null ? stack1.occurances : stack1),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<tr data-file=\""
    + alias4(((helper = (helper = helpers.file || (depth0 != null ? depth0.file : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"file","hash":{},"data":data}) : helper)))
    + "\" data-line=\""
    + alias4(((helper = (helper = helpers.line || (depth0 != null ? depth0.line : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"line","hash":{},"data":data}) : helper)))
    + "\" data-column=\""
    + alias4(((helper = (helper = helpers.column || (depth0 != null ? depth0.column : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"column","hash":{},"data":data}) : helper)))
    + "\" class=\"occurance\">\n			<td headers=\"feature-"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + " reference-file\"><span class=\"icon icon-file-text\">"
    + alias4(((helper = (helper = helpers.relativePath || (depth0 != null ? depth0.relativePath : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"relativePath","hash":{},"data":data}) : helper)))
    + "</a></td>\n			<td headers=\"feature-"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + " reference-type\">"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</td>\n			<td headers=\"feature-"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + " reference-match\"><code>"
    + alias4(((helper = (helper = helpers.match || (depth0 != null ? depth0.match : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"match","hash":{},"data":data}) : helper)))
    + "</code></td>\n		</tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<h2>Browser support</h2>\n<table class=\"features-table\">\n	<thead>\n		<tr>\n			<th>Feature</th>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.browsers : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</tr>\n	</thead>\n	<tbody>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.results : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</tbody>\n</table>\n\n<h2>References to features in code</h2>\n<table class=\"references-table\">\n	<thead>\n		<tr>\n			<th id=\"reference-file\">Filename</th>\n			<th id=\"reference-type\">Type of match</th>\n			<th id=\"reference-match\">Match</th>\n		</tr>\n	</thead>\n	<tbody>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.results : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	<tbody>\n</table>\n";
},"useData":true,"useDepths":true});
