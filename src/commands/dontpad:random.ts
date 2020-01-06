import { GluegunToolbox } from 'gluegun'
import { getUserData, printTimestamp, welcome } from '../core/global.utils'
import { name } from 'faker/locale/pt_BR'

async function generateUser(): Promise<void> {
  const user = name.firstName()
  await getUserData(user.toLowerCase())
  printTimestamp(`Faker user generated ${user}`)
}

export default {
  name: 'dontpad:random',
  alias: 'random',
  run: async (toolbox: GluegunToolbox): Promise<void> => {
    welcome()
    const { first } = toolbox.parameters
    const total = first && Number(first) ? first : 1
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of Array(total)) {
      await generateUser()
    }
    printTimestamp('End of process')
  }
}
