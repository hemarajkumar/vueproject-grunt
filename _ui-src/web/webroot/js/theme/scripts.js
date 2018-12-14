
var carousel = new Vue({
    el: "#vueData",
    data: {
      carouselobj :[],
      menuobj: [],
      productlistobj:[],
      facets: []
    },
    mounted () {
      this.carouselobj = carouselList;
      this.productlistobj = productlList;
      this.updateFacets(this.productlistobj);
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
    },
    methods: {
      updateFacets: function (obj) {
    //    console.log(obj);
    //  var nums = new Array(12,13,14,15)
    //    nums.forEach(function(val,index) {
    //      console.log(val)
    //    });
  //    console.log(obj['lists'].length);

        for (let value of Object.values(obj['lists'])) {
            for (let value1 of Object.values(value)) {
            //    console.log(value1.constructor.toString().match(/function (\w*)/)[1]);
                  for (let value2 of Object.values(value1)) {
              //      console.log(value2); // John, then 30
                }
            }

        //   console.log('here');
        }

      }
    },
    watch: {
    //  productlistobj: function () {
        //  console.log('test1........');
        //  this.updateFacets();
    //  }
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

/*
  var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // define methods under the `methods` object
  methods: {
    greet: function (event) {
      // `this` inside methods points to the Vue instance
      alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
}) */
