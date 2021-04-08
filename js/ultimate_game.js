// back to previous page------------------------------------------------------------------
const close=document.getElementById("close_btn");
close.addEventListener("click",()=>{
  window.history.back();
})
// signout system-------------------------------------------------------------------------
function logout_l(){
    firebase.auth().signOut().then(() => {
    window.location.assign("login.html")
    }).catch((error) => {
    console.log(error)
})}
// auth check if user sign up or loged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      add_games();
      var firebaseref=firebase.database().ref("Admin");
      firebaseref.once("value",(snapshot)=>{
      let email=snapshot.val()["email"]
      if (user.email==email){
        admin_only(user.email,email)
      }})
    } else {
      // No user is signed in.
      window.location.assign("login.html")
    }
  });
// add games to ultimate game  stores----------------------------------------------------------
function admin_only(x,y){
  if (x==y){
  var firebaseref=firebase.database().ref("GameBase");
  firebaseref.on("value",(snapshot)=>{
  var data=snapshot.val();
  for (let i in data){
    let element= `
        <img src="photos/edit.png" alt=""  class="image_edit ${i}" onclick="edit(this.id)" id="only_admin_icon_${i}">
          <img src="photos/delete.png" alt="" class="image_edit ${i}"  onclick="delet(this.id)" id="only_admin_icon_${i}">`
    const main_c=document.getElementById(`game-${i}`);
    var div=document.createElement("div");
    div.className=`admin_only`
    div.id=`admin_only_${i}`
    div.innerHTML=element;
    main_c.appendChild(div);
}})}}
// adminonly____________________________________________________________________________
function add_games(){
  var firebaseref=firebase.database().ref("GameBase");
  firebaseref.on("value",(snapshot)=>{
  var data=snapshot.val();
  for (let i in data){
    let element= `
    <div class="game tilt ${i} game_name_${i}" id="game-${i}">
    <a href="game_page.html?game_id=${i}" id="game-a-${i}">
    <img class="img" src="${data[i]['image_link']}" alt="">
    <div class="game_name" id="game_name_${i}">${data[i]['Name']}</div>
    </a>
    </div>`
    const main_c=document.getElementById("game_section");
    var div=document.createElement("div");
    div.innerHTML=element;
    main_c.appendChild(div);
}
})
}
// To add filter of tags---------------------------------------------------------------
function filter_by_tag(tag){
  var firebaseref=firebase.database().ref("GameBase");
  firebaseref.on("value",(snapshot)=>{
    var data=snapshot.val();
    for (let i in data){
      let name=document.getElementById(`game_name_${i}`).parentElement.parentElement.parentElement;
      console.log(data[i]["Tag"].toUpperCase(),tag.toUpperCase())
      if (tag.toUpperCase()=="ALL"){
        name.style.display="";
      }
      else{
        if (data[i]["Tag"].toUpperCase()==tag.toUpperCase()){
          name.style.display="";
        }
        else{
          console.log(name[i])
          name.style.display="none";
        }
      }
  }
  })
};
document.getElementById("category").addEventListener("change",()=>{
  filter_by_tag(document.getElementById("category").value);
})
// get input element--------------------------------------------------------------------
let filter_input=document.getElementById("search_text_inp_ult")
// add event listener
filter_input.addEventListener("keyup",filtergames);

function filtergames() {
  // get value of input
  let filter_value=document.getElementById("search_text_inp_ult").value.toUpperCase();
  // get names
  let cont=document.getElementById("game_section");
  let name=document.querySelectorAll(".game");
  // loop through
  for (let i = 0; i < name.length; i++) {
    let specific_name=document.getElementById(name[i].classList[3])
    // if matches
    if (specific_name.innerHTML.toUpperCase().indexOf(filter_value)>-1 && name[i].parentElement.style.display=="none") {
      name[i].parentElement.style.display="";
      console.log(name[i].parentElement,specific_name.innerHTML.toUpperCase().indexOf(filter_value)>-1)
    } else if(specific_name.innerHTML.toUpperCase()=="") {
      name[i].parentElement.style.display="";
    }
    else {
      name[i].parentElement.style.display="none";
    }
  }
}
// tilt----------------------------------------------------------------------
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
console.log(id)
let edit_elem=document.getElementById(id);
console.log(edit_elem.classList)
  
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





