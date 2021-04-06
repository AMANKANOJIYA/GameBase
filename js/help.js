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
          document.getElementById("main_admin").style.display="block";
          user_admin()
        }
      })
    } else {
      // No user is signed in.
      window.location.assign("login.html")
    }
  });

  function error_gen(code,message){
    let error=document.getElementById("error");
    let error_text=document.getElementById("error_text");
    error.style.display="flex";
    error_text.innerText=code+" :ERROR !! "+message 
  }
  
  let submit=document.getElementById("submit")  
  submit.addEventListener("click",()=>{
    var name_=document.getElementById("name").value.replace(/<[^>]*>?/gm," ")
    var email=document.getElementById("email").value.replace(/<[^>]*>?/gm," ")
    var mob_no=document.getElementById("mob_no").value.replace(/<[^>]*>?/gm," ")
    var message=document.getElementById("message").value.replace(/<[^>]*>?/gm," ")
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    firebase.database().ref('contact/' + name_).set({
      email:email,
      name:name_,
      message:message,
      mobile_no:mob_no,
      Time:dateTime
    }, (error) => {
      if (error) {
        // error_gen(error.code,error.message)
        console.log(error.code,error.message )
      } else {
        console.log("it wirks4")
      }
    });
    name_=""
    email=""
    mob_no=""
    message=""
  })
  // user_auth -------------------------------------------------------
   function user_admin(){
    //  creating table element ----------------------------------
    let element1=`<thead>
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile No</th>
        <th>Message</th>
        <th>Delete</th>
    </tr>
    </thead>
    <tbody id="tbody">
    </tbody>`
    const main_c=document.getElementById("main_admin");
    var div=document.createElement("table");
    div.className="table";
    div.innerHTML=element1;
    main_c.appendChild(div);

    // adding data to table using dynamic addding---------------------
    var firebaseref=firebase.database().ref("contact");
    firebaseref.on("value",(snapshot)=>{
      var data=snapshot.val();
      for (let i in data){
        let element2=`<td class="name" data-lable="Name" id="${i}">${data[i]["name"]}</td>
        <td data-lable="Email">${data[i]["email"]}</td>
        <td data-lable="Monile No">${data[i]["mobile_no"]}</td>
        <td class="message" data-lable="Message">${data[i]["message"]}</td>
        <td  data-lable="Delete"><img src="photos/delete.png" alt="" class="image_edit_cont ${i}"  onclick="delet_cont(this.id)" id="only_admin_icon_del_${i}"></td>`
        const tbody=document.getElementById("tbody");
        var div=document.createElement("tr");
        div.innerHTML=element2;
        tbody.appendChild(div);
      }
    })
   }

function delet_cont(id) {
  let del_elem=document.getElementById(id);
  if (confirm("Do you realy want to delete this Query ??")){
    firebase.database().ref("contact/"+del_elem.classList[1]).remove();
    location.reload();
  }
}