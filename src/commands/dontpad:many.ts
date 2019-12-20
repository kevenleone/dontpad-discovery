import { getUserData, printTimestamp, welcome } from '../core/global.utils'
export = {
  name: 'dontpad:many',
  run: async toolbox => {
    const { print, parameters } = toolbox;
    const { first } = parameters;
    welcome();
    if (first) {
    const users = first.split(',');
      for (const user of users) {
        await getUserData(user);
        print.newline();
      }
    } else {
      printTimestamp('Hey, an error ocurred.', 'warning');
      printTimestamp('You need to pass an argument, example: dontscovery dontpad:many keven,leone,santos', 'error');
    }
    printTimestamp('End of process');
  }
}