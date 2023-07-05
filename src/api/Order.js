import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    method: 'POST',
    url: `/order/order/save`
  },
  update: {
    method: 'POST',
    url: `/order/order/update`
  },
  page: {
    method: 'POST',
    url: `/order/order/page`
  },
  findbyid: {
    method: 'GET',
    url: `/order/order`
  },
  get: {
    method: 'GET',
    url: `/order/order/ids`
  }
}

export default {
  save(data) {
    return axiosApi({
      ...apiList.save,
      data
    })
  },
  update(data) {
    return axiosApi({
      ...apiList.update,
      data
    })
  },
  page(data) {
    return axiosApi({
      ...apiList.page,
      data
    })
  },
  findbyid(data) {
    return axiosApi({
      ...apiList.findbyid,
      data
    })
  },
  get(data) {
    return axiosApi({
      ...apiList.get,
      data
    })
  }
}
