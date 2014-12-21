angular.module('starter.services', [])

//****************************************************************/
// SPESEN Service
//****************************************************************/
 .factory('Spesen', function() {

   //Public return methods.
    return {
      getSpesen: function(database){
        var spesen = [];
        var objectStore = database.transaction("spesen").objectStore("spesen");
        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
            spesen.push(cursor.value);
            cursor.continue();
          }
        };
        return spesen;
      },

      getSpese: function(database, id){
        var spese = {}
        var objectStore = database.transaction("spesen").objectStore("spesen");
        objectStore.get(Number(id)).onsuccess = function(event) {
          spese = event.target.result;
        };
        return spese;
      },

      addSpesen: function(database, spesenobj){
        var transaction = database.transaction(["spesen"], "readwrite");
        var objectStore = transaction.objectStore("spesen");
        var request=objectStore.put(spesenobj);
        request.onsuccess = function(event) {
          console.log("entry added");
        };
      }

    } //End return methods

 })// END SPESEN Service

 //****************************************************************/
 // ACCOUNT Service
 //****************************************************************/
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
        formAccountVEmail:   window.localStorage.getItem("accountVEmail"),
      };
      return account;
    }
  }
});
