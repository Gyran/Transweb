enyo.kind({
	name: "AddTorrentPref",
	kind: enyo.Control,
	tag: "div",
	content: "AddTorrentPref",
	classes: "addTorrentPref",

	components: [
		{ name: "downloadPath", kind: "SelectFolderInput" },
		{ name: "link", kind: enyo.Input, placeholder: "URL to torrent", type: "text" },
		{ kind: enyo.Button, content: "Add torrent", ontap: "addTorrentTap" },
		{ name: "close", kind: "Button", content: "Close", ontap: "closeTap" }
	],

	create: function(){
		this.inherited(arguments);
		this.$.downloadPath.setValue(enyo.application.transmissionSession.download_dir);
	},

	addTorrentTap: function(sender, e){
		url = this.$.link.getValue();
		path = this.$.downloadPath.getValue();
		new enyo.Ajax({url: "php/rpcconnection.php", method: "post" }).
			response(this, "torrentAdded").
			go({ method: "addTorrentURL",
				url: url,
				path: path });
	},

	closeTap: function(sender, e) {
		this.bubble( "onAnnounceEvent", { event: "onHidePref" } );
	},

	torrentAdded: function(sender, res){
		this.bubble( "onAnnounceEvent", { event: "onHidePref" } );
	}
});