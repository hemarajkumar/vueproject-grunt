var carouselList = {"lists":[
{
"Title":"Title 1",
"list":[
{"imagetype":"desktop", "path":"web/webroot/_ui/images/homepageCarousel/image1-desktop.png"},
{"imagetype":"tablet", "path":"web/webroot/_ui/images/homepageCarousel/image1-tablet.png"},
{"imagetype":"mobile", "path":"web/webroot/_ui/images/homepageCarousel/image1-mobile.png"}
]},


{
"Title":"Title 2",
"list":[
{"imagetype":"desktop", "path":"web/webroot/_ui/images/homepageCarousel/image1-desktop.png"},
{"imagetype":"tablet", "path":"web/webroot/_ui/images/homepageCarousel/image1-tablet.png"},
{"imagetype":"mobile", "path":"web/webroot/_ui/images/homepageCarousel/image1-mobile.png"}
]},


{
"Title":"Title 3",
"list":[
{"imagetype":"desktop", "path":"web/webroot/_ui/images/homepageCarousel/image1-desktop.png"},
{"imagetype":"tablet", "path":"web/webroot/_ui/images/homepageCarousel/image1-tablet.png"},
{"imagetype":"mobile", "path":"web/webroot/_ui/images/homepageCarousel/image1-mobile.png"}
]},


{
"Title":"Title 4",
"list":[
{"imagetype":"desktop", "path":"web/webroot/_ui/images/homepageCarousel/image1-desktop.png"},
{"imagetype":"tablet", "path":"web/webroot/_ui/images/homepageCarousel/image1-tablet.png"},
{"imagetype":"mobile", "path":"web/webroot/_ui/images/homepageCarousel/image1-mobile.png"}
]},

{
"Title":"Title 5",
"list":[
{"imagetype":"desktop", "path":"web/webroot/_ui/images/homepageCarousel/image1-desktop.png"},
{"imagetype":"tablet", "path":"web/webroot/_ui/images/homepageCarousel/image1-tablet.png"},
{"imagetype":"mobile", "path":"web/webroot/_ui/images/homepageCarousel/image1-mobile.png"}
]},

{
"Title":"Title 6",
"list":[
{"imagetype":"desktop", "path":"web/webroot/_ui/images/homepageCarousel/image1-desktop.png"},
{"imagetype":"tablet", "path":"web/webroot/_ui/images/homepageCarousel/image1-tablet.png"},
{"imagetype":"mobile", "path":"web/webroot/_ui/images/homepageCarousel/image1-mobile.png"}
]},

{
"Title":"Title 7",
"list":[
{"imagetype":"desktop", "path":"web/webroot/_ui/images/homepageCarousel/image1-desktop.png"},
{"imagetype":"tablet", "path":"web/webroot/_ui/images/homepageCarousel/image1-tablet.png"},
{"imagetype":"mobile", "path":"web/webroot/_ui/images/homepageCarousel/image1-mobile.png"}
]},

{
"Title":"Title 8",
"list":[
{"imagetype":"desktop", "path":"web/webroot/_ui/images/homepageCarousel/image1-desktop.png"},
{"imagetype":"tablet", "path":"web/webroot/_ui/images/homepageCarousel/image1-tablet.png"},
{"imagetype":"mobile", "path":"web/webroot/_ui/images/homepageCarousel/image1-mobile.png"}
]},

{
"Title":"Title 9",
"list":[
{"imagetype":"desktop", "path":"web/webroot/_ui/images/homepageCarousel/image1-desktop.png"},
{"imagetype":"tablet", "path":"web/webroot/_ui/images/homepageCarousel/image1-tablet.png"},
{"imagetype":"mobile", "path":"web/webroot/_ui/images/homepageCarousel/image1-mobile.png"}
]},

{
"Title":"Title 10",
"list":[
{"imagetype":"desktop", "path":"web/webroot/_ui/images/homepageCarousel/image1-desktop.png"},
{"imagetype":"tablet", "path":"web/webroot/_ui/images/homepageCarousel/image1-tablet.png"},
{"imagetype":"mobile", "path":"web/webroot/_ui/images/homepageCarousel/image1-mobile.png"}
]}
]}

Vue.component('carousel-list', {
    template:"<div class='col-xs-12 nopad carousel'>" +
      "<div class='owl-carousel owl-theme js-homePageCarousel' v-for='item in carouselobj'>" +
        "<div class='item' v-for='slide in item'>" +
          "<picture class='owl-item__picture'>" +
            "<template v-for='picture in slide.list'>" +
              "<source v-if='picture.imagetype == \"desktop\"' v-bind:srcset='picture.path' media='(min-width: 900px)'>" +
              "<source v-if='picture.imagetype == \"tablet\"' v-bind:srcset='picture.path' media='(min-width: 641px) and (max-width: 899px)'>" +
              "<source v-if='picture.imagetype == \"mobile\"' v-bind:srcset='picture.path' mmedia='(max-width: 640px)''>" +
            "</template>" +
            "<template v-for='image in slide.list'>" +
              "<img v-if='image.imagetype == \"desktop\"' v-bind:src='image.path'>" +
            "</template>" + 
          "</picture>" + 
          "<h4 class='owl-item__title'>{{ slide.Title }} </h4>" +
        "</div>" + 
      "</div>" +
    "</div>",
    props:['carouselobj']
  })

  new Vue({
    el: "#carouselVueData",
    data: {
      carouselobj :[],
    },
    mounted () {
      // carouselList loaded from scripts.js under _ui-src/web/webroot/js/theme/
      this.carouselobj = carouselList;
      setTimeout(function(){ 
        $('.js-homePageCarousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        navText: ['<div class="left"></div>', '<div class="right"></div>'],
        dots: false,
        rewind:false,
        responsive:{
            0:{
                items:1
            },
            769:{
                items:2
            },
            1000:{
                items:5
            }
        }
        });
      }, 200);
    }
  })