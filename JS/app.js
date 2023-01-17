'use strict';

// let person = {
//   name: 'Jason',
//   age: 36,
//   class: '201d96',
//   likeCodeFellows: true,
//   speak: function () {
//     console.log('Code Fellows is great');
//   },
// };

// console.log(person);
// person.speak();


//Generating random numbers
// function generateRandomNumber(highValue) {
//     return Math.floor(Math.random() * highValue);
//   }
//   function generateBetween(low, high) {
//     return Math.floor(Math.random() * (high - low + 1)) + low;
//   }



const storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
function generateRandomCustomers (minCostomer, maxCostomer) {
    // console.log(min, max);
    return Math.round(Math.random() * (maxCostomer - minCostomer) + minCostomer);
}

const Seattle = {
    Location: 'Seattle',
    MinCustomer: 23,
    MaxCustomer: 65,
    AvgSalecustomer: 6.3,
    perHourCustomers: [],
    cookiesPerHour: [],
    totalDailyCookies: 0,

    generateRandomCustomors: function () {
    console.log(generateRandomCustomors);
    }
        
       // for (let i = 0; )
  }


const Tokyo = {
    Location: 'Tokyo',
    minCustomer: 23,
    maxCustomer: 24,
    avgSalecustomer: 1.2,
    cookiesPerHour: [],
    perHourCustomers: [],
    totalDailyCookies: 0,
}

const Dubai = {
    Location: 'Dubai',
    minCustomer: 11,
    maxCustomer: 38,
    avgSalecustomer: 3.7,
    cookiesPerHour: [],
    perHourCustomers: [],
    totalDailyCookies: 0,
}

const Paris = {
    Location: 'Paris',
    minCustomer: 20,
    maxCustomer: 38, 
    avgSalecustomer: 2.3,
    cookiesPerHour: [],
    perHourCustomers: [],
    totalDailyCookies: 0,
}

const Lima = {
    Location: 'Lima',
    minCustomer: 2,
    maxCustomer: 16,
    avgSalecustomer: 4.6,
    cookiesPerHour: [],
    perHourCustomers: [],
    totalDailyCookies: 0,
}