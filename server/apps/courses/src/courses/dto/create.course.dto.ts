import { z } from 'zod';

export const createCourseSchema = z.object({
  token: z.string().optional(), // Token de autenticación (obligatorio)
  title: z.string().min(1, 'Title is required'), // Título del curso (obligatorio)
  contentType: z.enum(['free', 'premium']).optional(), // Tipo de contenido (opcional, predeterminado: premium)
  kind: z.enum(['course', 'lesson']).optional(), // Curso o lección (opcional)
  basicDescription: z.string().optional(), // Descripción básica del curso (opcional)
  type: z.enum(['basic', 'intermediate']).optional(), // Nivel del curso (opcional)
  platform: z.enum(['AppSheet', 'PowerApps']).optional(), // Plataforma (opcional)
  idiom: z.enum(['Spanish', 'English']).optional(), // Idioma (opcional)
  pillar: z.enum(['Technology', 'Business', 'Design']).optional(), // Pilar del curso (opcional)
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
  ]).optional(), // Funcionalidad (opcional)
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
  ]).optional(), // Sector del curso (opcional)
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
  ]).optional(), // Herramienta (opcional)
  prerequisites: z.array(z.string()).optional(), // Requisitos previos (opcional)
  detailedContent: z.string().optional(), // Contenido detallado (opcional)
  imageUrl: z.string().url('Invalid URL format').optional(), // URL de la imagen del curso (opcional)
  status: z.enum(['Draft', 'Published', 'Archived']).optional(), // Estado del curso (opcional, predeterminado: Draft)
})

export type CreateCourseDto = z.infer<typeof createCourseSchema>