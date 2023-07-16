import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    method: 'POST',
    url: `/order/cargo`
  },
  update: {
    method: 'PUT',
    url: `/order/cargo`
  },
  delete: {
    method: 'DELETE',
    url: `/order/cargo`
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
  delete(id) {
    return axiosApi({
      method: 'DELETE',
      url: `/order/cargo/${id}`
    })
  }
}
