import { ProductInterface } from '@/types'
import { Chip } from '@nextui-org/chip'
import Image from 'next/image'
import React, { FC } from 'react'


interface Props {
    product: ProductInterface
}

const AdminProductCard:FC<Props> = ({ product }) => {
  return (
    <div className='overflow-hidden items-center shadow-md rounded-lg bg-white flex min-h-16'>
        <Image src={ product.options[product.defaultOption].imageUrl! } width={64} height={64} alt=''/>
        <div>
            <h3>{product.title}</h3>
        </div>
    </div>
  )
}

export default AdminProductCard