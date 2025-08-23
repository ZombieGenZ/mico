export const formatDate = (date: Date = new Date()) => {
  const formatter = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'shortOffset'
  })

  const formattedString = formatter.format(date)

  return formattedString.replace(',', ' lúc').replace('GMT', '(GMT') + ')'
}
