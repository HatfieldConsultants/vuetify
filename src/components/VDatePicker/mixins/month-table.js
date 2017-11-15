export default {
  methods: {
    monthWheelScroll (e) {
      e.preventDefault()

      let year = this.tableYear

      if (e.deltaY < 0) year++
      else year--

      this.tableDate = this.normalizeDate(year)
    },
    monthClick (month, startOrEnd) {
      // If end picker, get last date of month

      if (startOrEnd === 'start') {
        day = 1
      } else {
        day = new Date(this.tableYear, month + 1, 0).getDate()
      }
      var day = 31
      // If start picker, just use 1st date
      this.inputDate = this.normalizeDate(this.tableYear, month, day)
      if (this.type === 'date') {
        this.activePicker = 'DATE'
      } else {
        this.$nextTick(() => (this.autosave && this.save()))
      }
    },
    monthGenTD (month, startOrEnd) {
      const date = this.normalizeDate(this.tableYear, month)
      let monthName

      if (typeof this.monthFormat === 'function') {
        monthName = this.monthFormat(date)
      } else if (this.supportsLocaleFormat) {
        monthName = date.toLocaleDateString(this.locale, Object.assign(this.monthFormat, {
          timeZone: this.timeZone
        }))
      } else {
        monthName = date.getMonth() + 1
        if (monthName < 10) {
          monthName = `0${monthName}`
        }
      }

      return this.$createElement('td', [
        this.$createElement('button', {
          'class': {
            'btn btn--date-picker': true,
            'btn--raised': this.monthIsActive(month),
            'btn--flat': true,
            'btn--active': this.monthIsActive(month),
            'btn--outline': this.monthIsCurrent(month) && !this.monthIsActive(month),
            'btn--disabled': this.type === 'month' && !this.isAllowed(date)
          },
          attrs: {
            type: 'button'
          },
          domProps: {
            innerHTML: `<span class="btn__content">${monthName}</span>`
          },
          on: {
            click: () => this.monthClick(month, startOrEnd)
          }
        })
      ])
    },
    monthGenTBody (startOrEnd) {
      const children = []
      const cols = Array(3).fill(null)
      const rows = 12 / cols.length

      for (let row = 0; row < rows; row++) {
        children.push(this.$createElement('tr', cols.map((_, col) => {
          return this.monthGenTD(row * cols.length + col, startOrEnd)
        })))
      }

      return this.$createElement('tbody', children)
    },
    monthIsActive (i) {
      return this.tableYear === this.year &&
        this.month === i
    },
    monthIsCurrent (i) {
      return this.currentYear === this.tableYear &&
        this.currentMonth === i
    }
  }
}
