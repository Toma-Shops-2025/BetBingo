# 🔐 Authentication Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 1. "Email not confirmed" Error

**Problem**: Users get "Email not confirmed" when trying to sign in.

**Solution**: 
- Check your email for a confirmation link from Supabase
- Click the confirmation link to verify your account
- If you don't see the email, check your spam folder
- Use the "Resend Confirmation Email" button in the sign-in modal

**Why this happens**: Supabase requires email confirmation by default for security reasons.

### 2. "Unsupported provider" Error

**Problem**: OAuth providers (Google, GitHub) show "Unsupported provider" error.

**Solution**:
1. Go to your Supabase Dashboard
2. Navigate to Authentication → Providers
3. Enable the providers you want to use (Google, GitHub)
4. Configure OAuth settings for each provider

### 3. Environment Variables Not Set

**Problem**: App shows "Supabase environment variables not found" warnings.

**Solution**:
1. Create a `.env.local` file in your project root
2. Add your Supabase credentials:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. Restart your development server

### 4. Database Tables Missing

**Problem**: Users can sign up but get errors when trying to access features.

**Solution**:
1. Follow the database setup in `SUPABASE_SETUP.md`
2. Run the SQL schema in your Supabase SQL Editor
3. Ensure Row Level Security (RLS) policies are set up correctly

## 🔧 Quick Fixes

### Enable Demo Mode (Temporary Solution)

If you're having persistent issues, you can temporarily enable demo mode:

1. Open `src/contexts/AuthContext.tsx`
2. Find this line: `const [isDemoMode, setIsDemoMode] = useState(false);`
3. Change it to: `const [isDemoMode, setIsDemoMode] = useState(true);`

This will bypass Supabase authentication and use demo data.

### Disable Email Confirmation (Development Only)

**⚠️ Warning: Only do this for development/testing!**

1. Go to your Supabase Dashboard
2. Navigate to Authentication → Settings
3. Disable "Enable email confirmations"
4. Save changes

**Note**: This is not recommended for production as it reduces security.

## 📧 Email Configuration

### Check Email Settings

1. Go to Supabase Dashboard → Authentication → Settings
2. Verify your Site URL is correct
3. Check that email templates are configured
4. Ensure your email provider is working

### Test Email Delivery

1. Try signing up with a different email address
2. Check if confirmation emails are being sent
3. Verify email isn't being blocked by spam filters

## 🔍 Debug Steps

### 1. Check Browser Console

Open Developer Tools (F12) and look for:
- Network errors
- Authentication errors
- Supabase connection issues

### 2. Check Supabase Logs

1. Go to Supabase Dashboard → Logs
2. Look for authentication-related errors
3. Check for failed login attempts

### 3. Verify Environment Variables

```bash
# Check if variables are loaded
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY)
```

## 🆘 Getting Help

### 1. Check Supabase Status
- Visit [status.supabase.com](https://status.supabase.com)
- Ensure Supabase services are operational

### 2. Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Email not confirmed" | Account not verified | Check email for confirmation link |
| "Invalid login credentials" | Wrong email/password | Verify credentials |
| "Unsupported provider" | OAuth not configured | Enable providers in Supabase |
| "Network error" | Connection issues | Check internet and Supabase status |

### 3. Still Having Issues?

1. **Check the logs**: Look at browser console and Supabase logs
2. **Verify setup**: Ensure you followed `SUPABASE_SETUP.md`
3. **Test with demo mode**: Temporarily enable demo mode to isolate the issue
4. **Contact support**: If all else fails, reach out with specific error messages

## 🎯 Prevention Tips

1. **Always test authentication flow** after making changes
2. **Keep environment variables secure** and never commit them to git
3. **Regularly check Supabase status** for any service issues
4. **Use demo mode during development** to avoid authentication blockers
5. **Test with multiple email addresses** to ensure email delivery works

## 🔄 Reset Everything

If you're completely stuck:

1. **Clear browser data**: Clear cookies, local storage, and session storage
2. **Restart development server**: Stop and restart your npm/yarn dev command
3. **Check Supabase project**: Ensure your project is active and not suspended
4. **Verify credentials**: Double-check your Supabase URL and API keys
5. **Enable demo mode**: Temporarily bypass authentication to continue development

---

**Remember**: Authentication issues are common during setup. Take it step by step, and don't hesitate to use demo mode while you work out the kinks! 🚀 