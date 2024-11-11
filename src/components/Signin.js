import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SignUp from './SignUp';
import { withRouter } from 'react-router';
import api from '../api'

class Signin extends Component {
    state = {
        invalidUserName:false,
        invalidPassword:false,
        username:"",
        password:"",
        show:false,
    }
   
    
    handleChange(e){
       
        e.preventDefault();
        const value = e.target.value;
        this.setState(
          {
            ...this.state,
            [e.target.name]: value
          });
    }

     async handleSubmit(e){
        const {invalidUserName,invalidPassword,username,password} = this.state
        const loggingInUser = {
             "UserName" : username,
             "Password" : password
         }

        await api.loginUser(loggingInUser)
         .then((res) => {
             console.log("al rag3ly mn login" , res.data.data) ; 
             localStorage.setItem('token',res.data.token)
             localStorage.setItem('userId', res.data.data.userId);
             localStorage.setItem('type', res.data.type)

             console.log(localStorage.getItem('type', res.data.type),"in sign in ")
             
             if(res.data.type){
                 this.props.history.push('/admin')
             }
             else{
                this.props.history.goBack() 
             }

           
         }).catch((err) => {
             console.log("login heho ", err);

             if(err.response){
                console.log(err.response.data);
                if(err.response.data.message==="invalid username"){
                    this.setState({invalidUserName:true})
                }
                else if(err.response.data.message==="invalid password"){
                    this.setState({invalidPassword:true,invalidUserName:false})
                }
            }
         })
    }

    //for sign up 
    handleModalShow() {
       
        this.setState(
            {
              show: !this.state.show
            });
    }


    
 
    render() {
        const {invalidUserName,invalidPassword,username,password,show} = this.state
        return (
        
          <>
                <Form hasValidation>
                <Form.Group className="mb-3">
                    <Form.Control size="lg"  type="text" name="username" value={username}  required isInvalid={invalidUserName} placeholder="Enter Username" onChange={this.handleChange.bind(this)} />
                    <Form.Control.Feedback type="invalid" >
                        Username does not exist.
                     </Form.Control.Feedback>
            
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control size="lg" type="password" name="password" value={password}  required isInvalid={invalidPassword} placeholder="Password" onChange={this.handleChange.bind(this)}/>
                    <Form.Control.Feedback type="invalid" >
                        Incorrect Password.
                     </Form.Control.Feedback>
                </Form.Group>
               
                <div className="flex-col">
                   

                     <>
                    <style type="text/css">
                        {`
                        .btn-flat {
                        font-weight:600;
                        background-color: #37A1E2;
                        color: white;
                        width:100%;
                        }
                        .btn-flat:hover {
                            background-color: #2452b6;
                            color: white;
                            width:100%;
                        }

                        `}
                    </style>

                    <Button variant="flat" size="lg"  onClick={this.handleSubmit.bind(this)}  >
                        Log in
                    </Button>
                    </>
                    
                    <div className = "v2"> </div>
                    <Button variant="success" size="lg" style={{marginTop:"10px" , fontWeight:"600"}}   onClick={this.handleModalShow.bind(this)}>
                        Create New Account
                    </Button>
                </div>
                </Form>

                <SignUp show={show} closeModal={(show)=> this.setState({show})} />
               </>
        )
    }
}
export default withRouter(Signin);