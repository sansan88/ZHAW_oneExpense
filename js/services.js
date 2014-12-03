angular.module('starter.services', [])


/*
 .factory('Spesen', function() {
  var spesen = [
    { id: 0, beschreibung: 'Beleg 1', kategorie: 'G', beginndatum: '', enddatum: '', belegdatum: '', belegwaehrung: 'CHF', betrag: '100.00', beleg: '' },
    { id: 1, beschreibung: 'Beleg 2', kategorie: 'G', beginndatum: '', enddatum: '', belegdatum: '', belegwaehrung: 'CHF', betrag: '100.00', beleg: ''},
    { id: 2, beschreibung: 'Beleg 3', kategorie: 'G', beginndatum: '', enddatum: '', belegdatum: '', belegwaehrung: 'CHF', betrag: '100.00', beleg: '' },
    { id: 3, beschreibung: 'Beleg 4', kategorie: 'G', beginndatum: '', enddatum: '', belegdatum: '', belegwaehrung: 'CHF', betrag: '100.00', beleg: '' }
  ];

  return {
    all: function(){
      return spesen;
    },
    get: function(spesenId){
      return spesen[spesenId];
    }
  }
 })
*/
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
