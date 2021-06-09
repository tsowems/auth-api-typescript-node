import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';
import { getAuthorized } from '../../actions/integrations';
import Sidebar from '../../components/sidebar/sidebar';
import { useState, useEffect } from 'react';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';


const UserIndex = () => {
    const handleClick = () => {
        getAuthorized()
    }
    const [values, setValues] = useState({
        lastName: '',
        firstName: '',
        email: '',
        company: '',
        referral: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: ''
    });

    const token = getCookie('token');
    const { firstName, lastName, email, company, referral, error, success, loading, photo, userData } = values;

    const init = () => {
        getProfile(token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    email: data.user.email,
                    company: data.user.company,
                    photo: data.user.profile?.imageUrl || "../../static/images/profile.png"
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let userFormData = new FormData();
        userFormData.set(name, value);
        setValues({ ...values, [name]: value, userData: userFormData, error: false, success: false });
    };
    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true });
        update(token, userData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false, loading: false });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        firstName: data.user.firstName,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        password: '',
                        success: true,
                        loading: false
                    });
                });
            }
        });
    };
    return (
        <Layout>
            <Private>
                <div className="wrapper">
                    <Sidebar />
                    <div id="content">
                        <h3>Personal info</h3>
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="text-center">
                                <img src={photo} className="avatar img-circle img-thumbnail" alt="avatar" />
                                <h6>Upload a different photo...</h6>
                                <input type="file" className="text-center center-block well well-sm" />
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-6 col-xs-12  personal-info">
                            <div className="alert alert-info alert-dismissable">
                                <a className="panel-close close" data-dismiss="alert">×</a>
                                <i className="fa fa-coffee"></i>
                                        This is an <strong>.alert</strong>. Use this to show important messages to the user.
                            </div>

                            <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">First name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" value={firstName} type="text" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Last name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" value={lastName} type="text" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Company:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" value={company} type="text" readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Email:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" value={email} type="text" readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label">Referral:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" value="none" type="text" readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label"></label>
                                    <div className="col-md-8">
                                        <input className="btn btn-primary" value="Save Changes" type="button" />
                                        <span></span>
                                        <input className="btn btn-default" value="Cancel" type="reset" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Private>
        </Layout >
    );
};

export default UserIndex;
