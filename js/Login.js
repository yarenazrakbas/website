function login() {
    // Kullanıcı bilgilerini al
    var userName = document.getElementById('UserName').value;
    var password = document.getElementById('Password').value;
    // Kayıtlı kullanıcı verilerini localStorage'dan al
    var userData = JSON.parse(localStorage.getItem('userData'));

    // Kullanıcı adı ve parola kontrolü
    if (userData && userName === userData.tcNo && password === userData.tcNo) {
        // Kullanıcı bilgilerini yerel depolamada sakla
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
        // Panel.html sayfasına yönlendir
        window.location.href = 'Panel.html';
    } else {
        // Hata mesajını göster
        document.getElementById('ErrorMessage').style.display = 'block';
        document.getElementById('FailureText').innerText = 'TC Kimlik Numarası veya Parola Hatalı';
    }
}
