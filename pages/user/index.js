import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import Link from 'next/link';
import { getAuthorized } from '../../actions/integrations';


const UserIndex = () => {
    const handleClick = () => {
        getAuthorized()
    }
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>User Dashboard</h2>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link href="/user/integration/integrationlist">
                                        <a>My Integrations</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/" >
                                        <a onClick={(e) => handleClick()} href={`getAuthorized`}>Create Integration</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-8"></div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default UserIndex;
