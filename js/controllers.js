angular.module('starter.controllers', [])

// SCOPE defines DATA which should be available on the view.

//****************************************************************/
// SPESEN CONTROLLER
//****************************************************************/
.controller('SpesenCtrl', function($scope, $ionicModal, Spesen) {

  $scope.expenses = Spesen.getSpesen();

  $scope.insertExpense = function(){

    Spesen.addSpesen({
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
      "formPictureURL":   $scope.modal.formPictureURL
    });

    $scope.modal.hide();

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
    //init fields
    $scope.modal = null;
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

})

/*****************************************************************/
// SPESEN DETAIL CONTROLLER
/*****************************************************************/
.controller('SpesenDetailCtrl', function($scope, $stateParams, Spesen) {
  $scope.spesen = Spesen.getSpese(Number($stateParams.spesenId));

  if ($scope.spesen.key === undefined){
    $scope.$viewHistory.backView.go().then = function(){
      console.log('no spesen returned, navigation back');
    }();
  }

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
