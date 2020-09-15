import styled from 'styled-components'

export const Button = styled.button`
  cursor: pointer;
  background: ${(props) => (props.enjoyed ? 'palevioletred'
    : 'transparent')};
  font-size 1em;
  color: ${(props) => (props.enjoyed ? 'white'
    : '#f2e8bf')};
  border: 2px solid palevioletred;
  margin: .25em .25em;
  padding: 0.25em 1em;
  transition: .5s all ease-out;

  &:hover {
    background-color: palevioletred;
    color: white;
  }
  &:focus {
    background-color: palevioletred;
    color: white;
  }
`
export const Navigation = styled.div`
display: flex;
justify-content: space-evenly;
flex-wrap: wrap;
background: transparent;
padding: 1em;
position: sticky;
top: 0;
z-index: 2;
text-align: center;
`
export const Input = styled.input`
background-color: transparent;
border: 2px solid #f2e8bf;
font-size 1em;
color: #f2e8bf;
max-width 90%;
`

export const StyledPoem = styled.div`
max-width: 80%;
background-color: transparent;
border-bottom: 2px solid gray;

`

export const StyledLabel = styled.label`
position: absolute;
width: 20%;
top: 8.2%;
right: 8%;
z-index: 1;
`

export const StyledTextArea = styled.textarea`
background-color: transparent;
border: 2px solid #f2e8bf;
font-size 16px;
color: #f2e8bf;
max-width 90%;
`
