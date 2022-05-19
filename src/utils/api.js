import request from 'utils/request'

const api = {
  channelTest: param => request.post('/chain/index/switch', param),
}

export default api
