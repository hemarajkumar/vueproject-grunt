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
    "<li v-for='menu in menuobj.menulist'>" +
    "<a v-if=\"menu.id != undefined\" v-bind:href=\"'plp.html?search='+menu.id\" class='js-category' v-bind:data-menuid='menu.id'>{{ menu.Title }}</a></li>" +
    "</ul>",
  props:['menuobj']
})

Vue.component('product-list', {
  template:"<div>" +
    "<template  v-for='(item, itemindex) in plplistobj'>" +
      "<div v-for='product in item.list' class=\"col-xs-4\">" +
      "<div class=\"plp-products__product\">" +
      "<div class=\"col-xs-12\">" +
      "<div class=\"row\">" +
      "<div class=\"plp-products__img-container\">" +
      "<a class=\"js-navigatePdp plp-products__img-container--link\" href=\"javascript:void(0);\">" +
      "<img v-bind:srcset='product.image' class=\"plp-products__img\">" +
      "</a>" +
      "</div></div></div>" +
      "<span class=\"plp-products__name\">{{ product.name }}</span>" +
      "<div v-if=\"product.roundelImg\" class=\"plp-products__roundel-product\" v-bind:style=\"{ 'background-image': 'url(' + product.roundelImg + ')'}\"></div>" +
      "</div></div>" +
    "</template>" +
    "</div>",
  props:['plplistobj']
})

Vue.component('facet-list', {
  template:"<div>" +
  "<template  v-for='(item, itemindex) in facetlistobj'>" +
    "<div class=\"plp-facets__types\">" +
        "<h3 class=\"plp-facets--title\">{{ item.Title }}</h3>" +
        "<template  v-for='(colorname, colorindex) in item.colors'>" +
          "<div class=\"plp-facets--option\">" +
              "<input v-bind:id=\"(itemindex+1)+''+(colorindex+1)\" type=\"checkbox\" name=\"color\" value=\"Blue\"><label v-bind:for=\"(itemindex+1)+''+(colorindex+1)\" class=\"plp-facets--option-label\">{{ colorname }}</label><br/>" +
          "</div>" +
        "</template>" +
        "</div>" +
  "</template>" +
    "</div>",
  props:['facetlistobj']
})