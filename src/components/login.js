import {Auth, Hub} from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import {StyledButton, LoginInput} from './login.styled';

const Login = ()=>{
    const [user, setUser] = useState('null');
    const [inputs, setInputs] = useState({
        id: '',
        password: ''
    });
    const [authState, setAuthState] = useState('loading');

    useEffect(()=>{

        //auth event listen, to detect whether the user is signed in or not.
        Hub.listen("auth", async({ payload: { event, data } }) => {

            console.log("===auth event=== event : ", event);
            console.log("===auth event=== data : ", data);

            switch (event) {
                case "signIn":
                    //sign in 한 후 attribute를 저장
                    const {attributes, signInUserSession} = await Auth.currentAuthenticatedUser();
                    setUser({attributes, signInUserSession});
                    setAuthState('signedIn');
                    break;

                case "signOut":
                    setAuthState('signIn');
                    setUser({ attributes: null, signInUserSession: null});
                    break;

                default:
                    break;
            }
        });

        //현재 로그인 여부 체크
        const checkSignedUser = async ()=>{
            try{
                const {attributes, signInUserSession} = await Auth.currentAuthenticatedUser();
                setUser({attributes, signInUserSession});
                setAuthState('signedIn');
            }catch (e) {
                setAuthState('signIn');
                console.log("Not signed in")
            }
        };

        checkSignedUser();

    }, []);

    const { id, password } = inputs;
    const signOut = () => Auth.signOut();
    const onChange = (e) => {
        const {id, password} = e.target;
        setInputs({
            ...inputs,      //기존 객체 복사
            id,
            password
        })
    };

    return (

        <div>
            {authState==='loading' && (<div>loading...</div>)}
            {authState==='signIn' && (
                <div>
                    <LoginInput name="id" placeholder="ID" onChange={onChange} value={id}/>
                    <LoginInput name="password" placeholder="Password" onChange={onChange} value={password}/>
                    <StyledButton backgroundColr="black">Login</StyledButton>
                    <StyledButton backgroundColr="black">SignUp</StyledButton>
                    <StyledButton backgroundColor="blue" onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Login With Google</StyledButton>
                    {/*<StyledButton backgroundColor="white" color="black" onClick={() => Auth.federatedSignIn()}>Login Dialog</StyledButton>*/}
                </div>
                )}
            {authState==='signedIn' && (
                <StyledButton onClick={signOut}>Sign Out {user.attributes.email}</StyledButton>
            )}
        </div>
    )
};

export default Login;
