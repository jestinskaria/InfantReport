const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
const pug = require('pug');
const querystring = require('querystring');
app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const MongoClient = require('mongodb').MongoClient;

var currentDateValue = CurrentDateTime();

// CONNECTING MONGO DB
const uri = "mongodb+srv://jestin:root@infantcare-tzbj0.mongodb.net/InfantDatabase?retryWrites=true&w=majority"
MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("InfantDatabase").collection("InfantVaccinationDetails");
   var mydatabase = client.db('InfantDatabase');
  






 //AUTHOR : JESTIN SKARIA  

// ADDING and EDITING INFANT DETAILS TO DB

app.post('/addEditInfantData', (req, res) => {

   const infData = req.query;
   var infantEditArray = [];
   var parentEditArray = [];
   var currentDateValue = CurrentDateTime();
   var dt = new Date();
   var vacc1 = dt.setDate(dt.getDate() + 100);
   var vacc2 = dt.setDate(dt.getDate() + 180);
   var vacc3 = dt.setDate(dt.getDate() + 250);
   vaccDate1 =new Date(vacc1).toDateString();
   vaccDate2 =new Date(vacc2).toDateString();
   vaccDate3 =new Date(vacc3).toDateString();

   if(infData["InfantHospitalId"]==""){
    var InfantId = InfantHospitalIdGenerator();
    console.log(InfantId);
    console.log(currentDateValue);
    
    var InfantInsertData = [{InfantHospitalId:InfantId,InfantFName:infData["InfantFirstName"],InfantLName:infData["InfantLastName"],
                           Gender:infData["Gender"],BirthDateTime:infData["BirthDateTime"],Address:infData["Address"],
                           ZIP:infData["ZIP"],UpdatedDate:currentDateValue}];

    var ParentInsertData = [{InfantHospitalId:InfantId,FatherFName:infData["FatherFName"],FatherLName:infData["FatherLName"],
                            MotherFName:infData["MotherFName"],MotherLName:infData["MotherLName"],
                            Address:infData["Address"],ZIP:infData["ZIP"],CreatedDate:currentDateValue,UpdatedDate:currentDateValue}];
    var VaccinationInsertData =[{InfantHospitalId:InfantId,InfantFName:infData["InfantFirstName"],InfantLName:infData["InfantLastName"],VaccinationId:"v001",
                           VaccinationName:"Chickenpox ",VaccinationDay:vaccDate1},
                           {InfantHospitalId:InfantId,InfantFName:infData["InfantFirstName"],InfantLName:infData["InfantLastName"],VaccinationId:"v002",
                           VaccinationName:"tetanus ",VaccinationDay:vaccDate2},
                           {InfantHospitalId:InfantId,InfantFName:infData["InfantFirstName"],InfantLName:infData["InfantLastName"],VaccinationId:"v003",
                           VaccinationName:"Measles ",VaccinationDay:vaccDate3}]                       
    
                            mydatabase.collection("NewBornInfantsDetails").insertMany(InfantInsertData, function(err, res) {
                                  if (err) throw err;
                                  console.log("Number of documents inserted: " + res.insertedCount);
                                
                                });     
                                
                                mydatabase.collection("NewBornInfantsParentsDetails").insertMany(ParentInsertData, function(err, res) {
                                 if (err) throw err;
                                 console.log("Number of documents inserted: " + res.insertedCount);
                                 
                               });  
                               mydatabase.collection("InfantVaccinationDetails").insertMany(VaccinationInsertData, function(err, res) {
                                 if (err) throw err;
                                 console.log("Number of documents inserted: " + res.insertedCount);
                                 
                               });  
                               
                              //  client.db.close();
                                client.close();
   }else{

      // UPDATING INFANT DETAILS

      var myquery = { InfantHospitalId: infData["InfantHospitalId"] };
      if(infData["InfantFirstName"]!=""){
         infantEditArray.push({InfantFName:infData["InfantFirstName"]}) 
      }
      if(infData["InfantLastName"]!=""){
         infantEditArray.push({InfantLName:infData["InfantLastName"]}) 
      }
      if(infData["Gender"]!=""){
         infantEditArray.push({Gender:infData["Gender"]}) 
      }
      if(infData["BirthDateTime"]!=""){
         infantEditArray.push({BirthDateTime:infData["BirthDateTime"]}) 
      }
      if(infData["Address"]!=""){
         infantEditArray.push({Address:infData["Address"]}) 
      }
      if(infData["ZIP"]!=""){
         infantEditArray.push({ZIP:infData["ZIP"]}) 
      }

    for(var i=0;i<infantEditArray.length;i++){
   
      var infantNewvalues = { $set: infantEditArray[i] };
      mydatabase.collection("NewBornInfantsDetails").updateOne(myquery, infantNewvalues, function(err, res) {
           if (err) throw err;
      
           console.log("1st document updated");
               
         });  
      }  
         // UPDATING DATE
         if(i>0){

            mydatabase.collection("NewBornInfantsDetails").updateOne(myquery, { $set:{UpdatedDate:currentDateValue}}, function(err, res) {
               if (err) throw err;
          
               console.log("1st document updated");
                   
             });  
         }
         console.log(i+"fields updated");
           
      console.log(infantEditArray.length);
   




    // UPDATING PARENT DETAILS

    var myquery = { InfantHospitalId: infData["InfantHospitalId"] };
    
    if(infData["FatherFName"]!=""){
      parentEditArray.push({FatherFName:infData["FatherFName"]}) 
    }
    if(infData["FatherLName"]!=""){
      parentEditArray.push({FatherLName:infData["FatherLName"]}) 
    }
    if(infData["MotherFName"]!=""){
      parentEditArray.push({MotherFName:infData["MotherFName"]}) 
    }
    if(infData["MotherLName"]!=""){
      parentEditArray.push({MotherLName:infData["MotherLName"]}) 
    }
    if(infData["Address"]!=""){
      parentEditArray.push({Address:infData["Address"]}) 
    }
    if(infData["ZIP"]!=""){
      parentEditArray.push({ZIP:infData["ZIP"]}) 
    }

  for(var j=0;j<parentEditArray.length;j++){
 
    var infantNewvalues = { $set: parentEditArray[j] };
    mydatabase.collection("NewBornInfantsParentsDetails").updateOne(myquery, infantNewvalues, function(err, res) {
         if (err) throw err;
    
        
             
       });  
    }  
       // UPDATING DATE
       if(j>0){

          mydatabase.collection("NewBornInfantsParentsDetails").updateOne(myquery, { $set:{UpdatedDate:currentDateValue}}, function(err, res) {
             if (err) throw err;
        
             console.log("1st document updated");
                 
           });  
       }
       console.log(i+"fields updated");
         client.close();
   
    console.log(infantEditArray.length);
 }

 
    res.writeHead(301,{Location: 'http://localhost/FinalProject/try.html'});
 
   res.end();
   
});












