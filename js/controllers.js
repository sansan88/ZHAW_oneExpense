angular.module('starter.controllers', [])

// SCOPE defines DATA which should be available on the view.

/*****************************************************************/
// SPESEN CONTROLLER
/*****************************************************************/
.controller('SpesenCtrl', function($scope, $ionicModal) {

  // *************************************************************************
  // INDEXED DB Start
  // *************************************************************************
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
  window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
  window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  if (!window.indexedDB) {
    alert("Sorry!Your browser doesn't support IndexedDB");
  }else{

    var database;
    var request = window.indexedDB.open("idb",1);
    request.onerror = function(event) {
      console.log(event.target.errorCode);
    };
    request.onsuccess = function(event) {
      database=request.result;
    };
    request.onupgradeneeded = function(event) {
      var db = event.target.result;
      var objectStore = db.createObjectStore("spesen", { keyPath:  "id",autoIncrement:true});
    };

  }

  // *************************************************************************
  // INDEXED ENDE
  // *************************************************************************
  $scope.insertExpense = function(){
    if (window.indexedDB) {

      //var note={title:"Test Note", body:"Hello World!", date:"01/04/2013"};
      var transaction = database.transaction(["spesen"], "readwrite");
      var objectStore = transaction.objectStore("spesen");
      var request=objectStore.put({
        "formBeschreibung": $scope.formBeschreibung,
        "formBeginndatum":  $scope.formBeginndatum,
        "formBeginnzeit":   $scope.formBeginnzeit,
        "formEnddatum":     $scope.formEnddatum,
        "formEndzeit":      $scope.formEndzeit,
        "formBelegdatum":   $scope.formBelegdatum,
        "formSpesenbetrag": $scope.formSpesenbetrag,
        "formPicture":      $scope.formPciture

      });
      request.onsuccess = function(event) {
        //do something here
        console.log("entry added");
        //Clear $scope..

      };
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
