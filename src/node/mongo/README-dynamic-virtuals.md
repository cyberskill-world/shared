# Dynamic Virtual References in Mongoose

This feature enables dynamic population of virtual references in Mongoose based on polymorphic fields, allowing you to model shared behaviors like "likes", "comments", or "attachments" that can be associated with multiple entity types using a single collection.

## Motivation

Traditional Mongoose virtuals require a fixed `ref` value, which limits polymorphic use cases. With dynamic virtual references, you can:

- Create polymorphic relationships without manual application logic
- Eliminate boilerplate code for populating different entity types
- Maintain clean, DRY schemas for cross-entity relations
- Achieve better performance than manual grouping and querying

## Features

- ✅ **Dynamic `ref` functions**: Specify model names at runtime based on document fields
- ✅ **Automatic population**: Built-in support for populating dynamic virtuals
- ✅ **Count virtuals**: Support for counting related documents
- ✅ **Type safety**: Full TypeScript support with proper typing
- ✅ **Performance optimized**: Efficient batching and querying
- ✅ **Backwards compatible**: Works alongside existing static virtuals

## Basic Usage

### 1. Define Models with Dynamic Virtuals

```typescript
import { mongo } from '@cyberskill/shared/node/mongo';
import mongoose from 'mongoose';

// Your entity models
interface IPost {
    id: string;
    title: string;
    content: string;
}

interface IGallery {
    id: string;
    name: string;
    images: string[];
}

// Model with dynamic virtual
interface ILike {
    id: string;
    userId: string;
    entityType: string;  // 'Post', 'Gallery', etc.
    entityId: string;
    entity?: IPost | IGallery;  // Populated dynamically
}

const Like = mongo.createModel<ILike>({
    mongoose,
    name: 'Like',
    schema: {
        userId: { type: String, required: true },
        entityType: { type: String, required: true },
        entityId: { type: String, required: true },
    },
    virtuals: [
        {
            name: 'entity',
            options: {
                ref: (doc: ILike) => doc.entityType, // 🎉 Dynamic ref function!
                localField: 'entityId',
                foreignField: '_id',
                justOne: true,
            }
        }
    ]
});
```

### 2. Query with Dynamic Population

```typescript
// Create a controller with dynamic virtual support
const likeController = mongo.createController(Like, mongoose);

// Method 1: Using enhanced existing methods (automatic dynamic population)
const likesResult = await likeController.findAll({ userId: 'user123' });
const likesWithEntities = likesResult.result;

// Now each like has its entity populated automatically!
likesWithEntities.forEach(like => {
    const entityName = (like.entity as any)?.title || (like.entity as any)?.name;
    console.log(`User liked ${like.entityType}: ${entityName}`);
});

// Method 2: Single document
const singleLikeResult = await likeController.findOne({ userId: 'user123' });
const likeWithEntity = singleLikeResult.result;

// Method 3: Pagination with dynamic virtuals
const paginatedResult = await likeController.findPaging(
    { userId: 'user123' }, 
    { page: 1, limit: 10 }
);
const paginatedLikes = paginatedResult.result.docs; // All populated!

// Method 4: Manual population for existing documents
const plainLikes = await Like.find({ userId: 'user123' }).lean();
const populatedLikes = await mongo.populateDocumentVirtuals(Like, mongoose, plainLikes);
```

## Advanced Features

### Count Virtuals

Create virtual fields that count related documents:

```typescript
interface IEntityStats {
    entityType: string;
    entityId: string;
    likeCount?: number; // Virtual count field
}

const EntityStats = mongo.createModel<IEntityStats>({
    mongoose,
    name: 'EntityStats',
    schema: {
        entityType: { type: String, required: true },
        entityId: { type: String, required: true },
    },
    virtuals: [
        {
            name: 'likeCount',
            options: {
                ref: () => 'Like',
                localField: 'entityId',
                foreignField: 'entityId',
                count: true, // Count related documents
            }
        }
    ]
});
```

### Complex Dynamic Logic

Use complex logic in your ref functions:

```typescript
interface INotification {
    type: 'like' | 'comment' | 'follow';
    targetType: string;
    targetId: string;
    target?: any;
}

const Notification = mongo.createModel<INotification>({
    mongoose,
    name: 'Notification',
    schema: {
        type: { type: String, enum: ['like', 'comment', 'follow'] },
        targetType: { type: String, required: true },
        targetId: { type: String, required: true },
    },
    virtuals: [
        {
            name: 'target',
            options: {
                ref: (doc: INotification) => {
                    // Complex conditional logic
                    if (doc.type === 'follow') return 'User';
                    if (doc.type === 'like') return doc.targetType;
                    return 'Comment';
                },
                localField: 'targetId',
                foreignField: '_id',
                justOne: true,
            }
        }
    ]
});
```

## API Reference

### Type Definitions

