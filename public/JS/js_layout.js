$(document).ready(function($) {
  //$('table').hide();
  $('#fileselector').change(function() {
    $('table').show();
    var selection = $(this).val();
    var dataset = $('#filelist tbody').find('tr');
    if(selection==="clear"){
      dataset.show();
    }
    else{
    
    // show all rows first
    dataset.each(function(index) {
    item = $(this);
    item.hide();
    
    var filename = item.find('td:nth-child(2)');
    var text = filename.text();
    //console.log(selection);
    var string2=selection+"$";
    //console.log(string2);
    var regex = new RegExp(string2);
    if(text.match(regex)!= null)
    {
     //console.log(text);
     item.show();
    }
    
  });
}});
});