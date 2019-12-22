import { GluegunCommand, GluegunToolbox } from 'gluegun'

const command: GluegunCommand = {
  name: 'dontscovery',
  run: async (toolbox: GluegunToolbox): Promise<void> => {
    const { print } = toolbox

    print.info(
      'dontscovery is running, use: dontscovery -h to see the available commands'
    )
  }
}

module.exports = command
