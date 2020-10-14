
var btn = $('.btn11');

btn.on('click', function() {
$(this).toggleClass('active');
$(this).toggleClass('not-active');
});

$(document).ready(function() {
$('.box').on('click', function() {
$(this).toggleClass('active');
$('.top-nav').toggleClass('open');
});

$('.top-nav .nav-link').on('click', function() {
$('.btn11').toggleClass('not-active');
$('.top-nav').toggleClass('open');
});

$('nav a[href*="#"]').on('click', function() {
$('html, body').animate({
    scrollTop: $($(this).attr('href')).offset().top - 100
}, 2000);
});

$('#up').on('click', function() {
$('html, body').animate({
    scrollTop:0
}, 2000);
});
});


//Progress Bar
$(function(){
    var $ppc = $('.progress-pie-chart'),
      percent = parseInt($ppc.data('percent')),
      deg = 360*percent/100;
    if (percent > 50) {
      $ppc.addClass('gt-50');
    }
    $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
    $('.ppc-percents span').html(percent+'%');
  });

//Timeline
//Sample dates
var dates = ["6/12/2020", "8/15/2021", "10/22/2021", "11/2/2021", "12/22/2021"];
//For the purpose of stringifying MM/DD/YYYY date format
var monthSpan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Format MM/DD/YYYY into string
function dateSpan(date) {
  var month = date.split('/')[0];
  month = monthSpan[month - 1];
  var day = date.split('/')[1];
  if (day.charAt(0) == '0') {
    day = day.charAt(1);
  }
  var year = date.split('/')[2];

  //Spit it out!
  return month + " " + day + ", " + year;
}

//Main function. Draw your circles.
function makeCircles() {
  //Forget the timeline if there's only one date. Who needs it!?
  if (dates.length < 2) {
    $("#line").hide();
    $("#span").show().text(dateSpan(dates[0]));
    //This is what you really want.
  } else if (dates.length >= 2) {
    //Set day, month and year variables for the math
    var first = dates[0];
    var last = dates[dates.length - 1];

    var firstMonth = parseInt(first.split('/')[0]);
    var firstDay = parseInt(first.split('/')[1]);

    var lastMonth = parseInt(last.split('/')[0]);
    var lastDay = parseInt(last.split('/')[1]);

    //Integer representation of the last day. The first day is represnted as 0
    var lastInt = ((lastMonth - firstMonth) * 30) + (lastDay - firstDay);

    //Draw first date circle
    $("#line").append('<div class="circle" id="circle0" style="left: ' + 0 + '%;"><div class="popupSpan">' + dateSpan(dates[0]) + '</div></div>');
    
    $("#mainCont").append('<span id="span0" class="center">' + dateSpan(dates[0]) + '</span>');

    //Loop through middle dates
    for (i = 1; i < dates.length - 1; i++) {
      var thisMonth = parseInt(dates[i].split('/')[0]);
      var thisDay = parseInt(dates[i].split('/')[1]);

      //Integer representation of the date
      var thisInt = ((thisMonth - firstMonth) * 30) + (thisDay - firstDay);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + dateSpan(dates[i]) + '</div></div>');
      
      $("#mainCont").append('<span id="span' + i + '" class="right">' + dateSpan(dates[i]) + '</span>');
    }

    //Draw the last date circle
    $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + dateSpan(dates[dates.length - 1]) + '</div></div>'); 
    
    $("#mainCont").append('<span id="span' + i + '" class="right">' + dateSpan(dates[i]) + '</span>');
  }

  $(".circle:first").addClass("active");
}

makeCircles();

$(".circle").mouseenter(function() {
  $(this).addClass("hover");
});

$(".circle").mouseleave(function() {
  $(this).removeClass("hover");
});

$(".circle").click(function() {
  var spanNum = $(this).attr("id");
  selectDate(spanNum);
});

function selectDate(selector) {
  $selector = "#" + selector;
  $spanSelector = $selector.replace("circle", "span");
  var current = $selector.replace("circle", "");
  
  $(".active").removeClass("active");
  $($selector).addClass("active");
  
  if ($($spanSelector).hasClass("right")) {
    $(".center").removeClass("center").addClass("left")
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("right")
  } else if ($($spanSelector).hasClass("left")) {
    $(".center").removeClass("center").addClass("right");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("left");
  }; 
};

console.log()




//Carousel

const repeat = false;
const noArrows = false;
const noBullets = false;


const container = document.querySelector('.slider-container');
var slide = document.querySelectorAll('.slider-single');
var slideTotal = slide.length - 1;
var slideCurrent = -1;

function initBullets() {
    if (noBullets) {
        return;
    }
    const bulletContainer = document.createElement('div');
    bulletContainer.classList.add('bullet-container')
    slide.forEach((elem, i) => {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet')
        bullet.id = `bullet-index-${i}`
        bullet.addEventListener('click', () => {
            goToIndexSlide(i);
        })
        bulletContainer.appendChild(bullet);
        elem.classList.add('proactivede');
    })
    container.appendChild(bulletContainer);
}

