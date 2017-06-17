angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

  $urlRouterProvider.otherwise('/home');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Root',
      skip: true
    },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'chart.js',
          files: [
            'bower_components/chart.js/dist/Chart.min.js',
            'bower_components/angular-chart.js/dist/angular-chart.min.js'
          ]
        }]);
      }],
    },
    controller: 'commonController'
  })
  .state('app.main', {
    url: '/home',
    templateUrl: 'views/home.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Home',
    },
    //page subtitle goes here
    params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([
          {
            serie: true,
            name: 'chart.js',
            files: [
              'bower_components/chart.js/dist/Chart.min.js',
              'bower_components/angular-chart.js/dist/angular-chart.min.js'
            ]
          },
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/main.js']
        });
      }]
    }
  })
  .state('appSimple', {
    abstract: true,
    templateUrl: 'views/common/layouts/simple.html',
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
    }
  })

  // Additional Pages
  .state('appSimple.register', {
    url: '/register',
    templateUrl: 'views/pages/register.html',
    controller : 'registerpController'
  })
  .state('appSimple.404', {
    url: '/404',
    templateUrl: 'views/pages/404.html'
  })
  .state('appSimple.500', {
    url: '/500',
    templateUrl: 'views/pages/500.html'
  })
  .state('app.bandas', {
    url: '/bandas',
    templateUrl: 'views/bandas.html',
    ncyBreadcrumb: {
      label: 'Bandas'
    },
    controller : 'bandController'
  })
  .state('app.home', {
    url: '/home',
    templateUrl: 'views/home.html',
    ncyBreadcrumb: {
      label: 'Home'
    },
    controller : 'myhomeController'
  })
  .state('app.cartelera', {
    url: '/cartelera/:cartelID',
    templateUrl: 'views/cartel.html',
    ncyBreadcrumb: {
      label: 'Cartelera'
    },
    controller : 'carteleraController'
  })
  .state('app.createcartelera', {
    url: '/createcartelera',
    templateUrl: 'views/newcartel.html',
    ncyBreadcrumb: {
      label: 'createcartelera'
    },
    controller : 'newCartelController'
  })
  .state('appSimple.login', {
    url: '/login',
    templateUrl: 'views/pages/login.html',
    controller : 'loginController'
  })
  .state('appSimple.forgot', {
    url: '/forgot',
    templateUrl: 'views/pages/forgot.html'
  })
  .state('app.festival', {
    url: '/festival',
    templateUrl: 'views/festival.html',
    ncyBreadcrumb: {
      label: 'Festivales'
    },
    controller : ''
  })
  .state('app.perfil', {
    url: '/perfil',
    templateUrl: 'views/perfil.html',
    ncyBreadcrumb: {
      label: 'My Perfil'
    },
    controller : ''
  })
  .state('app.inicio', {
    url: '/inicio',
    templateUrl: 'views/inicio.html',
    ncyBreadcrumb: {
      label: 'Inicio'
    },
    controller : ''
  })
}]);
