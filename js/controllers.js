angular.module('starter.controllers', [])

// SCOPE defines DATA which should be available on the view.


/*****************************************************************/
// SPESEN CONTROLLER
/*****************************************************************/
.controller('SpesenCtrl', function($scope, $ionicModal) {

  // *************************************************************************
  // INDEXED DB Start
  // *************************************************************************
  // IDB
  var hasIDB = typeof window.indexedDB != 'undefined';
  //Create DB
  idb = indexedDB.open('IDBSpesen', 1);
  var dbobject; // Define a global variable to hold our database object
  idb.onsuccess = function(evt){
    dbobject = evt.target.result;
    alert('idb.onsuccess');
    dbobject.createObjectStore('spesen',{autoIncrement: true});
  }
  idb.onupgradeneeded = function (evt) {
    dbobject = evt.target.result;
    // Check our version number
    if (evt.oldVersion < 1) {
      dbobject.createObjectStore('spesen',{autoIncrement: true});
      alert('idb.onupgradeneeded');
    }
  }
  idb.onblocked = function(){
    alert('idb.onblocked');
  }
  idb.onerror = function(){
    alert('idb.onerror');
  }

  try{
    transaction = dbobject.transaction('spesen', 'readwrite');
  }
  catch(err){
    alert('error create transaktion');
  }
  // *************************************************************************
  // INDEXED ENDE
  // *************************************************************************


  $scope.insertExpense = function(){
    transaction = dbobject.transaction('spesen', 'readwrite');

    request = objectstore.add({
      "formBeschreibung": $scope.formBeschreibung,
      "formBeginndatum":  $scope.formBeginndatum,
      "formBeginnzeit":   $scope.formBeginnzeit,
      "formEnddatum":     $scope.formEnddatum,
      "formEndzeit":      $scope.formEndzeit,
      "formBelegdatum":   $scope.formBelegdatum,
      "formSpesenbetrag": $scope.formSpesenbetrag,
      "formPicture":      $scope.formPciture

    });
    request.success = function(){
      alert('eintrag added');
    }
  }




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
