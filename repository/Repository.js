import axios from 'axios';

const baseURL = 'https://ticketeria.es/api/v50';

export const Repository = axios.create({
    baseURL,
    crossDomain: true,
    withCredentials: true
});

export default { Repository };
