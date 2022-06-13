const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display-text");

const buttons = Array.from(document.querySelectorAll("button"));
// const operations = Array.from(document.querySelectorAll(".arth"));

// Try 3
// Calculate operation
const operate = (n1, operator, n2) => {
    let result = ""
  
    if (operator === "add") {
      result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === "subtract") {
      result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === "multiply") {
      result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === "divide") {
      result = parseFloat(n1) / parseFloat(n2)
    }

    return result.toFixed(2) // to fix the value to 2 decimal places
}


// Mapping the event listener to the buttons
buttons.map(button => {
    (button.addEventListener ("click", (e) => {
        const key = e.target // targetting the buttons
        const action = key.dataset.action // targetting the dataset operator
        const keyContent = key.textContent // Return the text content of the buttons
        const displayedNum = display.textContent // Return the text content of the display
        const previousKeyType = calculator.dataset.previousKeyType // Creating a second variable to store previous key press
    
        Array.from(key.parentNode.children)
          .forEach(k => k.classList.remove('is-depressed')) // Creating a loop to remove the key press after another key is pressed using the remove function to remove the class

        // if button doesn't have a dataset operator which makes it a number and previous key is 0 or a operator or a equal sign it displays the clicked key else append the clicked key to the display number
        if (!action) {  
          if (
            displayedNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
          ) {
            display.textContent = keyContent
          } else {
            display.textContent = displayedNum + keyContent
          }
          // resetting the previous key type
          calculator.dataset.previousKeyType = 'number'
        }
        // if the action is a decimal
        if (action === 'decimal') {
          // check if the number already includes the decimal point
          if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.'
          } else if (
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
          ) {
            display.textContent = '0.'
          }
          // set previous key type
          calculator.dataset.previousKeyType = 'decimal'
        }
    
        if (
          action === 'add' ||
          action === 'subtract' ||
          action === 'multiply' ||
          action === 'divide'
        ) 
        {
          let firstValue = ""
          let operator = ""
          firstValue = calculator.dataset.firstValue
          operator = calculator.dataset.operator
          const secondValue = displayedNum
    
          if (
            firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
          ) {
            const calcValue = operate(firstValue, operator, secondValue)
            display.textContent = calcValue
            calculator.dataset.firstValue = calcValue
          } else {
            calculator.dataset.firstValue = displayedNum
          }
    
          key.classList.add('is-depressed')
          calculator.dataset.previousKeyType = 'operator'
          calculator.dataset.operator = action
        }
    
        if (action === 'clear') {
          if (key.textContent === 'C') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
          } else {
            key.textContent = 'C'
          }
    
          display.textContent = 0
          calculator.dataset.previousKeyType = 'clear'
        }
    
    
        if (action === 'calculate') {
          let firstValue = calculator.dataset.firstValue
          const operator = calculator.dataset.operator
          let secondValue = displayedNum
    
          if (firstValue) {
            if (previousKeyType === 'calculate') {
              firstValue = displayedNum
              secondValue = calculator.dataset.modValue
            }
    
            display.textContent = operate(firstValue, operator, secondValue)
          }
    
          calculator.dataset.modValue = secondValue
          calculator.dataset.previousKeyType = 'calculate'
        }

          
        if (action === "delete") {
            display.innerText = display.innerText.slice(0, -1);
        }

        if (display.innerText == "Infinity"){
            display.innerText = "Error!"
        }
    }
    ))
})



// First Try (Works) Issue: It does not hold the input in a variable

// buttons.map(button => (
//     button.addEventListener("click", (e)=>{
//         switch(e.target.innerText){
//             case "C":
//                 display.innerText = ""
//                 break;
//             case "Del":
//                 display.innerText = display.innerText.slice(0, -1)
//                 break;
//             case "=":
//                 if(
//                 display.innerText[0] === "+" || 
//                 display.innerText[0] === "-" ||
//                 display.innerText[0] === "/" ||
//                 display.innerText[0] === "*"
//                 ){
//                     display.innerText = "This is an Error"
//                     break;
//                 } else{
//                     display.innerText = eval(display.innerText);
//                     break;
//                 }
//             default: 
//                 display.innerText += e.target.innerText;
//         }
//     })
// ));

// console.log(buttons)