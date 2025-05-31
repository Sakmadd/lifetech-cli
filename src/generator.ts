import degit from 'degit';
import ora from 'ora';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import { InitAnswers } from './prompt';

const TEMPLATE_MAP: Record<string, string> = {
  'auth gateway': 'lifetech/templates/auth-gateway',
  'tenant project': 'lifetech/templates/tenant-project',
  others: 'lifetech/templates/default',
};

export async function generateProject({ type, name }: InitAnswers) {
  const spinner = ora('Cloning project template...').start();
  const repoPath = TEMPLATE_MAP[type] || TEMPLATE_MAP['others'];
  const emitter = degit(repoPath, {
    cache: false,
    force: true,
    verbose: false,
  });

  const targetDir = path.resolve(process.cwd(), name);

  try {
    await emitter.clone(targetDir);
    spinner.succeed(
      `Project "${chalk.green(name)}" created at ${chalk.cyan(targetDir)}`
    );
  } catch (err) {
    spinner.fail('Failed to fetch template');
    console.error(err);
  }
}
