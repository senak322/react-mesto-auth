export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then((response) => {
            try {
                if (response.ok) {
                    return response.json();
                }
            } catch (e) {
                return (e)
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            } else {
                return
            }
        })
        .catch((err) => console.log(err));
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
  } 