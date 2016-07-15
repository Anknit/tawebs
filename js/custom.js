/* -- Full Screen Viewport Container
   ---------------------------- */
 var jq = jQuery.noConflict();
jq(window).load(function(){
    jq('.preloader').fadeOut(1000); // set duration in brackets
    init();
});

jq(document).ready(function() {
  fullScreenContainer();
  owlCarousel();
  magnificPopup();
});



/* --- initialize functions on window load here -------------- */

function init() {
  overlay();
  tooltips();
  onePageScroll();
  scrollAnchor();
}



/* --- Full Screen Container ------------- */

function fullScreenContainer() {
  "use strict";

  // Set Initial Screen Dimensions

  var screenWidth = jq(window).width() + "px";
  var screenHeight = jq(window).height() + "px";

  jq(".intro, .intro .item").css({
    width: screenWidth,
    height: screenHeight
  });

  // Every time the window is resized...

  jq(window).resize( function () {

    // Fetch Screen Dimensions

    var screenWidth = jq(window).width() + "px";
    var screenHeight = jq(window).height() + "px";
      
    // Set Slides to new Screen Dimensions
    
    jq(".intro, .intro .item").css({
      width: screenWidth,
      height: screenHeight
    }); 
      
  });

}



/* --- owlCarousel ------------- */

function owlCarousel() {
  "use strict";

    jq(".carousel-items").owlCarousel({
      lazyLoad : true,
      items: 3,
      theme: "owl-theme-main"
    }); 
  
    jq(".intro.owl-carousel").owlCarousel({
      lazyLoad: true,
      lazyEffect: "fade",
      singleItem: true,
      navigation: true,
      navigationText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
      
	  autoPlay: 3000,
      pagination: false,
      transitionStyle: "fade",
      theme: "owl-theme-featured"
      
    }); 
}



/* --- Tooltips ------------------- */

function tooltips() {
  "use strict";

  jq('.tooltips').tooltip(); 
}



/* --- scrollReveal ------------------- */

window.scrollReveal = new scrollReveal();
  


/* --- magnific popup ------------------- */

function magnificPopup() {
  "use strict";

  // Gallery
  jq('.popup-gallery').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-fade',
    disableOn: 700,
    removalDelay: 160,
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    },
    callbacks: {
      close: function() {
        jq('.portfolio-item figure figcaption').removeClass('active');
        jq('.portfolio-item figure .info').removeClass('active');
      }
    }
  });

  jq('.portfolio-item figcaption a.preview').click(function(){
    jq(this).parent().addClass('active');
    jq(this).parent().siblings('.info').addClass('active');
  });

  // Zoom Gallery

  jq('.zoom-modal').magnificPopup({
    type: 'image',
    mainClass: 'mfp-with-zoom', // this class is for CSS animation below

    zoom: {
      enabled: true, // By default it's false, so don't forget to enable it

      duration: 300, // duration of the effect, in milliseconds
      easing: 'ease-in-out', // CSS transition easing function 

      // The "opener" function should return the element from which popup will be zoomed in
      // and to which popup will be scaled down
      // By defailt it looks for an image tag:
      opener: function(openerElement) {
        // openerElement is the element on which popup was initialized, in this case its <a> tag
        // you don't need to add "opener" option if this code matches your needs, it's defailt one.
        return openerElement.is('i') ? openerElement : openerElement.find('i');
      }
    }

  });

  jq('.popup-modal').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,
    
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });
}



/* --- Isotope ------------------- */

function isotope() {
  "use strict";

   var jqcontainer = jq('.grid');

   // init
   jqcontainer.imagesLoaded( function(){
     jqcontainer.isotope({
       // options
       itemSelector: '.portfolio-item',
       layoutMode: 'fitRows'
     });
   });

   // filter items on button click
   jq('.filters').on( 'click', 'button', function( event ) {
     var filterValue = jq(this).attr('data-filter-value');
     jqcontainer.isotope({ filter: filterValue });
     jq('.filters button').removeClass('active');
     jq(this).addClass('active');
   });

}


/* --- Scroll to Anchor ------------------- */

function scrollAnchor() {
  "use strict";

  // scroll to specific anchor
  jq('.scroll').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = jq(this.hash);
      target = target.length ? target : jq('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        jq('html,body').animate({
          scrollTop: target.offset().top
        }, 650);
        return false;
      }
    }
  });
  
}


/* --- Modal overlay (used for contact form) ------------------- */

