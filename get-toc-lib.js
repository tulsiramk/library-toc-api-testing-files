var client_info = getClientInfo();
var client_browser = getBrowserName();
var client_os = getOSName();
var client_ip_address = getClientInfoIP();

const API_URL = "https://library.market.us";

var domain = window.location.hostname;

var report_title = 'Diverter Valves Market';

// ---response div #get_toc_from_api_button

console.log(report_title);
console.log('toc-api-file-loaded');


function submitFormForTocDownload(form_class, type, form, event, is_upcoming){
    var formVali = clearAndValidateFields(form_class);
    console.log('form-validation.');
 
    if(!formVali){
        return false;
    }
    else{
        getToc();
    }
}


function getToc(){

    jQuery.ajax({
        type: 'GET',
        url: API_URL+'/api/get-token/'+domain,
        success: function(res){
            console.log(res);
            // ---Check toc--
            jQuery.ajax({
                type: 'POST',
                url: API_URL+'/api/get-toc',
                data: {
                        access_token: res.access_token, 
                        client_info: client_info,
                        client_browser: client_browser,
                        client_os: client_os,
                        client_ip_address: client_ip_address,
                        report_title: report_title,
                        domain: domain,

                        full_name: jQuery('#customerName').val(),
                        phone: jQuery('#phone').val(),
                        email:jQuery('#email').val(),
                        company:jQuery('#company').val(),
                        designation:jQuery('#designation').val(),
                        country:jQuery('#country').val(),
                        message:jQuery('#message').val()

                },
               
                success: function(res){
                    console.log(res)
                    jQuery('#get_toc_from_api_button').html('<h2>Thank you.!!</h2>');
                    window.location.href=res.url;
                }
            });
        },
        error: function(res){
            console.log(res.responseJSON.access_token);
        }
    });
}

function checkToc(){

    jQuery.ajax({
        type: 'GET',
        url: API_URL+'/api/get-token/'+domain,
        success: function(res){
            console.log(res);
            
            // ---Check toc--
            jQuery.ajax({
                type: 'POST',
                url: API_URL+'/api/check-toc',
                data: {
                        access_token: res.access_token, 
                        client_info: client_info,
                        client_browser: client_browser,
                        client_os: client_os,
                        client_ip_address: client_ip_address,
                        report_title: report_title
                },
                success: function(res){
                    console.log(res);
                    if(res.message == 'Toc available.'){     
                        getTocButton();
                    }
                    else{
                        jQuery('#get_toc_from_api_button').html(res.message);
                    }
                    
                    
                }
            });
        },
        error: function(res){
            console.log(res.responseJSON.access_token);
        }
    });
}

function getClientInfo(){
    jQuery.get("https://ipinfo.io", function(response) {
        client_info = response;
        return response;
    }, "jsonp");
}

function getClientInfoIP(){
    jQuery.get("https://ipinfo.io", function(response) {
        client_ip_address = response.ip;
        console.log(response.ip);
        return response.ip;
    }, "jsonp");
}

function getOSName(){

    var OSName = "Unknown";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.3") != -1) OSName="Windows 8.1";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="UNIX";
    if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="Linux";

    console.log(OSName);

    return OSName;

}

function getBrowserName(){
    navigator.sayswho= (function(){
    var ua= navigator.userAgent;
    var tem; 
    var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
    })();
    
    console.log(navigator.sayswho); // outputs: `Chrome 62`

    return navigator.sayswho;
}



var fields = [
    {name: 'customerName', label: 'Name'},
    {name: 'phone', label: 'Phone'},
    {name: 'email', label: 'E-mail'},
    {name: 'company', label: 'Company'},
    {name: 'designation', label: 'Designation'},
    {name: 'country', label: 'Country'},
    {name: 'message', label: 'Message'},
   
 ];


 
