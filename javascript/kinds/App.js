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
				{ name: "smallLoading", kind: "SmallLoading", showing: false },
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

		this.addUpdater( new TorrentsUpdater( enyo.bind( this, "updatersCallback" ) ) );
		this.addUpdater( new TransmissionSessionUpdater( enyo.bind( this, "updatersCallback" ) ) );

		this.update();

		//this.updateTimer = setInterval(enyo.bind(this, "waterfall", "onUpdate"), 5000);
	},

	addUpdater: function ( updater ) {
		this.updaters.push( updater );
	},

	runUpdaters: function ( ) {
		this.startLoading();
		for ( i = 0 ; i < this.updaters.length ; ++i ) {
			this.updaters[i].update();
		}
	},

	forceUpdate: function( ) {
		this.waterfall( "onUpdate" );
	},

	update: function(){
        this.runUpdaters();
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

	updatersCallback: function ( event ) {
		this.stopLoading();
		this.waterfall( event );
	}

});

