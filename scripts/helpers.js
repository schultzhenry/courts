// HELPERS.JS: GLOBAL VARIABLES AND HELPER FUNCTIONS
// FOR THE FEDERAL JUDICIARY INTERACTIVE VISUALIZATION

// VIEW DEFAULTS
var toggleAllJudges = false;
var detailPanelOpen = false;
var mapOpen = false;
var activeCourt = '';

// VIEW CONSTANTS
const column_names = [ 'Judge', 'Appointing President', 'Party', 'Commission', 'Years on Court', 'ABA Rating' ]
const presList = [ 'Donald J. Trump', 'Barack Obama', 'George W. Bush', 'William J. Clinton', 'George H.W. Bush', 'Ronald Reagan' ]
const presClassList = Array.from(presList, e => '.'+f3(f(e)));
const presIdList = Array.from(presList, e => '#'+f3(f(e)));
const presidentIdList = presIdList.join(', ');

// JUDGE COUNTS
var activeJ = 0;
var vacantJ = 0;
var demJ = 0;
var repJ = 0;
var presJ = Array(presidentIdList.length).fill(0);

// FORMAT STRING
function f(s) { return s.replace(/ /g, '-'); }
function f2(s) { return s.replace(/\-/g, ' '); }
function f3(s) { return s.replace(/\./g, ''); }

// TOGGLE OBJECT VISIBILITY
function toggleVis(t) { if ($(t).is(":visible")) { $(t).hide(); } else { $(t).show(); } }
