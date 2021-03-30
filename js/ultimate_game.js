// back to previous page------------------------------------------------------------------
const close=document.getElementById("close_btn");
close.addEventListener("click",()=>{
  window.history.back();
})
// signout system-------------------------------------------------------------------------
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
// add games to ultimate game  stores----------------------------------------------------------
  var firebaseref=firebase.database().ref("GameBase");
  firebaseref.on("value",(snapshot)=>{
    var data=snapshot.val();
    for (let i in data){
          let element= `<a href="game_page.html?game_id=${i}"><div class="game tilt ${i}" id="game-${i}">
          <img src="${data[i]['image_link']}" alt="">
          <div class="game_name" id="game_name_id">${data[i]['Name']}</div>
      </div></a>`
      const main_c=document.getElementById("game_section");
      var div=document.createElement("div");
      // div.className="tilt"
      div.innerHTML=element;
      main_c.appendChild(div);
    }
  })
// To add filter of tags---------------------------------------------------------------
function filter_by_tag(tag){
  var firebaseref=firebase.database().ref("GameBase");
  firebaseref.on("value",(snapshot)=>{
    var data=snapshot.val();
    for (let i in data){
      let name=document.getElementById(`game-${i}`).parentElement.parentElement;
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
    let specific_name = name[i].getElementsByTagName("div")[0];
    // if matches
    if (specific_name.innerHTML.toUpperCase().indexOf(filter_value)>-1 && name[i].parentElement.parentElement.style.display=="none") {
      name[i].parentElement.parentElement.style.display="";
    } else {
      name[i].parentElement.parentElement.style.display="none";
    }
  }
}
// tilt----------------------------------------------------------------------




