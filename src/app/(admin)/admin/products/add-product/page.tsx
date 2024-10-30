'use client'
import {Chip} from "@nextui-org/chip";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {Checkbox} from "@nextui-org/checkbox";



import React, { useEffect, useRef, useState } from 'react'
import { productOptions } from "@/data/ProductOptions";
import Image from "next/image";
import { Reorder } from "framer-motion";
import { storage } from "@/utils/firebase";
import { slugify } from "@/utils/urlUtils";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ProductInterface, ProductOptionInterface } from "@/types";
import { useRouter } from "next/navigation";


const page = () => {

  const [ loading, setLoading] = useState(false);

  const [ tags, setTags ] = useState<string[]>([]);
  const [ inputTag, setInputTag ] = useState<string>()

  const [ title, setTitle ] = useState<string>('');
  const [ titleError, setTitleError ] = useState<string>('')
  const [ lasTitle, setLastTitle ] = useState<string>('')

  const [ selectedImage, setSelectedImage ] = useState<Blob|undefined>(undefined);
  const [ optionLabel, setOptionLabel ] = useState('');
  const [ optionLabelError, setOptionLabelError] = useState(false)
  const [ optionType, setOptiontype ] = useState('');
  const [defaultOption, setDefaultOption] = useState(0);
  const [ options, setOptions ] = useState<{file:Blob,label:string,type:string}[]>([]);

  const router = useRouter();


  useEffect(()=>{
    fetch('/image.webp').then((res)=>{
      res.blob().then(img=>{
        setOptions([
          {
            file:img,
            label:'Mug Clásico Blanco',
            type:'Mug Clásico Blanco'
          },
          {
            file:img,
            label:'Mug Clásico Negro',
            type:'Mug Clásico Color'
          },
          {
            file:img,
            label:'Mug Clásico Azul',
            type:'Mug Clásico Color'
          },
          ...options,
        ])
      })
    })
  },[])

  const inputImageRef:any = useRef(null);

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

  const handleInputTitleBlur = async () => {
    if ( title.length <= 3 || title.toLowerCase() === lasTitle.toLowerCase()) return;
    setTitleError('loading');
  }

  const handleAddOption = () => {
    if ( !selectedImage ) return;
    if( optionLabel.length <= 2) {
      setOptionLabelError(true);
      return;
    }

    setOptionLabelError(false);
    setOptions([
      {
        file: selectedImage!,
        label:optionLabel,
        type: optionType
      },
      ...options
    ]);
    setOptionLabel('');
    setSelectedImage(undefined);

  }

  const handleDeleteOption = (i:number) => {
    const newOptions = [...options];
    newOptions.splice(i,1);
    setOptions(newOptions)
  }


  const handleSaveProduct = async () => {

    
    if(options.length <= 0) return;
    if(tags.length <= 0 ) return;
    if(!title) return;

    console.log(options)

    setLoading(true)
    const productOptions = options.map(async(op,i)=>{
      const fileRef = ref(storage,`products/${slugify(title)}-${slugify(op.label)}`);
      await uploadBytes(fileRef, op.file)
      const url = await getDownloadURL(fileRef);
      const toReturn:ProductOptionInterface = {
        title:op.label,
        imageUrl:url,
        type: op.type
      }
      return toReturn
    })

    const toSaveProductOptions = await Promise.all(productOptions);

    const toSaveProduct:ProductInterface = {
      title:title,
      defaultOption:defaultOption,
      options:toSaveProductOptions,
      tags:tags,
    }

    const response = await fetch("/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSaveProduct),
    });

    alert('correct')
    router.replace('/');


  }


  return (
    <main className='w-full h-screen bg-slate-100 flex flex-col gap-4 p-4'>

      <h1>Nuevo Producto</h1>

      <div className='p-4 bg-white rounded-md shadow-md flex flex-col gap-4'>

        <h2 className="font-bold text-default-600">Información Básica</h2>

        <div className="relative rounded-lg overflow-hidden">
          <Input
            disabled={loading}
            label='Título del producto'
            size="sm"
            onBlur={handleInputTitleBlur}
            value={ title }
            onChange={ e => setTitle(e.target.value) }
            errorMessage={titleError && titleError !== 'loading' ? titleError: null}
            isInvalid={!!titleError && titleError!=='loading'}
          />

          {/* <Progress style={{opacity: titleError==='loading'? 1:0 }}  isIndeterminate size="sm" className="-mt-1"/> */}
        </div>


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
                    isDisabled={loading}
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
          disabled={loading}
          label='Nuevo Tag'
          size="sm"
          value={ inputTag }
          onChange={ (e) => setInputTag(e.target.value) }
          onKeyUp={ handleAddTag }
        />

      </div>


      
      <div className='p-4 bg-white rounded-md shadow-md flex flex-col gap-4'>

        <h2 className="font-bold text-default-600">Configuración de Precios</h2>


        <div className="flex gap-2">
          
          <Button isDisabled={loading} className="aspect-square h-full rounded-lg" onClick={()=>inputImageRef.current!.click()}>
            <Image 
              src={ selectedImage ? URL.createObjectURL(selectedImage) : '/image.webp' } 
              className="object-cover"
              alt=""
              fill
              priority
            />
          </Button>

          <div className="flex flex-col gap-3 grow">
            <input
              disabled={loading} onChange={ (e)=> setSelectedImage(e.target.files?.[0]) } type='file'hidden ref={inputImageRef}/>
            <Input
              disabled={loading} 
              label="Etiqueta"
              size="sm"
              value={optionLabel}
              isInvalid={ optionLabelError }
              errorMessage={ optionLabelError && 'Ingresa una etiqueta para la opción válida' }
              onChange={e=>setOptionLabel(e.target.value)}
            />
            <select className="bg-default-100 p-3 text-sm outline-primary text-default-500 rounded-lg shadow-medium" value={optionType} onChange={(e)=>setOptiontype(e.target.value)}>
              {
                productOptions.map((product)=>(
                  <option 
                    key={product.title} 
                    value={product.title}
                  >
                    {`${product.title} - ${product.price}`}
                  </option>
                ))
              }
            </select>
          </div>

        </div>

        <Button isDisabled={loading} onClick={handleAddOption}>Agregar Opción</Button>

        <Reorder.Group axis="y" values={options} onReorder={setOptions} className="flex flex-col gap-2">
          {
            options.map((option,i)=>(

              <Reorder.Item value={option}  className=" bg-white flex shadow-small rounded-lg overflow-hidden" key={ option.label }>

                <Image src={URL.createObjectURL(option.file)} alt="" width={60} height={60}/>
                <div className="grow p-2 flex">

                  <div className="flex flex-col grow">
                    <strong>{option.label}</strong>
                    <span>{option.type}</span>
                  </div>
                  <div className="flex gap-4 justify-center items-center">
                    <Button isDisabled={loading} color="danger" variant="light" size="sm" onClick={()=>handleDeleteOption(i)}>Eliminar</Button>
                    <Checkbox isSelected={defaultOption==i} onClick={()=>setDefaultOption(i)}/>
                  </div>
                </div>

              </Reorder.Item>
              
            ))
          }
        </Reorder.Group>
      </div>


      <Button isLoading={loading} isDisabled={loading} onClick={handleSaveProduct} color="primary">Registrar Producto</Button>
    </main>
  )
}

export default page