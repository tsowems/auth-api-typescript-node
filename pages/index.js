import Layout from '../components/Layout';
import Link from 'next/link';
import { useEffect } from 'react';
import { isAuth } from '../actions/auth';
import Router from 'next/router';


const Index = () => {
    useEffect(() => {
        isAuth() && Router.push(`/user`);
    }, []);
    return (
        <Layout>
            <h2></h2>
            <Link href="/signup">
                <a></a>
            </Link>
        </Layout>
    );
};

export default Index;
