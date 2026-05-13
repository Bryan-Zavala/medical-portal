module.exports = {
  ci: {
    collect: {
      
      startServerCommand: 'npm run start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3, // Ejecuta 3 veces para obtener un promedio estable
    },
    assert: {
      assertions: {
        //  Asegurar 95+ en todas las métricas
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        // Métrica específica LCP: Falla si tarda más de 2.5 segundos (2500ms)
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
      },
    },
    upload: {
      target: 'temporary-public-storage', // Sube un reporte temporal para verlo en el navegador
    },
  },
};