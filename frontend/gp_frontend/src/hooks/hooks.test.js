import { renderHook } from '@testing-library/react-hooks'
import useField from '../hooks'

describe('useField', () => {

    test('initial state', () => {
        const {result} = renderHook(() => useField('text'))
        expect(result.current.type).toEqual('text')
        expect(result.current.value).toBeFalsy()
    })

    test('onChange changes value', () => {
        const {result} = renderHook(() => useField('text'))
        result.current.onChange({target: {value: 'gho'}})

        expect(result.current.value).toEqual('gho')
    })

    test('onSubmit clears value', () => {
        const {result} = renderHook(() => useField('text'))
        result.current.onSubmit()
        expect(result.current.value).toEqual('')
    })
})