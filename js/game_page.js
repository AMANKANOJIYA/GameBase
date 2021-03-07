// signout system----------------------------------------------
// function logout_l(){
//     firebase.auth().signOut().then(() => {
//     window.location.assign("http://127.0.0.1:5500/login.html")
//     }).catch((error) => {
//     console.log(error)
// })}
// // auth check if user sign up or loged in
// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//     } else {
//       // No user is signed in.
//       window.location.assign("http://127.0.0.1:5500/login.html")
//     }
//   });
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