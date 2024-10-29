import ProductModel from "@/models/Product.model";
import { connect, disconnect } from "@/utils/mongo";
import { NextRequest, NextResponse } from "next/server";







export async function GET (req: NextRequest,{params}:{params:{slug:string}}) {

    const titleFind = await params.slug.replace(/-/g,' ');

    try {

        await connect();
        const product = await ProductModel.exists({title:titleFind});
        await disconnect();

        if ( !product ) return NextResponse.json(false, { status: 404 })

        return NextResponse.json(true)
    } catch (error) {
        return NextResponse.json(false)
    }

}