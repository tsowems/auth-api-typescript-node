import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter, useRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
// import { getCategories } from '../../actions/category';
// import { getTags } from '../../actions/tag';
//import { createBlog } from '../../actions/blog';
import { createIntegration } from '../../actions/integrations';
//const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { API } from '../../config';
//import { QuillModules, QuillFormats } from '../../helpers/quill';

const DEFAULT_DATA = {
    alias: "",
    code: ""
}

const CreateIntegration = ({ router }) => {
    const routers = useRouter();
    const code = routers.query.code;
    const token = getCookie('token');
    const [form, setForm] = useState(DEFAULT_DATA);

    const submitForm = () => {

        createIntegration(form, token)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    Router.push(`/user/integration/integrationlist`);
                }
            });
    }
    const handleChange = (e) => {
        //const { name, value } = e.target;
        setForm({
            ...setForm,
            alias: e.target.value,
            code: code
        })

    }

    console.log(code)
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <form>
                    <div className="container has-text-centered">
                        <div className="columns is-8 is-variable ">
                            <div className="column is-two-thirds has-text-left">
                                <h1 className="title is-1">Add New Integration Webflow</h1>
                                <p className="is-size-4">Please supply alias name for integration.</p>

                            </div>

                            <div className="column is-one-third has-text-left">
                                <div className="field">
                                    <label className="label">Alias Name</label>
                                    <div className="control">
                                        <input
                                            value={form.alias}
                                            className="input is-medium"
                                            type="text"
                                            name="alias"
                                            id="alias"
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="control">
                                    <button type="button"
                                        onClick={submitForm}
                                        className="button is-link is-fullwidth has-text-weight-medium is-medium">Create Integration</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </section >

    )
};


export default withRouter(CreateIntegration);
