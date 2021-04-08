// ==Search===========================================================
let close_icon_inp=document.getElementById("close_icon_inp")
let search_btn=document.getElementById("search_now")
let search_now_ham=document.getElementById("search_now_ham")
let search=document.getElementById("search")
console.log(search_now_ham,search,search_btn)
search_btn.addEventListener("click",()=>{
  search.style.display="flex";
})
close_icon_inp.addEventListener("click",()=>{
  search.style.display="none";
})
search_now_ham.addEventListener("click",()=>{
  search.style.display="flex";
})

let search_txt=document.getElementById("search_text_inp")
const main_c=document.getElementById("search_res");
// add games to ultimate game  stores
var firebaseref=firebase.database().ref("GameBase");
firebaseref.on("value",(snapshot)=>{
  var data=snapshot.val();
  for (let i in data){
    let element=`<img src="${data[i]['image_link']}" alt="">
    <h3>${data[i]['Name']}</h3>`
    var div=document.createElement("a");
    div.innerHTML=element;
    div.href=`game_page.html?game_id=${i}`
    div.className="search_res_game"
    div.id=`search_res_game-${i}`
    main_c.appendChild(div);
  }
})

// get input element
let filter_input=document.getElementById("search_text_inp")
// add event listener
filter_input.addEventListener("keyup",filtergames);

function filtergames() {
    // get value of input
    let filter_value=document.getElementById("search_text_inp").value.toUpperCase();
    // get names
    let cont=document.getElementById("search_res");
    let name=cont.querySelectorAll(".search_res_game");
    // loop through
    for (let i = 0; i < name.length; i++) {
      let specific_name = name[i].getElementsByTagName("h3")[0];
      // if matches
      if (specific_name.innerHTML.toUpperCase().indexOf(filter_value)>-1) {
        name[i].style.display="";
      } else {
        name[i].style.display="none";
      }
    }
}
