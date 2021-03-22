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
    } else {
      // No user is signed in.
      window.location.assign("http://127.0.0.1:5500/login.html")
    }
  });
  //geting data from url--------------------------------------
var url_string = window.location;
var url = new URL(url_string);
var game_id = url.searchParams.get("game_id");

  // add comments alll
  var firebaseref=firebase.database().ref("Comment");
  firebaseref.once("value",(snapshot)=>{
    var data=snapshot.val();
    var x=1
    for (let i in data){
      if (data[i]["game_id"]==game_id) {
        let main_con=document.getElementById("comments");
        let element=`<div class="comment"  id="comment${x}">
        <img src="photos/logo-fullsize.png" alt="" class="user_comment_pic" id="user_comment_pic${x}">
        <div class="content">
            <div class="intro_content">
                <div class="name_comment">${data[i]["user"]}</div>
                <div class="time_comment">${data[i]["Time"]}</div>
            </div>
            <div class="comment_text">${data[i]["Comment"]}
            </div>
        </div>
        </div>`
        var div=document.createElement("div");
        div.innerHTML=element;
        main_con.appendChild(div);
        x=x+1
      }
    }  
  })
