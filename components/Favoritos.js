const CHAVE = 'produtosFavoritos'

export function carregarFavoritos() {
  const salvo = localStorage.getItem(CHAVE)
  return salvo ? JSON.parse(salvo) : []
}

export function salvarFavoritos(lista) {
  localStorage.setItem(CHAVE, JSON.stringify(lista))
}

export function alternarFavorito(id) {
  const favoritos = carregarFavoritos()
  const indice = favoritos.indexOf(id)
  if (indice === -1) {
    favoritos.push(id)
  } else {
    favoritos.splice(indice, 1)
  }
  salvarFavoritos(favoritos)
  return favoritos
}

export function ehFavorito(id) {
  return carregarFavoritos().includes(id)
}

export function obterProdutosFavoritos(listaProdutos) {
  const favoritos = carregarFavoritos()
  return listaProdutos.filter(p => favoritos.includes(p.id))
}
