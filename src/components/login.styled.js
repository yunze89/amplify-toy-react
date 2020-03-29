import styled, {css} from 'styled-components'
import { lighten } from 'polished';

export const StyledButton = styled.button`
    outline: none;
    border: none;
    border-radius: 4px;
    color: ${props => props.color || 'white'};
    padding-left: 1rem;
    padding-right: 1rem;
    margin: 0.135rem;

    height: 2.25rem;
    font-size: 1rem;
    
    ${props => css`
        background: ${props.backgroundColor || 'black'};
        &:hover{
            background: ${lighten(0.2,props.backgroundColor || 'black')}
        }
    `}
    
`;

export const LoginInput = styled.input`
    margin-right: 5px;
    height: 1.55rem;
`;
