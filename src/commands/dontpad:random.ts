import { getUserData } from '../core/global.utils'
import { name } from 'faker/locale/pt_BR'
export = {
  name: 'dontpad:random',
  run: async toolbox => {
    const { print } = toolbox;
    const user = name.firstName();
    print.info(`Faker user generated ${user} and will try search for ${user} and ${user.toLowerCase()}`)
    await getUserData(user);
    await getUserData(user.toLowerCase());
    print.info('End of process');
  }
}