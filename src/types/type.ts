export interface ICategory {
    cat_id: number;
    cat_name: string;
}


export interface ICategoryPage {
    // params: Promise<{ categoryId: string }>
    categoryId: string;

}

export interface IAddCategory{
cat_name:string;
}

//card
export interface IAddCard{
    title:string;
    description:string;
}

export interface ICard {
    card_id:number;
    title:string;
    description:string;
    review_passed:number;
    last_review_rate:'fehl'|'schwer'|'gut'|'leicht';
}

export interface ICardPreview{
    card_id:number;
    title:string;
}


export interface ICC{
  cards:ICard[]
}

