import React from 'react'


const style = {
  minHeight:"100vh",
  textAlign:"center",
  paddingTop:"10rem",
  backgroundColor:"#f5f5f5"
}

const StyledOption = styled.div`
  min-height: 100vh;
  text-align: center;
  padding-top: 10rem;
  background-color: #fff;
`

export default function Option() {
  return (
    <>
      <div>Option</div>
      <div style={style}>

      </div>
    </>

  )
}