function isCaptchaValid(form_class) {
    console.log(form_class);
    var captcha = jQuery('.'+form_class+' .captcha_eq').text();
    var resp = (eval(/(.+)=/.exec(captcha)[1])) == jQuery('.'+form_class+' .pcaptcha_answer').val();

    console.log(resp);
    console.log('end-recaptcha');
    return resp;
 }




function clearAndValidateFields(form_class) {
    clearValiationMessages(form_class);
    var is_form_valid = true;
 
    console.log("From Validation statrt");
 
    fields.forEach(function (field) {
        //console.log(field);
        if(jQuery("."+form_class +" #" + field.name).val() == ''){
            jQuery("."+form_class + " ." + field.name).html("The " + field.label + " is required.");
            is_form_valid = false;
        }
    });
 
    console.log("From Validation end"); 

    console.log("Captcha validation start"); 
    if(is_form_valid){
        console.log("validating captcha");
        if (!isCaptchaValid(form_class)) {
            jQuery("."+form_class+" .recap_error").html("Incorrect CAPTCHA");
            is_form_valid = false;
        }
        else{
            jQuery("."+form_class+" .recap_error").html("");
            is_form_valid = true;
        }
    }
    else{
        if (!isCaptchaValid(form_class)) {
            jQuery("."+form_class+" .recap_error").html("Incorrect CAPTCHA");
            is_form_valid = false;
        }
        else{
            jQuery("."+form_class+" .recap_error").html("");    
            console.log("Captcha validation success");        
        }
    }
    console.log("Captcha validation end");
 
    console.log(is_form_valid);
 
    if (!is_form_valid) { 
        return false;
    }
    else{
        return true;
    }    
 }
 
 
 function clearValiationMessages(form_class) {    
    fields.forEach(function (field) {
        jQuery("."+form_class + " ." + field.name).html("");
    });
 }




 function getTocButton(){
    jQuery('#toc_cnt').show();
    jQuery('#get_toc_from_api_button').html('');
    jQuery('#toc_dwn_btn').html('<button style="float:right" onclick="getTocForm()" type="button">Download TOC</button>');
    
    document.getElementById('toc_scroll_to_view').scrollIntoView({
        behavior: 'smooth'
    });

 }

 function getTocForm(){
    jQuery('#toc_cnt').hide();
    jQuery('#toc_dwn_btn').html('');

    let tocDwnForm = '<form class="dwn_toc_form qy_form" method="post" action="javascript:void()" onsubmit="return submitFormForTocDownload(\'dwn_toc_form\', \'dwn_toc_form\', this, event, false)"> <h3 class="qyf_title">Download TOC</h3> <ul class="ul_reset qyf_fields clearfix"> <li> <input type="text" name="customerName" id="customerName" placeholder="Name" > <span class="customerName error"></span> </li><li> <input type="email" name="email" id="email" placeholder="E-mail"> <span class="email_error email error"></span> </li><li> <input type="text" name="company" id="company" placeholder="Company"> <span class="company error"></span> </li><li> <input type="text" name="designation" placeholder="Designation" id="designation" > <span class="designation error"></span> </li><li> <select type="text" name="country" id="country" placeholder="Country" > <option value="">-Select Country-</option> <option value="Afghanistan">Afghanistan</option> <option value="Åland Islands">Åland Islands</option> <option value="Albania">Albania</option> <option value="Algeria">Algeria</option> <option value="American Samoa">American Samoa</option> <option value="Andorra">Andorra</option> <option value="Angola">Angola</option> <option value="Anguilla">Anguilla</option> <option value="Antarctica">Antarctica</option> <option value="Antigua and Barbuda">Antigua and Barbuda</option> <option value="Argentina">Argentina</option> <option value="Armenia">Armenia</option> <option value="Aruba">Aruba</option> <option value="Australia">Australia</option> <option value="Austria">Austria</option> <option value="Azerbaijan">Azerbaijan</option> <option value="Bahamas">Bahamas</option> <option value="Bahrain">Bahrain</option> <option value="Bangladesh">Bangladesh</option> <option value="Barbados">Barbados</option> <option value="Belarus">Belarus</option> <option value="Belgium">Belgium</option> <option value="Belize">Belize</option> <option value="Benin">Benin</option> <option value="Bermuda">Bermuda</option> <option value="Bhutan">Bhutan</option> <option value="Bolivia (Plurinational State of)">Bolivia (Plurinational State of)</option> <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option> <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option> <option value="Botswana">Botswana</option> <option value="Bouvet Island">Bouvet Island</option> <option value="Brazil">Brazil</option> <option value="British Indian Ocean Territory">British Indian Ocean Territory</option> <option value="Brunei Darussalam">Brunei Darussalam</option> <option value="Bulgaria">Bulgaria</option> <option value="Burkina Faso">Burkina Faso</option> <option value="Burundi">Burundi</option> <option value="Cambodia">Cambodia</option> <option value="Cameroon">Cameroon</option> <option value="Canada">Canada</option> <option value="Cabo Verde">Cabo Verde</option> <option value="Cayman Islands">Cayman Islands</option> <option value="Central African Republic">Central African Republic</option> <option value="Chad">Chad</option> <option value="Chile">Chile</option> <option value="China">China</option> <option value="Christmas Island">Christmas Island</option> <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option> <option value="Colombia">Colombia</option> <option value="Comoros">Comoros</option> <option value="Congo">Congo</option> <option value="Congo (Democratic Republic of the)">Congo (Democratic Republic of the)</option> <option value="Cook Islands">Cook Islands</option> <option value="Costa Rica">Costa Rica</option> <option value="Côte d\'Ivoire">Côte d\'Ivoire</option> <option value="Croatia">Croatia</option> <option value="Cuba">Cuba</option> <option value="Curaçao">Curaçao</option> <option value="Cyprus">Cyprus</option> <option value="Czech Republic">Czech Republic</option> <option value="Denmark">Denmark</option> <option value="Djibouti">Djibouti</option> <option value="Dominica">Dominica</option> <option value="Dominican Republic">Dominican Republic</option> <option value="Ecuador">Ecuador</option> <option value="Egypt">Egypt</option> <option value="El Salvador">El Salvador</option> <option value="Equatorial Guinea">Equatorial Guinea</option> <option value="Eritrea">Eritrea</option> <option value="Estonia">Estonia</option> <option value="Ethiopia">Ethiopia</option> <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option> <option value="Faroe Islands">Faroe Islands</option> <option value="Fiji">Fiji</option> <option value="Finland">Finland</option> <option value="France">France</option> <option value="French Guiana">French Guiana</option> <option value="French Polynesia">French Polynesia</option> <option value="French Southern Territories">French Southern Territories</option> <option value="Gabon">Gabon</option> <option value="Gambia">Gambia</option> <option value="Georgia">Georgia</option> <option value="Germany">Germany</option> <option value="Ghana">Ghana</option> <option value="Gibraltar">Gibraltar</option> <option value="Greece">Greece</option> <option value="Greenland">Greenland</option> <option value="Grenada">Grenada</option> <option value="Guadeloupe">Guadeloupe</option> <option value="Guam">Guam</option> <option value="Guatemala">Guatemala</option> <option value="Guernsey">Guernsey</option> <option value="Guinea">Guinea</option> <option value="Guinea-Bissau">Guinea-Bissau</option> <option value="Guyana">Guyana</option> <option value="Haiti">Haiti</option> <option value="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option> <option value="Holy See">Holy See</option> <option value="Honduras">Honduras</option> <option value="Hong Kong">Hong Kong</option> <option value="Hungary">Hungary</option> <option value="Iceland">Iceland</option> <option value="India">India</option> <option value="Indonesia">Indonesia</option> <option value="Iran (Islamic Republic of)">Iran (Islamic Republic of)</option> <option value="Iraq">Iraq</option> <option value="Ireland">Ireland</option> <option value="Isle of Man">Isle of Man</option> <option value="Israel">Israel</option> <option value="Italy">Italy</option> <option value="Jamaica">Jamaica</option> <option value="Japan">Japan</option> <option value="Jersey">Jersey</option> <option value="Jordan">Jordan</option> <option value="Kazakhstan">Kazakhstan</option> <option value="Kenya">Kenya</option> <option value="Kiribati">Kiribati</option> <option value="Korea (Democratic People\'s Republic of)">Korea (Democratic People\'s Republic of)</option> <option value="Korea (Republic of)">Korea (Republic of)</option> <option value="Kuwait">Kuwait</option> <option value="Kyrgyzstan">Kyrgyzstan</option> <option value="Lao People\'s Democratic Republic">Lao People\'s Democratic Republic</option> <option value="Latvia">Latvia</option> <option value="Lebanon">Lebanon</option> <option value="Lesotho">Lesotho</option> <option value="Liberia">Liberia</option> <option value="Libya">Libya</option> <option value="Liechtenstein">Liechtenstein</option> <option value="Lithuania">Lithuania</option> <option value="Luxembourg">Luxembourg</option> <option value="Macao">Macao</option> <option value="Macedonia (the former Yugoslav Republic of)">Macedonia (the former Yugoslav Republic of)</option> <option value="Madagascar">Madagascar</option> <option value="Malawi">Malawi</option> <option value="Malaysia">Malaysia</option> <option value="Maldives">Maldives</option> <option value="Mali">Mali</option> <option value="Malta">Malta</option> <option value="Marshall Islands">Marshall Islands</option> <option value="Martinique">Martinique</option> <option value="Mauritania">Mauritania</option> <option value="Mauritius">Mauritius</option> <option value="Mayotte">Mayotte</option> <option value="Mexico">Mexico</option> <option value="Micronesia (Federated States of)">Micronesia (Federated States of)</option> <option value="Moldova (Republic of)">Moldova (Republic of)</option> <option value="Monaco">Monaco</option> <option value="Mongolia">Mongolia</option> <option value="Montenegro">Montenegro</option> <option value="Montserrat">Montserrat</option> <option value="Morocco">Morocco</option> <option value="Mozambique">Mozambique</option> <option value="Myanmar">Myanmar</option> <option value="Namibia">Namibia</option> <option value="Nauru">Nauru</option> <option value="Nepal">Nepal</option> <option value="Netherlands">Netherlands</option> <option value="New Caledonia">New Caledonia</option> <option value="New Zealand">New Zealand</option> <option value="Nicaragua">Nicaragua</option> <option value="Niger">Niger</option> <option value="Nigeria">Nigeria</option> <option value="Niue">Niue</option> <option value="Norfolk Island">Norfolk Island</option> <option value="Northern Mariana Islands">Northern Mariana Islands</option> <option value="Norway">Norway</option> <option value="Oman">Oman</option> <option value="Pakistan">Pakistan</option> <option value="Palau">Palau</option> <option value="Palestine, State of">Palestine, State of</option> <option value="Panama">Panama</option> <option value="Papua New Guinea">Papua New Guinea</option> <option value="Paraguay">Paraguay</option> <option value="Peru">Peru</option> <option value="Philippines">Philippines</option> <option value="Pitcairn">Pitcairn</option> <option value="Poland">Poland</option> <option value="Portugal">Portugal</option> <option value="Puerto Rico">Puerto Rico</option> <option value="Qatar">Qatar</option> <option value="Réunion">Réunion</option> <option value="Romania">Romania</option> <option value="Russian Federation">Russian Federation</option> <option value="Rwanda">Rwanda</option> <option value="Saint Barthélemy">Saint Barthélemy</option> <option value="Saint Helena, Ascension and Tristan da Cunha">Saint Helena, Ascension and Tristan da Cunha</option> <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> <option value="Saint Lucia">Saint Lucia</option> <option value="Saint Martin (French part)">Saint Martin (French part)</option> <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option> <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option> <option value="Samoa">Samoa</option> <option value="San Marino">San Marino</option> <option value="Sao Tome and Principe">Sao Tome and Principe</option> <option value="Saudi Arabia">Saudi Arabia</option> <option value="Senegal">Senegal</option> <option value="Serbia">Serbia</option> <option value="Seychelles">Seychelles</option> <option value="Sierra Leone">Sierra Leone</option> <option value="Singapore">Singapore</option> <option value="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option> <option value="Slovakia">Slovakia</option> <option value="Slovenia">Slovenia</option> <option value="Solomon Islands">Solomon Islands</option> <option value="Somalia">Somalia</option> <option value="South Africa">South Africa</option> <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option> <option value="South Sudan">South Sudan</option> <option value="Spain">Spain</option> <option value="Sri Lanka">Sri Lanka</option> <option value="Sudan">Sudan</option> <option value="Suriname">Suriname</option> <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option> <option value="Swaziland">Swaziland</option> <option value="Sweden">Sweden</option> <option value="Switzerland">Switzerland</option> <option value="Syrian Arab Republic">Syrian Arab Republic</option> <option value="Taiwan, Province of China">Taiwan, Province of China</option> <option value="Tajikistan">Tajikistan</option> <option value="Tanzania, United Republic of">Tanzania, United Republic of</option> <option value="Thailand">Thailand</option> <option value="Timor-Leste">Timor-Leste</option> <option value="Togo">Togo</option> <option value="Tokelau">Tokelau</option> <option value="Tonga">Tonga</option> <option value="Trinidad and Tobago">Trinidad and Tobago</option> <option value="Tunisia">Tunisia</option> <option value="Turkey">Turkey</option> <option value="Turkmenistan">Turkmenistan</option> <option value="Turks and Caicos Islands">Turks and Caicos Islands</option> <option value="Tuvalu">Tuvalu</option> <option value="Uganda">Uganda</option> <option value="Ukraine">Ukraine</option> <option value="United Arab Emirates">United Arab Emirates</option> <option value="United Kingdom of Great Britain and Northern Ireland">United Kingdom of Great Britain and Northern Ireland</option> <option value="United States of America">United States of America</option> <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option> <option value="Uruguay">Uruguay</option> <option value="Uzbekistan">Uzbekistan</option> <option value="Vanuatu">Vanuatu</option> <option value="Venezuela (Bolivarian Republic of)">Venezuela (Bolivarian Republic of)</option> <option value="Viet Nam">Viet Nam</option> <option value="Virgin Islands (British)">Virgin Islands (British)</option> <option value="Virgin Islands (U.S.)">Virgin Islands (U.S.)</option> <option value="Wallis and Futuna">Wallis and Futuna</option> <option value="Western Sahara">Western Sahara</option> <option value="Yemen">Yemen</option> <option value="Zambia">Zambia</option> <option value="Zimbabwe">Zimbabwe</option> </select> <span class="country error"></span> </li><li> <input type="text" name="phone" id="phone" placeholder="Phone"> <span class="phone error"></span> </li><li class="full"> <input type="text" name="message" id="message" placeholder="Message"> <span class="message error"></span> </li><li> <div id="recaptcha4download_toc"></div><span class="recap_error"></span> </li><li> <input type="submit" name="action" value="Submit"/> </li><li><button style="background-color: #333; color: #fff;" onclick="getTocButton()" type="button">Cancel</button></li></ul> </form>';                          
    jQuery('#get_toc_from_api_button').html(tocDwnForm);
    prudour.initCaptcha("recaptcha4download_toc");
    jQuery('#customerName').focus();
 }

checkToc();

