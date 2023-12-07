// import React, { useState } from 'react'

// import { Web3Auth } from '@web3auth/modal'
// import './Wallet.css'

// const Wallet = () => {
//   const [isConnected, setIsConnected] = useState(false)

//   async function initializeWeb3Auth() {
//     const web3auth = new Web3Auth({
//       clientId:
//         'BO6qT-r1Kc3RqFYD_A19d9Xnde43SjP4qiijI-Il7FNpyGgsgvW5JL7xQ-5wqgTTsCQ_YOQ3z-29b-tBFi1G8aI',
//       web3AuthNetwork: 'sapphire_devnet', // Web3Auth Network

//       chainConfig: {
//         chainNamespace: 'eip155',
//         chainId: '0x5',
//         rpcTarget: 'https://rpc.ankr.com/eth_goerli',
//       },
//     })

//     await web3auth.initModal()

//     // Connect to the wallet and update the state if successful
//     try {
//       await web3auth.connect()
//       setIsConnected(true)
//     } catch (error) {
//       console.error('Error connecting:', error)
//     }
//   }

//   return (
//     <div>
//       {isConnected ? (
//         <p>You are connected</p>
//       ) : (
//         <button className="connectButton" onClick={initializeWeb3Auth}>
//           Connect
//         </button>
//       )}
//     </div>
//   )
// }

// export default Wallet
