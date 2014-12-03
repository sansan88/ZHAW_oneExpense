angular.module('starter.services', [])

 .factory('Spesen', function() {


 })
 .factory('Account', function() {
  //Account DATA


  //Public Return Methods
  return {
    getAccount: function(){

      var account = {
        formAccountNachname: window.localStorage.getItem("accountNachname"),
        formAccountVorname:  window.localStorage.getItem("accountVorname"),
        formAccountEmail:    window.localStorage.getItem("accountEmail"),
        formAccountPasswort: window.localStorage.getItem("accountPasswort")
      };
      return account;
    }
  }
});
