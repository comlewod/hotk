try{
	var err = new Error('hahaha');
	throw err;
} catch(e){
	console.log(e.name, e.message);
}
