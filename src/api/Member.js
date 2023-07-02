import axiosApi from './AxiosApi.js'

const apiList = {
  save: {
    method: 'POST',
    url: `/member/menu`
  },
  update: {
    method: 'PUT',
    url: `/member/menu`
  },
  delete: {
    method: 'DELETE',
    url: `/member/menu`
  }
}

export default {
  allTree (data) {
    return axiosApi({
      ...apiList.allTree,
      formData: true,
      data
    })
  },
  save (data) {
    return axiosApi({
      ...apiList.save,
      data
    })
  },
  update (data) {
    return axiosApi({
      ...apiList.update,
      data
    })
  },
  delete (data) {
    return axiosApi({
      ...apiList.delete,
      data
    })
  }
}
