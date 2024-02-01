import Navigation from './navigation/Navigation'
import Footer from '../Footer'


export default function CustomLayout(props) {
  return (
    <>
      <Navigation />
      <main>{props.children}</main>
      <Footer/>
    </>
  )
}
