import styled from "styled-components";

export const Container = styled.div`
        width:300px;
        height:500px;
        border-top: none;
        border-radius: 10px;
        overflow:hidden;
        box-shadow:0 0 0 2px #819BA0 inset;
        .note{

            overflow: hidden;
        }
        img{
            width:300px;
            height:350px;
            object-fit: cover;
            border-radius: 10px;
        }
        h2{
            margin-left: 15px;
        }

    p{
        margin:  0 15px;
        display:flex;
        width:250px;
        height:70px;
        overflow-y: scroll;
        color: #575757;
        }
    p::-webkit-scrollbar{
        visibility: hidden;
    }
    
`