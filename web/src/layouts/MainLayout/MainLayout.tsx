import Navbar from 'src/components/Navbar/Navbar' // Import your Navbar component

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Navbar /> {/* Include the Navbar component */}
      <main>{children}</main>
    </div>
  )
}

export default MainLayout
