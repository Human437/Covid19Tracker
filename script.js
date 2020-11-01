'use strict';
const covidInfoSearchUrl = 'https://disease.sh/v3/covid-19';

const countriesAPI = `https://restcountries.eu/rest/v2/all`;

const googleMapInfoSearchUrl = "";

const covidSelfChecker = {
    getTested: false,
    questionNumber: 0,
    answers: [
        'Yes',
        'No'
    ],
    questions: [
        {
            question: 'Has your employer, school, or some form of governing body asked you to get tested for covid 19?',
            userAnswer: ""
        },
        {
            question: 'In the past 2 weeks (14 days), have you worked or volunteered as a first responder or in a hospital, nursing home, or other medical physicality?',
            userAnswer: ""
        },
        {
            question: 'In the past 2 weeks (14 days), have you been exposed to anyone who has tested positive for Covid 19 using a lab test? Exposure can include being in their presence for 15 minutes or more with or without a mask on.',
            userAnswer: ""
        },
        {
            question: 'In the last 2 days (48 hours), have you experienced any of the following <strong>NEW</strong> symptoms?',
            symptoms: [
                `Fever of 100 F (37.8 C) or higher`,
                `Chills`,
                `Cough`,
                `Shortness of breath or difficulty breathing`,
                `Fatigue`,
                `Muscle or body aches`,
                `Headache`,
                `New loss of taste or smell`,
                `Sore throat`,
                `Congestion or runny nose`,
                `Nausea or vomiting`,
                `Diarrhea`
            ],
            userAnswer: ""
        }
    ]
}

