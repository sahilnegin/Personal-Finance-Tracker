const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Personal Finance Tracker Development Environment...\n');

const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

setTimeout(() => {
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });

  frontend.on('error', (error) => {
    console.error('❌ Frontend error:', error);
  });

  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development servers...');
    backend.kill();
    frontend.kill();
    process.exit();
  });
}, 2000);

backend.on('error', (error) => {
  console.error('❌ Backend error:', error);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development servers...');
  backend.kill();
  process.exit();
}); 