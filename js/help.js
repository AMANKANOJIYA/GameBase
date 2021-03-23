// signout system----------------------------------------------
function logout_l(){
    firebase.auth().signOut().then(() => {
    window.location.assign("http://127.0.0.1:5500/login.html")
    }).catch((error) => {
    console.log(error)
})}
// auth check if user sign up or loged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
      window.location.assign("http://127.0.0.1:5500/login.html")
    }
  });
  let submit=document.getElementById("submit")  
  submit.addEventListener("click",()=>{
    var name_=document.getElementById("name").value.replace(/<[^>]*>?/gm," ")
    var email=document.getElementById("email").value.replace(/<[^>]*>?/gm," ")
    var mob_no=document.getElementById("mob_no").value.replace(/<[^>]*>?/gm," ")
    var message=document.getElementById("message").value.replace(/<[^>]*>?/gm," ")
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    firebase.database().ref('contact/' + name_).set({
      email:email,
      name:name_,
      message:message,
      mobile_no:mob_no,
      Time:dateTime
    }, (error) => {
      if (error) {
        // error_gen(error.code,error.message)
        console.log(error.code,error.message )
      } else {
        console.log("it wirks4")
      }
    });
    console.log(name_,email,mob_no,message)
    name_=""
    email=""
    mob_no=""
    message=""
    console.log(name_,email,mob_no,message)
  })
  