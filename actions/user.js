import fetch from 'isomorphic-fetch';
import { API } from '../config';


export const getProfile = token => {
    return fetch(`${API}/users/profile`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Bearer: `${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const update = (token, user) => {
    return fetch(`${API}/user/update`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};
