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


'use strict';

// Global Variables
var allLocations = [];


// ========== Form Stuff ================= //
var addLocationForm = document.getElementById('addLocation');

addLocationForm.addEventListener('submit', addALocation);

function addALocation(event){
  event.preventDefault();
  // get params from inputs
  var param1 = event.target.cityName.value;
  var param2 = event.target.min.value;
  var param3 = event.target.max.value;
  var param4 = event.target.avgCookies.value;
  var param5 = 6;
  var param6 = 20;

  // get those things and pass them into constructor
  var newCity = new StoreLocation(param1, param2, param3, param4, param5, param6);

  var footerElement = document.getElementById('footer');
  footerElement.parentNode.removeChild(footerElement); // referenced where I got this in the README

  // render that city in the table
  newCity.renderTableData(); // BUT it needs to go ABOVE TOTALS row
  renderTableFooter(allLocations); 
}


// Constructor function
function StoreLocation (location, min, max, avgCookies, openHour, closeHour) {
  this.location = location;
  this.minCustomers = min;
  this.maxCustomers = max;
  this.avgCookiesPerCustomer = avgCookies;
  this.openHour = openHour; 
  this.closeHour = closeHour; 

  this.hoursList = []; 
  this.cookiesPerHourArray = [];

  this.calculateCookiesForOpenHours();

  // add the new instance to the array
  allLocations.push(this);
};

StoreLocation.prototype.generateCustomersPerHour = function () {
  var min = this.minCustomers;
  var max = this.maxCustomers;
  var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min; // see README for resources
  return random;
};

StoreLocation.prototype.refactorHours = function () {
  for (var i = this.openHour; i < this.closeHour; i++) {
    if (i < 12) {
      this.hoursList.push(i + ':00am');
    } else if (i === 12) {
      this.hoursList.push(i + ':00pm');
    } else if (i > 12) {
      this.hoursList.push((i - 12) + ':00pm')
    }
  }
  return this.hoursList;
};

StoreLocation.prototype.calculateCookiesForOpenHours = function () {
  this.refactorHours();

  for (var i = this.openHour; i < this.closeHour; i++) {
    var cookiesEachHour = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
    this.cookiesPerHourArray.push(cookiesEachHour);
  };
  return this.cookiesPerHourArray;
};

StoreLocation.prototype.dailyLocationTotal = function() {
  var sumOfCookies = 0;
  for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
    sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
  }
  return sumOfCookies;
};

StoreLocation.prototype.renderTableData = function () {
  var table = document.getElementById('cookieData');
  var row = document.createElement('tr');

  // city name cell
  var cityNameCell = document.createElement('th');
  cityNameCell.textContent = this.location;
  row.appendChild(cityNameCell);

  // cookie data x 14
  for (var i = 0; i < this.hoursList.length; i++) {
    var tableDataCell = document.createElement('td');
    tableDataCell.textContent = this.cookiesPerHourArray[i];
    row.appendChild(tableDataCell);
  }

  tableDataCell = document.createElement('td');
  tableDataCell.textContent = this.dailyLocationTotal();
  row.appendChild(tableDataCell);

  table.appendChild(row);
};

function renderTableHeaders () {
  var table = document.getElementById('cookieData');
  var row = document.createElement('tr');
  var tableHeadCell = document.createElement('th');
  row.appendChild(tableHeadCell);

  // hour of the day headers
  for (var i = 0; i < allLocations[0].hoursList.length; i++) {
    tableHeadCell = document.createElement('th');
    tableHeadCell.textContent = allLocations[0].hoursList[i];
    row.appendChild(tableHeadCell);
  }
  // total header
  tableHeadCell = document.createElement('th');
  tableHeadCell.textContent = 'Daily Location Total';
  row.appendChild(tableHeadCell);

  table.appendChild(row);
};

function renderTableFooter (allLocations) {
  var table = document.getElementById('cookieData');
  var row = document.createElement('tr');
  var tableFootCell = document.createElement('th');
  var hoursOfDay = 14;
  tableFootCell.textContent = 'Totals';
  row.appendChild(tableFootCell);
  
  var cookieTotalArray = [];
  // to look at 14 hours of the day for 14 totals cells
  for (var i = 0; i < hoursOfDay; i++) {
    var cookieTotal = 0;
    // add up each index from all locations
    for (var j = 0; j < allLocations.length; j++) {
      cookieTotal = cookieTotal + allLocations[j].cookiesPerHourArray[i];
    }
    cookieTotalArray.push(cookieTotal);
    tableFootCell = document.createElement('td');
    tableFootCell.textContent = cookieTotalArray[i];
    row.appendChild(tableFootCell);
  }

  var superTotal = 0;
  for (var i = 0; i < allLocations.length; i++) {
    superTotal = superTotal + allLocations[i].dailyLocationTotal();
  }
  tableFootCell = document.createElement('td');
  tableFootCell.textContent = superTotal;
  row.appendChild(tableFootCell);
  row.id = 'footer';
  table.appendChild(row);
};

