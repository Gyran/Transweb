enyo.kind({
	name: "Toolbar",
	kind: enyo.Control,
	tag: "div",

	classes: "toolbar",

	create: function () {
		this.inherited( arguments );

		var addComponent = function( component ) {
			this.createComponent( component );

		}

		enyo.forEach( enyo.application.getToolbarComponents(), addComponent, this );
	}
})