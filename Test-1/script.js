let budget = 0;
let expenses = [];

function addBudget() {
    let amount = Number(document.getElementById("budgetInput").value);

    if (amount <= 0) {
        alert("Please enter a valid budget");
        return;
    }

    budget = amount;

    document.getElementById("budgetInput").value = "";

    updateBudget();
}

function addExpense() {
    let title = document.getElementById("expenseTitle").value.trim();
    let amount = Number(document.getElementById("expenseAmount").value);

    if (title === "") {
        alert("Please enter expense title");
        return;
    }

    if (amount <= 0) {
        alert("Please enter valid expense amount");
        return;
    }

    if (amount > budget) {
        alert("Expense cannot be greater than your budget");
        return;
    }

    expenses.push({
        title: title,
        amount: amount
    });

    document.getElementById("expenseTitle").value = "";
    document.getElementById("expenseAmount").value = "";

    updateBudget();
}

function updateBudget() {
    let totalExpenses = 0;

    expenses.forEach(function (expense) {
        totalExpenses += expense.amount;
    });

    const budgetLeft = budget - totalExpenses;

    document.getElementById("totalBudget").innerText = `₹${budget}`;
    document.getElementById("totalExpenses").innerText = `₹${totalExpenses}`;
    document.getElementById("Budgetleft").innerText = `₹${budgetLeft}`;

    displayExpenses();
}

function displayExpenses() {
    const expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">
                    No expenses added
                </td>
            </tr>
        `;
        return;
    }

    expenses.forEach(function (expense, index) {
        expenseList.innerHTML += `
            <tr>
                <td>${expense.title}</td>
                <td>₹${expense.amount}</td>
                <td>
                    <button 
                        onclick="deleteExpense(${index})"
                        class="btn btn-danger btn-sm">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);

    updateBudget();
}

function resetAll() {
    const confirmReset = confirm("Reset everything?");

    if (!confirmReset) {
        return;
    }

    budget = 0;
    expenses = [];

    document.getElementById("budgetInput").value = "";
    document.getElementById("expenseTitle").value = "";
    document.getElementById("expenseAmount").value = "";

    updateBudget();
}

updateBudget();
