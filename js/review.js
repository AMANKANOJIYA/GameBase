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
//   comment add and featuch
let comment=document.getElementById("comment");

function ready(){
    comment=comment.value;
    let user=firebase.auth().currentUser;
    let email=user.email;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(dateTime,comment,email)
}
const comment_btn=document.getElementById("comment_btn");
comment_btn.onclick=()=>{
    ready();
    // firebase.database.ref("Comment/"+id).set({
    //     Time:date,
    //     comment:commment,
    //     game_id:,
    //     user:email
    // })
}