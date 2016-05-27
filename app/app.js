angular.module('wcs', []);


angular.module('wcs')
.controller('wcsSearchBar', wcsSearchBar);

function wcsSearchBar($http) {

  var vm = this;

  vm.cat = '';
  vm.results = {};

  vm.search = function() {

    return $http({
      method: 'POST',
      url: 'api/search',
      data: {cat: vm.cat},
    })
    .then(function(res) {
      vm.results = res.data;
      vm.cat = '';
    });
  };

  vm.showList = function(category) {

    if(category.title === 'No Results') {
      return;
    }

    if(category.expanded) {
      category.expanded = !category.expanded;
    }
    else {
      category.expanded = true;
    }
    if(!category.pageList) {
      return $http({
        method: 'POST',
        url: 'api/list',
        data: {cat: category.title},
      })
      .then(function(res) {
        category.pageList = res.data;
      });
    }
  };

}
