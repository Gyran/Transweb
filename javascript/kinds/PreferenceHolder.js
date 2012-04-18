enyo.kind({
	name: "PreferenceHolder",
	kind: enyo.Control,
	tag: "div",

	handlers: {
		onShowPref: "showPref"
	},

	showPref: function( sender, args ) {
		prefKind = args[0];
		this.destroyClientControls();
		this.createComponent({
			kind: prefKind,
			container: this
		});
		this.render();
		this.show();
	}
});