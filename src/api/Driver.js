import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    url: `/base/sys/driver`,
    method: 'POST'
  },
  update: {
    url: `/base/sys/driver`,
    method: 'POST'
  },
  page: {
    url: '/base/sys/driver/page',
    method: 'GET'
  },
  get: {
    url: '/base/sys/driver',
    method: 'GET'
  }
}

export default {
  save(data) {
    return axiosApi({
      ...apiList.save,
      data
    })
  },
  get(data) {
    return axiosApi({
      ...apiList.get,
      data
    })
  },
  page(data) {
    return axiosApi({
      ...apiList.page,
      data
    })
  },
  update(data) {
    return axiosApi({
      ...apiList.update,
      data
    })
  }
}
