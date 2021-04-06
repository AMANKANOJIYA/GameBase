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
      // window.location.assign("http://127.0.0.1:5500/login.html")
      window.location.assign("login.html")
    }
  });
//geting data from url--------------------------------------
var url_string = window.location;
var url = new URL(url_string);
var game_id = url.searchParams.get("game_id").replace(/<[^>]*>?/gm," ");
document.getElementById("seemore").href=`http://127.0.0.1:5500/read_more.html?game_id=${game_id}`
// data to change in the give thoings-------------------------
const game_image=document.getElementById("game_image");
const review_num=document.getElementById("review_num");
const views_num=document.getElementById("views_num");
const game_name=document.getElementById("game_name");
const description=document.getElementById("description_text");
const rate_value=document.getElementById("rate_value");
const rate_progress=document.getElementById("rate_progress");
var firebaseref=firebase.database().ref("GameBase");
  firebaseref.once("value",(snapshot)=>{
    var data=snapshot.val();
    for (let i in data){
      if(i==game_id){
        game_image.src=data[i]["image_link"]
        game_name.innerText=data[i]["Name"]
        views_num.innerText=data[i]["Views"]
        description.innerText=data[i]["description"]
        review_num.innerText=data[i]["Rate"]
        rate_value.innerText=data[i]["Rate"]
        console.log(rate_progress.style.width)
        rate_progress.style.width=`${(parseFloat(data[i]["Rate"])/5)*100}%`
        console.log((parseFloat(data[i]["Rate"])/5)*100)
        console.log(rate_progress.style.width)
      }
    }
  })
// ======================================================= 
//   comment add and featuch
function addcomment(){
    // firebase user featuch
    let user=firebase.auth().currentUser;
    let email=user.email;
    // date and time
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    firebase.database().ref("usered").once("value").then(function(element){
    // comment from element
    let comment=document.getElementById("comment");
    comment=comment.value.replace(/<[^>]*>?/gm," ");
      let data=element.val()
      for (const key in data) {
        if (data[key]["email"]==email && comment!="") {
          var postListRef = firebase.database().ref('Comment');
          var newPostRef = postListRef.push();
          newPostRef.set({
          Time:dateTime,
          Comment:comment,
          game_id:game_id,
          user:data[key]["user_name"]
        });
        location.reload();
        }
      }
    })
}

let some_comment=document.getElementById("some_comment");
let seemore=document.getElementById("seemore");
var firebaseref=firebase.database().ref("Comment");
  firebaseref.once("value",(snapshot)=>{
    var data=snapshot.val();
    for (let i in data){
      let x =0
      if (data[i]["game_id"]==game_id && x<6) {
        console.log(data[i])
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
        if (x>=5){
          seemore.style.display="flex"
        }
        var div=document.createElement("div");
        div.className="comment"
        div.id="comment"
        div.innerHTML=element;
        main_c.appendChild(div);
        x=x+1
      }
    }
  })