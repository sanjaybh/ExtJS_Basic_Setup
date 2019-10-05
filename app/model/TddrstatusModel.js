
Ext.define('GDPR.model.TddrstatusModel', {
    extend: 'Ext.data.Model',

    proxy_old: {
		type: 'ajax',
        //url: (GDPR.gbl === undefined) ? '' : GDPR.gbl.constants.URL_MASTER_PANEL_TDDRSTATUS,
        url:'',
        extraParams: {
			act: 'read',
			uuid: 'f1d69fbe-8f54-11df-82cf-0050569d2b85',
			limit: 50
		},
		reader: {
			type: 'json',
			rootProperty: 'Tddrstatus'
		}
    },
    
    fields: [ 
        {name: 'ID',                type: 'int'},
        {name: 'statusType',        type: 'string'},
        {name: 'statusDescription', type: 'string'}
    ]
});