const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../util/validators')
const User = require('../../models/User')

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  )
}
module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password)

      if (!valid) {
        throw new UserInputError('Error', { errors })
      }

      const user = await User.findOne({ username })

      if (!user) {
        errors.general = 'Nutzer konnte nicht gefunden werden'
        throw new UserInputError('Fehlerhafte Anmeldedaten', { errors })
      }

      const isMatchingPassword = await bcrypt.compare(password, user.password)
      if (!isMatchingPassword) {
        errors.general = 'Falsches Passwort'
        throw new UserInputError('Fehlerhafte Anmeldedaten', { errors })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )

      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError('Nutzername ist bereits vergeben', {
          errors: {
            username: 'Dieser Nutzername ist bereits vergeben',
          },
        })
      }

      password = await bcrypt.hash(password, 12)
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      })

      const res = await newUser.save()
      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
  },
}
