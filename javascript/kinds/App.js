enyo.kind({
	name: "App",
	kind: enyo.Control,
	tag: "div",

	published: {
		plugins: []
	},

	components: [
		{ name: "toolbar", kind: "Toolbar" },
		{ name: "torrentsList", kind: "TorrentTable" },
		{ name: "preferenceHolder", kind: "PreferenceHolder", showing: false }
		//{ name: "smallLoading", kind: "SmallLoading" },
		//{ name: "inspector", kind: "Inspector" }

	],

	updateTimer: null,

	create: function(){
		this.inherited(arguments);
		this.initPlugins();
		t = this;
		//this.updateTimer = setInterval(enyo.bind(this, "waterfall", "onUpdate"), 1000);
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
		onUpdate: "update"
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
	}
});
