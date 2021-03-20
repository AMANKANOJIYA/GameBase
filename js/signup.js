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
  console.log("it wirks 1")
    let login_username=document.getElementById("signup_username").value
    let login_email=document.getElementById("signup_email").value
    let login_password=document.getElementById("signup_password").value
    let login_cpassword=document.getElementById("signup_cPassword").value
    // =========================================================
    var firebaseref=firebase.database().ref("user");
    firebaseref.on("value",(snapshot)=>{
      var data=snapshot.val();
      // for loop to check users
      if (login_password==login_cpassword) {
        firebase.auth().createUserWithEmailAndPassword(login_email, login_password)
          .then((userCredential) => {
              // Signed in 
              var user = userCredential.user;
              // ...
          })
          .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              error_gen(errorCode,errorMessage);
          });
          firebase.database().ref('user/' + login_username).set({
            email:login_email,
            profile_pic:"../photos/base.png",
            user_name:login_username
          }, (error) => {
            if (error) {
              console.log("eeeeeeeeeeee")
            } else {
              // Data saved successfully!
              console.log("it wirks4")
            }
          });
        login_username=""
        login_email=""
        login_password=""
        login_cpassword=""
      }
      else{
        error_gen("PASSWORD SAME","Password are not same pls tey it again ");
        login_password=""
        login_cpassword=""
      }
    })
    // ========================================================
}