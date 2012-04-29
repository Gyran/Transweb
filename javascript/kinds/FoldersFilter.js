enyo.kind({
	name: "FoldersFilter",
	kind: enyo.Control,
	tag: "ul",

	handlers: {
		onTorrentsUpdated: "torrentsUpdated"
	},

	folders: [],

	create: function( ) {
		this.inherited( arguments );
	},

	filterFolders: function( torrent ) {
		var folder = torrent.getDownloadFolder();

		if ( enyo.indexOf( folder, this.folders ) === -1 ) {
			this.folders.push( folder );
		}
	},

	addFolderFilter: function ( folder ) {
		this.createComponent({
			kind: "FolderFilter",
			folder: folder
		});
	},


	torrentsUpdated: function( sender ) {
		this.folders = [];
		this.destroyClientControls( );
		enyo.forEach( enyo.application.getTorrents( ), enyo.bind( this, "filterFolders" ), this );
		this.folders.sort( function ( a, b ){
			an = a.toLowerCase();
			bn = b.toLowerCase();
			return ( an.localeCompare( bn ) );
		});
		enyo.forEach( this.folders, enyo.bind( this, "addFolderFilter" ), this );
		this.render();
	}
});