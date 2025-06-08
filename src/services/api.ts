// import { ICard } from '@/types/type';
import { IAddCard, IAddCategory, ICard, ICardStatusUpdate, IEditCard, IGetCategory, ILoginFormData, ILoginResponse, IRegisterFormData, IRegisterResponse, IVerifyUser } from '@/types/type';
import axios from 'axios';
import { ParamValue } from 'next/dist/server/request/params';
import Cookies from "js-cookie";






const apiClient = axios.create({
  // baseURL: "http://localhost:5000/"
  baseURL: "https://ankibro-back.liara.run/"
});


export const getAuthToken = () => {
  return Cookies.get("authToken") || null; // Returns token or null
};





// export const client = axios.create({
//     baseURL: "http://localhost:5000/"
//     // baseURL: "https://fullstackproject-production.up.railway.app/"
// })




// export async function getCard() {
//     const data = await client("/cards")
//     return data.data
//     // console.log(data )
// }


//////////////////////////////////////cards//////////////////////////////////////////
export const fetchCards = async (category_id: ParamValue): Promise<ICard[]> => {
  const token = getAuthToken();
  const response = await apiClient.get<ICard[]>(`/api/cards/${category_id}/`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  });
  return response.data;
};

export const postCard = async (newCard: IAddCard, category_id: ParamValue): Promise<IAddCard> => {
  const token = getAuthToken();
  const response = await apiClient.post<IAddCard>(`api/cards/${category_id}/`, newCard, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  });
  return response.data;
};


export const editCard = async (editedCard: IEditCard, category_id: ParamValue, card_id: ParamValue): Promise<IEditCard> => {
  const response = await apiClient.put<IEditCard>(
    `/api/cards/${category_id}/${card_id}`,
    editedCard
  );

  return response.data;
};


export const updateCardsBatch = async (cards: ICardStatusUpdate[]): Promise<ICardStatusUpdate[]> => {
  const response = await apiClient.post<ICardStatusUpdate[]>('api/cards/batch', cards)
  //    {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ cards }),
  // });
  if (!response) {
    throw new Error('Failed to update cards');
  }
  return Array.isArray(response.data) ? response.data : [];;
}


export const deleteCard = async (card_id: number, category_id: ParamValue): Promise<number> => {
  const response = await apiClient.delete<number>(`api/cards/${category_id}/${card_id}`);
  return response.data;
};


// export const useCards = () => {
//   return useQuery<ICard[]>({
//     queryKey: ['cards'],
//     queryFn: fetchCards
//   });
// };


//////////////////////////////////////categories//////////////////////////////////////////
export const fetchCategories = async (): Promise<IGetCategory> => {
  const token = getAuthToken();
  const response = await apiClient.get<IGetCategory>('api/categories', {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  });

  return response.data;
};

export const postCategory = async (newCategory: IAddCategory): Promise<IAddCategory> => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token missing");
  const response = await apiClient.post<IAddCategory>(
    "/api/categories/",
    newCategory,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    }
  );

  return response.data;
};

export const editCategory = async (newCategory: IAddCategory, cat_id: number): Promise<IAddCategory> => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token missing");
  const response = await apiClient.put<IAddCategory>(
    `/api/categories/${cat_id}`,
    newCategory,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    }
  );

  return response.data;
};

export const deleteCategory = async (cat_id: number): Promise<number> => {
  const token = getAuthToken();
  const response = await apiClient.delete<number>(
    `/api/categories/${cat_id}`, // Pass cat_id in the URL
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    }
  );
  return response.data;
};



// export const fetchCategories = () => {
//   return useQuery<ICard[]>({
//     queryKey: ['cards'],
//     queryFn: fetchCards
//   });
// };


// export async function getCards(category_id:ParamValue) { 
//    return await client(`https://fullstackproject-production.up.railway.app/api/${category_id}/cards`);
// }


//////////////////////////////////////register & login//////////////////////////////////////////
export const postRegister = async (data: IRegisterFormData): Promise<IRegisterResponse> => {
  const response = await apiClient.post<IRegisterResponse>("/api/auth/register", data, {
    withCredentials: true,
  });
  return { ...response, message: response.data.message };
  // return { message: response.data.message, headers: response.headers }
}

export const postLogin = async (data: ILoginFormData): Promise<ILoginResponse> => {
  const response = await apiClient.post<ILoginResponse>("/api/auth/login", data, {
    withCredentials: true,
  });
  return { ...response, message: response.data.message };
}

export const postVerifyUser = async (): Promise<IVerifyUser | null> => {
  const token = getAuthToken();
  //  if (!token) throw new Error("Authentication token is missing");
  if (!token) return null

  const response = await apiClient.post<IVerifyUser>(
    "/api/auth/verify_token",
    {}, // No body needed for token verification
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    }
  );
  return { ...response, isValid: response.data.isValid };
}



//////////////////////////////////////CSV Import & export//////////////////////////////////////////
export const postCSVImport = async (formData: FormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token is missing");

  const response = await apiClient.post<FormData>(
    "/api/csv/import",
    formData, // No body needed for token verification
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": token,
      },
    }
  );
  return response;
}


export const getCSVExport = async () => {
  const token = getAuthToken();
  const response = await apiClient.get('/api/csv/export',
    //   {
    //   withCredentials: true,
    //   responseType: 'blob',
    // }
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      responseType: 'blob',
    });

  return response.data;
}

