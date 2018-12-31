window.onload = init;
const mq = window.matchMedia( "(min-width: 481px)" );

function init(){    // Get the initial Height of the document
    //loadVocabulary();
    document.body.style.height = 100+"vh";
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




//Make 5 buttons on click
function myFunction() {
  var i;
  for(i=0; i<5; i++)
  {
  var btn = document.createElement("BUTTON");
  var bt_id = "button"+i;
  var t =  document.createTextNode(bt_id);
  btn.appendChild(t);
  btn.value = bt_id;
btn.id =bt_id;
  btn.classList.add("orange");
  btn.onclick = function(){
       alert(this.id+" clicked");
       };
   
  //document.body.appendChild(btn);
  document.getElementById("answer").appendChild(btn);
  }
  }
  
  
 
 