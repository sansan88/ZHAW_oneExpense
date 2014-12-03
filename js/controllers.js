angular.module('starter.controllers', [])

// SCOPE defines DATA which should be available on the view.


/*****************************************************************/
// SPESEN CONTROLLER
/*****************************************************************/
.controller('SpesenCtrl', function($scope, $ionicModal) {


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
