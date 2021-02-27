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
//geting data from url--------------------------------------
var url_string = window.location;
var url = new URL(url_string);
var game_id = url.searchParams.get("game_id");
// ======================================================= 
//   comment add and featuch
let comment=document.getElementById("comment");
function ready(){
  // comment from element
    comment=comment.value;
    // firebase user featuch
    let user=firebase.auth().currentUser;
    let email=user.email;
    var firebaseref=firebase.database().ref("user");
    firebaseref.once("value",(snapshot)=>{
      var data=snapshot.val();
      for (let i in data){
        if (data[i]["email"]==email){
          let main_c=data[i]["user_name"]
          break
        }
      }
    })
    console.log(main_c)
    // date and time
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    return [comment,dateTime]
}
const comment_btn=document.getElementById("comment_btn");
comment_btn.onclick=()=>{
    let data= ready();
    var postListRef = firebase.database().ref('Comment');
    var newPostRef = postListRef.push();
    console.log(document.getElementById("comment_user"))
    console.log(data)
    newPostRef.set({
        Time:data[1],
        comment:data[0],
        game_id:game_id,
        user:username
    });
}

let some_comment=document.getElementById("some_comment");
var firebaseref=firebase.database().ref("Comment");
  firebaseref.on("value",(snapshot)=>{
    var data=snapshot.val();
    for (let i in data){
      if (data[i]["game_id"]==game_id) {
        let element=`
        <img src="photos/logo-fullsize.png" alt="" class="user_comment_pic" id="user_comment_pic">
        <div class="content">
            <div class="intro_content">
                <div class="name_comment">${data[i]["user"]}</div>
                <div class="time_comment">${data[i]["Time"]}</div>
            </div>
            <div class="comment_text">${data[i]["Comment"]}
            </div>
        </div>`
        const main_c=document.getElementById("some_comment");
        var div=document.createElement("div");
        div.className="comment"
        div.id="comment"
        div.innerHTML=element;
        main_c.appendChild(div);
      }
    }
  })