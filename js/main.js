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
      if (user.email=="amarsingh@gmail.com"){
        const div_game=document.getElementById("auth_user");
        div_game.style.display="block"
              const template=document.getElementById("addgame");
              let element=`
              <h2 class="auth_title" id="title_auth_l">create<span style="color:#FE8B04 ;"> account</span></h2>
              <form action="" method="post" class="form" id="login_form">
                  <input type="text" id="addgame_name" placeholder="Name" autocomplete="off" class="input">
                  <input type="url" id="addgame_link" placeholder="Game Link" autocomplete="off" class="input">
                  <input type="url" id="addgame_imagelink" placeholder="Game Image Link" autocomplete="off" class="input">
                  <textarea type="text" id="addgame_description" placeholder="Game Description" cols="30" rows="10" autocomplete="off" class="input"></textarea>
              </form>
              <div class="button_auth">
                  <div class="button" id="addgame" style="cursor:pointer;" onclick="addGame()">ADD Game</div>
              </div>
              </div>`
              template.innerHTML=element;
      }
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
              <img src="${data[i]['image_link']}" alt="IMAGE NOT FOUND">
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
                  <a href="game_page.html?game_id=${i}" class="play_now">Play Now</a>
                  <a href="review.html?game_id=${i}">Review</a>
              </div>
          </div>
      </div>`
      const main_c=document.getElementById("main_container");
      var div=document.createElement("div");
      div.className="tilt";
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
// scroll-----took help form codepen--------------------------------------------
const slider = document.querySelectorAll('.main_container');
let isDown = false;
let startX;
let scrollLeft;
slider.forEach((slider)=>{
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) ; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
})
// add.------ game for admin-------------------
function addGame(){
    let link=document.getElementById("addgame_link").value;
    let name=document.getElementById("addgame_name").value;
    let image_link=document.getElementById("addgame_imagelink").value;
    let desc=document.getElementById("addgame_description").value;
    var postListRef = firebase.database().ref('GameBase');
    var newPostRef = postListRef.push();
      newPostRef.set({
      Link:link,
      Name:name,
      Rate:0.0,
      Tag:"NEW",
      image_link:image_link,
      Views:0,
      description:desc
    })
    link=""
    name=""
    image_link=""
    desc=""
}

// game _plY CLICK inc views 
const play_now=document.querySelectorAll(".play_now");
play_now.forEach(element => {
  element.addEventListener("click",()=>{
    let link=element.href.split("?")[-1].split("=")[-1];
  })
});

// vanila tilt shift----------------------------------
VanillaTilt.init(document.querySelector("#auth_user .background_gamefill #addgame"), {
  max: 10,
  speed: 400,
  glare:true,
  "max-glare":0.6
});
