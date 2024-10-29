import ProductModel from "@/models/Product.model";
import { ProductInterface } from "@/types";
import { connect, disconnect } from "@/utils/mongo";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export const POST = async( req: NextRequest ) => {

    const body:ProductInterface = await req.json();

    if ( body.tags.length == 3 ) return NextResponse.json( 'Debes ingresar al menos 3 tags', { status:400 } );
    if ( body.options.length === 0 ) return NextResponse.json( 'Debes registrar al menos una opción de producto' );


    console.log(body);
    
    try {
        await connect();

        const productExist = await ProductModel.exists( { title:body.title } );
        if( productExist ) return NextResponse.json( 'El producto ya existe en la base de datos', { status:409 } );

        const newProduct = new ProductModel( body );
        const saveProduct = await newProduct.save();
        await disconnect();
        revalidatePath
        return NextResponse.json( saveProduct );
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }

}



export async function GET (req:NextRequest) {
    
    const { searchParams } = new URL( req.url )
    const page = searchParams.get( 'page' ) || 1;
    const search = searchParams.get('search' );
    const category = searchParams.get( 'category' );

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
      limit:20,
      page,
      query,
      sort,
      select:'title options defaultOption likes shared'
    });

    await disconnect();

    return NextResponse.json(products);

}