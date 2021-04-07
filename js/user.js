
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
    } else {
      // No user is signed in.
      window.location.assign("login.html")
    }
  });

//data of user filter ====================================================
let user_image=document.getElementById("user_image")
let name_user=document.getElementById("name_user")
// let bio_user=document.getElementById("bio_user")
var firebaseref=firebase.database().ref("Admin");
firebaseref.on("value",(snapshot)=>{
    var data=snapshot.val();
    for (let i in data){
        console.log(data[i]["email"],user.email)
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
// liu genux pirate
// edit bio---------------------------------------------------
let edit_bio =document.getElementById("edit_bio");
let bio_user =document.getElementById("bio_user");
edit_bio.addEventListener("click",()=>{
    const main_c=document.getElementById("box-2")
    let  input_=document.createElement("textarea")
    input_.type="text";
    input_.value=bio_user.innerText
    input_.className="bio_user_inp"
    let  button_=document.createElement("button")
    button_.className="button"
    button_.id="Edit"
    button_.innerText="Edit"
    let  button_can=document.createElement("button")
    button_can.className="button_can"
    button_can.id="button_can"
    button_can.innerText="Cancel"
    main_c.appendChild(input_);
    main_c.appendChild(button_);
    main_c.appendChild(button_can);
    edit_bio.style.display="none"
    bio_user.style.display="none"
    document.getElementById("button_can").addEventListener("click",()=>{
        if (input_.value=bio_user.innerText){
            edit_bio.style.display=""
            bio_user.style.display=""
            input_.style.display="none";
            button_.style.display="none";
            button_can.style.display="none";
            location.reload();
        }
    })
    document.getElementById("Edit").addEventListener("click",()=>{
        firebase.database().ref('user/'+document.getElementById("name_user")).update({
            bio:input_.value,
          });
        location.reload();
    })
})
