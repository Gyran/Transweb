enyo.kind({
	name: "Panel",
	tag: "div",
	classes: "panel",

	create: function () {
		this.inherited( arguments );

		var addComponent = function( component ) {
			this.createComponent( component );

		}

		enyo.forEach( enyo.application.getPanelComponents(), addComponent, this );
	}
});