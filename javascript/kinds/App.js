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
		{ name: "preferenceHolder", kind: "PreferenceHolder", showing: false }

		//{ kind: enyo.Signals, onkeydown: "keydown", onkeyup: "keyup" }

		//{ name: "inspector", kind: "Inspector" }

	],

	updateTimer: null,

	create: function(){
		this.inherited(arguments);
		this.initPlugins();
		t = this;
		//this.updateTimer = setInterval(enyo.bind(this, "waterfall", "onUpdate"), 2000);
	},

	update: function(){

	},

	initPlugins: function(){
		enyo.forEach(this.plugins, this.initPlugin, this);
	},

	initPlugin: function(plugin){

	},

	handlers: {
		onShowPref: "showPref",
		onUpdate: "update",
		onStartLoading: "startLoading",
		onStopLoading: "stopLoading"
	},

	keydown: function( sender, event ) {
		console.log(sender, event);
	},
	keyup: function( sender, event ) {
		console.log(event);
	},

	showPref: function(sender, prefKind){
		this.$.preferenceHolder.destroyClientControls();
		this.createComponent({
			kind: prefKind,
			container: this.$.preferenceHolder,
			classes: "TranswebApp"
		});
		this.$.preferenceHolder.render();
		this.$.preferenceHolder.show();
	},

	startLoading: function( sender ) {
		this.$.smallLoading.show();
	},

	stopLoading: function( sender ) {
		this.$.smallLoading.hide();
	}

});
