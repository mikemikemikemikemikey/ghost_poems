import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import {renderer } from 'react-test-renderer'
import { prettyDOM, fireEvent } from '@testing-library/dom'
import Poem from './Poem'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as poemService from '../services/poems'
import * as socket from '../services/socket'

const mockStore = configureStore([])
jest.mock('../services/poems')
jest.mock('../services/socket')

describe('Poem test without user logged on', () => {
    let component
    let store
    const user = null
    const childPoem = {
        content: 'child content',
        user: 'ghostface',
        head: 'Test title',
    }
    const poem = {
        title: 'Test title',
        content: 'test content',
        user: 'ghostface',
        likes: 1,
        head: null,
        children: [childPoem]
    }

    beforeEach(() => {
        store = mockStore({
            user
        })
        component = render(
          <Provider store={store}>
              <Poem poem={poem}/>
          </Provider>  
        )
    })
    test('cannot add enjoy', async () => {
        
        const button = component.container.querySelector('[data-cy=enjoy]')
        expect(button).toHaveStyle('background: transparent')
        await fireEvent.click(button)   
        expect(button).toHaveStyle('background: transparent')
        expect(component.container.querySelector('[data-cy=message]').innerHTML).toMatch('please login')
        expect(component.container.querySelector('[data-cy=message]')).toHaveStyle('color: red')
    })
})
describe('Poem test with user logged on', () => {
    let component
    let store
    const user = {
        username: 'ghostface',
        likedPoems: null,
    }
    const childPoem = {
        content: 'child content',
        user: 'ghostface',
        head: 'Test title',
    }
    const poem = {
        title: 'Test title',
        content: 'test content',
        user: 'ghostface',
        likes: 1,
        head: null,
        children: [childPoem]
    }

    beforeEach(() => {
        store = mockStore({
            user
        })
        component = render(
          <Provider store={store}>
              <Poem poem={poem}/>
          </Provider>  
        )
    })

    test('renders its children', () => {
        expect(
            component.container.querySelector('.poem-content')
        ).toBeDefined()
    })
    test('enjoy button changes color on click', async () => {
        poemService.addLike = jest.fn().mockImplementation(() => Promise.resolve(true))
        socket.emit = jest.fn()
        
        const button = component.container.querySelector('[data-cy=enjoy]')
        expect(button).toHaveStyle('background: transparent')
        await fireEvent.click(button)   
        expect(button).toHaveStyle('background: palevioletred')

    })
    test('able to toggle and submit form', async () => {
        poemService.addContent = jest.fn().mockImplementation(() => Promise.resolve(true))
        socket.emit = jest.fn()

        const button = component.container.querySelector('[data-cy = contribute-toggle]')
        
        await fireEvent.click(button)
        const input = component.container.querySelector('[data-cy=content-input]')
        await fireEvent.change(input, {
            target: {value: 'new line of poem'}
        })
        expect(component.container.querySelector('[data-cy = contribute-toggle]')).toBeNull()
        const button2 = component.container.querySelector('[data-cy=content-submit]')
        await fireEvent.click(button2)
        
        expect(component.container.querySelector('[data-cy = contribute-toggle]')).toBeDefined()


    })
})    
jest.mock('../services/users', () => {
    return {
        _esModule:true, 
        default: jest.fn(()=> 42),
        getUser: jest.fn(()=> (
            {
            username: 'ghostface',
            likedPoems: ['12345'],
        }))
    }
})
describe('pre enjoyed poem causes enjoy button to fire unlike',  () => {
    
    let component
    let store
    const user = {
        username: 'ghostface',
        likedPoems: ['12345'],
    }
    const childPoem = {
        content: 'child content',
        user: 'ghostface',
        head: 'Test title',
    }
    const poem = {
        title: 'Test title',
        content: 'test content',
        user: 'ghostface',
        likes: 1,
        head: null,
        children: [childPoem],
        _id: '12345'
    }


    beforeEach(() => {
        store = mockStore({
            user
        })
        component = render(
          <Provider store={store}>
              <Poem poem={poem}/>
          </Provider>  
        )
    })
    test('enjoy start right color and changes', async () => {        
        poemService.removeLike = jest.fn().mockImplementation(() => Promise.resolve(true))
        socket.emit = jest.fn()
        
        const button = component.container.querySelector('[data-cy=enjoy]')
        expect(button).toHaveStyle('background: palevioletred')
        await fireEvent.click(button)   
        expect(button).toHaveStyle('background: transparent')
        
    })
})