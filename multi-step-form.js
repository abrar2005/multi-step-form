export default class MultiStepForm {
    #formElement;
    #stepsName;
    #buttons;
    #steps;
    #currentStep;

    constructor(element, options = { stepsName, buttons, beginWith }) {
        if (typeof options !== 'object') {
            throw new Error("parameter 'options' needs to be of type Object.");
        }

        this.#formElement = element;
        this.#stepsName = options.stepsName || '.form-step';
        this.#buttons = options.buttons || false;
        this.#steps = document.querySelector(this.#formElement).querySelectorAll(this.#stepsName);
        this.#currentStep = options.beginWith - 1 || 0;

        this.#initializeForm();
    }

    getElement() {
        return this.#stepsName;
    }

    immitButtons() {
        //* Maybe for later. add buttons dynamicly.
        // if (this.#buttons == false) return 'Enable buttons in the class before adding.';

        // this.#steps.forEach(step => {
        //     let submitBtn = document.createElement('button')
        // });
    }

    #initializeForm() {
        this.#steps.forEach((step, index) => {
            // Remove all but the first form.        
            if (index != this.#currentStep) {
                step.style.display = 'none';
            }

            // Add event listeners on the buttons
            if (step.querySelector('[data-form-next]')) {
                step.querySelector('[data-form-next]').addEventListener('click', e => {
                    e.preventDefault();
                    this.#onNext(index);
                });
            }
            if (step.querySelector('[data-form-prev]')) {
                step.querySelector('[data-form-prev]').addEventListener('click', e => {
                    e.preventDefault();
                    this.#onPrev(index);
                });
            }
            if (step.querySelector('[data-form-submit]')) {
                step.querySelector('[data-form-submit]').addEventListener('click', e => {
                    e.preventDefault();
                    this.onSubmit(e);
                });
            }
        });
    }

    #onNext() {
        if (this.#currentStep + 1 === this.#steps.length) return console.error('No more steps.');

        this.#steps[this.#currentStep].style.display = 'none';
        this.#currentStep++;
        this.#steps[this.#currentStep].style.display = 'block';
    }

    #onPrev() {
        if (this.#currentStep - 1 < 0) return console.error('No more steps.');

        this.#steps[this.#currentStep].style.display = 'none';
        this.#currentStep--;
        this.#steps[this.#currentStep].style.display = 'block';
    }

    onSubmit() {
        document.querySelector(this.#formElement).submit();
    }

    getData() {
        const formData = {};

        this.#steps.forEach((step, index) => {
            const inputs = step.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                const name = input.name;
                const type = input.type;
                let value;

                if (type === 'checkbox') {
                    value = input.checked ? input.value : '';
                } else if (type === 'radio') {
                    if (input.checked) {
                        value = input.value;
                    } else {
                        value = formData[name] || '';
                    }
                } else {
                    value = input.value;
                }

                formData[name] = value;
            });
        });

        return formData;
    }
}