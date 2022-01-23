import Request from 'src/utils/request'

export function getWXConfigApi ({ accountCode, url = location.href }) {
  return Request({
    method: 'post',
    url: '/wx/js/api/config',
    data: {
      accountCode,
      url
    }
  })
}
