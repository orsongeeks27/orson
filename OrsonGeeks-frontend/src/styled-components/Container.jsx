import styled from "styled-components";

const GridContainer=styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: 40vh auto 40vh;
    height:100%;
    width:100%;
`
export default GridContainer;