Ext.define('GDPR.view.masterPages.TcompanyGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.view_masterpages_tcompanygrid',

    requires: [
        'GDPR.view.main.MainController'
    ],
    controller: 'main',

    selType: 'rowmodel',
    
    autoScroll: true,    

    initComponent: function() { 
        var me = this;
        me.gridURL = GDPR.gbl.constants.URL_MASTER_PANEL_TCOMPANY;

        var rEditor = Ext.create('Ext.grid.plugin.CellEditing', { licksToEdit: 2 });
        me.plugins = [rEditor];
        
        me.buildItems(me, me.gridURL, rEditor);
        this.callParent(arguments);

        me.on('render', me.loadStore, me, {_scope:me})
    },

    buildItems: function (me, gridURL, rEditor) {
        var modelConfig = {
            "modelName" : 'TCompany',
            "modelRoot" : 'tcompany'
        }
        //Creating a dummy record for grids new entry
        var createRecordDummy = {ID: '00',companyName: '', companyMnemonic: '', divisionID: ''}

        me.TCompany = Ext.define(modelConfig.modelName, {
            extend: 'Ext.data.Model',
            fields: [ 
                {name: 'ID',                    type: 'int'},
                {name: 'companyName',           type: 'string'},
                {name: 'companyMnemonic',       type: 'string'},
                {name: 'divisionID',            type: 'string'}
            ]
        });
              
        //All the config changes above only        
        me.columns = [{
            header: 'ID', dataIndex: 'ID', flex: 0.5, hidden:false
        },{
            header: 'Company Name', dataIndex: 'companyName', flex: 1,
            editor: {
                xtype: 'textfield', allowBlank: false
            }
        },{
            header: 'Company Mnemonic', dataIndex: 'companyMnemonic', flex: 1,
            editor: {
                xtype: 'textfield', allowBlank: false
            }
        },{
            header: 'Division ID', dataIndex: 'divisionID', flex: 1,
            editor: {
                xtype: 'combobox',
                autoDestroyBoundStore: true,
                queryMode: 'remote', //local, remote
                store: Ext.create('Ext.data.Store', {
                    autoDestroy: true,
                    fields: ['ID', 'divisionName'],
                    listeners: {
                        load: function(store,records,options) {
                            store.removeAll();
                            store.add(GDPR.gbl.metadata.divisionData.tdivision);
                        }
                    }
                }),
                displayField: 'divisionName',
                valueField: 'ID',
                //allowBlank: false,
                editable: false,
                forceSelection: true,
                triggerAction: 'all'
            },
            renderer: function(value, metaData, record, row, col, store, gridView){
                //url = data that will come on initial load as an array
                var columnObject = {"url": GDPR.gbl.metadata.divisionData.tdivision, "returnProperty": 'divisionName' }
                return me.utilityFx().recreateColumnRenderer(value, metaData, record, row, col, store, gridView, columnObject);                
            }
        }];
        this.store = me.utilityFx().createJsonStoreForGrids(modelConfig.modelName, gridURL, modelConfig.modelRoot)
        //Create a new record to the grid
        var newRecord = {ID: '00',companyName: '', companyMnemonic: '', divisionID: '00'}
        me.tbar = me.utilityFx().createToolbar('TCompany', newRecord, rEditor, me)

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