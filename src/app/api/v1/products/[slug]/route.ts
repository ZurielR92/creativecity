import ProductModel from "@/models/Product.model";
import { connect, disconnect } from "@/utils/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest,{params}:{params:{slug:string}}) {

    const titleFind = await params.slug.replace(/-/g,' ');

    try {

        await connect();
        const product = await ProductModel.findOne({title:titleFind}).select({ file:0, createdAt:0, updatedAt:0 }).lean().collation({ locale: 'es', strength: 1 });
        await disconnect();

        if ( !product ) return NextResponse.json(`El producto al que intenta acceder no está registrado en la base de datos`, { status: 404 })

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(error)
    }

}