'use client'
import {Input} from "@nextui-org/input";
import {Chip} from "@nextui-org/chip";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";



import React, { useState } from 'react'

const page = () => {

  const [ tags, setTags ] = useState<string[]>([]);
  const [ inputTag, setInputTag ] = useState<string>()

  const handleAddTag = ( e:any ) => {

    if(e.key === 'Enter' && e.target.value.length >= 3) {
      console.log(e.target.value)
      if( tags.includes(e.target.value) ) return;
      setTags(prev=>[...prev, e.target.value]);
      setInputTag('')
    }

  }

  const handleDeleteTag = ( i:number ) => {
    const newTags = [...tags];
    newTags.splice( i,1 )
    setTags(newTags)
  }



  return (
    <main className='w-screen h-screen bg-slate-100 flex items-center justify-center'>
      <div className='p-4 min-w-96 max-w-96 min-h-96 bg-white rounded-md shadow-md flex flex-col gap-4'>
        <h1>Nuevo Producto</h1>

        <Input
          label='Título del producto'
          size="sm"
        />
          {
            tags.length <= 0 ? (
              <div className="border-default-100 border-2 rounded-lg min-h-16 flex items-center justify-center">
                <span className="text-default-400 ">
                  Agrega al menos 3 tags
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 pt-5 pb-5">
              {
                tags.map( ( tag, i )=> (
                  <Chip 
                    key={tag}
                    onClose={()=>handleDeleteTag(i)}
                  > 
                    { tag } 
                  </Chip>
                ))
              }
              </div>
            )
          }

        <Input
          label='Nuevo Tag'
          size="sm"
          value={ inputTag }
          onChange={ (e) => setInputTag(e.target.value) }
          onKeyUp={ handleAddTag }
        />


        <div className="flex gap-2">
          <div className="w-20 h-20 bg-default-100 rounded-lg">

          </div>

          <div className="flex flex-col gap-3 grow">
            <Input size="sm"/>
            <Input type='file' size="sm"/>
          </div>

        </div>




      </div>
    </main>
  )
}

export default page