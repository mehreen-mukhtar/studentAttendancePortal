var rollV, nameV,fnameV, cnicV, courseV,contactV;

function readForm() {
  rollV = document.getElementById("roll").value;
  nameV = document.getElementById("name").value;
  fnameV = document.getElementById("fname").value;
  cnicV = document.getElementById("cnic").value;
  courseV = document.getElementById("course").value;
  contactV = document.getElementById("contact").value;
  console.log(rollV, nameV,fnameV, cnicV, courseV,contactV);
}

document.getElementById("create").onclick = function () {
  readForm();

  firebase
    .database()
    .ref("student/" + rollV)
    .set({
      rollNo: rollV,
      name: nameV,
      fname: fnameV,
      cnic: cnicV,
      course: courseV,
      contac: contacV,
    });
  alert("Data Created");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("fname").value = "";
  document.getElementById("cnic").value = "";
  document.getElementById("course").value = "";
  document.getElementById("contact").value= "";
};

document.getElementById("read").onclick = function () {
  readForm();

  firebase
    .database()
    .ref("student/" + rollV)
    .on("value", function (snap) {
      document.getElementById("roll").value = snap.val().rollNo;
      document.getElementById("name").value = snap.val().name;
      document.getElementById("fname").value = snap.val().fname;
      document.getElementById("cnic").value = snap.val().cnic;
      document.getElementById("course").value = snap.val().course;
      document.getElementById("contact").value= snap.val().contact;
    });
};

document.getElementById("update").onclick = function () {
  readForm();

  firebase
    .database()
    .ref("student/" + rollV)
    .update({
    
      name: nameV,
    fname: fnameV,
      cnic: cnicV,
      course: courseV,
      contac: contacV,
    });
  alert("Data Updated");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("fname").value = "";
  document.getElementById("cnic").value = "";
  document.getElementById("course").value = "";
  document.getElementById("contact").value= "";
};
document.getElementById("delete").onclick = function () {
  readForm();

  firebase
    .database()
    .ref("student/" + rollV)
    .remove();
  alert("Data Deleted");
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("fname").value = "";
  document.getElementById("cnic").value = "";
  document.getElementById("course").value = "";
  document.getElementById("contact").value= "";
};