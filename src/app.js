
const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient
const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'maram-shehadeh-dbtask-1'
mongoClient.connect(connectionUrl, (error, res1) =>{

    if(error){

        return console.log("error: "+ error)
    }
    console.log("Connection done")

    const db = res1.db(dbName)


// *****************insertOne*****************************************************************************************************************************

    db.collection('users').insertOne(

        {
        name:'maram',
        age:29
    }
    , (error, data) =>{

        if(error){

           return console.log("can not insert the user")

        }

        console.log(data.insertedId)

    })

    db.collection('users').insertOne({


        name:'ahmad',
        age:35
    }, (error, data) =>{

        if(error){

           return console.log("can not insert the user")

        }

        console.log(data.insertedId)

    })

//****************insertMany*************************************************************************************************************

    db.collection ('users').insertMany([
        {
            name : 'reham',
            age : 27
        },
        {
            name : 'reem',
            age : 24
        },
        {
            name : 'tasneem',
            age : 27
        },
        {
            name : 'osama',
            age : 24
        },
        {
            name : 'adel',
            age : 27
        },
        {
            name : 'marah',
            age : 27
        },
        {
            name : 'razan',
            age : 24
        },
        {
            name : 'hanadi',
            age : 24
        },
        {
            name : 'ali',
            age : 27
        },
        {
            name : 'omran',
            age : 40
        }
        
    ] , (error,data)=>{
        if(error){
            console.log("can not insert the users")
        }
         console.log("insertedCount is:  " + data.insertedCount)
    })


// ****************************** Find all users age 27*********************************************************************************************

        db.collection('users').find({age:27}).toArray((error,users)=>{
        if(error){
            return console.log("cann't find the users")
        }
        console.log("the users age eq 27:  ")
        console.log(users)
        console.log("the users age eq 27 count:  " + users.length)
    })



// ****************************** Find first 3 users age 27*********************************************************************************************


    db.collection('users').find({age:27}).limit(3).toArray((error,users)=>{
        if(error){
            return console.log("cann't find the users")
        }
        console.log("the first 3 users age eq 27:  ")
        console.log(users)
    
    })


// ****************************** update name of first 4 users*********************************************************************************************   
 
        db.collection('users').find({}).limit(4).toArray((error,users)=>{
        if(error){
            return console.log("cann't find the users")
        }

       var ids = users.map((doc)=>{

        return doc._id;
       })

       db.collection('users').updateMany({_id: {$in: ids}},  
        {

        $set: {name: "Essam"}
     
        })  
         .then((data1)=>{console.log("modifiedCount is:  " + data1.modifiedCount)})
         .catch((error)=> {console.log(error)})
    
    })

// ****************************** update age of first 4 users age 27*********************************************************************************************      


     db.collection('users').find({age:27}).limit(4).toArray((error,users)=>{
        if(error){
            return console.log("cann't find the users")
        }

       var ids_2 = users.map((doc)=>{

        return doc._id;
       })

       db.collection('users').updateMany({_id: {$in: ids_2}},  
        {

            $inc: {age: 4}
     
        })  
         .then((data1)=>{console.log("modifiedCount is:  " + data1.modifiedCount)})
         .catch((error)=> {console.log(error)})
    
    })

// ****************************** update age of all users*********************************************************************************************      

    db.collection('users').updateMany({},{
        $inc: {age: 10}
    })
    .then((data1)=>{console.log("modifiedCount is:  " + data1.modifiedCount)})
    .catch((error)=> {console.log(error)})


// ****************************** delete the users age 41 *********************************************************************************************   

    db.collection('users').deleteMany({age:41})
    .then((data1)=>{console.log("deletedCount is:  "+ data1.deletedCount)})
   .catch((error)=> {console.log(error)})


})





 