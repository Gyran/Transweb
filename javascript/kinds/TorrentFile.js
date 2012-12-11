enyo.kind({
    name: "TorrentFile",
    kind: enyo.Control,
    tag: "tr",

    published: {
        file: null,
        fileStats: null
    },

    components: [
        { name: "fileName", tag: "td" },
        { name: "size", tag: "td" },
        { name: "downloaded", tag: "td" },
        { name: "done", tag: "td" },
        { tag: "td", components: [
            { name: "priority", kind: enyo.Select, onchange: "priorityChanged", components: [
                { content: FileStats._DONT_DOWNLOAD_NAME, value: FileStats._DONT_DOWNLOAD },
                { content: FileStats._PRIORITY_LOW_NAME, value: FileStats._PRIORITY_LOW },
                { content: FileStats._PRIORITY_NORMAL_NAME, value: FileStats._PRIORITY_NORMAL },
                { content: FileStats._PRIORITY_HIGH_NAME, value: FileStats._PRIORITY_HIGH }
            ] }
        ] }
    ],


    create: function() {
        this.inherited( arguments );

        this.fileName();
        this.size();
        this.downloaded();
        this.done();
        this.priority();
    },

    fileName: function () {
        this.$.fileName.setContent( this.file.getFileName() );
    },

    size: function () {
        this.$.size.setContent( enyo.application.getSizeUnit( this.file.getLength() ) );
    },

    downloaded: function () {
        this.$.downloaded.setContent( enyo.application.getSizeUnit( this.file.getBytesCompleted() ) );
    },

    done: function () {
        var percent = this.file.getBytesCompleted() / this.file.getLength();
        this.$.done.setContent( (percent * 100).toFixed( 0 ) + "%" );
    },

    priority: function () {
        var select = 0;
        switch ( this.fileStats.getPriority() ) {
            case FileStats._PRIORITY_NORMAL:
                select = 2;
                break;
            case FileStats._PRIORITY_HIGH:
                select = 3;
                break;
            case FileStats._PRIORITY_LOW:
                select = 1;
                break;
            default:
                break;
        }
        this.$.priority.setSelected( select );
    },

    priorityChanged: function ( sender, event ) {
        priority = sender.getValue();
        file = this.file.getName();
        
        new enyo.Ajax({url: "php/rpcconnection.php", method: "post" }).response( null ).
            go( { method: "setFilePriority",
                file: this.file.getName(),
                priority: sender.getValue(),
                'torrents[]': enyo.application.getSelectedTorrents()
                 } );

    }


});
