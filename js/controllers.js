angular.module('starter.controllers', [])

// SCOPE defines DATA which should be available on the view.

//****************************************************************/
// SPESEN CONTROLLER
//****************************************************************/
.controller('SpesenCtrl', function($scope, $ionicModal, Spesen, $http) {

  $scope.idb = {};

  // INDEXED DB Start
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
  window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
  window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  var database;
  var request = window.indexedDB.open("idb",1);
  request.onerror = function(event) {
    //console.log(event.target.errorCode);
  };
  request.onsuccess = function(event) {
    //console.log('START request.onsuccess');
    database = request.result;
    $scope.idb = database;
    //console.log('ENDE request.onsuccess');
  };
  request.onupgradeneeded = function(event) {
    //console.log('START request.onupgradeneeded');
    var db = event.target.result;
    $scope.idb = db;
    var objectStore = $scope.idb.createObjectStore("spesen", { keyPath:  "key",autoIncrement:true});
    //console.log('ENDE request.onupgradeneeded');
  };

  //****************************************************************************
  //  MODAL FENSTER
  //****************************************************************************
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
    try{
      $scope.modal.remove();
    }catch(error){

    }

  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    //init fields
    $scope.modal = null;
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


//******************************************************************************
//  List functions
//******************************************************************************
  $scope.edit = function(spesen) {
    //alert('Edit Item: ' + spesen.key);
    var link = "#/tab/spesen/" + spesen.key;
    window.location.href = link;

  };
  $scope.send = function(spesen) {
    var link = "mailto:" + window.localStorage.getItem("accountEmail")
    + "?subject=Approve Expense Request " + spesen.key + " from User " + window.localStorage.getItem("accountVorname") + " " + window.localStorage.getItem("accountNachname")
    + "&body="
    + "Beschreibung: " + spesen.formBeschreibung + "%0A"
    + "Belegdatum: " + spesen.formBelegdatum + "%0A"
    + "Betrag" + spesen.formSpesenbetrag + spesen.formWaehrung + "%0A"
    + "Kategorie" + spesen.formKategorie + "%0A"
    + "Beginndatum" + spesen.formBeginndatum + "%0A"
    + "Beginnzeit" + spesen.formBeginnzeit + "%0A"
    + "Enddatum" + spesen.formEnddatum + "%0A"
    + "Endzeit" + spesen.formEndzeit + "%0A"
    + "attachment=" + '"'+ spesen.formPictureURL + '"';

    window.location.href = link;

      /*  if (window.plugins && window.plugins.emailComposer){
      window.plugins.emailComposer.showEmailComposerWithCallback(function(result){
        console.log("email success");
      },
        "Approval Expense Request for "+spesen.key, //subject
        "Please Approve Expense: " + spesen.formBeschreibung, //body
        ["sandro.scalco@gmail.com"], //[] array mail to
        null,//[] array mail cc
        null, //[] array mail bcc
        false, //use hmtl
        null, //attachement
        null //attachement
      );
    }//if */
  };//send

  $scope.delete = function(spesen){
    alert('delete item: ' + spesen.key);

    var transaction = $scope.idb.transaction(["spesen"], "readwrite");
    var objectStore = transaction.objectStore("spesen");
    var request = objectStore.delete(spesen.key);
    request.onsuccess = function(event) {
      console.log("entry deleted");
    };

  }


//******************************************************************************
// Spesen funktionen
//******************************************************************************
  $scope.useGeolocation = function(){

    if ($scope.modal.formGeo === false || $scope.modal.formGeo === undefined ){

      function success(position) {
        $scope.modal.formGeoLat = position.coords.latitude;
        $scope.modal.formGeoLong  = position.coords.longitude;
      };
      function error() {
        console.log("no geo function");
      };

      if(navigator.geolocation){
        // timeout at 60000 milliseconds (60 seconds)
        var options = {timeout:60000};
        navigator.geolocation.getCurrentPosition(success, error, options);
        }else{
          alert("Sorry, browser does not support geolocation!");
      }

    }
  };

  $scope.insertExpense = function(){
    var spese = {
      "formKategorie":    $scope.modal.formKategorie,
      "formBeschreibung": $scope.modal.formBeschreibung,
      "formBeginndatum":  $scope.modal.formBeginndatum,
      "formBeginnzeit":   $scope.modal.formBeginnzeit,
      "formEnddatum":     $scope.modal.formEnddatum,
      "formEndzeit":      $scope.modal.formEndzeit,
      "formBelegdatum":   $scope.modal.formBelegdatum,
      "formSpesenbetrag": $scope.modal.formSpesenbetrag,
      "formWaehrung":     $scope.modal.formWaehrung,
      "formPicture":      $scope.modal.formPicture,
      "formPictureURL":   $scope.modal.formPictureURL,
      "formGeoLong":      $scope.modal.formGeoLong,
      "formGeoLat":       $scope.modal.formGeoLat
    };

    //Spesen.addSpesen($scope.idb, spese);
    var transaction = $scope.idb.transaction(["spesen"], "readwrite");
    var objectStore = transaction.objectStore("spesen");
    var request=objectStore.put(spese);
    request.onsuccess = function(event) {
      console.log("entry added");
    };

    $scope.modal.hide();

  }//ende insert

  //$scope.expenses = Spesen.getSpesen($scope.idb);
  setTimeout(function(){
    var spesen = [];
    var objectStore = $scope.idb.transaction("spesen").objectStore("spesen");
    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        spesen.push(cursor.value);
        cursor.continue();
      }
      $scope.expenses = spesen;
    };

  }, 100);

  $scope.doRefresh = function() {
    setTimeout(function(){
      var spesen = [];
      var objectStore = $scope.idb.transaction("spesen").objectStore("spesen");
      objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          spesen.push(cursor.value);
          cursor.continue();
        }
        $scope.expenses = spesen;
      };

    }, 100);
      // Stop the ion-refresher from spinning
    $scope.$broadcast('scroll.refreshComplete');
  };

}) // ENDE CTRL

//******************************************************************************
// SPESEN DETAIL CONTROLLER
//******************************************************************************
.controller('SpesenDetailCtrl', function($scope, $stateParams, Spesen) {

  /*$scope.spesen = Spesen.getSpese($scope.idb, Number($stateParams.spesenId));

  if ($scope.spesen.key === undefined){
    $scope.$viewHistory.backView.go().then = function(){
      console.log('no spesen returned, navigation back');
    }();
  }*/
  var spese = {}
  var objectStore = $scope.idb.transaction("spesen").objectStore("spesen");
  objectStore.get(Number($stateParams.spesenId)).onsuccess = function(event) {
    $scope.spesen = event.target.result;

    var output = document.getElementById("out");
    var latitude  = $scope.spesen.formGeoLat;
    var longitude = $scope.spesen.formGeoLong;

    if (latitude === undefined){
      output.innerHTML = 'Keine Positionsdaten erfasst.';
    }else{
      output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
      var img = new Image();
      img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
      output.appendChild(img);
    }


    if ($scope.spesen.formKategorie === 'Andere Spesen' ){
      $scope.bildurl = '/res/logo/a.png';
    }else{
      $scope.bildurl = '/res/logo/g.png';
    }

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
