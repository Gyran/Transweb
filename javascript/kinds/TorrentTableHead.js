enyo.kind({
	name: "TorrentTableHead",
	kind: enyo.Control,
	tag: "tr",
	
	create: function(){
		this.inherited(arguments);
		this.generateComponents();
	},

	generateComponents: function(){
		enyo.forEach(enyo.application.torrentColumns, this.addThComponent, this);
	},

	addThComponent: function( component ){
		this.createComponent({
			kind: "TorrentTableHeadCell",
			content: component.name,
			container: this,
			compareFunction: component.compareFunction
		});
	}

});