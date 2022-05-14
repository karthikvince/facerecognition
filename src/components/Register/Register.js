import React from 'react';



class Register extends React.Component{

    constructor(props){
      super(props)
      this.state = {
        emailAddr : '',
        pass : '',
        name : ''
      }
    }
 
   getEmailInput =(event) => {
     this.setState({emailAddr : event.target.value});
   }
 
   getPasswordInput =(event) => {
     this.setState({pass : event.target.value});
   }

   getNameInput =(event) => {
    this.setState({name : event.target.value});
  }
 
   onSubmitRegister = () =>{
     fetch('http://localhost:3000/register',
     {
       method : 'post',
       headers : {'Content-Type' : 'application/json'},
       body : JSON.stringify({
         email : this.state.emailAddr,
         password : this.state.pass,
         name : this.state.name
       })
     })
     .then (response => response.json())
     .then (data => {
      this.props.loadUser(data);
      this.props.onRouteChange('home');
      })
     
  }
     

  render(){
  return (
      <article className="br2 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
        <div className="measure" style={{textAlign : 'center'}}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input 
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="text" 
              name="name"  
              id="name"
              onChange={this.getNameInput}/>
            </div>
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
            <div className="">
            <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
            </div>
          </fieldset>
        </div>
      </main>
    </article>
    );
  }

}
export default Register;