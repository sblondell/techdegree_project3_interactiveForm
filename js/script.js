//Take all global variables and organize them at the top...



/*
  On webpage load...
  - put focus on the 'name' input field
  - hide the 'Other' input field
  - visually clear the t-shirt color option box;
      if the '#extra credit' for hiding the 'color' options wasn't implemented, this simply provides for better aesthetics
  - attach appropriate class names to each t-shirt color option
  - hide the 'color' options for the user until a 'design' choice is selected
*/
$('#name').focus();
$('#other-title').hide();
$('#color').val('');
classifyShirts();
$('#colors-js-puns').hide();


/*               BASIC INFO                 */

$('#title').on('change', function() {
  //if (/other/i.test($(this).val())){ //If the user selects the 'other' job role option, display the text field
  if ($(this).val() === "other"){
    $('#other-title').show();
  }else {
    $('#other-title').hide();
  }
});



/*               T-SHIRT INFO               */

//Function will attach an html class attribute based on type of t-shirt to the 'color' options of t-shirt info
function classifyShirts(){
  const shirtColors = $('#color').children();
  for (let i = 0; i < shirtColors.length; i++){
    if (/JS\sPuns/.test(shirtColors.eq(i).text())){
      shirtColors.eq(i).addClass('puns');
    }else {
      shirtColors.eq(i).addClass('heart');
    }
  }
}

//
//Having trouble assigning the new current index item to the top of the option list
//
//Displays the appropriate color options given the t-shirt design selected
const displayShirtColors = (type) => {
  const shirtColors = $('#color').children();
  $('#colors-js-puns').show(); //Reveal the 'color' options
  shirtColors.hide();

  for (let i = 0; i < shirtColors.length; i++){
    if (shirtColors.eq(i).attr('class') === type) {
      shirtColors.eq(i).show();
      shirtColors.parent().val(shirtColors.eq(i).val()); //Set the selected index of options to the last option in the new list
    }
  }
}

$('#design').on('change', function() {
  if (/js puns/i.test($(this).val())){ 
    displayShirtColors('puns');
  }else {
    displayShirtColors('heart');
  }
});



/*        REGISTER FOR ACTIVITIES           */

var totalPrice = 0; //Global total price variable

//Adding a 'Total Price' element
const priceDisplay = $('<span>').text('Total: $0.00').addClass('totalPrice');
$('.activities').append(priceDisplay);

const updatePrice = () => {
  $('.totalPrice').text($('.totalPrice').text().replace(/\$[0-9]*\.[0-9]+/, `$${totalPrice}.00`));
}

$('.activities').on('click', 'input[type=checkbox]', function() {
  const activityLabels = $('.activities label');
  const activityInputs = $('.activities input');
  const regexp_timeAndDay = new RegExp(/([MTWFS][a-z]*day).*([0-9]+.*[0-9]+[pa]m)/); //Test expression for weekday and time
  const regexp_price = new RegExp(/\$([0-9]*$)/); //Test expression for price 
  const userChoice_price = parseInt(regexp_price.exec($(this).parent().text())[1]);//'.exec()' returns an array; the 'price' is extracted... 
  var userChoice_day;
  var userChoice_time;
  var userOptions_day;
  var userOptions_time;

  const toggleSelection = (selection, inputBox) => {
    selection.toggleClass('conflict'); //Turns on the conflict 'flag'
    inputBox.attr('disabled') ? inputBox.attr('disabled', false) : inputBox.attr('disabled', true);
    selection.fadeOut(500).fadeIn(500); //Quick animation to alert user to conflict(s)...
    //$(selection).toggleClass('conflict'); //Turns on the conflict 'flag'
    //$(inputBox).attr('disabled') ? $(inputBox).attr('disabled', false) : $(inputBox).attr('disabled', true);
    //$(selection).fadeOut(500).fadeIn(500); //Quick animation to alert user to conflict(s)...
  }

  //Keeps track of running price total for user selections...
  $(this).prop('checked') ? totalPrice += userChoice_price : totalPrice -= userChoice_price; 
  updatePrice();

  //Tests whether or not a 'day' and 'time' can be extracted...if not, left blank...
  if (regexp_timeAndDay.test($(this).parent().text())){
    userChoice_day = regexp_timeAndDay.exec($(this).parent().text())[1]; //'.exec()' returns an array; the 'day' is extracted...
    userChoice_time = regexp_timeAndDay.exec($(this).parent().text())[2];//'.exec()' returns an array; the 'time' is extracted...
  }

  //Iterate through the selection list and enable/disable any conflicting selections...
  for (let i = 0; i < activityLabels.length; i++){
    try{
      //userOptions_day = regexp_timeAndDay.exec($(activityLabels).eq(i).text())[1];
      //userOptions_time = regexp_timeAndDay.exec($(activityLabels).eq(i).text())[2];
      userOptions_day = regexp_timeAndDay.exec(activityLabels.eq(i).text())[1];
      userOptions_time = regexp_timeAndDay.exec(activityLabels.eq(i).text())[2];

      if (
	userChoice_day === userOptions_day
	&& userChoice_time === userOptions_time
	//&& $(this).parent().index() != $(activityLabels).eq(i).index() //used to make sure user's choice is not affected by toggle code...
	&& $(this).parent().index() != activityLabels.eq(i).index() //used to make sure user's choice is not affected by toggle code...
      ){
	//toggleSelection($(activityLabels).eq(i), $(activityInputs).eq(i));
	toggleSelection(activityLabels.eq(i), activityInputs.eq(i));
      }
    }catch{
      console.log(`No matches for regexp_timeAndDay found on item ${i+1}...`);
    }
  }
});



