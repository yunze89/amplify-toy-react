import styled, {css} from 'styled-components'

const StyledButton = styled.button`
    outline: none;
    border: none;
    border-radius: 4px;
    color: ${props => props.color || 'white'};
    padding-left: 1rem;
    padding-right: 1rem;

    height: 2.25rem;
    font-size: 1rem;
    
    ${props => css`
        background: ${props.backgroundColor || 'black'};
        &:hover{
            background: ${props.backgroundColorHover || 'grey'}
        }
    `}
    
`;

export default StyledButton;
