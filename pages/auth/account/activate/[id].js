import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../../../../components/Layout';
import Router, { withRouter } from 'next/router';
import { activate, isAuth } from '../../../../actions/auth';


const ActivateAccount = ({ router }) => {

    const [values, setValues] = useState({
        firstName: '',
        token: '',
        error: '',
        loading: false,
        success: false,
        showButton: true
    });

    const { firstName, token, error, loading, success, showButton } = values;

    useEffect(() => {
        let token = router.query.id;

        if (token) {
            const { firstName } = jwt.decode(token);
            setValues({ ...values, firstName, token });
        }
    }, [router]);

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        activate({ token }).then(data => {
            if (data.error) {
                isAuth() && Router.push(`/user`);
                setValues({ ...values, error: data.error, loading: false, showButton: false });

            } else {

                setValues({ ...values, loading: false, success: true, showButton: false });
                isAuth() && Router.push(`/user`);
            }
        });
    };

    const showLoading = () => (loading ? <h2>Loading...</h2> : '');

    return (
        <Layout>
            <div className="container">
                <h3 className="pb-4">Hey {firstName}, Ready to activate your account?</h3>
                {showLoading()}
                {error && error}
                {success && 'You have successfully activated your account. Please signin.'}
                {showButton && (
                    <button className="btn btn-outline-primary" onClick={clickSubmit}>
                        Activate Account
                    </button>
                )}
            </div>
        </Layout>
    );
};

export default withRouter(ActivateAccount);
