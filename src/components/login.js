import {Auth, Hub} from 'aws-amplify';
import React, { useEffect, useState } from 'react';

const Login = ()=>{
    const [user, setUser] = useState('null');
    const [authState, setAuthState] = useState('loading');

    useEffect(()=>{

        //auth event listen, to detect whether the user is signed in or not.
        Hub.listen("auth", async({ payload: { event, data } }) => {

            console.log("===auth event=== event : ", event);
            console.log("===auth event=== data : ", data);

            switch (event) {
                case "signIn":
                    //sign in 한 후 attribute를 저장
                    const {attributes} = await Auth.currentAuthenticatedUser();
                    setUser({attributes});
                    setAuthState('signedIn');
                    break;

                case "signOut":
                    setAuthState('signIn');
                    setUser({ attributes: null });
                    break;

                default:
                    break;
            }
        });

        //현재 로그인 여부 체크
        const checkSignedUser = async ()=>{
            try{
                const {attributes} = await Auth.currentAuthenticatedUser();
                setUser({attributes});
                setAuthState('signedIn');
                console.log("signedIn", attributes);
            }catch (e) {
                setAuthState('signIn');
                console.log("Not signed in")
            }
        }

        checkSignedUser();

    }, []);

    const signOut = () => Auth.signOut();

    return (

        <div>
            {authState==='loading' && (<div>loading...</div>)}
            {authState==='signIn' && (
                <div>
                    <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Open Google</button>
                    <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
                </div>
            )}
            {authState==='signedIn' && (
                <button onClick={signOut}>Sign Out {user.attributes.email}</button>
            )}
        </div>
    )
};

export default Login;
