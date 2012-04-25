enyo.kind({
	name: "FolderFilter",
	kind: enyo.Control,
	tag: "li",

	published: {
		folder: ""
	},

	handlers: {
		onTorrentsUpdated: "torrentsUpdated"
	},

	i: 0,

	create: function () {
		this.inherited( arguments );
		this.folderChanged();
		
	},

	folderChanged: function () {
		this.setContent( this.folder + " (" + this.i + ")" );
	},

	tap: function ( sender, event ) {
		enyo.application.setPref( "torrentFilterFunction", enyo.bind( this, "filterFunction" ) );
		this.bubble( "onForceUpdate" );
	},



	filterFunction: function ( torrent ) {
		var torrentFolder = torrent.getDownloadFolder();
		if ( torrentFolder === this.folder ) {
			return true;
		}
		return false;
	},

	torrentsUpdated: function ( ) {
		var t = this;
		t.i = 0;
		enyo.forEach( enyo.application.getTorrents( ), 
			function( torrent ) {
				if( t.filterFunction( torrent ) ){
					t.i++;
				}
		}, this );
		t.folderChanged( );
	}
});
