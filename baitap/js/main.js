const validatorOptions = {
    form: "form",
    formMessage: ".form-message",

    rules: [

        Validation.checkEmail("userName"),
        Validation.checkRequired("pass"),
        // Validation.confirmPass("confirmPass", "input[name='pass']"),
        // Validation.checkSDT("phoneNumber"),
        // checkRequiredRadioGroup("type"),
        // Validation.isAge("age", 18),
        // Validation.formattedLengthNumber("cccd", 8),
        // Validation.hasSpecialCharacters("fullName"),
        // Validation.checkBienSoXe("bienSo"),
        // Validation.checkEmail("email"),
        // Validation.checkPass("pass"),
        // Validation.confirmPass("confirmPass", "input[name='pass']"),
        // Validation.checkSDT("sdt"),
        // Validation.checkRequiredTextArea("ghiChu"),
        // checkRequiredRadioGroup("gender"),
        // enabledInput("isChecked", "idMonHoc"),
        // Validation.checkDate("date"),
        // checkBoxRequired("hobbies")
    ],

};

const validator = new Validation(validatorOptions);

function validateForm(event) {
    event.preventDefault()

    let isValid = true;
    validatorOptions.rules.forEach(rule => {
        const inputEle = document.querySelector(rule.selector);

        if(!validator.validate(inputEle, rule)){
            isValid = false; // đổi giá trị cờ là sai nếu có rule không hợp lệ
            return; // ngừng vòng lặp
        }

    });

    if (isValid) {
        getValuesForm(validatorOptions);
    }
}