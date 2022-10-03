function show() {
  gsap.registerPlugin(ScrollTrigger);


  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}

function cursorMovingAnimation() {

  var moving = document.querySelector("#movingcircle");

  document.body.addEventListener("mousemove", function (dets) {

    moving.style.top = `${dets.pageY}px`;
    moving.style.left = `${dets.pageX}px`;

  })

}

function openClose() {
  var leftslide = document.querySelector("#circle");

  leftslide.addEventListener("click", function () {

    document.querySelector("#leftslide").style.left = '0%';
    document.querySelector("#leftslide").style.zIndex = '999999';


    gsap.from("#leftslidetext>h2", {
      opacity: 0,
      y: '30',
      yoyo: true,
      repeat: 2,
      delay: 0.1,

      onStart: function () {

        $('#leftslidetext>h2').textillate({ in: { effect: 'fadeInUp' } });
      }

    })

  });

  var closeleftslide = document.querySelector("#circle2");

  closeleftslide.addEventListener("click", function () {

    document.querySelector("#leftslide").style.left = '-100%';


  });

}

function ImageMouseAnimation() {
  var elem = document.querySelectorAll(".images");
  elem.forEach(function (element) {

    element.addEventListener("mouseenter", function () {

      element.style.transform = `scale(1.1)`;

    });

  });

  var elem = document.querySelectorAll(".images");
  elem.forEach(function (element) {

    element.addEventListener("mouseout", function () {
      element.style.transform = `scale(1)`;

    });
  });

}

function TextAnimation() {

  var AnimateIt = document.querySelectorAll(".txts");

  for (let i = 0; i < AnimateIt.length; i++) {
    gsap.from(AnimateIt[i], {

      scrollTrigger: {
        trigger: AnimateIt[i],
        scroller: "#main",
        start: "top 80%",

      },
      y: '40',
      autoAlpha: 0,
      stagger: 0.5,

    })

  }

  gsap.from("#left>h2", {
    y: '30',
    yoyo: true,
    repeat: 2,
    delay: 1,

    onStart: function () {

      $('#left>h2').textillate({ in: { effect: 'fadeInUp' } });
    }

  })

}

function ImageAnimation() {

  var images = document.querySelectorAll(".images");

  for (let i = 0; i < images.length; i++) {

    gsap.from(images[i], {

      scrollTrigger: {
        trigger: images[i],
        scroller: "#main",
        start: "top 80%",
        end: "top 30%",
        scrub: .2,

      },
      rotateX: '90deg',
      duration: 3,

    })

  }

}

function loader() {

  gsap.to("#loader", {
    y: '-100%',
    duration: 1,
    delay: 1,

  })
  gsap.from("#loader>h3", {
    y: '40%',

  })


}


function MobileImageAnimation() {

  var images = document.querySelectorAll(".images");

  for (let i = 0; i < images.length; i++) {

    gsap.from(images[i], {

      scrollTrigger: {
        trigger: images[i],
        scroller: "body",
        // markers:true,  

      },
      rotateX: '90deg',
      duration: 2,

    })

  }

}

function MobileTextAnimation() {
  gsap.from("#left>h2", {
    y: '30',
    yoyo: true,
    repeat: 2,
    delay: 1,

    onStart: function () {

      $('#left>h2').textillate({ in: { effect: 'fadeInUp' } });
    }

  })

}

if (window.innerWidth <= 500) {
  // load mobile script
  show();
  loader();
  openClose();
  // MobileImageAnimation();
  // MobileTextAnimation();
  ImageMouseAnimation();  


}
 else { // viewportWidth width > 600
  // load desktop script
  show();
  loader();
  cursorMovingAnimation();
  openClose();
  ImageAnimation();
  TextAnimation();
  ImageMouseAnimation();
}



