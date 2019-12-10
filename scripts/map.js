// DRAW MAP OF THE US WITH COUNTIES AND JUDICIAL DISTRICTS

function drawMap(mapw, maph) {

  // Append svg
  var svg = d3.select("#left-vis").append('svg')
    .attrs({
      id: 'map-vis',
      class: 'hidden',
      width: 520,
      height: 320
    })
    .append('g')
    .attrs({
      class: 'map',
      transform: "translate("+String((-mapw/2)+20)+","+String((maph/2)-230)+")"
    })
    $('#map-vis').css('pointer-events', 'none');

  // Draw county and district boundaries
  var path = d3.geoPath();
  d3.json("data/us.json", function(error, us) {
    if (error) throw error;

    var counties = svg.append("g").attr("id", "counties").selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .enter().append("path")
      .attrs({
        class: "county",
        d: d3.geoPath().projection(d3.geoAlbersUsa().scale(550))
      });

    var districts = svg.append("g").attr("id", "districts").selectAll("path.district")
      .data(topojson.feature(us, us.objects.districts).features)
      .enter().append("path")
      .attrs({
        class: "district",
        d: d3.geoPath().projection(d3.geoAlbersUsa().scale(550))
      });

    districts.each(function(d) {
      districts.attr("id", function(d) {
        return 'c'+String(d.properties.jdcode);
      });
    });
  });

  // Add US territories not represented in map
  var rectWidth = 22;
  var rectHeight = 14;

  // Guam
  svg.append('rect').attrs({class: "district", id: 'c91', x: 255, y: 310, width: rectWidth, height: rectHeight})
  svg.append('text').attrs({class: "district", id: 'c91', x: (255+(rectWidth/2)), y: (310+rectHeight-3)}).text("GU").style("text-anchor", "middle");

  // Northern Mariana Islands
  svg.append('rect').attrs({class: "district", id: 'c92', x: 255, y: 280, width: rectWidth, height: rectHeight});
  svg.append('text').attrs({class: "district", id: 'c92', x: (255+(rectWidth/2)), y: (280+rectHeight-3)}).text("MP").style("text-anchor", "middle");

  // Puerto Rico
  svg.append('rect').attrs({class: "district", id: 'c93', x: 510, y: 362, width: rectWidth, height: rectHeight});
  svg.append('text').attrs({class: "district", id: 'c93', x: (510+(rectWidth/2)), y: (362+rectHeight-3)}).text("PR").style("text-anchor", "middle");

  // Virgin Islands
  svg.append('rect').attrs({class: "district", id: 'c94', x: 550, y: 362, width: rectWidth, height: rectHeight});
  svg.append('text').attrs({class: "district", id: 'c94', x: (550+(rectWidth/2)), y: (362+rectHeight-3)}).text("VI").style("text-anchor", "middle");

}

drawMap(520, 320);
