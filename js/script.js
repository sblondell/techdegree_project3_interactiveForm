//On webpage load, put focus on the 'name' input field
$('#name').focus();

//On webpage load, hide the 'Other' input field
$('#other-title').hide();

$('#color').val('').children().hide(); //Visually clear the option box
classifyShirts();

/*               BASIC INFO                 */

$('#title').on('change', function() {
  if (/other/i.test($(this).val())){ //If the user selects the 'other' job role option, display the text field
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
const displayShirtColors = (type) => {
  const shirtColors = $('#color').children();
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

$('.activities').on('click', 'input[type=checkbox]', function() {
  //const regexp_timeAndDay = new RegExp(/([MTWFS][a-z]*day)\s([0-9]+[^0-9]*[0-9]+[pa]m)/); //Test expression for weekday and time
  const activityLabels = $('.activities label');
  const activityInputs = $('.activities label input');
  const regexp_timeAndDay = new RegExp(/([MTWFS][a-z]*day).*([0-9]+.*[0-9]+[pa]m)/); //Test expression for weekday and time
  const regexp_price = new RegExp(/\$([0-9]*$)/); //Test expression for price 
  const userChoice_price = parseInt(regexp_price.exec($(this).parent().text())[1]);//'.exec()' returns an array; the 'price' is extracted... 
  var userChoice_day;
  var userChoice_time;
  var userOptions_day;
  var userOptions_time;

  const toggleSelection = (label, input) => {
    $(label).toggleClass('conflict');
    $(input).attr('disabled') ? $(input).attr('disabled', false) : $(input).attr('disabled', true);
    $(label).fadeOut(500).fadeIn(500); //quick animation to alert user to conflict(s)...
  }

  //Keeps track of running price total for user selections...
  $(this).prop('checked') ? totalPrice += userChoice_price : totalPrice -= userChoice_price; 

  //Tests whether or not a 'day' and 'time' can be extracted...if not, left blank...
  if (regexp_timeAndDay.test($(this).parent().text())){
    userChoice_day = regexp_timeAndDay.exec($(this).parent().text())[1]; //'.exec()' returns an array; the 'day' is extracted...
    userChoice_time = regexp_timeAndDay.exec($(this).parent().text())[2];//'.exec()' returns an array; the 'time' is extracted...
  }

  //Iterate through the selection list and enable/disable any conflicting selections...
  for (let i = 0; i < activityLabels.length; i++){
    try{
      userOptions_day = regexp_timeAndDay.exec($(activityLabels).eq(i).text())[1];
      userOptions_time = regexp_timeAndDay.exec($(activityLabels).eq(i).text())[2];

      if (
	userChoice_day === userOptions_day
	&& userChoice_time === userOptions_time
	&& $(this).parent().index() != $(activityLabels).eq(i).index() //used to make sure user's choice is not affected by toggle code...
      ){
	toggleSelection($(activityLabels).eq(i), $(activityInputs).eq(i));
      }
    }catch{
      console.log(`No matches for Activity List found on item ${i+1}...`);
    }
  }
  console.log(totalPrice);
});