//AUTHOR: JESTIN SKARIA

// FOR ADDING AND EDITING INFANT DEATH DETAILS


app.post('/addEditInfantDeathData', (req, res) => {

   const infDeathData = req.query;
   var infantDeathEditArray = [];
   var foundData
   var findInfIdQuery= {InfantHospitalId:infDeathData["InfantHospitalId"]};
   var infantMainFName;
   var infantMainLName;
   var infantMainAddress;
  
   // Finding existing infant id for update
   mydatabase.collection("InfantDeathDetails").find(findInfIdQuery).toArray (function(err, result) {
      if (err) throw err;
      foundData = result.length;
  

   

   // Update existing details
   if(foundData > 0){
   
      var myquery = { InfantHospitalId: infDeathData["InfantHospitalId"] };
      if(infDeathData["DeathDateTime"]!=""){
         infantDeathEditArray.push({DeathDateTime:infDeathData["DeathDateTime"]}) 
       }
       if(infDeathData["Reason"]!=""){
         infantDeathEditArray.push({Reason:infDeathData["Reason"]}) 
       }

       for(var j=0;j<infantDeathEditArray.length;j++){
 
         var infantNewDeathvalues = { $set: infantDeathEditArray[j] };
         mydatabase.collection("InfantDeathDetails").updateOne(myquery, infantNewDeathvalues, function(err, res) {
              if (err) throw err;
         
             
                  
            });  
         }  

   }else{
       
          // Finding existing infant id for update
          var findInfIdQuery= {InfantHospitalId:infDeathData["InfantHospitalId"]};
   mydatabase.collection("NewBornInfantsDetails").find(findInfIdQuery).toArray (function(err, result) {
      if (err) throw err;
     
      infantMainFName = result[0]["InfantFName"];
      infantMainLName = result[0]["InfantLName"];
      infantMainAddress = result[0]["Address"];
      
   
  
      var InfantDeathInsertData = [{InfantFName:infantMainFName,InfantLName:infantMainLName,
                           Address:infantMainAddress,InfantHospitalId:infDeathData["InfantHospitalId"],Reason:infDeathData["Reason"],DeathDateTime:infDeathData["DeathDateTime"]
      }];
      mydatabase.collection("InfantDeathDetails").insertMany(InfantDeathInsertData, function(err, res) {
         if (err) throw err;
         console.log("Number of documents inserted: " + res.insertedCount);
       
       });   
       
      });

  
   }
});

   res.writeHead(301,{Location: 'http://localhost/FinalProject/try.html'});
 
   res.end();
   
});










