// LOAD RIGHT PANEL WITH APPROPRIATE COURT INFORMATION

var toggleAllJudges = false;
var column_names = [ 'Name', 'Confirmation', 'Appointing President', 'Appointing President Party', 'Years on Court', 'ABA Rating' ]


// Find full court name from abbreviated court name
function findCourt(name) {
  for (dictionary of [ supreme_dictionary, appellate_dictionary, district_dictionary ]) {
    for (i of dictionary) { if (name === i['name']) { return i['lname']; } }
  }
  console.log('Could not find full court name for '+name+'.');
  return;
}

function findCourtData(name) {
  for (dictionary of [ supreme_dictionary, appellate_dictionary, district_dictionary ]) {
    for (i of dictionary) { if (name === i['name']) { return i; } }
  }
  console.log('Could not find court data for '+name+'.');
  return;
}


function formatJudgeData(d, name) {
  var list = [d['Court Name (1)'],d['Court Name (2)'],d['Court Name (3)'],
              d['Court Name (4)'],d['Court Name (5)'],d['Court Name (6)']]

  var num = list.indexOf('name');
  console.log(num);

  var name =                        (d['First Name'] + (d['Middle Name'] === ' ' ? '' : (' '+d['Middle Name'])) + ' ' + d['Last Name']);
  // var confirmation_date =           '';
  // var appointing_president = '';
  // var appointing_president_party = '';
  // var years_on_court = '';
  // var aba_rating = '';
  return [name,2,3,4,5,6];
}


function populateRightPanel(n, c) {

  $('#right-header > h1').text(n);          // Make header court name
  let data = findCourtData(n);              // Get judge data for court

  if (n === 'DC') { data = (c === 'court-box') ? district_dictionary[0] : appellate_dictionary[0]; };

  console.log(data);
  console.log('loading table');

  // Remove existing table and create new
  d3.select('#judge-table-space')
    .selectAll('*')
    .remove()
  var t = d3.select('#judge-table-space')
    .append('table')
    .attrs({ id: 'judge-table' });
  t.append("thead").append("tr");
  var headers = t.select("tr")
    .selectAll("th")
    .data(column_names).enter()
    .append("th")
    .text(function(d) { return d; });

  // Populate table body with judge data
  setTimeout(function(){
    t.append('tbody')
       .selectAll('tr')
       .data((toggleAllJudges == false) ? data['judges_curr'] : data['judges']).enter()
       .append('tr')
       .selectAll('td')
       .data(function(d, i) {

         var name = d['Judge Name'];
         var confirmation_date = d['Confirmation Date'];
         var app_pres = d['Appointing President'];
         var app_pres_party = d['Party of Appointing President'];
         var aba_rating = '';

         return [name,confirmation_date,app_pres,app_pres_party,'TODO','TODO'];
       }).enter()
       .append('td')
       .text(function(d) { return d; });
  }, 200);
}
