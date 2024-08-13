document.addEventListener('DOMContentLoaded', function() {
    const formsContainer = document.getElementById('formsContainer');
    
    // loggedInUser nesnesinden pozisyon bilgisini çekin
    const loggedInUser = JSON.parse(localStorage.getItem('userData'));
    const loggedInUserPosition = loggedInUser ? loggedInUser.position : null;

    if (!loggedInUserPosition) {
        formsContainer.innerHTML = '<p>Kullanıcı pozisyonu bulunamadı. Lütfen giriş yapın.</p>';
        return;
    }

    console.log('Logged In User Position:', loggedInUserPosition);

    // Tüm formları al
    const forms = JSON.parse(localStorage.getItem('forms')) || [];
    console.log('Forms:', forms);

    if (forms.length > 0) {
        forms.forEach(form => {
            const formDiv = document.createElement('div');
            formDiv.classList.add('form');

            // "Formu Düzenle" butonunu yalnızca Dekan, Dekan Yardımcısı ve öğretim üyeleri için göster
            const editButton = (loggedInUserPosition === 'Dekan' || loggedInUserPosition === 'Dekan Yardımcısı' || loggedInUserPosition === 'Ogretim Uyesi') 
                ? `<button onclick="editForm('${form.formId}')">Formu Düzenle</button>`
                : '';

            formDiv.innerHTML = `
                <h3>Form ID: ${form.formId}</h3>
                <p>Form Adı: ${form.formName || 'Belirtilmemiş'}</p>
                <p>Oluşturan: ${form.createdBy || 'Belirtilmemiş'}</p>
                <p>Oluşturulma Tarihi: ${new Date(form.createdDate).toLocaleDateString()}</p>
                <p>Başlangıç Tarihi: ${form.startDate ? new Date(form.startDate).toLocaleDateString() : 'Belirtilmemiş'}</p>
                <p>Bitiş Tarihi: ${form.endDate ? new Date(form.endDate).toLocaleDateString() : 'Belirtilmemiş'}</p>
                <p>Status: ${form.status}</p>
                <div>Mesajlar:<br>
                    ${form.formFields ? form.formFields.map(field => {
                        const fieldTitle = field.title || 'Başlık Belirtilmemiş';
                        const fieldValue = Array.isArray(field.value) ? field.value.join('<br>') : field.value;
                        return `<strong>${fieldTitle}:</strong> ${fieldValue}`;
                    }).join('<br><br>') : 'Belirtilmemiş'}
                </div>
                ${editButton}
            `;
            formsContainer.appendChild(formDiv);
        });
    } else {
        formsContainer.innerHTML = '<p>Form bulunmamaktadır.</p>';
    }
});

function editForm(formId) {
    window.location.href = `FormEdit.html?formId=${formId}`;
}