//  TRANSFER INFANT OPERATION
app.post('/transferInfant', (req, res) => {

   const infantData = req.query;
   var infantDeathEditArray = [];
   var foundData
   var findInfIdQuery= {InfantHospitalId:infantData["InfantHospitalId"]};
   var infantMainFName;
   var infantMainLName;
   var infantMainAddress;
  
   // Finding existing infant id for update
   mydatabase.collection("NewBornInfantsDetails").find(findInfIdQuery).toArray (function(err, result) {
      if (err) throw err;
      foundData = result.length;
  
 
   if(foundData > 0){
   var transferInsertData=[{InfantHospitalId:infantData["InfantHospitalId"],InfantFName:result[0]["InfantFirstName"],InfantLName:result[0]["InfantLastName"],
   Gender:result[0]["Gender"],BirthDateTime:result[0]["BirthDateTime"],ToHospitalName:infantData["ToHospitalName"],
   ToHospitalAddress:infantData["ToHospitalAddress"],TransferDate:currentDateValue}];

   mydatabase.collection("InfantHospitalTransferDetails").insertMany(transferInsertData, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);

      mydatabase.collection("NewBornInfantsDetails").deleteOne(findInfIdQuery, function(err, obj) {
         if (err) throw err;
         console.log("1st document deleted");


         mydatabase.collection("NewBornInfantsParentsDetails").deleteOne(findInfIdQuery, function(err, obj) {
            if (err) throw err;
            console.log("1st document deleted");
           
          });
        
       });


    
    });   
      

   }

});   



   res.writeHead(301,{Location: 'http://localhost/FinalProject/try.html'});
 
   res.end();
   
});











