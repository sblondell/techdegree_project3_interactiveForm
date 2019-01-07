//On webpage load, put focus on the 'name' input field
$('#name').focus();

//Create an input element for the 'Other' Job Role field
const other_textField = $('<input>', {
  type : 'text',
  id : 'other-title',
  name : 'user_otherTitle',
  placeholder : 'Your Job Role',
  style : 'display : none'
});
$('fieldset').eq(0).append(other_textField);

$('#title').children().each(function() {
  console.log($(this).val());
});

$('#title').on('change', function(e) {
  if (/other/i.test($(e.target).val())){
    $('#other-title').show();
  }else {
    $('#other-title').hide();
  }
});
