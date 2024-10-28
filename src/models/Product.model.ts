import { ProductInterface } from "@/types"
import mongoose, { Schema } from "mongoose";
import { Pagination, mongoosePagination } from "mongoose-paginate-ts";

const productSchema = new Schema<ProductInterface>({
    title: { type: String, required: true, unique: true },
    tags: [ { type: String } ],
    defaultOption: { type: Number, default: 0
    },
    likes: { type: Number, default: 0 },
    slug: { type: String, required: true },
    shared: { type: Number, default: 0 },
    options: [ {
            type: { type: String, Required: true },
            imageUrl: { type: String, required: true },
        } ],
    complements: [ String ]
},{
    timestamps:true
})


productSchema.index({
    tags:'text',
    title:'text',
});

productSchema.plugin(mongoosePagination);

const ProductModel : any = mongoose.models.Product || mongoose.model<ProductInterface, Pagination<ProductInterface>>( 'Product' ,productSchema );
export default ProductModel as Pagination<ProductInterface>