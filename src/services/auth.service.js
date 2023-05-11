import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                username: user.login,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            fio: user.fio,
            username: user.login,
            password: user.password,
            role: user.role,
            divisions: user.divisions
        });
    }
}

export default new AuthService()