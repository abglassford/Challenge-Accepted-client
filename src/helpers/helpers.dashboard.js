import axios from 'axios';

function getData (state) {
  axios.get(`https://rocky-thicket-61690.herokuapp.com/challenges/userChallenge/${state.state.fb_id}`)
  .then(response => {
    let challenges = response.data.data;
    state.setState({myChallenges: challenges});
    axios.get('https://rocky-thicket-61690.herokuapp.com/challenge_templates')
    .then(res => setData(res, challenges, state))
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
}

function setData (res, chals, state) {
  let display = res.data.data;
  if (chals.length) {
    chals.forEach((challenge, i) => {
      display.forEach((template, j) => {
        if (chals[i].id === display[j].id) {
          display.splice(j, 1);
        }
      })
    })
  }
  state.setState({challengeTemplates: display})
}

function postNewUserChallenge (state, template) {
  return axios.post('https://rocky-thicket-61690.herokuapp.com/challenges', {
    user_id: state.state.fb_id,
    challenge_id: template.id,
    completed: false,
    progress: 0.00
  })
}
function stepComplete(challenge, state) {
  axios.put(`https://rocky-thicket-61690.herokuapp.com/challenges`, {
    user_id: state.state.fb_id,
    challenge_id: challenge.id,
    step1_complete: true,
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
