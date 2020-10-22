import styled from "styled-components"
import {CssBaseline, Paper,Typography} from "@material-ui/core"

export const CustomPaper = styled(Paper)`
  width:300px;
  margin-left:2vw;
  
`;

export const TodoEdit =  styled.div.attrs((props) => ({ tabIndex: 0 }))`

& .Container{
  margin:2px;
  display:flex;                               
}

&.Container-box{
  flex-grow:1
}
`




