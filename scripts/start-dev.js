const { spawn } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const backendPath = path.join(root, 'backend');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

const backend = spawn(npmCmd, ['start'], {
  cwd: backendPath,
  stdio: 'inherit',
  shell: true
});

const frontend = spawn(npmCmd, ['run', 'start:frontend'], {
  cwd: root,
  stdio: 'inherit',
  shell: true
});

const shutdown = () => {
  if (backend && !backend.killed) backend.kill();
  if (frontend && !frontend.killed) frontend.kill();
  process.exit();
};

backend.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Backend exited with code ${code}`);
    console.error('Run "cd backend && npm install" and then "npm start" to see the exact backend error.');
  }
});

frontend.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Frontend exited with code ${code}`);
  }
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
