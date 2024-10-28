export interface ProductInterface {
    _id?: string
    title: string
    tags: string[]
    defaultOption: number
    options: ProductInterface[]
    slug: string
    likes: number
    shared: number
    complements: string[]
}


export interface ProductOptionInterface {
    type: string
    imageUrl: string
    price?: number
}