function initArrows() {
    if (noArrows) {
        return;
    }
    const leftArrow = document.createElement('a')
    const iLeft = document.createElement('i');
    iLeft.classList.add('fa')
    iLeft.classList.add('fa-arrow-left')
    leftArrow.classList.add('slider-left')
    leftArrow.appendChild(iLeft)
    leftArrow.addEventListener('click', () => {
        slideLeft();
    })
    const rightArrow = document.createElement('a')
    const iRight = document.createElement('i');
    iRight.classList.add('fa')
    iRight.classList.add('fa-arrow-right')
    rightArrow.classList.add('slider-right')
    rightArrow.appendChild(iRight)
    rightArrow.addEventListener('click', () => {
        slideRight();
    })
    container.appendChild(leftArrow);
    container.appendChild(rightArrow);
}

function slideInitial() {
    initBullets();
    initArrows();
    setTimeout(function () {
        slideRight();
    }, 500);
}

function updateBullet() {
    if (!noBullets) {
        document.querySelector('.bullet-container').querySelectorAll('.bullet').forEach((elem, i) => {
            elem.classList.remove('active');
            if (i === slideCurrent) {
                elem.classList.add('active');
            }
        })
    }
    checkRepeat();
}

function checkRepeat() {
    if (!repeat) {
        if (slideCurrent === slide.length - 1) {
            slide[0].classList.add('not-visible');
            slide[slide.length - 1].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.slider-right').classList.add('not-visible')
                document.querySelector('.slider-left').classList.remove('not-visible')
            }
        }
        else if (slideCurrent === 0) {
            slide[slide.length - 1].classList.add('not-visible');
            slide[0].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.slider-left').classList.add('not-visible')
                document.querySelector('.slider-right').classList.remove('not-visible')
            }
        } else {
            slide[slide.length - 1].classList.remove('not-visible');
            slide[0].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.slider-left').classList.remove('not-visible')
                document.querySelector('.slider-right').classList.remove('not-visible')
            }
        }
    }
}

function slideRight() {
    if (slideCurrent < slideTotal) {
        slideCurrent++;
    } else {
        slideCurrent = 0;
    }

    if (slideCurrent > 0) {
        var preactiveSlide = slide[slideCurrent - 1];
    } else {
        var preactiveSlide = slide[slideTotal];
    }
    var activeSlide = slide[slideCurrent];
    if (slideCurrent < slideTotal) {
        var proactiveSlide = slide[slideCurrent + 1];
    } else {
        var proactiveSlide = slide[0];

    }

    slide.forEach((elem) => {
        var thisSlide = elem;
        if (thisSlide.classList.contains('preactivede')) {
            thisSlide.classList.remove('preactivede');
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.add('proactivede');
        }
        if (thisSlide.classList.contains('preactive')) {
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.remove('proactivede');
            thisSlide.classList.add('preactivede');
        }
    });
    preactiveSlide.classList.remove('preactivede');
    preactiveSlide.classList.remove('active');
    preactiveSlide.classList.remove('proactive');
    preactiveSlide.classList.remove('proactivede');
    preactiveSlide.classList.add('preactive');

    activeSlide.classList.remove('preactivede');
    activeSlide.classList.remove('preactive');
    activeSlide.classList.remove('proactive');
    activeSlide.classList.remove('proactivede');
    activeSlide.classList.add('active');

    proactiveSlide.classList.remove('preactivede');
    proactiveSlide.classList.remove('preactive');
    proactiveSlide.classList.remove('active');
    proactiveSlide.classList.remove('proactivede');
    proactiveSlide.classList.add('proactive');

    updateBullet();
}

function slideLeft() {
    if (slideCurrent > 0) {
        slideCurrent--;
    } else {
        slideCurrent = slideTotal;
    }

    if (slideCurrent < slideTotal) {
        var proactiveSlide = slide[slideCurrent + 1];
    } else {
        var proactiveSlide = slide[0];
    }
    var activeSlide = slide[slideCurrent];
    if (slideCurrent > 0) {
        var preactiveSlide = slide[slideCurrent - 1];
    } else {
        var preactiveSlide = slide[slideTotal];
    }
    slide.forEach((elem) => {
        var thisSlide = elem;
        if (thisSlide.classList.contains('proactive')) {
            thisSlide.classList.remove('preactivede');
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.add('proactivede');
        }
        if (thisSlide.classList.contains('proactivede')) {
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.remove('proactivede');
            thisSlide.classList.add('preactivede');
        }
    });

    preactiveSlide.classList.remove('preactivede');
    preactiveSlide.classList.remove('active');
    preactiveSlide.classList.remove('proactive');
    preactiveSlide.classList.remove('proactivede');
    preactiveSlide.classList.add('preactive');

    activeSlide.classList.remove('preactivede');
    activeSlide.classList.remove('preactive');
    activeSlide.classList.remove('proactive');
    activeSlide.classList.remove('proactivede');
    activeSlide.classList.add('active');

    proactiveSlide.classList.remove('preactivede');
    proactiveSlide.classList.remove('preactive');
    proactiveSlide.classList.remove('active');
    proactiveSlide.classList.remove('proactivede');
    proactiveSlide.classList.add('proactive');

    updateBullet();
}

function goToIndexSlide(index) {
    const sliding = (slideCurrent > index) ? () => slideRight() : () => slideLeft();
    while (slideCurrent !== index) {
        sliding();
    }
}

slideInitial();