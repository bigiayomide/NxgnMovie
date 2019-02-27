using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Linq;

namespace NxgnMovie.API.Core
{
    public class IgnorePropertiesSchemaFilter : ISchemaFilter
    {
        public void Apply(Schema schema, SchemaFilterContext context)
        {
            if (schema.Properties == null) return;
            schema.Properties.Where(x => x.Value.Title != "Movies" && x.Value.Title != "Category")
                .ToDictionary(entry => entry.Key, entry => entry.Value);
        }
    }
}
