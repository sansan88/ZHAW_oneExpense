angular.module('starter.controllers', [])

// SCOPE defines DATA which should be available on the view.


/*****************************************************************/
// SPESEN CONTROLLER
/*****************************************************************/
.controller('SpesenCtrl', function($scope, $ionicModal) {
  // IDB
  const dbName = "indexedDB";
  var request = indexedDB.open(dbName, 1);

  request.onsuccess = function(event){
  }

  request.onerror = function(event) {
  }

  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    // Create another object store called "names" with the autoIncrement flag set as true.
    var objStore = db.createObjectStore("spesen", { autoIncrement : true });

    //add initialer Eintrag:
    objStore.add(
      {
        "formBeschreibung": "Das ist eine Beschreibung",
        "formBeginndatum":  "value",
        "formBeginnzeit":   "value",
        "formEnddatum":     "value",
        "formEndzeit":      "value",
        "formBelegdatum":   "value",
        "formSpesenbetrag": "value",
        "formPicture":      "value"
      }
    );//add
  }

  $scope.insertExpense = function(){

    var data = {
        "formBeschreibung": $scope.formBeschreibung,
        "formBeginndatum":  $scope.formBeginndatum,
        "formBeginnzeit":   $scope.formBeginnzeit,
        "formEnddatum":     $scope.formEnddatum,
        "formEndzeit":      $scope.formEndzeit,
        "formBelegdatum":   $scope.formBelegdatum,
        "formSpesenbetrag": $scope.formSpesenbetrag,
        "formPicture":      $scope.formPciture
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
