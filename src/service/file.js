import Request from '@/request'

// 上传文件
export function fileUpload(data) {
  return Request({
    url: '/file/upload',
    method: 'post',
    type: 'form',
    data
  })
}
