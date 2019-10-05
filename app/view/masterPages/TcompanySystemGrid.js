Ext.define('GDPR.view.masterPages.TcompanySystemGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.view_masterpages_tcompanysystemgrid',

    requires: [
        'GDPR.view.main.MainController'
    ],
    controller: 'main',
   
    selType: 'rowmodel',
    
    autoScroll: true,
    
    initComponent: function() { 
        var me = this;
        me.gridURL = GDPR.gbl.constants.URL_MASTER_PANEL_TCOMPANY_SYSTEM;

        var rEditor = Ext.create('Ext.grid.plugin.CellEditing', { licksToEdit: 2 });
        me.plugins = [rEditor];

        me.buildItems(me, me.gridURL, rEditor);
        this.callParent(arguments);

        me.on('render', me.loadStore, me, {_scope:me})
    },

    buildItems: function (me, gridURL, rEditor) {  
        var modelConfig = {
            "modelName" : 'TCompanySystem',
            "modelRoot" : 'tcompanysystem'
        }
        //Creating a dummy record for grids new entry
        var createRecordDummy = {ID: '00', companyID: '', systemID: '', responsiblePersonID: ''}
                
        me.TScope = Ext.define(modelConfig.modelName, {
            extend: 'Ext.data.Model',
            fields: [ 
                {name: 'ID',                    type: 'int'},
                {name: 'companyID',             type: 'int'},
                {name: 'systemID',              type: 'int'},
                {name: 'responsiblePersonID',   type: 'int'}
            ]
        });

        //All the config changes above only
        me.columns = [{
            header: 'ID', dataIndex: 'ID', flex: 0.5, hidden:false
        },{
            header: 'Company ID', dataIndex: 'companyID', flex: 1,
            editor: {
                xtype: 'combobox',
                autoDestroyBoundStore: true,
                queryMode: 'remote',
                store: Ext.create('Ext.data.Store', {
                    autoDestroy: true,
                    fields: ['ID', 'companyName'],
                    listeners: {
                        load: function(store,records,options) {
                            store.removeAll();
                            store.add(GDPR.gbl.metadata.companyData.tcompany);
                        }
                    }
                }),                
                displayField: 'companyName',
                valueField: 'ID',
                //allowBlank: false,
                editable: false,
                forceSelection: true,
                triggerAction: 'all'
            },
            renderer: function(value, metaData, record, row, col, store, gridView){
                //url = data that will come on initial load as an array
                var columnObject = {"url": GDPR.gbl.metadata.companyData.tcompany, "returnProperty": 'companyName' }
                return me.utilityFx().recreateColumnRenderer(value, metaData, record, row, col, store, gridView, columnObject);
            }
        },{
            header: 'System ID', dataIndex: 'systemID', flex: 1,
            editor: {
                xtype: 'combobox',
                autoDestroyBoundStore: true,
                queryMode: 'remote',
                store: Ext.create('Ext.data.Store', {
                    autoDestroy: true,
                    fields: ['ID', 'systemName'],
                    listeners: {
                        load: function(store,records,options) {
                            store.removeAll();
                            store.add(GDPR.gbl.metadata.systemData.tsystem);
                        }
                    }
                }),  

                displayField: 'systemName',
                valueField: 'ID',
                //allowBlank: false,
                editable: false,
                forceSelection: true,
                triggerAction: 'all'
            },
            renderer: function(value, metaData, record, row, col, store, gridView){
                //url = data that will come on initial load as an array
                var columnObject = {"url": GDPR.gbl.metadata.systemData.tsystem, "returnProperty": 'systemName' }
                return me.utilityFx().recreateColumnRenderer(value, metaData, record, row, col, store, gridView, columnObject);
            }
        },{ //userData, userDisplayName
            header: 'Responsible Person ID', dataIndex: 'responsiblePersonID', flex: 1,
            editor: {
                xtype: 'combobox',
                queryMode: 'remote',
                store: Ext.create('Ext.data.Store', {
                    autoDestroy: true,
                    fields: ['ID', 'userDisplayName'],
                    listeners: {
                        load: function(store,records,options) {
                            store.removeAll();
                            store.add(GDPR.gbl.metadata.userData.tuser);
                        }
                    }
                }),
                displayField: 'userDisplayName',
                valueField: 'ID',
                //allowBlank: false,
                editable: false,
                forceSelection: true,
                triggerAction: 'all'
            },
            renderer: function(value, metaData, record, row, col, store, gridView){
                //url = data that will come on initial load as an array
                var columnObject = {"url": GDPR.gbl.metadata.userData.tuser, "returnProperty": 'userDisplayName' }
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