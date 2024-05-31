const getOnlyDigits = (value) => {
    const formattedValue = value.replace(/\D/g, '')
    return formattedValue
}

const getStringWithoutDigits = (value) => {
    const formattedValue = value.replace(/\d/g, '')
    return formattedValue
}

const trimStringsInArray = (arr) => {
    return arr.map(item => typeof item === 'string' ? item.trim() : item);
  };

const formatPhoneNumberDisplay = (phonenumber) => {
    let formattedValue = '';
    for(let i=0; i < phonenumber.length; i++){
        if(i == 2 && phonenumber.substring(0,2) === "01"){
            formattedValue += '/';
        }else if(i == 3 && phonenumber.substring(0,2) !== "01"){
            formattedValue += '/';
        }else if(i == 6){
            formattedValue += '-';
        }
        formattedValue += phonenumber[i];
    }
    return formattedValue;
}

const getFormattedTelSufix = (inputValue) => {
    let formattedValue = '';
    for (let i = 0; i < inputValue.length; i++) {
        if (i == 3) {
            formattedValue += '-';
        }
        formattedValue += inputValue[i];
    }
    return formattedValue;
}


const getFormatedDateInput = (inputValue) => {
    let formatedValue = "" 
    if(inputValue !== ""){
        let parts = inputValue.split("-");
        formatedValue = parts[2] + "." + parts[1] + "." + parts[0] + ".";
    }
    return formatedValue;
}

const getUnformatedDateInput = (inputValue) => {
    let formatedValue = "" 
    if(inputValue !== ""){
        let parts = inputValue.split(".");
        formatedValue = parts[2] + "-" + parts[1] + "-" + parts[0];
    }
    return formatedValue;
}

export {getOnlyDigits, getStringWithoutDigits, getFormattedTelSufix, formatPhoneNumberDisplay, getFormatedDateInput, getUnformatedDateInput, trimStringsInArray}