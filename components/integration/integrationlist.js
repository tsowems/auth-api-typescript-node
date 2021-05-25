import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import useFullPageLoader from "../useFullPageLoader";
import { listIntegrations, removeIntegration } from '../../actions/integrations';
import moment from 'moment';
import { TableHeader, Pagination, Search } from "../DataTable";


//const IntegrationList = ({ username }) => {
const IntegrationList = () => {
    const token = getCookie('token');
    const [integrations, setIntegrations] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [message, setMessage] = useState('');
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 5;

    const headers = [
        { name: "No#", field: "id", sortable: false },
        { name: "Alias", field: "alias", sortable: true },
        { name: "Serice", field: "service", sortable: true },
        { name: "token", field: "access_token", sortable: false },
        { name: "Delete", sortable: false }
    ];

    useEffect(() => {
        const getData = () => {
            showLoader();

            listIntegrations(token).then(response => response)
                .then(json => {
                    hideLoader();
                    setIntegrations(json);

                });
        };

        getData();
    }, []);

    const integrationsData = useMemo(() => {
        let computedIntegrations = integrations;

        if (search) {
            computedIntegrations = computedIntegrations.filter(
                integration =>
                    integration.alias.toLowerCase().includes(search.toLowerCase()) ||
                    integration.service.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedIntegrations.length);

        //Sorting integrations
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedIntegrations = computedIntegrations.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedIntegrations.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [integrations, currentPage, search, sorting]);
    const deleteIntegration = id => {
        removeIntegration(id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                //getData();
            }
        });
    };

    const deleteConfirm = id => {
        let answer = window.confirm('Are you sure you want to delete the Integration?');
        if (answer) {
            deleteIntegration(id);
        }
    };

    return (
        <>
            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6">
                            <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <table className="table table-striped">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        <tbody>
                            {integrationsData.map(integration => (
                                <tr>
                                    <th scope="row" key={integration.id}>
                                        {integration.id}
                                    </th>
                                    <td>{integration.alias}</td>
                                    <td>{integration.service}</td>
                                    <td>{integration.access_token}</td>
                                    <td><button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(integration.id)}>
                                        Delete
                                                </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {loader}
        </>
    );
};

export default IntegrationList;
