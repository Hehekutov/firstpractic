const modal = document.getElementById('modal');
const open = document.getElementById('openModal');
const close = document.getElementById('closeModal');
let last = null;
function show() {
    last = document.activeElement; modal.hidden = false;
    modal.querySelector('input,select,textarea,button')?.focus();
}
function hide() { modal.hidden = true; last?.focus(); }
open.addEventListener('click', show);
close.addEventListener('click', hide);
modal.addEventListener('click', (e) => {
    if (e.target.dataset.close !==
        undefined) hide();
});
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
    // 1) Сброс кастомных сообщений
    [...form.elements].forEach(el => el.setCustomValidity?.(''));
    // 2) Проверка встроенных ограничений
    if (!form.checkValidity()) {
        e.preventDefault();
        // Пример: таргетированное сообщение
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, напримерname@example.com');
}
        form.reportValidity(); // показать браузерные подсказки
        // A11y: подсветка проблемных полей
        [...form.elements].forEach(el => {
            if (el.willValidate) el.toggleAttribute('aria-invalid',
                !el.checkValidity());
        });
        return;
    }
    // 3) Успешная «отправка» (без сервера)
    e.preventDefault();
    // Если форма внутри <dialog>, закрываем окно:
    document.getElementById('contactDialog')?.close('success');
    form.reset();
});