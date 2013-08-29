node-fiidmi
===========

Asynchronous [Fiidmi API](http://fiidmi.fi/) module for Node.js.

Installation
------------

You can install it from the NPM: `npm install fiidmi`

Usage
-----

#### Setting up

First you declare an instance of `Fiidmi`:

```javascript
var Fiidmi = require('./Fiidmi.js');
var api = new Fiidmi({'hostname':'testapi.fiidmi.fi'});
```

#### Single API call

Then API calls can be done like this:

```javascript
api.servicePolicy({'language':'fi'}).then(function(api) {
	var fi = api.fetch();
	console.log('Data: ' + JSON.stringify(fi, null, 2));
}).fail(function(err) {
	console.error('Error: '+util.inspect(err));
}).done();
```

..where `fi` will be:

```json
{
  "policy": "Rekisteriseloste\n-----\n\nRekisterinpitäjä\n---\nSLM Finland Oy\nKauppakaari 15\n04250 Kerava\ntel. +358-9-428 99189\nY-tunnus: 1936684-6\n\nRekisteriasioita hoitava henkilö\n---\nnimi:  SLM Finland Oy / Miia Vento\ntel. +358-9-428 99189\ngsm:  +358 453 259 090\nsposti: miia.vento(at-merkki)slm.fi\n\nRekisterin nimi\n---\nSLM Finland Oy:n asiakasrekisteri\n\nRekisterin pitämisen peruste\n---\nHenkilö on rekisteröitynyt palveluiden asiakkaaksi tai tilannut tuotteita\npalveluiden kautta. Palveluiden käyttö, kuten ravintoloiden tietojen haku,\narvostelu ym. ei edellytä rekisteröitymistä. Hän voi rekisteröidä itselleen\nhaluamansa vapaana oleva käyttäjätunnuksen sekä määritellä tälle haluamansa\nsalasanan, jota tunnusta käytetään täällä määritettyjen tietojen tallennukseen.\nPalveluista tilaaminen rekisteröi tilaajan automaattisesti palvelun käyttäjäksi\nja palvelu muodostaa automaattisesti käyttäjälle käyttäjätunnuksen ja\nsalasanan.\n\nRekisterin käyttötarkoitus\n---\nRekisterin käyttötarkoitus on palveluiden asiakasrekisterin ylläpitäminen sekä\nasiakkaiden tilausten arkistointi ja käsittely. Rekisterin tietoja\nvoidaan käyttää mainontaan ja tiedotuksiin, jos käyttäjä on siihen myöntänyt\nluvan.\n\nAsiakkaalla on oikeus kieltää tietojen julkaiseminen ilmoittamalla siitä\nrekisterin ylläpitäjälle.\n\nRekisterin sisältämät tiedot\n---\nHenkilörekisteri sisältää seuraavia tietoja\n\n- henkilön etu- ja sukunimi\n- sähköpostiosoite\n- postiosoite\n- asiakasnumero\n- puhelinnumero\n- tilausten tiedot\n\nAsiakkaan sijainnin koordinaattien käyttö ja tallennus (sijaintitiedot)\n---\nSijaintitietoja käytetään asiakkaan lähellä olevien palveluiden paikallistamiseen\nja etäisyyden laskentaan. Sijaintitietoja ei tallenneta taustapalveluun.\n\nTietojen luovutus\n---\nTietoja ei luovuteta ulkopuolisille. Rekisteröityneen henkilötiedot hävitetään\nkäyttäjän pyynnöstä.\n"
}
```

#### Chaining multiple API calls

Then API calls can chained like this:

```javascript
api.servicePolicy({'language':'fi'}).servicePolicy({'language':'en'}).then(function(api) {
	var fi = api.fetch();
	var en = api.fetch();
	console.log('--finnish--\n' + fi.policy + '\n--eof--');
	console.log('--english--\n' + en.policy + '\n--eof--');
}).fail(function(err) {
	console.error('Error: '+util.inspect(err));
}).done();
```

You can read more about these chained promises from [`nor-extend`](https://github.com/sendanor/nor-extend#nor-extend).

API Reference
-------------

The current [Fiidmi API](http://fiidmi.fi/documentation/) release we use is version 3.3.

Calls are identical with the API name except that '/' and '_' are translated like this:

* `/customer/restaurants/delete` -> `.customerRestaurantsDelete([opts])`
* `/customer/order_history/list` -> `.customerOrderHistoryList([opts])`

Every call will return with a chainable [promise](https://github.com/sendanor/nor-extend#nor-extend) of the instance of API itself, where you can use `.fetch()` to get 
values from the operations.

So if you call `p.servicePolicy()` it is same as `p.then(function(obj) { return obj.servicePolicy(); })`.

You may also use optional leeding `$` in the begining of all promise calls if you want to sort out that it's a promise method: `p.servicePolicy()` is an alias of `p.$servicePolicy()`.

License
-------

It's open source, [the MIT License](https://raw.github.com/tidhr/node-fiidmi/master/LICENSE).
