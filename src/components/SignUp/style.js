import styled from 'styled-components';

export const Wrapper = styled.div`
width: 800px;
margin: auto;
background-color: ${props => props.color ? props.color : 'gray'}
`;

export const Form = styled.form`
display: flex;
flex-direction: column;
width: 300px;
margin: auto;
& > input {
    margin-bottom: 0.2rem;
}
`