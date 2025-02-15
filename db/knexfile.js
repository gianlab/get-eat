require("dotenv").config({ path: "../.env.local" });

module.exports = {
	development: {
		client: "postgresql",
		connection: {
			database: process.env.PSQL_DATABASE || "geteat",
			user: process.env.PSQL_USER || "postgres",
			password: process.env.PSQL_PASSWORD || "password",
		},
		migrations: {
			directory: "./migrations",
		},
		seeds: {
			directory: "./seeds",
		},
	},
	production: {
		client: "postgresql",
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: "./migrations",
		},
		seeds: {
			directory: "./seeds",
		},
	},
};
