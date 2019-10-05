Ext.define('GDPR.view.masterPages.TsystemGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.view_masterpages_tsystemgrid',

    requires: [
        'GDPR.view.main.MainController'
    ],
    controller: 'main',
   
    selType: 'rowmodel',

    autoScroll: true,
    
    initComponent: function() { 
        var me = this;
        me.gridURL = GDPR.gbl.constants.URL_MASTER_PANEL_TSYSTEM;

        var rEditor = Ext.create('Ext.grid.plugin.CellEditing', { licksToEdit: 2 });
        me.plugins = [rEditor];

        me.buildItems(me, me.gridURL, rEditor);
        this.callParent(arguments);

        me.on('render', me.loadStore, me, {_scope:me})
    },

    buildItems: function (me, gridURL, rEditor) {  
        var modelConfig = {
            "modelName" : 'TSystem',
            "modelRoot" : 'tsystem'
        }
        //Creating a dummy record for grids new entry
        var createRecordDummy = {ID: '0', systemName: '', systemDescription: '', systemEntryPoint: ''}
                
        me.TScope = Ext.define(modelConfig.modelName, {
            extend: 'Ext.data.Model',
            fields: [ 
                {name: 'ID',                type: 'int'},
                {name: 'systemName',        type: 'string'},
                {name: 'systemDescription', type: 'string'},
                {name: 'systemEntryPoint',  type: 'string'}
            ]
        });
        
        //All the config changes above only    
        me.columns = [{
            header: 'ID', dataIndex: 'ID', flex: 0.5, hidden:false
        },{
            header: 'System Name', dataIndex: 'systemName', flex: 1,
            editor: {
                xtype: 'textfield', allowBlank: false
            }
        },{
            header: 'System Description', dataIndex: 'systemDescription', flex: 1,
            editor: {
                xtype: 'textfield', allowBlank: false
            }
        },{
            header: 'System Entry Point', dataIndex: 'systemEntryPoint', flex: 2,
            editor: {
                xtype: 'textfield', allowBlank: false
            }
        }];
        this.store = me.utilityFx().createJsonStoreForGrids(modelConfig.modelName, gridURL, modelConfig.modelRoot)
        //Create a new record to the grid
        var newRecord = createRecordDummy;
        me.tbar = me.utilityFx().createToolbar(modelConfig.modelName, newRecord, rEditor, me)
    },

    loadStore: function(obj, _ref){         
        //obj.store = Ext.data.StoreManager.lookup('GDPR.store.TddrstatusStore')
        obj.getStore().getProxy().url = _ref._scope.gridURL;         
        obj.getStore().load();
    },

    utilityFx: function(){
        return Ext.create('widget.gdpr_common_utility_functions');
    }
});