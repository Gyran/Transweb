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

		var response = function ( sender, response ) {
			if ( response.success ) {
				enyo.application.transmissionSession = new TransmissionSession( response.arguments );
				that.running = false;
				that.callback( "onTransmissionSessionUpdated" );
			} else {
				log( "Couldn't get transmission session. Error: " + response.message );
			}
		}

		new enyo.Ajax({url: "php/rpcconnection.php", method: "post" }).response( response ).go( { method: "transmissionSession" } );
	}
	
};