angular.module('starter.controllers', [])

// SCOPE defines DATA which should be available on the view.


/*****************************************************************/
// SPESEN CONTROLLER
/*****************************************************************/
.controller('SpesenCtrl', function($scope, $ionicModal) {
  // IDB

  $scope.items = '';

  var initCallback = function(){
    //getItems();
    dataStore.getAll(function(data){
      $scope.expenses = data;
      // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
      $scope.$apply();
    },errorCallback);
    console.log('init Callback & get Data');
  };

  var dataStore = new IDBStore(
  {
    storeName: 'Store',
    storePrefix: 'IDBWrapper-',
    dbVersion: 1,
    keyPath: 'id',
    autoIncrement: true,
    indexes: [],
    onStoreReady: function(){
      console.log('DB Ready');
    },
    onError: function(error){ throw error; }
  }, initCallback);

  var getItemsSuccess = function(data){
    $scope.expenses = data;
    // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
    $scope.$apply();
  };

  var errorCallback = function(){
    console.log('error');
  };

  var getItems = function(){
    dataStore.getAll(getItemsSuccess,errorCallback);
    console.log('getItems');
  };

  $scope.deleteItem = function(item){
    dataStore.remove(item,getItems,errorCallback);
  }

  $scope.addItem = function(){
    dataStore.put({'beschreibung': $scope.formBeschreibung, 'belegdatum' : $scope.formBelegdatum},getItems,errorCallback);

    // Init Elements
    $scope.formBeschreibung = '';
    $scope.formBelegdatum   = '';
  };


  // MODAL FENSTER
  $ionicModal.fromTemplateUrl('./sites/modal-spesen.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: false,
    backdropClickToClose: false
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


  // INIT Model VARIABLES
  var now = new Date();
  var string = "";
  $scope.formBeginndatum  = string.concat( now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() );
  $scope.formEnddatum     = string.concat( now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() );

  $scope.formBeginnzeit   = '08:00:00';
  $scope.formEndzeit      = '18:00:00';

  $scope.formBelegdatum  = string.concat( now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() );

})
/*****************************************************************/
// SPESEN DETAIL CONTROLLER
/*****************************************************************/
.controller('SpesenDetailCtrl', function($scope, $stateParams) {


})
/*****************************************************************/
// DASHBOARD CONTROLLER
/*****************************************************************/
.controller('DashCtrl', function($scope, Account) {
  $scope.account = Account.getAccount();

})

/*****************************************************************/
// ACCOUNT CONTROLLER
/*****************************************************************/
.controller('AccountCtrl', function($scope, Account) {
//GET Account DATA
  $scope.account = Account.getAccount();

//SAVE
  $scope.accountSave = function(){

      function saveStatusLocally(key, value) {
        window.localStorage.setItem(key, value);
      };

      if ($scope.account.formAccountVorname !== undefined){
        saveStatusLocally('accountVorname',   $scope.account.formAccountVorname );
      }

      if ($scope.account.formAccountNachname !== undefined){
        saveStatusLocally('accountNachname',  $scope.account.formAccountNachname );
      }

      if ($scope.account.formAccountEmail !== undefined){
        saveStatusLocally('accountEmail',     $scope.account.formAccountEmail);
      }

      if ($scope.account.formAccountPasswort !== undefined){
        saveStatusLocally('accountPasswort',  $scope.account.formAccountPasswort);
      }

  },

//CANCEL
  $scope.accountCancel = function(event){
    alert("cancel");

  }



});
