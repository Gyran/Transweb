enyo.torrentColumns = [ { name: "Id" }, { name: "Name" }, { name: "Done" } ,{ name: "Ratio" }, { name: "Date Added" }, { name: "Upload rate" }, 
						{ name: "Download rate"} ];

enyo.kind({
	name: "TorrentTableHead",
	kind: enyo.Control,
	tag: "tr",
	create: function(){
		this.inherited(arguments);
		this.generateComponents();
	},

	generateComponents: function(){
		enyo.forEach(enyo.torrentColumns, this.addThComponent, this);
	},

	addThComponent: function(component){
		this.createComponent({
			kind: "TorrentTableHeadCell",
			content: component.name,
			container: this
		});
	}

});