import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    method: 'POST',
    url: `/work/transport-order`
  },
  update: {
    method: 'POST',
    url: `/work/transport-order/update`
  },
  findbypage: {
    method: 'GET',
    url: `/work/transport-order/page`
  },
  findbyid: {
    method: 'GET',
    url: `/work/transport-order`
  },
  findbyorderid: {
    method: 'GET',
    url: `/work/transport-order/orderId`
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
  findbypage(data) {
    return axiosApi({
      ...apiList.findbypage,
      data
    })
  },
  findbyid(data) {
    return axiosApi({
      ...apiList.findbyid,
      data
    })
  },
  findbyorderid(data) {
    return axiosApi({
      ...apiList.findbyorderid,
      data
    })
  }
}