function overlay() {
  "use strict";

  var container = document.querySelector( 'div.container' ),
    triggerBttn = document.getElementById( 'trigger-overlay' ),
    overlay = document.querySelector( 'div.overlay' ),
    closeBttn = overlay.querySelector( 'button.overlay-close' );
    var transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };

  function toggleOverlay() {
    if( classie.has( overlay, 'open' ) ) {
      classie.remove( overlay, 'open' );
      classie.remove( container, 'overlay-open' );
      classie.add( overlay, 'close-me' );
      var onEndTransitionFn = function( ev ) {
        if( support.transitions ) {
          if( ev.propertyName !== 'visibility' ) return;
          this.removeEventListener( transEndEventName, onEndTransitionFn );
        }
        classie.remove( overlay, 'close-me' );
      };
      if( support.transitions ) {
        overlay.addEventListener( transEndEventName, onEndTransitionFn );
      }
      else {
        onEndTransitionFn();
      }
    }
    else if( !classie.has( overlay, 'close-me' ) ) {
      classie.add( overlay, 'open' );
      classie.add( container, 'overlay-open' );
    }
  }

  triggerBttn.addEventListener( 'click', toggleOverlay );
  closeBttn.addEventListener( 'click', toggleOverlay );
}


/* --- One Page Scroll ------------------- */

function onePageScroll() {
  "use strict";

  jq('.nav').onePageNav({
      currentClass: 'current',
      changeHash: false,
      scrollSpeed: 650,
      scrollOffset: 30,
      scrollThreshold: 0.5,
      filter: ':not(.login, .signup)',
      easing: 'swing',
      begin: function() {
          //I get fired when the animation is starting
      },
      end: function() {
          //I get fired when the animation is ending
      },
      scrollChange: function(jqcurrentListItem) {
          //I get fired when you enter a section and I pass the list item of the section
      }
  });
}


jq(window).scroll(function() {
  "use strict";

  var windowpos = jq(window).scrollTop() ;

  if (windowpos <= 500) {
      jq('.nav li.current').removeClass('current');
  }
});



//Placeholder fixed for Internet Explorer
jq(function() {
  "use strict";

  var input = document.createElement("input");
  if(('placeholder' in input)==false) { 
    jq('[placeholder]').focus(function() {
      var i = jq(this);
      if(i.val() == i.attr('placeholder')) {
        i.val('').removeClass('placeholder');
        if(i.hasClass('password')) {
          i.removeClass('password');
          this.type='password';
        }     
      }
    }).blur(function() {
      var i = jq(this);  
      if(i.val() == '' || i.val() == i.attr('placeholder')) {
        if(this.type=='password') {
          i.addClass('password');
          this.type='text';
        }
        i.addClass('placeholder').val(i.attr('placeholder'));
      }
    }).blur().parents('form').submit(function() {
      jq(this).find('[placeholder]').each(function() {
        var i = jq(this);
        if(i.val() == i.attr('placeholder'))
          i.val('');
      })
    });
  }
  });



/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs 
  */
jq(function() {
  "use strict";

 jq("input,textarea").jqBootstrapValidation(
    {
     preventSubmit: true,
     submitError: function(jqform, event, errors) {
      // something to have when submit produces an error ?
      // Not decided if I need it yet
     },
     submitSuccess: function(jqform, event) {
      event.preventDefault(); // prevent default submit behaviour
       // get values from FORM
       var name = jq("input#name").val();  
       var email = jq("input#email").val(); 
       var message = jq("textarea#message").val();
        var firstName = name; // For Success/Failure Message
           // Check for white space in name for Success/Fail message
        if (firstName.indexOf(' ') >= 0) {
     firstName = name.split(' ').slice(0, -1).join(' ');
         }        
   jq.ajax({
                url: "contact_me.php",
              type: "POST",
              data: {name: name, email: email, message: message},
              cache: false,
              success: function() {  
              // Success message
                 jq('#success').html("<div class='alert alert-success'>");
                 jq('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append( "</button>");
                jq('#success > .alert-success')
                .append("<strong>Your message has been sent. </strong>");
      jq('#success > .alert-success')
      .append('</div>');
                
      //clear all fields
      jq('.contactForm').trigger("reset");
        },
     error: function() {    
    // Fail message
     jq('#success').html("<div class='alert alert-danger'>");
              jq('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
               .append( "</button>");
              jq('#success > .alert-danger').append("<strong>Sorry "+firstName+" it seems that my mail server is not responding...</strong> Could you please email me directly to <a href='mailto:me@example.com?Subject=Message_Me from myprogrammingblog.com;>me@example.com</a> ? Sorry for the inconvenience!");
          jq('#success > .alert-danger').append('</div>');
    //clear all fields
    jq('.contactForm').trigger("reset");
      },
           })
         },
         filter: function() {
                   return jq(this).is(":visible");
         },
       });

      jq("a[data-toggle=\"tab\"]").click(function(e) {
                    e.preventDefault();
                    jq(this).tab("show");
        });
  });