//  DISCHARGE INFANT OPERATION
app.post('/dischargeInfant', (req, res) => {

   const infantData = req.query;
   var infantDeathEditArray = [];
   var foundData
   var findInfIdQuery= {InfantHospitalId:infantData["InfantHospitalId"]};
     console.log(findInfIdQuery)
  
   mydatabase.collection("NewBornInfantsDetails").find(findInfIdQuery).toArray (function(err, result) {
      if (err) throw err;
      foundData = result.length;
  if(foundData>0){
 
  
   var DischargeInsertData=[{InfantHospitalId:infantData["InfantHospitalId"],InfantFName:result[0]["InfantFName"],InfantLName:result[0]["InfantLName"],
   Gender:result[0]["Gender"],BirthDateTime:result[0]["BirthDateTime"],DischargeDate:currentDateValue}];

   mydatabase.collection("DischargedInfantDetails").insertMany(DischargeInsertData, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
    
      mydatabase.collection("NewBornInfantsParentsDetails").find(findInfIdQuery).toArray (function(err, result) {
         if (err) throw err;
         if(result.length >0) 
         var DischargeInfantParentData = [{InfantHospitalId:infantData["InfantHospitalId"],FatherFName:result[0]["FatherFName"],FatherLName:result[0]["FatherLName"],
         MotherFName:result[0]["MotherFName"],MotherLName:result[0]["MotherLName"],DischargeDate:currentDateValue}]
         
         mydatabase.collection("DischargedInfantsParentsDetails").insertMany(DischargeInfantParentData, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);


          mydatabase.collection("NewBornInfantsHealthDetails").find(findInfIdQuery).toArray (function(err, result) {
               if (err) throw err;
               if(result.length >0) 
               var DischargeInfantHealthtData = [{InfantHospitalId:infantData["InfantHospitalId"],
               Eyes:result[0]["Eyes"],Hearing:result[0]["Hearing"],Brain:result[0]["Brain"],Heart:result[0]["Heart"]
               ,Metabolism:result[0]["Metabolism"],BodySkin:result[0]["BodySkin"],UpdatedDate:currentDateValue,DischargeDate:currentDateValue}]

              if(result.length >0) 
               mydatabase.collection("DischargedInfantsHealthDetails").insertMany(DischargeInfantHealthtData, function(err, res) {
                  if (err) throw err;
                  console.log("Number of documents inserted: " + res.insertedCount);      



      mydatabase.collection("NewBornInfantsDetails").deleteOne(findInfIdQuery, function(err, obj) {
         if (err) throw err;
         console.log("1st document deleted");


         mydatabase.collection("NewBornInfantsParentsDetails").deleteOne(findInfIdQuery, function(err, obj) {
            if (err) throw err;
            console.log("1st document deleted");
            mydatabase.collection("NewBornInfantsHealthDetails").deleteOne(findInfIdQuery, function(err, obj) {
               if (err) throw err;
               console.log("1st document deleted");
           
          });
          
         });
          
      });
          
   });
          
});
          
});
        
      
 });

    
    });   
      

  }

});   



   res.writeHead(301,{Location: 'http://localhost/FinalProject/try.html'});
 
   res.end();
   
});

// FOR ADDING AND EDITING INFANT MOTHER DEATH DETAILS


