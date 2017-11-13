G_Module.define('window', {
	initialize: function(opts){
		this.opts = opts;
		this.initComponent();
	},
	initComponent: function(){
		Vue.component('comp-window', {
			template: '#comp-window',
			props: {
				title: {type: String, default: ''},
				show: false
			},
			data: function(){
				return {
				};
			},
			methods: {
				close: function(){
					this.$emit('cancel');
				},
			},
		});
	},
});
