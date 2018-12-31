window.onload = init;
const mq = window.matchMedia( "(min-width: 481px)" );

function init(){    // Get the initial Height of the document
    //loadVocabulary();
   
    }
function loadVocabulary() {
    var pageTitle = document.title;
    var fileName = 'vocabulary.txt'; // By default load vocabulary
    if(pageTitle == 'Phrases')
        fileName = 'phrases.txt';
    
    $.get(fileName, function(data) {
       //alert(data);
       //process text file line by line
        var lines = data.split("\n");
        var allEntries = "<br><br>"; // "<div class='entry'>";
        for (var i = 0, len = lines.length; i < len; i++) {
            var row = lines[i];
            if(row){
                if(row.startsWith("*")){ //This is a title/header
                    row = row.slice(1, ); // ignore the '*' character
                    allEntries += "</div><div class='entry'><t0>"+row+"</t0><br>";
                    }
                else{
                    row = row.split("|")
                    allEntries +="<row><ilo>"+row[0]+"</ilo>&nbsp; <trans>"+row[1]+"</trans></row><br>";
                    }
                }
            else
                allEntries +="<br>"
        }
        allEntries += "</div>";
        $('#content').html(allEntries);
    }, 'text');
    //console.log("Finished Loading: ",pageTitle);
    }




//First mode.of review
function MatchTranslationMode() {
    document.getElementById("instruction").innerHTML = "<h4>Match Words or Phrases?</h4>";
    document.getElementById("question").innerHTML = "";
    document.getElementById("question").style.display = "none";
    document.getElementById("answer").innerHTML = "";
    document.getElementById("answer").style.display = "block";
    
    var w_btn = document.createElement("button");
    var bt_id = "words_btn";
    var t =  document.createTextNode("Match Words");
    w_btn.appendChild(t);
    w_btn.value = bt_id;
    w_btn.id =bt_id;
    w_btn.classList.add("review_btn");
    w_btn.onclick = function(){
       alert(this.id+" clicked");
       };
    document.getElementById("answer").innerHTML += "<br>";
    document.getElementById("answer").appendChild(w_btn);
    document.getElementById("answer").innerHTML += "<br><br>";

    var p_btn = document.createElement("button");
    bt_id = "phrases_btn";
    t =  document.createTextNode("Match Phrases");
    p_btn.appendChild(t);
    p_btn.value = bt_id;
    p_btn.id = bt_id;
    p_btn.classList.add("review_btn");
    p_btn.onclick = function(){
       alert(this.id+" clicked");
       }; 
    document.getElementById("answer").appendChild(p_btn);
    document.getElementById("answer").innerHTML += "<br><br>";
  }
  
  
 
 