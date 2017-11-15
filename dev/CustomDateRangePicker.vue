<template>
  <v-app>
    <v-container>
      <v-layout>
        <v-flex xs2>
          <v-btn block color="primary" v-for="range in Object.keys(dateRanges)" v-on:click="setNewDateRange(range)"> {{range}} </v-btn>
          <br />
          <v-card>
            <v-text-field v-model="customPast" :rules="customRules" label = 'Custom Past'> </v-text-field>
            <v-btn block color="primary" v-for="dateType in ['days', 'weeks', 'months', 'years']" v-on:click="setLastXDateRange(dateType)"> {{dateType}} </v-btn>
          </v-card>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs2>
          <v-date-picker v-model="currentDates.startDate"></v-date-picker>
        </v-flex>
        <v-flex xs2>
          <v-date-picker v-model="currentDates.endDate"></v-date-picker>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import moment from 'moment'
  export default {
    data: () => ({
      customPast: '',
      customRules: [
        (v) =>  /^\d+$/.test(v) || 'Custom past must be numerical'
      ],
      currentDates:{
        startDate: moment().format(),
        endDate: moment().format()
      },
      dateRanges: {
        "Today": {
          startDate: moment().format(),
          endDate: moment().format()
        },
        "Yesterday": {
          startDate: moment().subtract(1, 'day').format(),
          endDate: moment().subtract(1, 'day').format()
        },
        "Last Week": {
          startDate: moment().subtract(1, 'week').format(),
          endDate: moment().format()
        },
        "Last Two Weeks": {
          startDate: moment().subtract(2, 'week').format(),
          endDate: moment().format()
        },
        "Last Month": {
          startDate: moment().subtract(1, 'month').format(),
          endDate: moment().format()
        },
        "Last Year": {
          startDate: moment().subtract(1, 'year').format(),
          endDate: moment().format()
        }
      }
    }),
    methods: {
      setNewDateRange: function (dateRange) {
        this.currentDates = this.dateRanges[dateRange]
      },
      setLastXDateRange: function (dateType) {
        this.currentDates = {startDate: moment().subtract(this.customPast, dateType).format(), endDate: moment().format()}
      }
    }
  }
</script>
