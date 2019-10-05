Ext.define('GDPR.view.masterPages.TdivisionGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.view_masterpages_tdivisiongrid',

    requires: [
        'GDPR.view.main.MainController'
    ],
    controller: 'main',
    
    selType: 'rowmodel',
    
    autoScroll: true,
    
    initComponent: function() { 
        var me = this;
        me.gridURL = GDPR.gbl.constants.URL_MASTER_PANEL_TDIVISION;

        var rEditor = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 2 });
        me.plugins = [rEditor];

        me.buildItems(me, me.gridURL, rEditor);
        this.callParent(arguments);

        me.on('render', me.loadStore, me, {_scope:me})
    },

    buildItems: function (me, gridURL, rEditor) {
        var modelConfig = {
            "modelName" : 'TDivisionModel',
            "modelRoot" : 'tdivision'
        }
        //Creating a dummy record for grids new entry
        var createRecordDummy = {ID: '0',divisionName: '',divisionMnemonic: ''}        
        
        me.TDivisionModel = Ext.define(modelConfig.modelName, {
            extend: 'Ext.data.Model',
            fields: [ 
                {name: 'ID',                    type: 'int'},
                {name: 'divisionName',          type: 'string'},
                {name: 'divisionMnemonic',      type: 'string'}
            ]
        });
        
        //All the config changes above only    
        me.columns = [{
            header: 'ID', dataIndex: 'ID', flex: 0.5, hidden:false
        },{
            header: 'Division Name', dataIndex: 'divisionName', flex: 1,
            editor: {
                xtype: 'textfield', allowBlank: false                    
            }
        },{
            header: 'Division Mnemonic', dataIndex: 'divisionMnemonic', flex: 1,
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