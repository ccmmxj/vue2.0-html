import axios from 'axios'
import qs from 'qs'
import addr from './addr'

const http = {
  hajax (method, url, data, success, error) {
    axios({
      method: method,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      url: url,
      data: qs.stringify(data)
    }).then((res) => {
      success(res.data)
    }).catch((err) => {
      error(err)
    })
  },
  ajax (method, url, data, success, error) {
    http.hajax(method, addr.host + url, data, success, error)
  }
}

export default {
  install (Vue, options) {
    Vue.prototype.$http = http
    Vue.prototype.$qs = qs
  }
}
