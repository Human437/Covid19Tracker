// 'use strict';
const covidInfoSearchUrl = 'https://disease.sh/v3/covid-19';

const googleMapInfoSearchUrl = "";

function displayResults(responseJson){
    const cases = responseJson.cases;
    const deaths = responseJson.deaths;
    const recovered = responseJson.recovered;
    $('#wrapper').empty();
    if ('country' in responseJson){
        $('#wrapper').append(`<h1 class="display-title">Covid 19 Cases and Deaths in ${responseJson.country}</h1>`)
    }else if (`state` in responseJson){
        $('#wrapper').append(`<h1 class="display-title">Covid 19 Cases and Deaths in ${responseJson.state}</h1>`)
    }else{
        $('#wrapper').append(`<h1 class="display-title">Covid 19 Cases and Deaths in the world</h1>`);
    }
    $(`#wrapper`).append(`<div class="Cases">Cases: ${cases}</div>
    <div class="Deaths">Deaths: ${deaths}</div>
    <div class="Recovered">Recovered: ${recovered}</div>`)
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

function generateCountryView(){
    $('#wrapper').empty();
    $('#wrapper').append(`<h1 class="display-title">Covid 19 Cases and Deaths by country</h1><br><h3>Select the country you want to know covid data for:</h3><form id = "country-form"><select id= "countries">
    <option value="840">United States</option>
	<option value="4">Afghanistan</option>
	<option value="248">Åland Islands</option>
	<option value="8">Albania</option>
	<option value="12">Algeria</option>
	<option value="16">American Samoa</option>
	<option value="20">Andorra</option>
	<option value="24">Angola</option>
	<option value="660">Anguilla</option>
	<option value="10">Antarctica</option>
	<option value="28">Antigua and Barbuda</option>
	<option value="32">Argentina</option>
	<option value="51">Armenia</option>
	<option value="533">Aruba</option>
	<option value="36">Australia</option>
	<option value="40">Austria</option>
	<option value="31">Azerbaijan</option>
	<option value="44">Bahamas</option>
	<option value="48">Bahrain</option>
	<option value="50">Bangladesh</option>
	<option value="52">Barbados</option>
	<option value="112">Belarus</option>
	<option value="56">Belgium</option>
	<option value="84">Belize</option>
	<option value="204">Benin</option>
	<option value="60">Bermuda</option>
	<option value="64">Bhutan</option>
	<option value="68">Plurinational State of Bolivia</option>
	<option value="535">Bonaire, Sint Eustatius and Saba</option>
	<option value="70">Bosnia and Herzegovina</option>
	<option value="72">Botswana</option>
	<option value="74">Bouvet Island</option>
	<option value="76">Brazil</option>
	<option value="86">British Indian Ocean Territory</option>
	<option value="96">Brunei Darussalam</option>
	<option value="100">Bulgaria</option>
	<option value="854">Burkina Faso</option>
	<option value="108">Burundi</option>
	<option value="116">Cambodia</option>
	<option value="120">Cameroon</option>
	<option value="124">Canada</option>
	<option value="132">Cape Verde</option>
	<option value="136">Cayman Islands</option>
	<option value="140">Central African Republic</option>
	<option value="148">Chad</option>
	<option value="152">Chile</option>
	<option value="156">China</option>
	<option value="162">Christmas Island</option>
	<option value="166">Cocos (Keeling) Islands</option>
	<option value="170">Colombia</option>
	<option value="174">Comoros</option>
	<option value="178">Congo</option>
	<option value="180">The Democratic Republic of the Congo</option>
	<option value="184">Cook Islands</option>
	<option value="188">Costa Rica</option>
	<option value="384">Côte d'Ivoire</option>
	<option value="191">Croatia</option>
	<option value="192">Cuba</option>
	<option value="531">Curaçao</option>
	<option value="196">Cyprus</option>
	<option value="203">Czech Republic</option>
	<option value="208">Denmark</option>
	<option value="262">Djibouti</option>
	<option value="212">Dominica</option>
	<option value="214">Dominican Republic</option>
	<option value="218">Ecuador</option>
	<option value="818">Egypt</option>
	<option value="222">El Salvador</option>
	<option value="226">Equatorial Guinea</option>
	<option value="232">Eritrea</option>
	<option value="233">Estonia</option>
	<option value="231">Ethiopia</option>
	<option value="238">Falkland Islands (Malvinas)</option>
	<option value="234">Faroe Islands</option>
	<option value="242">Fiji</option>
	<option value="246">Finland</option>
	<option value="250">France</option>
	<option value="254">French Guiana</option>
	<option value="258">French Polynesia</option>
	<option value="260">French Southern Territories</option>
	<option value="266">Gabon</option>
	<option value="270">Gambia</option>
	<option value="268">Georgia</option>
	<option value="276">Germany</option>
	<option value="288">Ghana</option>
	<option value="292">Gibraltar</option>
	<option value="300">Greece</option>
	<option value="304">Greenland</option>
	<option value="308">Grenada</option>
	<option value="312">Guadeloupe</option>
	<option value="316">Guam</option>
	<option value="320">Guatemala</option>
	<option value="831">Guernsey</option>
	<option value="324">Guinea</option>
	<option value="624">Guinea-Bissau</option>
	<option value="328">Guyana</option>
	<option value="332">Haiti</option>
	<option value="334">Heard Island and McDonald Islands</option>
	<option value="336">Holy See (Vatican City State)</option>
	<option value="340">Honduras</option>
	<option value="344">Hong Kong</option>
	<option value="348">Hungary</option>
	<option value="352">Iceland</option>
	<option value="356">India</option>
	<option value="360">Indonesia</option>
	<option value="364">Islamic Republic of Iran</option>
	<option value="368">Iraq</option>
	<option value="372">Ireland</option>
	<option value="833">Isle of Man</option>
	<option value="376">Israel</option>
	<option value="380">Italy</option>
	<option value="388">Jamaica</option>
	<option value="392">Japan</option>
	<option value="832">Jersey</option>
	<option value="400">Jordan</option>
	<option value="398">Kazakhstan</option>
	<option value="404">Kenya</option>
	<option value="296">Kiribati</option>
	<option value="408">Democratic People's Republic of Korea (North)</option>
	<option value="410">Republic of Korea (South)</option>
	<option value="414">Kuwait</option>
	<option value="417">Kyrgyzstan</option>
	<option value="418">Lao People's Democratic Republic</option>
	<option value="428">Latvia</option>
	<option value="422">Lebanon</option>
	<option value="426">Lesotho</option>
	<option value="430">Liberia</option>
	<option value="434">Libya</option>
	<option value="438">Liechtenstein</option>
	<option value="440">Lithuania</option>
	<option value="442">Luxembourg</option>
	<option value="446">Macao</option>
	<option value="807">Macedonia, the former Yugoslav Republic of</option>
	<option value="450">Madagascar</option>
	<option value="454">Malawi</option>
	<option value="458">Malaysia</option>
	<option value="462">Maldives</option>
	<option value="466">Mali</option>
	<option value="470">Malta</option>
	<option value="584">Marshall Islands</option>
	<option value="474">Martinique</option>
	<option value="478">Mauritania</option>
	<option value="480">Mauritius</option>
	<option value="175">Mayotte</option>
	<option value="484">Mexico</option>
	<option value="583">Micronesia, Federated States of</option>
	<option value="498">Moldova, Republic of</option>
	<option value="492">Monaco</option>
	<option value="496">Mongolia</option>
	<option value="499">Montenegro</option>
	<option value="500">Montserrat</option>
	<option value="504">Morocco</option>
	<option value="508">Mozambique</option>
	<option value="104">Myanmar</option>
	<option value="516">Namibia</option>
	<option value="520">Nauru</option>
	<option value="524">Nepal</option>
	<option value="528">Netherlands</option>
	<option value="540">New Caledonia</option>
	<option value="554">New Zealand</option>
	<option value="558">Nicaragua</option>
	<option value="562">Niger</option>
	<option value="566">Nigeria</option>
	<option value="570">Niue</option>
	<option value="574">Norfolk Island</option>
	<option value="580">Northern Mariana Islands</option>
	<option value="578">Norway</option>
	<option value="512">Oman</option>
	<option value="586">Pakistan</option>
	<option value="585">Palau</option>
	<option value="275">Palestinian Territory, Occupied</option>
	<option value="591">Panama</option>
	<option value="598">Papua New Guinea</option>
	<option value="600">Paraguay</option>
	<option value="604">Peru</option>
	<option value="608">Philippines</option>
	<option value="612">Pitcairn</option>
	<option value="616">Poland</option>
	<option value="620">Portugal</option>
	<option value="630">Puerto Rico</option>
	<option value="634">Qatar</option>
	<option value="638">Réunion</option>
	<option value="642">Romania</option>
	<option value="643">Russian Federation</option>
	<option value="646">Rwanda</option>
	<option value="652">Saint Barthélemy</option>
	<option value="654">Saint Helena, Ascension and Tristan da Cunha</option>
	<option value="659">Saint Kitts and Nevis</option>
	<option value="662">Saint Lucia</option>
	<option value="663">Saint Martin (French part)</option>
	<option value="666">Saint Pierre and Miquelon</option>
	<option value="670">Saint Vincent and the Grenadines</option>
	<option value="882">Samoa</option>
	<option value="674">San Marino</option>
	<option value="678">Sao Tome and Principe</option>
	<option value="682">Saudi Arabia</option>
	<option value="686">Senegal</option>
	<option value="688">Serbia</option>
	<option value="690">Seychelles</option>
	<option value="694">Sierra Leone</option>
	<option value="702">Singapore</option>
	<option value="534">Sint Maarten (Dutch part)</option>
	<option value="703">Slovakia</option>
	<option value="705">Slovenia</option>
	<option value="90">Solomon Islands</option>
	<option value="706">Somalia</option>
	<option value="710">South Africa</option>
	<option value="239">South Georgia and the South Sandwich Islands</option>
	<option value="728">South Sudan</option>
	<option value="724">Spain</option>
	<option value="144">Sri Lanka</option>
	<option value="729">Sudan</option>
	<option value="740">Suriname</option>
	<option value="744">Svalbard and Jan Mayen</option>
	<option value="748">Swaziland</option>
	<option value="752">Sweden</option>
	<option value="756">Switzerland</option>
	<option value="760">Syrian Arab Republic</option>
	<option value="158">Taiwan, Province of China</option>
	<option value="762">Tajikistan</option>
	<option value="834">United Republic of Tanzania</option>
	<option value="764">Thailand</option>
	<option value="626">Timor-Leste</option>
	<option value="768">Togo</option>
	<option value="772">Tokelau</option>
	<option value="776">Tonga</option>
	<option value="780">Trinidad and Tobago</option>
	<option value="788">Tunisia</option>
	<option value="792">Turkey</option>
	<option value="795">Turkmenistan</option>
	<option value="796">Turks and Caicos Islands</option>
	<option value="798">Tuvalu</option>
	<option value="800">Uganda</option>
	<option value="804">Ukraine</option>
	<option value="784">United Arab Emirates</option>
	<option value="826">United Kingdom</option>
	<option value="581">United States Minor Outlying Islands</option>
	<option value="858">Uruguay</option>
	<option value="860">Uzbekistan</option>
	<option value="548">Vanuatu</option>
	<option value="862">Bolivarian Republic of Venezuela</option>
	<option value="704">Viet Nam</option>
	<option value="92">Virgin Islands, British</option>
	<option value="850">Virgin Islands, U.S.</option>
	<option value="876">Wallis and Futuna</option>
	<option value="732">Western Sahara</option>
	<option value="887">Yemen</option>
	<option value="894">Zambia</option>
	<option value="716">Zimbabwe</option>
</select><br><br><input type ='submit'></form>`)
}

function generateStateView(){
    $('#wrapper').empty();
    $('#wrapper').append(`<h1 class="display-title">Covid 19 Cases and Deaths by state</h1><br><h3>Select the state you want to know covid data for:</h3><form id = "state-form"><select id = "states">
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
</select><br><br><input type = "submit"></form>`)
}

function generateStaySafePage(){
    $('#wrapper').empty();
    $('#wrapper').append(`<h1 class="display-title">Keeping yourself and others safe from Covid 19</h1><ul><li>Wear a mask when you go outside, work, or any other public place</li><li>Stay at least 6 feet apart from others when in a public space. If that is not possible, try waiting for the next elevator, bus, etc instead of overcrowding.</li><li>Avoid touching your face, especially your eyes and nose</li><li>Be sure to wash your hands with soap and water after touching a surface others may have touched, especially if you are going to be eating or touching your face shortly after. Use hand sanitizer if washing your hands with soap and water is not easily accessible</li><li>Self quarantine if you are feeling ill, display covid symtom, or have tested positive for Covid 19</li><li>Avoid large gatherings</li><li>Disinfect surfaces that are touched a lot, especially when in a work or public place</li><li>Ask to work or learn remotely if your employer or school allows it</li><li>Stay informed on Covid 19</li><ul>`);
}

function watchCaseByCountry(){
    $('#Cases-by-country').click(event => {
        generateCountryView();
    });
}

function watchCaseByState(){
    $('#Cases-by-state').click(event =>{
        generateStateView();
    });
}

function watchKeepYourselfSafe(){
    $('#Keep-yourself-safe').click(event =>{
        generateStaySafePage();
    });
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
}

$(getCurrentData())
$(watchCaseByCountry())
$(watchForm())
$(watchCaseByState())
$(watchKeepYourselfSafe())