enyo.kind({
    name: "DeleteTorrentAndFilesToolbarButton",
    kind: enyo.Button,

    content: "Delete torrent and files",

    tap: function( sender, event ) {

        if ( confirm("Are you sure you want to delete the selected torrents and all of their files?") ) {

            if ( enyo.application.getSelectedTorrents().length <= 0 ) {
                return;
            }

            this.bubble( "onStartLoading" );
            new enyo.Ajax({url: "php/rpcconnection.php", method: "post" })
            .response(this, "deleted")
            //.go( { method: "deleteTorrentsAndFiles", 'torrents[]': enyo.application.getSelectedTorrents() } ); 
            // if deleting more then one torrent the rpc gives incorrect data
            .go( { method: "deleteTorrentsAndFiles", 'torrents[]': enyo.application.getSelectedTorrents()[0] } );
        }
    },

    deleted: function( sender, response ) {
        this.bubble( "onStopLoading" );
        this.bubble( "onDoNotify", { title: "Deleted", message: "The torrent and its files are deleted." } );
    }


    

});