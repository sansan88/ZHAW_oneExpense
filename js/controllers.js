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
      database = request.result;
      $scope.idb = database;
      $scope.expenses = [];
      var objectStore = database.transaction("spesen").objectStore("spesen");
      objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          //alert("Note id: "+cursor.key+", Title: "+cursor.value.formBeschreibung);
          $scope.expenses.push(cursor.value);
          cursor.continue();
        }
      };

    };
    request.onupgradeneeded = function(event) {
      var db = event.target.result;
      $scope.idb = db;
      var objectStore = db.createObjectStore("spesen", { keyPath:  "key",autoIncrement:true});
    };

  }
  // *************************************************************************
  // INDEXED ENDE
  // *************************************************************************
  $scope.insertExpense = function(){

    var spesenbeleg = {
      "formBeschreibung": $scope.modal.formBeschreibung,
      "formBeginndatum":  $scope.modal.formBeginndatum,
      "formBeginnzeit":   $scope.modal.formBeginnzeit,
      "formEnddatum":     $scope.modal.formEnddatum,
      "formEndzeit":      $scope.modal.formEndzeit,
      "formBelegdatum":   $scope.modal.formBelegdatum,
      "formSpesenbetrag": $scope.modal.formSpesenbetrag,
      "formWaehrung":     $scope.modal.formWaehrung,
      "formPicture":      $scope.modal.formPicture,
      "formPictureURL":   $scope.modal.formPictureURL
    };
    if (window.indexedDB) {

      //var note={title:"Test Note", body:"Hello World!", date:"01/04/2013"};
      var transaction = database.transaction(["spesen"], "readwrite");
      var objectStore = transaction.objectStore("spesen");
      var request=objectStore.put(spesenbeleg);
      request.onsuccess = function(event) {
        //do something here
        console.log("entry added");
        //Clear $scope..

      };
    }else{
      var string = "";
      var now = new Date();
      var key = string.concat( now.getFullYear() + '_' + now.getMonth() + '_' + now.getDate()  + '_' + now.getHours() + '_' + now.getMinutes() + '_' + now.getSeconds() );
      window.localStorage.setItem(key, spesenbeleg.toString());
    }//ende if

  }//ende insert


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
    // INIT Model VARIABLES
    var now = new Date();
    var string = "";
    $scope.modal.formBeginndatum  = string.concat( now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + ("0" + now.getDate()).slice(-2) );
    $scope.modal.formEnddatum     = string.concat( now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + ("0" + now.getDate()).slice(-2) );

    $scope.modal.formBeginnzeit   = '08:00:00';
    $scope.modal.formEndzeit      = '18:00:00';

    $scope.modal.formBelegdatum  = string.concat( now.getFullYear() + '-' + ("0" + (now.getMonth() + 1)).slice(-2) + '-' + ("0" + now.getDate()).slice(-2) );


    //get Picture
    var takePicture = document.querySelector("#take-picture");
    takePicture.onchange = function (event) {
      // Get a reference to the taken picture or chosen file
      var files = event.target.files,
      file;
      if (files && files.length > 0) {
        file = files[0];
        $scope.modal.formPicture = window.URL.createObjectURL(file);
        var URL = window.URL || window.webkitURL;
        // Create ObjectURL
        var imgURL = URL.createObjectURL(file);
        $scope.modal.formPictureURL = imgURL;

      }
    };

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

    //init fields
    $scope.modal.formBeschreibung = null;
    $scope.modal.formBeginndatum  = null;
    $scope.modal.formBeginnzeit   = null;
    $scope.modal.formEnddatum     = null;
    $scope.modal.formEndzeit      = null;
    $scope.modal.formBelegdatum   = null;
    $scope.modal.formSpesenbetrag = null;
    $scope.modal.formWaehrung     = null;
    $scope.modal.formPicture      = null;
    $scope.modal.formPictureURL   = null;
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action

  });

})
/*****************************************************************/
// SPESEN DETAIL CONTROLLER
/*****************************************************************/
.controller('SpesenDetailCtrl', function($scope, $stateParams) {
  var objectStore = $scope.idb.transaction("spesen").objectStore("spesen");
  objectStore.get(Number($stateParams.spesenId)).onsuccess = function(event) {
    $scope.spesen = event.target.result;
  };

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
