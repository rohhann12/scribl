import type { Request, Response } from 'express'
import { signupUser, signinUser } from '../services/auth.service.js'
import type { AuthRequestBody } from '../types/auth.types.js'

export async function signup(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as AuthRequestBody

  if (typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).json({ success: false, error: 'email and password are required strings' })
    return
  }

  try {
    const result = await signupUser({ email, password })
    res.status(201).json(result)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Signup failed'
    res.status(500).json({ success: false, error: message })
  }
}

export async function signin(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as AuthRequestBody

  if (typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).json({ success: false, error: 'email and password are required strings' })
    return
  }

  try {
    const result = await signinUser({ email, password })
    res.status(200).json(result)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Signin failed'
    res.status(401).json({ success: false, error: message })
  }
}
