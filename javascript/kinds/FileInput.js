enyo.kind({
    name: "FileInput",
    kind: enyo.Input,

    type: "file",

    published: {
        accept: undefined
    },

    create: function () {
        this.inherited( arguments );

        this.acceptChanged();
    },

    getValue: function(){
        return this.getNodeProperty( "files", null );
    },

    acceptChanged: function () {
        if ( this.accept !== undefined ) {
            this.setAttribute( "accept", this.accept );
        }
    }
});