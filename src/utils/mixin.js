import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(value) {
      if (!value) {
        return '-'
      }

      return moment(value).fromNow()
    },
  },
}

