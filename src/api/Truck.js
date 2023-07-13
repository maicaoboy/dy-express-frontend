import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    url: `/base/base/truck`,
    method: 'POST'
  },
  get: {
    url: `/base/base/truck`,
    method: 'GET'
  },
  page: {
    url: `/base/base/truck/page`,
    method: 'GET'
  },
  delete: {
    url: `/base/base/truck`,
    method: 'DELETE'
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
  delete(id) {
    return axiosApi({
      url: `/base/base/truck/${id}`,
      method: 'DELETE'
    })
  }
}
