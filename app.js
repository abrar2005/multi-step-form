import MultiStepForm from "./multi-step-form.js"

const form = new MultiStepForm('#multi-step-form', {
    buttons: true,
    // beginWith: 3
});

form.onSubmit = e => {
    const data = form.getData();

    console.log(data);
}
