enyo.kind({
	name: "FoldersFilter",
	kind: enyo.Control,
	tag: "ul",

	handlers: {
		onUpdate: "update"
	},

	create: function( ) {
		this.inherited( arguments );
		this.update( );
	},

	update: function( ) {
		this.destroyClientControls( );
		enyo.forEach( enyo.application.getTorrents( ), this.addFolderFilter, this );
	},

	addFolderFilter: function( torrent ){
		
	}
});