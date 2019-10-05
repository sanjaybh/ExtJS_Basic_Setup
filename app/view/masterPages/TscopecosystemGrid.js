Ext.define('GDPR.view.masterPages.TscopecosystemGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.view_masterpages_tscopecosystemGrid',

    requires: [
        'GDPR.view.main.MainController'
    ],
    controller: 'main',
   
    selType: 'rowmodel',
    
    autoScroll: true,
    
    initComponent: function() { 
        var me = this;
        me.gridURL = GDPR.gbl.constants.URL_MASTER_PANEL_TSCOPE_COCOMPANY;

        var rEditor = Ext.create('Ext.grid.plugin.CellEditing', { licksToEdit: 2 });
        me.plugins = [rEditor];

        me.buildItems(me, me.gridURL, rEditor);
        this.callParent(arguments);

        me.on('render', me.loadStore, me, {_scope:me})
    },

    buildItems: function (me, gridURL, rEditor) {  
        var modelConfig = {
            "modelName" : 'TScopeCoSystem',
            "modelRoot" : 'tscopecosystem'
        }
        //Creating a dummy record for grids new entry
        var createRecordDummy = {ID: '0', scopeID: '', coSystemID: ''}
                
        me.TScope = Ext.define(modelConfig.modelName, {
            extend: 'Ext.data.Model',
            fields: [ 
                {name: 'ID',                 type: 'int'},
                {name: 'scopeID',            type: 'int'},
                {name: 'coSystemID',         type: 'int'}
            ]
        });

        //All the config changes above only
        me.columns = [{
            header: 'ID', dataIndex: 'ID', flex: 0.5, hidden:false
        },{
            header: 'Scope ID', dataIndex: 'scopeID', flex: 1,
            editor: {
                xtype: 'combobox',
                queryMode: 'local',
                store: Ext.create('Ext.data.Store', {
                    fields: ['ID', 'scopeName'],
                    data: GDPR.gbl.metadata.scopeData.tscope
                }),
                displayField: 'scopeName',
                valueField: 'ID',
                //allowBlank: false,
                editable: false,
                forceSelection: true,
                triggerAction: 'all'
            },
            renderer: function(value, metaData, record, row, col, store, gridView){
                //url = data that will come on initial load as an array
                var columnObject = {"url": GDPR.gbl.metadata.scopeData.tscope, "returnProperty": 'scopeName' }
                return me.utilityFx().recreateColumnRenderer(value, metaData, record, row, col, store, gridView, columnObject);
            }
        },{
            header: 'Company System ID', dataIndex: 'coSystemID', flex: 1,
            editor: {
                xtype: 'combobox',
                queryMode: 'local',
                store: Ext.create('Ext.data.Store', {
                    fields: ['ID', 'systemID'],
                    data: GDPR.gbl.metadata.companySystemData.tcompanysystem
                }),
                displayField: 'systemID',
                valueField: 'ID',
                //allowBlank: false,
                editable: false,
                forceSelection: true,
                triggerAction: 'all'
            },
            renderer: function(value, metaData, record, row, col, store, gridView){
                //url = data that will come on initial load as an array
                var columnObject = {"url": GDPR.gbl.metadata.companySystemData.tcompanysystem, "returnProperty": 'systemID' }
                return me.utilityFx().recreateColumnRenderer(value, metaData, record, row, col, store, gridView, columnObject);
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