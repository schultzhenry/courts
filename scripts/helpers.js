
// VIEW DEFAULTS
var toggleAllJudges = false;
var detailPanelOpen = false;
var mapOpen = false;

// VIEW CONSTANTS
var activeCourt = '';
var presidentIdList = '#Donald-J-Trump, #Barack-Obama, #George-W-Bush, #William-J-Clinton, #George-HW-Bush, #Ronald-Reagan';
var column_names = [ 'Judge', 'Appointing President', 'Party', 'Commission', 'Years on Court', 'ABA Rating' ]

// FORMAT STRINGS
function f(s) { return s.replace(/ /g, '-'); }
function f2(s) { return s.replace('-', ' '); }

// TOGGLE OBJECT VISIBILITY
function toggleVis(t,b) {
  setTimeout(function() {
    if (b) { $(t).show();
    } else { $(t).hide(); }
  }, 50);
}