// initial assignment store instances'
new StoreLocation('Seattle', 23, 65, 6.3, 6, 20);
new StoreLocation('Tokyo', 3, 24, 1.2, 6, 20);
new StoreLocation('Dubai', 11, 32, 3.7, 6, 20);
new StoreLocation('Paris', 20, 38, 2.3, 6, 20);
new StoreLocation('Lima', 2, 16, 4.6, 6, 20);

// table headers function is called only once to keep just 1 row of times data
renderTableHeaders(); 

// loop through allLocations array to render table DATA for each new instance
for(var i = 0; i < allLocations.length; i++) {
  console.log(allLocations)
  allLocations[i].renderTableData();
}

// footer ran 1 from global function adding hourly totals
renderTableFooter(allLocations); 













// OLD CODE FROM LAB 6 and Class NOTES
// var seattle = {
//   minCustomers : 23,
//   maxCustomers : 65,
//   avgCookiesPerCustomer : 6.3,

//   // FROM DEMO FOR HOW TO DO THIS
//   // // THIS FUNCTION was put OUTSIDE the object // // 
//   // getRandomNumber : fucntion (min, max) {
//   //   min = Math.ceil(min);
//   //   max = Math.floor(max);
//   //   return Math.floor(Math.random() * (max - min + 1)) + min;
//   // },

//   // generateCustomersPerHour : function () {
//   //   var randomPerHour = getRandomNumber(this.minCustomers, this.maxCustomers);
//   //   return randomPerHour;
//   // },
//   generateCustomersPerHour : function () {
//     var min = this.minCustomers;
//     var max = this.maxCustomers;
//     var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min; // see README for resources
//     return random;
//   }, 

//   openHour : 6, 
//   closeHour : 20,  // 
//   hoursList : [],  // refactors and stores operation hours with am or pm
//   refactorHours : function() {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       if (i < 12) {
//         this.hoursList.push(i + 'am');
//       } else if (i === 12) {
//         this.hoursList.push(i + 'pm');
//       } else if (i > 12) {
//         this.hoursList.push((i - 12) + 'pm')
//       }
//     }
//     return this.hoursList;
//   },

//   cookiesPerHourArray : [],
//   calculateCookiesForOpenHours : function () {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       var cookiesEachHour = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
//       this.cookiesPerHourArray.push(cookiesEachHour);
//     };
//     return this.cookiesPerHourArray;
//   },

//   totalCookiesPerDay : function() {
//     var sumOfCookies = 0;
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
//     }
//     return sumOfCookies;
//   },

//   displayLists : function() {
//     // get times and cookies on html
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       var locationList = document.getElementById('seattleList');
//       var locationListItem = document.createElement('li');
//       locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
//       locationList.appendChild(locationListItem);
//     }
//     // get total on html
//     var locationList = document.getElementById('seattleList');
//     var locationListItem = document.createElement('li');
//     locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
//     locationList.appendChild(locationListItem);
//   },

//   // StoreLocation.prototype.displayLists = function() {
// //   // get times and cookies on html
// //   for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
// //     var locationList = document.getElementById('seattleList');
// //     var locationListItem = document.createElement('li');
// //     locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
// //     locationList.appendChild(locationListItem);
// //   }
// //   // get total on html
// //   var locationList = document.getElementById('seattleList');
// //   var locationListItem = document.createElement('li');
// //   locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
// //   locationList.appendChild(locationListItem);
// // };
// };

// seattle.generateCustomersPerHour();

// seattle.refactorHours();
// seattle.calculateCookiesForOpenHours();
// seattle.displayLists();


// var tokyo = {
//   minCustomers : 3,
//   maxCustomers : 24,
//   avgCookiesPerCustomer : 1.2,
  
//   generateCustomersPerHour : function () {
//     var min = this.minCustomers;
//     var max = this.maxCustomers;
//     var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
//     return random;
//   }, 
  
//   openHour : 6, 
//   closeHour : 20,  // 
//   hoursList : [],  // refactors and stores operation hours with am or pm
//   refactorHours : function() {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       if (i < 12) {
//         this.hoursList.push(i + 'am');
//       } else if (i === 12) {
//         this.hoursList.push(i + 'pm');
//       } else if (i > 12) {
//         this.hoursList.push((i - 12) + 'pm')
//       }
//     }
//     return this.hoursList;
//   },
  
//   cookiesPerHourArray : [],
//   calculatecookiesPerHourArray : function () {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       var cookieNum = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
//       this.cookiesPerHourArray.push(cookieNum);
//     };
//     return this.cookiesPerHourArray;
//   },

//   totalCookiesPerDay : function() {
//     var sumOfCookies = 0;
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
//     }
//     return sumOfCookies;
//   },

//   displayLists : function() {
//     // get times and cookies on html
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       var locationList = document.getElementById('tokyoList');
//       var locationListItem = document.createElement('li');
//       locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
//       locationList.appendChild(locationListItem);
//     }
//     // get total on html
//     var locationList = document.getElementById('tokyoList');
//     var locationListItem = document.createElement('li');
//     locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
//     locationList.appendChild(locationListItem);
//   },
// };
// tokyo.refactorHours();
// tokyo.calculatecookiesPerHourArray();
// tokyo.displayLists();


