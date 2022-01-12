function register(username , email , password , rpassword){
  server.post("/auth/register" , {
    username : username,
    email : email,
    password : password,
    rpassword : rpassword
  },(data , response)=>{
    
  });
}