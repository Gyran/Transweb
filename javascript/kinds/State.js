enyo.kind({
	name: "State",
	kind: enyo.Control,
	tag: "li",

	published: {
		stateName: "all",
		filterFunction: null
	},

	create: function( ) {
		this.inherited( arguments );
		this.stateNameChanged( );
	},

	stateNameChanged: function( ) {
		this.content = this.stateName;
	},

	tap: function( sender, event ) {
		enyo.application.torrentFilterFunction = this.filterFunction;
		this.bubble( "onForceUpdate" );
	}


});