/*             PAYMENT INFO                 */

const div_payment_creditCard = $('.credit-card');
const div_payment_payPal = div_payment_creditCard.next().hide();
const div_payment_bitCoin = div_payment_payPal.next().hide();
const payment_method = $('#payment').val('credit card');

payment_method.on('change', function() {
  div_payment_creditCard.hide();
  div_payment_payPal.hide();
  div_payment_bitCoin.hide();

  if (payment_method.val() === 'credit card'){
    isValid(true, $('label[for=payment]'));
    div_payment_creditCard.show();
  }else if (payment_method.val() === 'paypal'){
    isValid(true, $('label[for=payment]'));
    div_payment_payPal.show();
  }else if (payment_method.val() === 'bitcoin'){
    isValid(true, $('label[for=payment]'));
    div_payment_bitCoin.show();
  }
});



/*             FORM VALIDATION              */

const user_name = $('#name');
const user_email = $('#mail');
const user_cc = $('#cc-num');
const user_zip = $('#zip');
const user_cvv = $('#cvv');

/*const offFocusValidator = (validator) => {
  return e => {
    const valid = validator(e.target.value);
    const flag = e.target.previousElementSibling;
    isValid(valid, flag);
  }
}*/

const isValid = (valid, element) => {
  if (valid){
    //$(element).removeClass('invalid');
    element.removeClass('invalid');
  }else{
    //$(element).addClass('invalid').fadeOut(500).fadeIn(500);
    element.addClass('invalid').finish().fadeOut(500).fadeIn(500);
  }
}

const validator_user_name = () => {
  var valid = false;
  $('#name').val() ? valid = true : valid = false;
  isValid(valid, $('label[for=name]'));
  return valid;
}
const validator_user_email = () => {
  var valid = false;
  /^[0-9a-z]+@[0-9a-z]+\.[a-z]{3}$/i.test($('#mail').val()) ? valid = true : valid = false;
  isValid(valid, $('label[for=mail]'));
  return valid;
}
const validator_activity = () => {
  var valid = false;
  for (let i = 0; i < $('.activities input').length; i++){
    if ($('.activities input').eq(i).prop('checked')){
      valid = true;
      break;
    }
  }
  isValid(valid, $('.activities legend'));
  return valid;
}
const validator_user_cc = () => {
  var valid = false;
  /^[0-9]{13,16}$/.test($('#cc-num').val()) ? valid = true : valid = false;
  isValid(valid, $('label[for=cc-num]'));
  return valid;
}
const validator_user_zip = () => {
  var valid = false;
  /^[0-9]{5}$/.test($('#zip').val()) ? valid = true : valid = false;
  isValid(valid, $('label[for=zip]'));
  return valid;
}
const validator_user_cvv = () => {
  var valid = false;
  /^[0-9]{3}$/.test($('#cvv').val()) ? valid = true : valid = false;
  isValid(valid, $('label[for=cvv]'));
  return valid;
}

const validateForm = () => {
  var submit = true;

  //If 'submit' at any time is flipped to false, the form is invalid
  validator_user_name() ? submit = true : submit = false;
  validator_user_email() && submit ? submit = true : submit = false;
  validator_activity() && submit ? submit = true : submit = false;

  if (payment_method.val() === 'credit card'){
    validator_user_cc() && submit ? submit = true : submit = false;
    validator_user_zip() && submit ? submit = true : submit = false;
    validator_user_cvv() && submit ? submit = true : submit = false;
  }else if (payment_method.val() === 'select_method'){
    submit = false;
    isValid(false, $('label[for=payment]'));
  }
  return submit;
}

$('button[type=submit]').on('click', function(e) {
  validateForm() ? alert("Form has been submitted") : e.preventDefault();
});

$('#mail').on('input', function() {
  validator_user_email() ? isValid(true, $('label[for=mail]')) : isValid(false, $('label[for=mail]'));
});
