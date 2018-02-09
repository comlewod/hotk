var G_Module = G_Module || {};
(function(){
	var modules = {};
	//定义
	G_Module.define = function(name, obj){
		modules[name] = obj;
	};
	//引用模块
	G_Module.require = function(name){
		if( modules[name] )
		return modules[name];
		else
		console.error('模块 ' + name + ' 加载失败');
	};
	G_Module.initModule = function(arr, opts){
		opts = opts || {};
		for( var i=0; i<arr.length; i++ ){
			var name = arr[i];
			var module = modules[name];
			if( module ){
				 module.initialize && module.initialize(opts);
			} else {
				console.error('模块 ' + name + ' 加载失败');
			}
		}
	};
})();

function vueObj(obj){
	console.log(JSON.parse(JSON.stringify(obj)));
}
