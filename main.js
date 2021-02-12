const TypeWriter = function(txtElement,words,wait=3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt=''; /*chars in each word inside of Array*/
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false; /*this will check current state , whether deleting or not*/
}
//type method
TypeWriter.prototype.type = function(){
    //get current index of word 
    const currentIndex = this.wordIndex % this.words.length;

    //get full text of current word
    const fullTxt = this.words[currentIndex]; //words is an Array so everything you can do with arrays applies here as well
    
    // check if deleting
    if(this.isDeleting){
        //remove a character
        this.txt = fullTxt.substring(0,this.txt.length - 1);

        // substring outputs the string between the starting and ending index 
    }else{
        //add a character
        this.txt = fullTxt.substring(0,this.txt.length + 1);
       
    }
    //inset txt into span element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`; //use back ticks `` around the new span element
    
    // Type speed
    let typeSpeed = 300;
    if(this.isDeleting){
        typeSpeed /=2;
    }
    //check if word is complete

    if(!this.isDeleting && this.txt === fullTxt){
        //make pause at end
        typeSpeed= this.wait;
        //set delete to true
        this.isDeleting=true;
    }else if(this.isDeleting && this.txt ===''){
        this.isDeleting = false;
        //move to next word
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 500;

    }
    setTimeout(()=> this.type(),typeSpeed)
}


//initialize the type method on DOM load , so we'll need an event handler
document.addEventListener('DOMContentLoaded',init); //listen for an event called DOMContent Loaded, when that happens , run the init function( second parameter )

//init App
function init(){
    /*this is where we now get everything we need from
 the document, the txt-type from the span, the whole span element, the data attributes, it's all happenning here*/
 
 const txtElement = document.querySelector('.txt-type');
 const words = JSON.parse(txtElement.getAttribute('data-words')); /*get Attributes from our html document JSON.parse() will treat data-words attribute as list/or a js Array, instead of a string*/
 const wait = txtElement.getAttribute('data-wait');

 // init TypeWriter
new TypeWriter(txtElement,words,wait);

}