app.post('/addEditMotherDeathData', (req, res) => {

   const motherDeathData = req.query;
   var mothertDeathEditArray = [];
   var foundData
   var findInfIdQuery= {InfantHospitalId:motherDeathData["InfantHospitalId"]};
   var infantMainFName;
   var infantMainLName;
   var infantMainAddress;
   var motherFName;
   var motherLName;
  
  
   // Finding existing infant id for update
   mydatabase.collection("InfantMotherDeathDetails").find(findInfIdQuery).toArray (function(err, result) {
      if (err) throw err;
      foundData = result.length;
  

   

   // Update existing details
   if(foundData > 0){
   
      var myquery = { InfantHospitalId: motherDeathData["InfantHospitalId"] };
      if(motherDeathData["DeathDateTime"]!=""){
         mothertDeathEditArray.push({DeathDateTime:motherDeathData["DeathDateTime"]}) 
       }
       if(motherDeathData["Reason"]!=""){
         mothertDeathEditArray.push({Reason:motherDeathData["Reason"]}) 
       }

       for(var j=0;j<mothertDeathEditArray.length;j++){
 
         var motherNewDeathvalues = { $set: mothertDeathEditArray[j] };
         mydatabase.collection("InfantMotherDeathDetails").updateOne(myquery, motherNewDeathvalues, function(err, res) {
              if (err) throw err;
         
             
                  
            });  
         }  

   }else{
       
          // Finding existing infant id for update
          var findInfIdQuery= {InfantHospitalId:motherDeathData["InfantHospitalId"]};
   mydatabase.collection("NewBornInfantsDetails").find(findInfIdQuery).toArray (function(err, result) {
      if (err) throw err;
     
      infantMainFName = result[0]["InfantFName"];
      infantMainLName = result[0]["InfantLName"];
      infantMainAddress = result[0]["Address"];

      mydatabase.collection("NewBornInfantsParentsDetails").find(findInfIdQuery).toArray (function(err, result) {
         if (err) throw err;
        
         motherFName= infantMainFName = result[0]["MotherFName"];
         motherLName=infantMainLName = result[0]["MotherLName"];
         
      
   
  
      var MotherDeathInsertData = [{InfantHospitalId:motherDeathData["InfantHospitalId"],InfantFName:infantMainFName,InfantLName:infantMainLName,
                           Address:infantMainAddress,MotherFName:motherFName,MotherLName:motherLName,Reason:motherDeathData["Reason"],DeathDateTime:motherDeathData["DeathDateTime"]
      }];
      mydatabase.collection("InfantMotherDeathDetails").insertMany(MotherDeathInsertData, function(err, res) {
         if (err) throw err;
         console.log("Number of documents inserted: " + res.insertedCount);
       
       });   
      });   
       
      });

  
   }
});

   res.writeHead(301,{Location: 'http://localhost/FinalProject/try.html'});
 
   res.end();
   
});



/// ADDING AND EDITING INFANT HEALTH DETAILS
app.post('/addEditInfantHealthData', (req, res) => {

   const infHealthData = req.query;
   var infantHealthEditArray = [];
   var foundData;
   var findInfIdQuery= {InfantHospitalId:infHealthData["InfantHospitalId"]};
   var infantMainFName;
   var infantMainLName;
   var infantMainAddress;
  
  
   // Finding existing infant id for update
   mydatabase.collection("NewBornInfantsHealthDetails").find(findInfIdQuery).toArray (function(err, result) {
      if (err) throw err;
      foundData = result.length;
  

   

   // Update existing details
   if(foundData > 0){
   
      var myquery = { InfantHospitalId: infHealthData["InfantHospitalId"] };
      if(infHealthData["Eyes"]!=""){
         infantHealthEditArray.push({Eyes:infHealthData["Eyes"]}) 
       }
       if(infHealthData["Hearing"]!=""){
         infantHealthEditArray.push({Hearing:infHealthData["Hearing"]}) 
       }
       if(infHealthData["Brain"]!=""){
         infantHealthEditArray.push({Brain:infHealthData["Brain"]}) 
       }
       if(infHealthData["Heart"]!=""){
         infantHealthEditArray.push({Heart:infHealthData["Heart"]}) 
       }if(infHealthData["Metabolism"]!=""){
         infantHealthEditArray.push({Metabolism:infHealthData["Metabolism"]}) 
       }
       if(infHealthData["BodySkin"]!=""){
         infantHealthEditArray.push({BodySkin:infHealthData["BodySkin"]}) 
       }

       for(var j=0;j<infantHealthEditArray.length;j++){
 
         var infantNewHealthvalues = { $set: infantHealthEditArray[j] };
         mydatabase.collection("NewBornInfantsHealthDetails").updateOne(myquery, infantNewHealthvalues, function(err, res) {
              if (err) throw err;
         
              mydatabase.collection("NewBornInfantsHealthDetails").updateOne(myquery, { $set:{UpdatedDate:currentDateValue}}, function(err, res) {
               if (err) throw err;
          
              
                   
             });  
                  
            });  
         }  

   }else{
       
          // Finding existing infant id for update
          var findInfIdQuery= {InfantHospitalId:infHealthData["InfantHospitalId"]};
   mydatabase.collection("NewBornInfantsDetails").find(findInfIdQuery).toArray (function(err, result) {
      if (err) throw err;
     
      infantMainFName = result[0]["InfantFName"];
      infantMainLName = result[0]["InfantLName"];
      infantMainAddress = result[0]["Address"];
      
   
  
      var InfantHealthInsertData = [{InfantHospitalId:infHealthData["InfantHospitalId"],InfantFName:infantMainFName,InfantLName:infantMainLName,
                           Address:infantMainAddress,Eyes:infHealthData["Eyes"],Hearing:infHealthData["Hearing"],Brain:infHealthData["Brain"],Heart:infHealthData["Heart"]
                           ,Metabolism:infHealthData["Metabolism"],BodySkin:infHealthData["BodySkin"],UpdatedDate:currentDateValue
      }];
      mydatabase.collection("NewBornInfantsHealthDetails").insertMany(InfantHealthInsertData, function(err, res) {
         if (err) throw err;
         console.log("Number of documents inserted: " + res.insertedCount);
       
       });   
       
      });

  
   }
});

   res.writeHead(301,{Location: 'http://localhost/FinalProject/try.html'});
 
   res.end();
   
});





