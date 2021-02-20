const button_login=document.getElementById("login_btn");

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("this is loged in")
      window.location.assign("http://127.0.0.1:5500/main.html")
    } else {
      // No user is signed in.
      console.log("this is jfehafaljdslk in")
    }
  });


function error_gen(code,message){
  let error=document.getElementById("error");
  let error_text=document.getElementById("error_text");
  error.style.display="flex";
  error_text.innerText=code+" :ERROR !! "+message
  
}
let error=document.getElementById("error");
let close_error=document.getElementById("close_error");
close_error.addEventListener("click",()=>{
  console.log("click on error")
  error.style.display="none"
})
function signup (){
    let login_email=document.getElementById("signup_email").value
    let login_password=document.getElementById("signup_password").value
    let login_cpassword=document.getElementById("signup_cPassword").value
    if (login_password==login_cpassword){
    firebase.auth().createUserWithEmailAndPassword(login_email, login_password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode,errorMessage)
            error_gen(errorCode,errorMessage);
        });
    }
    else{
      console.log("they are different")
    }
}