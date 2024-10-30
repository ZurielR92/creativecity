import ProductModel from "@/models/Product.model";
import { ProductInterface } from "@/types";
import { connect, disconnect } from "@/utils/mongo";
import { NextResponse } from "next/server";





export const createProduct = async ( product: ProductInterface ) => {

    if ( product.tags.length <= 2 ) return NextResponse.json( 'Debes ingresar al menos 3 tags', { status:400 } );
    if ( product.options.length === 0 ) return NextResponse.json( 'Debes registrar al menos una opción de producto' );

    try {
        await connect();

        const productExist = await ProductModel.exists( { title:product.title } );
        if( productExist ) return NextResponse.json( 'El producto ya existe en la base de datos', { status:409 } );

        const newProduct = new ProductModel( product );
        const saveProduct = await newProduct.save();
        await disconnect();
        return NextResponse.json( saveProduct );

    } catch (error) {

        console.log(error)
        return NextResponse.json(error)

    }

}

export const getProducts = async ( page:number, search?:string, category?: string ) => {
    let query = {};
    let sort ={}
    if(search) {
        query = {
        ...query,
        $text:{$search:search}
        }
        sort = {
        ...sort,
        $score:{$meta:'textScore'}
        }
    }
    if(category) {
        query = {
        ...query,
        "options.type": category
        }
    }
    console.log(page)

    await connect();

    const products = await ProductModel.paginate({
      limit:3,
      page,
      query,
      sort,
      select:'title options defaultOption likes shared'
    });

    await disconnect();

    return products;
}