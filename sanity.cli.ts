import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ywf7o1w0',
    dataset: 'production'
  },
  deployment: {
    appId: 'znif02xdz2wg2g0cfb73bpre',
    autoUpdates: true
  }
})