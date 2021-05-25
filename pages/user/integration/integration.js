import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
//import BlogCreate from '../../../components/crud/BlogCreate';
import IntegrationCreate from '../../../components/integration/IntegrationCreate';
import Link from 'next/link';


const CreateIntegration = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Create a new Integration</h2>
                        </div>
                        <div className="col-md-12">
                            <IntegrationCreate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default CreateIntegration;
