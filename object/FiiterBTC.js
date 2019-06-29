var objDb = require('../object/database');
const ObjectId = require('mongodb').ObjectID;
DATA_BASE_NOSA = config.get('databasenamenosa');
module.exports = {
		GetBTClist: function (pipeline, callback) {
		    objDb.getConnection(function (client) {
		      const db = client.db(DATA_BASE_NOSA);
		      collection = db.collection('MemberBTC');
		      // Find some documents
		      collection.aggregate(pipeline).sort({
		        "_id": 1
		      }).toArray(function (err, results) {
		        //    assert.equal(err, null);
		        if (err) {
		          client.close();
		          console.log("GetExamList err:", err);
		          callback(err);
		        } else {
		          client.close();
		          console.log("GetExamList done:", results.length);
		          callback(results);
		        }
		      });
		      /////callback('Test Memebers '+query);
		    });
		  },
		  	GetProvincialByName: function (query, callback) {
		    objDb.getConnection(function (client) {
		      const db = client.db(DATA_BASE_NOSA);
		      collection = db.collection('Provincial');
		      // Find some documents
		      collection.find(query).sort({
		        "_id": 1
		      }).toArray(function (err, results) {
		        //    assert.equal(err, null);
		        if (err) {
		          client.close();
		          console.log("GetExamList err:", err);
		          callback(err);
		        } else {
		          client.close();
		          console.log("GetExamList done:", results.length);
		          callback(results);
		        }
		      });
		      /////callback('Test Memebers '+query);
		    });
		  },
		  	GetBTCCfile: function (pipeline, callback) {
		    objDb.getConnection(function (client) {
		      const db = client.db(DATA_BASE_NOSA);
		      collection = db.collection('BTCFile');
		      // Find some documents
		      collection.aggregate(pipeline).sort({
		        "_id": 1
		      }).toArray(function (err, results) {
		        //    assert.equal(err, null);
		        if (err) {
		          client.close();
		          console.log("GetExamList err:", err);
		          callback(err);
		        } else {
		          client.close();
		          console.log("GetExamList done:", results.length);
		          callback(results);
		        }
		      });
		      /////callback('Test Memebers '+query);
		    });
		  },
		  GetMemberByID: function (id, callback) {
		    objDb.getConnection(function (client) {
		      const db = client.db(DATA_BASE_NOSA);
		      collection = db.collection('MemberBTC');
		      // Find some documents
		      let query={_id:id}
		      collection.find(query).sort({
		        "_id": 1
		      }).toArray(function (err, results) {
		        //    assert.equal(err, null);
		        if (err) {
		          client.close();
		          console.log("GetExamList err:", err);
		          callback(err);
		        } else {
		          client.close();
		          console.log("GetExamList done:", results.length);
		          callback(results);
		        }
		      });
		      /////callback('Test Memebers '+query);
		    });
		  },
		  GetBtcContent: function (pipeline, callback) {
		    objDb.getConnection(function (client) {
		      const db = client.db(DATA_BASE_NOSA);
		      collection = db.collection('BTCContent');
		      // Find some documents
		      collection.aggregate(pipeline).sort({
		        "_id": 1
		      }).toArray(function (err, results) {
		        //    assert.equal(err, null);
		        if (err) {
		          client.close();
		          console.log("GetExamList err:", err);
		          callback(err);
		        } else {
		          client.close();
		          console.log("GetExamList done:", results.length);
		          callback(results);
		        }
		      });
		      /////callback('Test Memebers '+query);
		    });
		  },
		  GetTeam: function (query, callback) {
		    objDb.getConnection(function (client) {
		      const db = client.db(DATA_BASE_NOSA);
		      collection = db.collection('BTCContent');
		      // Find some documents
		      collection.find(query).sort({
		        "_id": 1
		      }).toArray(function (err, results) {
		        //    assert.equal(err, null);
		        if (err) {
		          client.close();
		          console.log("GetExamList err:", err);
		          callback(err);
		        } else {
		          client.close();
		          console.log("GetExamList done:", results.length);
		          callback(results);
		        }
		      });
		      /////callback('Test Memebers '+query);
		    });
		  }


}