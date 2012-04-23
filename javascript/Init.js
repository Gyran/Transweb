enyo.application = {
	transmissionSession: null,
	torrents: null,
	plugins: null,
	language: {
			loading: "Loading............"
		},
	selectedTorrents: [],
	torrentColumns: [ { name: "Status", field: "status" },
						{ name: "Name", field: "torrentName" }, 
						{ name: "Size", field: "totalSize" }, 
						{ name: "Done", field: "percentDone" },
						{ name: "Downloaded", field: "sizeWhenDone" },
						{ name: "Ratio", field: "uploadRatio" }, 
						{ name: "Date Added", field: "addedDate" },
						{ name: "Upload rate", field: "rateUpload" }, 
						{ name: "Download rate", field: "rateDownload" },
						{ name: "ETA", field: "eta" }
					],

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

	/* help functions */
	getSpeedUnit: function( bytes ) {
		if( bytes == 0 ) {
			return ;
		}
		n = Math.floor( Math.log( bytes ) / Math.log( this.transmissionSession.units.speed_bytes ) );
		return ( bytes / Math.pow( this.transmissionSession.units.speed_bytes, n ) ).toFixed(2) + ' ' + this.transmissionSession.units.speed_units[ n - 1 ];
	},

	getSizeUnit: function( bytes ) {
		if( bytes == 0 ) {
			return ;
		}
		n = Math.floor( Math.log( bytes ) / Math.log( this.transmissionSession.units.size_bytes ) );
		return ( bytes / Math.pow( this.transmissionSession.units.size_bytes, n ) ).toFixed(2) + ' ' + this.transmissionSession.units.size_units[ n - 1 ];
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

	/* Filter functions */
	filterAll: function( torrent ) {
		return true;
	},
	filterStopped: function( torrent ) {
		if( torrent.isStopped( ) ) {
			return true;
		}
		return false;
	},
	filterDownloading: function( torrent ) {
		if( torrent.isDownloading( ) ) {
				return true;
		}
		return false;
	},
	filterCompleted: function( torrent ) {
		if( torrent.isDone( ) ) {
				return true;
		}
		return false;
	},
	filterActive: function( torrent ) {
		if( torrent.isActive( ) ) {
				return true;
		}
		return false;
	},
	filterInactive: function( torrent ) {
		if( torrent.isInactive( ) ) {
				return true;
		}
		return false;
	},
	torrentFilterFunction: null
	/* /Filter functions */

}
/* default stuff */
enyo.application.torrentFilterFunction = enyo.application.filterAll;
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

	getTransmissionSession: function(inSender, inResponse){
		if(!inResponse){
			this.setContent("Transmission is not running");
		}else{
			enyo.application.transmissionSession = inResponse.arguments;
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