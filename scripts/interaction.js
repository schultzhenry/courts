// HANDLE INTERACTION WITH MAP AND COURT VIS ELEMENTS

function bindInteraction() {

    // Right panel closed on default
    var rightPanelOpen = false;
    var mapOpen = false;

    // Toggle right panel
    function toggleRightPanel() {
      if (rightPanelOpen == false) {
        document.documentElement.style.setProperty('--inner-border', "Calc(Var(--outer-border) / 2)");
        document.documentElement.style.setProperty('--left-width', "55%");
        document.documentElement.style.setProperty('--right-width', "45%");
        $('#right-panel-button').css("right", "Calc(45% - Calc(Var(--outer-border) * 3) - Var(--inner-border))");
        $('#right-panel-button').children("#right-panel-button-text").text("→");
        setTimeout(function() {
          $("#right-header").children("h1").text("Select a Court on the Left to View Details");
        }, 550);
        rightPanelOpen = true;
      } else {
        document.documentElement.style.setProperty('--left-width', "100%");
        document.documentElement.style.setProperty('--right-width', "0%");
        $('#right-panel-button').css("right", "Calc(Var(--outer-border) - 1px)");
        $("#right-header").children("h1").text("");
        setTimeout(function() {
          document.documentElement.style.setProperty('--inner-border', "Calc(Var(--outer-border))");
        }, 500);
        $('#right-panel-button').children("#right-panel-button-text").text("←");
        rightPanelOpen = false;
      }
    }

    // Open right panel
    function openRightPanel() {
      document.documentElement.style.setProperty('--inner-border', "Calc(Var(--outer-border) / 2)");
      document.documentElement.style.setProperty('--left-width', "55%");
      document.documentElement.style.setProperty('--right-width', "45%");
      $('#right-panel-button').css("right", "Calc(45% - Calc(Var(--outer-border) * 3) - Var(--inner-border))");
      $('#right-panel-button').children("#right-panel-button-text").text("→");
      rightPanelOpen = true;
    }

    // Open/close right panel on toggle click
    $('#right-panel-button').click(function() {
      toggleRightPanel();
      $('*').removeClass('active-court');
    });

    // Open right panel on court click
    $('.court').click(function() {
      // Handle styling for court diagram
      $('.court').removeClass('active-court');
      $(this).addClass('active-court');
      $(this).removeClass('active-hover');
      // Ensure right panel is open, with correct data
      openRightPanel();
      populateRightPanel(this.id.replace('-', ' '));
    });

    // Handle hovering over districts on map
    $(document).on('mouseenter','.district', function (event) {
      // Do nothing if map inactive
      if (mapOpen == false) { return; }
      // Save tag name
      let tag = $(this).get(0).tagName;
      // Do nothing if hovering over territory label
      if (tag == 'text') { return; }
      // Grey out other districts
      $('.district').addClass('inactive-hover');
      $('.judges-thumbnail').addClass('inactive-hover');
      $('.court-label').addClass('inactive-hover');
      // Clone if district path to preserve boundary highlight
      if (tag == 'path') {
        // Add copy of district on top of svg and highlight
        var temp = $(this).clone().appendTo($(this).parent()).removeClass('inactive-hover').addClass('active-hover');
      }
      else if (tag == 'rect') {
        // Highlight district boundary and text
        $('#'+String($( this ).attr('id'))).removeClass('inactive-hover').addClass('active-hover');
        $('text#'+String($( this ).attr('id'))).removeClass('inactive-hover');
      }
      // Highlight corresponding courts
      $('.'+String($( this ).attr('id'))).addClass('active-hover');
      $('.'+String($( this ).attr('id'))+' .judges-thumbnail').removeClass('inactive-hover');
      $('.'+String($( this ).attr('id'))).siblings().removeClass('inactive-hover');
      $('.active-court .judges-thumbnail').removeClass('inactive-hover');
      return;
    }).on('mouseleave','.district',  function() {
      // Do nothing if map inactive
      if (mapOpen == false) { return; }
      // Remove grey from courts
      $('.judges-thumbnail').removeClass('inactive-hover');
      $('.court-label').removeClass('inactive-hover');
      // Save tag name
      let tag = $(this).get(0).tagName;
      // Do nothing if hovering over territory label
      if (tag == 'text') { return; }
      // Remove active and inactive classes from all districts
      $('.district').removeClass('active-hover').removeClass('inactive-hover');
      // Remove active class from all courts
      $('.court').removeClass('active-hover');
      // Remove original district from bottom of svg
      if (tag == 'path') {
        $( this ).remove();
        return;
      }
    });


    $(document).on('mouseenter','.court', function (event) {
      var classes = $( this ).attr('class').replace('court ', '').split(' ');
      $('.'+String($( this ).attr('id'))).addClass('active-hover');
    }).on('mouseleave','.court',  function(){
      $('.'+String($( this ).attr('id'))).removeClass('active-hover');
    });

    $('#about-button').click(function() {
      setTimeout(function(){ $('#preview-screen').css('opacity', '1'); }, 100);
      setTimeout(function(){ $('#preview-screen').css('pointer-events', 'all'); }, 200);
    });
    $('#map-button').click(function() {
      if (!$(this).is(':checked')) {
        mapOpen = false;
        $('#map-vis').css('pointer-events', 'none');
        $('#map-vis').addClass('hidden');
      } else {
        mapOpen = true;
        $('#map-vis').css('pointer-events', 'all');
        $('#map-vis').removeClass('hidden');
      }
    });
    $('#judge-party-button').click(function() {
      if ($(this).is(':checked')) {
        $('circle').removeClass('nodeDefault');
      } else {
        $('circle').addClass('nodeDefault');
      }
    });
    $('#judge-president-button').click(function() {
      if ($(this).is(':checked')) {
        $('.pres-option').removeClass('hidden');
      } else {
        $('.pres-option').addClass('hidden');
      }
    });

    $('#judge-button').click(function() {
      if ($(this).is(':checked')) {
        toggleAllJudges = true;
        $(this).parent().attr('class')
        populateRightPanel($('.active-court').attr('id').replace('-', ' '));
      } else {
        toggleAllJudges = false;
        populateRightPanel($('.active-court').attr('id').replace('-', ' '));
      }
    });

    $('#close-preview-screen').click(function() {
      setTimeout(function(){ $('#preview-screen').css('opacity', '0'); }, 100);
      setTimeout(function(){ $('#preview-screen').css('pointer-events', 'none'); }, 200);
    });
}
