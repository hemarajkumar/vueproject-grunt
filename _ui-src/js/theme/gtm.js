$(function () {
    var Gtm_inject = function() {
      var div = document.createElement('div');
      div.setAttribute('class', 'gtm__category');
      var img = document.createElement('img');
      img.src = "web/images/category.jpg";
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

$('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});
