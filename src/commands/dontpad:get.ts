import { GluegunToolbox } from 'gluegun'
import { getUserData, welcome, printTimestamp } from '../core/global.utils'

export default {
  name: 'dontpad:get',
  run: async (toolbox: GluegunToolbox): Promise<void> => {
    const { parameters } = toolbox
    const { first } = parameters
    welcome()
    if (first) {
      const [user] = first.split(',')
      await getUserData(user)
    } else {
      printTimestamp('Hey, an error ocurred.', 'warning')
      printTimestamp(
        'You need to pass an argument, example: dontscovery dontpad:get keven',
        'error'
      )
    }
    printTimestamp('End of process')
  }
}
