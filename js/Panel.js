document.addEventListener('DOMContentLoaded', function() {
    var loggedInUser = JSON.parse(localStorage.getItem('userData'));

    if (loggedInUser) {
        document.getElementById('lblTcNo').innerText = loggedInUser.tcNo || 'Bilgi Yok';
        document.getElementById('lblAdSoyad').innerText = loggedInUser.adSoyad || 'Bilgi Yok';
        document.getElementById('lblBolum').innerText = loggedInUser.department || 'Bilgi Yok';
        document.getElementById('lblUserType').innerText = loggedInUser.userType || 'Bilgi Yok';
        document.getElementById('lblGorev').innerText = loggedInUser.position || 'Bilgi Yok';

        // Butonları gizle/göster
        const createFormBtn = document.getElementById('createFormBtn');
        const viewFormsBtn = document.getElementById('viewFormsBtn');
        const viewFormsBtn2 = document.getElementById('viewFormsBtn2');

        // Kalite Yöneticisi 
        if (loggedInUser.position === 'Kalite Yöneticisi' ) {
            createFormBtn.style.display = 'block';
            viewFormsBtn.style.display = 'none';
            viewFormsBtn2.style.display = 'block';
        } 
        //Öğretim Üyesi için
        else if (loggedInUser.position === 'Ogretim Uyesi') {
            createFormBtn.style.display = 'none';
            viewFormsBtn.style.display = 'block';
            viewFormsBtn2.style.display = 'none';
        }
        // Akademik Personel için
        else if (loggedInUser.userType === 'Akademik Personel') {
            createFormBtn.style.display = 'none';
            viewFormsBtn.style.display = 'block';
            viewFormsBtn2.style.display = 'none';
        } 
        // Mezun için
        else if (loggedInUser.userType === 'Mezun') {
            createFormBtn.style.display = 'none';
            viewFormsBtn.style.display = 'none';
            viewFormsBtn2.style.display = 'block';
        } 
        // Diğer kullanıcı türleri için butonları gizle
        else {
            createFormBtn.style.display = 'none';
            viewFormsBtn.style.display = 'none';
            viewFormsBtn2.style.display = 'none';
        }

    } else {
        window.location.href = 'login.html'; // Kullanıcı giriş yapmamışsa geri dön
    }
});

function redirectToFormCreation() {
    window.location.href = 'FormCreate.html';
}

function redirectToFormList() {
    window.location.href = 'FormReview.html';
}


function FormList() {
    window.location.href = 'FormsView.html';
}
