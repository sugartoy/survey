// 초기 화면에서 설문 시작
document.getElementById('startSurvey').addEventListener('click', function() {
    document.getElementById('initialScreen').style.display = 'none';
    document.getElementById('surveyScreen').style.display = 'block';
    showPage(1);
});

function showPage(pageNumber) {
    let pages = document.querySelectorAll('.survey-page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(`page-${pageNumber}`).style.display = 'block';
}

function nextPage(pageNumber) {
    showPage(pageNumber);
}

// 설문 데이터를 저장
document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // 기존 데이터 가져오기
    let surveyData = JSON.parse(localStorage.getItem('surveyData')) || [];
    surveyData.push(data);

    // 로컬 스토리지에 데이터 저장
    localStorage.setItem('surveyData', JSON.stringify(surveyData));

    alert('설문조사가 완료되었습니다. 감사합니다!');
    location.reload(); // 초기 화면으로 돌아갑니다.
});

// 관리자 메뉴 버튼 클릭 시
document.getElementById('adminMenuButton').addEventListener('click', function() {
    document.getElementById('passwordPrompt').style.display = 'block';
    document.getElementById('initialScreen').style.display = 'none';
});

// 로그인 처리
function login() {
    const password = document.getElementById('adminPassword').value;
    const correctPassword = 'your_password'; // 여기서 비밀번호를 설정하세요

    if (password === correctPassword) {
        document.getElementById('passwordPrompt').style.display = 'none';
        document.getElementById('adminScreen').style.display = 'block';
        displaySurveyResults();
    } else {
        alert('비밀번호가 틀렸습니다.');
    }
}

function cancelLogin() {
    document.getElementById('passwordPrompt').style.display = 'none';
    document.getElementById('initialScreen').style.display = 'block';
}

function logout() {
    document.getElementById('adminScreen').style.display = 'none';
    document.getElementById('initialScreen').style.display = 'block';
}

// 설문 결과 표시
function displaySurveyResults() {
    const surveyData = JSON.parse(localStorage.getItem('surveyData')) || [];
    const tableBody = document.querySelector('#resultsTable tbody');

    tableBody.innerHTML = '';

    surveyData.forEach(result => {
        const row = document.createElement('tr');
        Object.values(result).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}
