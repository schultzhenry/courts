// HELPERS.JS: GLOBAL VARIABLES AND HELPER FUNCTIONS
// FOR THE FEDERAL JUDICIARY INTERACTIVE VISUALIZATION

// VIEW DEFAULTS
var toggleAllJudges = false;
var detailPanelOpen = false;
var mapOpen = false;

// VIEW CONSTANTS
var activeCourt = '';
var presidentIdList = '#Donald-J-Trump, #Barack-Obama, #George-W-Bush, #William-J-Clinton, #George-HW-Bush, #Ronald-Reagan';
var column_names = [ 'Judge', 'Appointing President', 'Party', 'Commission', 'Years on Court', 'ABA Rating' ]

// JUDGE COUNTS
var activeJ = 0;
var vacantJ = 0;
var demJ = 0;
var repJ = 0;
var presJ = Array(presidentIdList.length).fill(0);

// FORMAT STRINGS
function f(s) { return s.replace(/ /g, '-'); }
function f2(s) { return s.replace(/\-/g, ' '); }

// TOGGLE OBJECT VISIBILITY
function toggleVis(t,b) { if (b) { $(t).show(); } else { $(t).hide(); } }
