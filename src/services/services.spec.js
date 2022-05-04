import axios from "axios"
import * as list from './_fake/all.json'
import * as data125 from './_fake/125.json'

import {getPokemons, getDetails, getForms} from './'
import { BASE_URL, LIMIT_POKEMON } from "../env"
import * as forms125 from "./_fake/forms.json"

jest.mock('axios')

describe('getPokemons', () => {
  const orderResults = Object.assign([], list.results).sort((a, b) => a.name > b.name ? 1 : -1)
  const filterResults = [
    {
      name: 'charmander',
      url: "https://pokeapi.co/api/v2/pokemon/4/"
    }
  ]
  const response = {
    data: list
  }
  it('fetches successfully pokemons from API and return order elements', async () => {
    //give
    axios.get.mockResolvedValueOnce(response)
    // when
    const totalResponse = await getPokemons()
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/pokemon?limit=${LIMIT_POKEMON}`)
    expect(totalResponse).toEqual(orderResults)
  })
  it('fetches successfully pokemons from API and return empty array', async () => {
    //give
    axios.get.mockResolvedValueOnce(response)
    // when
    const emptyResponse = await getPokemons({ filter: 'picachu' })
    expect(emptyResponse).toEqual([])
  })
  it('fetches successfully pokemons from API and return data with case sensitive filter', async () => {
    //give
    axios.get.mockResolvedValueOnce(response)
    // when
    const filterResponse = await getPokemons({ filter: 'chARMander' })
    expect(filterResponse).toEqual(filterResults)
  })
})

describe('getDetails', () => {
  const pokemon2search = {
    name: "electabuzz",
    url: "https://pokeapi.co/api/v2/pokemon/125/"
  }
  const response = {
    data: data125
  }
  const { sprites: { back_default: sprite }, abilities, forms, name, moves } = data125
  const result2compare = { sprite, abilities: abilities.filter(ability => !ability.is_hidden), name, forms, moves: Object.assign([], moves).sort((a, b) => Number(b.move.url.replaceAll(new RegExp('.*/([0-9]+)/$', 'gi'), '$1')) - Number(a.move.url.replaceAll(new RegExp('.*/([0-9]+)/$', 'gi'), '$1'))) }
  it('fetches successfully pokemon detail from API', async () => {
    //give
    axios.get.mockResolvedValueOnce(response)
    // when
    const detailResponse = await getDetails(pokemon2search)
    expect(axios.get).toHaveBeenCalledWith(pokemon2search.url)
    expect(detailResponse).toEqual(result2compare)
  })
})

describe('getForms', () => {
  const form2search = [{
    name: "electabuzz",
    url: "https://pokeapi.co/api/v2/pokemon/125/"
  }]
  const response = {
    data: forms125
  }
  const { id, is_battle_only } = forms125
  const result2compare = [{ id, is_battle_only }]

  it('fetches successfully pokemon forms from API', async () => {
    //give
    axios.get.mockResolvedValueOnce(response)
    // when
    const detailResponse = await getForms({ forms: form2search })
    // expect(axios.get).toHaveBeenCalledWith(form2search[0].url)
    expect(detailResponse).toEqual(result2compare)
  })
})
