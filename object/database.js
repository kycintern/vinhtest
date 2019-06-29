
/////Search engine functions create new, update, delete data in mongoDb
MongoClient = require('mongodb').MongoClient;
mongodb = require('mongodb');
config = require('config');

MONGO_URL = (process.env.MONGO_URL) ?
	process.env.MONGO_URL :
	config.get('mongoUrl');
DATA_BASE_NAME = (process.env.MESSENGER_APP_SECRET) ?
	process.env.MESSENGER_APP_SECRET :
	config.get('databasenamenosa');
SERVER_URL = (process.env.SERVER_URL) ?
	(process.env.SERVER_URL) :
	config.get('serverURL');
urlMG="mongodb://Lien-BTC:%2BZ%5D6n.)LAzkdR-%3D-@35.240.175.168:27017/?authMechanism=SCRAM-SHA-1&authSource=Nosa&connectTimeoutMS=30000&maxIdleTimeMS=600000";	
var dbQueryCounter = 0;
var maxDbIdleTime = 5000;

const ppShowUser = [{
	$addFields: {
		Email: {
			$let: {
				vars: {
					split: {
						$substrCP: ["$Email", 5, {
							"$strLenCP": "$Email"
						}]
					}
				},
				in: {
					$concat: ["*****", "$$split"]
				}
			}
		},
		Phone: {
			$let: {
				vars: {
					split: {
						$substrCP: ["$Phone", 0, 3]
					},
					split2: {
						$substrCP: ["$Phone", 7, {
							"$strLenCP": "$Phone"
						}]
					}
				},
				in: {
					$concat: ["$$split", "****", "$$split2"]
				}
			}
		}
	}
}, {
	$project: {
		ApprovedId: 0,
		ApprovedName: 0,
		BlockStatus: 0,
		Concurrently: 0,
		Delegate: 0,
		DelegateId: 0,
		DelegateImgUrl: 0,
		DelegateLevelName: 0,
		DelegateName: 0,
		GeoCodeProvincial: 0,
		IsConcurrently: 0,
		admin: 0,
		csdl: 0,
		nof: 0,
	}
}];

module.exports = {
	getConnection: function (callback) {

		MongoClient.connect(MONGO_URL,  { useNewUrlParser: true } ,function (err, client) { //conn =client;
			//console.log("Create:",client);
			if (err) {
				console.log('Unable to connect to the mongoDB server. Error:', err);
			} else {
				//console.log("Create conn 2:");
				callback(client);
			}
		});

	},
	getConnectionNosa: function (callback) {

		MongoClient.connect("mongodb://nsvn:nsvn6688@ds251849.mlab.com:51849/heroku_g41d98gw",  { useNewUrlParser: true } ,function (err, client) { //conn =client;
			//console.log("Create:",client);
			if (err) {
				console.log('Unable to connect to the mongoDB server. Error:', err);
			} else {
				//console.log("Create conn 2:");
				callback(client);
			}
		});

	},
	AggregateCollectionByName: function (pipeline,option,collectionName, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection(collectionName);
		// Find some documents
		collection.aggregate(pipeline,option).toArray(function (err, results) {

			if (err) {

				console.log("err:", err);
			} else {

				callback(results);
			}
		});
	},
	FindCollectionByName: function (query, collectionName,client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection(collectionName);
		// Find some documents
		collection.find(query).toArray(function (err, results) {

			if (err) {

				console.log("err:", err);
			} else {

				callback(results);
			}
		});
	},
	UpdateOneCollection: function (qr, objSet,collectionName, client, callback) {
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection(collectionName);
		
		collection.updateOne(qr, objSet, function (err, res) {
			//neu xay ra loi
			if (err) throw err;
			//console.log("Update status Kyc Member:", err);
			callback(null, res);
		});
	},
	UpdateManyCollection: function (qr, objSet,collectionName, client, callback) {
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection(collectionName);		
		collection.updateMany(qr, objSet,function (err, res) {
			//neu xay ra loi
			if (err) throw err;
			//console.log("Update status Kyc Member:", err);
			callback(null, res);
		});
	},
	InsertOneCollection: function ( objSet, collectionName, client, callback) {
			const db = client.db(DATA_BASE_NAME);
			const collection = db.collection(collectionName);

			collection.InsertOne( objSet, function (err, res) {
				//neu xay ra loi
				if (err) throw err;
				//console.log("Update status Kyc Member:", err);
				callback(null, res);
			});
	},
	InsertManyCollection: function (objSet, collectionName, client, callback) {
			const db = client.db(DATA_BASE_NAME);
			const collection = db.collection(collectionName);
			collection.InsertMany( objSet, function (err, res) {
				//neu xay ra loi
				if (err) throw err;
				//console.log("Update status Kyc Member:", err);
				callback(null, res);
			});
	},

	getPPShowUser: function () {
		return ppShowUser;
	},
	
	updateElementMessagesReads: function (query, DetailUpdateData, client, callback) {
		// Get the documents collection
		console.log('detailUpdate:',DetailUpdateData)
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('MessagesReads');
		var objMemberUpdate = {
			$set:DetailUpdateData
		};
		console.log('query:', query)
		collection.updateMany(query, objMemberUpdate, {
			multi: true,
			upsert: false
		}, function (err, res) {
			//neu xay ra loi
			if (err) {
				console.log(`update error`);
				callback(err);
			} else {
				console.log(`update success`);
				callback(null, res);
			}
		});
	},
	aggregateMessagesReads: function (pipeline, client, callback) {
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('MessagesReads');		
		collection.aggregate(pipeline, {}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
};
