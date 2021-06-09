import Layout from '../components/Layout';
import Link from 'next/link';
import { useEffect } from 'react';
import { isAuth } from '../actions/auth';
import Router from 'next/router';


const Index = () => {
    useEffect(() => {
        isAuth() && Router.push(`/user`);
    }, []);

    useEffect(() => {
        !isAuth() && Router.push(`/signin`);
    }, []);
    return (
        <Layout>

        </Layout>
    );
};

export default Index;
