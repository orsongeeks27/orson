import styled from "styled-components";

export const NoteContainer=styled.div`
margin-top: 40px;
width: 40vw;
height:30vh;
display: flex;
position:relative;
flex-direction: column;
/* border:0.2px solid #819ba0; */
box-shadow: 0px 0px 4px 0px #819ba0;
border-radius: 10px;
.Title{
    border-radius: 10px 10px 0px 0px;
    height: 20%;
    padding: 15px;
    padding-left: 15px;
    font-size: large;
    border: none;
    border-bottom: 0.3px solid #819ba0;
}
.des{
        border-radius: 10px;
        height: 80%;
        border:none;
        padding: 15px;
    }
    .paste{
        position: absolute;
        bottom: 0;
        right:0;
    }
    .paste{
        border:none;
        background-color: transparent;
        bottom:10px;
        right:10px;
        border:0.5px solid #819ba0;
        border-radius: 5px;
    }
`
export const MediaContainer=styled.div`
margin-top: 20px;
    height:40vh;
    width: 40vw;
    display:flex;
    flex-direction:column;
    align-items: center;
    text-align: center;

    img{
        height:30vh;
        width: 40vw;
        margin-top: 20px;
        object-fit: contain;
        border-radius: 10px;
        scroll-snap-align: center;
    }
    .buttons{
        margin: 10px;
        
        button{
            height:20px;
            width:20px;
            text-align: center;
            border:none;
            background-color: transparent;
            cursor: pointer;
            font-size: 1.5rem;
            margin:10px;
        }

    }
    .media{
        display: inline-block;
        height:40vh;
        width: 40vw;
        overflow-x:hidden;
        overflow-y: scroll;
        scroll-snap-type: y mandatory;
    }
    .media::-webkit-scrollbar{
        visibility: hidden;
    }

`
export const SendButton=styled.button`
    background-color: #4CAF50;
    justify-content: center;
    position:absolute;
    bottom:5vh;
    border: none;
    background:linear-gradient(90deg,#14B4FF,#ff6161);
    width:200px;
    height:50px;
    color:white;
    font-size:1.2rem;
    border-radius: 10px;
    cursor:pointer;
`