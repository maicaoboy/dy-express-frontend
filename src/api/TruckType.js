import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    url: `/base/base/truck/type`,
    method: 'POST'
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
  get(id) {
    return axiosApi({
      url: `/base/base/truck/type/${id}`,
      method: 'GET'
    })
  },
  page(data) {
    return axiosApi({
      ...apiList.page,
      data })
  },
  delete(id) {
    return axiosApi({
      url: `/base/base/truck/type/${id}`,
      method: 'DELETE'
    })
  }
}
