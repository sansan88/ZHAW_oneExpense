angular.module('starter.controllers', [])

// SCOPE defines DATA which should be available on the view.

.controller('SpesenCtrl', function($scope, $indexedDB) {

  if (typeof(mose) !== 'object'){
    OSNE = 'expense';
    mose =  $indexedDB.objectStore(OSNE);
  }

  // GET Values from IndexedDB
  $scope.expenses = [];
  mose.getAll().then(function(results) {
    $scope.expenses = results;
  });

})
.controller('SpesenDetailCtrl', function($scope, $stateParams, $indexedDB) {
  // Init DB Connection
  if (typeof(mose) !== 'object'){
    OSNE = 'expense';
    mose =  $indexedDB.objectStore(OSNE);
  }
  $scope.spesen = {};
  //$scope.spesen = mose.$get($indexedDB);
})

/*****************************************************************/
// DASHBOARD CONTROLLER
/*****************************************************************/
.controller('DashCtrl', function($scope, Account, $indexedDB) {
  // INIT Model VARIABLES
  var now = new Date();
  var string = "";
  $scope.formBeginndatum  = string.concat( now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() );
  $scope.formEnddatum     = string.concat( now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() );

  $scope.formBeginnzeit   = '08:00:00';
  $scope.formEndzeit      = '18:00:00';

  $scope.formBelegdatum  = string.concat( now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() );

//GET Account DATA
  $scope.account = Account.getAccount();


  //Insert Function Expeneses
  $scope.insertExpense = function(){

    // Init DB Connection

    if (typeof(mose) !== 'object'){
      OSNE = 'expense';
      mose =  $indexedDB.objectStore(OSNE);
    }

    var id = $scope.formBeschreibung + '_' + $scope.formBeschreibung + '_' + $scope.formBelegdatum;
    var currentdate = new Date();
    var key = "";
    key = key.concat(currentdate.getFullYear(), currentdate.getMonth()+1, currentdate.getDate(),
    currentdate.getHours(), currentdate.getMinutes(),currentdate.getSeconds(), currentdate.getMilliseconds() );

    mose.insert({
      key: key,
      id: id,
      beschreibung: $scope.formBeschreibung,
      kategorie: $scope.formKategorie,
      beginndatum: $scope.formBeginndatum,
      enddatum: $scope.formEnddatum,
      belegdatum: $scope.formSpesenbetrag,
      belegwaehrung: $scope.formWaehrung,
      betrag: $scope.formSpesenbetrag,
      picture: $scope.formPicture
    });
  }


  // CAMERA
  var takePicture = document.querySelector("#take-picture");
  var showPicture = document.querySelector("#show-picture");

  takePicture.onchange = function (event) {
    // Get a reference to the taken picture or chosen file
    var files = event.target.files,
    file;
    if (files && files.length > 0) {
      file = files[0];
    }
    // Get window.URL object
    var URL = window.URL || window.webkitURL;
    // Create ObjectURL
    var imgURL = URL.createObjectURL(file);
    // Set img src to ObjectURL
    showPicture.src = imgURL;
    // For performance reasons, revoke used ObjectURLs
    URL.revokeObjectURL(imgURL);

    $scope.formPicture = imgURL;

  }
})

/*****************************************************************/
// ACCOUNT CONTROLLER
/*****************************************************************/

.controller('AccountCtrl', function($scope, Account, $indexedDB) {
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
    //alert("cancel");


  }



});
