import axios from 'axios'

export default class Controller {
  get rest () {
    return axios.create({
      baseURL: this.constructor.raizWS,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  }
}

Controller.raizWS = 'https://challenge-for-adventurers.herokuapp.com/'
