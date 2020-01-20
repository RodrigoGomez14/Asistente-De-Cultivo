import styled, {keyframes,css} from 'styled-components'


const slideLeftKeyframes = keyframes`
    from{
        right:-25%;
        background-color:rgb(34,153,84,0);
    }
    to{
        right:0%;
        background-color:rgb(34,153,84,0.98);
    }
`
const slideLeft = css`
    animation: 1s ${slideLeftKeyframes} ease-in-out both;
    z-index:1
`

export const Navbar=styled.nav`
    ${slideLeft};
    position:absolute;
    top:0;
    right:-25%;
    height:100%;
    width:25%;
`
export const Hr = styled.hr`
    border-top:1px solid white
`