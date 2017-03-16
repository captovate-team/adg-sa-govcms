/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
// (function ($, Drupal, window, document, undefined) {

(function ($, Drupal, window, document, undefined) {


// To understand behaviors, see https://drupal.org/node/756722#behaviors
Drupal.behaviors.my_custom_behavior = {
  attach: function(context, settings) {

    /*
      ____                  _____  U _____ u      _   _       _      __  __  U _____ u
     / __"| u      ___     |_ " _| \| ___"|/     | \ |"|  U  /"\  uU|' \/ '|u\| ___"|/
    <\___ \/      |_"_|      | |    |  _|"      <|  \| |>  \/ _ \/ \| |\/| |/ |  _|"
     u___) |       | |      /| |\   | |___      U| |\  |u  / ___ \  | |  | |  | |___
     |____/>>    U/| |\u   u |_|U   |_____|      |_| \_|  /_/   \_\ |_|  |_|  |_____|
      )(  (__).-,_|___|_,-._// \\_  <<   >>      ||   \\,-.\\    >><<,-,,-.   <<   >>
     (__)      \_)-' '-(_/(__) (__)(__) (__)     (_")  (_/(__)  (__)(./  \.) (__) (__)
    */
	//Hide the "Attorney-General's Department" blue bar when user scrolls the page
	$(window).scroll(function() {

	    if ($(this).scrollTop()>0)
	     {
	        $('.site-name').fadeOut();
	     }
	    else
	     {
	      $('.site-name').fadeIn();
	     }
 	});

 	/*
      _        ____    ____   U  ___ u   ____     ____            U  ___ u  _   _    ____
  U  /"\  u U /"___|U /"___|   \/"_ \/U |  _"\ u |  _"\    ___     \/"_ \/ | \ |"|  / __"| u
   \/ _ \/  \| | u  \| | u     | | | | \| |_) |//| | | |  |_"_|    | | | |<|  \| |><\___ \/
   / ___ \   | |/__  | |/__.-,_| |_| |  |  _ <  U| |_| |\  | | .-,_| |_| |U| |\  |u u___) |
  /_/   \_\   \____|  \____|\_)-\___/   |_| \_\  |____/ uU/| |\u\_)-\___/  |_| \_|  |____/>>
   \\    >>  _// \\  _// \\      \\     //   \\_  |||_.-,_|___|_,-.  \\    ||   \\,-.)(  (__)
  (__)  (__)(__)(__)(__)(__)    (__)   (__)  (__)(__)_)\_)-' '-(_/  (__)   (_")  (_/(__)
  */
  //Hide content
 	var accordionContainers = $('.accordion-container').hide();

  //add elements and roles for accessibility
  jQuery3('.accordion-button').attr({role: "button", "aria-expanded": "false", });
  jQuery3('.accordion-button').wrap("<div class='accordion-button-wrapper' role='heading' aria-level='3'> </div>");
  jQuery3('.accordion-container').wrap("<div role='region' aria-level='3'> </div>");


  var buttoncounter = 0;
  jQuery3('.accordion-button').each(function() {
    $(this).addClass("accordion-button"+buttoncounter);
    $(this).attr("id", "accordion"+buttoncounter);
    buttoncounter++;
  });
   var containercounter = 0;
  jQuery3('.accordion-container').each(function() {
   
    $(this).addClass("accordion-container"+containercounter);
    $(this).attr("id", "accordioncontainer"+containercounter);
    containercounter++;
  });


  jQuery3('.accordion-button-wrapper').each(function() {
    var accordionID = $(this).next().find(".accordion-container:first").attr('id');
    $(this).find('.accordion-button:first').attr("aria-controls", accordionID);
    var accordionbuttonID = $(this).find('.accordion-button:first').attr("id");
    $(this).next().find(".accordion-container:first").attr("aria-labelledby", accordionbuttonID)
  });


  jQuery3('.accordion-button-wrapper').click(function() {
    // accordionContainers.slideUp();
    // $(this).parent().next().slideDown();
    // return false;
    var accordionClass = $(this).find('.accordion-button:first').attr('class').split(' ').pop();
    var nextContainer = $(this).next().find(".accordion-container:first");
    $(this).find('.accordion-button:first').toggleClass("open");
    if($(this).find('.accordion-button:first').attr("aria-expanded") == "false"){
      $(this).find('.accordion-button:first').attr("aria-expanded", "true")
    }else{
      $(this).find('.accordion-button:first').attr("aria-expanded", "false")
    }
    nextContainer.slideToggle();
  });

  /*
    __  __    U  ___ u   ____               _     U _____ u
  U|' \/ '|u   \/"_ \/U | __")u    ___     |"|    \| ___"|/
  \| |\/| |/   | | | | \|  _ \/   |_"_|  U | | u   |  _|"
   | |  | |.-,_| |_| |  | |_) |    | |    \| |/__  | |___
   |_|  |_| \_)-\___/   |____/   U/| |\u   |_____| |_____|
  <<,-,,-.       \\    _|| \\_.-,_|___|_,-.//  \\  <<   >>
   (./  \.)     (__)  (__) (__)\_)-' '-(_/(_")("_)(__) (__)
  */

  	//hide show ADG tag on mobile menu
  	$('.mobile-menu-button').click(function() {
  		$('.site-name').fadeOut();
  		$(this).toggleClass('open-menu');
	});


  //mmenu mobile menu, see http://mmenu.frebsite.nl
   jQuery3("#mobile-menu").mmenu({
    "slidingSubmenus": false,
    "extensions": [
            "fullscreen"
        ]
      });
     var API = jQuery3("#mobile-menu").data( "mmenu" );

    jQuery3(".mobile-menu-button").click(function() {
        if( !(jQuery3(this).hasClass('open-menu'))){
          API.close();
      }     
      });
    /*
    U _____ u __  __    _____  U _____ u   ____     _   _       _       _            _                  _   _       _  __   ____
    \| ___"|/ \ \/"/   |_ " _| \| ___"|/U |  _"\ u | \ |"|  U  /"\  u  |"|          |"|        ___     | \ |"|     |"|/ /  / __"| u
     |  _|"   /\  /\     | |    |  _|"   \| |_) |/<|  \| |>  \/ _ \/ U | | u      U | | u     |_"_|   <|  \| |>    | ' /  <\___ \/
     | |___  U /  \ u   /| |\   | |___    |  _ <  U| |\  |u  / ___ \  \| |/__      \| |/__     | |    U| |\  |u  U/| . \\u u___) |
     |_____|  /_/\_\   u |_|U   |_____|   |_| \_\  |_| \_|  /_/   \_\  |_____|      |_____|  U/| |\u   |_| \_|     |_|\_\  |____/>>
     <<   >>,-,>> \\_  _// \\_  <<   >>   //   \\_ ||   \\,-.\\    >>  //  \\       //  \\.-,_|___|_,-.||   \\,-.,-,>> \\,-.)(  (__)
    (__) (__)\_)  (__)(__) (__)(__) (__) (__)  (__)(_")  (_/(__)  (__)(_")("_)     (_")("_)\_)-' '-(_/ (_")  (_/  \.)   (_/(__)
    */
  //Add external class to external links
  jQuery3('a').filter(function() {
    return this.hostname && this.hostname !== location.hostname;
  }).addClass("external");



  /*
    ____                 ____  U _____ u      _   _       _    __     __
   / __"| u      ___    |  _"\ \| ___"|/     | \ |"|  U  /"\  u\ \   /"/u
  <\___ \/      |_"_|  /| | | | |  _|"      <|  \| |>  \/ _ \/  \ \ / //
   u___) |       | |   U| |_| |\| |___      U| |\  |u  / ___ \  /\ V /_,-.
   |____/>>    U/| |\u  |____/ u|_____|      |_| \_|  /_/   \_\U  \_/-(_/
    )(  (__).-,_|___|_,-.|||_   <<   >>      ||   \\,-.\\    >>  //
   (__)      \_)-' '-(_/(__)_) (__) (__)     (_")  (_/(__)  (__)(__)
  */
  jQuery3("#block-menu-block-1 .menu-block-1 > ul.menu li").click(
    function($e){
      $e.stopPropagation();
      jQuery3(this).children("ul.menu:first").toggleClass("open");
    }
  );



   }}    
})(jQuery, Drupal, this, this.document);

