/*====================================================================
Template Name: Crikho - Admin Template
Author: dreamzontheme
Contact: codnictheme@gmail.com
====================================================================*/

(function(){

  //*** Sidebar Menu ***//
  var menuUrl = window.location.pathname.split('/');
  var menuItems = document.querySelectorAll(".menu-list li a");
  menuItems.forEach(function (menuItem){
    if (menuItem.getAttribute("href")){
      if (menuUrl[menuUrl.length - 1] === menuItem.getAttribute("href")) {
        menuItem.classList.add("active");
        menuItem.parentElement.classList.add("active");
        menuItem.parentElement.parentElement.parentElement.classList.add("active");
      }
    }
  });

  //*** Back To Top ***// 
  const scrollTopactionbutton = document.querySelector(".scroll-top");
  scrollTopactionbutton.addEventListener("click", scrolltopmode);
  function scrolltopmode() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  window.onscroll = function() {scrollFunction()};
  function scrollFunction() {
    if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
      scrollTopactionbutton.classList.add("show");
    } else {
      scrollTopactionbutton.classList.remove("show");
    }
  }
  
})();