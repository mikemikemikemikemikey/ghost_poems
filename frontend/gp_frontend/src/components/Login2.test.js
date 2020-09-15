import React from 'react'
import { useDispatch } from 'react-redux'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import Login from './Login'

import * as poemService from '../services/poems'

jest.mock('../services/poems')
const mockHistoryPush = jest.fn()
const mockUseDispatch = jest.fn()
jest.mock('react-router-dom', () => ({
    _esModule:true, 
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }))
jest.mock('react-redux', () => ({
    _esModule:true, 
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockUseDispatch,
}))
jest.mock('../services/login', () => {
    return {
            _esModule:true, 
        login: jest.fn(() => {
            throw new Error()
        })
    }
})
const spy = jest.spyOn(window.localStorage.__proto__, 'setItem')
describe('login component', () => {
    let component
    let loginService
    beforeEach(() => {
        component = render(
              <Login />
        )
    })
    afterEach(() => {
        jest.resetModules()
        jest.clearAllMocks()
        jest.resetAllMocks()
    })
    test('stays on page with failure', async () => {
        poemService.setConfig = jest.fn().mockImplementation(() => Promise.resolve(true))

        const usernameInput = component.container.querySelector('[data-cy=login-username]')
        await fireEvent.change(usernameInput, {
            target: {value: 'gface'}
        })
        const passwordInput = component.container.querySelector('[data-cy=login-password]')
        await fireEvent.change(passwordInput, {
            target: {value: '12345'}
        })
        expect(component.container.querySelector('[data-cy=login-username]').value)
            .toBe('gface')
        const button = component.container.querySelector('[data-cy=login-button]')
        await fireEvent.click(button)
       expect(component.container.querySelector('[data-cy=login-username]').value)
        .toBe('gface')
        expect(mockHistoryPush).not.toHaveBeenCalled()

    })
})
