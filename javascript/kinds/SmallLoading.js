enyo.kind({
	name: "SmallLoading",
	kind: enyo.Control,

	content: "Loading",
	tag: "div",

	waiters: 0,

	create: function() {
		this.inherited(arguments);
	},

	show: function() {;
		if( this.waiters++ <= 0 ) {
			this.inherited(arguments);
		}
	},

	hide: function() {
		if( --this.waiters <= 0 ) {
			this.inherited(arguments);	
		}
	}

});