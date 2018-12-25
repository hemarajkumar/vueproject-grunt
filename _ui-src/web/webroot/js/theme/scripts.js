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
      facetoptionselected: []
    },
    mounted () {
      this.carouselobj = carouselList;
      this.facetlistobj = this.updateFacets(productlList);
      this.plplistobj =  this.updatePlpData();
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
      }
  },
  watch: {
    plplistobj: function () {
    //  console.log('value changed');
    }
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
