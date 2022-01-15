function connect(token , username){
  const spam = new Spam({
    button : {
      background : `linear-gradient(
      145deg,
      rgba(100,120,255,50),
      rgba(140,0,180,100))`}});
  
  const socket = io.connect("/" , {query : "token="+ token +"&username="+ username });
  socket.on('disconnect' , (reason)=> {
        window.location.href = "/auth/login";   
  })
}
        