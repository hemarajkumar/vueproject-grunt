let urlParams = new URLSearchParams(window.location.search);
let queryString = urlParams.get('search')
var vueObject = new Vue({
    el: "#vueData",
    data: {
      carouselobj :[],
      menuobj: [],
      facetObj: [],
      facetlistobj: [],
      plpobj: [],
      plplistobj: []
    },
    mounted () {
      this.carouselobj = carouselList;
      this.facetlistobj = this.updateFacets(productlList);
      this.plplistobj =  this.updatePlpData(productlList);
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

      updatePlpData: function (obj) {
        let facetList = [];
        let facetIdx = 0;
        let plpProducstArray = [];
        for (let value of Object.values(obj['lists'])) {
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
              listobj['roundelImg'] = list.roundelImg
              listobj['color'] =  list.color
              facetList.push(listobj);
            }
            childObject['list'] = facetList;
            this.plpobj[facetIdx] = childObject;
            facetList = [];
            facetIdx += 1;
            childObject = [];
          }
        }
        return this.plpobj;
      }
    },
    watch: {
      //
    }
  })

  var navapp = new Vue({
      el: "#menuBlock",
      data: {
        menuobj: [],
      },
      mounted () {
        this.menuobj = navmenu;
      }
  });
