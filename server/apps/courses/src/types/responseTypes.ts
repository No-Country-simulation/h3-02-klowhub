export interface FilterCoursesSuccess {
    success: boolean;
    message: string;
    courses: Course[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
}

export interface Course {
    id: string;
    userId: string;
    title: string;
    contentType: 'premium' | 'free'; // Literal restringido
    kind: 'course' | 'lesson';
    basicDescription?: string; // Opcional
    platform: string;
    idiom: string;
    reviews: string;
    rating: string;
    pilar?: string; // Opcional
    funcionalidad?: string; // Opcional
    sector?: string; // Opcional
    tool?: string; // Opcional
    purpose?: string; // Opcional
    prerequisites?: string[]; // Opcional
    followUp?: string[]; // Opcional
    contents?: string[]; // Opcional
    detailedContent?: string; // Opcional
    imageUrl?: string; // Opcional
    status: 'in-progress' | 'published' | 'draft';
    enrolledUsers: string[];
    createdAt: string;
    updatedAt: string;
    modules: any[]; // Cambia esto si tienes una interfaz específica para módulos
    __v?: number; // Opcional
}
