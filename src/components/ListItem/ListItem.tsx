import { useState } from "react";
import './style.css'

export type listItemType = {
  title: string,
  id: number
}

type listItemParam = {
    handleDelete: () => any
    index: number
    item : listItemType
};

const ListItem = ({item, index, handleDelete}:listItemParam) => {
  const [active, setActive] = useState<boolean>(true);

  const lightDepth = index*25
  
  return (
    <>
      <div className="item-container">
        <div className='item'
          onClick={() => setActive(!active)} 
          style={
          !active? 
          {backgroundColor:`rgb(${87+lightDepth}, ${93+lightDepth}, ${177+lightDepth})`, 
          color: index < 5 ? '#fdfdfd' : '#322f4d'}
          : {}
          }
          >
          {item.title}
        </div>
        <button className="delete-btn" onClick={handleDelete}>×</button>
      </div>
    
    </>
  )
}

export default ListItem;
