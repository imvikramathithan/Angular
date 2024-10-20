// server.js

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

// Initialize App
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// MongoDB Connection (Use your own MongoDB connection string)
mongoose
  .connect(
    'mongodb+srv://vikram:vikram2002@cluster0.38cax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err))

// User Model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const User = mongoose.model('User', UserSchema)

// Register user route
app.post('/api/users/register', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const newUser = new User({ username, email, password })
    await newUser.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error })
  }
})

// Login user route
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email, password })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ message: 'Login successful', user })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error })
  }
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
