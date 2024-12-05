// JavaScript for various calculator functionality

let historyList = [];

function calculateCurrency() {
    let exchangeRate = parseFloat(document.getElementById('exchange-rate-input').value);
    const wonInput = parseFloat(document.getElementById('won-input').value);
    const usdInput = parseFloat(document.getElementById('usd-input').value);
    let result;

    if (wonInput) {
        result = wonInput / exchangeRate;
        document.getElementById('usd-input').value = result.toFixed(2);
        saveHistory(`환율: ₩${wonInput} = $${result.toFixed(2)}`);
    } else if (usdInput) {
        result = usdInput * exchangeRate;
        document.getElementById('won-input').value = result.toFixed(0);
        saveHistory(`환율: $${usdInput} = ₩${result.toFixed(0)}`);
    }
}

function calculatePercentOf() {
    const totalValue = parseFloat(document.getElementById('pc-total-value').value);
    const percentageValue = parseFloat(document.getElementById('pc-percentage-value').value);
    const result = (totalValue * percentageValue) / 100;
    document.getElementById('percent-result').textContent = ` ${result}`;
    saveHistory(`${totalValue}의 ${percentageValue}%는 ${result}`);
}

function calculatePercentIs() {
    const totalValue = parseFloat(document.getElementById('pc-total-value').value);
    const value = parseFloat(document.getElementById('pc-value').value);
    const percentage = (value / totalValue) * 100;
    document.getElementById('percent-result').textContent = ` ${percentage.toFixed(2)}%`;
    saveHistory(`${value}는 ${totalValue}의 ${percentage.toFixed(2)}%입니다.`);
}

function calculateValueChange() {
    const totalValue = parseFloat(document.getElementById('pc-total-value').value);
    const changeValue = parseFloat(document.getElementById('pc-change-value').value);
    const changePercent = ((changeValue - totalValue) / totalValue) * 100;
    document.getElementById('percent-result').textContent = ` ${changePercent.toFixed(2)}%`;
    saveHistory(`${totalValue}와 ${changeValue}의 변화율은 ${changePercent.toFixed(2)}%입니다.`);
}

function calculateIncreasePercent() {
    const totalValue = parseFloat(document.getElementById('pc-total-value').value);
    const increasePercent = parseFloat(document.getElementById('pc-increase-percent').value);
    const increasedValue = totalValue * (1 + increasePercent / 100);
    document.getElementById('percent-result').textContent = ` ${increasedValue}`;
    saveHistory(`${totalValue}의 ${increasePercent}% 증가된 값은 ${increasedValue}`);
}



function pressKey(key) {
    const display = document.getElementById('calc-display');
    display.value += key;
}

function calculateResult() {
    const display = document.getElementById('calc-display');
    try {
        const result = eval(display.value);
        saveHistory(`${display.value} = ${result}`);
        display.value = result;
    } catch {
        alert('잘못된 입력입니다.');
    }
}

function clearDisplay() {
    document.getElementById('calc-display').value = '';
}

function calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById('ci-principal').value);
    const period = parseInt(document.getElementById('ci-period').value);
    const periodType = document.getElementById('ci-period-type').value;
    const rate = parseFloat(document.getElementById('ci-rate').value) / 100;

    const compoundFrequency = periodType === "months" ? 12 : 365;
    let balance = principal;
    let totalInterest = 0;
    const tableBody = document.getElementById('ci-table-body');
    tableBody.innerHTML = '';

    for (let i = 1; i <= period; i++) {
        let interest = balance * (rate / compoundFrequency);
        balance += interest;
        totalInterest += interest;
        const row = document.createElement('tr');
        const periodCell = document.createElement('td');
        const interestCell = document.createElement('td');
        const balanceCell = document.createElement('td');
        const rateCell = document.createElement('td');

        periodCell.textContent = i + (periodType === "months" ? "개월" : "일");
        interestCell.textContent = interest.toFixed(2);
        balanceCell.textContent = balance.toFixed(2);
        rateCell.textContent = ((totalInterest / balance) * 100).toFixed(2);

        row.appendChild(periodCell);
        row.appendChild(interestCell);
        row.appendChild(balanceCell);
        row.appendChild(rateCell);
        tableBody.appendChild(row);
    }

    saveHistory(`복리 계산: 원금 ₩${principal}, ${period}${periodType === "months" ? "개월" : "일"}간, 잔액 ₩${balance.toFixed(2)}`);
}

function saveHistory(operation) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.textContent = operation;
    historyList.appendChild(listItem);
}

function clearHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
}