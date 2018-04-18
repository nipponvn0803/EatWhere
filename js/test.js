document.addEventListener('init', function (event) {
    var page = event.target;
    var temp1 = document.getElementsByTagName("template")[0];

    if (page.id === 'index') {
      page.querySelector('#navigation-button-2').onclick = function () {
          document.getElementsByTagName('ons-tabbar')[0].setActiveTab(3);
      };
        page.querySelector('#advanced').onclick = function () {
            document.querySelector('#myNavigator').pushPage('filter.html', { data: { title: 'Filter' } });
        };
        
        //set eatwhere logo to smaller font when input is focused
        function setFocused() {
        var results = document.querySelectorAll('#eatwhere');
        for (result of results) {
          result.classList.add('focused');
        }
      }

      function unsetFocused() {
        var results = document.querySelectorAll('#eatwhere');
        for (result of results) {
          result.classList.remove('focused');
        }
      }

      var results = document.querySelectorAll('input[type="search"]');
      for (result of results) {
        result.addEventListener("focus", setFocused);
        result.addEventListener("blur", unsetFocused);
      }
    }
     else if (page.id === 'filter') {
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }

    if (event.target.id === 'filter') {

    var photo = document.querySelectorAll(".filter-image");

    for (var i = 0; i < photo.length; i++) {
      photo[i].addEventListener('click', function() {
        this.classList.toggle("active-image");
      });
    }

    document.querySelector("#apply-button").addEventListener("click", applyFilter);
    function applyFilter() {
       var activeImage = document.querySelectorAll(".active-image");
       var userFilterArray = [];

       for (var i = 0; i < activeImage.length; i++) {
        userFilterArray.push(activeImage[i].getAttribute("data-filter"));
       }

       var userFilter = userFilterArray.toString();
       document.getElementById("filter-search").value = userFilter;
       console.log(document.getElementById("filter-search").value);
       myNavigator.popPage();
    };
  }
});
