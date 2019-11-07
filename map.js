// load map
var mapw = 520;
var maph = 320;

var svg = d3.select("#left-vis").append('svg')
  .attr('id', 'map-vis')
  .attr('width', mapw)
  .attr('height', maph)
  .append('g')
  .attr('class', 'map')
  .attr("transform", "translate("+String((-mapw/2)+20)+","+String((maph/2)-230)+")");

var path = d3.geoPath();
// var color = d3.scaleOrdinal("schemeCategory20b");

// Draw county boundaries
d3.json("us_jud.json", function(error, us) {
  if (error) throw error;

  var counties = svg.append("g").attr("id", "counties").selectAll("path")
  .data(topojson.feature(us, us.objects.counties).features)
  .enter().append("path")
  .attr("class", "county")
  .attr("d", d3.geoPath().projection(d3.geoAlbersUsa().scale(550)));

  var districts = svg.append("g").attr("id", "districts").selectAll("path.district")
  .data(topojson.feature(us, us.objects.districts).features)
  .enter().append("path")
  .attr("class", "district")
  .attr("d", d3.geoPath().projection(d3.geoAlbersUsa().scale(550)));

  districts.each(function(d) {
    districts.attr("id", function(d) { return d.properties.jdcode;});
  });
});

var rectWidth = 22;
var rectHeight = 14;

// Guam
svg.append('rect').attrs({class: "district", id: 91, x: 255, y: 310, width: rectWidth, height: rectHeight})
svg.append('text').attrs({x: (255+(rectWidth/2)), y: (310+rectHeight-3)}).text("GU").style("text-anchor", "middle");

// Northern Mariana Islands
svg.append('rect').attrs({class: "district", id: 92, x: 255, y: 280, width: rectWidth, height: rectHeight});
svg.append('text').attrs({x: (255+(rectWidth/2)), y: (280+rectHeight-3)}).text("MP").style("text-anchor", "middle");

// Puerto Rico
svg.append('rect').attrs({class: "district", id: 93, x: 510, y: 362, width: rectWidth, height: rectHeight});
svg.append('text').attrs({x: (510+(rectWidth/2)), y: (362+rectHeight-3)}).text("PR").style("text-anchor", "middle");

// Virgin Islands
svg.append('rect').attrs({class: "district", id: 94, x: 550, y: 362, width: rectWidth, height: rectHeight});
svg.append('text').attrs({x: (550+(rectWidth/2)), y: (362+rectHeight-3)}).text("VI").style("text-anchor", "middle");
