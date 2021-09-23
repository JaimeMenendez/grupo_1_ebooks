# 20-8-2021
- Se agregaron nuevos banners al slider del home
- Se separaron todas las rutas del archivo app.js hacia la carpeta routes
- Se solucionaron pequeños errores del home y del searchBook
- Se creó la lista de tareas del sprint 3 en el Trello

# 21-8-2021
- Se efectuó la reunión semanal para programar y distribuir todas las tareas relacionadas con el sprint 3
- Se creó el partial de comentarios, y se implementó la vista de descripción del producto en el motor de plantillas ejs
- Se creó el partial de productos del carrito, y se implementó la vista de carrito en el motor de plantillas ejs
- Se agregó al carrito la funcionalidad de calcular el precio total de manera dinámica con javascript

# 22-8-2021
- Se agregó a los botones de los comentarios y a las estrellas que califican los comentarios en la vista de descripción del producto un efecto de hover para que el usuario elija la calificación de la reseña.
- Se agregó animación de estrellas fugaces al hacer click en las estrellas de calificación de las reseñas en detalle del producto
- Se agregó funcionalidad al botón de favoritos y se animó. Ahora al presionar el corazón, se marca o desmarca el libro
- Se animaron en estado activo los botones de comentarios
- Se convirtió a plantilla ejs los Términos y condiciones y política de privacidad. Ahora a partir de un solo documento se generan ambos archivos

# 23-8-2021
- Se creó una vista personalizada para las rutas con error 404 usando el tema de la página
- Se creó la primera versión de AgregarLibros en ejs responsive para movil, tablet y escritorio con la funcionalidad de previsualizar la imagen de portada cargada por el usuario

# 24-8-2021
- Se iniciaron partials (head, header, footer y nav bar)
- Se instaló e implementó multer de manera que ahora es posible guardar libros en un archivo librosDB.json en el servidor utilizando el formulario de AgregarLibro Es solo un borrador puesto que los datos no son sometidos a ninguna validación

# 25-8-2021
- Partial de head creado.
- Partial de footer creado
- Partial de footer agregado a todas las vistas
- Se solucionaron algunos errores y ahora es posible visualizar los detalles del producto agregado con /producto/agregarLibro en la url /producto/1  donde el número es el id que se le asignó al producto que introdujo el usuario
# 28-8-2021
- Junta de equipo

# 30-8-2021
- navBar y navBar mobile partials en todas las views
- Se agregó la versión tentativa oficial de Editar/Agregar producto

# 31-8-2021
- Incluido el head partial a todas las vistas
- Archivos html eliminados
- Limpia de código

# 1-9-2021
- Se reestructuró el directorio de vistas separándo las vistas principales, las vistas de productos y las vistas de usuario.
- Se agregó una animación al login y register
- Se mejoró la accesibilidad de los botones en el home y el register haciendo el cursor de tipo pointer en los elementos clickeables.

# 2-9-2021
- Se corrigieron errores en el css de espaciado y se rectificaron algunos colores.

# 2-9-2021
- Se corrigieron y removieron las rutas de productos.
# 6-9-2021
- retro.md de 3er sprint

# 9-9-2021
- Se agregaron los botones categoría y subcategoría y se eliminaron bugs de la vista editar/agregar libros.
- Se limpió la base de datos para agregar libros nuevos.

# 9-9-2021
- Se creó la vista editar dirección en el perfil de usuario, así como el CRUD necesario para agregar una nueva dirección.
- Se corrigieron errores en Safari.

# 10-9-2021
- Actualización de rutas y controller de productos
- Corrección de subcategorías de categoría Medicina
- Vista de Todos los productos iniciada

# 10-9-2021
- Se agregaron etiquetas meta en la página para crear un link de previsualización.
- Se implementó el CRUD para seleccionar una dirección predeterminada.

# 10-9-2021
- Se conectó la vista del registro con el servidor, haciendo posible que se registren nuevos usuarios.
- Se implementó un script para mostrar mensajes en las páginas.
# 12-9-2021
- Se agregaron 2 libros por cada una de las primeras 3 categorías de Medicina

# 13-9-2021
- Se corrigieron errores en editar/agregar libro.
# 14-9-2021
- Base de datos de libros categoría Medicina completada

# 16-9-2021
- Se agregó validación con express validator al Register y se implementó el login usando session y bcrypt.

# 22-9-2021
- Vista de productos terminada
