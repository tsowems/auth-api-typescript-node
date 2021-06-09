import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth, confirmcode } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';
import { useRouter } from 'next/router';

const SigninComponent = () => {

    const router = useRouter();
    const { redirect_url } = router.query;
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirect_url: '',
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/user`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        const user = { email, password, redirect_url };

        signin(user).then(data => {

            if (data.message) {
                setValues({ ...values, error: data.message, loading: false });
                //verify code and return details(token & userdetails)
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
            } else {
                if (data.redirect_url !== '') {
                    const url = data.redirect_url;
                    const userCode = data.userCode;
                    const email = data.email;
                    window.location = `https://${url}/?code=${userCode}?email=${email}`;
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

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control"
                        placeholder="Type your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control"
                        placeholder="Type your password"
                        required
                    />
                </div>

                <div>
                    <button className="btn btn-primary">Signin</button>
                </div>
            </form>
        );
    };

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            <LoginGoogle />
            {showForm && signinForm()}
            <br />
            <Link href="/auth/password/forgot">
                <a className="btn btn-outline-danger btn-sm">Forgot password</a>
            </Link>
        </React.Fragment>
    );
};

export default SigninComponent;
