import { z } from 'zod';

// Esquema para la creación de cursos en el Gateway
export const createCourseGatewaySchema = z.object({
  title: z.string().min(1, 'Title is required'), // Título del curso
  contentType: z.enum(['free', 'premium']).optional(), // Tipo de contenido
  kind: z.enum(['course', 'lesson']).optional(), // Curso o lección
  basicDescription: z.string().optional(), // Descripción básica
  type: z.enum(['basic', 'intermediate']).optional(), // Nivel del curso
  platform: z.enum(['AppSheet', 'PowerApps']).optional(), // Plataforma
  idiom: z.enum(['Spanish', 'English']).optional(), // Idioma
  pillar: z.enum(['Technology', 'Business', 'Design']).optional(), // Pilar del curso
  functionality: z.enum([
    'Calendar',
    'Generation',
    'Automatic Reports',
    'Chatbot',
    'Emails',
    'SMS',
    'Push Notifications',
    'QR Code Scanning',
    'Geolocation',
    'OCR',
    'Machine Learning',
    'Usage Statistics',
  ]).optional(), // Funcionalidad
  sector: z.enum([
    'Industry',
    'Time Management',
    'Inventory Management',
    'Sales CRM',
    'Construction',
    'Logistics',
    'Professional Services',
    'Digital Marketing',
    'E-Commerce',
    'Entertainment',
    'Security',
    'Research and Development',
    'Agriculture',
    'Administration',
  ]).optional(), // Sector del curso
  tool: z.enum([
    'Google Sheets',
    'Google Analytics',
    'Google Drive',
    'Excel',
    'Power BI',
    'Salesforce',
    'Airtable',
    'Dropbox',
    'Zapier',
    'Trello',
    'Twilio',
  ]).optional(), // Herramienta
  descriptionBasic: z.string().optional(), // Descripción básica
  prerequisites: z.array(z.string()).optional(), // Requisitos previos
  detailedContent: z.string().optional(), // Contenido detallado
  imageUrl: z.string().url('Invalid URL format').optional(), // URL de la imagen
  modules: z
    .array(
      z.object({
        moduleTitle: z.string().min(1, 'Module title is required'), // Título del módulo
        moduleDescription: z.string().optional(), // Descripción del módulo
        lessons: z
          .array(
            z.object({
              lessonTitle: z.string().min(1, 'Lesson title is required'), // Título de la lección
              lessonDescription: z.string().optional(), // Descripción de la lección
              materialUrl: z.string().url('Invalid URL format').optional(), // URL del material
              uploadedMaterial: z.string().optional(), // Material subido
              videoUrl: z.string().url('Invalid URL format').optional(), // URL del video
            }),
          )
          .optional(),
      }),
    )
    .optional(), // Módulos con lecciones
  status: z.enum(['Draft', 'Published', 'Archived']).optional(), // Estado del curso
  enrolledUsers: z.array(z.string().uuid('Invalid user ID format')).optional(), // Usuarios inscritos
  createdAt: z.string().datetime({ message: 'Invalid date format' }).optional(), // Fecha de creación
  updatedAt: z.string().datetime({ message: 'Invalid date format' }).optional(), // Fecha de actualización
});

// Tipo inferido para usar en el DTO
export type CreateCourseGatewayDto = z.infer<typeof createCourseGatewaySchema>;