```typescript
// Dynamic ref function type
type T_DynamicRefFunction<T = any> = (doc: T) => string;

// Virtual options supporting both static and dynamic refs
type T_VirtualOptions = {
    ref: string | T_DynamicRefFunction;
    localField: string;
    foreignField: string;
    count?: boolean;
    justOne?: boolean;
    options?: any;
};
```

### Query Methods

#### `mongo.createController(model, mongoose)`

Create a controller instance with dynamic virtual support.

**Parameters:**
- `model`: The Mongoose model to operate on
- `mongoose`: The Mongoose instance

**Returns:** MongooseController instance with automatic dynamic virtual population

#### Enhanced Controller Methods

All existing controller methods now automatically support dynamic virtual population:

- `controller.findOne(filter?, projection?, options?, populate?)` - Find single document
- `controller.findAll(filter?, projection?, options?, populate?)` - Find multiple documents  
- `controller.findPaging(filter?, options?)` - Find with pagination
- `controller.findPagingAggregate(pipeline, options?)` - Aggregate with pagination

#### `mongo.populateDocumentVirtuals(model, mongoose, documents)`

Manually populate dynamic virtuals on existing documents.

### Utility Methods

#### `mongo.isDynamicVirtual(options)`

Check if virtual options contain a dynamic ref function.

#### `mongo.populateDynamicVirtuals(mongoose, documents, virtualConfigs)`

Core population logic for dynamic virtuals.

#### `mongo.resolveDynamicPopulate(documents, virtualName, virtualOptions)`

Resolve and group documents by their dynamic ref results.

## Performance Considerations

### Efficient Batching

The dynamic virtual system automatically:
- Groups documents by their resolved model names
- Executes batch queries for each model type
- Uses `$in` operators for efficient lookups
- Minimizes database round trips

### Best Practices

1. **Index your reference fields**: Ensure `foreignField` values are indexed
2. **Limit population depth**: Avoid populating virtuals on populated virtuals
3. **Use projections**: Only select fields you need
4. **Cache model resolution**: For frequently used ref functions, consider caching

```typescript
// Good: Simple, fast ref function
ref: (doc) => doc.entityType

// Avoid: Complex computation in ref function
ref: (doc) => {
    // Heavy computation here
    return computeModelName(doc);
}
```

## Error Handling

The system gracefully handles errors:

```typescript
// Ref function errors are caught and logged
ref: (doc: ILike) => {
    if (!doc.entityType) {
        throw new Error('Missing entityType');
    }
    return doc.entityType;
}

// Documents with failed ref functions are skipped
// Warnings are logged to console
```

## Migration Guide

### From Manual Population

**Before:**
```typescript
const likes = await Like.find({});
const postLikes = likes.filter(like => like.entityType === 'Post');
const galleryLikes = likes.filter(like => like.entityType === 'Gallery');

const posts = await Post.find({ 
    _id: { $in: postLikes.map(like => like.entityId) } 
});
const galleries = await Gallery.find({ 
    _id: { $in: galleryLikes.map(like => like.entityId) } 
});

// Manual mapping logic...
```

**After:**
```typescript
const likes = await mongo.query.findAll(Like, mongoose);
// Everything is populated automatically! 🎉
```

### From Discriminators

Dynamic virtuals can often replace discriminator patterns:

**Before (with discriminators):**
```typescript
const baseSchema = new mongoose.Schema({
    entityId: String,
    entityType: String
});

const LikeSchema = baseSchema.discriminator('Like', {
    // Like-specific fields
});
```

**After (with dynamic virtuals):**
```typescript
const Like = mongo.createModel({
    mongoose,
    name: 'Like',
    schema: {
        entityId: String,
        entityType: String
    },
    virtuals: [{
        name: 'entity',
        options: {
            ref: (doc) => doc.entityType,
            localField: 'entityId',
            foreignField: '_id',
            justOne: true
        }
    }]
});
```

## Limitations

1. **Mongoose native populate**: Cannot use Mongoose's native `.populate()` with dynamic virtuals
2. **Aggregation**: Dynamic virtuals don't work with aggregation pipelines
3. **Circular references**: Avoid circular dynamic virtual relationships
4. **Model availability**: Referenced models must be registered before population

## Examples

See `src/node/mongo/examples/dynamic-virtuals.example.ts` for comprehensive examples including:

- Basic polymorphic likes/comments
- Count virtuals for statistics
- Complex conditional logic
- Multiple virtual fields
- Error handling patterns

## Contributing

This feature is part of the `@cyberskill/shared` library. For issues or enhancements:

1. Create an issue describing the use case
2. Include code examples demonstrating the problem
3. Test with the provided examples
4. Submit pull requests with tests

## Compatibility

- **Mongoose**: 6.0+ (tested with 8.16.4)
- **Node.js**: 16+
- **TypeScript**: 4.5+

---

*This feature brings Mongoose closer to parity with other ORMs like Rails' polymorphic associations, Prisma's union types, and Sequelize's polymorphic support, while maintaining the flexibility and performance characteristics of MongoDB.*