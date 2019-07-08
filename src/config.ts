export const config = {
    MAX_ITEM_PER_PAGE: 50,
    DEFAULT_ITEM_PER_PAGE: 20,

    database: {
        SchemaName_User: "User",
        SchemaName_Product: "Product",
        SchemaName_Tag: "Tag",
        SchemaName_Category: "Category",
        SchemaName_Comment: "Comment",
    },

    app: {
        DEFAULT_PORT: 3005,// Using port from environment or this port
    }
}