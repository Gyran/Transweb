enyo.kind({
	name: "PreferenceHolder",
	kind: enyo.Control,
	tag: "div",

	classes: "preference",

	handlers: {
		onShowPref: "showPref",
		onHidePref: "hidePref"
	},

	components: [
		{ kind: enyo.Button, content: "X", ontap: "closePrefs", classes: "closePrefButton" },
		{ name: "holder" }
	],

	showPref: function( sender, args ) {
		prefKind = args[0];
		this.$.holder.destroyClientControls();
		this.$.holder.createComponent({
			kind: prefKind,
		});
		this.$.holder.render();
		this.show();
	},

	hidePref: function( sender ) {
		this.hide();
	},

	closePrefs: function () {
		this.bubble( "onAnnounceEvent", { event: "onHidePref" } );
	}

});