import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { useHistory } from 'react-router-dom';
import { Voltar } from 'pages/Carrinho/styles';
import BtnHome from 'components/BtnHome';

export default function NavBar() {
  const { qtdProdutos } = useCarrinhoContext()
  const history = useHistory()

  return (   
    <Nav>      
      <Logo />
      <BtnHome />
      <IconButton
        disabled={qtdProdutos === 0}
        onClick={() => history.push('/carrinho')}
      >      
        <Badge
          color="primary"
          badgeContent={qtdProdutos}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}