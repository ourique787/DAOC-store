export function criarCabecalho(
  aoNavegar,
  aoBuscar,
  aoMudarCategoria,
  aoMudarPreco,
  aoMudarAvaliacao,
  aoAlternarTema,
  categorias,
  temaAtual
) {
  const header = document.createElement('div')
  header.className = 'topo'

  const titulo = document.createElement('h1')
  titulo.textContent = 'DAOC Store'

  const grupoNav = document.createElement('div')
  grupoNav.className = 'grupo grupo-nav'
  const btnProdutos = document.createElement('button')
  btnProdutos.textContent = 'Produtos'
  const btnFavoritos = document.createElement('button')
  btnFavoritos.textContent = 'Favoritos'
  btnProdutos.addEventListener('click', () => aoNavegar('produtos'))
  btnFavoritos.addEventListener('click', () => aoNavegar('favoritos'))
  grupoNav.appendChild(btnProdutos)
  grupoNav.appendChild(btnFavoritos)

  const grupoCategoria = document.createElement('div')
  grupoCategoria.className = 'grupo grupo-categoria'
  const selectCategoria = document.createElement('select')
  const optTodas = document.createElement('option')
  optTodas.value = 'all'
  optTodas.textContent = 'Todas as categorias'
  selectCategoria.appendChild(optTodas)
  categorias.forEach(c => {
    const o = document.createElement('option')
    o.value = c
    o.textContent = c
    selectCategoria.appendChild(o)
  })
  selectCategoria.addEventListener('change', e => aoMudarCategoria(e.target.value))
  grupoCategoria.appendChild(selectCategoria)

  const grupoBusca = document.createElement('div')
  grupoBusca.className = 'grupo grupo-busca'
  const inputBusca = document.createElement('input')
  inputBusca.type = 'text'
  inputBusca.placeholder = 'Buscar produto...'
  inputBusca.addEventListener('input', e => aoBuscar(e.target.value))
  grupoBusca.appendChild(inputBusca)

  const grupoPreco = document.createElement('div')
  grupoPreco.className = 'grupo grupo-preco'
  const inputMin = document.createElement('input')
  inputMin.type = 'number'
  inputMin.placeholder = 'Preço mín.'
  const inputMax = document.createElement('input')
  inputMax.type = 'number'
  inputMax.placeholder = 'Preço máx.'
  inputMin.addEventListener('input', () => aoMudarPreco(inputMin.value, inputMax.value))
  inputMax.addEventListener('input', () => aoMudarPreco(inputMin.value, inputMax.value))
  grupoPreco.appendChild(inputMin)
  grupoPreco.appendChild(inputMax)

  const grupoAvaliacao = document.createElement('div')
  grupoAvaliacao.className = 'grupo grupo-avaliacao'
  const selectAvaliacao = document.createElement('select')
  ;[0,1,2,3,4].forEach(v => {
    const o = document.createElement('option')
    o.value = String(v)
    o.textContent = v === 0 ? 'Avaliação: qualquer' : `Avaliação: ${v}+`
    selectAvaliacao.appendChild(o)
  })
  selectAvaliacao.addEventListener('change', e => aoMudarAvaliacao(e.target.value))
  grupoAvaliacao.appendChild(selectAvaliacao)

  const grupoTema = document.createElement('div')
  grupoTema.className = 'grupo grupo-tema'
  const btnTema = document.createElement('button')
  btnTema.textContent = temaAtual === 'escuro' ? 'Tema: Escuro' : 'Tema: Claro'
  btnTema.addEventListener('click', () => {
    aoAlternarTema()
    btnTema.textContent = document.documentElement.classList.contains('dark')
      ? 'Tema: Escuro'
      : 'Tema: Claro'
  })
  grupoTema.appendChild(btnTema)

  header.appendChild(titulo)
  header.appendChild(grupoNav)
  header.appendChild(grupoCategoria)
  header.appendChild(grupoBusca)
  header.appendChild(grupoPreco)
  header.appendChild(grupoAvaliacao)
  header.appendChild(grupoTema)

  return header
}
