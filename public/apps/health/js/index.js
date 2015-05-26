
var _stats;
var arc;

function getStats(){
	$.get('/server/stats', function( data ){
		_stats = data;
	}).done( renderData );
}
// {
//     "check": {
//         "ping": true
//     },
//     "count": {
//         "stats": 9
//     },
//     "cpu": {
//         "1s": [
//             0.6039603960396039,
//             0.40594059405940597,
//             0.61,
//             0.40404040404040403
//         ],
//         "5s": [
//             0.33665338645418325,
//             0.1593625498007968,
//             0.3207171314741036,
//             0.15768463073852296
//         ],
//         "15s": [
//             0.1893687707641196,
//             0.06839309428950863,
//             0.1595744680851064,
//             0.06511627906976744
//         ],
//         "1m": [
//             0.2301429046194749,
//             0.08240571523508888,
//             0.20122964440013294,
//             0.08675419644341034
//         ]
//     },
//     "memory": {
//         "system": {
//             "total": 8589934592,
//             "free": 32251904
//         },
//         "process": {
//             "rss": 50421760,
//             "heapTotal": 32171264,
//             "heapUsed": 20226256
//         }
//     },
//     "uptime": {
//         "system": 362651,
//         "process": 618
//     },
//     "versions": {
//         "http_parser": "1.0",
//         "node": "0.10.35",
//         "v8": "3.14.5.9",
//         "ares": "1.9.0-DEV",
//         "uv": "0.10.30",
//         "zlib": "1.2.8",
//         "modules": "11",
//         "openssl": "1.0.1j",
//         "stats": "0.0.5"
//     }
// }
function renderData(){
	var data = [ _stats.memory.system.total, _stats.memory.system.free ];

	var width = 740,
	    height = 500;

	var outerRadius = height / 2 - 20,
	    innerRadius = outerRadius / 3,
	    cornerRadius = 10;

	var pie = d3.layout.pie().padAngle(.02);

	arc = d3.svg.arc().padRadius(outerRadius).innerRadius(innerRadius);

	$('body').append('<h2>Memory usage</h2>');
	var svg = d3.select("body").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	svg.selectAll("path")
	    .data(pie( data ))
	  	.enter().append("path")
	    .each(function(d) { d.outerRadius = outerRadius - 20; })
	    .attr("d", arc)
	    .on("mouseover", arcTween(outerRadius, 0))
	    .on("mouseout", arcTween(outerRadius - 20, 150));

	$('code').append(JSON.stringify( _stats ));
}

function arcTween(outerRadius, delay) {
  return function() {
    d3.select(this).transition().delay(delay).attrTween("d", function(d) {
      var i = d3.interpolate(d.outerRadius, outerRadius);
      return function(t) { d.outerRadius = i(t); return arc(d); };
    });
  };
}


$(document).ready(function(){
	getStats()
});