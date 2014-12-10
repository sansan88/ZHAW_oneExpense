angular.module('starter.services', [])

//****************************************************************/
// SPESEN Service
//****************************************************************/
 .factory('Spesen', function() {
   database = {};
    //spesen = []; // init spesenobjekt

    // INDEXED DB Start
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
    window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
    window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    if (!window.indexedDB) {
      //do nothing, use localstore.

    }else{
      var request = window.indexedDB.open("idb",1);
      request.onerror = function(event) {
        console.log(event.target.errorCode);
      };
      request.onsuccess = function(event) {
        console.log('request.onsuccess');
        database = request.result;
        //$scope.idb = database;
        //$scope.expenses = [];
      /*  spesen = [];
        var objectStore = database.transaction("spesen").objectStore("spesen");
        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {

            spesen.push(cursor.value);
            //alert("Note id: "+cursor.key+", Title: "+cursor.value.formBeschreibung);
            //$scope.expenses.push(cursor.value);
            cursor.continue();
          }
        };
*/
      };
      request.onupgradeneeded = function(event) {
        console.log('request.onupgradeneeded');
        var db = event.target.result;
        database = db;
        //$scope.idb = db;
        var objectStore = database.createObjectStore("spesen", { keyPath:  "key",autoIncrement:true});
      };

    }//IF window.indexed DB

//Public return methods.
  return {
    getSpesen: function(){
      spesen = [];
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

    getSpese: function(id){
      var spese = {}
      var objectStore = database.transaction("spesen").objectStore("spesen");
      objectStore.get(Number(id)).onsuccess = function(event) {
        spese = event.target.result;
      };
      return spese;
    },

    addSpesen: function(spesenobj){
      var transaction = database.transaction(["spesen"], "readwrite");
      var objectStore = transaction.objectStore("spesen");
      var request=objectStore.put(spesenobj);
      request.onsuccess = function(event) {
        console.log("entry added");
      };
    },
    getDb: function(){
      return database;
    },
    getRequest: function(){
      return request;
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
      };
      return account;
    }
  }
});
