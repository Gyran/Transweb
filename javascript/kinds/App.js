enyo.kind({
	name: "App",
	kind: enyo.Control,
	tag: "div",

	classes: "app floatcontainer",

	components: [
		{ tag: "div", classes: "leftColumn",
			components: [
				{ name: "panel", kind: "Panel" }
			] 
		},
		{ tag: "div", classes: "rightColumn",
			components: [
				{ name: "smallLoading", kind: "SmallLoading", classes: "smallLoading", showing: false },
				{ name: "toolbar", kind: "Toolbar" },
				{ name: "torrentTable", kind: "TorrentTableHolder" },
				{ name: "preferenceHolder", kind: "PreferenceHolder", showing: false },
				{ name: "detailsHolder", kind: "DetailsHolder" }
			]
		//{ kind: enyo.Signals, onkeydown: "keydown", onkeyup: "keyup" }
		}
	],

	updaters: [ ],

    handlers: {
        onUpdate: "update",
        onStartLoading: "startLoading",
        onStopLoading: "stopLoading",
        onForceUpdate: "forceUpdate",
        onAnnounceEvent: "announceEvent"
    },

	updateTimer: null,

	create: function(){
		this.inherited(arguments);
		this.initPlugins();

		this.addUpdater( enyo.bind( this, "updateTorrents" ) );
		this.addUpdater( enyo.bind( this, "updateTransmissionSession" ) );

		this.update( );

		this.updateTimer = setInterval(enyo.bind(this, "waterfall", "onUpdate"), 1000);
	},

	addUpdater: function ( updater ) {
		this.updaters.push( updater );
	},

	runUpdaters: function ( ) {
		for ( i = 0 ; i < this.updaters.length ; ++i ) {
        	this.updaters[i].call( this );

		}
	},

	forceUpdate: function( ) {
		this.waterfall( "onUpdate" );
	},

	update: function(){
        this.runUpdaters( );
	},

	initPlugins: function(){
		enyo.forEach(this.plugins, this.initPlugin, this);
	},

	initPlugin: function(plugin){

	},

	announceEvent: function( sender, obj ) {
		this.waterfall( obj.event, obj.arguments );
	},

	startLoading: function( sender ) {
		this.$.smallLoading.show();
	},

	stopLoading: function( sender ) {
		this.$.smallLoading.hide();
	},


	/* Updaters */
	updateTorrents: function ( ) {
		var that = this;

		addTorrent = function( torrent ) {
			t = new Torrent( );
			t.fill(torrent);
			enyo.application.addTorrent( t );
		}

		response = function ( sender, response ) {
			that.stopLoading( );
			enyo.application.destoryTorrents( );
			enyo.forEach( response.arguments.torrents, addTorrent , this );
			that.waterfall( "onTorrentsUpdated" );
		}

		this.startLoading( );
		new enyo.Ajax( { url: "php/rpcconnection.php", method: "post" } )
		.response( response )
		.go( { method: "getAll" } );
	},

	updateTransmissionSession: function ( ) {
		var that = this;
		response = function ( sender, response ) {
			that.stopLoading( );
			enyo.application.transmissionSession = response.arguments;
			that.waterfall( "onTransmissionSessionUpdated" );
		}

		that.startLoading( );
		new enyo.Ajax({url: "php/rpcconnection.php", method: "post" }).response( response ).go( { method: "transmissionSession" } );
	}



});
