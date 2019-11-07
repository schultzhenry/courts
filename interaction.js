// HANDLE INTERACTION WITH MAP AND COURT VIS ELEMENTS

var rightPanelOpen = false;

function toggleRightPanel() {
  console.log("clicked!");
  if (rightPanelOpen == false) {
    document.documentElement.style.setProperty('--inner-border', "Calc(Var(--outer-border) / 2)");
    document.documentElement.style.setProperty('--left-width', "50%");
    document.documentElement.style.setProperty('--right-width', "50%");
    $('#right-panel-toggle').css("right", "Calc(50% - Calc(Var(--outer-border) * 3) - Var(--inner-border))");
    $('#right-panel-toggle').children("#right-panel-toggle-text").text("→");
    setTimeout(function() {
      $("#right-header").children("h1").text("N/A");
    }, 550);
    rightPanelOpen = true;
  } else {
    document.documentElement.style.setProperty('--left-width', "100%");
    document.documentElement.style.setProperty('--right-width', "0%");
    $('#right-panel-toggle').css("right", "Calc(Var(--outer-border) - 1px)");
    $("#right-header").children("h1").text("");
    setTimeout(function() {
      document.documentElement.style.setProperty('--inner-border', "Calc(Var(--outer-border))");
    }, 500);
    $('#right-panel-toggle').children("#right-panel-toggle-text").text("←");
    rightPanelOpen = false;
  }
}

function openRightPanel() {
  document.documentElement.style.setProperty('--inner-border', "Calc(Var(--outer-border) / 2)");
  document.documentElement.style.setProperty('--left-width', "50%");
  document.documentElement.style.setProperty('--right-width', "50%");
  $('#right-panel-toggle').css("right", "Calc(50% - Calc(Var(--outer-border) * 3) - Var(--inner-border))");
  $('#right-panel-toggle').children("#right-panel-toggle-text").text("→");
  rightPanelOpen = true;
}

$('#right-panel-toggle').click(function() {
  toggleRightPanel();
});

$('.court').click(function() {
  $('.court').removeClass('active-court');
  $(this).addClass('active-court');
  openRightPanel();
  $('#right-header > h1').text(this.id.replace('-', ' '));
});




// Handle hovering over districts on map
$(document).on('mouseenter','.district', function (event) {

  // Do nothing if hovering over territory label
  if ($(this).get(0).tagName == 'text') {
    console.log('text');
    return;
  }
  else if ($(this).get(0).tagName == 'path') {
    // Grey out other districts
    $('.district').addClass('inactive-hover');

    // Add copy of district on top of svg and highlight
    var temp = $(this).clone().appendTo($(this).parent())
      .removeClass('inactive-hover')
      .addClass('active-hover');

    // Highlight corresponding courts
    $('.'+String($( this ).attr('id'))).addClass('active-hover');

    return;
  }
  else if ($(this).get(0).tagName == 'rect') {

    // Grey out other districts
    $('.district').addClass('inactive-hover');

    // Highlight district boundary and text
    $('#'+String($( this ).attr('id'))).removeClass('inactive-hover').addClass('active-hover');
    $('text#'+String($( this ).attr('id'))).removeClass('inactive-hover');

    // Highlight corresponding courts
    $('.'+String($( this ).attr('id'))).addClass('active-hover');

  }

}).on('mouseleave','.district',  function() {

  // Do nothing if hovering over territory label
  if ($(this).get(0).tagName == 'text') {
    console.log('text');
    return;
  }
  else if ($(this).get(0).tagName == 'path') {
    // Remove active and inactive classes from all districts
    $('.district').removeClass('active-hover').removeClass('inactive-hover');

    // Remove active class from all courts
    $('.court').removeClass('active-hover');

    // Remove original district from bottom of svg
    $( this ).remove();

    return;
  } else if ($(this).get(0).tagName == 'rect') {

    // Remove active and inactive classes from all districts
    $('.district').removeClass('active-hover').removeClass('inactive-hover');

    // Remove active class from all courts
    $('.court').removeClass('active-hover');

  }

  // // If a territory, remove label from bottome of svg
  // if ($(this).get(0).tagName == 'rect') {
  //   $('text.old-label').remove().delay( 800 );
  // }
});




$(document).on('mouseenter','.court', function (event) {
  var classes = $( this ).attr('class').replace('court ', '').split(' ');
  classes.forEach(function(i) { console.log(i); });
  $('.'+String($( this ).attr('id'))).addClass('active-hover');
}).on('mouseleave','.court',  function(){
  $('.'+String($( this ).attr('id'))).removeClass('active-hover');
});
