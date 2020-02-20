import {Auth, Hub} from 'aws-amplify';
import React, { Component } from 'react';

class login extends Component {
    state = {user: null}

    //생명 주기
    componentDidMount() {

        //auth event listen
        Hub.listen("auth", ({ payload: { event, data } }) => {

            console.log("===auth event=== event : ", event);
            console.log("===auth event=== data : ", data);

            switch (event) {
                case "signIn":
                    this.setState({ user: data });
                    break;
                case "signOut":
                    this.setState({ user: null });
                    break;
                default:
                    break;
            }
        });

        Auth.currentAuthenticatedUser()
            .then(user => this.setState({ user }))
            .catch(() => console.log("Not signed in"));
    }

    render() {
        const { user } = this.state;

        return(
            <div>
                <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Open Google</button>
                <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
                {
                    //로그아웃 버튼
                    user ? (<button onClick={() => Auth.signOut()}>Sign Out {user.getUsername()}</button>) : "Login Required!"
                }
            </div>
        );
    }
}

export default login;
