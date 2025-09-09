import { obterProdutos, obterCategorias, filtrarPorTexto, filtrarPorCategoria, filtrarPorPrecoIntervalo, filtrarPorAvaliacao } from '../../components/data.js'
import { criarCard } from '../../components/Card.js'
import { criarCabecalho } from '../../components/Header.js'
import { obterProdutosFavoritos } from '../../components/Favoritos.js'

const grade = document.querySelector('#grade')
const gradeFavoritos = document.querySelector('#grade-favoritos')
const carregando = document.querySelector('#carregando')
const vazioProdutos = document.querySelector('#vazio-produtos')
const vazioFavoritos = document.querySelector('#vazio-favoritos')
const viewProdutos = document.querySelector('#view-produtos')
const viewFavoritos = document.querySelector('#view-favoritos')
const cabecalho = document.querySelector('#cabecalho')

let todosProdutos = []
let produtosFiltrados = []
let textoBusca = ''
let categoriaAtual = 'all'
let precoMin = null
let precoMax = null
let avaliacaoMin = 0
let temaAtual = 'claro'

function mostrarCarregando() { carregando.classList.remove('hidden') }
function esconderCarregando() { carregando.classList.add('hidden') }
function mostrarVazioProd() { vazioProdutos.classList.remove('hidden') }
function esconderVazioProd() { vazioProdutos.classList.add('hidden') }
function mostrarVazioFav() { vazioFavoritos.classList.remove('hidden') }
function esconderVazioFav() { vazioFavoritos.classList.add('hidden') }

function renderizarProdutos(lista) {
  grade.innerHTML = ''
  if (!lista.length) { mostrarVazioProd(); return }
  esconderVazioProd()
  lista.forEach(prod => {
    const card = criarCard(prod, () => renderizarProdutos(produtosFiltrados))
    grade.appendChild(card)
  })
}

function renderizarFavoritos() {
  gradeFavoritos.innerHTML = ''
  const lista = obterProdutosFavoritos(todosProdutos)
  if (!lista.length) { mostrarVazioFav(); return }
  esconderVazioFav()
  lista.forEach(prod => {
    const card = criarCard(prod, renderizarFavoritos)
    gradeFavoritos.appendChild(card)
  })
}

function navegar(para) {
  if (para === 'produtos') {
    viewProdutos.classList.remove('hidden')
    viewFavoritos.classList.add('hidden')
    renderizarProdutos(produtosFiltrados)
  } else {
    viewProdutos.classList.add('hidden')
    viewFavoritos.classList.remove('hidden')
    renderizarFavoritos()
  }
}

function aplicarFiltros() {
  let lista = filtrarPorTexto(todosProdutos, textoBusca)
  lista = filtrarPorCategoria(lista, categoriaAtual)
  lista = filtrarPorPrecoIntervalo(lista, precoMin, precoMax)
  lista = filtrarPorAvaliacao(lista, avaliacaoMin)
  produtosFiltrados = lista
  renderizarProdutos(produtosFiltrados)
}

function buscar(texto) {
  textoBusca = texto
  aplicarFiltros()
}

function mudarCategoria(cat) {
  categoriaAtual = cat
  aplicarFiltros()
}

function mudarPreco(min, max) {
  precoMin = min === '' ? null : Number(min)
  precoMax = max === '' ? null : Number(max)
  aplicarFiltros()
}

function mudarAvaliacao(min) {
  avaliacaoMin = Number(min) || 0
  aplicarFiltros()
}

function aplicarTema(tema) {
  if (tema === 'escuro') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('tema', tema)
  temaAtual = tema
}

function alternarTema() {
  const novo = document.documentElement.classList.contains('dark') ? 'claro' : 'escuro'
  aplicarTema(novo)
}

async function iniciar() {
  const temaSalvo = localStorage.getItem('tema')
  aplicarTema(temaSalvo === 'escuro' ? 'escuro' : 'claro')

  mostrarCarregando()
  try {
    const [produtos, categorias] = await Promise.all([obterProdutos(), obterCategorias()])
    todosProdutos = produtos
    produtosFiltrados = produtos
    cabecalho.appendChild(
      criarCabecalho(navegar, buscar, mudarCategoria, mudarPreco, mudarAvaliacao, alternarTema, categorias, temaAtual)
    )
    renderizarProdutos(produtosFiltrados)
  } catch (e) {
    grade.innerHTML = '<p>Erro ao carregar dados.</p>'
  } finally {
    esconderCarregando()
  }
}

iniciar()
