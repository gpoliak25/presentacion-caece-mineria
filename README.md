# ¿A quién llamar?

Presentación interactiva — **Maestría en Minería de Datos, CAECE 2026**.

Modelo predictivo de Machine Learning (CART y Random Forest) para la captación
de clientes bancarios y la optimización de campañas de telemarketing.

> Autoras: Lic. Lorena Lopez · Lic. Gisela Poliak

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS 4**
- **framer-motion** — transiciones y animaciones de entrada
- **recharts** — gráficos (donut, barras comparativas, curva de ganancia)
- **lucide-react** — iconografía

## Slides

1. **Portada** — título, equipo y técnicas
2. **El Problema** — eficiencia del telemarketing (~12% de conversión)
3. **Los Datos** — 15 variables predictoras y tratamiento de faltantes
4. **La Trampa** — data leakage (`duration`) y pipeline de preparación
5. **Los Modelos** — CART vs Random Forest
6. **Resultados** — comparación de métricas, importancia de variables y curva de ganancia
7. **Impacto y Conclusiones** — +244% de conversiones

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Navegación

- **Teclado**: ← → ↑ ↓ · barra espaciadora · `Inicio` / `Fin`
- **Scroll** del mouse y **swipe** táctil
- Puntos de navegación en la barra inferior

## Deploy

Listo para desplegar en [Vercel](https://vercel.com) — proyecto Next.js estándar,
sin configuración adicional.
