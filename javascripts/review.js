window.onload = init;
const mq = window.matchMedia( "(min-width: 481px)" );

function init(){    // Get the initial Height of the document
    // Loads the previous URL in the history list
    // window.history.back();
    
    }

function changeNavigationSection(){
	document.getElementById("navigation_section").style.backgroundColor = "#f0f0f0";
	document.getElementById("navigation_section").style.paddingBottom = "0.55em";
	document.getElementById("content").style.marginTop = "-0.6em";
	}

	



// First mode of review is to choose to match words or phrases
// with their translations
function MatchTranslationMode() {
	changeNavigationSection();
	document.body.style.backgroundColor = "#ffffff"; // change background color to focus attention 
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
// Show all available cathegories as buttons
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
        document.getElementById("question").appendChild(document.createElement("br"));                    
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
                   // if(sectionContent.section_type == "words"){
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
                    //	}
                	}
                }
            }
            if(sectionContent.tagalog.length != 0){
            	setTimeout(function () {
            	        sectionContent.tagalog  = sectionContent.tagalog.reverse();
                        sectionContent.english  = sectionContent.english.reverse();
                        sectionContent.tag_note = sectionContent.tag_note.reverse();
                        sectionContent.eng_note = sectionContent.eng_note.reverse();
                        PlayMatch(sectionContent, 0);
                        }, 500);
                }
        }, 'text');
    }
  
function PlayMatch(sectionContent, i){
    if(i == sectionContent.english.length){
    	return MatchTranslationMode();
    	}
       
    var completedElements = [];
        document.getElementById("question").style.display = "block";
        document.getElementById("question").innerHTML = "<tagq>"+sectionContent.english[i]+"</tagq><br> <br>";
        document.getElementById("answer").style.display = "block";
        document.getElementById("answer").innerHTML = "";
        
        // give 8 choices including tje right answer in a random order
        var answerHasBeenGiven = false;
        var maxNumOfChoices = Math.min(sectionContent.english.length, 8);
        var optionsShown = [];
        for(var j=1; j<=maxNumOfChoices; j++){
            var showAnswer = Math.floor(Math.random() * 10); // Get random between 0 to 1. Flip coin to decide cronological position of answer
            if(answerHasBeenGiven == false && ( j == maxNumOfChoices || showAnswer >= 7)){
        	    var button_i = document.createElement("button");
                var t =  document.createTextNode(sectionContent.tagalog[i]);
                button_i.appendChild(t);
                button_i.id = i;
                button_i.value = sectionContent.tagalog[i];
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
            	var randomElementIndex = Math.floor(Math.random() * sectionContent.english.length);
                if(randomElementIndex == i || optionsShown.includes(randomElementIndex)){
                	j--;
                    continue;
                	}
                optionsShown.push(randomElementIndex);
                var button_i = document.createElement("button");
                var t =  document.createTextNode(sectionContent.tagalog[randomElementIndex]);
                button_i.appendChild(t);
                button_i.id = randomElementIndex;
                button_i.value = sectionContent.tagalog[randomElementIndex];
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
                    }
                document.getElementById("answer").appendChild(button_i);
                }        	
            }
       document.getElementById("answer").appendChild(document.createElement("ol"));
	}


var sentences = [];
var descriptors = [];
var markers = [];
var nouns = [];
function CompleteSentenceMode(){
	changeNavigationSection();
	document.body.style.backgroundColor = "#ffffff"; 
	document.getElementById("question").innerHTML = "";
	document.getElementById("question").style.display = "none";
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
	
	var fileName = "sentences.txt";
	$.get(fileName, function(data) {
       //process text file line by line
        var lines = data.split("\n");
        
        var copyLines = true;
        var arrayName="";
        for (var i = 0, len = lines.length; i < len; i++) {
            var row = lines[i];
            if(row.startsWith("/*")){
            	copyLines = false;
                continue;
            	}
            else if(row.startsWith("*/")){
            	copyLines = true;
                continue;
            	}
            if(copyLines==false){
            	continue;
            	}
            
            if(row){ // Ignore empty lines in text file
                if(row.startsWith("*")){ //This is a title/header
                    row = row.slice(1, ); // ignore the '*' character
                    arrayName=row;
                    }
                else if(arrayName=="sentences"){
                	sentences.push(row);
                    }
                else if(arrayName=="descriptors"){
                	row = row.split("|");
                    row = row[0].replace(/\s+/g, '');
                	descriptors.push(row);
                	}
                else if(arrayName=="markers"){
                	row = row.split("|");
                    row = row[0];
                	markers.push(row);
                	}
                else if(arrayName=="nouns") {
                	row = row.split("|");
                    row = row[0].replace(/\s+/g, '');
                	nouns.push(row);
                	}   
                }
            }
        }, 'text');
	//sentences = sentences.sort(function() { return 0.5 - Math.random() });
	//descriptors = descriptors.sort(function() { return 0.5 - Math.random() });
	//markers = markers.sort(function() { return 0.5 - Math.random() });
	//nouns = nouns.sort(function() { return 0.5 - Math.random() });
    setTimeout(function () {
    	        sentences = sentences.reverse();
    	        //sentences = sentences.sort(function() { return 0.5 - Math.random() });
                PlayCompleteTheSentence(0);
                }, 600);
    
	}

