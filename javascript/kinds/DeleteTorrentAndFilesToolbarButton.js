enyo.kind({
    name: "DeleteTorrentAndFilesToolbarButton",
    kind: enyo.Button,

    content: "Delete torrent and files",

    tap: function( sender, event ) {
        if( enyo.application.selectedTorrents.length <= 0 ) {
            return;
        }

        this.bubble( "onStartLoading" );
        new enyo.Ajax({url: "php/rpcconnection.php", method: "post" })
        .response(this, "deleted")
        .go( { method: "deleteTorrentsAndFiles", 'torrents[]': enyo.application.selectedTorrents } );
    },

    deleted: function( sender, response ) {
        this.bubble( "onStopLoading" );
    }


    

});