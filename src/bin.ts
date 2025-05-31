#!/usr/bin/env node
import chalk from 'chalk';
import { generateProject } from './generator';
import { promptInit } from './prompt';

const args = process.argv.slice(2);

(async () => {
  if (args.includes('--project-init')) {
    console.log(chalk.cyan('\n🚀 Lifetech Project Initializer\n'));
    const answers = await promptInit();
    await generateProject(answers);
  } else {
    console.log(chalk.yellow('Use --init to start a new project.'));
  }
})();
