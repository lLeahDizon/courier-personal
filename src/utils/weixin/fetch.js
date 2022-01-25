import Request from '@/request'

export function getWXConfigApi ({ url = location.href }) {
  return Request({
    method: 'get',
    url: `/common/js/api/config?url=${url}`,
  })
}
