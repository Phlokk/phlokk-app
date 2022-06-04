// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://dev-api.phlokk.com:27017", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

// The following example inserts a new "post" document into MongoDB 
// db.post.insertOne({ 
//     $currentDate: {
//         lastModified: true,
//         "creation.date": { $type: "timestamp" }
//      },
//     creator: creator.id, 
//     description: description, 
//     media: video,
//     mediaThumb: thumbnail,
//      // likesCount: 1,
//     // commentCount: 1,
//     // videoViews: 1,
    
// })


