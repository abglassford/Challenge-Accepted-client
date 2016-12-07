import {browserHistory} from 'react-router';
import axios from 'axios';

function setToken (response) {
  localStorage.setItem('fb_token', response.accessToken);
  localStorage.setItem('fb_id', response.id);
  localStorage.setItem('name', `${response.first_name} ${response.last_name}`);
  browserHistory.push('/dashboard');
}
function removeToken () {
  localStorage.removeItem('fb_token');
  localStorage.removeItem('fb_id');
  localStorage.removeItem('name')
}

function checkUserExists (response) {
  axios.get(`https://rocky-thicket-61690.herokuapp.com/users/${response.id}`)
  .then(data => {
    if (data.data.data.length) {
      setToken(response)
      browserHistory.push('/dashboard')
    } else {
      axios.post(`https://rocky-thicket-61690.herokuapp.com/users`, {
        fb_id: response.id,
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email
      })
      .then(data => {
        setToken(response)
        browserHistory.push('/dashboard')
      })
      .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err));
}

export {
  setToken,
  removeToken,
  checkUserExists
};
