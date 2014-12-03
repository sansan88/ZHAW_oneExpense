angular.module('starter.controllers', [])

// SCOPE defines DATA which should be available on the view.

.controller('SpesenCtrl', function($scope) {


})
.controller('SpesenDetailCtrl', function($scope, $stateParams) {


})

/*****************************************************************/
// DASHBOARD CONTROLLER
/*****************************************************************/
.controller('DashCtrl', function($scope, Account) {
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
    //alert("cancel");


  }



});
