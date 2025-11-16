/**
 * Environment Setup Script
 * This script helps sync environment variables from root .env to backend and frontend
 */

const fs = require('fs');
const path = require('path');

const rootEnvPath = path.join(__dirname, '.env');
const backendEnvPath = path.join(__dirname, 'backend', '.env');
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');

// Read root .env file
function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, 'utf8');
}

// Extract specific variables from env content
function extractVariables(envContent, prefix = '') {
  if (!envContent) return '';
  
  const lines = envContent.split('\n');
  const extracted = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip comments and empty lines
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    // Extract variables based on prefix
    if (prefix) {
      if (trimmed.startsWith(prefix)) {
        extracted.push(trimmed);
      }
    } else {
      // For backend, exclude REACT_APP_ variables
      if (!trimmed.startsWith('REACT_APP_')) {
        extracted.push(trimmed);
      }
    }
  }
  
  return extracted.join('\n');
}

// Main setup function
function setupEnv() {
  console.log('🔧 Setting up environment files...\n');
  
  const rootEnv = readEnvFile(rootEnvPath);
  
  if (!rootEnv) {
    console.log('❌ Root .env file not found!');
    console.log('📝 Please create a .env file in the project root based on .env.example\n');
    return;
  }
  
  // Setup backend .env
  const backendVars = extractVariables(rootEnv);
  if (backendVars) {
    fs.writeFileSync(backendEnvPath, backendVars);
    console.log('✅ Backend .env file created/updated');
  }
  
  // Setup frontend .env
  const frontendVars = extractVariables(rootEnv, 'REACT_APP_');
  if (frontendVars) {
    fs.writeFileSync(frontendEnvPath, frontendVars);
    console.log('✅ Frontend .env file created/updated');
  }
  
  console.log('\n✨ Environment setup complete!');
  console.log('📌 Note: Backend will automatically use root .env file');
  console.log('📌 Frontend .env has been synced from root .env\n');
}

// Run setup
setupEnv();


