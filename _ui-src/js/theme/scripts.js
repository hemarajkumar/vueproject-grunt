let urlParams = new URLSearchParams(window.location.search);
let queryString = urlParams.get('search');
let paginationSorting;
var vueObject = new Vue({
    el: "#vueData",
    data: {
      carouselobj :[],
      menuobj: [],
      facetObj: [],
      facetlistobj: [],
      plpobj: [],
      plplistobj: [],
      facetSelected: [],
      facetoptionselected: [],
      basketList: [],
      basketpopupdata:[]
    },
    mounted () {
      this.carouselobj = carouselList;
      this.facetlistobj = this.updateFacets(productlList);
      this.plplistobj =  this.updatePlpData();
      this.cookieData =  Cookies.getJSON('basketData');
      this.basketList = this.cookieData == undefined ? [] : this.cookieData;
      this.basketpopupdata = this.getBasketData();
      setTimeout(function(){
        $('.js-homePageCarousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        navText: ['<div class="left"></div>', '<div class="right"></div>'],
        dots: false,
        rewind:false,
        responsive:{
          0:{items:1},
          769:{items:2},
          1000:{items:5}
        }
        });
      }, 200);
    },
    methods: {
      getBasketData: function () {
        let cookieData = this.basketList;
        let objList = [];
        let basketList = [];
        let objIdx = 0;
        let totalPrice = 0;
        for (let value of Object.values(productlList['lists'])) {
            for (let list of Object.values(value.list)) {
               for (let cookieProduct of Object.values(cookieData)) {
                 if (Object.values(cookieProduct).indexOf(list.id) >= 0) {
                   let quantity = this.getBasketQuantity(list.id, cookieData);
                    let priceValue = (parseInt(list.price) * quantity).toFixed(2);
                    let childObject = {};
                    childObject['name'] = list.name;
                    childObject['id'] = list.id;
                    childObject['image'] = list.image;
                    childObject['price'] = priceValue
                    childObject['quantity'] = quantity;
                    objList[objIdx] = childObject;
                    objIdx += 1;
                    totalPrice += priceValue * quantity;
                    childObject = [];
                  }
                }
              }
         }
         basketList['total'] = totalPrice.toFixed(2);
         basketList['productselected'] = Object.values(objList).length;
         basketList['list'] = objList;
         return basketList;
      },

      getBasketQuantity: function (cat_id, obj) {
          for (let list of Object.values(obj)) {
            if (list.product == cat_id) {
                return list.quantity;
            }

          }
      },

      updateFacets: function (obj) {
        let facetList = [];
        let facetIdx = 0;
        for (let value of Object.values(obj['lists'])) {
            if ((queryString == value.id) || (queryString == 'viewall' || queryString == null )){
              let childObject = {};
              childObject['Title'] = value.Title;
              childObject['id'] = value.id;
              for (let list of Object.values(value.list)) {
                 if(facetList.includes(list.color) === false){
                      facetList.push (list.color);
                  }
              }
              childObject['colors'] = facetList;
              this.facetObj[facetIdx] = childObject;
              facetList = [];
              facetIdx += 1;
              childObject = [];
            }
        }
        return this.facetObj;
      },

      updatePlpData: function () {
        let facetList = [];
        let facetIdx = 0;
        let plpProducstArray = [];
        this.plplistobj = [];
        this.plpobj = [];
        let facetselected = this.facetoptionselected;
        if (facetselected.length == 0){
          for (let value of Object.values(productlList['lists'])) {
            if ((queryString == value.id) || (queryString == 'viewall' || queryString == null )){
              let childObject = {};
              childObject['Title'] = value.Title;
              childObject['id'] = value.id;
              for (let list of Object.values(value.list)) {
                listobj = {};
                listobj['id'] = list.id;
                listobj['name'] = list.name;
                listobj['price'] = list.price;
                listobj['image'] = list.image;
                listobj['roundelImg'] = list.roundelImg;
                listobj['color'] =  list.color;
                listobj['wasprice'] =  list.wasprice;
                listobj['quantity'] =  list.quantity;
                facetList.push(listobj);
              }
              facetList = this.getSortedPlpList(facetList);
              childObject['list'] = facetList;
              this.plpobj[facetIdx] = childObject;
              facetList = [];
              facetIdx += 1;
              childObject = [];
            }
          }
          return this.plpobj;
        } else {
            for (let facet of Object.values(facetselected)) {
              for (let value of Object.values(productlList['lists'])) {
                if (facet.category == value.id) {
                  let childObject = {};
                  childObject['Title'] = value.Title;
                  childObject['id'] = value.id;
                   for (let list of Object.values(value.list)) {
                    if (facet.color.indexOf(list.color) >= 0){
                      listobj = {};
                      listobj['id'] = list.id;
                      listobj['name'] = list.name;
                      listobj['price'] = list.price;
                      listobj['image'] = list.image;
                      listobj['roundelImg'] = list.roundelImg;
                      listobj['color'] =  list.color;
                      listobj['wasprice'] =  list.wasprice;
                      listobj['quantity'] =  list.quantity;
                      facetList.push(listobj);
                    }
                   }
                   facetList = this.getSortedPlpList(facetList);
                   childObject['list'] = facetList;
                   this.plpobj[facetIdx] = childObject;
                   facetList = [];
                   facetIdx += 1;
                   childObject = [];
                }
              }
            }
            return this.plpobj;
        }
      },

      checkOption: function () {
        const facetObj = Array.from(document.querySelectorAll('input[type="checkbox"]'))
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox);
        this.facetoptionselected = [];
        let categoryUpdated = [];
        console.log(facetObj);
        for (let ckobj in facetObj) {
          let thisobj = facetObj[ckobj];
          let categoryExists = categoryUpdated.includes(thisobj.getAttribute('data-category'));
          if (categoryExists == false) {
            listobj = {};
            listobj['category'] = thisobj.getAttribute('data-category');
            listobj['color'] = {};
            this.facetoptionselected.push(listobj);
          }
          categoryUpdated.push(thisobj.getAttribute('data-category'));
        }
        let facetSelected = this.facetoptionselected;

        categoryUpdated = [];
        for (let categoryList in facetSelected) {
            let categoryObj = facetSelected[categoryList];
            let colorlist = [];
            let categoryType = categoryObj['category'];
            let categoryExists = categoryUpdated.includes(categoryType);
            for (let colorObj in facetObj) {
            let thisobj = facetObj[colorObj];
            if ((thisobj.getAttribute('data-category') == categoryType) && (categoryExists == false)) {
              colorlist.push(thisobj.value);
            }
        }
        if (colorlist.length > 0){
            categoryObj['color'] = colorlist;
        }
        categoryUpdated.push(categoryType);
      }
      this.plplistobj =  this.updatePlpData();
      },

      getSortedPlpList: function (facets) {
        if (paginationSorting != undefined){
          return paginationSorting == 'hightolow' ? _.sortBy(facets, 'price').reverse() : _.sortBy(facets, 'price');
        }
        else {
          return facets;
        }
      },

      addBasket: function (id, qty) {
        let cartObj = this.basketList;
        let checkId = this.checkIdExists(id, qty);
        if (checkId == undefined){
            cartObj.push({"product":id,"quantity": 1});
        }
        var data = cartObj.map((item, index) => {
          item.key = index + 1;
          return item;
        });
        var d = new Date();
        d.setTime(d.getTime() + 24*60*60*1000*1);
        document.cookie = "basketData=" + JSON.stringify(this.basketList);
        this.basketpopupdata = this.getBasketData();
      },

      checkIdExists: function (id, qty) {
        console.log(this.basketList);
        for (let list of Object.values(this.basketList)) {
          if (list.product == id) {
            if ((qty - list.quantity) > 0) {
              list.quantity = (list.quantity + 1);
            }
            return true;
          }
        }
      }
  },
  watch: {
    plplistobj: function () {},
    basketpopupdata: function () {}
  }
})



var navapp = new Vue({
  el: "#menuBlock",
  data: {
    menuobj: []
  },
  mounted () {
    this.menuobj = navmenu;
  }
});

// select box event
var sortByPrice = document.querySelector(".js-sortBy");
if (sortByPrice !== null) {
  sortByPrice.addEventListener("change", function() {
    paginationSorting = this.value;
    vueObject.checkOption();
  });
}


$(function () {
//  $('[data-toggle="popover"]').popover();

  $('#load-minibasket-popover').popover( {
       content: '<div id="ajax-popover"></div>',
       html: true,
       placement: 'bottom'
    });

    $('#load-minibasket-popover').on('shown.bs.popover', function () {
      $('.popover.bottom .arrow').css('top', '-11px');
    //  var miniCartUrl = $(this).data("miniCartUrl");
    //  $.ajax({
    //    url     : miniCartUrl,
    //    cache   : false,
    //    type    : 'GET',
    //    dataType: "html",
    //    success : function(jsonData) {
          $("#ajax-popover").html($("#basketData").html());
    //    }
    //  });
    });
})
