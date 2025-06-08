// src/hooks/useCards.ts
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { ICardStatusUpdate } from '../types/type';
// import { updateCardsBatch } from '@/services/api';

// export const useCards = () => {
//     const queryClient = useQueryClient();

//     // Fetch all cards
//     //   const { data: cards, isLoading, error } = useQuery<ICardStatusUpdate[]>({
//     //     queryKey: ['cards'],
//     //     queryFn: CardApi.fetchAllCards,
//     //   });

//     // Batch update mutation
//     const updateCardsBatchMutation = useMutation<ICardStatusUpdate[], Error, ICardStatusUpdate[]>({
//         mutationFn: updateCardsBatch,
//         onSuccess: (updatedCards) => {
//             // Update the cache with the new data
//             queryClient.setQueryData(['cards'], (old: ICardStatusUpdate[] | undefined) => {
//                 if (!old) return updatedCards;
//                 return old.map(card => {
//                     const updatedCard = updatedCards.find(c => c.card_id === card.card_id);
//                     return updatedCard || card;
//                 });
//             });
//         },
//         onError: (error) => {
//             console.error('Batch update failed:', error);
//         }
//     });

//     return {
//         updateCardsBatchMutation: (cards: ICardStatusUpdate[]) => updateCardsBatchMutation.mutateAsync(cards),
//         isUpdating: updateCardsBatchMutation.isPending,
//     };
// };


///////////////////////////////////////////////////


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICardStatusUpdate } from '../types/type';
import { updateCardsBatch } from '@/services/api';

export const useCards = () => {
    const queryClient = useQueryClient();

    // Batch update mutation
    const updateCardsBatchMutation = useMutation<ICardStatusUpdate[], Error, ICardStatusUpdate[]>({
        mutationFn: updateCardsBatch,
        onSuccess: (updatedCards) => {
            // Log current cached cards for debugging
            console.log("Current cached cards:", queryClient.getQueryData(['cards']));

            // Update the cache with the new data safely
            queryClient.setQueryData(['cards'], (old: ICardStatusUpdate[] | undefined) => {
                const safeOld = Array.isArray(old) ? old : []; // Ensure old is always an array
                return safeOld.map(card => {
                    const updatedCard = updatedCards.find(c => c.card_id === card.card_id);
                    return updatedCard || card;
                });
            });
        },
        onError: (error) => {
            console.error('Batch update failed:', error);
        }
    });

    return {
        updateCardsBatchMutation: (cards: ICardStatusUpdate[]) => updateCardsBatchMutation.mutateAsync(cards),
        isUpdating: updateCardsBatchMutation.isPending,
    };
};