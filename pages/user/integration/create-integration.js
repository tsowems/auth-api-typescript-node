import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
//import { getProfile, update } from '.../../../actions/user';
import { useState, useEffect } from 'react';
import { getCookie, setCookie, isAuth, updateUser } from '../../../actions/auth';
import Sidebar from '../../../components/sidebar/sidebar';
import { useRouter } from 'next/router'
import { getAuthorized } from '../../../actions/integrations';

const UserProfile = () => {

    const router = useRouter();
    const { redirect_url } = router.query;

    setCookie('redirect_url', redirect_url);

    const [sidebarIsOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

    useEffect(() => {
        isAuth() && getAuthorized();

    }, []);

    return (

        <Layout>
            <Private>
                <div className="wrapper">
                    <Sidebar />

                    <div id="content">
                        <h2>New Integrations</h2>
                    </div>
                </div>
            </Private>
        </Layout>

    );
}

export default UserProfile;