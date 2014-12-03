// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'xc.indexedDB'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //alert("ready!");
    
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

});
})

.config(function($stateProvider, $urlRouterProvider, $indexedDBProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "sites/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'sites/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.spesen', {
    url: '/spesen',
    views: {
      'tab-spesen': {
        templateUrl: 'sites/tab-spesen.html',
        controller: 'SpesenCtrl'
      }
    }
  })
  .state('tab.spesen-detail', {
    url: '/spesen/:spesenId',
    views: {
      'tab-spesen': {
        templateUrl: 'sites/spesen-detail.html',
        controller: 'SpesenDetailCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'sites/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');



  /*
  https://github.com/webcss/angular-indexedDB
  */
  $indexedDBProvider
  .connection('myIndexedDB')
  .upgradeDatabase(1, function(event, db, tx){
    var objStore = db.createObjectStore('expense', {keyPath: 'key'});
    objStore.createIndex("id", "id", { unique: false });
  });


});
