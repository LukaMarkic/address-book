import { getFormatedDateInput, getOnlyDigits } from "./valueFormatter"

const getInputErorrs = (formElements) => {
    const errors = {}

    let addressValue = ''
    let zipCodeValue = ''
    let addressElement
    let zipElement

    formElements.forEach(element => {
      if (element.name === 'address') {
        addressValue = element.value
        addressElement = element
      }
      if (element.name === 'zip') {
        zipElement = element
        zipCodeValue = element.value
      }

      if (element.required && !element.value) {
        errors[element.name] = 'Obavezno polje'
      } else if (element.name === 'email' && element.value && !validateEmail(element.value)) {
        errors[element.name] = 'Neispravna email adresa'
      }

    })

    if ((addressValue && !zipCodeValue)) {
      errors['zip'] = 'Obavezno polje'
    } else if (!addressValue && zipCodeValue) {
      errors['address'] = 'Obavezno polje'
    } else {
      delete errors['zip']
      delete errors['address']
    }
    return errors
}

const getContactInfoDataFromForm = (formElements) => {
    const formData = formElements.reduce((acc, element) => {
      if (element.name) {
        acc[element.name] = element.value
      }
      return acc
    }, {})
    formData["phonenumber"] = ""
    if (formData["tel-prefix"] && formData["tel-sufix"]) formData["phonenumber"] = formData["tel-prefix"] + getOnlyDigits(formData["tel-sufix"])
    delete formData["tel-prefix"]
    delete formData["tel-sufix"]
    formData["birthdate"] = getFormatedDateInput(formData["birthdate"])
    return formData
  }


const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};


export {validateEmail, getInputErorrs, getContactInfoDataFromForm}