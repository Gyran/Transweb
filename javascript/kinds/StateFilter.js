enyo.kind({
	name: "StateFilter",
	kind: enyo.Control,
	tag: "li",

	published: {
		stateName: "All",
		filterFunction: null
	},
	i: 0,

	handlers: {
		onUpdate: "update"
	},

	create: function( ) {
		this.inherited( arguments );
		this.update( );
	},

	stateNameChanged: function( ) {
		this.setContent( this.stateName + " (" + this.i + ")" );
	},

	tap: function( sender, event ) {
		enyo.application.torrentFilterFunction = this.filterFunction;
		this.bubble( "onForceUpdate" );
	},

	update: function( ) {
		var t = this;
		t.i = 0;
		enyo.forEach( enyo.application.getTorrents( ), 
			function( torrent ) {
				if( t.filterFunction( torrent ) ){
					t.i++;
				}
		}, this );
		t.stateNameChanged( );
	}


});
