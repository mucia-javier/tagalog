window.onload = init;
const mq = window.matchMedia( "(min-width: 481px)" );

function init(){    // Get the initial Height of the document
    // Loads the previous URL in the history list
    // window.history.back();
    
    }

	



// First mode of review is to choose to match words or phrases
// with their translations
function MatchTranslationMode() {
	var back_btn = document.createElement("button");
	back_btn.value = "back_btn";
	back_btn.id = "back_btn";
	back_btn.appendChild(document.createTextNode("Main Menu"));
	back_btn.classList.add("back_btn");
	back_btn.onclick = function(){
		 window.location.href = window.location.href;
		}
	document.getElementById("navigation_section").innerHTML = "";
	document.getElementById("navigation_section").appendChild(back_btn);
	document.getElementById("navigation_section").style.textAlign = "left"; 
	
    // Clear page and populate it with new stuff
    document.getElementById("question").appendChild(document.createElement("br"));
    document.getElementById("instruction").innerHTML = "<br><br><h4>Match Words or Phrases?</h4>";
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
    words_btn.onclick = MatchWordsOrPhrases;
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
    phrases_btn.onclick = MatchWordsOrPhrases;
    document.getElementById("question").appendChild(phrases_btn);
    document.getElementById("question").appendChild(document.createElement("br"));
    document.getElementById("question").appendChild(document.createElement("br"));
  }

// User has chosen to match words or phrases
// List all available cathegories to the user
function MatchWordsOrPhrases(){
	var back_btn = document.createElement("button");
	back_btn.value = "back_btn";
	back_btn.id = "back_btn";
	back_btn.appendChild(document.createTextNode("Previous Menu"));
	back_btn.classList.add("back_btn");
	back_btn.onclick = MatchTranslationMode;
	document.getElementById("navigation_section").innerHTML = "";
	document.getElementById("navigation_section").appendChild(back_btn);
	document.getElementById("navigation_section").style.textAlign = "left"; 
	
	
	// Clear page and populate it with new stuff to give the feeling of a new window
	document.getElementById("question").innerHTML = "<br>";
    document.getElementById("instruction").innerHTML = "<h4>Select a Cathegory</h4>";
    document.getElementById("question").style.display = "block";
    document.getElementById("answer").innerHTML = "";
    document.getElementById("answer").style.display = "none";
	
	var fileName = 'vocabulary.txt'; // By default load vocabulary
	if(this.id == "phrases_btn"){    // But load Phrases if user choses so
		fileName = 'phrases.txt';
		}
    $.get(fileName, function(data) {
       //process text file line by line
        var lines = data.split("\n");
        
        for (var i = 0, len = lines.length; i < len; i++) {
            var row = lines[i];
            if(row){ // Ignore empty lines in text file
                if(row.startsWith("*")){ //This is a title/header
                    row = row.slice(1, ); // ignore the '*' character
                    var button_i = document.createElement("button");
                    var bt_id = row;//.replace(/\s+/g, '_');;
                    var t =  document.createTextNode(row);
                    button_i.appendChild(t);
                    button_i.fileName = fileName;
                    button_i.id = bt_id;
                    button_i.classList.add("review_btn");
                    button_i.onclick = GetSectionContent;
                    document.getElementById("question").appendChild(button_i);
                    document.getElementById("question").appendChild(document.createElement("br"));
                    document.getElementById("question").appendChild(document.createElement("br"));                    
                    
                    }
                }
            }
        }, 'text');
	}


function GetSectionContent(){
	// Clear page and populate it with new stuff to give the feeling of a new window
	document.getElementById("question").innerHTML = "";
    document.getElementById("question").style.display = "none";
    document.getElementById("answer").innerHTML = "";
    document.getElementById("answer").style.display = "none";
	document.getElementById("instruction").innerHTML = "<h4>Match The Pairs</h4>";
	
	var sec_type = "phrases";
	if(this.fileName == "vocabulary.txt"){
        sec_type = "words";
        }
	
	var sectionContent = {
		section_type:sec_type,
        tagalog:[],
        english:[],
        tag_note:[],
        eng_note:[],
        };
	
    var sectionName = this.id;
    
    $.get(this.fileName, function(data) {
       //process text file line by line
        var lines = data.split("\n");
        var copyEntry = false;
        for (var i = 0, len = lines.length; i < len; i++) {
            var row = lines[i];
            var row_trimmed = row.slice(1, );
            if(row){ // Ignore empty lines in text file
                if(row.startsWith("*") && sectionName == row_trimmed && copyEntry == false ){ //This is a title/header
                    copyEntry = true;
                    continue;                    
                    }
                else if(row.startsWith("*") && sectionName != row_trimmed && copyEntry == true ){
                	copyEntry = false;                 
                    break;    
                    }
                else if(copyEntry == true){
                	row = row.split("|");
                    sectionContent.tagalog.push(row[0]);
                    sectionContent.english.push(row[1]);
                    if(sectionContent.section_type == "words"){
                    	if(!(typeof row[2] === 'undefined')){
                            sectionContent.tag_note.push(row[2]);
                            }
                        else{
                        	sectionContent.tag_note.push("");
                        	}
                        if(!(typeof row[3] === 'undefined')){
                            sectionContent.eng_note.push(row[3]);
                            }
                        else{
                        	sectionContent.eng_note.push("");
                            }
                    	}
                	}
                }
            }
            if(sectionContent.tagalog.length != 0){
                PlayMatch(sectionContent, 0);
                }
        }, 'text');
    }
  
