function createForm() {
    const formId = document.getElementById('txtFormId').value;
    const position = document.getElementById('selectPosition').value;

    if (!formId || !position) {
        alert('Lütfen tüm alanları doldurunuz.');
        return;
    }

    const formData = {
        formId,
        position,
        createdDate: new Date().toISOString(),
        status: 'draft'
    };

    let forms = JSON.parse(localStorage.getItem('forms')) || [];
    forms.push(formData);
    localStorage.setItem('forms', JSON.stringify(forms));

    console.log('Forms after creation:', JSON.parse(localStorage.getItem('forms'))); // Yeni form eklenip eklenmediğini kontrol et

    alert('Form başarıyla oluşturuldu.');
    document.getElementById('createForm').reset();
}
