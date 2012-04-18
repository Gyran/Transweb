enyo.kind({
	name: "App",
	kind: enyo.Control,
	tag: "div",

	published: {
		plugins: []
	},

	components: [
		{ name: "smallLoading", kind: "SmallLoading", showing: false },
		{ name: "toolbar", kind: "Toolbar" },
		{ name: "torrentsList", kind: "TorrentTable" },
		{ name: "preferenceHolder", kind: "PreferenceHolder", showing: false },
		{ name: "detailsHolder", kind: "DetailsHolder" }
		//{ kind: enyo.Signals, onkeydown: "keydown", onkeyup: "keyup" }

		

	],


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
		t = this;
		//this.updateTimer = setInterval(enyo.bind(this, "waterfall", "onUpdate"), 2000);
	},

	forceUpdate: function( ) {
		this.waterfall( "onUpdate" );
	},

	update: function(){
        
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
	}

});
