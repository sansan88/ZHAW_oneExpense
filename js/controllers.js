angular.module('starter.controllers', [])

// SCOPE defines DATA which should be available on the view.


/*****************************************************************/
// SPESEN CONTROLLER
/*****************************************************************/
.controller('SpesenCtrl', function($scope, $ionicModal) {

  // *************************************************************************
  // INDEXED DB Start
  // *************************************************************************
  var idbSupported = false;
  var db;

  //document.addEventListener("DOMContentLoaded", function(){

    if("indexedDB" in window) {
      idbSupported = true;
    }
    if(idbSupported) {
      var openRequest = indexedDB.open("idb",3); //open idb
      openRequest.onupgradeneeded = function(e) {
        console.log("running onupgradeneeded");
        var thisDB = e.target.result;
        if(!thisDB.objectStoreNames.contains("objectStore")) {
          thisDB.createObjectStore("objectStore", {autoIncrement:true});
        }
      }
      openRequest.onsuccess = function(e) {
        console.log("Success!");
        db = e.target.result;
      }
      openRequest.onerror = function(e) {
        console.log("Error");
        console.dir(e);
      }
    }
  // *************************************************************************
  // INDEXED ENDE
  // *************************************************************************


  $scope.insertExpense = function(){
    var transaction = db.transaction("objectStore","readwrite");
    var store = transaction.objectStore("objectStore");

    //Perform the add
    var person = {
      name:name,
      email:email,
      created:new Date()
    }
    var request = store.add(person,1);

    var a = {
      "formBeschreibung": $scope.formBeschreibung,
      "formBeginndatum":  $scope.formBeginndatum,
      "formBeginnzeit":   $scope.formBeginnzeit,
      "formEnddatum":     $scope.formEnddatum,
      "formEndzeit":      $scope.formEndzeit,
      "formBelegdatum":   $scope.formBelegdatum,
      "formSpesenbetrag": $scope.formSpesenbetrag,
      "formPicture":      $scope.formPciture

    };

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
