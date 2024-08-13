let selectedType = null;

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const formId = urlParams.get('formId');
    
    const forms = JSON.parse(localStorage.getItem('forms')) || [];
    const form = forms.find(f => f.formId === formId);

    if (form) {
        document.getElementById('txtFormName').value = form.formName || '';
        document.getElementById('txtCreatedBy').value = form.createdBy || '';
        document.getElementById('startDate').value = form.startDate || '';
        document.getElementById('endDate').value = form.endDate || '';
        
        // Mevcut form alanlarını yükle
        const formFieldsContainer = document.getElementById('formFieldsContainer');
        if (form.formFields) {
            form.formFields.forEach(field => {
                const fieldElement = createFieldElement(field.type, field.dataType, field.value, field.placeholder, field.title);
                if (fieldElement) {
                    formFieldsContainer.appendChild(fieldElement);
                }
            });
        }
    }
});

function openTypeModal() {
    document.getElementById('typeModal').style.display = "block";
}

function closeTypeModal() {
    document.getElementById('typeModal').style.display = "none";
}

function chooseType(type) {
    selectedType = type;
    closeTypeModal();
    openDataTypeModal();
}

function openDataTypeModal() {
    document.getElementById('dataTypeModal').style.display = "block";
}

function closeDataTypeModal() {
    document.getElementById('dataTypeModal').style.display = "none";
}

function addField(dataType) {
    const placeholder = prompt('Bu alan için placeholder metnini girin:');
    const title = prompt('Bu alan için başlık metnini girin:');
    const container = document.getElementById('formFieldsContainer');
    const fieldElement = createFieldElement(selectedType, dataType, '', placeholder, title);
    if (fieldElement) {
        container.appendChild(fieldElement);
    }
    closeDataTypeModal();
}

function createFieldElement(type, dataType, value = '', placeholder = '', title = '') {
    let element;

    if (type === 'input' || type === 'textbox') {
        element = document.createElement('div');
        element.className = 'input-container';
        
        const label = document.createElement('label');
        label.textContent = title || 'Başlık'; // Başlık ayarlandı
        element.appendChild(label);

        const input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        input.placeholder = placeholder || 'Metin Giriniz';
        element.appendChild(input);
    } else if (type === 'select' || type === 'selectbox') {
        element = document.createElement('div');
        element.className = 'selectbox-container';

        const label = document.createElement('label');
        label.textContent = title || 'Başlık'; // Başlık ayarlandı
        element.appendChild(label);

        const select = document.createElement('select');
        select.className = 'selectbox';

        if (Array.isArray(value) && value.length > 0) {
            value.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.text = opt;
                select.appendChild(option);
            });
        } else {
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.text = 'Seçenek Giriniz';
            select.appendChild(defaultOption);
        }

        element.appendChild(select);

        const addOptionBtn = document.createElement('button');
        addOptionBtn.type = 'button';
        addOptionBtn.textContent = 'Seçenek Ekle';
        addOptionBtn.onclick = function() {
            const newOption = prompt('Yeni seçenek girin:');
            if (newOption) {
                const option = document.createElement('option');
                option.value = newOption;
                option.text = newOption;
                select.appendChild(option);
            }
        };

        element.appendChild(addOptionBtn);
    } else {
        console.log('Bilinmeyen alan türü:', type);
        return null;
    }

    if (element) {
        element.className += ' message-field';
        element.setAttribute('data-type', dataType);
        element.setAttribute('data-title', title); // Başlık bilgisi eklendi
    }
    
    return element;
}
function saveForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const formId = urlParams.get('formId');

    const formName = document.getElementById('txtFormName')?.value;
    const createdBy = document.getElementById('txtCreatedBy')?.value;
    const startDate = document.getElementById('startDate')?.value;
    const endDate = document.getElementById('endDate')?.value;

    if (!formName || !createdBy || !startDate || !endDate) {
        alert('Lütfen form adı, oluşturan, başlangıç tarihi ve bitiş tarihini doldurunuz.');
        return;
    }

    const fields = [];
    let validationError = false;

    document.querySelectorAll('#formFieldsContainer .message-field').forEach(field => {
        const fieldType = field.querySelector('input') ? 'textbox' : 'selectbox';
        const dataType = field.getAttribute('data-type');
        const title = field.getAttribute('data-title');
        let value;

        if (fieldType === 'selectbox') {
            const selectedOption = field.querySelector('select').value;
            value = [selectedOption];
        } else {
            value = [field.querySelector('input').value.trim()];
        }

        value.forEach(val => {
            if (dataType === 'int' && isNaN(parseInt(val))) {
                alert('Hata: "' + val + '" geçerli bir tam sayı (int) değil.');
                validationError = true;
            } else if (dataType === 'float' && isNaN(parseFloat(val))) {
                alert('Hata: "' + val + '" geçerli bir ondalık sayı (float) değil.');
                validationError = true;
            } else if (dataType === 'boolean' && (val.toLowerCase() !== 'true' && val.toLowerCase() !== 'false')) {
                alert('Hata: "' + val + '" geçerli bir doğru/yanlış (boolean) değeri değil.');
                validationError = true;
            }
        });

        if (!validationError) {
            fields.push({
                type: fieldType,
                dataType: dataType,
                value: value,
                title: title,
            });
        }
    });

    if (validationError) {
        return;
    }

    let forms = JSON.parse(localStorage.getItem('forms')) || [];
    const formIndex = forms.findIndex(f => f.formId === formId);

    if (formIndex !== -1) {
        forms[formIndex].formName = formName;
        forms[formIndex].createdBy = createdBy;
        forms[formIndex].startDate = startDate;
        forms[formIndex].endDate = endDate;
        forms[formIndex].formFields = fields;
        forms[formIndex].status = 'published';
        localStorage.setItem('forms', JSON.stringify(forms));

        // Formu .txt dosyası olarak kaydet
        saveFormAsTxt(forms[formIndex]);

        alert('Form başarıyla kaydedildi ve yayınlandı.');
        window.location.href = 'FormReview.html';
    } else {
        alert('Form bulunamadı.');
    }
}

function saveFormAsTxt(form) {
    const textContent = `
    Form Adı: ${form.formName}
    Oluşturan: ${form.createdBy}
    Başlangıç Tarihi: ${form.startDate}
    Bitiş Tarihi: ${form.endDate}

    Alanlar:
    ${form.formFields.map(field => {
        return `
        Tip: ${field.type}
        Veri Türü: ${field.dataType}
        Başlık: ${field.title}
        Değer: ${field.value.join(', ')}
        `;
    }).join('\n')}
    `;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form-${form.formId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
