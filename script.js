const container = document.querySelector(".container");
const addQuetionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");

let editBool = false;

//Add question when user click Add flashcard

addQuestion.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuetionCard.classList.remove("hide");
});

//Hide Create flashcard
closeBtn.addEventListener(
  "click",
  (hideQuestion = () => {
    container.classList.remove("hide");
    addQuetionCard.classList.add("hide");
    if (editBool) {
      editBool = false;
      submitQuestion();
    }
  })
);

//Submit Question
cardButton.addEventListener(
  "click",
  (submitQuestion = () => {
    editBool = false;
    tempQuestion = question.value.trim();
    tempAnswer = answer.value.trim();

    if (!tempQuestion || !tempAnswer) {
      errorMessage.classList.remove("hide");
    } else {
      container.classList.remove("hide");
      errorMessage.classList.add("hide");
      viewlist();
      question.value = "";
      answer.value = "";
    }
  })
);


//Card Generate
function viewlist(){
    const listCard = document.getElementsByClassName("card-list-container");
    const div = document.createElement("div");
    div.classList.add("card");
    //Question
    div.innerHTML += `<p class="question-div">${question.value}</p>`;
    const displayAnswer = document.createElement("p");
    displayAnswer.classList.add("answer-div", "hide");
    displayAnswer.innerText = answer.value;

    //Link to show/hide answer
    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "show-hide-btn");
    link.innerHTML = "Show/Hide";
    link.addEventListener("click", () => {
        displayAnswer.classList.toggle("hide");
    })

    div.appendChild(link);
    div.appendChild(displayAnswer);
    
    //Edit buttton
    let buttonsCon = document.createElement("div");
    buttonsCon.classList.add("buttons-con");
    let editButton = document.createElement("button");
    editButton.setAttribute("class", "edit");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editButton.addEventListener("click", () => {
        editBool = true;
        modifyElement(editButton, true);
        addQuetionCard.classList.remove("hide");

    })
    buttonsCon.appendChild(editButton);
    disableButtons(false);

    //Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class","delete");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteButton.addEventListener("click", () =>{
        modifyElement(deleteButton);
    })
    buttonsCon.appendChild(deleteButton);

    div.appendChild(buttonsCon);
    listCard[0].appendChild(div);
    hideQuestion();
}

//modify Elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement.parentElement;
    let parentQuestion = parentDiv.querySelector(".question-div").innerText;

    if(edit){
        let parentAns = parentDiv.querySelector(".answer-div").innerText;
        answer.value = parentAns;
        question.value = parentQuestion;
        disableButtons(true);
    }
    parentDiv.remove()
}

//Disable edit & Delete
const disableButtons = (value) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = value;
    });
}