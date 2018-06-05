import axios from 'axios'

const http = {
  ajax (method, url, data, success, error) {
    axios({
      method: method,
      url: url,
      data: data
    }).then((res) => {
      success(res.data)
    }).catch((err) => {
      error(err)
    })
  }
}

export default {
  install (Vue, options) {
    Vue.prototype.$http = http
  }
}
