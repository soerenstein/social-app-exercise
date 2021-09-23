module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Nutzername erforderlich'
  }
  if (email.trim() === '') {
    errors.email = 'E-Mail erforderlich'
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = 'E-Mail muss eine gültige E-Mail-Adresse sein'
    }
  }
  if (password === '') {
    errors.password = 'Passwort erforderlich'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwort stimmt nicht überein'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Nutzername erforderlich'
  }
  if (password.trim() === '') {
    errors.password = 'Passwort erforderlich'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
