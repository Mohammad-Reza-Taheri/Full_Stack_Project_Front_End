import { AxiosResponse } from "axios";
// import { ParamValue } from "next/dist/server/request/params";

export interface ICategory {
  cat_id: number;
  cat_name: string;
  cat_cards_count?: number;
}

export interface IGetCategory {
  message: string;
  categories: ICategory[]
}


export interface ICategoryPage {
  // params: Promise<{ categoryId: string }>
  categoryId: string;

}

//with omit
// export interface IEditCategory extends Omit<ICategory, 'cat_cards_count'> {}

export interface IAddCategory {
  cat_name: string;
}



//card

export interface ICard {
  card_id: number;
  title: string;
  description: string;
  review_passed: number;
  last_review_rate: 'fehl' | 'schwer' | 'gut' | 'leicht';
}

export interface IAddCard {
  title: string;
  description: string;
}

export interface IEditCard {
  card_id: number;
  title: string;
  description: string;
}

// export interface IDeleteCard {
//     id: number
// }
export interface ICardPreview {
  card_id: number;
  title: string;
  // handleDelete(id:number):void
}


export interface ICC {
  cards: ICard[]
  category_id: number
}

export type TCardStatus = 'wrong' | 'hard' | 'good' | 'easy';

export interface ICardStatusUpdate {
  card_id: number;
  status: TCardStatus;
}

export interface BatchCardRequest {
    cards: ICardStatusUpdate[];
}








//register & login
export interface IRegisterFormData {
  username: string;
  email: string;
  password: string;
};

export interface ILoginFormData {
  email: string;
  password: string;
};


// export interface IRegisterResponse {
//   message: string;
//   headers: AxiosResponse["headers"];
// //   headers: AxiosResponseHeaders;
// //   headers: { authorization?: string }; // Token is expected in headers
// };


export interface IRegisterResponse extends AxiosResponse {
  message: string;
}

export interface ILoginResponse extends AxiosResponse {
  message: string;
}

export interface IVerifyUser extends AxiosResponse {
  isValid: boolean;
}
