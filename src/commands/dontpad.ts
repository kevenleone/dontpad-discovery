import { getUserData } from '../core/global.utils'
export = {
  name: 'dontpad',
  run: async toolbox => {
    const { print, parameters } = toolbox;
    const { first } = parameters;
    const [user] = first.split(',');

    await getUserData(user);
    print.success('Oi!')
  }
}