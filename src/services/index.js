import axios from "axios"
import { LIMIT_POKEMON, BASE_URL } from '../env'

export const getPokemons = async ({ filter = '' } = {}) => {
  if (!getPokemons._cache) {
    try {
      const { data: { results } } = await axios.get(`${BASE_URL}/pokemon?limit=${LIMIT_POKEMON}`)
      getPokemons._cache = results.sort((a, b) => a.name > b.name ? 1 : -1)
    } catch (e) {
      console.error('Imposible get data', e)
      throw new Error('Imposible get data')
    }
  }
  return getPokemons._cache.filter(pokemon => pokemon.name.toLowerCase().includes(filter.toLowerCase()))
}

export const getDetails = async ({ url } = {}) => {
  try {
    if (!url) {
      throw new Error('Not defined url')
    }
    const { data: { sprites: { back_default: sprite }, abilities, forms, name, moves } } = await axios.get(url)
    return { sprite, abilities: abilities.filter(ability => !ability.is_hidden), name, forms, moves: moves.sort((a, b) => Number(b.move.url.replaceAll(new RegExp('.*/([0-9]+)/$', 'gi'), '$1')) - Number(a.move.url.replaceAll(new RegExp('.*/([0-9]+)/$', 'gi'), '$1'))) }
  } catch (e) {
    console.error('Imposible get data', e)
    throw new Error('Imposible get data')
  }
}

export const getForms = async ({ forms = [] } = {}) => {
  try {
    const promises = forms.map(form => axios.get(form.url))
    const response = await Promise.all(promises)
    return response.map(item => {
      const { data: { id, is_battle_only } } = item
      return { id, is_battle_only }
    })
  } catch (e) {
    console.error('Imposible get data', e)
    throw new Error('Imposible get data')
  }
}
