import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    url: `/base/base/goodsType`,
    method: 'POST'
  },
  get: {
    url: `/base/base/goodsType`,
    method: 'GET'
  },
  getAll: {
    url: `/base/base/goodsType/all`,
    method: 'GET'
  },
  page: {
    url: `/base/base/goodsType/page`,
    method: 'GET'
  },
  delete: {
    url: `/base/base/goodsType/delete`,
    method: 'POST'
  },
  update: {
    url: `/base/base/goodsType/update`,
    method: 'POST'
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
  getAll(data) {
    return axiosApi({
      ...apiList.getAll,
      data
    })
  },
  page(data) {
    return axiosApi({
      ...apiList.page,
      data
    })
  },
  delete(data) {
    return axiosApi({
      ...apiList.delete,
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
