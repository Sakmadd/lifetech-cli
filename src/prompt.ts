import inquirer from 'inquirer';

export interface InitAnswers {
  type: 'auth gateway' | 'tenant project' | 'others';
  name: string;
}

export async function promptInit(): Promise<InitAnswers> {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'What project you want to initiate?',
      choices: ['auth gateway', 'tenant project', 'others'],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the project?',
      validate: (input: string) =>
        input.trim().length > 0 || 'Name cannot be empty.',
    },
  ]);
}
