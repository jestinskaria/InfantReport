var request = new XMLHttpRequest()


// $(document).ready(function(){
//     $('#purpose').on('change', function() {
//       if ( this.value == '1')
//       { 
//         var id_val = "tablee1";
//         var show_val = "#tablee1";
//         addTable(id_val);
//         $(show_val).show();
//       }
//       else
//       {
//         var id_val = "tablee1";
//         var show_val = "#tablee1";
//         addTable(id_val);
//         $(show_val).hide();
//       }
//   if ( this.value == '2')
//       {
//         var id_val = "tablee2";
//         var show_val = "#tablee2";
//         addTable(id_val);
//         $(show_val).show();
//       }
//       else
//       {
//         var id_val = "tablee2";
//         var show_val = "#tablee2";
//         addTable(id_val);
//         $(show_val).hide();
//       }
//   if ( this.value == '3')
//       {
//         var id_val = "tablee3";
//         var show_val = "#tablee3";
//         addTable(id_val);
//         $(show_val).show();
//       }
//       else
//       {
//         var id_val = "tablee3";
//         var show_val = "#tablee3";
//         addTable(id_val);
//         $(show_val).hide();
//       }
//     });
// });
// $(document).ready(function() {
//   $('#submitbuttonid').click(function() {
//     alert($('#purpose').val());
//     alert($('#hosptial_id').val());
//     alert($('#first_name').val());
//     alert($('#last_name').val());
//     myfun($('#purpose').val(),$('#hosptial_id').val(),$('#first_name').val(),$('#last_name').val())
    
//   });
// });
// function myfun(val1,val2,val3,val4){
//  alert(val1+" "+val2+" "+val3+" "+val4);

// }

// function addTable(val1) {
// alert(val1);
//   var myTableDiv = document.getElementById(val1);
//   var table = document.createElement('TABLE');
//   var tableBody = document.createElement('TBODY')

//   table.border = '1'
//   table.appendChild(tableBody);

//   var heading = new Array();
//   heading[0] = "hospital id"
//   heading[1] = "fname"
//   heading[2] = "lname"
//   heading[3] = "address"
//   heading[4] = "eyes"
//   heading[5] = "hearing"
//   heading[6] = "brain"
//   heading[7] = "heart"
//   heading[8] = "metabolism"
//   heading[9] = "body and skin"
//   heading[10] = "updated date"

//   var stock = new Array();
//   stock[0] = new Array("Cars", "88.625", "85.50", "85.81", "987","sdf","sdfsd","sdsd","sdsd","sdsd","sdsd")
//   stock[1] = new Array("Veggies", "88.625", "85.50", "85.81", "988")
//   stock[2] = new Array("Colors", "88.625", "85.50", "85.81", "989")
//   stock[3] = new Array("Numbers", "88.625", "85.50", "85.81", "990")
//   stock[4] = new Array("Requests", "88.625", "85.50", "85.81", "991")
//  /* for(i=0;i<4;i++){
//       for(j=0;j<11;j++){
//           stock[i]=
//       }
//   }
//   function test() {
// var sub_array = [];
// var super_array = [];
// for (var i = 1; i <= 3; i++) {
// sub_array.push(i);
// super_array.push(sub_array.slice(0));
// }
// alert(super_array);
// }*/
//   //TABLE COLUMNS
//   var tr = document.createElement('TR');
//   tableBody.appendChild(tr);
//   for (i = 0; i < heading.length; i++) {
//       var th = document.createElement('TH')
//       th.width = '75';
//       th.appendChild(document.createTextNode(heading[i]));
//       tr.appendChild(th);

//   }

//   //TABLE ROWS
//   var tr = document.createElement('TR');
//   tableBody.appendChild(tr);
//   for (i = 0; i < stock.length; i++) {
// var tr = document.createElement('TR');
// for (j = 0; j < stock[i].length; j++) {
// var td = document.createElement('TD')
// td.appendChild(document.createTextNode(stock[i][j]));
// tr.appendChild(td)
// }
// tableBody.appendChild(tr);
// }

//   myTableDiv.appendChild(table);

// }

function ReportGet(){
  
  
  var type = document.getElementById("purpose").value;
    var infantId = document.getElementById("hosptial_id").value;
  var infantFname = document.getElementById("first_name").value;
  var infantLName = document.getElementById("last_name").value;
 
  // var dat={type:"JESTIN",infantId:"rttt"}
request.open('GET', 'http://localhost:5000/getInfantData?type='+type+'&Id='+infantId+'&FName='+infantFname+'&LName='+infantLName+'', true)

request.onload = function() {
// Begin accessing JSON data here
   var data = JSON.parse(this.response)
  
   console.log(data)
  //  for(var i=0;i<data.length;i++){
    
  //  }
   var textedJson = JSON.stringify(data, undefined, 4);
    
   $('#myTextarea').text(textedJson);

   

  //  var show_val = "#tblHealth";
  
  //  $(show_val).show();
 
  //  var myTableDiv = document.getElementById('tblHealth');
  //    var table = document.createElement('TABLE');
  //    var tableBody = document.createElement('TBODY')
   
  //    table.border = '1'
  //    table.appendChild(tableBody);
   
  //    var heading = new Array();
  //    heading[0] = "hospital id"
  //    heading[1] = "fname"
  //    heading[2] = "lname"
  //    heading[3] = "address"
  //    heading[4] = "eyes"
  //    heading[5] = "hearing"
  //    heading[6] = "brain"
  //    heading[7] = "heart"
  //    heading[8] = "metabolism"
  //    heading[9] = "body and skin"
  //    heading[10] = "updated date"
   
     
  //    var tr = document.createElement('TR');
  //    tableBody.appendChild(tr);
  //    for (i = 0; i < heading.length; i++) {
  //        var th = document.createElement('TH')
  //        th.width = '75';
  //        th.appendChild(document.createTextNode(heading[i]));
  //        tr.appendChild(th);

  //    }
  //     //  var tr = document.createElement('TR');
  //     //  tableBody.appendChild(tr);
  //        for (var i = 0; i < data.length; i++) {
  //      var tr = document.createElement('TR');
  //      console.log(data[i])
       
  //      for (var j =0; j < 11; j++) {
  //      var td = document.createElement('TD')
  //      td.appendChild(document.createTextNode(data[i]["InfantHospitalId"]));
  //      tr.appendChild(td)
  //      }
       
  //      table.appendChild(tr);
  //        }

  //        myTableDiv.appendChild(table);


  
  


}

request.send()
}