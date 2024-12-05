import { z } from 'zod';
import { Platform, Idiom, Funtionalidad, Sector, Tool } from '../schemas/enums';

// Definir el esquema de validación para un curso
export const createCourseSchema = z.object({
  userId: z.string().optional(),
  title: z.string().min(1, 'Title is required'), // El título del curso
  contentType: z.enum(['free', 'premium']).optional(), // Tipo de contenido (free o premium)
  kind: z.enum(['course', 'lesson']).optional(), // Tipo de curso o lección
  basicDescription: z.string().optional(), // Descripción básica
  type: z.enum(['basic', 'intermed']).optional(), // Nivel de dificultad
  platafor: z.enum([Platform.APPSHEET, Platform.POWERAPPS]).optional(), // Plataforma del curso
  idiom: z.enum([Idiom.SPANISH, Idiom.ENGLISH]).optional(), // Idioma
  pilar: z.string().optional(), // Pilar del curso
  funtionalidad: z.enum([
    Funtionalidad.CALENDARIO,
    Funtionalidad.GENERACION,
    Funtionalidad.REPORTES_AUTOMATICOS,
    Funtionalidad.CHATBOT,
    Funtionalidad.EMAILS,
    Funtionalidad.SMS,
    Funtionalidad.NOTIFICACIONES_PUSH,
    Funtionalidad.GENERACION_ESCANEO_QR,
    Funtionalidad.GEOLOCALIZACION,
    Funtionalidad.OCR,
    Funtionalidad.MACHINE_LEANING,
    Funtionalidad.ESTADISTICAS_DEUSO,
  ]).optional(), // Funcionalidad del curso
  sector: z.enum([
    Sector.INDUSTRIA,
    Sector.GESTION_DEL_TIEMPO,
    Sector.GESTION_DE_INVENTARIOS,
    Sector.VENTAS_CRM,
    Sector.OBRAS_CONSTRUCCION,
    Sector.LOGISTICA_TRANSPORTE,
    Sector.SERVICIOS_PROFESIONALES,
    Sector.MARKETING_DIGITAL,
    Sector.E_COMMERCE,
    Sector.ENTRETENIMIENTO_MEDIOS,
    Sector.SEGURIDAD_VIGILANCIA,
    Sector.INVESTIGACION_DESARROLLO,
    Sector.AGRICULTURA_MEDIO_AMBIENTE,
    Sector.ADMINISTRACION,
  ]).optional(), // Sector del curso
  tool: z.enum([
    Tool.GOOGLE_SHEETS,
    Tool.GOOGLE_ANALYTICS,
    Tool.GOOGLE_TAG_MANAGER,
    Tool.GOOGLE_MAPS,
    Tool.GOOGLE_CALENDAR,
    Tool.GOOGLE_DRIVE,
    Tool.GOOGLE_FORMS,
    Tool.GOOGLE_SITES,
    Tool.GOOGLE_MAP,
    Tool.LOOKER_STUDIO,
    Tool.MySQL,
    Tool.ORACLE,
    Tool.POSTGRESQL,
    Tool.MONGODB,
    Tool.EXCEL,
    Tool.POWERBI,
    Tool.SALESFORCE,
    Tool.AIRTABLE,
    Tool.DROPBOX,
    Tool.BOX,
    Tool.ZAPIER,
    Tool.WORDPRESS,
    Tool.SHOPIFY,
    Tool.WHATSAPP_API,
    Tool.GESTION_DE_USUARIOS,
    Tool.REPORTING_AVANZADO,
    Tool.INTEGRACION_DE_DATOS,
    Tool.GESTION_DE_PERMISOS,
    Tool.ANALISIS_DE_DATOS,
    Tool.OPTIMIZACION_PERFORMANCE,
    Tool.DESPLIEGUE_DEPLOY,
    Tool.IMPORTACION_EXPORTACION_DE_DATOS,
    Tool.FIRMAS_DIGITALES,
    Tool.ESCANEO_DE_DOCUMENTOS,
    Tool.MONITOR_DE_AUTOMATIZACIONES,
    Tool.HISTORIAL_DE_AUDITORIA,
    Tool.API_INTERGRACIONES,
    Tool.POWER_BI,
    Tool.TWILIO,
    Tool.TRELLO,
  ]).optional(), // Herramienta utilizada
  prerequisites: z.array(z.string()).optional(), // Requisitos previos
  purpose :z.string().optional(), // para quien
  followUp: z.array(z.string()).optional(),//después de completar este curso, serás capaz de
  contents :z.array(z.string()).optional(),//contenido
  detailedContent: z.string().optional(), // Contenido detallado
  imageUrl: z.string().url().optional(), // URL de la imagen
  modules: z.array(z.object({
    moduleTitle: z.string().min(1, 'Module title is required'),
    moduleDescription: z.string().optional(),
    lessons: z.array(z.object({
      lessonTitle: z.string().min(1, 'Lesson title is required'),
      lessonDescription: z.string().optional(),
      materialUrl: z.string().url().optional(),
      uploadedMaterial: z.string().optional(),
      videoUrl: z.string().url().optional(),
    })).default([]).optional(),
  })).default([]).optional(), // Lista de módulos con lecciones
  status: z.string().optional(), // Estado del curso
  enrolledUsers: z.array(z.string()).optional(), // Usuarios inscritos
  createdAt: z.string().optional(), // Fecha de creación
  updatedAt: z.string().optional(), // Fecha de actualización
});

export type CreateCourseDto = z.infer<typeof createCourseSchema>;
