import { useState, useEffect } from 'react'
import Navigation from './navigation/Navigation'
import Footer from '../Footer'


export default function layout(props) {
  return (
    <>
      <Navigation />
      <main>{props.children}</main>
      <Footer/>
    </>
  )
}
