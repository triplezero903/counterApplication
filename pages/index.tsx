import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

const Home: NextPage = () => {
  const myAddress = useAddress()
  const contractAddress = '0xe95CE43665c4d4FeE5354168D69F506aD5c5141e'
  const { contract, isLoading } = useContract(contractAddress)
  const [counter, setCounter] = useState<string | undefined>(undefined)

  async function getCounter() {
    if (!contract) return

    const counter = await contract.call('getCounter')
    setCounter(counter.toString())
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.connect}>
          <ConnectWallet />
        </div>
        <p>My Address : {myAddress}</p>
        <h1>Counter Dapp</h1>
        <h3>{counter}</h3>
        <Web3Button
          contractAddress={contractAddress}
          action={() => getCounter()}
        >
          Refresh Counter
        </Web3Button>
        <br />
        <Web3Button
          contractAddress={contractAddress}
          action={(contract) => contract.call('incrementCounter')}
        >
          Increment Counter
        </Web3Button>
        <br />
      </main>
    </div>
  )
}

export default Home
