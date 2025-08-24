document.addEventListener("DOMContentLoaded", () =>{

  const expenseForm = document.getElementById('expense-form')
  const expenseName = document.getElementById('expense-name')
  const expenseAmount = document.getElementById('expense-amount')
  const expenseList = document.getElementById('expense-list')
  const expenseTotalAmount = document.getElementById('total-amount')

  let expense =  JSON.parse(localStorage.getItem('expense')) || [];
  let totalamount = calculateAmount();
  renderData();

  expenseForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = expenseName.value.trim()
    const amount = parseFloat(expenseAmount.value.trim());
    if (name !== "" && !isNaN(amount) && amount>0){
    const newExpense ={
      id : Date.now(),
      name,
      amount
    }
    expense.push(newExpense);
    savetostorage();
    renderData();
    updateTotal()
    expenseName.value = ""
    expenseAmount.value = ""

  }
  })

  function renderData(){
      expenseList.innerHTML = "";
    expense.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expense.name} - $${expense.amount}
        <button data-id="${expense.id}">Delete</button>
        `;
      expenseList.appendChild(li);
    });
  }
  
function calculateAmount(){
  return expense.reduce((sum, expense)=> sum + expense.amount,0)
}

  function savetostorage(){
    localStorage.setItem('expense', JSON.stringify(expense))
  }


  function updateTotal(){
    const totalexpense = calculateAmount()
    expenseTotalAmount.textContent = totalexpense.toFixed(2);
  }

    expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expense = expense.filter((expense) => expense.id !== expenseId);

      savetostorage();
      renderData();
      updateTotal();
    }
  });
})