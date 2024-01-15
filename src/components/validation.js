function enableValidation(validationConfig) {
  console.log('enable validation', validationConfig);
}

function clearValidation(profileForm, validationConfig) {
  console.log('clear validtion', profileForm, validationConfig);
}

function validationForm(evt) {
  console.log(evt);
}

export function inputValidtion(evt) {
  console.log(evt.target.validity);
}
