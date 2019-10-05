Ext.define('GDPR.view.masterPages.TddrstatusGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.view_masterpages_tddrstatusgrid',

    requires: [
        'GDPR.view.main.MainController'
    ],
    controller: 'main',

    selType: 'rowmodel',

    autoScroll: true,
    
    initComponent: function() {
        var me = this;
        me.gridURL = GDPR.gbl.constants.URL_MASTER_PANEL_TDDRSTATUS;

        var rEditor = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 2 });
        me.plugins = [rEditor];

        me.buildItems(me, me.gridURL, rEditor);        
        this.callParent(arguments);

        me.on('render', me.loadStore, me, {_scope:me})
    },

    buildItems: function (me, gridURL, rEditor) {
        var modelConfig = {
            "modelName" : 'tddrstatusmodel',
            "modelRoot" : 'tddrstatus'
        }
        //Creating a dummy record for grids new entry
        var createRecordDummy = {ID: '0',statusType: '',statusDescription: ''}

        var tddrstatusmodel = Ext.define(modelConfig.modelName, {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'ID',                type: 'int'},
                {name: 'statusType',        type: 'string'},
                {name: 'statusDescription', type: 'string'}
            ]
        });
        //All the config changes above only
        me.columns = [{
                header: 'ID', dataIndex: 'ID',  flex: 0.5, hidden:false
            },{
                header: 'Status Type', dataIndex: 'statusType', flex: 1,
                editor: {
                    xtype: 'combobox',
                    queryMode: 'remote',
                    store: Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['ID', 'levelDescription'],
                        listeners: {
                            load: function(store,records,options) { 
                                store.removeAll();
                                store.add(GDPR.gbl.metadata.requestType.tstatusType);
                            }
                        }
                    }),

                    displayField: 'levelDescription',
                    valueField: 'ID',
                    //allowBlank: false,
                    editable: false,
                    forceSelection: true,
                    triggerAction: 'all'
                },
                renderer: function(value, metaData, record, row, col, store, gridView){
                    //url = data that will come on initial load as an array             
                    var columnObject = {"url": GDPR.gbl.metadata.requestType.tstatusType, "returnProperty": 'levelDescription' }
                    return me.utilityFx().recreateColumnRenderer(value, metaData, record, row, col, store, gridView, columnObject);
                }
            },{
                header: 'Status Description', dataIndex: 'statusDescription', flex: 1,
                editor: me.utilityFx().validateTextField()
            }
        ];
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