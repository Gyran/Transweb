enyo.kind({
	name: "TorrentTable",
	kind: enyo.Control,
	tag: "table",

	components: [
		{ kind: "TorrentTableHead" }
	],

	handlers: {
		onUpdate: "update",
		onDeselectAll: "deselectAll",
		onSelectAll: "selectAll"
	},

	update: function(){
		this.listTorrents();
	},

	create: function () {
		this.inherited(arguments);
		this.update();
	},

	listTorrents: function(){
		this.bubble( "onStartLoading" );
		new enyo.Ajax( { url: "php/rpcconnection.php", method: "post" } ).response( this, "listTorrentsResponse" ).go( { method: "getAll" } );
	},

	listTorrentsResponse: function(inSender, inResponse) {
		enyo.application.torrents = inResponse.arguments.torrents;
		this.destroyClientControls();
		enyo.forEach(enyo.application.torrents, this.addTorrentToList, this);
		this.render();
		this.bubble( "onStopLoading" );
	},

	addTorrentToList: function(torrent){
		newTorrent = { kind: "Torrent", container: this };
		for( prop in torrent ) {
			if( prop == "name" ) {
				newTorrent[ "torrentName" ] = torrent[ prop ];
			}else if( prop == "id" ) {
				newTorrent[ "torrentId" ] = torrent[ prop ];
			}
			else {
				newTorrent[ prop ] = torrent[ prop ];
			}
		}

		if( enyo.application.selectedTorrents.indexOf(newTorrent.hashString) !== -1 ) {
			newTorrent.classes = "selected";
		}

		this.createComponent(newTorrent);
	},

	tap: function( sender, event ) {

	},

	deselectAll: function( ) {
		this.waterfall( "onDeselect" );
	},

	selectAll: function( ) {
		this.waterfall( "onSelect" );	
	}

});
