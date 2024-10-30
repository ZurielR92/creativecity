import { getProducts } from '@/services/products.service'
import React from 'react'
import { AdminProductCard } from '../../components';
import {Pagination, PaginationItem, PaginationCursor} from "@nextui-org/pagination";




const ProductsPage = async () => {

    const products = await getProducts(1);

    return (
        <main className='w-full h-screen max-h-screen bg-slate-100 flex flex-col gap-4 p-4'>

            <h1>Lista de productos</h1>

            <div className='flex flex-col gap-2  overflow-y-auto grow'>
                {
                    products?.docs.map(( doc, i )=>(
                        <AdminProductCard key={doc._id} product={doc}/>
                    ))
                }
                {/* {
                    products?.docs.map(( doc, i )=>(
                        <AdminProductCard key={doc._id} product={doc}/>
                    ))
                }
                {
                    products?.docs.map(( doc, i )=>(
                        <AdminProductCard key={doc._id} product={doc}/>
                    ))
                } */}
            </div>

            <div>
                <Pagination isCompact showControls total={products?.totalPages || 1} initialPage={1} />
            </div>


        </main>
    )
}

export default ProductsPage