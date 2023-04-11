import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const myAddress = useAddress()
  const contractAddress = '0x9A2E4D6659622171Dda4bf92bb587AC5b230bAb1'
  const { contract, isLoading } = useContract(contractAddress)

  const [counter, setCounter] = useState<string | undefined>(undefined)

  async function getCounter() {
    if (!contract) return

    const counter = await contract.call('getCounter')
    setCounter(counter.toString())
  }
  useEffect(() => {
    getCounter()
  })


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.title}>
          <h5>Welcome!</h5>
          <h3>손경현의 카운터 앱 입니다.</h3>
        </div>

        <div className={styles.description}>
          Contract address: {contractAddress} <br />
          Host address: 0xe95CE43665c4d4FeE5354168D69F506aD5c5141e <br />
          Your address: {myAddress}
        </div>

        <div className={styles.title}>
          <h3>{counter}</h3>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => {
                contract.call('decrementCounter')
                getCounter()
              }}
            >
              <h1>-</h1>
            </Web3Button>
          </div>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => getCounter()}
            >
              <h1>Refresh Counter</h1>
            </Web3Button>
          </div>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => {
                contract.call('incrementCounter')
                getCounter()
              }}
            >
              <h1> + </h1>
            </Web3Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
