import { useState, useEffect } from 'react';
import { signup, isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/router'

const SignupComponent = () => {
    const router = useRouter();
    const { redirectUrl } = router.query;
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        redirectUrl: '',
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
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { firstName, lastName, redirectUrl, email, password };

        preSignup(user).then(data => {
            console.log(data)
            if (data.redirectUrl) {
                const url = data.redirectUrl;
                const userCode = data.userCode;
                window.location = `https://${url}/?code=${userCode}`;
                console.log("yes")
            }
            if (data.error) {

                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    redirectUrl: redirectUrl,
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
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
                    />
                </div>

                <div className="form-group">
                    <input
                        value={lastName}
                        onChange={handleChange('lastName')}
                        type="text"
                        className="form-control"
                        placeholder="Type your Last name"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control"
                        placeholder="Type your email"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control"
                        placeholder="Type your password"
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
