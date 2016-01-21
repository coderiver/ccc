var Slider             = require('./modules/press-slider.js');
var Tabs               = require('./modules/tabs.js');
var PhoneSlider        = require('./modules/phone-slider.js');
var TestimonialsSlider = require('./modules/testimonials-slider.js');
var Filter             = require('./modules/filter.js');

$(document).ready(function() {

  var slider          = $('.press-slider');
  var contactTabs     = $('.js-contacts');
  var tabs            = $('.js-tabs');
  var tooltip         = $('.js-tooltip');
  var interfaceSlider = $('.interface-slider');
  var testimonials    = $('.js-testimonials');
  var jobs            = $('.jobs-tiles');
  var breakpoint      = 751;
  var win             = $(window);
  var winWidth        = win.width();

  // press slider on main page
  if (slider.length) {
    slider = new Slider(slider);
  }

  // tabs
  if (tabs.length) {
    tabs.each(function(index, el) {
      new Tabs(el, '.tab__btn', '.tab-content');
    });
  }

  // changing title for tabs
  $('.tab__btn[data-title]').click(function(event) {
    $('.title').text($(this).data('title'));
  });

  //randomize team members
  var ul = document.querySelector('.board');
  if (ul) {
    for (var i = ul.children.length; i >= 0; i--) {
      ul.appendChild(ul.children[Math.random() * i | 0]);
    }
  }

  if (contactTabs.length) {
    contactTabs = new Tabs(contactTabs, '.office', '.tab-content');
  }

  // filtering jobs
  if (jobs.length) {
    jobs = new Filter(jobs, '.office', {
      itemSelector: '.jobs-tiles__item'
    });
  }

  // slider in iphone on main page
  if (interfaceSlider.length && winWidth <= breakpoint) {
    interfaceSlider = new PhoneSlider(interfaceSlider);
  }

  if (testimonials.length && winWidth <= breakpoint) {
    testimonials = new TestimonialsSlider(testimonials);
  }

  win.on('resize', function() {
    winWidth = win.width();

    if (winWidth <= breakpoint) {

      if (interfaceSlider.length && !interfaceSlider.active) {
        interfaceSlider = new PhoneSlider(interfaceSlider);
      }

      if (testimonials.active === false) {
        testimonials.init();
      } else if (testimonials.length) {
        testimonials = new TestimonialsSlider(testimonials);
      }
    } else {

      if (testimonials.active) {
        testimonials.destroy();
      }
    }
  });

  // tooltip
  if (tooltip) {
    tooltip.tooltipster({
      animation: 'fade',
      position: 'bottom',
      speed: 300,
      delay: 300,
      offsetX: 0,
      offsetY: 20,
      maxWidth: 480,
      interactive: true,
      trigger: 'hover',
      functionInit: function() {
        var content = this.find('.member__about');
        return content;
      }
    });
  }
});

$(document).ready(function() {
  $(".icon-help").fancybox({
    fitToView : true,
    maxWidth   : '80%',
    autoHeight    : true,
    autoSize  : true,
    closeClick  : false,
    openEffect  : 'none',
    closeEffect : 'none'
  });
});

$(".input-buy__currency_drop").click(function (event) {
  $(this).toggleClass("is-opendrop");
});

$(".js-sender-block").click(function (event) {
  if ($(this).hasClass("is-tilda").toString()){
    $(this).removeClass("is-tilda");
    $(".js-sender-amount").attr("placeholder", "0.00");
    $(".js-sender-amount").css({"border": "4px solid rgb(30, 190, 187)"});
  }

  $(".js-receiver-block").addClass("is-tilda");
  $(".js-receiver-amount").attr("placeholder", ""); 
  $(".js-receiver-amount").css({"border": "2px solid rgb(30, 190, 187)"});
});

$(".js-receiver-block").click(function (event) {
  if ($(this).hasClass("is-tilda").toString()){
    $(this).removeClass("is-tilda");
    $(".js-receiver-amount").attr("placeholder", "0.00");
    $(".js-receiver-amount").css({"border": "4px solid rgb(30, 190, 187)"});
  }

  $(".js-sender-block").addClass("is-tilda");
  $(".js-sender-amount").attr("placeholder", "");          
  $(".js-sender-amount").css({"border": "2px solid rgb(30, 190, 187)"});
});

$(document).ready(function() {  
  function tabsLoad() {
        var hash = window.location.hash;
        if (hash) {
            $('[href="'+hash+'"]').parents(".js-tabs-group").find(".js-tabs-content").hide();
            $('[data-id="'+hash+'"]').show();
            $('[href="'+hash+'"]').parents(".js-tabs").find("li").removeClass("is-active");
            $('[href="'+hash+'"]').parent().addClass("is-active");
        }
        else {
            $('.js-tabs').each(function(){
              $(this).find('li:first').addClass("is-active");
              $(this).next().show();
            });
            
        }
        
    }
   tabsLoad();
    $('.js-tabs a').on("click",function () {
        var content = $(this).attr("href");
        $(this).parents(".js-tabs").find("li").removeClass("is-active");
        $(this).parent().addClass("is-active");
        $(this).parents(".js-tabs-group").find(".js-tabs-content").hide();
        $('[data-id="'+content+'"]').show();
        window.location.hash = this.hash;
        return false;
    });
});


  $('.lang').click(function(event){
    var _this = $(this);
    _this.children('.lang__drop').toggleClass('is-open-langs');
  });

