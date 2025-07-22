# XMessenger Demos LP2

## Overview
A Node.js web application for encrypted messaging using the Kynesys Labs Demos SDK. The application provides secure messaging capabilities with Supabase database integration and deployment readiness checking.

**Current Status**: Application running successfully on port 5000

## Project Architecture

### Core Components
- **Backend**: Express.js server with CORS enabled
- **Database**: Supabase for user data and chat history
- **Messaging**: Kynesys Labs Demos SDK for encrypted messaging
- **Deployment**: Built-in deployment readiness checker

### File Structure
- `index.js` - Main application entry point
- `demosInstance.js` - Demos SDK integration and authentication
- `instantMessage.js` - Messaging peer setup and management
- `matheFunc.js` - Utility functions for ID generation and formatting
- `names.js` - Random name generation for users
- `deployment-checker.js` - Comprehensive deployment readiness verification
- `public/` - Static assets and frontend files

### API Endpoints
- `POST /generatePhrases` - Generate new mnemonic phrases and keypairs
- `POST /createAccount` - Create new user accounts with generated usernames
- `POST /loginPhrase` - Login using mnemonic phrases
- `POST /sendMessage` - Send encrypted messages between users
- `POST /recieveMessageUpdates` - Handle incoming message updates
- `POST /api/search-users` - Search users by public key
- `POST /api/update-chat-buddy` - Update chat buddy relationships
- `GET /deployment-status` - Check deployment readiness
- `GET /health` - Health check endpoint

## Recent Changes
- **2025-01-22**: Fixed application startup issue
  - Identified port 5000 was already in use by conflicting Node.js process
  - Killed the conflicting process and cleared port 5000
  - Successfully started the application on port 5000
  - Server running with SDK connection established
  - Health endpoint responding correctly
  - Note: "bigint" warning is normal - app uses pure JS fallback

## Environment Variables Required
- `SUPABASE_KEY` - Supabase project API key
- `SUPABASE_URL` - Supabase project URL
- `PORT` - Server port (defaults to 5000)

## Dependencies
- `@kynesyslabs/demosdk` - Encryption and messaging SDK
- `@supabase/supabase-js` - Database client
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `bip39` - Mnemonic phrase generation

## User Preferences
None specified yet.