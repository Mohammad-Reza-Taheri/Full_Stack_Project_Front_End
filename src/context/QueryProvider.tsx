// 'use client'


// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useState } from 'react';



// interface IQueryProviderProps {
// children:React.ReactNode;
// }

// const QueryProvider = ({children} : IQueryProviderProps) => {
//     const [queryClient]=useState(()=> new QueryClient())
//   return (
//     <QueryClientProvider client={queryClient }>{children}</QueryClientProvider>
//   )
// }

// export default QueryProvider


// 'use client'
// export const dynamic = 'force-dynamic';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useState } from 'react';

// interface IQueryProviderProps {
//     children: React.ReactNode;
// }

// const QueryProvider = ({ children }: IQueryProviderProps) => {
//     const [queryClient] = useState(() => new QueryClient())
//     return (
//         <QueryClientProvider client={queryClient}>
//             {children}
//         </QueryClientProvider >

//     )
// }

// export default QueryProvider;


///////////////////////////////

'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface IQueryProviderProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient(); // Initialize outside to prevent re-creation

const QueryProvider = ({ children }: IQueryProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;


