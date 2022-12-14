import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react"
import { useHistory } from "react-router-dom";
import { usePagamentoContext } from "./Pagamento";
import { UsuarioContext } from "./Usuario";


export const CarrinhoContext = createContext();
CarrinhoContext.displayName='CarrinhoContext';

export const CarrinhoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([]);
    const [qtdProdutos, setQtdProdutos] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const history = useHistory();
    return (
        <CarrinhoContext.Provider
            value={{
                    carrinho,
                    setCarrinho,
                    qtdProdutos,
                    setQtdProdutos,
                    valorTotal,
                    setValorTotal
                }}
        >
            {children}
        </CarrinhoContext.Provider>
    )
}

export const useCarrinhoContext = () => {
    const {
        carrinho,
        setCarrinho,
        qtdProdutos,
        setQtdProdutos,
        valorTotal,
        setValorTotal
    } = useContext(CarrinhoContext)

    const {
        formaPagamento
    } = usePagamentoContext();

    const {
        setSaldo
    } = useContext(UsuarioContext)

    function atualizaQuantidade(id, qtd){
        return carrinho.map(item => {
            if(item.id === id) {
                item.quantidade += qtd;
            }
            return item;
        })
    }

    function addProduto(novoProduto) {
        const existeProduto = carrinho.some(item => item.id === novoProduto.id);
    
        if(!existeProduto) {
          novoProduto.quantidade = 1;
          return setCarrinho(atual => [...atual, novoProduto])
        }
    
        setCarrinho(atualizaQuantidade(novoProduto.id, 1))
      }

    function removerProduto(id) {
        const produto = carrinho.find(item => item.id === id);
        const ehUltimaUnd = produto.quantidade === 1;

        if(ehUltimaUnd) {
            return setCarrinho(atual => atual.filter(item => item.id !== id));
        }

        setCarrinho(atualizaQuantidade(id, -1))
    }

    function efetuaCompra() {
        setCarrinho([]);
        setSaldo(saldo => saldo - valorTotal);        
    }

    useEffect(() => {
        const {qtdProdutos, total} = carrinho.reduce((counter, produto) => ({
            qtdProdutos: counter.qtdProdutos + produto.quantidade,
            total: counter.total + (produto.valor*produto.quantidade)
        }), {
            qtdProdutos: 0,
            total: 0
        });

        setQtdProdutos(qtdProdutos);
        setValorTotal(total*formaPagamento.juros);
    }, [carrinho, setQtdProdutos, setValorTotal, formaPagamento]);

    return {
        carrinho,
        setCarrinho,
        addProduto,
        removerProduto,
        qtdProdutos,
        setQtdProdutos,
        valorTotal,
        efetuaCompra
    }
}