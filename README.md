# tehospeda-site

Web pública de cada hotel en su subdominio (`<slug>.tehospeda.com`): Next.js 15, disponibilidad real y solicitudes de reserva que entran al ERP.

Este repositorio es un submódulo de [tehospeda](https://github.com/willian95/tehospeda): depende de `packages/shared`, del workspace de pnpm y de la configuración de Docker que viven en el repositorio principal. Para trabajar con él, clona el principal con sus submódulos:

```bash
git clone --recurse-submodules git@github.com:willian95/tehospeda.git
```

Las instrucciones de instalación, desarrollo y despliegue están en el README del repositorio principal.
