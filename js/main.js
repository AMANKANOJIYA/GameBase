// --------------fade in animation for main-----------
let text=document.getElementById("main_text");
$(document).ready(function(){ 
    $(window).scroll(function(){ 
        $('#main_text').css("opacity", 1- $(window).scrollTop() / 400) 
        $("#main_text").css("margin-top",($(window).scrollTop()/400)*500)
        // console.log($(window).scrollTop()/400)*500 , 1- $(window).scrollTop() / 400)
    }) 
})
// vanila tilt shift----------------------------------
VanillaTilt.init(document.querySelector("#auth_user .background_gamefill #addgame"), {
  max: 10,
  speed: 400,
  glare:true,
  "max-glare":0.6
});
// signout system----------------------------------------------
function logout_l(){
    firebase.auth().signOut().then(() => {
    window.location.assign("login.html")
    }).catch((error) => {
    console.log(error)
})}
// auth check if user sign up or loged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var firebaseref=firebase.database().ref("Admin");
      firebaseref.once("value",(snapshot)=>{
        let email=snapshot.val()["email"]
        if (user.email==email){
          const div_game=document.getElementById("auth_user");
          div_game.style.display="block"
          const template=document.getElementById("addgame");
          let element=`
          <h2 class="auth_title" id="title_auth_l">create<span style="color:#FE8B04 ;"> account</span></h2>
          <form action="" method="post" class="form" id="login_form">
              <input type="text" id="addgame_name" placeholder="Name" autocomplete="off" class="input">
              <input type="url" id="addgame_link" placeholder="Game Link" autocomplete="off" class="input">
              <input type="url" id="addgame_imagelink" placeholder="Game Image Link" autocomplete="off" class="input">
              <input type="number" id="addgame_review" placeholder="Rating" autocomplete="off" class="input">
              <textarea type="text" id="addgame_description" placeholder="Game Description" cols="30" rows="10" autocomplete="off" class="input"></textarea>
          </form>
          <div class="button_auth">
              <div class="button" id="addgame" style="cursor:pointer;" onclick="addGame()">ADD Game</div>
          </div>
          </div>`
          template.innerHTML=element;
          edit_del(user.email,email);
        }
      })
    } else {
      // No user is signed in.
      window.location.assign("login.html")
    }
  });
// --------------------data from data base ----------------------------------
function edit_del(x,y) {
  if (x==y){
    var firebaseref=firebase.database().ref("GameBase");
  firebaseref.on("value",(snapshot)=>{
    let data=snapshot.val();
    for (let i in data){
        let element=`<img src="photos/edit.png" alt=""  class="image_edit ${i}" onclick="edit(this.id)" id="only_admin_icon_${i}">
                      <img src="photos/delete.png" alt="" class="image_edit ${i}"  onclick="delet(this.id)" id="only_admin_icon_${i}">`
    const main_c=document.getElementById(`admin_edit-${i}`);
    var div=document.createElement("div");
    div.innerHTML=element;
    main_c.appendChild(div);
    x+=1
    }
  })
  }
}
// content creator function
function content_creator(cont,tag){
  var firebaseref=firebase.database().ref("GameBase");
  firebaseref.on("value",(snapshot)=>{
    var data=snapshot.val();
    var x=0;
    for (let i in data){
      if (data[i]["Tag"]==tag && x<10){
        let element=`<div class="card unselectebal" id="card-${data[i]['Name']}">
        <div class="immage_con unselectebal">
            <img src="${data[i]['image_link']}" alt="IMAGE NOT FOUND">
            <div>${data[i]['Tag']}</div>
        </div>
        <div class="game_con unselectebal">
            <div class="game_name unselectebal">
            ${data[i]['Name']}
            <div class="admin_edit" id="admin_edit-${i}">
              </div>
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
    const main_c=document.getElementById(cont);
    var div=document.createElement("div");
    div.className="tilt";
    div.innerHTML=element;
    main_c.appendChild(div);
    x+=1
      }
    }
  })
}
content_creator("main_container_new","NEW")
content_creator("main_container_trend","TRENDING")
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
    let link=document.getElementById("addgame_link").value.replace(/<[^>]*>?/gm," ");
    let name=document.getElementById("addgame_name").value.replace(/<[^>]*>?/gm," ");
    let image_link=document.getElementById("addgame_imagelink").value.replace(/<[^>]*>?/gm," ");
    let desc=document.getElementById("addgame_description").value.replace(/<[^>]*>?/gm," ");
    let addgame_review=document.getElementById("addgame_review").value.replace(/<[^>]*>?/gm," ");
    var postListRef = firebase.database().ref('GameBase');
    var newPostRef = postListRef.push();
      newPostRef.set({
      Link:link,
      Name:name,
      Rate:addgame_review,
      Tag:"NEW",
      image_link:image_link,
      Views:0,
      description:desc
    })
    link=""
    name=""
    image_link=""
    desc=""
    location.reload();
}

// game _plY CLICK inc views --------------------------------------------------------
  const play_now=document.querySelectorAll(".play_now");
  play_now.forEach(element => {
    element.addEventListener("click",()=>{
      let link=element.href.split("?")[1].split("=")[1];
      firebase.database().ref("GameBase/"+link).on("value",function (snapshot){
        let view_s=parseInt( snapshot.val().Views)
       firebase.database().ref("GameBase/"+link).update({
         Views:view_s+1
     });
     });
    })
  });
// game delete function--------------------------------------------
function delet(id){
      let del_elem=document.getElementById(id);
      if (confirm("Are You sure you Want to delete This Game")){
        firebase.database().ref("GameBase/"+del_elem.classList[1]).remove();
        location.reload();
      }
}
// game Edit function--------------------------------------------
function edit(id){
  let edit_elem=document.getElementById(id);
      
      const edit=document.getElementById("edit");
      edit.style.display="flex"
      const cancel_edit=document.getElementById("cancel_edit");
      cancel_edit.addEventListener("click",()=>{
        edit.style.display="none"
      })
      // fill old value of the ffield====================================
      let editgame_name=document.getElementById("editgame_name");
      let editgame_link=document.getElementById("editgame_link");
      let editgame_imagelink=document.getElementById("editgame_imagelink");
      let editgame_description=document.getElementById("editgame_description");
      firebase.database().ref("GameBase/"+edit_elem.classList[1]).on("value",function (snapshot){
        editgame_name.value=snapshot.val().Name
        editgame_imagelink.value=snapshot.val().image_link
        editgame_description.value=snapshot.val().description
        editgame_link.value=snapshot.val().Link
      });

      // update field===============================================
      const ok_edit=document.getElementById("cancel_edit");
      ok_edit.addEventListener("click",()=>{
        firebase.database().ref("GameBase/"+edit_elem.classList[1]).update({
        Name:editgame_name.value,
        image_link:editgame_imagelink.value,
        description:editgame_description.value,
        Link:editgame_link.value
      });
      edit.style.display="none"
      location.reload();
  })
}

