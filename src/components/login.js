import {Auth, Hub} from 'aws-amplify';
import React, { Component } from 'react';

class login extends Component {
    state = {user: null}

    //생명 주기
    componentDidMount() {

        //auth event listen, to detect whether the user is signed in or not.
        Hub.listen("auth", ({ payload: { event, data } }) => {

            console.log("===auth event=== event : ", event);
            console.log("===auth event=== data : ", data);

            switch (event) {
                case "signIn":
                    //sign in 한 후 attribute를 저장
                    Auth.currentAuthenticatedUser().then(user=>{
                        let {attributes} = user;
                        this.setState({attributes});
                    });
                    break;
                case "signOut":
                    this.setState({ attributes: null });
                    break;
                default:
                    break;
            }
        });

        // check the current user when the App component is loaded
        Auth.currentAuthenticatedUser()
            .then(user => {
                let {attributes} = user;
                console.log(attributes)
                this.setState({attributes});
            })
            .catch(() => console.log("Not signed in"));
    }

    render() {
        const { attributes } = this.state;

        return(
            <div>
                <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Open Google</button>
                <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
                {
                    //로그아웃 버튼
                    attributes ? (<button onClick={() => Auth.signOut()}>Sign Out {attributes.email}</button>) : "Login Required!"
                }
            </div>
        );
    }
}

export default login;
