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
    const principal = parseFloat(document.getElementById('dM').value.replace(/,/g, ''));
    const period = parseInt(document.getElementById('dC').value, 10);
    const periodType = document.getElementById('cC').value; // "d" for days, "m" for months
    const dailyRate = parseFloat(document.getElementById('dR').value) / 100;

    let balance = principal;
    let totalInterest = 0;
    const tableBody = document.getElementById('content1');
    tableBody.innerHTML = '';

    let tableContent = '<table><tr><th>기 간</th><th>총 금 액</th><th>수 익</th><th>수 익 률</th></tr>';

    for (let i = 1; i <= period; i++) {
        const previousBalance = balance;
        balance *= (1 + dailyRate); // Apply compounded daily or monthly interest

        const interestEarned = balance - previousBalance;
        totalInterest += interestEarned;

        // Create and append row string
        const periodLabel = `${i} ${(periodType === "m" ? "개월" : "일")}`;
        const balanceText = `₩${Math.round(balance).toLocaleString()}`;
        const interestText = `₩${Math.round(interestEarned).toLocaleString()}`;
        const interestRateText = `${((interestEarned / principal) * 100).toFixed(2)}%`;

        tableContent += `<tr><td>${periodLabel}</td><td>${balanceText}</td><td>${interestText}</td><td>${interestRateText}</td></tr>`;
    }

    tableContent += '</table>';
    tableBody.innerHTML = tableContent;

    const pageTitle = `복리계산기: 투자원금 ₩${principal.toLocaleString()}원, 기간 ${period}${periodType === "m" ? "개월" : "일"}, 최종 잔액 ₩${Math.round(balance).toLocaleString()}`;
    document.title = pageTitle;

    // Optionally, update browser history if needed
    history.pushState(null, pageTitle, `?dM=${principal}&dC=${period}&cC=${periodType}&dR=${dailyRate * 100}`);
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
