import { Answer } from "./Answer"
import { UserCollection } from "./UserCollection"

export interface CardInfo{
    id: string
    collection_id: string
    updated_at: string
    question: string
    question_type: string
    created_at: string 
    answers:[Answer]
    collection: UserCollection,
    my_submissions: any
}