function openCloseBurger() {
    var x = document.getElementById("myLinks");
    if (x.style.display == "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  }

function displayResults(responseJson){
    const cases = Number(responseJson.cases).toLocaleString('en');
    const deaths = Number(responseJson.deaths).toLocaleString('en');
    const recovered = Number(responseJson.recovered).toLocaleString('en');
    const html = `<div class="Cases item stats">Cases: ${cases}</div>
    <div class="Deaths item stats">Deaths: ${deaths}</div>
    <div class="Recovered item stats">Recovered: ${recovered}</div>`
    $('#wrapper').empty();
    if ('country' in responseJson){
        $('#wrapper').append(`<h1 class="display-title item"">Covid 19 Cases and Deaths in ${responseJson.country}</h1>${html}`)
    }else if (`state` in responseJson){
        $('#wrapper').append(`<h1 class="display-title item"">Covid 19 Cases and Deaths in ${responseJson.state}</h1>${html}`)
    }else{
        $('#wrapper').append(`<h1 class="display-title item"">Covid 19 Cases and Deaths in the World</h1> ${html}`);
    }
}

function getCurrentData(path = '/all?yesterday=false&twoDaysAgo=false&allowNull=true'){
    const url = `${covidInfoSearchUrl}${path}`
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function generateCountryView(countriesResponseJson){
    let html = ""
    for(let i=0;i<countriesResponseJson.length;i++){
        html += `<option value = ${countriesResponseJson[i].numericCode}>${countriesResponseJson[i].name}</option>`
    }
    $('#wrapper').empty();
    $('#wrapper').append(`<h1 class="display-title">Covid 19 Cases and Deaths by country</h1><br><h3>Select the country you want to know covid data for:</h3><form id = "country-form"><select id= "countries" class = "box">${html}</select><br><br><input type ='submit' class = "info-submit"></form>`)
}

function getCountries(){
    fetch(countriesAPI)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => generateCountryView(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function generateStateView(){
    $('#wrapper').empty();
    $('#wrapper').append(`<h1 class="display-title">Covid 19 Cases and Deaths by state</h1><br><h3>Select the state you want to know covid data for:</h3><form id = "state-form"><select id = "states" class = "box">
	<option >Alabama</option>
	<option >Alaska</option>
	<option >Arizona</option>
	<option >Arkansas</option>
	<option >California</option>
	<option >Colorado</option>
	<option >Connecticut</option>
	<option >Delaware</option>
	<option >District Of Columbia</option>
	<option >Florida</option>
	<option >Georgia</option>
	<option >Hawaii</option>
	<option >Idaho</option>
	<option >Illinois</option>
	<option >Indiana</option>
	<option >Iowa</option>
	<option >Kansas</option>
	<option >Kentucky</option>
	<option >Louisiana</option>
	<option >Maine</option>
	<option >Maryland</option>
	<option >Massachusetts</option>
	<option >Michigan</option>
	<option >Minnesota</option>
	<option >Mississippi</option>
	<option >Missouri</option>
	<option >Montana</option>
	<option >Nebraska</option>
	<option >Nevada</option>
	<option >New Hampshire</option>
	<option >New Jersey</option>
	<option >New Mexico</option>
	<option >New York</option>
	<option >North Carolina</option>
	<option >North Dakota</option>
	<option >Ohio</option>
	<option >Oklahoma</option>
	<option >Oregon</option>
	<option >Pennsylvania</option>
	<option >Rhode Island</option>
	<option >South Carolina</option>
	<option >South Dakota</option>
	<option >Tennessee</option>
	<option >Texas</option>
	<option >Utah</option>
	<option >Vermont</option>
	<option >Virginia</option>
	<option >Washington</option>
	<option >West Virginia</option>
	<option >Wisconsin</option>
	<option >Wyoming</option>
</select><br><br><input type = "submit" class = "info-submit"></form>`)
}

function generateStaySafePage(){
    $('#wrapper').empty();
    $('#wrapper').append(`<h1 class="display-title" id = "keep-urself-safe">Keeping yourself and others safe from Covid 19</h1><ul><li>Wear a mask when you go outside, work, or any other public place</li><li>Stay at least 6 feet apart from others when in a public space. If that is not possible, try waiting for the next elevator, bus, etc instead of overcrowding.</li><li>Avoid touching your face, especially your eyes and nose</li><li>Be sure to wash your hands with soap and water after touching a surface others may have touched, especially if you are going to be eating or touching your face shortly after. Use hand sanitizer if washing your hands with soap and water is not easily accessible</li><li>Self quarantine if you are feeling ill, display covid symtom, or have tested positive for Covid 19</li><li>Avoid large gatherings</li><li>Disinfect surfaces that are touched a lot, especially when in a work or public place</li><li>Ask to work or learn remotely if your employer or school allows it</li><li>Stay informed on Covid 19</li><ul>`);
}

function generateSelfTestPage(){
    $('#wrapper').empty();
    $(`#wrapper`).append(`<h2>This is a Covid 19 self checking tool to help you make a better decision about whether or not you need to get tested for Covid 19. This tool is not meant to be a diagnosis or treatment of diseases or condition of any kind. Do <strong>NOT</strong> use this tool for diagnostic purposes. Please note that information regarding Covid 19 is constantly changing. For the most up to date information regarding Covid 19 please visit <a href = "https://www.cdc.gov/coronavirus/2019-ncov/index.html">the CDC website</a>.</h2><h3>Do you agree to the conditions above?</h3><br><form id = "self-checker"><input type="radio" id="yes" name="accept" value="yes">
    <label for="yes">Yes</label><br>
    <input type="radio" id="no" name="accept" value="no" required>
    <label for="no">No</label><br><br><input type = "submit"></form>`)
}

function watchCaseByWorld(){
    $('#Cases-in-the-world').click(event => {
        getCurrentData();
    });
}

function watchCaseByCountry(){
    $('#Cases-by-country').click(event => {
        getCountries();
        if (window.outerWidth < 1035){
            openCloseBurger();
        };
    });
}

function watchCaseByState(){
    $('#Cases-by-state').click(event =>{
        generateStateView();
        if (window.outerWidth < 1035){
            openCloseBurger();
        };
    });
}

function watchKeepYourselfSafe(){
    $('#Keep-yourself-safe').click(event =>{
        generateStaySafePage();
        if (window.outerWidth < 1035){
            openCloseBurger();
        };
    });
}

function watchSelfTest(){
    $('#Self-test').click(event =>{
        generateSelfTestPage();
        if (window.outerWidth < 1035){
            openCloseBurger();
        };
    });
}

function stopSelfChecker(){
    $('#wrapper').empty();
    $('#wrapper').append('<h1>This is a Covid 19 self checking tool to help you make a better decision about whether or not you need to get tested for Covid 19. This tool is not meant to be a diagnosis or treatment of diseases or condition of any kind. Do <strong>NOT</strong> use this tool for diagnostic purposes.</h1><h2>You did not accept the terms above. You may not use this Covid 19 self checking tool.</h2>')
}

function displayQuestion(){
    const questionNumber = covidSelfChecker.questionNumber;
    const question = `<h2>${covidSelfChecker.questions[questionNumber].question}</h2>`;
    let symptoms = "";
    if (`symptoms` in covidSelfChecker.questions[questionNumber]){
        symptoms += `<ul>`
        for (let i = 0; i<covidSelfChecker.questions[questionNumber].symptoms.length; i++){
            symptoms += `<li>${covidSelfChecker.questions[questionNumber].symptoms[i]}</li>`
        }
        symptoms += `</ul>`
    }else{
        symptoms = "";
    }
    let submit = `<input type = "submit" value = "Next">`
    if (questionNumber == covidSelfChecker.questions.length-1){
        submit = `<input type = "submit" value = "Get Results">`
    }
    const answers = `<br><form id = "user-input"><input type="radio" id="yes" name="accept" value="yes">
    <label for="yes">Yes</label><br>
    <input type="radio" id="no" name="accept" value="no" required>
    <label for="no">No</label><br><br>${submit}</form>`;
    $('#wrapper').empty();
    $('#wrapper').append(`<h1>Covid 19 Self Checking Tool</h1>${question}${symptoms}${answers}`)
}

function displayTestResults(){
    covidSelfChecker.questionNumber = 0;
    let results = "<h1>Covid 19 Self Check Results</h1>";
    if (covidSelfChecker.getTested == true){
        results += "<h2>Based on the answers you provided, it is recommened that you get tested. If you exibit life threatening symtoms such as bluish lips or face, call 911. View your responses below.</h2>"
    }else{
        results += "<h2>Based on the answers you provided, it does not seem like you need to get tested right now. However, you should continue to monitor for symptoms and self quarantine if you feel that you may have been exposed. View your responses below.</h2>"
    }
    for (let i = 0;i<covidSelfChecker.questions.length;i++){
        const question = covidSelfChecker.questions[i];
        results += `<h3>${question.question}</h3><h3>Your answer: ${question.userAnswer}</h3>`
    }
    $('#wrapper').empty();
    $('#wrapper').append(results);
}

function watchForm() {
    $(`#wrapper`).on('submit','#country-form',function(event){
        event.preventDefault();
        const countryID = $('#countries').val();
        const path = `/countries/${countryID}?yesterday=false&twoDaysAgo=false&strict=true&allowNull=true`
        getCurrentData(path);
    });
    $('#wrapper').on('submit','#state-form',function(event){
        event.preventDefault();
        const state = $(`#states`).val();
        const path = `/states/${state}?yesterday=false&allowNull=true`
        getCurrentData(path);
    });
    $('#wrapper').on('submit','#self-checker',function(event){
        event.preventDefault();
        if ($('input[name="accept"]:checked').val() == "yes"){
            covidSelfChecker.questionNumber = 0;
            displayQuestion();
        }else{
            stopSelfChecker();
        }
    });
    $('#wrapper').on('submit','#user-input',function(event){
        event.preventDefault();
        covidSelfChecker.questions[covidSelfChecker.questionNumber].userAnswer = $('input[name="accept"]:checked').val();
        if ($('input[name="accept"]:checked').val() == "yes"){
            covidSelfChecker.getTested = true;
        }
        covidSelfChecker.questionNumber += 1;
        if (covidSelfChecker.questionNumber >= covidSelfChecker.questions.length){
            displayTestResults();
        }else{
            displayQuestion();
        }
        
    });
}

$(window).on('resize', function(){
    var win = $(this); //this = window
    var x = document.getElementById("myLinks");
    if (win.width() >= 1035) {
        x.style.display = "flex";
    }
});

$(getCurrentData())
$(watchCaseByCountry())
$(watchForm())
$(watchCaseByState())
$(watchKeepYourselfSafe())
$(watchSelfTest())
$(watchCaseByWorld())