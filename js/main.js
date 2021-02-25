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
// --------------------data from data base ----------------------------------
  var firebaseref=firebase.database().ref("GameBase");
  firebaseref.once("value",(snapshot)=>{
    var data=snapshot.val();
    for (let i in data){
      let element=`<div class="card unselectebal" id="card-${data[i]['Name']}">
      <div class="immage_con unselectebal">
          <img src="photos/bg-story.7.jpg" alt="IMAGE NOT FOUND">
          <div>${data[i]['Tag']}</div>
      </div>
      <div class="game_con unselectebal">
          <div class="game_name unselectebal">
          ${data[i]['Name']}
          </div>
          <div class="game_info unselectebal">
              <div class="rate unselectebal">${data[i]['Rate']}   rating</div>
              <div class="views unselectebal" style="color: #9d9d9d;"><span style="color: #4025FB; font-weight: 600;">${data[i]['Views']}</span> Views </div>
          </div>
          <div class="imp_btn unselectebal">
              <a href="${data[i]['Link']}">Play Now</a>
              <a href="">Review</a>
          </div>
      </div>
  </div>`
  const main_c=document.getElementById("main_container");
  var div=document.createElement("div");
  div.innerHTML=element;
  main_c.appendChild(div);
    }
  })
// --------------fade in animation for main-----------
let text=document.getElementById("main_text");
  $(document).ready(function(){ 
    $(window).scroll(function(){ 
        $('#main_text').css("opacity", 1- $(window).scrollTop() / 400) 
        $("#main_text").css("margin-top",($(window).scrollTop()/400)*500)
    }) 
}) 