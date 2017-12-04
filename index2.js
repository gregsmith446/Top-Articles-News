/*global $ APIKEY*/ //tells the editor "yo chill" the $ is on purpose, don't throw an error message - there's no impact on user experience
$(document).ready(function() { //makes sure everything reads/loads in correct order
    $.ajax({ //gives the sources in dropdown format
        method: "GET", //"GET" - all requests are in uppercase letters
        url: "https://newsapi.org/v2/sources",
        data: { country:"us", language:"en", category: "technology", apiKey: APIKEY }, //don't put apikey on a public github repo
        success: function(data){
                for (var i = 0; i < data.sources.length; i++) {
                    var source = document.createElement("OPTION"); // the variable, when called, creates the "option" aka dropdown in HTML
                    source.setAttribute("value", data.sources[i].id); // gives the option tags values from the id section on the API
                    source.innerHTML = data.sources[i].name; // gives the options tags the HTML names
                    document.getElementById("selection").appendChild(source); // this adds the next option tag from the sources onto the end until loop finishes
                }
            }    
        });
    });
        document.getElementById("selection").onchange = function() {
        document.getElementById("headlines").innerHTML = ""; 
        };
    
        $('#source').submit(function(event) { //this function 
        event.preventDefault();//prevents submit button from refreshing the page
        $.ajax({ 
            method: "GET",
            url: "https://newsapi.org/v2/top-headlines",
            data: {sources: (document.getElementById("selection").value), apiKey: APIKEY}, //don't put apikey on a public github repo
            success: function(data){
                console.log(data);
        for (var i = 0; i < data.articles.length; i++) {
                var headlines = document.createElement("li"); // creates the <li> in HTML
                var linkHeadlines = document.createElement("a"); //creates the <a> in HTML
                headlines.innerHTML = data.articles[i].title; // gives the option tags the HTML names from the API
                // linkHeadlines.href = data.articles[i].url; // give the <li> tag the href info
                linkHeadlines.setAttribute("href", data.articles[i].url); // give the <li> tag the href info
                
                linkHeadlines.innerHTML = data.articles[i].description;
                document.getElementById("headlines").appendChild(headlines).appendChild(linkHeadlines); // this adds the next option tag from the sources onto the end until loop finishes
            }
        }
    });
});