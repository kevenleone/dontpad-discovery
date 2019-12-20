import { getUserData } from '../core/global.utils'
export = {
  name: 'dontpad:many',
  run: async toolbox => {
    const promises = [];
    const { print, parameters } = toolbox;
    const { first } = parameters;
    const users = first.split(',');
    if (users) {
      for (const user of users) {
        promises.push(getUserData(user));
        print.newline();
      }
    }
    await Promise.all(promises);
    print.info('End of process');
  }
}