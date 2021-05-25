import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import IntegrationList from '../../../components/integration/integrationlist';
import Link from 'next/link';
import { isAuth } from '../../../actions/auth';

const Integration = () => {
    const email = isAuth() && isAuth().email;
    return (
        <Layout>
            <Private>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Manage Integrations</h2>
                        </div>
                        <div className="col-md-12">
                            <IntegrationList username={email} />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Integration;
