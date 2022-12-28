const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const OptionContainer=document.querySelector(".option-container");
const indicatorContainer=document.querySelector(".ansewr-indicateur");
const homeBox = document.querySelector(".home-box");
const quizeBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");



let questionCounter=0;
let currentQuestion;
let availableQuestion=[];
let availableOptions=[];
let Correctansew = 0;
let attemp = 0;


// push the question to availableQuestion 
 function setavailableQuestion(){
    const totalQuetions = quiz.length;
    for(let i=0;i<totalQuetions;i++){
        availableQuestion.push(quiz[i]);

    }
    
 }
//set question number and question options

 function getNewQquestion(){
    // set Question Number
    questionNumber.innerHTML="Question " + (questionCounter + 1)+ " de " + (quiz.length)
        // set Question text
        //get random question
        const questionIndex= availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
        currentQuestion= questionIndex;
        questionText.innerHTML = currentQuestion.question;
        //get the position of questionIndex from availableQuestion array, so the question doesn't repeat 
        index1= availableQuestion.indexOf(questionIndex);
        //remove questionIndex  from availableQuestion
        availableQuestion.splice(index1,1);
        
        //get options lenght
        const optionLen=currentQuestion.options.length;
        //push options into availableOptions 
        for(let i=0;i<optionLen;i++){
            availableOptions.push(i);
        }
        OptionContainer.innerHTML='';
        let animationDelay =0.3;
        //add options in html
        for(let i=0;i<optionLen;i++){
            //random options
            const optionindex = availableOptions[Math.floor(Math.random() *availableOptions.length)];
            //get the position of optionindex from availableOptions
            const index2 = availableOptions.indexOf(optionindex);
            //remove optionindex from availableOptions 
            availableOptions.splice(index2,1);
            

            const option = document.createElement("div");
            option.innerHTML=currentQuestion.options[optionindex];
            option.id = optionindex;
            option.style.animationDelay= animationDelay +'s';
            animationDelay=animationDelay + 0.3;
            option.className="option";
            OptionContainer.appendChild(option);
            option.setAttribute('onclick',"getResult(this)"); 

        }
        
        questionCounter++;
 };
 //get the ansewer with comparing the attribute "ansewer" with the id of the option of currentQuestion 
 function getResult(Element){
    const id = parseInt(Element.id);
    if(id=== currentQuestion.ansewr){
//set green color to the correct ansewer
        Element.classList.add("correct");
//set the indicator to the right answ
        updateindicatorans("correct");
        Correctansew++;
        console.log("correct " +Correctansew)

    }
    else{
 //set red color to the wrong answ
        Element.classList.add("incorrect");
        
///
        updateindicatorans("incorrect");

        //show the right ansew withe green color if the user is wrong
        const optle = OptionContainer.children.length;
        for(let i=0;i<optle;i++){
            if(parseInt(OptionContainer.children[i].id) === currentQuestion.ansewr){
            OptionContainer.children[i].classList.add("correct");
            }
        }
    }
    attemp++ ;
    uncklicapbleOptions();

 }
 function updateindicatorans(markType){
    indicatorContainer.children[questionCounter -1].classList.add(markType);
   
 }
 //make all options unclick once the user choose the answ
 function uncklicapbleOptions(){
    const optle = OptionContainer.children.length;
    for(let i=0;i<optle;i++){
     OptionContainer.children[i].classList.add("already-clicked")
    }
 }
 function next(){
    if(questionCounter==quiz.length){
        console.log("quiz over")
        quizOver();
    }
    else{
        getNewQquestion();
    }
 }

function ansewerindicators(){
    indicatorContainer.innerHTML='';
     const totlQues = quiz.length;
     for(let i=0;i<totlQues;i++){
        const indicator = document.createElement("div");
        indicatorContainer.appendChild(indicator);
        
          
     } 
}
function quizOver(){
 //hide the quiz box
 quizeBox.classList.add('hide');
 //go to resultbox
 resultBox.classList.remove("hide");
 quizResult();
}
function quizResult(){
    resultBox.querySelector(".question-totale").innerHTML=quiz.length;
    resultBox.querySelector(".esseye").innerHTML=attemp;
    resultBox.querySelector(".juste").innerHTML=Correctansew;
    resultBox.querySelector(".faux").innerHTML= attemp -Correctansew;
    const pourcentage=(Correctansew/quiz.length)*100;
    resultBox.querySelector(".Pourcentage").innerHTML= pourcentage.toFixed(2) + " %";
    resultBox.querySelector(".total-score").innerHTML= Correctansew+ "/" +quiz.length;


}
function resetQuiz(){
   questionCounter=0;
   Correctansew = 0;
   attemp = 0;


}
function tryagain(){
    resultBox.classList.add("hide");
    quizeBox.classList.remove("hide");
    resetQuiz();
    goToquiz();

}
function Gotohome(){
    //show the homebox
    homeBox.classList.remove("hide");
    //hide the quiz and result box
    quizeBox.classList.add("hide");
    resetQuiz();
    resultBox.classList.add("hide");
}

function goToquiz(){
    //hide the home box
    homeBox.classList.add("hide");
    //show the quiz box
    quizeBox.classList.remove("hide");
//first we will set all the questionqq into availableQuestion
    setavailableQuestion();
//second we will call getNewQquestion function
    getNewQquestion();
//to create ansewer indicators 
    ansewerindicators();
 }
 window.onload =function(){
    homeBox.querySelector(".total-question").innerHTML= quiz.length;
    console.log(quiz.length)
 }
