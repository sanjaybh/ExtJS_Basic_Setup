Ext.define('GDPR.view.centralPanel.LeftTree', {
    xtype:'view_centralPanel_lefttree',

    extend: 'Ext.tree.Panel',

    requires: [
        'GDPR.view.main.MainController'
    ],
    
    controller: 'main',

    minWidth: 200,
    maxWidth: 400,

    useArrows: false,
    rootVisible: false,
    style: 'margin: 5px',
    
    layout : {type: 'vbox',align: 'stretch'},

    initComponent: function() {
         var treeStore = Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                url: GDPR.gbl.constants.URL_WEST_PANEL,
                reader: {
                    type: 'json',
                    _rootProperty: 'treedata' 
                }
            },
            listeners: {
                load : function(store) {
                    store.each(function(record) {
                        //console.log(Ext.encode(record.data))
                       //record.commit();
                   }); 
                } 
            },
            root: {
                text: 'GDPR - Data Deletion Request 1.0',
                expanded: true
            },
            sorters: [{
                property: 'text',
                direction: 'asc'
            }]
        });
        this.store = treeStore;        

        this.listeners = {
            itemclick: 'onTreeItemClick',
            load: function(){
                //console.log("Store is loaded properly");
                var node = this.getStore().findNode('sno', '1');
                this.getSelectionModel().select(node);
            }
        };
        this.callParent(arguments);
    }
});