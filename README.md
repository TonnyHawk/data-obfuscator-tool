# Local Data Obfuscator

A privacy-focused tool for obfuscating sensitive information in text, designed to work entirely locally without any external APIs. Perfect for safely sharing text with AI assistants or colleagues while protecting sensitive data.

## Overview

The Local Data Obfuscator allows you to replace sensitive information with placeholder tokens, get corrections or feedback from external services (like ChatGPT), and then restore the original sensitive data back into the corrected text. All processing happens locally in your browser, ensuring your sensitive data never leaves your device.

## Key Features

### 🔒 Complete Privacy
- **100% Local Processing**: All obfuscation and restoration happens in your browser
- **No External APIs**: Your sensitive data never leaves your device
- **No Data Collection**: Nothing is sent to external servers

### 🎯 Automatic Detection
Automatically detects and obfuscates 8 types of sensitive data:
- **Names**: Common first and last names
- **Email Addresses**: Any valid email format
- **Phone Numbers**: Various formats (US, international, with/without formatting)
- **Social Security Numbers**: All common SSN formats
- **Credit Card Numbers**: Major card providers (Visa, Mastercard, Amex, Discover)
- **Addresses**: Street addresses with numbers and common street types
- **Dates**: Multiple formats (MM/DD/YYYY, DD/MM/YYYY, Month DD, YYYY, etc.)
- **Custom Words**: User-defined sensitive terms

### 🖱️ Smart Text Selection
- **Click-and-Add**: Select any text with your mouse in either the original or obfuscated text areas
- **Popup Button**: A button appears above your selection to add it to the custom words list
- **Instant Updates**: Adding custom words immediately re-obfuscates the text

### 🔄 Complete Workflow Support

**Step 1: Obfuscate**
- Paste your sensitive text
- Automatic detection replaces sensitive data with tokens like `[NAME_1]`, `[EMAIL_1]`, `[SSN_1]`
- Copy the obfuscated text

**Step 2: Get Corrections**
- Share the obfuscated text with ChatGPT, colleagues, or other services
- Get grammar corrections, improvements, or feedback
- The tokens remain intact in the corrected version

**Step 3: Restore**
- Paste the corrected text back into the tool
- Click "Restore Original Data"
- Your original sensitive information is restored to the corrected text

### 📊 Mapping Table
- View all detected sensitive data and their placeholder tokens
- See the full mapping of originals to placeholders
- Useful for verification and debugging

### 📚 Custom Words Management
- Add organization-specific terms, proprietary names, or any custom sensitive data
- Manage your custom words list with easy add/remove functionality
- Custom words persist across sessions using localStorage

### 🎓 User-Friendly Onboarding
- **First-Time Tutorial**: Multi-step popup guide for new users
- **Help Button**: Access minimalistic help anytime
- **Clear Instructions**: Each panel includes contextual guidance

## How It Works

1. **Paste** your text with sensitive information
2. The tool **automatically detects** and replaces sensitive data with tokens
3. **Copy** the obfuscated text
4. **Share** it with external services for corrections or feedback
5. **Paste** the corrected text back
6. **Restore** the original sensitive information with one click

## Technical Details

- Built with React and TypeScript
- Styled with Tailwind CSS
- Uses localStorage for persistence (custom words, mappings, onboarding state)
- No external dependencies for obfuscation logic
- Responsive design for desktop and mobile

## Privacy Guarantee

This tool is specifically designed for privacy-conscious users who need to work with sensitive data. Since all processing happens locally in your browser:
- No data is transmitted to external servers
- No analytics or tracking
- No API keys or authentication required
- Safe for use with PII, PHI, and confidential information

## Use Cases

- **AI Assistance**: Get writing help from ChatGPT without exposing personal information
- **Collaboration**: Share documents with colleagues while protecting sensitive data
- **Review & Editing**: Get feedback on text containing confidential information
- **Compliance**: Maintain GDPR, HIPAA, and other privacy requirements
- **Testing**: Create sanitized test data from real examples

## Getting Started

1. Launch the application
2. Complete the brief onboarding tutorial (first-time only)
3. Paste text with sensitive information
4. Copy the obfuscated text
5. Use it wherever you need, then restore when ready

---

**Note**: While this tool provides strong obfuscation for common data types, always review the obfuscated output to ensure all sensitive information has been properly replaced before sharing externally.
