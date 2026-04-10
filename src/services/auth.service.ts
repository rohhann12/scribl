// TODO: install jsonwebtoken — `npm install jsonwebtoken @types/jsonwebtoken`
import { randomUUID } from 'node:crypto'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/config.js'
import type { AuthCredentials, SigninResult, SignupResult } from '../types/auth.types.js'

export async function signupUser(credentials: AuthCredentials): Promise<SignupResult> {
  const { email, password } = credentials

  const existing = await prisma.user.findFirst({ where: { email } })
  if (existing) throw new Error('User already exists')
  const user = await prisma.user.create({
    data: {
      userId: randomUUID(),
      userName: email,
      email,
      password,
    },
  })

  console.log(`[auth.service] signup called for ${email}`)

  return {
    success: true,
    message: 'User registered successfully',
    user: {
      id: user.userId,
      email: user.email,
    },
  }
}

export async function signinUser(credentials: AuthCredentials): Promise<SigninResult> {
  const { email, password } = credentials

  const user = await prisma.user.findFirst({ where: { email } })
  if (!user || user.password !== password) throw new Error('Invalid credentials')

  const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '7d',
  })

  console.log(`[auth.service] signin called for ${email}`)

  return {
    success: true,
    message: 'Signed in successfully',
    token,
  }
}
