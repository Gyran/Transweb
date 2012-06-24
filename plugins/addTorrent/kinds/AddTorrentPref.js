enyo.kind({
	name: "AddTorrentPref",
	kind: enyo.Control,
	tag: "div",
	classes: "addTorrentPref",

	components: [
		{ name: "downloadPath", kind: "SelectFolderInput" },
		{ name: "link", kind: enyo.Input, placeholder: "URL to torrent", type: "text" },
		{ tag: "div", components: [
			{ tag: "label", components: [
				{ name: "file", kind: "FileInput", accept: "application/x-bittorrent" },
				{ tag: "span", content: "Torrent file" },
				] }
			] },
		{ tag: "br" },
		{ kind: enyo.Button, content: "Add torrent", ontap: "addTorrentTap" }
	],

	create: function(){
		this.inherited(arguments);
		this.$.downloadPath.setValue( enyo.application.transmissionSession.getDownloadDir() );
	},

	addTorrentTap: function(sender, e){
		var path = this.$.downloadPath.getValue();
		var url = this.$.link.getValue();

		if( url !== "" ) {
			new enyo.Ajax( { url: "plugins/addTorrent/addTorrent.php", method: "post" } ).
			response(this, "torrentAdded").
			go({ method: "addTorrentURL",
				url: url,
				path: path });
		} else {
			/* Cant get enyo to work with posting the FormData so for now I don't use the enyo implmentation for the ajax call */

			var fd = new FormData();
			file = this.$.file.getValue()[0];
			fd.append( "torrent", file );
			fd.append( "path", path );
			fd.append( "method", "addTorrentFile" );

			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'plugins/addTorrent/addTorrent.php', true);

			var t = this;

			xhr.onload = function() {
				if (this.status == 200) {
					var resp = JSON.parse(this.response);
					t.torrentAdded( t, resp );
				};
			};

			xhr.send(fd);
			
		}
		
		
	},
	
	torrentAdded: function ( sender, response ){
		if ( response.success ) {
        	this.bubble( "onDoNotify", { title: "Torrent added", message: "The torrent was added successfully" } );
			this.bubble( "onAnnounceEvent", { event: "onHidePref" } );
		} else {
        	this.bubble( "onDoNotify", { title: "Torrent not added", message: response.message } );
		}
	}
});