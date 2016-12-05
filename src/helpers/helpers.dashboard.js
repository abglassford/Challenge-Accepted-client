import axios from 'axios';

function getUserChallenges (state) {
  axios.get(`http://localhost:8000/challenges/userChallenge/${state.state.fb_id}`)
  .then(response => {
    console.log(response);
    state.setState({myChallenges: response.data.data})
  })
  .catch(err => console.log(err))
}
function getChallengeTemplates (state) {
  axios.get('http://localhost:8000/challenge_templates')
  .then((res) => {
    state.setState({challengeTemplates: res.data.data})
  })
  .catch((err) => {
    console.log(err);
  })
}
function postNewUserChallenge (state, template) {
  return axios.post('http://localhost:8000/challenges', {
    user_id: state.state.fb_id,
    challenge_id: template.id,
    completed: false,
    progress: 0.00
  })
}
function stepComplete(challenge, state) {
  axios.put(`http://localhost:8000/challenges`, {
    user_id: state.state.fb_id,
    challenge_id: challenge.id,
    progress: challenge.progress + 1
  })
  .then(data => {
    getUserChallenges(state)
  })
}

export {
  getUserChallenges,
  getChallengeTemplates,
  postNewUserChallenge,
  stepComplete
}
