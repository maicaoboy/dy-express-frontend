import axiosApi from './AxiosApi.js'

const apiList = {
  getByCode: function(code) {
    return `/authority/area/code/${code}`
  },
  get: {
    method: 'GET',
    url: `/authority/area`
  }
}

export default {
  getByCode(code) {
    return axiosApi({
      method: 'GET',
      url: apiList.getByCode(code),
      code
    })
  },
  get(id) {
    return axiosApi({
      method: 'GET',
      url: `/authority/area/${id}`
    })
  }
}
