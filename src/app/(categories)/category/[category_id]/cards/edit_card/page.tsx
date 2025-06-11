'use client'
export const dynamic = 'force-dynamic';
import { redirect, useParams } from "next/navigation"

const EditCard = () => {
    const params = useParams();
    const category_id = params?.category_id as string;
    return redirect(`/category/${category_id}`)
}

export default EditCard