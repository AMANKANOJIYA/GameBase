// ==Search===========================================================
let close_icon_inp=document.getElementById("close_icon_inp")
let search_btn=document.getElementById("search_now")
let search=document.getElementById("search")
search_btn.addEventListener("click",()=>{
  console.log("triggered")
  search.style.display="flex";
  console.log("triggered-in")
})
close_icon_inp.addEventListener("click",()=>{
  search.style.display="none";
})
// let search_txt=document.getElementById("search_text_inp")
// search_txt.addEventListener("input",()=>{
//   var firebaseref=firebase.database().ref("GameBase");
//   firebaseref.on("value",(snapshot)=>{
//     var data=snapshot.val();
//     for (let i in data){
//       if (search_txt in data[i]["Name"]){
//         console.log(data[i]["Name"])
//       }
//     }
//   })
//   var ref = firebase.database().ref().child("GameBase");
// ref.startAt(search_txt.value).once("value").then( function(snapshot) {
//   console.log(snapshot.val);
// });
// // .orderByKey("Name")
// })