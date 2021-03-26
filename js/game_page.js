  // close=====================================================
  const close=document.getElementById("close");
  close.addEventListener("click",()=>{
    window.history.back();
  })
  const review=document.getElementById("review");
 review.addEventListener("click",()=>{
   console.log("this was triggered")
    window.location.assign(`review.html?game_id=${game_id}`)
  })
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
  function error_gen(code,message){
    let error=document.getElementById("error");
    let error_text=document.getElementById("error_text");
    error.style.display="flex";
    error_text.innerText=code+" :ERROR !! "+message 
  }
// --------------------data from data base ----------------------------------
  const game_in=document.getElementById("game_in");
  const main=document.getElementById("game_block");
  const fullscreen=document.getElementById("fullscreen");
  const closer=document.getElementById("closers");
  fullscreen.addEventListener("click",()=>{
    main.classList.add("maxi-width");
    game_in.classList.add("maxi_game");
    closer.style.display="block";
    fullscreen.style.display="none";
  })
 closer.addEventListener("click",()=>{
    main.classList.remove("maxi-width");
    game_in.classList.remove("maxi_game");
    closer.style.display="none";
    fullscreen.style.display="block";
  })
  // url extractor--------------------------------------------------------
var url_string = window.location;
var url = new URL(url_string);
var game_id = url.searchParams.get("game_id").replace(/<[^>]*>?/gm," ");
// screen changer==============================================
var firebaseref=firebase.database().ref("GameBase");
  firebaseref.once("value",(snapshot)=>{
    var data=snapshot.val();
    for (let i in data){
      if(i==game_id){
        game_in.src=data[i]["Link"]
      }
    }
  })

