// LOAD RIGHT PANEL WITH APPROPRIATE COURT INFORMATION


var column_names = [ 'Name', 'Confirmation Date', 'Appointing President', 'Appointing President Party', 'Years on Court', 'ABA Rating' ]


// Find full court name from abbreviated court name
function findCourt(name) {
  for (dictionary of [ supreme_dictionary, appellate_dictionary, district_dictionary ]) {
    for (i of dictionary) { if (name === i['name']) { return i['lname']; } }
  }
  console.log('Could not find full court name for '+name+'.');
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


function populateRightPanel(name) {

  // Make header court name
  $('#right-header > h1').text(name);

  // Get judge data for court
  var lname = findCourt(name);
  var court_data = courts[lname];

  // Remove existing table and create new
  d3.select('#judge-table-space').selectAll('*').remove()
  var table = d3.select('#judge-table-space').append('table')
    .attrs({
      id: 'judge-table'
    });

  table.append("thead").append("tr");

  var headers = table.select("tr").selectAll("th")
    .data(column_names).enter().append("th")
    .text(function(d) { return d; });

  table.append('tbody')
     .selectAll('tr')
     .data(court_data).enter()
     .append('tr')
     .selectAll('td')
     .data(function(d, i) {
       var list = [d['Court Name (1)'],d['Court Name (2)'],d['Court Name (3)'],d['Court Name (4)'],d['Court Name (5)'],d['Court Name (6)']];

       var num = (list.indexOf(lname) + 1);
       console.log(num);

       var name = (d['First Name'] + (d['Middle Name'] === ' ' ? '' : (' '+d['Middle Name'])) + ' ' + d['Last Name']);
       var confirmation_date = d['Confirmation Date ('+num+')'];
       var appointing_president = d['Appointing President ('+num+')'];
       var appointing_president_party = d['Party of Appointing President ('+num+')'];
       // var years_on_court = d['Appointing President ('+num+')'];
       var aba_rating = '';

       return [name,confirmation_date,appointing_president,appointing_president_party,'TODO','TODO'];

         // // evaluate column objects against the current row
         // return columns.map(function(c) {
         //     var cell = {};
         //     d3.keys(c).forEach(function(k) {
         //         cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
         //     });
         //     return cell;
         // });
     }).enter()
     .append('td')
     .text(function(d) { return d; });
}
