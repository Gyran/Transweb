function TransmissionSessionUpdater( cb ) {
	this.running = false;
	this.callback = cb;
}

TransmissionSessionUpdater.prototype = {
	update: function( ) {
		var that = this;

		if ( that.running ) {
			return;
		}
		that.running = true;

		response = function ( sender, response ) {
			enyo.application.transmissionSession = response.arguments;
			that.running = false;
			that.callback( "onTransmissionSessionUpdated" );

		}

		new enyo.Ajax({url: "php/rpcconnection.php", method: "post" }).response( response ).go( { method: "transmissionSession" } );
	}
	
};