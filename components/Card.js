import { alternarFavorito, ehFavorito } from './Favoritos.js'

export function criarCard(produto, aoAlternar) {
  const div = document.createElement('div')
  div.className = 'card'

  const img = document.createElement('img')
  img.src = produto.imagem
  img.alt = produto.titulo

  const titulo = document.createElement('h3')
  titulo.textContent = produto.titulo

  const preco = document.createElement('p')
  preco.textContent = `R$ ${produto.preco}`

  const avaliacao = document.createElement('p')
  avaliacao.textContent = `⭐ ${produto.avaliacao.toFixed(1)} (${produto.qtdeAvaliacoes})`

  const estrela = document.createElement('span')
  estrela.className = 'estrela-favorito'
  estrela.textContent = ehFavorito(produto.id) ? '⭐' : '☆'
  estrela.style.cursor = 'pointer'
  estrela.style.fontSize = '1.5rem'
  estrela.style.alignSelf = 'flex-end'

  estrela.addEventListener('click', () => {
    alternarFavorito(produto.id)
    estrela.textContent = ehFavorito(produto.id) ? '⭐' : '☆'
    aoAlternar()
  })

  div.appendChild(img)
  div.appendChild(titulo)
  div.appendChild(preco)
  div.appendChild(avaliacao)
  div.appendChild(estrela)

  return div
}
