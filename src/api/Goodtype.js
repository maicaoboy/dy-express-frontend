import axiosApi from './AxiosApi.js'

const apiList = {
    save: {
      url: `/base/goodsType`,
      method: 'POST'
    },
    get: {
        url: `/base/goodsType`,
        method: 'GET'
    },
    getAll: {
        url: `/base/goodsType/all`,
        method: 'GET'
    },
    page: {
      url: `/base/goodsType/page`,
      method: 'GET'
    },
    delete: {
      url: `/base/goodsType`,
      method: 'DELETE'
    },
    update: {
      url: `/base/goodsType`,
      method: 'PUT'
    }
}

export default {
  save (data) {
    return axiosApi({
      ...apiList.save,
      data
    })
  },
  get (data) {
    return axiosApi({
      ...apiList.get,
      data
    })
  },
  getAll (data) {
    return axiosApi({
      ...apiList.getAll,
      data
    })
  },
  page (data) {
    return axiosApi({
      ...apiList.page,
      data
    })
  },
  delete (data) {
    return axiosApi({
      ...apiList.delete,
      data
    })
  },
  update (data) {
    return axiosApi({
      ...apiList.update,
      data
    })
  }
}
