$(document).ready(function(){

    var $submit = $("#myButton");
    var $input = $("#basic");
    var $output = $("#output");
    $submit.click(function(){
        var $btn = $(this).button();

        $output.empty();
        var search = changeSpace($input.val());
        $.ajax({
            url: "https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=x" ,//+ search,
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
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

//https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=x
//https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=x&features=keywords&return_analyzed_text=false&clean=true&fallback_to_raw=true&concepts.limit=8&emotion.document=true&entities.limit=50&entities.emotion=false&entities.sentiment=false&keywords.limit=50&keywords.emotion=false&keywords.sentiment=false&relations.model=en-news&semantic_roles.limit=50&semantic_roles.entities=false&semantic_roles.keywords=false&sentiment.document=true



function processFunction(result) {
    var $output = $("#output");

    $output.listview({
        splitTheme: "b"
    });
    $('#page1').empty()
    var splitTheme = $output.listview("option", "splitTheme");

    $output.listview( "option", "splitTheme", "b" );

    for(var i = 0; i < result.results.length; i++) {
        $output.append("<li class='ui-li-has-alt ui-li-has-thumb ui-first-child' id='"+(i+3)+"'><a href='#page"+(i+3)+"' class='ui-btn'><img src='" + result.results[i].artworkUrl60 + "'><h3>" + result.results[i].trackName + "</h3><p >" + result.results[i].artistName + "</p></a></li>");

        $('#body').append("<div data-role='page' id='page"+(i+3)+"'><div data-role='main' class='ui-content'><li data-role='listview' id='trackInfo'><img src='" + result.results[i].artworkUrl60 + "'><h3>" + result.results[i].trackName + "</h3><a href='"+result.results[i].previewUrl+"' class='ui-btn'><p >Take me to the song preview</p> </a> <p >"+result.results[i].trackViewUrl+"</p></a></li>");



        //https://www.google.com/search?q="+result.results[i].trackName+" by "+result.results[i].artistName+"&oq=drake&aqs=chrome.0.0l6.3575j0j8&sourceid=chrome&ie=UTF-8





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
    $("body").pagecontainer("change", "#page2", { transition: "fade"});
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


