function Validation(options) {
    const formEle = document.getElementById(options.form);

    options.rules.forEach(function (rule) {
        const inputEle = formEle.querySelector(rule.selector);
        const inputEles = formEle.querySelectorAll(rule.selector);

        inputEles.forEach(ele => {
            ele.addEventListener("change", () => {
                const formMessageEle = ele.parentElement.querySelector(options.formMessage);
                formMessageEle.innerText = "";
            });
        });

        if (inputEle) {

            if(inputEle.type === "checkbox"){
                
            }

            inputEle.addEventListener("blur", () => {
                validate(inputEle, rule)
            });

            inputEle.addEventListener("input", () => {
                const formMessageEle = inputEle.parentElement.querySelector(options.formMessage);
                formMessageEle.classList.remove("error__message");
                inputEle.classList.remove("error__input");
                formMessageEle.innerText = "";
            });

        };

    });

    function validate(inputEle, rule) {
        const formMessageEle = inputEle.parentElement.querySelector(options.formMessage)
        let errorMessage = rule.check(inputEle.value);

        if (errorMessage) {
            formMessageEle.innerText = `${errorMessage}`;
            formMessageEle.classList.add("error__message");
            inputEle.classList.add("error__input");
            return false;
        } else {
            formMessageEle.innerText = "";
            return true;
        }
    }

    return {
        validate,
    }

}

Validation.checkRequired = function (selector) {
    return {
        selector: `input[name='${selector}']`,
        check: function (value) {
            return value.trim() ? undefined : "Không được bỏ trống !";
        }
    };
}

Validation.hasSpecialCharacters = function (selector) {
    return {
        selector: `input[name='${selector}']`,
        check: function (value) {

            if (value.trim() === "") {
                return "Không được bỏ trống !";
            } else if(!(value.trim().length >= 10)){
                return "Độ dài ít nhất 10 ký tự"
            }

            let regex = /.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/;
            return regex.test(value) ? "Không được chứa ký tự đặc biệt !" : undefined;

        }
    }
}

Validation.checkEmail = function (selector) {
    return {
        selector: `input[name='${selector}']`,
        check: function (value) {

            if (value.trim() === "") {
                return "Không được bỏ trống !";
            }

            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Sai cú pháp Email !";

        }
    }
}

Validation.checkPass = function (selector) {
    return {
        selector: `input[name="${selector}"]`,
        check: function (value) {
            let errorMessage;

            if (value.trim() === "") {
                errorMessage = "Mật khẩu không được bỏ trống !"
            } else if (value.trim().length < 8) {
                errorMessage = "Mật khẩu phải có ít nhất 8 ký tự.";
            } else if (!/[A-Z]/.test(value)) {
                errorMessage = "Mật khẩu phải chứa ít nhất 1 ký tự viết hoa.";
            } else if (!/[0-9]/.test(value)) {
                errorMessage = "Mật khẩu phải chứa ít nhất 1 số.";
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                errorMessage = "Mật khẩu không được chứa ký tự đặc biệt.";
            }

            return errorMessage;
        }
    }
}

Validation.confirmPass = function (selector, originalPasswordSelector) {
    return {
        selector: `input[name='${selector}']`,
        check: function (value) {
            const originalPassword = document.querySelector(originalPasswordSelector).value;
            return value === originalPassword ? undefined : "Mật khẩu xác nhận không chính xác";
        },
    };
};

Validation.checkSDT = function (selector) {
    return {
        selector: `input[name='${selector}']`,
        check: function (value) {

            if (value.trim() === "") {
                return "Số điện thoại không được bỏ trống";
            }

            const regex = /^(03|05|07|08|09)+([0-9]{8})$/;
            return regex.test(value) ? undefined : "Số điện thoại không hợp lệ !";

        }
    }
}

Validation.checkBienSoXe = function (selector) {
    return {
        selector: `input[name="${selector}"]`,
        check: function (value) {

            if (value.trim() === "") {
                return "Không được bỏ trống !";
            }

            const regex = /^\d{2}-(?:[A-HJ-NP-TV-Z][A-HJ-NP-TV-Z0-9])[ ]\d{4}$|^\d{2}-(?:[A-HJ-NP-TV-Z][A-HJ-NP-TV-Z0-9])[ ]\d{3}\.\d{2}$/;
            return regex.test(value) ? undefined : "Biển số không hợp lệ !"

        }
    }
}

Validation.checkRequiredTextArea = function (selector) {
    return {
        selector: `textarea[name='${selector}']`,
        check: function (value) {

            return value.trim() ? undefined : "Không được bỏ trống";

        }
    }
}

Validation.resetForm = function (formSelector) {
    const formEle = document.querySelector(formSelector);
    const inputEles = formEle.querySelectorAll("input, textarea");

    inputEles.forEach((ele) => {
        if (ele.type === "radio" || ele.type === "checkbox") {
            ele.checked = false; // reset radio và checkbox
        } else {
            ele.value = ""; // reset các input element khác
        }
        ele.classList.remove("error__input");
        const messageElement = ele.parentElement.querySelector(".form-message");
        if (messageElement) {
            messageElement.innerText = "";
        }
    });
};