// var dubai = {
//   minCustomers : 11,
//   maxCustomers : 38,
//   avgCookiesPerCustomer : 3.7,
 
//   generateCustomersPerHour : function () {
//     var min = this.minCustomers;
//     var max = this.maxCustomers;
//     var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
//     return random;
//   }, 
  
//   openHour : 6, 
//   closeHour : 20,  // 
//   hoursList : [],  // refactors and stores operation hours with am or pm
//   refactorHours : function() {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       if (i < 12) {
//         this.hoursList.push(i + 'am');
//       } else if (i === 12) {
//         this.hoursList.push(i + 'pm');
//       } else if (i > 12) {
//         this.hoursList.push((i - 12) + 'pm')
//       }
//     }
//     return this.hoursList;
//   },
  
//   cookiesPerHourArray : [],
//   calculatecookiesPerHourArray : function () {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       var cookieNum = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
//       this.cookiesPerHourArray.push(cookieNum);
//       // console.log(cookieNum);
//     };
//     return this.cookiesPerHourArray;
//   },

//   totalCookiesPerDay : function() {
//     var sumOfCookies = 0;
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
//     }
//     return sumOfCookies;
//   },

//   displayLists : function() {
//     // get times and cookies on html
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       var locationList = document.getElementById('dubaiList');
//       var locationListItem = document.createElement('li');
//       locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
//       locationList.appendChild(locationListItem);
//     }
//     // get total on html
//     var locationList = document.getElementById('dubaiList');
//     var locationListItem = document.createElement('li');
//     locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
//     locationList.appendChild(locationListItem);
//   },
// };
// dubai.refactorHours();
// dubai.calculatecookiesPerHourArray();
// dubai.displayLists();


// var paris = {
//   minCustomers : 20,
//   maxCustomers : 38,
//   avgCookiesPerCustomer : 2.3,
  
//   generateCustomersPerHour : function () {
//     var min = this.minCustomers;
//     var max = this.maxCustomers;
//     var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
//     return random;
//   }, 
  
//   openHour : 6, 
//   closeHour : 20,  // 
//   hoursList : [],  // refactors and stores operation hours with am or pm
//   refactorHours : function() {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       if (i < 12) {
//         this.hoursList.push(i + 'am');
//       } else if (i === 12) {
//         this.hoursList.push(i + 'pm');
//       } else if (i > 12) {
//         this.hoursList.push((i - 12) + 'pm')
//       }
//     }
//     return this.hoursList;
//   },
  
//   cookiesPerHourArray : [],
//   calculatecookiesPerHourArray : function () {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       var cookieNum = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
//       this.cookiesPerHourArray.push(cookieNum);
//       // console.log(cookieNum);
//     };
//     return this.cookiesPerHourArray;
//   },

//   totalCookiesPerDay : function() {
//     var sumOfCookies = 0;
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
//     }
//     return sumOfCookies;
//   },

//   displayLists : function() {
//     // get times and cookies on html
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       var locationList = document.getElementById('parisList');
//       var locationListItem = document.createElement('li');
//       locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
//       locationList.appendChild(locationListItem);
//     }
//     // get total on html
//     var locationList = document.getElementById('parisList');
//     var locationListItem = document.createElement('li');
//     locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
//     locationList.appendChild(locationListItem);
//   },
// };
// paris.refactorHours();
// paris.calculatecookiesPerHourArray();
// paris.displayLists();


// var lima = {
//   minCustomers : 2,
//   maxCustomers : 16,
//   avgCookiesPerCustomer : 4.6,
 
//   generateCustomersPerHour : function () {
//     var min = this.minCustomers;
//     var max = this.maxCustomers;
//     var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
//     return random;
//   }, 
  
//   openHour : 6, 
//   closeHour : 20,  // 
//   hoursList : [],  // refactors and stores operation hours with am or pm
//   refactorHours : function() {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       if (i < 12) {
//         this.hoursList.push(i + 'am');
//       } else if (i === 12) {
//         this.hoursList.push(i + 'pm');
//       } else if (i > 12) {
//         this.hoursList.push((i - 12) + 'pm')
//       }
//     }
//     return this.hoursList;
//   },
  
//   cookiesPerHourArray : [],
//   calculatecookiesPerHourArray : function () {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       var cookieNum = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
//       this.cookiesPerHourArray.push(cookieNum);
//       // console.log(cookieNum);
//     };
//     return this.cookiesPerHourArray;
//   },

//   totalCookiesPerDay : function() {
//     var sumOfCookies = 0;
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
//     }
//     return sumOfCookies;
//   },

//   displayLists : function() {
//     // get times and cookies on html
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       var locationList = document.getElementById('limaList');
//       var locationListItem = document.createElement('li');
//       locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
//       locationList.appendChild(locationListItem);
//     }
//     // get total on html
//     var locationList = document.getElementById('limaList');
//     var locationListItem = document.createElement('li');
//     locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
//     locationList.appendChild(locationListItem);
//   },
// };
// lima.refactorHours();
// lima.calculatecookiesPerHourArray();
// lima.displayLists(); 
