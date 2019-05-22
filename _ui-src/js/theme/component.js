Vue.component('menu-list', {
  template:"<ul class='nav navbar-nav'>" +
    "<li v-for='menu in menuobj.menulist'>" +
    "<a v-if=\"menu.id != undefined\" v-bind:href=\"'plp.html?search='+menu.id\" class='js-category' v-bind:data-menuid='menu.id'>{{ menu.Title }}</a></li>" +
    "</ul>",
  props:['menuobj']
})

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

Vue.component('product-list', {
  template:"<div>" +
    "<template  v-for='(item, itemindex) in plplistobj'>" +
      "<div v-for='product in item.list' class=\"col-lg-4 col-xs-6 plp-products_list\">" +
      "<div class=\"plp-products__product\">" +
      "<div class=\"col-xs-12\">" +
      "<div class=\"row\">" +
      "<div class=\"plp-products__img-container\">" +
      "<a class=\"js-navigatePdp plp-products__img-container--link\" href=\"javascript:void(0);\">" +
      "<img v-bind:srcset='product.image' class=\"plp-products__img\">" +
      "</a>" +
      "</div></div></div>" +
      "<span class=\"plp-products__name\">{{ product.name }}</span>" +
      "<div class=\"plp-products__price\"><span class=\"plp-products__now-price\"><i v-if=\"product.wasprice\">Now - </i>£{{ product.price }}</span>" +
      "<span v-if=\"product.wasprice\" class=\"plp-products__was-price\">Was - <i>£{{ product.wasprice }}</i></span></div>" +
      "<div class=\"plp-products__add-basket\"><div class=\"col-xs-12\"><div class=\"row\">" +
      "<button v-if=\"product.quantity > 0\" class=\"btn btn-danger plp-products--add-basket-btn\"" +
      "@click=\"selectProduct(product.id, product.quantity);\">Add to Basket</button>" +
      "<button v-if=\"product.quantity == 0\" class=\"btn btn-secondary plp-products--add-basket-btn\" disabled>Out of Stock</button>" +
      "</div></div></div>" +
      "<div v-if=\"product.roundelImg\" class=\"plp-products__roundel-product\" v-bind:style=\"{ 'background-image': 'url(' + product.roundelImg + ')'}\"></div>" +
      "</div></div>" +
    "</template>" +
    "</div>",
  props:['plplistobj'],
  methods: {
    selectProduct: function(id, qty){
      vueObject.addBasket(id, qty);
    }
  }
})

Vue.component('facet-list', {
  template:"<div>" +
  "<template  v-for='(item, itemindex) in facetlistobj'>" +
    "<div class=\"plp-facets__types\">" +
        "<h3 class=\"plp-facets--title\">{{ item.Title }}</h3>" +
        "<template  v-for='(colorname, colorindex) in item.colors'>" +
          "<div class=\"plp-facets--option\">" +
              "<input v-bind:id=\"(itemindex+1)+''+(colorindex+1)\" type=\"checkbox\" name=\"color\" v-bind:value=\"colorname\" v-bind:data-category=\"item.id\"" +
              "@change=\"selectFacet((item.id), colorname)\">" +
              "<label v-bind:for=\"(itemindex+1)+''+(colorindex+1)\" class=\"plp-facets--option-label\">{{ colorname }}</label><br/>" +
          "</div>" +
        "</template>" +
        "</div>" +
  "</template>" +
    "</div>",
  props:['facetlistobj'],
  methods: {
    selectFacet: function(){
      vueObject.checkOption();
    }
  }
})

Vue.component('basket-popup-list', {
  template:"<div id=\"basketData\" class=\"hide\">" +
  "<div class=\"mini-cart\">"+
  "<div v-if=\"basketpopupdata.productselected >= 4\" class=\"mini-cart__title\">Showing 4 out of {{basketpopupdata.productselected}}</div>" +
  "<template  v-for='(item, key) in basketpopupdata.list'>" +
    "<div v-if='(key < 4)' class=\"mini-cart__order-list\">" +
      "<article class=\"mini-cart__image-article\">" +
      "<a href=\"javascript:void(0);\" class=\"mini-cart__thumb-image\" v-bind:style=\"{'background-image': 'url(' + item.image + ')'}\"></a>" +
      "</article>" +
      "<aside class=\"mini-cart__details\">" +
        "<div class=\"col-xs-12 noPad\"><span class=\"mini-cart__name\">{{ item.name }}</span></div>" +
        "<div class=\"col-xs-12 noPad\">" +
          "<div class=\"col-xs-7 noPad\"><span class=\"mini-cart__qty\">Quantity : {{ item.quantity }}</span></div>" +
          "<div class=\"col-xs-5 noPad\">" +
          "<span class=\"mini-cart__price\">£ {{ item.price }}</span>" +
          "</div>" +
        "</div>" +
      "</aside>" +
    "</div>" +
  "</template>" +
  "<div class=\"mini-cart__total\">Total: £{{basketpopupdata.total}}</div>" +
  "<button type=\"button\" class=\"btn btn-primary mini-cart__checkout-button\">Checkout</button>" +
  "</div>" +
  "</div>",
  props:['basketpopupdata'],
  methods: {
    selectFacet: function(){
    //  vueObject.checkOption();
    }
  }
});
