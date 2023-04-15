function changeToX(event){
   const container=event.currentTarget;
   container.classList.remove('inattivo');
   container.classList.add('attivo');
   const image=container.querySelector('img.checkbox');
   image.src='images/checked.png'; 
   changeToNull(container);
   AssegnaRisposta(container);
   if(Finisci()){
        for(const box of boxes){
            box.removeEventListener('click',changeToX);
        }
        if(answers["two"]===answers["three"]){
            Risultato(answers["two"]);
        }
        else{
            Risultato(answers["one"]);
        }
    }
}

function changeToNull(container){
    for(const box of boxes){
        if((box!==container)&&(box.dataset.questionId===container.dataset.questionId)){
            box.classList.remove('attivo');
            box.classList.add('inattivo');
            const image=box.querySelector('img.checkbox');
            image.src='images/unchecked.png';  
        }
    }
}

function AssegnaRisposta(answer){
    const ris1=answer.dataset.questionId;
    answers[ris1]=answer.dataset.choiceId;
    console.log(answers);
}

function Finisci(){
    return ((answers["one"]!==undefined)   
            &&(answers["two"]!==undefined)
            &&(answers["three"]!==undefined));
}

function Risultato(answer){
    result=document.querySelector('#risultato');
    const ricaricabottone=document.querySelector('#ricarica');
    const titolo=result.querySelector("h1");
    titolo.textContent=RESULTS_MAP[answer].title;
    const contents=result.querySelector("p");
    contents.textContent=RESULTS_MAP[answer].contents;
    result.classList.remove('hide');
    ricaricabottone.addEventListener('click',Resetta);   
}

function Resetta(event){
    answers={};
    console.log(answers);
    const boxes=document.querySelectorAll(".choice-grid div");
    for(let box of boxes){
        box.classList.remove("attivo","inattivo");
        let checkbox=box.querySelector(".checkbox");
        checkbox.src="images/unchecked.png";
        box.addEventListener('click', changeToX);     
    }
    result.classList.add('hide');/**/
    window.scrollTo(0,0);
}

let answers={}; //Mappo la singola domanda alla risposta

const boxes=document.querySelectorAll('.choice-grid div');
for(const box of boxes){
    box.addEventListener('click',changeToX);
}