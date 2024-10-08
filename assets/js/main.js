/**
 * Template Name: Append
 * Template URL: https://bootstrapmade.com/append-bootstrap-website-template/
 * Updated: Jun 02 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      if (document.querySelector(".mobile-nav-active")) {
        e.preventDefault();
        this.parentNode.classList.toggle("active");
        this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".swiper").forEach(function (swiper) {
      let config = JSON.parse(
        swiper.querySelector(".swiper-config").innerHTML.trim()
      );
      new Swiper(swiper, config);
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwtiPIGYw997dIcdwGyfWKz-Z8HIwtMBAm06lyMGb368YstJl57G-ZGURy5tzQtzRqo/exec";

  // Get the popup container
  const popupContainer = document.querySelector(".popup-con");

  // Check if the popup has already been shown
  const popupShown = sessionStorage.getItem("popupShown");

  if (!popupShown) {
    // Show the popup if it hasn't been shown yet
    popupContainer.style.display = "flex";

    // Mark the popup as shown by setting an item in sessionStorage
    sessionStorage.setItem("popupShown", "true");
  } else {
    // Hide the popup if it has been shown before
    popupContainer.style.display = "none";
  }

  const form = document.forms["contact-form"];
  const responseMessage = document.getElementById("responseMessage");
  const loaderDiv = document.getElementById("loaderDiv");
  const toggle_btn = document.getElementById("toggle-btn");
  // const popupContainer = document.querySelector('.popup-con');

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    loaderDiv.style.display = "flex";
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => response.json())
      .then((response) => {
        loaderDiv.style.display = "none";
        responseMessage.innerText =
          "Thank you for your submission! We will be in touch soon.";
        responseMessage.style.visibility = "visible";
        responseMessage.style.opacity = "1";
        toggle_btn.style.display = "inline-block";
        popupContainer.style.display = "none";
        // Trigger AOS animations after the element is made visible
        AOS.refresh();

        form.reset();
        setTimeout(() => {
          responseMessage.style.visibility = "hidden";
          responseMessage.style.opacity = "0";
        }, 5000);
      })
      .catch((error) => {
        loaderDiv.style.display = "none";
        responseMessage.innerText =
          "There was an error submitting the form. Please try again.";
        responseMessage.style.visibility = "visible";
        responseMessage.style.opacity = "1";
        responseMessage.style.backgroundColor = "#f8d7da";
        responseMessage.style.color = "#721c24";
        responseMessage.style.borderColor = "#f5c6cb";

        AOS.refresh();

        console.error("Error!", error.message);
      });
  });

  window.addEventListener("load", () => {
    // Select the 'x' button
    const closeButton = document.querySelector(".popup-form-x");

    // After 15 seconds, display the 'x' button
    setTimeout(() => {
      closeButton.style.display = "block"; // Show the 'x' button
    }, 10000); // 15000 milliseconds = 15 seconds

    // Event listener to close the popup when 'x' button is clicked
    const popupContainer = document.querySelector(".popup-con");
    closeButton.addEventListener("click", () => {
      popupContainer.style.display = "none";
      toggle_btn.style.display = "inline-block";
    });
  });

  $(document).ready(function () {
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplaySpeed: 1000,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
  });
})();
