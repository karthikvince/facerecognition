import React from 'react';
import './SignIn.css'

class SignIn extends React.Component{

   constructor(props){
     super(props)
     this.state = {
       emailAddr : '',
       pass : ''
     }
   }

  getEmailInput =(event) => {
    this.setState({emailAddr : event.target.value});
  }

  getPasswordInput =(event) => {
    this.setState({pass : event.target.value});
  }

  onSubmitSignIn = () =>{
    fetch('http://localhost:3000/signin',
    {
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        email : this.state.emailAddr,
        password : this.state.pass
      })
    })
    .then (response => response.json())
    .then (data => {
      if (data.id){
        this.props.loadUser(data);
        this.props.onRouteChange('home');
      }
    })
    
  }

   render(){
     return (
        <article className="br2 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
        <div className="measure content">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email" 
                name="email-address" 
                id="email-address"
                onChange={this.getEmailInput}/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password"
                onChange={this.getPasswordInput}/>
            </div>
          </fieldset>
          <div className="">
            <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => this.props.onRouteChange('register')} className="f5 link dim black db pointer">Register</p>
          </div>
        </div>
      </main>
      </article>
     );
   }
}

export default SignIn;