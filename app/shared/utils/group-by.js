import moment from 'moment'
import { groupBy, orderBy } from 'lodash'

export const groupByDate = array =>
  groupBy(
    orderBy(
      array.map(el => ({
        ...el,
        fullDate: moment(el.date),
        date: moment(el.date).format('MM DD YYYY'),
        hoursMinute: moment(el.date).format('LTS'),
        author: {
          ...el.author,
          fullName:
            el.author.fullName === null ? 'No Name' : el.author.fullName,
        },
      })),
      ['date'],
      ['desc'],
    ),
    'date',
  )

export const orderByFullDate = data => orderBy(data, ['fullDate'], ['desc'])
export const orderByCreatedAt = data => orderBy(data, ['createdAt'], ['desc'])
