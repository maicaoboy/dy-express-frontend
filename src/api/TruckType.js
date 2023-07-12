import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    url: `/base/base/truck/type`,
    method: 'POST'
  },
  get: {
    url: `/base/base/truck/type`,
    method: 'GET'
  },
  page: {
    url: `/base/base/truck/type/page`,
    method: 'GET'
  },
  delete: {
    url: `/base/base/truck/type`,
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
      data })
  }
}
