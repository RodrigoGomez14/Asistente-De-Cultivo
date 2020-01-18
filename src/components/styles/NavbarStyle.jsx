import styled, {keyframes,css} from 'styled-components'


const slideLeftKeyframes = keyframes`
    from{
        right:-10%;
    }
    to{
        right:0%
    }
`
const slideLeft = css`
    animation: 1s ${slideLeftKeyframes} ease-in-out both;
    z-index:1
`

const slideRightKeyframes = keyframes`
    from{
        right:0%;
    }
    to{
        right:-10%
    }
`
const slideRight = css`
    animation: 1s ${slideLeftKeyframes} ease-in-out both;
`
export const Navbar=styled.nav`
    ${slideLeft};
    position:absolute;
    top:0;
    right:-10%;
    background-color:rgb(34,153,84,0.8);
    height:100%;
    width:10%;
    .out{
        ${slideRight}
    }
`