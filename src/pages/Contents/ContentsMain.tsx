import './style.css'
import { useEffect, useRef, useState } from 'react';

interface historyList {
  no : number;
  contents : contentsType[]
}

type contentsType = {
    no : number,
    title: string,
    body : string
}

function ContentsMain() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [historyList, setHistoryList] = useState<historyList | null>(null)

    const refData = useRef<any>(null)

    const contents = useRef<any>(null)
    const title = useRef<any>(null)

    const getData = async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => response.json())
            .then((json) => json);
        
        console.log(data)
        refData.current = data
        if(refData){
            setIsLoading(true)
        }
    }

    const handleSave = () => {
        refData.current.title = title.current.value
        refData.current.body = contents.current.value
        
        setHistoryList((prev) => {
            if(prev) {
                return {no : prev.no+1,
                    contents : [...prev.contents, {no: prev.no+1, title: title.current.value, body: contents.current.value}]
                }
            }

            return {
                no: 1, 
                contents: [{no: 1, title : title.current.value, body: contents.current.value}]}
        })
    }

    const handleReset = () => {
        title.current.value = refData.current.title
        contents.current.value = refData.current.body
    }
    
    const handleLoadHistoryRow = (value:contentsType) => {
        title.current.value = value.title
        contents.current.value = value.body
    }

    useEffect(() => {
        getData();
    }, [])

  return (
    <div className='contents-body'>
        <div className='body'>

            <div>
                <h3>Data</h3>
                <div className='ref-contents'>
                    {isLoading &&
                        <>
                            제목
                            <div>
                                {refData.current?.title}
                            </div>
                            내용 
                            <div>
                                {refData.current?.body}

                            </div>
                        </>
                    }
                </div>
            </div>
            <div>
                <h3>Contents</h3>
                <div className='modify-container'>
                    { isLoading &&
                        <div className='contents'>
                            <div className='title'>
                                제목 : 
                                <input defaultValue={ refData.current.title} ref={title}></input>
                            </div>
                            <div className='contents'>
                                내용 : 
                                <input defaultValue={refData.current.body} ref={contents}></input>
                            </div>
                        </div>
                    }
                    <div className='buttons'>
                        <button onClick={handleReset}>초기화</button>
                        <button onClick={handleSave}>저장</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3>History</h3>
        <div className='history-contents'>
            {historyList && historyList.contents.map((item) => {
                return (
                    <>
                        <div onClick={() => handleLoadHistoryRow(item)}>
                            {item.no} | {item.title}
                        </div>
                    </>
                )
            })
            }
        </div>
        </div>
    </div>
  )
}


export default ContentsMain
