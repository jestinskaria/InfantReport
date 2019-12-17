var request = new XMLHttpRequest()

//TRANSFER INFANTS
function postTransferData(){
    alert("Submitted successfuly");
    var InfantHospitalId = document.getElementById("infantHospitalId").value;
    var ToHospitalName = document.getElementById("hospitalName").value;
    var ToHospitalAddress = document.getElementById("hospitalAddress").value;

 
    request.open('POST', 'http://localhost:5000/transferInfant?InfantHospitalId='+InfantHospitalId+'&ToHospitalName='+ToHospitalName+
    '&ToHospitalAddress='+ToHospitalAddress+'', true)

    request.send()
}


//DISCHARGE INFANTS
function postDischargeData(){
    alert("Submitted successfuly");
    var InfantHospitalId = document.getElementById("infantId").value;
   

 
    request.open('POST','http://localhost:5000/dischargeInfant?InfantHospitalId='+InfantHospitalId+'', true)

    request.send()
}

// INSERTING AND UPDATING INFANT AND PARENTS DETAILS
function postInfantBirthData(){
    alert("Submitted successfuly");
    var InfantHospitalId = document.getElementById("infantHospitalId").value;
    var InfantFirstName = document.getElementById("infantFName").value;
    var InfantLastName = document.getElementById("infantLName").value;
    var BirthDateTime = document.getElementById("dob").value;
    var Gender = document.getElementById("gender").value;
    var FatherFName = document.getElementById("fatherFName").value;
    var FatherLName = document.getElementById("fatherLName").value;
    var MotherFName = document.getElementById("motherFName").value;
    var MotherLName = document.getElementById("motherLName").value;
    var Address = document.getElementById("address").value;
    var ZIP = document.getElementById("zip").value;

 
    request.open('POST', 'http://localhost:5000/addEditInfantData?InfantHospitalId='+InfantHospitalId+'&InfantFirstName='+InfantFirstName+
    '&InfantLastName='+InfantLastName+'&BirthDateTime='+BirthDateTime+'&Gender='+Gender+
    '&FatherFName='+FatherFName+'&MotherFName='+MotherFName+'&MotherLName='+MotherLName+'&Address='+Address+'&ZIP='+ZIP+'', true)

    request.send()
}

//INSERTING AND UPDATING INFANT DEATH DETAILS
function postInfantDeathData(){
    alert("Submitted successfuly");
    var InfantHospitalId = document.getElementById("infantHospitalId").value;
    var DeathDateTime = document.getElementById("deathDate").value;
    var Reason = document.getElementById("reason").value;

 
    request.open('POST', 'http://localhost:5000/addEditInfantDeathData?InfantHospitalId='+InfantHospitalId+'&DeathDateTime='+DeathDateTime+
    '&Reason='+Reason+'', true)

    request.send()
}

//INSERTING AND UPDATING INFANT HEALTH DETAILS
function postInfantHealthData(){
    alert("Submitted successfuly");
    var InfantHospitalId = document.getElementById("infantHospitalId").value;
    var Eyes = document.getElementById("eyes").value;
    var Hearing = document.getElementById("hearing").value;
    var Brain = document.getElementById("brain").value;
    var Heart = document.getElementById("heart").value;
    var Metabolism = document.getElementById("metabolism").value;
    var BodySkin = document.getElementById("body").value;

 
    request.open('POST', 'http://localhost:5000/addEditInfantHealthData?InfantHospitalId='+InfantHospitalId+'&Eyes='+Eyes+
    '&Hearing='+Hearing+'&Brain='+Brain+'&Heart='+Heart+'&Metabolism='+Metabolism+'&BodySkin='+BodySkin+'', true)

    request.send()
}



//INSERTING AND UPDATING MOTHER HEALTH DETAILS
function postMotherHealthData(){
    alert("Submitted successfuly");
    var InfantHospitalId = document.getElementById("infantHospitalId").value;
    var MotherHeart = document.getElementById("mheart").value;
    var MotherMetabolism = document.getElementById("metabolism").value;
    var MotherMentalHealth = document.getElementById("mentalhealth").value;
    var BloodPressure = document.getElementById("bp").value;

 
    request.open('POST', 'http://localhost:5000/addEditMotherHealthData?InfantHospitalId='+InfantHospitalId+'&Heart='+MotherHeart+
    '&Metabolism='+MotherMetabolism+'&MentalHealth='+MotherMentalHealth+'&BloodPressure='+BloodPressure+'', true)

    request.send()
}


//INSERTING AND UPDATING MOTHER DEATH DETAILS
function postMotherDeathData(){
    alert("Submitted successfuly");
    var InfantHospitalId = document.getElementById("infantHospitalId").value;
    var MotherDeathDate = document.getElementById("motherdeathdate").value;
    var MotherDeathReason = document.getElementById("motherreason").value;

 
    request.open('POST', 'http://localhost:5000/addEditMotherDeathData?InfantHospitalId='+InfantHospitalId+'&DeathDateTime='+MotherDeathDate+
    '&Reason='+MotherDeathReason+'', true)

    request.send()
}



 