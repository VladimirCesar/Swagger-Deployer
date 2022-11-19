module.exports = (yamlURL, pageTitle) => {
    const html = `
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>${pageTitle}</title>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.23.11/swagger-ui.css" >
    <head>
    <body>
        <header>
            <a href="http://localhost:3001">На главную</a>
        </header>
        <div id="swagger-ui"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.23.11/swagger-ui-bundle.js"> </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.23.11/swagger-ui-standalone-preset.js"> </script>
        <script>
            window.onload = function() {
                // Begin Swagger UI call region
                const ui = SwaggerUIBundle({
                    url: "${yamlURL}",
                    dom_id: '#swagger-ui',
                })
                // End Swagger UI call region
                window.ui = ui
            }
        </script>
    </body>
    </html>`;
    return html;
};