import {browserHistory} from 'react-router';

function setToken (response) {
  localStorage.setItem('fb_token', response.accessToken);
  localStorage.setItem('fb_id', response.id);
  browserHistory.push('/dashboard')
}
function removeToken () {
  localStorage.removeItem('fb_token')
  localStorage.removeItem('fb_id');
}

export {
  setToken,
  removeToken
};
