import axios from 'axios';

function getUserChallenges (fb_id) {
  axios.get(`http://localhost:8000/challenges/userChallenge/${fb_id}`)
  .then(response => {
    this.setState({myChallenges: response.data.data})
  })
  .catch(err => console.log(err))
}

export {
  getUserChallenges
}
