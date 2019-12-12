// LOAD RIGHT PANEL WITH APPROPRIATE COURT INFORMATION

var toggleAllJudges = false;
var column_names = [ 'Judge', 'Appointing President', 'Party', 'Commission', 'Years on Court', 'ABA Rating' ]

function findCourtData(n) {
  for (d of [ s_d, a_d, d_d ]) {
    for (i of d) {
      if (n === i['name']) {
        return i;
      }
    }
  }
  return;
}

function getJudgeInfo(d) {
  let years_on_court = '';
  let commission = '';
  let year = '';
  let month = '';
  let date = '';
  let today = new Date();
  let c_year = today.getFullYear();
  let t_year = '';

  if (d['Commission Date'] !== '') {
    if (d['Commission Date'].indexOf('-') != -1) {
      let str = d['Commission Date'].split('-');
      year = str[0];
      month = str[1];
      date = str[2];
      month = (month.length == 2) ? month : '0'.concat(month);
      date = (date.length == 2) ? date : '0'.concat(date);
    } else {
      let str = d['Commission Date'].split('/');
      month = str[0];
      date = str[1];
      month = (month.length == 2) ? month : '0'.concat(month);
      date = (date.length == 2) ? date : '0'.concat(date);
      // DEVELOP THIS FURTHER
      if (d['Appointing President'] === 'Barack Obama' ||
          d['Appointing President'] === 'George W. Bush' ||
          d['Appointing President'] === 'Donald J. Trump' ||
          (d['Appointing President'] === 'William J. Clinton' &&
           (str[2] === '00' ||
            str[2] === '01'))) {
        year = '20'.concat(str[2]);
      } else {
        year = '19'.concat(str[2]);
      }
    }
    commission = year.concat('-',month,'-',date);

    if (d['Termination Date'] !== '') {
      if (d['Termination Date'].indexOf('-') != -1) {
        let str = d['Termination Date'].split('-');
        t_year = str[0];
      } else {
        let str = d['Termination Date'].split('/');
        if (parseInt('19'.concat(str[2])) >= year) {
          t_year = '19'.concat(str[2]);
        } else if (parseInt('20'.concat(str[2])) >= year) {
          t_year = '20'.concat(str[2]);
        } else {
          t_year = '19'.concat(str[2]);
        }
      }
      years_on_court = years_on_court.concat(t_year - year);
    } else {
      years_on_court = years_on_court.concat(c_year - year);
    }
  }

  return [
    ['judge', d['Judge Name']],
    ['app_pres', d['Appointing President']],
    ['app_pres_party', d['Party of Appointing President']],
    ['commission', commission],
    ['years_on_court', years_on_court],
    ['aba_rating', d['ABA Rating']]
  ];
}

function populateRightPanel(n) {

  let lnamel = findCourtData(n)['lname'];
  if (Array.isArray(lnamel)) { lnamel = lnamel[1]; };

  $('#detail-header > h1').text(lnamel);     // Make header court name
  let data = findCourtData(n);              // Get judge data for court
  let data_judges = (toggleAllJudges == false ? data['judges_curr'] : data['judges']);

  let formatted_data = [];
  data_judges.forEach(function(d, i) { formatted_data.push(getJudgeInfo(d)); });
  var flat_formatted_data = [].concat.apply([], formatted_data);

  // Remove existing table and create new
  d3.select('#judge-table-space')
    .selectAll('table')
    .remove();

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

    var b = t.append('tbody');

    var td = b.selectAll('tr')
      .data(formatted_data).enter()
      .append('tr')
      .selectAll('td')
      .data(function(d, i) { return formatted_data[i]; }).enter()
      .append('td');

    b.selectAll('td').each(function(d, i) {
      let s = d3.select(this);

      s.append('div')
      .attr('class', function(d) {
        let c = '';
        if       (d[0] == 'aba_rating') {
          c = c.concat('aba_rating');
          if      (d[1] === 'Exceptionally Well Qualified') { c = c.concat(' ewq'); }
          else if (d[1] === 'Well Qualified')          { c = c.concat(' wq');  }
          else if (d[1] === 'Qualified')               { c = c.concat(' q');   }
          else if (d[1] === 'Not Qualified')           { c = c.concat(' nq');  }
          else                                         { c = c.concat(' na');  }
        } else if (d[0] === 'app_pres_party') {
          c = c.concat('app_pres_party');
          if      (d[1] === 'Democratic')                   { c = c.concat(' democratic'); }
          else if (d[1] === 'Federalist')                   { c = c.concat(' federalist'); }
          else if (d[1] === 'Jeffersonian Republican')       { c = c.concat(' jeffersonian-republican'); }
          else if (d[1] === 'None (assignment)')            { c = c.concat(' none-assign'); }
          else if (d[1] === 'None (reassignment)')          { c = c.concat(' none-reassign'); }
          else if (d[1] === 'Republican')                   { c = c.concat(' republican'); }
          else if (d[1] === 'Whig')                         { c = c.concat(' whig'); }
          else if (d[1] === '')                             { c = c.concat(' independent'); }
       } else if (d[0] === 'years_on_court') {
         c = c.concat('years_on_court');
       } else if (d[0] === 'judge') {
         c = c.concat('judge');
       }
       return c;
      })
      .attr('width', function(d) {
        if (d[0] === 'years_on_court') {
          return String(d[1]).concat('px');
        } else {
          return '';
        }
      });

      s.append('span')
        .attr('class', function(d) {
          if (d[0] == 'commission') {
            return 'mono';
          }
          return '';
        })
        .text(function(d) {
          if (d[0] === 'app_pres_party' || d[0] === 'app_pres') {
            if (d[1] === 'None (assignment)') {
              return 'N/A (Assignment)';
            } else if (d[1] === 'None (reassignment)') {
              return 'N/A (Reassignment)';
            } else if (d[1] === '') {
              return 'Independent';
            }
          }
          if (d[1] === 'Exceptionally Well Qualified') { return 'Ex. Well Qualified'; }
          return d[1];
        });

      s.selectAll('div').each(function(d,i) {
        if (d[0] === 'years_on_court') {
          if (d[1] !== '') {
            let temp = d3.select(this)
              .append('div')
              .attr('class', 'year-on-court-container');

            temp.selectAll('.year_on_court')
              .data(function(d) { return (parseInt(d[1]) >= 0) ? Array(parseInt(d[1])) : 0; })
              .enter()
              .append('div')
              .attr('class', 'year_on_court');

            temp.append('div')
              .attr('class', 'year_on_court');
          }
        }
        return;
      });
    });

    b.selectAll('tr.vacancy')
      .data(function() {
        return Array(data['size'] - data['size_curr']);
      }).enter()
      .append('tr')
      .selectAll('td')
      .data(['Vacancy','','','','','']).enter()
      .append('td')
      .attr('class', 'vacancy')
      .text(function(d) { return d; });

    $('.judge').each(function(d,i) {
      let s = d3.select(this);
      let span = s.select('span');
      // getJudgeLink(d);
    });
  }, 50);

  setTimeout(function() {

  }, 100);
}