/// ADDING AND EDITING MOTHER HEALTH DETAILS
app.post('/addEditMotherHealthData', (req, res) => {

   const motherHealthData = req.query;
   var motherHealthEditArray = [];
   var foundData
   var findInfIdQuery= {InfantHospitalId:motherHealthData["InfantHospitalId"]};
   var infantMainFName;
   var infantMainLName;
   var infantMainAddress;
   var motherFName;
   var motherLName;
  
   // Finding existing infant id for update
   mydatabase.collection("NewBornInfantsMotherHealthDetails").find(findInfIdQuery).toArray (function(err, result) {
      if (err) throw err;
      foundData = result.length;
  

   

   // Update existing details
   if(foundData > 0){
   
      var myquery = { InfantHospitalId: motherHealthData["InfantHospitalId"] };
      if(motherHealthData["Heart"]!=""){
         motherHealthEditArray.push({Heart:motherHealthData["Heart"]}) 
       }
       if(motherHealthData["Metabolism"]!=""){
         motherHealthEditArray.push({Metabolism:motherHealthData["Metabolism"]}) 
       }
       if(motherHealthData["MentalHealth"]!=""){
         motherHealthEditArray.push({MentalHealth:motherHealthData["MentalHealth"]}) 
       }
       if(motherHealthData["BloodPressure"]!=""){
         motherHealthEditArray.push({BloodPressure:motherHealthData["BloodPressure"]}) 
       }

       for(var j=0;j<motherHealthEditArray.length;j++){
 
         var motherNewHealthvalues = { $set: motherHealthEditArray[j] };
         mydatabase.collection("NewBornInfantsMotherHealthDetails").updateOne(myquery, motherNewHealthvalues, function(err, res) {
              if (err) throw err;
         
             
                  
            });  
         }  

   }else{
       
          // Finding existing infant id for update
          var findInfIdQuery= {InfantHospitalId:motherHealthData["InfantHospitalId"]};
   mydatabase.collection("NewBornInfantsDetails").find(findInfIdQuery).toArray (function(err, result) {
      if (err) throw err;
     
      infantMainFName = result[0]["InfantFName"];
      infantMainLName = result[0]["InfantLName"];
      infantMainAddress = result[0]["Address"];
      
      mydatabase.collection("NewBornInfantsParentsDetails").find(findInfIdQuery).toArray (function(err, result) {
         if (err) throw err;
        
         motherFName= infantMainFName = result[0]["MotherFName"];
         motherLName=infantMainLName = result[0]["MotherLName"];
  
      var InfantHealthInsertData = [{InfantHospitalId:motherHealthData["InfantHospitalId"],InfantFName:infantMainFName,InfantLName:infantMainLName,
                           Address:infantMainAddress,MotherFName:motherFName,MotherLName:motherLName,Heart:motherHealthData["Heart"],
                           Metabolism:motherHealthData["Metabolism"],MentalHealth:motherHealthData["MentalHealth"],BloodPressure:motherHealthData["BloodPressure"]
      }];
      mydatabase.collection("NewBornInfantsMotherHealthDetails").insertMany(InfantHealthInsertData, function(err, res) {
         if (err) throw err;
         console.log("Number of documents inserted: " + res.insertedCount);
       
       });   
      });   
       
      });

  
   }
});

   res.writeHead(301,{Location: 'http://localhost/FinalProject/try.html'});
 
   res.end();
   
});





