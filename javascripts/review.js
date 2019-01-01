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
    document.getElementById("question").style.display = "block";
    document.getElementById("answer").innerHTML = "";
    document.getElementById("answer").style.display = "none";
    
    var words_btn = document.createElement("button");
    var bt_id = "words_btn";
    var t =  document.createTextNode("Words");
    words_btn.appendChild(t);
    words_btn.value = bt_id;
    words_btn.id = bt_id;
    words_btn.classList.add("review_btn");
    words_btn.onclick = MatchWords;
    document.getElementById("question").innerHTML = "<br>";
    document.getElementById("question").appendChild(words_btn);
    document.getElementById("question").appendChild(document.createElement("br"));
    document.getElementById("question").appendChild(document.createElement("br"));

    var phrases_btn = document.createElement("button");
    bt_id = "phrases_btn";
    t =  document.createTextNode("Phrases");
    phrases_btn.appendChild(t);
    phrases_btn.value = bt_id;
    phrases_btn.id = bt_id;
    phrases_btn.classList.add("review_btn");
    phrases_btn.onclick = function(){
        document.getElementById("answer").innerHTML = "Phrases button clicked";
        document.getElementById("answer").style.display = "block";
        alert(this.id+" clicked");
       }
    document.getElementById("question").appendChild(phrases_btn);
    document.getElementById("question").appendChild(document.createElement("br"));
    document.getElementById("question").appendChild(document.createElement("br"));
  }

function MatchWords(){
    document.getElementById("answer").innerHTML = "Words button clicked";
    document.getElementById("answer").style.display = "block";
    alert(this.id+" clicked");
	}
  
  
 
 