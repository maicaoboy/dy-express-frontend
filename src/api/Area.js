import axiosApi from './AxiosApi.js'

const apiList = {
  getByCode: function(code){
    return `/authority/area/code/${code}`
  }
}

export default {
  getByCode(code) {
    return axiosApi({
      method: 'GET',
      url: apiList.getByCode(code),
      code
    })
  }
}
