function login(username , password){
 
  const spam = new Spam({button:{
    background: `linear-gradient(
    145deg,
    rgba(100,120,255, 50),
    rgba(140,0,180, 100)
  )`
}});
  
  server.post("/auth/login" , {
    username : username,
    password : password,
  },(data , response)=>{
    if(response === 200){
       data = JSON.parse(data);
      if(!data.status){
        spam.alert({
          title: null,
          text: data.message,
          action: ()=>{return null;}
        });
      }else{
        window.localStorage.setItem("token", data.message);
        window.localStorage.setItem("username" , username);
        window.location.href = "/";
      }
    }else{
       spam.alert({
        title : "Error:",
        text : "Error...",
        action : ()=>{return null;}
      });
    }
  });
}