import React from 'react'
import Notification from './Notification'
import  renderer from 'react-test-renderer'

it('renders correctly when error', () => {
    const message = {
        message: 'test message error',
        error: true,
    }
    const tree = renderer
        .create(<Notification message={message} />)
        .toJSON()

    expect(tree).toMatchSnapshot()
})

it('renders correctly when success', () => {
    const message = {
        message: 'test message success',
        error: false,
    }
    const tree = renderer
        .create(<Notification message={message} />)
        .toJSON()
        
    expect(tree).toMatchSnapshot()
})