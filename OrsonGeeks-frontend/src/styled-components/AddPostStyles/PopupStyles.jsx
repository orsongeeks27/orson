import styled from "styled-components";



const PopupStyled=styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    .back{
        position:absolute;
    }
`
export default PopupStyled;

export const SelectionStyle=styled.div`
    display: flex;
    width:35vw;
    justify-content:space-between;
    margin:0 50px;
    /* transition: 0.3s; */
    flex-direction: ${({content}) => content === 'post' ? 'row' : 'row-reverse' };
   button:first-of-type{
      
  border:none;
  background-color: transparent;
  color:#819ba0;
  font-size: 1.2rem;
  cursor: pointer;
        
            font-weight: ${({content}) => content === 'post' && "bold"};
            color: ${({content}) => content === 'post' && "black"};
            transform: ${({content}) => content === 'post' && "scale(1.5)"};
        
    }
   button:last-of-type{
      
  border:none;
  background-color: transparent;
  color:#819ba0;
  font-size: 1.2rem;
  cursor: pointer;
        
  font-weight: ${({content}) => content === 'discuss' && "bold"};
            color: ${({content}) => content === 'discuss' && "black"};
            transform: ${({content}) => content === 'discuss' && "scale(1.5)"};
        
    }

`