import axiosApi from './AxiosApi.js'

const apiList = {
  dispatchInfo: function(id){
    return `/dispatch/schedule/dispatch/${id}`
  },
  page: `/dispatch/schedule/page`,
  logPage: '/dispatch/scheduleLog/page'
}

export default {
  dispatchInfo(id) {
    return axiosApi({
      method: 'GET',
      url: apiList.dispatchInfo(id),
      id
    })
  },
  page(data) {
    return axiosApi({
      method: 'GET',
      url: apiList.page,
      data
    })
  },
  logPage(data) {
    return axiosApi({
      method: 'GET',
      url: apiList.logPage,
      data
    })
  }
}
