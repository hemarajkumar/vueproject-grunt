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


Vue.component('menu-list', {
  template:"<ul class='nav navbar-nav'>" +
    "<li v-for='menu in menuobj.menulist'><a href=\"javascript:void(0);\" class='js-category'>{{ menu.Title }}</a></li>" +
    "</ul>",
  props:['menuobj']
})


Vue.component('product-list', {
  template:"<div>" +
    "<template  v-for='items in productlistobj.lists'>" +
      "<template  v-for='item in items'>" +
    "<div v-for='product in item' class=\"col-xs-4\">" +
    "<div class=\"plp-products__product\">" +
    "<div class=\"col-xs-12\"><div class=\"row\"><div class=\"plp-products__img-container\">" +
    "<a class=\"js-navigatePdp\" href=\"javascript:void(0);\" data-product=\"cat01_01\">" +
    "<img v-bind:srcset='product.image' class=\"plp-products__img\">" +
    "</a>" +
    "</div></div></div>" +
    "<span class=\"plp-products__name\">{{ product.name }}</span>" +
    "<div v-if=\"product.roundelImg\" class=\"roundelProduct\" v-bind:style=\"{ 'background-image': 'url(' + product.roundelImg + ')'}\"></div>" +
    "</div></div>" +
      "</template>" +
    "</template>" +
    "</div>",
  props:['productlistobj']
})
