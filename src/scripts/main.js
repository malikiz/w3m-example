import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet, arbitrum } from '@wagmi/core/chains'
import { watchAccount, disconnect, getAccount } from '@wagmi/core'

// 1. Define constants
const projectId = 'ddd4402bd042a94609baca1d9f602a93'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
const modal = createWeb3Modal({ wagmiConfig, projectId, chains })

const connectButton = document.getElementById('connect')
const userEl = document.getElementById('user')

async function connect() {
  if (getAccount().isConnected) {
    await disconnect()
  } else {
    await modal.open()
  }
}
// listening for account changes
watchAccount(account => {
  userEl.innerText = account.address ?? ''
  if (account.isConnected) {
    connectButton.innerText = 'Disconnect'
  } else {
    connectButton.innerText = 'Connect'
  }
})

connectButton.onclick = connect