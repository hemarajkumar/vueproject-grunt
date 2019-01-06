$(function () {
    var Gtm_inject = function() {
      var div = document.createElement('div');
      div.setAttribute('class', 'gtm__category');
      var img = document.createElement('img');
      img.src = "web/webroot/_ui/images/category.jpg";
      img.alt = this.name;
      img.className = 'gtm__category_flash-img';
      var a = document.createElement('a');
      a.href = 'http://www.sofa.com/';
      a.target = '_blank';
      a.append(img);
      div.appendChild(a);
      var categoryObj = document.querySelector('.js-productListing');
      categoryObj.prepend(div);
    };
    Gtm_inject();
})
