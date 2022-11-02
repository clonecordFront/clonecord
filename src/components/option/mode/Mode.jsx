import React, {useState} from 'react'
import { useModeText } from './ModeText';


export default function Mode() {
  const {textTheme, setTextTheme} = useModeText();

  const [checked, setChecked] = useState(false);
  const handleSwitch = (e) => {
    setTextTheme((state) => (state === 'Light'? 'Dark':'Light'))
    setChecked(e);
    console.log(e);
  }

  return (
    <div className='modeHeader' id={textTheme}>
      <div
        onChange={handleSwitch}
        checked={checked}
        style={{width:'100px', height:'100px', backgroundColor:'white'}}
      >Mode</div>

    </div>
  )
}