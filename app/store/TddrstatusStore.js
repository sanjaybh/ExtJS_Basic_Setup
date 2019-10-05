Ext.define('GDPR.store.TddrstatusStore', {
    extend: 'Ext.data.JsonStore',
    autoDestroy: false,
    autoLoad: false,
    //autoSync: true,

    alias  : 'store.TddrstatusStore',
    
    requires : [
        'GDPR.model.TddrstatusModel'
    ],    
    storeId : 'TddrstatusStoreId',
    model:'GDPR.model.TddrstatusModel',
    

    _config: {
        storeId : 'TddrstatusStoreId',
        model: "GDPR.model.TddrstatusModel",
        data : []
    },

    proxy: {
        type: 'ajax',
        url: (GDPR.gbl === undefined) ? '' : GDPR.gbl.constants.URL_MASTER_PANEL_TDDRSTATUS,

        limitParam: 'size',
        startParam: undefined,

        /*api: {
            create: '/user/add',
            read: '/user/list',
            update: '/user/update',
            destroy: '/user/delete'
        },
        
        writer: {
            type: 'json',
            writeAllFields: false
        },*/

        extraParams: {
            'nahb': 'sanjay'
        },
        //actionMethods: { read: 'POST' },
        
        reader: {
            type: 'json',
            rootProperty: 'Tddrstatus'
            //,totalProperty: 'totalCount',
            //successProperty: 'success'
        }
    },
    listeners: {
        _load : function(store) { console.log('loading from store directly...')
            store.each(function(record) {
               record.commit();
           }); 
        } 
    }
})
