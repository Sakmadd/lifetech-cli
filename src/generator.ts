import degit from 'degit';
import ora from 'ora';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import { InitAnswers } from './prompt';

const TEMPLATE_MAP: Record<string, string> = {
  'auth gateway': '404',
  'tenant project': 'Sakmadd/lifetech-template/tenant-project-template',
  others: '404',
};

export async function generateProject({ type, name }: InitAnswers) {
  const spinner = ora('Cloning project template...').start();
  const basePath = TEMPLATE_MAP[type];
  if (!basePath) {
    spinner.fail(`Template "${type}" not found`);
    console.log('Available templates:', Object.keys(TEMPLATE_MAP));
    return;
  }
  const repoPath = basePath;
  const emitter = degit(repoPath, {
    cache: false,
    force: true,
    verbose: true,
  });
  const targetDir = path.resolve(process.cwd(), name);
  try {
    await emitter.clone(targetDir);
    spinner.succeed(chalk.bold('Project initialized!'));
    console.log(`\nNext steps, try to:\n${chalk.cyan(
      `\ncd ${name}\n`
    )}\n${chalk.cyan('npm install\n')}\n${chalk.cyan('npm run dev\n')}
    `);
  } catch (err) {
    spinner.fail('Failed to fetch template');
    console.log(type, name);
    console.error(err);
  }
}
