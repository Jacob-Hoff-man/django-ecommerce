import {HashRouter, Route, Routes } from 'react-router-dom' 

import { Container } from 'react-bootstrap'

// components
import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './views/HomeView'
import ProductView from './views/ProductView'
import CartView from './views/CartView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ProfileView from './views/ProfileView'
import ShippingView from './views/ShippingView'
import PaymentView from './views/PaymentView'
import PlaceOrderView from './views/PlaceOrderView'
import OrderView from './views/OrderView'
import EventView from './views/EventView'

function App() {
  return (
    <HashRouter>
      <Header/>
        <main className="py-3">
          <Container>
            <Routes>
              <Route path='/' element={<HomeView/>} exact/>
              <Route path='/login' element={<LoginView/>}/>
              <Route path='/register' element={<RegisterView/>}/>
              <Route path='/profile' element={<ProfileView/>}/>
              <Route path='/product/:id' element={<ProductView/>}/>
              <Route path='/cart/:id?:quantity' element={<CartView/>}/>
              <Route path='/cart/:id' element={<CartView/>}/>
              <Route path='/cart' element={<CartView/>}/>
              <Route path='/shipping' element={<ShippingView/>}/>
              <Route path='/payment' element={<PaymentView/>}/>
              <Route path='/placeorder' element={<PlaceOrderView/>}/>  
              <Route path='/order/:id' element={<OrderView/>}/>   
              <Route path='/event/:id' element={<EventView/>}/>   
            </Routes>
          </Container>  
        </main>
      <Footer/>
    </HashRouter>
  );
}

export default App;
