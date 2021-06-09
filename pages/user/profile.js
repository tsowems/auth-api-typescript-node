import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import { getProfile, update } from '../../actions/user';
import { useState, useEffect } from 'react';
import { getCookie, setCookie, isAuth, updateUser } from '../../actions/auth';
import Sidebar from '../../components/sidebar/sidebar';
import { useRouter } from 'next/router'
import cookie from 'js-cookie';


const UserProfile = () => {

    const router = useRouter();
    const { integrationUrl } = router.query;
    setCookie('integrationUrl', integrationUrl);


    const token = getCookie('token');
    const [sidebarIsOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

    const init = () => {
        getProfile(token).then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // setValues({
                //     ...values,
                //     username: data.username,
                //     name: data.name,
                //     email: data.email,
                //     about: data.about
                //});
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    return (

        <Layout>
            <Private>
                <div className="wrapper">
                    <Sidebar />

                    <div id="content">
                        <h2>Collapsible Sidebar Using Bootstrap 4</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="line"></div>

                        <h2>Lorem Ipsum Dolor</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="line"></div>

                        <h2>Lorem Ipsum Dolor</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="line"></div>

                        <h3>Lorem Ipsum Dolor</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </Private>
        </Layout>

    );
}

export default UserProfile;