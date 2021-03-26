class Api{

    static async login(user,passw){
        var raw = JSON.stringify({ "username": user, "password": passw });
        var requestOptions = {
          method: 'POST',
          body: raw,
          headers:{"content-type":"application/json"}
        };
      const res =  await fetch("https://reqres.in/api/login", requestOptions)
           return  res.json() 
    } 
    
    static async getMovies(){
        var requestOptions = {
          method: 'GET',

          headers:{"content-type":"application/json","token": localStorage.token}
        };
      const res =  await fetch("https://reqres.in/api/users?page=2", requestOptions)
           return  res.json() 
    }
}

export default Api