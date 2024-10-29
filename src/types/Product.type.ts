export interface ProductInterface {
    _id?: string
    title: string
    tags: string[]
    defaultOption: number
    options: ProductOptionInterface[]
    slug?: string
    printInventory?: number
    productInventory?: number
    likes?: number
    shared?: number
    complements?: string[]
}


export interface ProductOptionInterface {
    title: string
    type: string
    imageUrl?: string
    price?: number
}

export interface ProductTypeInterface {
    title: string
    displayImage?: string
    price: number
    description?: string
}