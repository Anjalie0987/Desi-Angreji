const fs = require('fs');
const execSync = require('child_process').execSync;

const output = execSync('git ls-files', { encoding: 'utf-8' });
const paths = output.trim().split('\n');

const root = {};

for (const p of paths) {
  if (!p) continue;
  const parts = p.split('/');
  let current = root;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!current[part]) {
      current[part] = i === parts.length - 1 ? null : {};
    }
    current = current[part];
  }
}

function printTree(node, prefix = '') {
  const keys = Object.keys(node);
  let out = '';
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const isLast = i === keys.length - 1;
    out += prefix + (isLast ? '└── ' : '├── ') + key + '\n';
    if (node[key]) {
      out += printTree(node[key], prefix + (isLast ? '    ' : '│   '));
    }
  }
  return out;
}

const treeString = '.\n' + printTree(root);
console.log(treeString);
