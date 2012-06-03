enyo.application = {
	transmissionSession: null,
	torrents: null,
	plugins: null,
	language: {
			loading: "Loading............"
		},
	selectedTorrents: [],

/* Not used atm
	_RatioUseGlobal        : 0,
	_RatioUseLocal         : 1,
	_RatioUnlimited        : 2,

	_ErrNone               : 0,
	_ErrTrackerWarning     : 1,
	_ErrTrackerError       : 2,
	_ErrLocalError         : 3,

	_TrackerInactive       : 0,
	_TrackerWaiting        : 1,
	_TrackerQueued         : 2,
	_TrackerActive         : 3,
*/
	_PREF_SORT_DESC        : 0,
	_PREF_SORT_ASC         : 1,

	/* help functions */
	getSpeedUnit: function( bytes ) {
		var units = this.transmissionSession.getUnits();
		if( bytes === 0 ) {
			return ;
		}
		n = Math.floor( Math.log( bytes ) / Math.log( units.getSpeedBytes() ) );
		return ( bytes / Math.pow( units.getSpeedBytes(), n ) ).toFixed( 2 ) + ' ' + units.getSpeedUnit( n - 1 );
	},

	getSizeUnit: function( bytes ) {
		var units = this.transmissionSession.getUnits();
		if( bytes === 0 ) {
			return ;
		}
		n = Math.floor( Math.log( bytes ) / Math.log( units.getSizeBytes() ) );
		return ( bytes / Math.pow( units.getSizeBytes(), n ) ).toFixed( 2 ) + ' ' + units.getSizeUnit( n - 1 );
	},

	getTimeFromMiliSec: function ( msec ) {
		return this.getTimeFromSec( msec / 1000 );
	},

	getTimeFromSec: function( secs ) {
		ret = "";

		d = Math.floor( secs / 86400 );
		h = Math.floor( (secs % 86400) / 3600 );
		m = Math.floor( (secs % 3600) / 60 );
		s = Math.floor( secs % 60 );

		if( d ) {
			ret += d + " d";
		}
		if( h ) {
			ret += " " + h + " h";
		}
		if( m ) {
			ret += " " + m + " m";
		}
		if( s ) {
			ret += " " + s + " s";
		}

		return ret;
	},

	/* ****** */

	getTorrents: function( ) {
		return this.torrents;
	},

	destoryTorrents: function( ) {
		this.torrents = [ ];
	},

	addTorrent: function( torrent ) {
		this.torrents.push( torrent );
	},

	selectTorrent: function( hash ) {
		this.selectedTorrents.push( hash );
	},

	deselectTorrent: function( hash ) {
		index = this.selectedTorrents.indexOf( hash );
		if( index !== -1 ) {
			this.selectedTorrents.splice( index, 1 );
		}
	},

	deselectAllTorrents: function ( ) {
		this.selectedTorrents = [ ];
	},

	getSelectedTorrents: function ( ) {
		return this.selectedTorrents;
	},

	prefs: {
		torrentCompareFunction: null,
		torrentFilterFunction: null,
		torrentSortDirection: 0,
	},

	getPref: function ( key ) {
		return this.prefs[key];
	},

	setPref: function ( key, value ) {
		this.prefs[key] = value;
	}
}
/* default preference */
enyo.application.setPref( "torrentFilterFunction", Torrent.filterAll );
enyo.application.setPref( "torrentCompareFunction", Torrent.compareByAddedDate );
enyo.application.setPref( "torrentSortDirection", enyo.application._PREF_SORT_DESC );
/*****/

enyo.kind({
	name: "Init",
	kind: enyo.Control,

	plugins: null,
	pluginsLoaded: false,


	tag: "div",
	content: enyo.application.language.loading,

	create: function(){
		this.inherited(arguments);
		// Is transmission running?
		new enyo.Ajax({url: "php/rpcconnection.php", method: "post" }).response(this, "getTransmissionSession").go({method: "transmissionSession"});

	},

	init: function(){
		this.waitUntilReady();
	},

	getTransmissionSession: function(sender, response){
		if( !response.success ){
			this.setContent("Could not connect to Transmission. Check settings and make sure Transmission is running.\n Got error: " + response.message );
		}else{
			enyo.application.transmissionSession = new TransmissionSession( response.arguments );
			this.init();
		}
	},

	waitUntilReady: function(){
		if( true ){
			this.initApp();
		}else{
			setTimeout(enyo.bind(this, "waitUntilReady"), 10);	
		}
	},

	initApp: function(){
		app = new App();
		
		app.renderInto(document.body);
		this.destroy();
	}

});