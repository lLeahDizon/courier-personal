import Request from '@/request'

export default function fileUpload(data) {
  return Request({
    url: '/file/upload',
    method: 'post',
    data
  })
}
