function logout_l(){
    firebase.auth().signOut().then(() => {
    window.location.assign("http://127.0.0.1:5500/login.html")
    }).catch((error) => {
    console.log("error")
})}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("this is loged in")
    } else {
      // No user is signed in.
      window.location.assign("http://127.0.0.1:5500/login.html")
    }
  });


