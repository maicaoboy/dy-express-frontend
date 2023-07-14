import axiosApi from './AxiosApi.js'

const apiList = {
  dispatchInfo: function(id){
    return `/dispatch/schedule/dispatch/${id}`
  },
  page: `/dispatch/schedule/page`,
  logPage: '/dispatch/scheduleLog/page',
  save: '/dispatch/schedule',
  update: '/dispatch/schedule',
  run: function(id){
    return `/dispatch/schedule/run/${id}`
  },
  pause: function(id){
    return `/dispatch/schedule/pause/${id}`
  },
  resume: function(id){
    return `/dispatch/schedule/resume/${id}`
  }
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
  },
  save(data) {
    return axiosApi({
      method: 'POST',
      url: apiList.save,
      data
    })
  }, 
  update(data) {
    return axiosApi({
      method: 'PUT',
      url: apiList.update,
      data
    })
  },
  run(id) {
    return axiosApi({
      method: 'PUT',
      url: apiList.run(id),
      id
    })
  },
  pause(id) {
    return axiosApi({
      method: 'PUT',
      url: apiList.pause(id),
      id
    })
  },
  resume(id) {
    return axiosApi({
      method: 'PUT',
      url: apiList.resume(id),
      id
    })
  }
}
