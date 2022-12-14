import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from 'pages/Login'
import Feira from 'pages/Feira'
import Carrinho from 'pages/Carrinho'
import { UsuarioProvider } from 'common/context/Usuario'
import { CarrinhoProvider } from 'common/context/Carrinho'
import { PagamentoProvider } from 'common/context/Pagamento'

export default function Router() {
 //Resolver bug no tamanho do campo de qtd

  return (
    <BrowserRouter>
        <Switch>
            <UsuarioProvider>
              <Route exact path='/'>
                <Login />
              </Route>
              <CarrinhoProvider>
              <PagamentoProvider>
                  <Route path='/feira'>
                    <Feira />
                  </Route>                
                  <Route path='/carrinho'>
                    <Carrinho />
                  </Route>
                </PagamentoProvider>
              </CarrinhoProvider>              
            </UsuarioProvider>
        </Switch>
    </BrowserRouter>
  )
}