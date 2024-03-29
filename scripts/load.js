// LOAD.JS: LOAD AND TRANSFORM CSV DATA
// FOR THE FEDERAL JUDICIARY INTERACTIVE VISUALIZATION

// DATA SOURCE: FEDERAL JUDICIAL CENTER
// fjc.gov/history/judges/biographical-directory-article-iii-federal-judges-export

$('#detail-panel').toggle();

async function loadData() {
  // LOAD CSV JUDGE DATA
  d3.csv('data/federal-judicial-service.csv', function(federal_judicial_service) {
      // GROUP JUDGE DATA BY COURT
      let group = federal_judicial_service.reduce((r, a) => {
        r[a['Court Name']] = [...r[a['Court Name']] || [], a];
        return r;
        }, {});

      function getCurrentJudges(name) {
        judge_list = [];
        if (!group[name]) { return []; };
        for (i of group[name]) { if (i['Termination Date'] === "" && i['Senior Status Date'] === "" && i['Commission Date'] != "") { judge_list.push(i); }; };
        return judge_list;
      }

      function updateConstantDictionary(dictionary) {
        let n = dictionary['lname'];
        if (Array.isArray(n)) {
          let judges = [];
          let judges_curr = [];
          let size_curr = 0;
          for (name of n) {
            judges.push(group[name]);
            judges_curr.push(getCurrentJudges(name));
            size_curr += getCurrentJudges(name).length;
          }
          dictionary['judges']      = [].concat.apply([],judges);
          dictionary['judges_curr'] = [].concat.apply([],judges_curr);
          dictionary['size_curr']   = size_curr;
        } else {
          dictionary['judges']      = group[n];
          dictionary['judges_curr'] = getCurrentJudges(n);
          dictionary['size_curr']   = dictionary['judges_curr'].length;
        }
      }

      // UPDATE CONSTANT DICTIONARIES FROM CONSTANTS.JS WITH FULL JUDGE DATA PULLED FROM CSVS
      updateConstantDictionary(s_d[0]);                                          //   SUPREME
      $.each(a_d, function(i, v) { updateConstantDictionary(v); })               // APPELLATE
      $.each(d_d, function(i, v) { updateConstantDictionary(v); })               //  DISTRICT

      function judgeNodeClass(level, name) {
        if (level === 'supreme') { return s_d[0];
        } else if (level === 'appellate') {
          for (i of a_d) { if (i.name === name) { return i; }; };
        } else if (level === 'district') {
          for (i of d_d) { if (i.name === name) { return i; }; };
        }
      };

      function populateJudges(level, selection, name, size) {

        // CONSTANTS
        var w = 50;
        var h = 26;
        var pad = 2;
        var center = {x: w/2, y: h/2};
        var forceStrength = 0.05;
        var radius = 2.65;

        // APPEND SVG
        var svg = selection.selectAll(".court")
          .append("svg")
          .attr("width", w)
          .attr("height", h)
          .attr("class", "judges-thumbnail")
          .attr("id", f(name)+"-judges");
        // CREATE NODE LIST
        var nodes = d3.range(size).map(function(i) { return {r: radius}; });
        // CREATE SIMULATION
        var simulation = d3.forceSimulation(nodes)
          .velocityDecay(0.3)
          .force('center', d3.forceCenter(w/2, h/1.65))
          .force("x", d3.forceX().strength(forceStrength).x(center.x))
          .force("y", d3.forceY().strength(forceStrength).y(center.y))
          .force("collide", d3.forceCollide().radius(function(d) { return d.r * 1.2; }).iterations(2))
          .on("tick", ticked);
        // ADD NODES TO SVG
        var node = svg.append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(nodes).enter().append("circle")
          .attr("r", function(d){  return d.r })
          .attr('class', function(d, i) {
            let c = 'nodeDefault ';
            let nodeData = judgeNodeClass(level, name.replace('-', ' ')).judges_curr[i];
            if (!nodeData) { return c.concat('Vacant'); }
            else {
              c = c.concat(nodeData['Party of Appointing President']);
              c = c.concat(' ');
              c = c.concat(f(nodeData['Appointing President']).replace(/\./g, ''));
            }
            return c;
          });
        function ticked() { node
          .attr('cx', function (d) { return d.x = Math.max(radius, Math.min(w - radius, d.x)); })
          .attr('cy', function (d) { return d.y = Math.max(radius, Math.min(h - radius, d.y)); });
        }
        simulation.nodes(nodes).on("tick", ticked);
      }

      function loadLevel(level, name) {
        var selection = d3.select("#"+level+"-level .court-space");
        if (level === 'appellate' ) {
          // NEST COURTS BY CIRCUIT
          const nest = d3.nest().key(d => d.column).entries(a_d);
          // ADD GROUP FOR EACH CIRCUIT
          const group = selection.selectAll('.appellate-column')
            .data(nest).enter()
            .append('div')
            .attr('id', function(d) { return String(d.key).replace(' ', '-'); })
            .attr('class', 'appellate-column');
          // ADD APPROPRIATE NUMBER OF COURTS PER GROUP
          group.selectAll('.court')
            .data(d => d.values).enter()
            .append('div').attr('class', function(d) { return 'court c'+String(d.jdcode).split(',').join(' c'); })
            .attr("id", function(d) { return f(d.name); });
          // COURT LABELS
          group.data(a_d)
            .append('p').attr('class', 'court-label')
            .text(function(d) { return d.name; })
            .attr('id', function(d) { return String(d.name)+'-label'; });
          // POPULATE JUDGES
          a_d.forEach(function(entry) {
            selection = d3.select("div #"+f(entry.name)+".appellate-column");
            populateJudges('appellate', selection, f(entry.name), entry.size);
          });
        }
        else if (level === 'district') {
          // NEST COURTS BY CIRCUIT
          const nest = d3.nest().key(d => d.column).entries(d_d);
          // ADD GROUP FOR EACH CIRCUIT
          const group = selection.selectAll('.appellate-column')
            .data(nest).enter()
            .append('div').attr('class', 'appellate-column')
            .attr("id", function(d) { return f(d.key); });
          // ADD COLUMN FOR CIRCUIT WITH NO DISTRICTS
          selection.append('div')
            .attr('class', 'appellate-column')
            .attr("id", function(d) { return f('Federal Circuit'); });
          // ADD APPROPRIATE NUMBER OF COURTS PER GROUP
          group.selectAll('.court-box')
            .data(d => d.values).enter()
            .append('div').attr('class', 'court-box')
            .attr("id", function(d) { return f(d.name)+'-box'; })
            .append('div').attr('class', function(d) { return 'court c'+String(d.jdcode); })
            .attr("id", function(d) { return f(d.name); });
          // ADD LABELS
          selection.selectAll('.court-box')
            .data(d_d).append('p').attr('class', 'court-label')
            .attr('id', function(d) { return f(d.name)+'-label'; })
            .text(function(d) { return d.name; });
          // POPULATE JUDGES
          for (i of d_d) {
            selection = d3.select("div #"+f(i.name)+"-box.court-box");
            populateJudges('district', selection, f(i.name), i.size);
          }
        }
        else if (level === 'supreme') {
          var selection = selection.append('div').attr('class', 'appellate-column');
          selection.selectAll(".court")
            .data(s_d)
            .enter().append("div")
            .attr("id", function(d) { return d.name.replace(' ', '-');})
            .attr('class', function(d) { return 'court c'+String(d.jdcode).split(',').join(' c'); });
          selection.selectAll('.court-label')
            .data(s_d)
            .enter()
            .append("p")
            .attr('class', 'court-label')
            .attr('id', level+'-label' )
            .text(function(d) { return d.name; });
          populateJudges('supreme', selection, 'Supreme Court', s_d[0].size);
        }
      };

      // load each court level
      loadLevel('supreme', 'Supreme Court');
      loadLevel('appellate', 'Appellate');
      loadLevel('district', 'District');

  });
};

loadData();
setTimeout(function(){ $('#initial-screen').css('opacity', '0'); }, 600);
setTimeout(function(){ bindInteraction(); }, 700);
 setTimeout(function(){ $('#initial-screen').hide(); }, 2100);
