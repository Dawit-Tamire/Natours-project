import axios from 'axios';
import { showAlert } from './alerts';

export const search = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/tour/:slug',
            data
        })
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}
