// load map
var mapw = 520;
var maph = 320;

var svg = d3.select("#left-vis").append('svg')
  .attr('id', 'map-vis')
  .attr('width', mapw)
  .attr('height', maph)
  .append('g')
  .attr('class', 'map')
  .attr("transform", "translate("+String((-mapw/2)+40)+","+String((maph/2)-240)+")");

var path = d3.geoPath();
// var color = d3.scaleOrdinal("schemeCategory20b");

// Draw county boundaries
d3.json("us_jud.json", function(error, us) {
  if (error) throw error;

  var counties = svg.append("g").attr("id", "counties").selectAll("path")
  .data(topojson.feature(us, us.objects.counties).features)
  .enter().append("path")
  .attr("class", "county")
  .attr("d", d3.geoPath().projection(d3.geoAlbersUsa().scale(575)));

  var districts = svg.append("g").attr("id", "districts").selectAll("path.district")
  .data(topojson.feature(us, us.objects.districts).features)
  .enter().append("path")
  .attr("class", "district")
  .attr("d", d3.geoPath().projection(d3.geoAlbersUsa().scale(575)));

  districts.each(function(d) {
    districts.attr("id", function(d) { return d.properties.jdcode;});
  });
});

var rectWidth = 22;
var rectHeight = 14;

// Guam
svg.append('rect').attrs({class: , id: 91, x: 240, y: 330, width: rectWidth, height: rectHeight});

// Northern Mariana Islands
svg.append('rect').attrs({class: , id: 92, x: 240, y: 300, width: rectWidth, height: rectHeight});

// Puerto Rico
svg.append('rect').attrs({class: , id: 93, x: 510, y: 362, width: rectWidth, height: rectHeight});

// Virgin Islands
svg.append('rect').attrs({class: , id: 94, x: 550, y: 362, width: rectWidth, height: rectHeight});
