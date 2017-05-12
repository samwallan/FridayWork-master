/**
 * Created by h205p2 on 5/12/17.
 */
/*
$(document).ready(function() {
    var y =
        [{"text": 'Go to Index', "url": '#page1'},
            {"text": 'Go to Page 2', "url": '#page2'},
            {"text": 'Go to Page 3', "url": '#page3'},
            {"text": 'Go to Page 4', "url": '#page4'}];

    for(var i=0; i< y.length; i++) {

        $("#thing1,#thing2,#thing3,#thing4").append("<li><a  data-transition='fade' href='" + y[i].url + "'>" + y[i].text + "</a></li>")


    }

    $("#thing1,#thing2,#thing3,#thing4").listview( "refresh" );


});
*/


$(document).ready(function(){

    var $submit = $("#myButton");
    var $input = $("#basic");
    var $output = $("#output");
    $submit.click(function(){
        var $btn = $(this).button();

        $output.empty();
        var search = changeSpace($input.val());
        $.ajax({
            url: "https://itunes.apple.com/search?term=" + search,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(result) {
                console.log(result);
                processFunction(result);
            },
            error: function() {
                alert('Failed!');
            }
        });
        $btn.button();
    });
});


function processFunction(result) {
    var $output = $("#output");
    //write a for loop that iterates over result.results and output data to the page
    $output.listview({
        splitTheme: "b"
    });

    var splitTheme = $output.listview("option", "splitTheme");

// Setter
    $output.listview( "option", "splitTheme", "b" );
    for(var i = 0; i < result.results.length; i++) {
        $output.append("<li class='ui-li-has-alt ui-li-has-thumb ui-first-child'><a href='https://www.google.com/search?q="+result.results[i].trackName+" by "+result.results[i].artistName+"&oq=drake&aqs=chrome.0.0l6.3575j0j8&sourceid=chrome&ie=UTF-8' class='ui-btn'><img src='" + result.results[i].artworkUrl60 + "'><h3>" + result.results[i].trackName + "</h3><p>" + result.results[i].artistName + "</p></a></li>");

        //result.results[i].artistName
        //result.results[i].trackName
        //src='" + result.results[i].artworkUrl60 + "'
        /*

         <li class="ui-li-has-alt ui-li-has-thumb ui-first-child"><a href="index.html" class="ui-btn">
         <img src="images/album-bb.jpg">
         <h3>Broken Bells</h3>
         <p>Broken Bells</p>
         </a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop" aria-haspopup="true" aria-owns="purchase" aria-expanded="false" class="ui-btn ui-btn-icon-notext ui-icon-gear ui-btn-a" title="Purchase album"></a>
         </li>
         */
    }

}
function changeSpace(value){
    var returnValue = "";
    for(var i = 0; i < value.length; i++){
        if(value[i]== " "){
            returnValue += "+"
        }
        else{
            returnValue += value[i];
        }
    }
    return returnValue
}