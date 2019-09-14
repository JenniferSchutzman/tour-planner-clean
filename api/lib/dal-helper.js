require('dotenv').config();
const PouchDB = require('pouchdb-core');
PouchDB.plugin(require('pouchdb-adapter-http'));
PouchDB.plugin(require('pouchdb-find'));
const HTTPError = require('node-http-error');
const { pluck } = require('ramda');

const db = new PouchDB(
	`${process.env.COUCHDB_URL}${process.env.COUCHDB_DATABASE}`
);

const allDocs = tours => {
	return db.allDocs(tours).then(docs => pluck('doc', docs.rows));
};

const getDoc = id => db.get(id);

const dalHelper = {
	allDocs,
	getDoc
};

module.exports = dalHelper;
