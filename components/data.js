const URL_API = 'https://fakestoreapi.com'

let cacheProdutos = null
let cacheCategorias = null

export async function obterProdutos() {
  if (cacheProdutos) return cacheProdutos
  const resposta = await fetch(`${URL_API}/products`)
  if (!resposta.ok) throw new Error('Erro ao carregar produtos')
  const dados = await resposta.json()
  cacheProdutos = dados.map(p => ({
    id: p.id,
    titulo: p.title,
    preco: p.price,
    imagem: p.image,
    categoria: p.category,
    avaliacao: p.rating?.rate ?? 0,
    qtdeAvaliacoes: p.rating?.count ?? 0
  }))
  return cacheProdutos
}

export async function obterCategorias() {
  if (cacheCategorias) return cacheCategorias
  const resposta = await fetch(`${URL_API}/products/categories`)
  if (!resposta.ok) throw new Error('Erro ao carregar categorias')
  cacheCategorias = await resposta.json()
  return cacheCategorias
}

export function filtrarPorTexto(lista, texto) {
  const q = texto.trim().toLowerCase()
  if (!q) return lista
  return lista.filter(p => p.titulo.toLowerCase().includes(q))
}

export function filtrarPorCategoria(lista, categoria) {
  if (!categoria || categoria === 'all') return lista
  return lista.filter(p => p.categoria === categoria)
}

export function filtrarPorPrecoIntervalo(lista, minimo, maximo) {
  const min = minimo == null || minimo === '' ? -Infinity : Number(minimo)
  const max = maximo == null || maximo === '' ? Infinity : Number(maximo)
  return lista.filter(p => p.preco >= min && p.preco <= max)
}

export function filtrarPorAvaliacao(lista, minAvaliacao) {
  const min = Number(minAvaliacao) || 0
  return lista.filter(p => p.avaliacao >= min)
}
