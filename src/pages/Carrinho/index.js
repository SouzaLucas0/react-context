import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCarrinhoContext } from 'common/context/Carrinho';
import Produto from 'components/Produto';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import { usePagamentoContext } from 'common/context/Pagamento';
import { useContext } from 'react';
import { UsuarioContext } from 'common/context/Usuario';
import { useMemo } from 'react';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { carrinho, valorTotal, efetuaCompra } = useCarrinhoContext();
  const {saldo} = useContext(UsuarioContext);
  const {formaPagamento, tiposPagamento, mudaFormaPagamento} = usePagamentoContext()
  const history = useHistory();
  const total = useMemo(() => Number(saldo - valorTotal), [saldo, valorTotal]);

  return (
    <Container>
      <Voltar
        onClick={() => history.goBack()}
      />
      <h2>
        Carrinho
      </h2>
      {carrinho.map(item => (
        <Produto 
          {...item}
          key={item.id}
        />
      ))}

      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
          <Select
            value={formaPagamento.id}
            onChange={(event) => mudaFormaPagamento(event.target.value)}
          >
            {tiposPagamento.map(pagamento => (
              <MenuItem value={pagamento.id} key={pagamento.id}>
                {pagamento.nome}
              </MenuItem>
            ))}
          </Select>   
      </PagamentoContainer>
      <TotalContainer>        
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {valorTotal.toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {Number(saldo).toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ {total.toFixed(2)}</span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
          efetuaCompra();
          setTimeout(() => {
            history.push('/feira')
        }, 2000);
        }}
        color="primary"
        variant="contained"
        disabled={total < 0 || carrinho.length ===0}
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;