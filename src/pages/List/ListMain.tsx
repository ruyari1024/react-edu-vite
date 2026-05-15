import type { listItemType } from '../../components/ListItem/ListItem'
import ListItem from '../../components/ListItem/ListItem'
import { useFieldArray, useForm } from 'react-hook-form';

interface formType {
  phoneticList : listItemType[];
  newItem: string
}

function ListMain() {

  const {control, register, getValues, resetField} = useForm<formType>({
    defaultValues: {
      phoneticList: [{title: 'alpha', id: 1}
    , {title: 'bravo', id: 2}
    , {title: 'charlie', id: 3}
    , {title: 'delta', id: 4}
    , {title: 'echo', id: 5}
    , {title: 'foxtrot', id: 6}],
    newItem: ''
    }
  })

  const {fields, append, remove} = useFieldArray({control, name: 'phoneticList'})
  
  const handleAddList = () => {
    const value = getValues('newItem')
    if(value) {
      append({title: value, id: fields.length})
      resetField('newItem')
    }
  }
  
  const handleDeleteList = (target:number) => {
    remove(target)
  }

  const handleEnterKey = (e:any) => {
    if(e.key === 'Enter') {
      handleAddList()
    }
  }

  return (
    <div className='body'>
      <div className='list-contents'>
        {
        fields.map((item, index) => {
          return (
            <ListItem item={item} index={index} handleDelete={() => {handleDeleteList(index)}} key={item.id}></ListItem>
          )
        })
        }
      </div>

      <div className='input-field-container'>
        <input className='input' {...register("newItem")} onKeyDown={handleEnterKey}></input> 
        <button className='plus-btn' onClick={handleAddList}>+</button>
      </div>
    </div>
  )
}


export default ListMain
