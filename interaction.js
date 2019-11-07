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

// $('path.district').hover(function() {
//   console.log("hey");
//   console.log($(this).attr('id'));
// });

$(document).on('mouseenter','.district', function (event) {
  console.log($( this ).attr('id'));
  $('.'+String($( this ).attr('id'))).addClass('active-hover');
}).on('mouseleave','.district',  function(){
  $('.'+String($( this ).attr('id'))).removeClass('active-hover');
});
