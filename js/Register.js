// Rol seçimine göre uygun formu gösterir
function showForm(role) {
    // Akademik personel formunu rol 'academic' olduğunda gösterir
    document.getElementById('academicForm').style.display = (role === 'academic') ? 'block' : 'none';
    // Mezun formunu rol 'graduate' olduğunda gösterir
    document.getElementById('graduateForm').style.display = (role === 'graduate') ? 'block' : 'none';
}

// Formu doğrulama işlevi
function validateForm(role) {
    let isValid = true; // Formun geçerli olduğunu varsayar
    let errorMessage = ''; // Hata mesajlarını biriktirir

    if (role === 'academic') {
        // Akademik personel form alanlarını al
        const tcNo = document.getElementById('txtTc').value;
        const mail = document.getElementById('txtMail').value;
        const phone = document.getElementById('txtPhone').value;
        const orcid = document.getElementById('txtOrcid').value;
        const yokNo = document.getElementById('txtYokNo').value;

        // TC Kimlik No doğrulama
        if (!/^\d{11}$/.test(tcNo)) {
            errorMessage += 'TC Kimlik No 11 haneli olmalıdır.\n';
            isValid = false;
        }
        
        // Mail adresi doğrulama
        if (!/@subu\.edu\.tr$/.test(mail)) {
            errorMessage += 'Mail adresi @subu.edu.tr ile bitmelidir.\n';
            isValid = false;
        }

        // Cep telefonu doğrulama
        if (!/^\d{11}$/.test(phone)) {
            errorMessage += 'Cep telefonu 11 haneli olmalıdır.\n';
            isValid = false;
        }

        // ORCID Numarası doğrulama
        if (!/^\d{16}$/.test(orcid)) {
            errorMessage += 'ORCID Numarası 16 haneli olmalıdır.\n';
            isValid = false;
        }

        // YÖK Araştırmacı Numarası doğrulama
        if (!/^\d{6}$/.test(yokNo)) {
            errorMessage += 'YÖK Araştırmacı Numarası 6 haneli olmalıdır.\n';
            isValid = false;
        }

    } else if (role === 'graduate') {
        // Mezun form alanlarını al
        const graduateTcNo = document.getElementById('txtGraduateTc').value;
        const graduateMail = document.getElementById('txtGraduateMail').value;
        const graduatePhone = document.getElementById('txtGraduatePhone').value;

        // TC Kimlik No doğrulama
        if (!/^\d{11}$/.test(graduateTcNo)) {
            errorMessage += 'TC Kimlik No 11 haneli olmalıdır.\n';
            isValid = false;
        }
        
        // Mail adresi doğrulama
        if (!/@subu\.edu\.tr$/.test(graduateMail)) {
            errorMessage += 'Mail adresi @subu.edu.tr ile bitmelidir.\n';
            isValid = false;
        }

        // Cep telefonu doğrulama
        if (!/^\d{11}$/.test(graduatePhone)) {
            errorMessage += 'Cep telefonu 11 haneli olmalıdır.\n';
            isValid = false;
        }
    }

    // Hatalar varsa kullanıcıya bildir
    if (!isValid) {
        alert(errorMessage);
    }
    return isValid; // Form geçerli mi değil mi döndür
}

// Kullanıcı kaydı işlevi
function registerUser() {
    // Seçilen rolü al
    const role = document.querySelector('input[name="role"]:checked').value;

    // Form geçerli değilse kayıt işlemini durdur
    if (!validateForm(role)) {
        return;
    }

    let userData;

    // Akademik personel rolü için kullanıcı verilerini oluştur
    if (role === 'academic') {
        userData = {
            tcNo: document.getElementById('txtTc').value,
            adSoyad: document.getElementById('txtName').value,
            mail: document.getElementById('txtMail').value,
            phone: document.getElementById('txtPhone').value,
            institutionalNo: document.getElementById('txtInstitutionalNo').value,
            faculty: document.getElementById('txtFaculty').value,
            department: document.getElementById('txtDepartment').value,
            userType: 'Akademik Personel',
            position: document.getElementById('ddlPosition').value,
            orcid: document.getElementById('txtOrcid').value,
            yokNo: document.getElementById('txtYokNo').value,
            password: document.getElementById('txtTc').value // TC Kimlik No'yu parola olarak kullanıyoruz
        };
    } else if (role === 'graduate') {
        // Mezun rolü için kullanıcı verilerini oluştur
        userData = {
            tcNo: document.getElementById('txtGraduateTc').value,
            studentNo: document.getElementById('txtStudentNo').value,
            adSoyad: document.getElementById('txtGraduateName').value,
            mail: document.getElementById('txtGraduateMail').value,
            phone: document.getElementById('txtGraduatePhone').value,
            faculty: document.getElementById('txtGraduateFaculty').value,
            department: document.getElementById('txtGraduateDepartment').value,
            userType: 'Mezun',
            position: 'N/A', // Mezunlar için pozisyon 'N/A'
            password: document.getElementById('txtGraduateTc').value // TC Kimlik No'yu parola olarak kullanıyoruz
        };
    }

    // Kullanıcı verilerini localStorage'da sakla
    localStorage.setItem('userData', JSON.stringify(userData));

    // Başarılı kayıt sonrası giriş sayfasına yönlendir
    window.location.href = 'login.html';
}