function PlayCompleteTheSentence(sentence_index){
	if(sentence_index >= sentences.length){
		window.location.href = window.location.href;
		}
		
		
	var a_sentence = sentences[sentence_index].split("|");
	// Clear page and populate it with new stuff
	document.getElementById("submit_area").innerHTML = "";
	document.getElementById("inquiry").classList.add("inquiryDisabled");
	document.getElementById("inquiry").classList.remove("inquiry");
	document.getElementById("inquiry").style.display = "block";
	document.getElementById("inquiry").innerHTML =  "-";
    document.getElementById("instruction").innerHTML = "<div id='number_index'>"+(sentence_index+1)+" / "+(sentences.length)+"</div><div id='eng_q'>"+a_sentence[1];+"</div>"; //Show the english equivalent
    document.getElementById("answer").innerHTML = "<br>";
    document.getElementById("answer").style.display = "block";
	
	var sentArray = a_sentence[0].split(" ");
	sentArray.push(descriptors[Math.floor(Math.random() * descriptors.length)]);
	sentArray.push(descriptors[Math.floor(Math.random() * descriptors.length)]);
	sentArray.push(nouns[Math.floor(Math.random() * nouns.length)]);
	sentArray.push(nouns[Math.floor(Math.random() * nouns.length)]);
	sentArray.push(markers[Math.floor(Math.random() * markers.length)]);
	sentArray.push(markers[Math.floor(Math.random() * markers.length)]);
	sentArray = sentArray.sort(function() { return 0.5 - Math.random() });
	
	for(var i=0; i<sentArray.length; i++){
		if(sentArray[i]=="")
		    continue;
		var button_i = document.createElement("button");
        var t =  document.createTextNode(sentArray[i]);
        button_i.appendChild(t);
        button_i.value = sentArray[i];
        button_i.classList.add("choice_btn");
        button_i.onclick = function(){
        	        document.getElementById("inquiry").classList.remove("inquiryDisabled");
	                document.getElementById("inquiry").classList.add("inquiry");
        	        if(document.getElementById("inquiry").textContent=="-"){
                        document.getElementById("inquiry").innerHTML = this.value+" ";
                        }
                    else{
                    	document.getElementById("inquiry").innerHTML += this.value+" ";
                    	}
                    //this.style.display = "none";
                    //document.getElementById("answer").removeChild(this);
                    //enable to remove this button from the options when used
                    }
        document.getElementById("answer").appendChild(button_i);
		}
		
    var submit_button = document.createElement("button");
    var t =  document.createTextNode("Submit");
    submit_button.appendChild(t);
    submit_button.id = "submit";;
    submit_button.classList.add("submit_btn");
    submit_button.onclick = function(){
    	if(a_sentence[0]==document.getElementById("inquiry").textContent){
    	    var modalFooter = document.getElementById('modal-footer');
            modalFooter.classList.remove("red-wrong");
            modalFooter.classList.add("green-right");
            modalFooter.innerHTML = "<h5>Continue</h5>";
            var modal = document.getElementById('myModal');
            modal.style.display = "block";
            document.getElementById('modal-body').innerHTML = "<may>May Tama Ka!</may><br><br><tag>"+ a_sentence[0]+"</tag> <br>is<br><eng>"+a_sentence[1]+"</eng><br>";
            document.getElementById('modal-body').innerHTML += "<br>";
            modalFooter.onclick = function() {
                modal.style.display = "none";
                PlayCompleteTheSentence(sentence_index+1);
                }
    	    }
        else{
        	document.getElementById('modal-body').innerHTML = "<nq>Not Quite!</nq><br><br><br>";
            var modalFooter = document.getElementById('modal-footer');
            modalFooter.classList.remove("green-right");
            modalFooter.classList.add("red-wrong");
            modalFooter.innerHTML = "<h5>Try Again</h5>";
            var modal = document.getElementById('myModal');
            modal.style.display = "block";
            modalFooter.onclick = function() {
                modal.style.display = "none";
                //PlayCompleteTheSentence(sentence_index);
                }
        	}
    	}
    document.getElementById("submit_area").appendChild(document.createElement("br"));
    document.getElementById("submit_area").appendChild(submit_button);
	document.getElementById("submit_area").appendChild(document.createElement("br"));
	document.getElementById("submit_area").appendChild(document.createElement("br"));
		
	var reveal_btn = document.createElement("button");
    var t =  document.createTextNode("Reveal");
    reveal_btn.appendChild(t);
    reveal_btn.id = "reveal";;
    reveal_btn.classList.add("faint_btn");
    reveal_btn.onclick =function(){
    	document.getElementById("inquiry").classList.remove("inquiryDisabled");
	    document.getElementById("inquiry").classList.add("inquiry");
        document.getElementById("inquiry").innerHTML = a_sentence[0]; 
        }
    document.getElementById("submit_area").appendChild(reveal_btn);
	
	var delete_button = document.createElement("button");
    var t =  document.createTextNode("< Delete");
    delete_button.appendChild(t);
    delete_button.id = "delete";;
    delete_button.classList.add("faint_btn");
    delete_button.onclick =function(){
    	if(!(document.getElementById("inquiry").textContent=="-")){
            //document.getElementById("inquiry").innerHTML = "-";
            var str = document.getElementById("inquiry").textContent;
            str = str.substring(0, str.length-1); //remove trailing blank space
            var lastSpaceIndex = str.lastIndexOf(" ");
            str = str.substring(0, lastSpaceIndex+1);  //does not include space
            if(str)
                document.getElementById("inquiry").innerHTML = str;
            else {
                document.getElementById("inquiry").innerHTML = "-";
                document.getElementById("inquiry").classList.remove("inquiry");
	            document.getElementById("inquiry").classList.add("inquiryDisabled");
                }
            }
        //document.getElementById("inquiry").classList.remove("inquiry");
	    //document.getElementById("inquiry").classList.add("inquiryDisabled");
        }
    document.getElementById("submit_area").appendChild(delete_button);
	
	
	//  --
	var clear_button = document.createElement("button");
    var t =  document.createTextNode("× Clear");
    clear_button.appendChild(t);
    clear_button.id = "clear";;
    clear_button.classList.add("faint_btn");
    clear_button.onclick =function(){
    	if(!(document.getElementById("inquiry").textContent=="-"))
            document.getElementById("inquiry").innerHTML = "-";
        document.getElementById("inquiry").classList.remove("inquiry");
	    document.getElementById("inquiry").classList.add("inquiryDisabled");
        }
    document.getElementById("submit_area").appendChild(clear_button);
	//--
    
    document.getElementById("submit_area").appendChild(document.createElement("br"));
    
    var previous_button = document.createElement("button");
    var t =  document.createTextNode("<< Previous");
    previous_button.appendChild(t);
    previous_button.id = "previous";;
    previous_button.classList.add("faint_btn");
    previous_button.onclick =function(){
    	if(sentence_index > 0)
    	    PlayCompleteTheSentence(sentence_index-1);
        }
    document.getElementById("submit_area").appendChild(previous_button);
    
    var n_number = 8;
    var nextN_button = document.createElement("button");
    var t =  document.createTextNode(n_number+"×Next >>");
    nextN_button.appendChild(t);
    nextN_button.id = "next";;
    nextN_button.classList.add("faint_btn");
    var n_index = Math.min(sentence_index+n_number, sentences.length-1);
    nextN_button.onclick =function(){
    	PlayCompleteTheSentence(n_index);
        }
    document.getElementById("submit_area").appendChild(nextN_button);
    
    document.getElementById("submit_area").style.display = "block";
	}

 
 
 
 
 
 
 
 
 
 
 
 