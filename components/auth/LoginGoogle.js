import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import { loginWithGoogle, authenticate, isAuth, confirmcode } from '../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../config';
import { useRouter } from 'next/router'

const LoginGoogle = () => {
    const router = useRouter();
    const { redirect_url } = router.query;

    const [currentUrl, setCurrentUrl] = useState(redirect_url)
    const [values, setValues] = useState({
        error: '',
        loading: false,
        message: ''
    });
    const { error, loading, message } = values;
    const responseGoogle = response => {

        const tokenId = response.tokenId;
        const user = { tokenId, redirect_url };

        loginWithGoogle(user).then(data => {

            if (data.message) {
                setValues({ ...values, error: data.message, loading: false });
                //verify code and return details(token & userdetails)
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
            } else {
                if (data.redirect_url !== '') {
                    //const url = data.redirect_url;
                    const userCode = data.userCode;
                    const email = data.email;


                    window.location = `https://${redirect_url}/?code=${userCode}?email=${email}`;
                }

                const code = { code: data.userCode, email: data.email };
                confirmcode(code).then(data => {
                    authenticate(data, () => {
                        if (isAuth() && isAuth().role === 1) {
                            Router.push(`/admin`);
                        } else {
                            Router.push(`/user`);
                        }
                    });
                })
            }
        });

    };
    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');
    return (
        <div className="pb-3">
            {showError()}
            {showLoading()}
            {showMessage()}
            <GoogleLogin
                clientId={`${GOOGLE_CLIENT_ID}`}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                theme="dark"
            />
        </div>
    );
};

export default LoginGoogle;
