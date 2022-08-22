import { useEffect, useRef } from "react"
import { useState } from "react"
import styled from "styled-components"
import {useThrottle} from "use-throttle"

export default function SearchBar({inputQueryHadler,suggesttions}){
    const [inputText,setInputText]=useState("")
    const[active,setActive]=useState(0)
    const scrollRef=useRef()

    const handleInputChange=(e)=>{
        setInputText(e.target.value)
    }
    const handleKeyUp=(e)=>{
            switch(e.keyCode){
                case 38:
                    // 38 up arrow
                    if(active===0){
                        scrollRef.current.scrollTop=suggesttions.length*38.667;
                        setActive(suggesttions.length)
                    }
                    else if(active<=suggesttions.length -3){
                        scrollRef.current.scrollTop -=38.667
                    }
                    setActive((prev)=>prev-1)
                     break;

                case 40:
                    if(active===suggesttions.length){
                        scrollRef.current.scrollTop=0;
                        setActive(0)
                    }
                    else if(active >= 4){
                        scrollRef.current.scrollTop+=38.667;
                     }
                    setActive((prev)=>prev+1)
                    
                     break;
                //40 down arrow


                default: return;
            }

    }
    const throttledText=useThrottle(inputText,1000)

    useEffect(()=>{
        //set the query string in App.jsx
           inputQueryHadler(throttledText) 
    },[throttledText,inputQueryHadler])

    return(
        <Wrapper onKeyUp={handleKeyUp}>
        <SearchBarWrapper>
            <InputWrapper type="text" value={inputText}
             onChange={handleInputChange} />
             
        </SearchBarWrapper>
        <SearchBarSuggestions ref={scrollRef} active={active} limit={5} >
        {suggesttions.map((item,index)=>{
            return(
                <div key={index} onMouseOver={()=>{
                    setActive(index+1);
                }}>{item}</div>
            )
        })}
        </SearchBarSuggestions>     
        </Wrapper>
    )
}

const SearchBarWrapper=styled.div`border:1px solid black;
display:flex;
padding: 5px 10 px;
align-items:center;`

const InputWrapper=styled.input`
flex:1;
font-size:20px;
border:none;
outline:none
`
const SearchBarSuggestions=styled.div`
border:1px solid black;
display:flex;
flex-direction:column;
flex:0 0 auto;
margin:auto;
max-height:${({limit})=>`${limit * 38.667}px`};
overflow:auto;

& * {
    flex:1;
    text-align:left;
    padding:10 px;
    padding-left:20px;

}
& :nth-child(${({active})=>active}) {
    background:rgba(0, 0, 0, 0.08);
    cursor:pointer;
}
`
const Wrapper=styled.div`

width:400px;
margin:auto;
`