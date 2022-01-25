import Request from '@/request'

// 添加评价
export function commentAdd({score, transportSheetId}) {
  return Request({
    url: `/comment/add?score=${score}&transportSheetId=${transportSheetId}`,
    method: 'get'
  })
}