app.get('/getInfantData/',function(req,res) {
 
   const reqData = req.query;
   console.log(reqData)
   var type = reqData["type"];
   var infantHId =reqData["Id"];
   var infFName =reqData["FName"];
   var infLName =reqData["LName"];
   
   if(infantHId!='' && infantHId!= 'undefined'){
     var findQuery= {InfantHospitalId:infantHId};
   }else if((infFName!='' ||infFName!='undefined') && (infLName=='' || infLName=='undefined')){
      var findQuery= {InfantFName:infFName};
   }else if(infFName =='' && infLName!=''){
      var findQuery= {InfantLName:infLName};
   }else{
      var findQuery= {$and:[{InfantLName:infLName},{InfantFName:infFName}]};
   }

   
   if(type == 1){
      mydatabase.collection("NewBornInfantsHealthDetails").find(findQuery).toArray (function(err, result) {
         if (err) throw err;
       
         let body = result;
         res.write(JSON.stringify(body));
         res.end();
      });
   }else if(type == 2){
      mydatabase.collection("NewBornInfantsMotherHealthDetails").find(findQuery).toArray (function(err, result) {
         if (err) throw err;
       
         let body = result;
         res.write(JSON.stringify(body));
         res.end();
      });
   }
   else if(type == 3){
      mydatabase.collection("InfantHospitalTransferDetails").find(findQuery).toArray (function(err, result) {
         if (err) throw err;
       
         let body = result;
         res.write(JSON.stringify(body));
         res.end();
      });
   }
   else if(type == 4){
      mydatabase.collection("DischargedInfantDetails").find(findQuery).toArray (function(err, result) {
         if (err) throw err;
       
         let body = result;
         res.write(JSON.stringify(body));
         res.end();
      });
   }
   else if(type == 5){
      mydatabase.collection("InfantVaccinationDetails").find(findQuery).toArray (function(err, result) {
         if (err) throw err;
       
         let body = result;
         res.write(JSON.stringify(body));
         res.end();
      });
   }
   else if(type == 6){
      mydatabase.collection("NewBornInfantsDetails").find(findQuery).toArray (function(err, result) {
         if (err) throw err;
       
         let body = result;
         res.write(JSON.stringify(body));
         res.end();
      });
   }
   else if(type == 7){
      mydatabase.collection("InfantMotherDeathDetails").find(findQuery).toArray (function(err, result) {
         if (err) throw err;
       
         let body = result;
         res.write(JSON.stringify(body));
         res.end();
      });
   }


   
});




     
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

});



// COMMON FUNCTIONS

function InfantHospitalIdGenerator(){
   var InfantHospitalId = 'INF'+Math.floor(Math.random() * 10000000) + 1;
   return InfantHospitalId;

}

function CurrentDateTime(){
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
                return dateTime;
}
function CurrentDateVal(){
   var today = new Date();
   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   
   var dateVal = date
                   return dateVal;
   }
