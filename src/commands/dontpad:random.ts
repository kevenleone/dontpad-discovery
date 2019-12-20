import { getUserData, printTimestamp, welcome } from '../core/global.utils'
import { name } from 'faker/locale/pt_BR'
export = {
  name: 'dontpad:random',
  run: async _toolbox => {
    const user = name.firstName();
    welcome();
    printTimestamp(`Faker user generated ${user} and will try search for ${user} and ${user.toLowerCase()}`)
    await getUserData(user);
    await getUserData(user.toLowerCase());
    printTimestamp('End of process');
  }
}