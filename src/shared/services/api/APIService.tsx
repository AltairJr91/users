import axios from 'axios';


 const Api = () => {
    return axios.create({
        baseURL: "http://localhost:8007" 
    });
};

export default Api;