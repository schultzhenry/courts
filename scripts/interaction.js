// HANDLE INTERACTION WITH MAP AND COURT VIS ELEMENTS

function toggleVisibility(t,b) {
  setTimeout(function() {
    if (b) { $(t).show();
    } else { $(t).hide(); }
  }, 150);
}

function bindInteraction() {

    // Detail, map hidden on default
    var detailPanelOpen = false;
    var mapOpen = false;
    var activeCourt = '';
    var presidentIdList = '#Donald-J-Trump, #Barack-Obama, #George-W-Bush, #William-J-Clinton, #George-HW-Bush, #Ronald-Reagan';

    // Open detail panel on court click
    $('.court').click(function() {
      activeCourt = f2(this.id);
      populateRightPanel(activeCourt);
      toggleVisibility('#detail-panel', true);
    });

    // Handle hovering over districts on map
    $(document).on('mouseenter','.district', function (event) {

      // Do nothing if map inactive
      if (!mapOpen) { return; }

      // Save tag name
      let tag = $(this).get(0).tagName;

      // Do nothing if hovering over territory label
      if (tag === 'text') { return; }

      // Grey out other districts
      $('.district').addClass('inactive-hover');
      $('.judges-thumbnail').addClass('inactive-hover');
      $('.court-label').addClass('inactive-hover');

      // Clone if district path to preserve boundary highlight
      if (tag == 'path') {
        var temp = $(this).clone().appendTo($(this).parent()).removeClass('inactive-hover').addClass('active-hover');
      } else if (tag == 'rect') {
        // Highlight district boundary and text
        $('#'+String($(this).attr('id'))).removeClass('inactive-hover').addClass('active-hover');
        $('text#'+String($(this).attr('id'))).removeClass('inactive-hover');
      }

      // Highlight corresponding courts
      $('.'+String($( this ).attr('id'))).addClass('active-hover');
      $('.'+String($( this ).attr('id'))+' .judges-thumbnail').removeClass('inactive-hover');
      $('.'+String($( this ).attr('id'))).siblings().removeClass('inactive-hover');
      $('.active-court .judges-thumbnail').removeClass('inactive-hover');
      return;

    }).on('mouseleave','.district',  function() {

      // Do nothing if map inactive
      if (!mapOpen) { return; }

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

    $('#about-button').click(function() {
      setTimeout(function(){ $('#preview-screen').css('opacity', '1'); }, 100);
      setTimeout(function(){ $('#preview-screen').css('pointer-events', 'all'); }, 200);
    });

    $('#map-button').click(function() {
      if (!$(this).is(':checked')) {
        mapOpen = false;
        $('#map-vis').css('pointer-events', 'none');
        $('#map-vis').hide();
      } else {
        mapOpen = true;
        $('#map-vis').css('pointer-events', 'all');
        $('#map-vis').show();
      }
    });
    $('#judge-party-button').click(function() {
      if ($(this).is(':checked')) {
        $('#Donald-J-Trump').prop("checked", false);
        $('.Donald-J-Trump').css('fill', '');
        $('#Barack-Obama').prop("checked", false).css('fill', '');
        $('.Barack-Obama').css('fill', '');
        $('#George-W-Bush').prop("checked", false).css('fill', '');
        $('.George-W-Bush').css('fill', '');
        $('#William-J-Clinton').prop("checked", false).css('fill', '');
        $('.William-J-Clinton').css('fill', '');
        $('#George-HW-Bush').prop("checked", false).css('fill', '');
        $('.George-HW-Bush').css('fill', '');
        $('#Ronald-Reagan').prop("checked", false).css('fill', '');
        $('.Ronald-Reagan').css('fill', '');
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
        $(this).parent().attr('class');
        populateRightPanel(activeCourt);
      } else {
        toggleAllJudges = false;
        populateRightPanel(activeCourt);
      }
    });

    function updatePresidentSelection() {
      $('#judge-party-button').prop('checked', false);
      $('circle').css('fill', 'gainsboro');
      $('.Vacant').css('fill', 'none').css('stroke', 'grey');
      setTimeout(function() {
        if ($('#Donald-J-Trump').is(':checked'))    { $('.Donald-J-Trump').removeClass('nodeDefault').css('fill', 'orangered'); }
        if ($('#Barack-Obama').is(':checked'))      { $('.Barack-Obama').removeClass('nodeDefault').css('fill', 'deepskyblue'); }
        if ($('#George-W-Bush').is(':checked'))     { $('.George-W-Bush').removeClass('nodeDefault').css('fill', 'orchid'); }
        if ($('#William-J-Clinton').is(':checked')) { $('.William-J-Clinton').removeClass('nodeDefault').css('fill', 'mediumblue'); }
        if ($('#George-HW-Bush').is(':checked'))    { $('.George-HW-Bush').removeClass('nodeDefault').css('fill', 'maroon'); }
        if ($('#Ronald-Reagan').is(':checked'))     { $('.Ronald-Reagan').removeClass('nodeDefault').css('fill', 'red'); }
      }, 100);
    }

    $(presidentIdList).click(function() {
      $('#All').prop('checked', false);
      updatePresidentSelection();
    });

    $('#All').click(function() {
      if ($(this).is(':checked')) {
        $(presidentIdList).prop('checked', true);
        updatePresidentSelection();
      } else {
        $(presidentIdList).prop('checked', false);
        updatePresidentSelection();
        $('circle').addClass('nodeDefault').css('fill', '');
      }
    });

    $('#close-preview-screen').click(function() {
      setTimeout(function(){ $('#preview-screen').css('opacity', '0'); }, 100);
      setTimeout(function(){ $('#preview-screen').css('pointer-events', 'none'); }, 200);
    });

    $('#detail-x').click(function() {
      toggleVisibility('#detail-panel', false);
    });
}
