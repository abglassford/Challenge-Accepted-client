import axios from 'axios';

function getData (state) {
  axios.get(`http://localhost:8000/challenges/userChallenge/${state.state.fb_id}`)
  .then(response => {
    let challenges = response.data.data;
    state.setState({myChallenges: challenges});
    axios.get('http://localhost:8000/challenge_templates')
    .then((res) => {
      let display = res.data.data
      if (challenges.length) {
        for (var i = 0; i < challenges.length; i++) {
          for (var j = 0; j < display.length; j++) {
            if (challenges[i].id === display[j].id) {
              display.splice(j, 1)
            }
          }
        }
      }
      state.setState({challengeTemplates: display})
    })
    .catch((err) => {
      console.log(err);
    })
  })
  .catch(err => console.log(err))
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
    getData(state)
  })
}

export {
  postNewUserChallenge,
  stepComplete,
  getData
}
