const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect(process.env.DB, connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.error("Could not connect to database:", error.message);
		// Exit so a process manager (PM2, Docker, k8s) can restart cleanly
		process.exit(1);
	}
};
