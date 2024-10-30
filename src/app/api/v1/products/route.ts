import ProductModel from "@/models/Product.model";
import { createProduct, getProducts } from "@/services/products.service";
import { ProductInterface } from "@/types";
import { connect, disconnect } from "@/utils/mongo";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export const POST = async( req: NextRequest ) => {

    const body:ProductInterface = await req.json();
    return await createProduct(body);

}



export async function GET (req:NextRequest) {
    
    const { searchParams } = new URL( req.url )
    const page = parseInt(searchParams.get( 'page' ) || '1');
    const search = searchParams.get('search' ) || undefined;
    const category = searchParams.get( 'category' ) || undefined;

    return NextResponse.json(await getProducts(page, search, category))


}