import { useState, useEffect } from 'react';
import { signup, isAuth, preSignup, confirmcode, authenticate } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/router'

const SignupComponent = () => {
    const router = useRouter();
    const { redirect_url } = router.query;
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        redirect_url: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { firstName, lastName, email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        const user = { firstName, lastName, redirect_url, email, password };

        preSignup(user).then(data => {
            if (data.redirect_url) {
                const url = data.redirect_url;
                const userCode = data.userCode;
                const email = data.email;
                window.location = `https://${url}/?code=${userCode}?email=${email}`;
            }
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
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
                setValues({
                    ...values,
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    redirect_url: redirect_url,
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: true
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={firstName}
                        onChange={handleChange('firstName')}
                        type="text"
                        className="form-control"
                        placeholder="Type your First name"
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        value={lastName}
                        onChange={handleChange('lastName')}
                        type="text"
                        className="form-control"
                        placeholder="Type your Last name"
                        required
                    />
                </div>

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
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="password must contain special character, upper and lowercase with 8 letters minimum"
                        required
                    />
                </div>

                <div>
                    <button className="btn btn-primary">Signup</button>
                </div>
            </form>
        );
    };

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
            <br />
            <Link href="/auth/password/forgot">
                <a className="btn btn-outline-danger btn-sm">Forgot password</a>
            </Link>
        </React.Fragment>
    );
};

export default SignupComponent;
