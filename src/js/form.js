import { getRefs } from "./getRefs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import storage from "./storage";
const refs = getRefs();

refs.form.addEventListener('submit', handleSubmit);
unitForm();

function handleSubmit(e) {
    e.preventDefault();
    const { name, email, message } = e.target.elements;
    if (name.value === "" || message.value === "" || email.value === "") {
        Notify.failure('Заповніть всі поля');
        return;
    };
    const formData = new FormData(refs.form);

    const userData = {};
    formData.forEach((value, name) => { userData[name] = value });

    e.target.reset();

    Notify.success('успішно');
};

refs.form.addEventListener("input", handleInput);

const userData = {};

function handleInput(e) {
    let savedData = storage.load('form-input-data');
    if (savedData) {
        savedData[e.target.name] = e.target.value;
    } else {
        savedData = {};
        savedData[e.target.name] = e.target.value;
    }
    storage.save('form-input-data', savedData);
    
};

function unitForm() {
    const savedData = storage.load('form-input-data');
    if (savedData) {
        Object.entries(savedData).forEach(([name, value]) => { refs.form.elements[name].value = value });
    }
};
