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

//data of user filter ====================================================
let user_image=document.getElementById("user_image")
let name_user=document.getElementById("name_user")
let bio_user=document.getElementById("bio_user")
var firebaseref=firebase.database().ref("Admin");
firebaseref.on("value",(snapshot)=>{
    console.log("this is working")
    var data=snapshot.val();
    console.log(data)
    for (let i in data){
        console.log("this is working")
        if (data[i]["email"]==user.email){
            console.log(data[i]["data"],user.email)
            user_image.src=data[i]["image"]
            name_user.innerText=data[i]["Name"]
            bio_user.innerText=data[i]["bio"]
        }
    }
})
// faq sequencing=========================================
var firebaseref=firebase.database().ref("faq");
firebaseref.on("value",(snapshot)=>{
    var data=snapshot.val();
    for (let i in data){
        let element=` <p id="question" class="question"><span class="symbols">Q></span>${data[i]["question"]}<span class="symbols">?</span></p>
    <p id="answer" class="answer"><span class="symbols">Ans.</span> ${data[i]["answers"]}</p>
        <hr>`
        const main_c=document.getElementById("content_use");
        var div=document.createElement("div");
        div.className="question_block";
        div.id="question_block-1";
        div.innerHTML=element;
        main_c.appendChild(div);
    }
})
