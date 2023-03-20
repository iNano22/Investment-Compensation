/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

$(document).ready(function() {
    $(".intl-tel-input").intlTelInput({
      initialCountry: "auto",
      separateDialCode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      onlyCountries: []
    });
  });
  

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

gapi.load('client', initClient);

function initClient() {
  gapi.client.init({
    apiKey: 'AIzaSyDpszOKF0byDf_OQJeNCMNq8cgzMijqNsA',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function () {
    // Authorization successful, continue with the rest of your code here
  }, function (error) {
    console.error(error);
  });
}

function onSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const scamBroker = document.getElementById('scam-broker').value;
    const selectAmount = document.getElementById('select-amount').value;
  
    // Append row to Google Sheets
    const values = [[firstName, lastName, email, phone, scamBroker, selectAmount]];
    const range = 'Sheet1!A1:F1'; // Replace Sheet1 with the name of your sheet
    const body = { values };
    gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: '1LYO9HO9-625qiAQxd2aeFztPupT6vzDGdNV5EJNRQao',
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: body
    }).then((response) => {
      console.log(`${response.result.updates.updatedCells} cells appended.`);
    }, (reason) => {
      console.error(`Error: ${reason.result.error.message}`);
    });
  
    // Clear form inputs
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('scam-broker').value = '';
    document.getElementById('select-amount').value = '';
  }
  