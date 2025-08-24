import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2, Github, Sparkles, AlertCircle, CheckCircle, Mail } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false)
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const { signIn, signUp, signInWithProvider, resendConfirmationEmail, resetPassword } = useAuth()

  const clearMessages = () => {
    setError(null)
    setSuccess(null)
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    clearMessages()
    
    try {
      const { error } = await signIn(email, password)
      if (error) {
        console.error('Sign in error:', error)
        
        if (error.message === 'Email not confirmed') {
          setError('Please check your email and click the confirmation link before signing in.')
          setShowEmailConfirmation(true)
        } else if (error.message === 'Invalid login credentials') {
          setError('Invalid email or password. Please try again.')
        } else {
          setError(error.message || 'An error occurred during sign in.')
        }
        return
      }
      
      setSuccess('Successfully signed in!')
      setTimeout(() => {
        onClose()
        setSuccess(null)
      }, 1000)
    } catch (error) {
      console.error('Sign in error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form fields
    if (!email || !password || !username) {
      setError('Please fill in all fields')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    
    setLoading(true)
    clearMessages()
    
    // Add timeout to prevent getting stuck
    const timeoutId = setTimeout(() => {
      setLoading(false)
      setError('Request timed out. Please try again.')
    }, 30000) // 30 second timeout
    
    try {
      console.log('Starting sign up process...')
      const { error, message } = await signUp(email, password, username)
      
      // Clear timeout since we got a response
      clearTimeout(timeoutId)
      
      if (error) {
        console.error('Sign up error:', error)
        setError(error.message || 'An error occurred during sign up.')
        return
      }

      if (message) {
        setSuccess(message)
        setShowEmailConfirmation(true)
      } else {
        setSuccess('Account created successfully!')
        setTimeout(() => {
          onClose()
          setSuccess(null)
        }, 1000)
      }
    } catch (error) {
      console.error('Sign up error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    setLoading(true)
    clearMessages()
    
    try {
      const { error } = await resendConfirmationEmail(email)
      if (error) {
        setError('Failed to resend confirmation email. Please try again.')
        return
      }
      
      setSuccess('Confirmation email sent! Please check your inbox.')
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    setLoading(true)
    clearMessages()
    
    try {
      const { error } = await resetPassword(email)
      if (error) {
        setError('Failed to send password reset email. Please try again.')
        return
      }
      
      setSuccess('Password reset email sent! Please check your inbox.')
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleProviderSignIn = async (provider: 'google' | 'github') => {
    setLoading(true)
    clearMessages()
    
    try {
      const { error } = await signInWithProvider(provider)
      if (error) {
        setError('Failed to sign in with ' + provider + '. Please try again.')
        return
      }
      onClose()
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setUsername('')
    setError(null)
    setSuccess(null)
    setShowEmailConfirmation(false)
    setShowPasswordReset(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-md bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 border-purple-500/30"
        aria-describedby="auth-modal-description"
      >
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <DialogTitle className="text-2xl font-bold text-white">BetBingo</DialogTitle>
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <p id="auth-modal-description" className="text-purple-200 text-sm">💰 Where speed meets strategy!</p>
        </DialogHeader>

        {/* Error and Success Messages */}
        {error && (
          <Alert className="bg-red-900/50 border-red-500/50">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-900/50 border-green-500/50">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200">{success}</AlertDescription>
          </Alert>
        )}

        {/* Email Confirmation Section */}
        {showEmailConfirmation && (
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 text-center">
            <Mail className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-2">Check Your Email</h3>
            <p className="text-blue-200 text-sm mb-3">
              We've sent a confirmation link to <strong>{email}</strong>
            </p>
            <div className="space-y-2">
              <Button
                onClick={handleResendConfirmation}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Resend Confirmation Email
              </Button>
              <Button
                onClick={() => setShowEmailConfirmation(false)}
                variant="outline"
                className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-800/30"
                size="sm"
              >
                Back to Sign In
              </Button>
            </div>
          </div>
        )}

        {/* Password Reset Section */}
        {showPasswordReset && (
          <div className="bg-orange-900/30 border border-orange-500/30 rounded-lg p-4 text-center">
            <Mail className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-2">Reset Password</h3>
            <p className="text-orange-200 text-sm mb-3">
              Enter your email to receive a password reset link
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-orange-300"
              />
              <Button
                onClick={handlePasswordReset}
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                size="sm"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Email
              </Button>
              <Button
                onClick={() => setShowPasswordReset(false)}
                variant="outline"
                className="w-full border-orange-500/30 text-orange-300 hover:bg-orange-800/30"
                size="sm"
              >
                Back to Sign In
              </Button>
            </div>
          </div>
        )}

        {/* Main Auth Forms */}
        {!showEmailConfirmation && !showPasswordReset && (
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-md border-white/20">
              <TabsTrigger value="signin" className="text-white data-[state=active]:bg-purple-600">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="text-white data-[state=active]:bg-purple-600">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4 mt-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                    placeholder="Enter your password"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
              
              {/* Forgot Password Link */}
              <div className="text-center">
                <Button
                  onClick={() => setShowPasswordReset(true)}
                  variant="link"
                  className="text-purple-300 hover:text-purple-200 text-sm p-0"
                >
                  Forgot your password?
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="signup-username" className="text-white">Username</Label>
                  <Input
                    id="signup-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                    placeholder="Choose a username"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-email" className="text-white">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-password" className="text-white">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                    placeholder="Choose a password"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}

        {/* Social Login Buttons */}
        {!showEmailConfirmation && !showPasswordReset && (
          <>
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-2 text-purple-300">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => handleProviderSignIn('google')}
                disabled={loading}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleProviderSignIn('github')}
                disabled={loading}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </>
        )}

        <div className="mt-4 text-center">
          <p className="text-purple-300 text-xs">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal