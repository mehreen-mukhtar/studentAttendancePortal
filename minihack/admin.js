
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
  import {
    getDatabase,
    set,
    ref,
    onValue , // onChildAdded, onChildRemoved, onChildChanged, on, get,
  } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
  const auth = getAuth();
  const database = getDatabase();
const signup = () => {
     console.log(auth);
     let firstName = document.getElementById('firstName');
     let lastName = document.getElementById('lastName');
     let email = document.getElementById('email');
     let password = document.getElementById('password');
     let repeatPassword = document.getElementById('repeatPassword');
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((resolve) => {
            alert("successfully Signup")
            let userId = auth.currentUser.uid;
            console.log(userId);
           let userref = ref(database , "users/" + userId  )
            // "(" + username.value +")"
           let usersObj = {
            username: username.value,
            email: email.value,
            password: password.value,
          };
          set(userref ,usersObj);   
        })
        .catch((reject) => {
            alert(reject)
        })
}
let signup_btn = document.getElementById("create")
if(signup_btn){
signup_btn.addEventListener("click",signup)
}

const login= () => {
  let email = document.getElementById("emaill");
  let password = document.getElementById("passwordd");
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((resolve) => {
      alert("successfully signin");
      let userId = auth.currentUser.uid;
      let usernameRef = ref(database, "users/" + userId);
      onValue(usernameRef ,(data)=> {
          let userData = data.val().username;
          document.getElementById("firstname").innerHTML = userData;
          window.location.href = "student entery page.html"
      })
    })
    .catch((reject) => {
      alert(reject);
    });
};
 
let login_btn = document.getElementById("createe");
if (login_btn) {
  login_btn.addEventListener("click",login);
}
const postblog = () =>{
      let firstName = document.getElementById('firstName');
  let lastName = document.getElementById('lastName');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let repeatPassword = document.getElementById('repeatPassword');
}

function logout (){
  signOut(auth).then(()=>{
  window.location.href="signup.html"
  })
  } 
  let logout =  document.getElementById("signout")
 if (logout)  {
    logout.addEventListener("click",logout)
  }
 


  document.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const classTiming = document.getElementById("classTiming").value;
    const classSchedule = document.getElementById("classSchedule").value;
    const classTeacher = document.getElementById("classTeacher").value;
    const classsection = document.getElementById("classsection").value;
    const course = document.getElementById("course").value;
    const roll = document.getElementById("roll").value;
    const currentTime = new Date();

    const submissionRef = db.ref("submissions").push({
        name: name,
        classTiming: classTiming,
        classSchedule: classSchedule,
        classsection: classsection,
        course: course,
        roll: roll,

        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    submissionRef.then(() => {
      const submissionTime = new Date(submissionRef.time);
      if (
          (submissionTime.getHours() > 9 || submissionTime.getHours() > 14) &&
          submissionTime.getDay() === currentTime.getDay()
      ) {
          // User submitted late
          submissionRef.update({
              late: true
          });
      }
  });

  // Clear form fields
  document.getElementById("name").value = "";
  document.getElementById("roll").value= "";
});