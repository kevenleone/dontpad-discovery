import { getUserData } from '../core/global.utils'
export = {
  name: 'dontpad:get',
  run: async toolbox => {
    const { print, parameters } = toolbox;
    const { first } = parameters;
    const [user] = first.split(',');
    if (user) {
      await getUserData(user);
    }
    print.info('End of process');
  }
}