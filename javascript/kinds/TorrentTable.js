enyo.kind({
	name: "TorrentTable",
	kind: enyo.Control,
	tag: "table",

	components: [
		{ kind: "TorrentTableHead" }
	],

	handlers: {
		onUpdate: "update"
	},

	update: function(){
		console.log("updating torrentable");
		this.listTorrents();
	},

	create: function () {
		this.inherited(arguments);
		this.listTorrents();
	},

	listTorrents: function(){
		torrents = new enyo.Ajax({url: "php/rpcconnection.php", method: "post"}).response(this, "listTorrentsResponse").go({method: "getAll"});
	},

	listTorrentsResponse: function(inSender, inResponse) {
		this.destroyClientControls();
		enyo.forEach(inResponse.arguments.torrents, this.addTorrentToList, this);
		this.render();
	},

	addTorrentToList: function(torrent){
		this.createComponent({
				kind: "Torrent",
				container: this,
				id: torrent.id,
				torrentName: torrent.name,
				uploadRatio: torrent.uploadRatio,
				addedDate: torrent.addedDate,
				rateUpload: torrent.rateUpload,
				rateDownload: torrent.rateDownload,
				percentDone: torrent.percentDone

		});
	}
});
