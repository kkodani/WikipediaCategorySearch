describe('unit tests', function() {

	beforeEach(module('wcs'));

  var ctrl;

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('wcsSearchBar', {
      //$scope: scope,
    });
  }));

  describe('state', function() {

    it('should have string cat and array results', function() {
      expect(ctrl.cat).toBeDefined();
      expect(angular.isString(ctrl.cat)).toBe(true);

      expect(ctrl.results).toBeDefined();
      expect(angular.isObject(ctrl.results)).toBe(true);

    });

    it('should have a method for searching', function() {
      expect(ctrl.search).toBeDefined();
      expect(angular.isFunction(ctrl.search)).toBe(true);
    });

  });
});
