enyo.kind({
	name: "AddTorrentToolbarButton",
	kind: enyo.Button,
	content: "Add torrent",

	tap: function(inSender, inEvent){
		this.bubble( "onAnnounceEvent", { event: "onShowPref", arguments: [ "AddTorrentPref" ] } );
		//this.bubble("onShowPref", "AddTorrentPref");
	},

	pref: function(){
		console.log("onShowPref in AddTorrentToolbarButton");
	}



});