function checkRequiredRadioGroup(selector) {
    return {
        selector: `input[name='${selector}']`,
        check: function () {
            const radioGroupEles = document.querySelectorAll(`input[name='${selector}']`);
            let isChecked = false;
            radioGroupEles.forEach(function (radio) {
                if (radio.checked) {
                    isChecked = true;
                }
            });
            if (!isChecked) {
                return "Không được bỏ trống";
            }
            return null;
        }
    };
}

function getValuesForm(options) {
    console.log(options.rules);
    const formEle = document.getElementById(options.form);

    options.rules.forEach(rule => {
        const inputEle = formEle.querySelector(rule.selector);

        if (inputEle.type === "radio" || inputEle.type === "checkbox") {
            const radioInputs = formEle.querySelectorAll(rule.selector);

            radioInputs.forEach(ele => {
                if (ele.checked) {
                    console.log(`${ele.name}: ` + ele.value);
                }
            });

        } else {
            console.log(`${inputEle.name}: ${inputEle.value.trim()}`);
        }
    });

}
//------------------------------------------------------------------------------------------------------------------------------------------------------------
// function getValuesForm(options) {
//     const formEle = document.getElementById(options.form);
//     let message = '';

//     options.rules.forEach(rule => {
//         const inputEle = formEle.querySelector(rule.selector);

//         if (inputEle.type === "radio" || inputEle.type === "checkbox") {
//             const radioInputs = formEle.querySelectorAll(rule.selector);

//             radioInputs.forEach(ele => {
//                 if (ele.checked) {
//                     message += ele.value + '\n';
//                 }
//             });

//         } else {
//             message += `${inputEle.name}: ${inputEle.value.trim()}\n`;
//         }
//     });

//     alert(message);
// }
//------------------------------------------------------------------------------------------------------------------------------------------------------------
function enabledInput(selector, disabled) {

    const isChecked = document.querySelector(`input[name="${selector}"]`);
    const inputDisabled = document.querySelector(`input[name="${disabled}"]`);
    inputDisabled.disabled = true;

    isChecked.addEventListener("change", () => {
        if (isChecked.checked) {
            inputDisabled.disabled = false;
        } else {
            inputDisabled.disabled = true;
            inputDisabled.value = "";
        }
    });

    return {
        selector: `input[name="${selector}"]`,
        check: function (value) {
        }
    }
}

function disabledInput(selector, enabled){
    const isChecked = document.querySelector(`input[name="${selector}"]`);
    const inputEnabled = document.querySelector(`input[name="${enabled}"]`);
    inputEnabled.disabled = false;

    isChecked.addEventListener("change", () => {
        if(isChecked.checked){
            inputEnabled.disabled = true;
            inputEnabled.value = "";
        } else {
            inputEnabled.disabled = false;
        }
    });

    return {
        selector: `input[name="${selector}"]`,
        check: function (value) {
        }
    }
}

Validation.formattedLengthNumber = function (selector, length) {
    return {
        selector: `input[name='${selector}']`,
        check: function (value) {

            const input = document.querySelector(`input[name="${selector}"]`);
            if(input.disabled){
                return
            }

            if (value.trim() === "") {
                return "Không được để trống !";
            } else if (isNaN(value)) {
                return "Vui lòng nhập số !";
            } else {
                let regex = new RegExp(`^\\d{${length}}$`);
                return regex.test(value) ? undefined : `Độ dài số phải là ${length}`;
            }
        }
    }
}

Validation.isAge = function (selector, maxAge) {
    return {
        selector: `input[name="${selector}"]`,
        check: function (value) {

            if (value.trim() === "") {
                return "Không được bỏ trống !";
            } else {
                let regex = /^(?:1[0-9]{2}|[1-9][0-9]|[1-9])$/;

                if (!(regex.test(value))) {
                    return "Tuổi không hợp lệ !"
                } else if (value < maxAge) {
                    return "Chưa đủ tuổi !"
                } else {
                    return undefined;
                }
            }
        }
    }
}

Validation.checkDate = function (selector) {
    return {
        selector: `input[name="${selector}"]`,
        check: function (value) {

            const selectedDate = new Date(value);
            const today = new Date();

            if (!value) {
                return "Vui lòng nhập ngày !";
            }

            if (selectedDate > today) {
                return 'Vui lòng chọn ngày không nhỏ hơn ngày hiện tại';
            }

            return undefined;
        }
    }
}

// function checkBoxRequired(selector) {
//     return {
//         selector: `input[name="${selector}"]`,
//         check: function () {
//             const checkboxes = document.querySelectorAll(this.selector);
//             let isChecked = false;

//             checkboxes.forEach(function (checkbox) {
//                 if (checkbox.checked) {
//                     isChecked = true;
//                 }
//             });

//             if (!isChecked) {
//                 return 'Vui lòng chọn ít nhất 1 checkbox';
//             }
//         }
//     }
// }