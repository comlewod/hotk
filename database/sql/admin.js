var admin = {
	retrieve: (table) => {
		return 'SELECT * FROM ' + table;
	},
};

module.exports = admin;
