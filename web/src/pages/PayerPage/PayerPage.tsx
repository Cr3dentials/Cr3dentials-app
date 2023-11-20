import { MetaTags } from '@redwoodjs/web'

import PayerTable from 'src/components/PayerTable/PayerTable'

const PayerPage = () => {
  return (
    <>
      <MetaTags title="Payer" description="Payer page" />
      <h1>Payer</h1>
      <PayerTable /> {/* Render the PayerTable component unconditionally */}
    </>
  )
}

export default PayerPage
