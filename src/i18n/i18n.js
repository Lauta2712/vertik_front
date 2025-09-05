import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

if (!sessionStorage.getItem('sessionStarted')) {
  localStorage.removeItem('language');  
  sessionStorage.setItem('sessionStarted', 'true'); 
}

const storedLanguage = localStorage.getItem('language');
const defaultLanguage = storedLanguage || 'es';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // NotFound
        "notFoundTitle": "Page Not Found",
        "notFoundDescription": "The page you are looking for does not exist or has been moved.",
        "notFoundBack": "Go back to Home",

        // General
        "appName": "Vertik",
        "slogan": "Designed by athletes, for athletes",

        // Navbar
        "home": "Home",
        "features": "Features",
        "pricing": "Pricing",
        "about": "About",
        "contact": "Contact",

        //Sidebar
        "meals": "Meals",
        "trainings": "Trainings",
        "races": "Races",
        "racePlans": "Race Plans",
        "statistics": "Statistics",
        "profile": "Profile",
        "supplements": "Supplements",

        //Profile
        "noUser": "No user logged in",
        "nickname": "Nickname",
        "fullName": "Full name",
        "emailVerified": "Email verified",
        "yes": "Yes",
        "no": "No",
        "updatedAt": "Last updated",
        "createdAt": "Created at",

        // Hero
        "heroTitle": "Optimize your nutrition for better performance",
        "heroSubtitle": "Track your daily meals and training fuel to perform at your best.",

        // Features
        "featuresTitle": "Why choose Vertik?",
        "feature1Title": "Daily Meal Tracking",
        "feature1Desc": "Easily log what you eat every day and keep your nutrition organized.",
        "feature2Title": "Training Nutrition",
        "feature2Desc": "Track your fueling before, during, and after workouts or races.",
        "feature3Title": "Progress Insights",
        "feature3Desc": "Get clear insights to adjust your habits and boost your performance.",
        "feature4Title": "Accessible Anywhere",
        "feature4Desc": "Your nutrition and training records, available on any device.",

        // About
        "aboutTitle": "About Vertik",
        "aboutDesc": "Vertik was created by athletes who understand the importance of fueling correctly. Our mission is to help you optimize your nutrition strategy to reach your goals.",

        "createdBy": "Created by",

        // Inglés
        "featureMealsTitle": "Meal tracking",
        "featureMealsDesc": "Log your daily meals to improve performance.",
        "featureTrainingTitle": "Training nutrition",
        "featureTrainingDesc": "Track intake during workouts to optimize energy.",
        "featureProgressTitle": "Progress tracking",
        "featureProgressDesc": "Visualize your growth and adjust your nutrition plan.",

        // CTA
        "ctaTitle": "Start optimizing your performance today",
        "ctaButton": "Get Started",
        "logout": "Logout",

        //Meals
        "weekDays": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "mealTypes": ["Breakfast", "Lunch", "Snack", "Dinner", "Other"],
        "newMeal": "New meal",
        "date": "Date",
        "type": "Type",
        "add": "Add",
        "close": "Close",
      },
    },
    es: {
      translation: {
        // NotFound
        "notFoundTitle": "Página no encontrada",
        "notFoundDescription": "La página que buscas no existe o ha sido movida.",
        "notFoundBack": "Volver al inicio",

        // General
        "appName": "Vertik",
        "slogan": "Pensado por deportistas para deportistas",

        // Navbar
        "home": "Inicio",
        "features": "Características",
        "pricing": "Precios",
        "about": "Nosotros",
        "contact": "Contacto",

        //Sidebar
        "meals": "Comidas",
        "trainings": "Entrenamientos",
        "races": "Carreras",
        "racePlans": "Planes de Carrera",
        "statistics": "Estadísticas",
        "profile": "Perfil",
        "supplements": "Suplementos",

        //Profile
        "noUser": "No hay usuario loggeado",
        "nickname": "Apodo",
        "fullName": "Nombre completo",
        "emailVerified": "Email verificado",
        "yes": "Sí",
        "no": "No",
        "updatedAt": "Última actualización",
        "createdAt": "Creado en",

        // Hero
        "heroTitle": "Optimiza tu nutrición para rendir mejor",
        "heroSubtitle": "Lleva un registro de tus comidas diarias y de la alimentación en entrenos para dar siempre lo mejor de vos.",

        // Features
        "featuresTitle": "¿Por qué elegir Vertik?",
        "feature1Title": "Registro de Comidas Diarias",
        "feature1Desc": "Anota fácilmente lo que comes cada día y mantén tu nutrición organizada.",
        "feature2Title": "Nutrición en Entrenos",
        "feature2Desc": "Registra tu alimentación antes, durante y después de los entrenamientos o carreras.",
        "feature3Title": "Evolución y Progreso",
        "feature3Desc": "Accede a información clara para ajustar tus hábitos y mejorar tu rendimiento.",
        "feature4Title": "Acceso en Cualquier Lugar",
        "feature4Desc": "Tu registro de alimentación y entreno disponible en cualquier dispositivo.",
        
        "featureMealsTitle": "Registro de comidas",
        "featureMealsDesc": "Controla tu alimentación diaria para mejorar tu rendimiento.",
        "featureTrainingTitle": "Nutrición en entrenos",
        "featureTrainingDesc": "Registra tu ingesta durante entrenamientos para optimizar energía.",
        "featureProgressTitle": "Evolución y progreso",
        "featureProgressDesc": "Visualiza tu avance y ajusta tu plan nutricional.",

        // About
        "aboutTitle": "Sobre Vertik",
        "aboutDesc": "Vertik fue creado por deportistas que entienden la importancia de una buena alimentación. Nuestra misión es ayudarte a optimizar tu estrategia nutricional para alcanzar tus objetivos.",
        
        "createdBy": "Creado por",

        // CTA
        "ctaTitle": "Empezá a optimizar tu rendimiento hoy mismo",
        "ctaButton": "Comenzar",
    
        "logout": "Cerrar sesión",

        //Meals
        "weekDays": ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        "mealTypes": ["Desayuno", "Almuerzo", "Merienda", "Cena", "Snack"],
        "newMeal": "Nueva comida",
        "date": "Fecha",
        "type": "Tipo",
        "add": "Agregar",
        "close": "Cerrar",
      },
    },
  },
  lng: defaultLanguage,
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

i18n.changeLanguage(defaultLanguage);

export default i18n;
