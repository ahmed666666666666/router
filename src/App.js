import React from "react";
import css from './App.css'
import Api from './Api'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends React.Component{
  render(){
    return(
      <MainPage/>
        );
  }
}


class MainPage extends React.Component{
  render(){
    return(
      <div>
        <Router>
        <div>
          <nav>
            <ul>
              
              <li>
                <Link to="/Movies">Movies</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/todo">todo</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/movies">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/todo">
              <Todo />
            </Route>
          </Switch>
        </div>
      </Router>
        </div>
    );
  }
}

class Todo extends React.Component {
  render(){
    return(
      <Container/>   
   )
  }
}

class About extends React.Component {

  constructor(){
    super()
    this.state = {
      movies:[],
    }
  }

  async componentDidMount(){
    const list = await Api.getMovies()
    console.log(list.data) 
    this.setState({movies:list.data})
  }

  render(){
  return(
  <div>{this.state.movies.map((item,index)=> <img key={index} src={item.avatar}/>)}</div>
  );
}
}

class Users extends React.Component {
  
  constructor(){
    super()
    this.state = {
      user : "",
      password:"",
    }
  }

  getuser =(e)=>{
      this.setState({user:e.target.value})
    console.log(e.target.value)
  }

  getpass = (e)=>{
      this.setState({password:e.target.value}) 
    console.log(e.target.value)
}
log = async()=>{
  const token = await Api.login(this.state.user,this.state.password) 
   console.log(token.token)
  if(token.token){
    localStorage.token = token
  }
  }

  render(){
  return (
    <div className="login">
      <input onChange={this.getuser} placeholder="E-mail"/>
      <input onChange={this.getpass} placeholder="Password"/>
      <button onClick={this.log} type="submit">Submit</button>     
    </div>
  );
}
}

class Container extends React.Component{

  render(){
    return(
    <div className="container">      
      <Form/>
    </div>
    );
  }
}


class Form extends React.Component{

  constructor(){
    super()
    this.state = {
      tasks : [],
    }
  }

addTask = () =>{
 var val = document.getElementById("input").value
 this.state.tasks.push(val)
 this.setState({tasks:this.state.tasks}) 
}

  render(){
    return(
    <div>
        <List tasks = {this.state.tasks} />
        <div id="form">
          <div id="i">
          <input id="input" type="text"/>
          <button id="add" onClick={this.addTask}>ADD</button>
        </div>
      </div>
    </div>
    );
  }
}

class List extends React.Component{

  render(){
    return(
      <div className="list">
        <div className="listItem">
          <ListItem items = {this.props.tasks}/>  
        </div>
      </div>
       );
  }
}

class ListItem extends React.Component{
  render(){
    return(
        <div id="listItem">{this.props.items.map(item=><div>{item}</div>)}</div>
        );
  }
}



export default App;
