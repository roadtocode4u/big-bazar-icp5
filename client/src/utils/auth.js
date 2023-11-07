export const checkLogin = async () =>{
  const user = JSON.parse(localStorage.getItem("user")) || null;

  if(!user){
    alert("Please login first!");
    window.location.href = "/login";
  }
}