function PlayMatch(sectionContent, i){
    if(i == sectionContent.tagalog.length){
    	return MatchTranslationMode();
    	}
       
    var completedElements = [];
        document.getElementById("question").style.display = "block";
        document.getElementById("question").innerHTML = "<div class='question'><tagq>"+sectionContent.tagalog[i]+"</tagq><div>";
        document.getElementById("answer").style.display = "block";
        document.getElementById("answer").innerHTML = "";
        
        
        var answerHasBeenGiven = false;
        var maxNumOfChoices = Math.min(sectionContent.tagalog.length, 5);
        var optionsShown = [];
        for(var j=1; j<=maxNumOfChoices; j++){
            var showAnswer = Math.floor(Math.random() * 10); // Get random between 0 to 1. Flip coin to decide cronological position of answer
            if(answerHasBeenGiven == false && ( j == maxNumOfChoices || showAnswer >= 7)){
        	    var button_i = document.createElement("button");
                var t =  document.createTextNode(sectionContent.english[i]);
                button_i.appendChild(t);
                button_i.id = i;
                button_i.value = sectionContent.english[i];
                button_i.classList.add("choice_btn");
                button_i.onclick = function(){
                    var modalFooter = document.getElementById('modal-footer');
                    modalFooter.classList.remove("red-wrong");
                    modalFooter.classList.add("green-right");
                    modalFooter.innerHTML = "<h5>Continue</h5>";
                    var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    document.getElementById('modal-body').innerHTML = "<may>May Tama Ka!</may><br><br><tag>"+ sectionContent.tagalog[this.id]+"</tag> is <eng>"+sectionContent.english[this.id]+"</eng><br>"; 
                    if(!(typeof sectionContent.tag_note[this.id] === 'undefined')){
                        document.getElementById('modal-body').innerHTML += "<br><strong><ilo>"+sectionContent.tag_note[this.id]+"</ilo></strong><br>";
                        }
                    if(!(typeof sectionContent.eng_note[this.id] === 'undefined')){
                        document.getElementById('modal-body').innerHTML += "<trans>"+sectionContent.eng_note[this.id]+"</trans><br>";
                        }
                    document.getElementById('modal-body').innerHTML += "<br>";
                    modalFooter.onclick = function() {
                        modal.style.display = "none";
                        }
                    setTimeout(function () {
                        PlayMatch(sectionContent, i+1);
                        }, 500);
                    
                    }
                document.getElementById("answer").appendChild(button_i);
                //document.getElementById("question").appendChild(document.createElement("br"));
                //document.getElementById("question").appendChild(document.createElement("br"));
                answerHasBeenGiven = true;
        	    }
            else{
            	var randomElementIndex = Math.floor(Math.random() * sectionContent.tagalog.length);
                if(randomElementIndex == i || optionsShown.includes(randomElementIndex)){
                	j--;
                    continue;
                	}
                optionsShown.push(randomElementIndex);
                var button_i = document.createElement("button");
                var t =  document.createTextNode(sectionContent.english[randomElementIndex]);
                button_i.appendChild(t);
                button_i.id = randomElementIndex;
                button_i.value = sectionContent.english[randomElementIndex];
                button_i.classList.add("choice_btn");
                button_i.onclick = function(){
                	var modalFooter = document.getElementById('modal-footer');
                	modalFooter.classList.remove("green-right");
                    modalFooter.classList.add("red-wrong");
                    modalFooter.innerHTML = "<h5>Try Again</h5>";
                	var modal = document.getElementById('myModal');
                    modal.style.display = "block";
                    document.getElementById('modal-body').innerHTML = "<nq>Not Quite!</nq><br><br><tag>"+sectionContent.tagalog[this.id]+"</tag> is <eng>"+sectionContent.english[this.id]+"</eng><br><br>";
                    modalFooter.onclick = function() {
                        modal.style.display = "none";
                        }
                    //alert("Try Again "+sectionContent.english[this.id]+"="+sectionContent.tagalog[this.id]);
                    }
                document.getElementById("answer").appendChild(button_i);
                //document.getElementById("answer").innerHTML += "<p>"+sectionContent.english[randomElementIndex]+"</p";
                }
        	
        	
            }
            
    /*
        (right amswer hasnt been given &(last spot for answers OR random says say it))
            show right answer
                    var button_i = document.createElement("button");
                    var t =  document.createTextNode(sectionContent.english[i]);
                    button_i.appendChild(t);
                    button_i.id = i;
                    button_i.value = sectionContent.english[i];
                    button_i.classList.add("review_btn");
                    button_i.onclick = function(){
                    	alert(this.id+", value"+this.value);
                        }
                    document.getElementById("answer").appendChild(button_i);
                    //document.getElementById("question").appendChild(document.createElement("br"));
                    //document.getElementById("question").appendChild(document.createElement("br"));
    */
        
	}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 