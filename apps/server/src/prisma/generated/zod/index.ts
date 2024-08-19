import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const BookScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'author',
  'rating',
  'createdAt',
  'updatedAt',
]);

export const GenerationRequestScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'occasion',
  'recipientName',
  'prompt',
  'senderName',
  'status',
  'sunoSongId',
  'sunoAudioUrl',
  'srt',
  'isRTL',
  'language',
  'duration',
  'sunoLyrics',
  'localVideoPath',
  'finalVideoPath',
  'recipientPhoneNumber',
  'createdAt',
  'updatedAt',
]);

export const VideoImageScalarFieldEnumSchema = z.enum([
  'id',
  'photoId',
  'generationRequestId',
  'imageType',
  'createdAt',
  'updatedAt',
]);

export const StripePaymentInfoScalarFieldEnumSchema = z.enum([
  'id',
  'generationRequestId',
  'stripePaymentId',
  'amount',
  'currency',
  'status',
  'createdAt',
  'updatedAt',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const NullsOrderSchema = z.enum(['first', 'last']);

export const ImageTypeSchema = z.enum(['USER_UPLOADED', 'AI_GENERATED']);

export type ImageTypeType = `${z.infer<typeof ImageTypeSchema>}`;

export const RequestStatusSchema = z.enum([
  'STARTED',
  'FILLED',
  'PAID',
  'AUDIO_PROCESSING',
  'AUDIO_PROCESSED',
  'SUBTITLE_PROCESSING',
  'SUBTITLE_PROCESSED',
  'SUBTITLE_FAILED',
  'IMAGE_PROCESSING',
  'IMAGE_PROCESSED',
  'IMAGE_FAILED',
  'VIDEO_PROCESSING',
  'VIDEO_PROCESSED',
  'VIDEO_FAILED',
  'UPLOADING',
  'UPLOADED',
  'UPLOAD_FAILED',
  'COMPLETED',
  'FAILED',
]);

export type RequestStatusType = `${z.infer<typeof RequestStatusSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// BOOK SCHEMA
/////////////////////////////////////////

export const BookSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  author: z.string(),
  rating: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Book = z.infer<typeof BookSchema>;

/////////////////////////////////////////
// GENERATION REQUEST SCHEMA
/////////////////////////////////////////

export const GenerationRequestSchema = z.object({
  status: RequestStatusSchema,
  id: z.string().cuid(),
  userId: z.string(),
  occasion: z.string(),
  recipientName: z.string(),
  prompt: z.string(),
  senderName: z.string(),
  sunoSongId: z.string().nullable(),
  sunoAudioUrl: z.string().nullable(),
  srt: z.string().nullable(),
  isRTL: z.boolean().nullable(),
  language: z.string().nullable(),
  duration: z.number().int().nullable(),
  sunoLyrics: z.string().nullable(),
  localVideoPath: z.string().nullable(),
  finalVideoPath: z.string().nullable(),
  recipientPhoneNumber: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type GenerationRequest = z.infer<typeof GenerationRequestSchema>;

/////////////////////////////////////////
// VIDEO IMAGE SCHEMA
/////////////////////////////////////////

export const VideoImageSchema = z.object({
  imageType: ImageTypeSchema,
  id: z.string().cuid(),
  photoId: z.string(),
  generationRequestId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type VideoImage = z.infer<typeof VideoImageSchema>;

/////////////////////////////////////////
// STRIPE PAYMENT INFO SCHEMA
/////////////////////////////////////////

export const StripePaymentInfoSchema = z.object({
  id: z.string().cuid(),
  generationRequestId: z.string(),
  stripePaymentId: z.string(),
  amount: z.number().int(),
  currency: z.string(),
  status: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type StripePaymentInfo = z.infer<typeof StripePaymentInfoSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// BOOK
//------------------------------------------------------

export const BookSelectSchema: z.ZodType<Prisma.BookSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    author: z.boolean().optional(),
    rating: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict();

// GENERATION REQUEST
//------------------------------------------------------

export const GenerationRequestIncludeSchema: z.ZodType<Prisma.GenerationRequestInclude> =
  z
    .object({
      videoImages: z
        .union([z.boolean(), z.lazy(() => VideoImageFindManyArgsSchema)])
        .optional(),
      stripePaymentInfo: z
        .union([z.boolean(), z.lazy(() => StripePaymentInfoArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => GenerationRequestCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

export const GenerationRequestArgsSchema: z.ZodType<Prisma.GenerationRequestDefaultArgs> =
  z
    .object({
      select: z.lazy(() => GenerationRequestSelectSchema).optional(),
      include: z.lazy(() => GenerationRequestIncludeSchema).optional(),
    })
    .strict();

export const GenerationRequestCountOutputTypeArgsSchema: z.ZodType<Prisma.GenerationRequestCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z
        .lazy(() => GenerationRequestCountOutputTypeSelectSchema)
        .nullish(),
    })
    .strict();

export const GenerationRequestCountOutputTypeSelectSchema: z.ZodType<Prisma.GenerationRequestCountOutputTypeSelect> =
  z
    .object({
      videoImages: z.boolean().optional(),
    })
    .strict();

export const GenerationRequestSelectSchema: z.ZodType<Prisma.GenerationRequestSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      occasion: z.boolean().optional(),
      recipientName: z.boolean().optional(),
      prompt: z.boolean().optional(),
      senderName: z.boolean().optional(),
      status: z.boolean().optional(),
      sunoSongId: z.boolean().optional(),
      sunoAudioUrl: z.boolean().optional(),
      srt: z.boolean().optional(),
      isRTL: z.boolean().optional(),
      language: z.boolean().optional(),
      duration: z.boolean().optional(),
      sunoLyrics: z.boolean().optional(),
      localVideoPath: z.boolean().optional(),
      finalVideoPath: z.boolean().optional(),
      recipientPhoneNumber: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      videoImages: z
        .union([z.boolean(), z.lazy(() => VideoImageFindManyArgsSchema)])
        .optional(),
      stripePaymentInfo: z
        .union([z.boolean(), z.lazy(() => StripePaymentInfoArgsSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => GenerationRequestCountOutputTypeArgsSchema),
        ])
        .optional(),
    })
    .strict();

// VIDEO IMAGE
//------------------------------------------------------

export const VideoImageIncludeSchema: z.ZodType<Prisma.VideoImageInclude> = z
  .object({
    generationRequest: z
      .union([z.boolean(), z.lazy(() => GenerationRequestArgsSchema)])
      .optional(),
  })
  .strict();

export const VideoImageArgsSchema: z.ZodType<Prisma.VideoImageDefaultArgs> = z
  .object({
    select: z.lazy(() => VideoImageSelectSchema).optional(),
    include: z.lazy(() => VideoImageIncludeSchema).optional(),
  })
  .strict();

export const VideoImageSelectSchema: z.ZodType<Prisma.VideoImageSelect> = z
  .object({
    id: z.boolean().optional(),
    photoId: z.boolean().optional(),
    generationRequestId: z.boolean().optional(),
    imageType: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    generationRequest: z
      .union([z.boolean(), z.lazy(() => GenerationRequestArgsSchema)])
      .optional(),
  })
  .strict();

// STRIPE PAYMENT INFO
//------------------------------------------------------

export const StripePaymentInfoIncludeSchema: z.ZodType<Prisma.StripePaymentInfoInclude> =
  z
    .object({
      generationRequest: z
        .union([z.boolean(), z.lazy(() => GenerationRequestArgsSchema)])
        .optional(),
    })
    .strict();

export const StripePaymentInfoArgsSchema: z.ZodType<Prisma.StripePaymentInfoDefaultArgs> =
  z
    .object({
      select: z.lazy(() => StripePaymentInfoSelectSchema).optional(),
      include: z.lazy(() => StripePaymentInfoIncludeSchema).optional(),
    })
    .strict();

export const StripePaymentInfoSelectSchema: z.ZodType<Prisma.StripePaymentInfoSelect> =
  z
    .object({
      id: z.boolean().optional(),
      generationRequestId: z.boolean().optional(),
      stripePaymentId: z.boolean().optional(),
      amount: z.boolean().optional(),
      currency: z.boolean().optional(),
      status: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      generationRequest: z
        .union([z.boolean(), z.lazy(() => GenerationRequestArgsSchema)])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const BookWhereInputSchema: z.ZodType<Prisma.BookWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => BookWhereInputSchema),
        z.lazy(() => BookWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => BookWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => BookWhereInputSchema),
        z.lazy(() => BookWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    author: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    rating: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  })
  .strict();

export const BookOrderByWithRelationInputSchema: z.ZodType<Prisma.BookOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      author: z.lazy(() => SortOrderSchema).optional(),
      rating: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BookWhereUniqueInputSchema: z.ZodType<Prisma.BookWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => BookWhereInputSchema),
              z.lazy(() => BookWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => BookWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => BookWhereInputSchema),
              z.lazy(() => BookWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          author: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          rating: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        })
        .strict(),
    );

export const BookOrderByWithAggregationInputSchema: z.ZodType<Prisma.BookOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      author: z.lazy(() => SortOrderSchema).optional(),
      rating: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => BookCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => BookAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => BookMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => BookMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => BookSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const BookScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BookScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => BookScalarWhereWithAggregatesInputSchema),
          z.lazy(() => BookScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => BookScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => BookScalarWhereWithAggregatesInputSchema),
          z.lazy(() => BookScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      author: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      rating: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const GenerationRequestWhereInputSchema: z.ZodType<Prisma.GenerationRequestWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => GenerationRequestWhereInputSchema),
          z.lazy(() => GenerationRequestWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => GenerationRequestWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => GenerationRequestWhereInputSchema),
          z.lazy(() => GenerationRequestWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      occasion: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      recipientName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      prompt: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      senderName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumRequestStatusFilterSchema),
          z.lazy(() => RequestStatusSchema),
        ])
        .optional(),
      sunoSongId: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      sunoAudioUrl: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      srt: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      isRTL: z
        .union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
        .optional()
        .nullable(),
      language: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      duration: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      sunoLyrics: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      localVideoPath: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      finalVideoPath: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      recipientPhoneNumber: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      videoImages: z.lazy(() => VideoImageListRelationFilterSchema).optional(),
      stripePaymentInfo: z
        .union([
          z.lazy(() => StripePaymentInfoNullableRelationFilterSchema),
          z.lazy(() => StripePaymentInfoWhereInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const GenerationRequestOrderByWithRelationInputSchema: z.ZodType<Prisma.GenerationRequestOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      occasion: z.lazy(() => SortOrderSchema).optional(),
      recipientName: z.lazy(() => SortOrderSchema).optional(),
      prompt: z.lazy(() => SortOrderSchema).optional(),
      senderName: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      sunoSongId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      sunoAudioUrl: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      srt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      isRTL: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      language: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      duration: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      sunoLyrics: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      localVideoPath: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      finalVideoPath: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      recipientPhoneNumber: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      videoImages: z
        .lazy(() => VideoImageOrderByRelationAggregateInputSchema)
        .optional(),
      stripePaymentInfo: z
        .lazy(() => StripePaymentInfoOrderByWithRelationInputSchema)
        .optional(),
    })
    .strict();

export const GenerationRequestWhereUniqueInputSchema: z.ZodType<Prisma.GenerationRequestWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => GenerationRequestWhereInputSchema),
              z.lazy(() => GenerationRequestWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => GenerationRequestWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => GenerationRequestWhereInputSchema),
              z.lazy(() => GenerationRequestWhereInputSchema).array(),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          occasion: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          recipientName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          prompt: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          senderName: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          status: z
            .union([
              z.lazy(() => EnumRequestStatusFilterSchema),
              z.lazy(() => RequestStatusSchema),
            ])
            .optional(),
          sunoSongId: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          sunoAudioUrl: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          srt: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          isRTL: z
            .union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
            .optional()
            .nullable(),
          language: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          duration: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          sunoLyrics: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          localVideoPath: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          finalVideoPath: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          recipientPhoneNumber: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          videoImages: z
            .lazy(() => VideoImageListRelationFilterSchema)
            .optional(),
          stripePaymentInfo: z
            .union([
              z.lazy(() => StripePaymentInfoNullableRelationFilterSchema),
              z.lazy(() => StripePaymentInfoWhereInputSchema),
            ])
            .optional()
            .nullable(),
        })
        .strict(),
    );

export const GenerationRequestOrderByWithAggregationInputSchema: z.ZodType<Prisma.GenerationRequestOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      occasion: z.lazy(() => SortOrderSchema).optional(),
      recipientName: z.lazy(() => SortOrderSchema).optional(),
      prompt: z.lazy(() => SortOrderSchema).optional(),
      senderName: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      sunoSongId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      sunoAudioUrl: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      srt: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      isRTL: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      language: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      duration: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      sunoLyrics: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      localVideoPath: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      finalVideoPath: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      recipientPhoneNumber: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => GenerationRequestCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => GenerationRequestAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => GenerationRequestMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => GenerationRequestMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => GenerationRequestSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const GenerationRequestScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GenerationRequestScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => GenerationRequestScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => GenerationRequestScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => GenerationRequestScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => GenerationRequestScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => GenerationRequestScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      occasion: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      recipientName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      prompt: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      senderName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      status: z
        .union([
          z.lazy(() => EnumRequestStatusWithAggregatesFilterSchema),
          z.lazy(() => RequestStatusSchema),
        ])
        .optional(),
      sunoSongId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      sunoAudioUrl: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      srt: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      isRTL: z
        .union([
          z.lazy(() => BoolNullableWithAggregatesFilterSchema),
          z.boolean(),
        ])
        .optional()
        .nullable(),
      language: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      duration: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      sunoLyrics: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      localVideoPath: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      finalVideoPath: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      recipientPhoneNumber: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const VideoImageWhereInputSchema: z.ZodType<Prisma.VideoImageWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VideoImageWhereInputSchema),
          z.lazy(() => VideoImageWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VideoImageWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VideoImageWhereInputSchema),
          z.lazy(() => VideoImageWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      photoId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      generationRequestId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      imageType: z
        .union([
          z.lazy(() => EnumImageTypeFilterSchema),
          z.lazy(() => ImageTypeSchema),
        ])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      generationRequest: z
        .union([
          z.lazy(() => GenerationRequestRelationFilterSchema),
          z.lazy(() => GenerationRequestWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VideoImageOrderByWithRelationInputSchema: z.ZodType<Prisma.VideoImageOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      photoId: z.lazy(() => SortOrderSchema).optional(),
      generationRequestId: z.lazy(() => SortOrderSchema).optional(),
      imageType: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      generationRequest: z
        .lazy(() => GenerationRequestOrderByWithRelationInputSchema)
        .optional(),
    })
    .strict();

export const VideoImageWhereUniqueInputSchema: z.ZodType<Prisma.VideoImageWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => VideoImageWhereInputSchema),
              z.lazy(() => VideoImageWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => VideoImageWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => VideoImageWhereInputSchema),
              z.lazy(() => VideoImageWhereInputSchema).array(),
            ])
            .optional(),
          photoId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          generationRequestId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          imageType: z
            .union([
              z.lazy(() => EnumImageTypeFilterSchema),
              z.lazy(() => ImageTypeSchema),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          generationRequest: z
            .union([
              z.lazy(() => GenerationRequestRelationFilterSchema),
              z.lazy(() => GenerationRequestWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const VideoImageOrderByWithAggregationInputSchema: z.ZodType<Prisma.VideoImageOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      photoId: z.lazy(() => SortOrderSchema).optional(),
      generationRequestId: z.lazy(() => SortOrderSchema).optional(),
      imageType: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => VideoImageCountOrderByAggregateInputSchema)
        .optional(),
      _max: z.lazy(() => VideoImageMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => VideoImageMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const VideoImageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VideoImageScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VideoImageScalarWhereWithAggregatesInputSchema),
          z.lazy(() => VideoImageScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VideoImageScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VideoImageScalarWhereWithAggregatesInputSchema),
          z.lazy(() => VideoImageScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      photoId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      generationRequestId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      imageType: z
        .union([
          z.lazy(() => EnumImageTypeWithAggregatesFilterSchema),
          z.lazy(() => ImageTypeSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoWhereInputSchema: z.ZodType<Prisma.StripePaymentInfoWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => StripePaymentInfoWhereInputSchema),
          z.lazy(() => StripePaymentInfoWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => StripePaymentInfoWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => StripePaymentInfoWhereInputSchema),
          z.lazy(() => StripePaymentInfoWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      generationRequestId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      stripePaymentId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      amount: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      currency: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      status: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      generationRequest: z
        .union([
          z.lazy(() => GenerationRequestRelationFilterSchema),
          z.lazy(() => GenerationRequestWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoOrderByWithRelationInputSchema: z.ZodType<Prisma.StripePaymentInfoOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      generationRequestId: z.lazy(() => SortOrderSchema).optional(),
      stripePaymentId: z.lazy(() => SortOrderSchema).optional(),
      amount: z.lazy(() => SortOrderSchema).optional(),
      currency: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      generationRequest: z
        .lazy(() => GenerationRequestOrderByWithRelationInputSchema)
        .optional(),
    })
    .strict();

export const StripePaymentInfoWhereUniqueInputSchema: z.ZodType<Prisma.StripePaymentInfoWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        generationRequestId: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        generationRequestId: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          generationRequestId: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => StripePaymentInfoWhereInputSchema),
              z.lazy(() => StripePaymentInfoWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => StripePaymentInfoWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => StripePaymentInfoWhereInputSchema),
              z.lazy(() => StripePaymentInfoWhereInputSchema).array(),
            ])
            .optional(),
          stripePaymentId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          amount: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          currency: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          status: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          generationRequest: z
            .union([
              z.lazy(() => GenerationRequestRelationFilterSchema),
              z.lazy(() => GenerationRequestWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const StripePaymentInfoOrderByWithAggregationInputSchema: z.ZodType<Prisma.StripePaymentInfoOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      generationRequestId: z.lazy(() => SortOrderSchema).optional(),
      stripePaymentId: z.lazy(() => SortOrderSchema).optional(),
      amount: z.lazy(() => SortOrderSchema).optional(),
      currency: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => StripePaymentInfoCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => StripePaymentInfoAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => StripePaymentInfoMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => StripePaymentInfoMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => StripePaymentInfoSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const StripePaymentInfoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StripePaymentInfoScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => StripePaymentInfoScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => StripePaymentInfoScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => StripePaymentInfoScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => StripePaymentInfoScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => StripePaymentInfoScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      generationRequestId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      stripePaymentId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      amount: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      currency: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      status: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const BookCreateInputSchema: z.ZodType<Prisma.BookCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    name: z.string(),
    author: z.string(),
    rating: z.number().int().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const BookUncheckedCreateInputSchema: z.ZodType<Prisma.BookUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string(),
      author: z.string(),
      rating: z.number().int().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const BookUpdateInputSchema: z.ZodType<Prisma.BookUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    author: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    rating: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })
  .strict();

export const BookUncheckedUpdateInputSchema: z.ZodType<Prisma.BookUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      author: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rating: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const BookCreateManyInputSchema: z.ZodType<Prisma.BookCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string(),
      author: z.string(),
      rating: z.number().int().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const BookUpdateManyMutationInputSchema: z.ZodType<Prisma.BookUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      author: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rating: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const BookUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BookUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      author: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      rating: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GenerationRequestCreateInputSchema = z
  .object({
    id: z.string().cuid().optional(),
    userId: z.string(),
    occasion: z.string(),
    recipientName: z.string(),
    prompt: z.string(),
    senderName: z.string(),
    status: z.lazy(() => RequestStatusSchema).optional(),
    sunoSongId: z.string().optional().nullable(),
    sunoAudioUrl: z.string().optional().nullable(),
    srt: z.string().optional().nullable(),
    isRTL: z.boolean().optional().nullable(),
    language: z.string().optional().nullable(),
    duration: z.number().int().optional().nullable(),
    sunoLyrics: z.string().optional().nullable(),
    localVideoPath: z.string().optional().nullable(),
    finalVideoPath: z.string().optional().nullable(),
    recipientPhoneNumber: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    videoImages: z
      .lazy(() => VideoImageCreateNestedManyWithoutGenerationRequestInputSchema)
      .optional(),
    stripePaymentInfo: z
      .lazy(
        () =>
          StripePaymentInfoCreateNestedOneWithoutGenerationRequestInputSchema,
      )
      .optional(),
  })
  .strict();

export const GenerationRequestUncheckedCreateInputSchema: z.ZodType<Prisma.GenerationRequestUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      occasion: z.string(),
      recipientName: z.string(),
      prompt: z.string(),
      senderName: z.string(),
      status: z.lazy(() => RequestStatusSchema).optional(),
      sunoSongId: z.string().optional().nullable(),
      sunoAudioUrl: z.string().optional().nullable(),
      srt: z.string().optional().nullable(),
      isRTL: z.boolean().optional().nullable(),
      language: z.string().optional().nullable(),
      duration: z.number().int().optional().nullable(),
      sunoLyrics: z.string().optional().nullable(),
      localVideoPath: z.string().optional().nullable(),
      finalVideoPath: z.string().optional().nullable(),
      recipientPhoneNumber: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      videoImages: z
        .lazy(
          () =>
            VideoImageUncheckedCreateNestedManyWithoutGenerationRequestInputSchema,
        )
        .optional(),
      stripePaymentInfo: z
        .lazy(
          () =>
            StripePaymentInfoUncheckedCreateNestedOneWithoutGenerationRequestInputSchema,
        )
        .optional(),
    })
    .strict();

export const GenerationRequestUpdateInputSchema: z.ZodType<Prisma.GenerationRequestUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      occasion: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      recipientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      senderName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => RequestStatusSchema),
          z.lazy(() => EnumRequestStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sunoSongId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoAudioUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      srt: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isRTL: z
        .union([
          z.boolean(),
          z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      language: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      duration: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoLyrics: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      localVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      finalVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      recipientPhoneNumber: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      videoImages: z
        .lazy(
          () => VideoImageUpdateManyWithoutGenerationRequestNestedInputSchema,
        )
        .optional(),
      stripePaymentInfo: z
        .lazy(
          () =>
            StripePaymentInfoUpdateOneWithoutGenerationRequestNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const GenerationRequestUncheckedUpdateInputSchema: z.ZodType<Prisma.GenerationRequestUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      occasion: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      recipientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      senderName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => RequestStatusSchema),
          z.lazy(() => EnumRequestStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sunoSongId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoAudioUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      srt: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isRTL: z
        .union([
          z.boolean(),
          z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      language: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      duration: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoLyrics: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      localVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      finalVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      recipientPhoneNumber: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      videoImages: z
        .lazy(
          () =>
            VideoImageUncheckedUpdateManyWithoutGenerationRequestNestedInputSchema,
        )
        .optional(),
      stripePaymentInfo: z
        .lazy(
          () =>
            StripePaymentInfoUncheckedUpdateOneWithoutGenerationRequestNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const GenerationRequestCreateManyInputSchema: z.ZodType<Prisma.GenerationRequestCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      occasion: z.string(),
      recipientName: z.string(),
      prompt: z.string(),
      senderName: z.string(),
      status: z.lazy(() => RequestStatusSchema).optional(),
      sunoSongId: z.string().optional().nullable(),
      sunoAudioUrl: z.string().optional().nullable(),
      srt: z.string().optional().nullable(),
      isRTL: z.boolean().optional().nullable(),
      language: z.string().optional().nullable(),
      duration: z.number().int().optional().nullable(),
      sunoLyrics: z.string().optional().nullable(),
      localVideoPath: z.string().optional().nullable(),
      finalVideoPath: z.string().optional().nullable(),
      recipientPhoneNumber: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const GenerationRequestUpdateManyMutationInputSchema: z.ZodType<Prisma.GenerationRequestUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      occasion: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      recipientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      senderName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => RequestStatusSchema),
          z.lazy(() => EnumRequestStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sunoSongId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoAudioUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      srt: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isRTL: z
        .union([
          z.boolean(),
          z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      language: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      duration: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoLyrics: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      localVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      finalVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      recipientPhoneNumber: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GenerationRequestUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GenerationRequestUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      occasion: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      recipientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      senderName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => RequestStatusSchema),
          z.lazy(() => EnumRequestStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sunoSongId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoAudioUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      srt: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isRTL: z
        .union([
          z.boolean(),
          z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      language: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      duration: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoLyrics: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      localVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      finalVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      recipientPhoneNumber: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VideoImageCreateInputSchema: z.ZodType<Prisma.VideoImageCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      photoId: z.string(),
      imageType: z.lazy(() => ImageTypeSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      generationRequest: z.lazy(
        () => GenerationRequestCreateNestedOneWithoutVideoImagesInputSchema,
      ),
    })
    .strict();

export const VideoImageUncheckedCreateInputSchema: z.ZodType<Prisma.VideoImageUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      photoId: z.string(),
      generationRequestId: z.string(),
      imageType: z.lazy(() => ImageTypeSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const VideoImageUpdateInputSchema: z.ZodType<Prisma.VideoImageUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      photoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageType: z
        .union([
          z.lazy(() => ImageTypeSchema),
          z.lazy(() => EnumImageTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      generationRequest: z
        .lazy(
          () =>
            GenerationRequestUpdateOneRequiredWithoutVideoImagesNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const VideoImageUncheckedUpdateInputSchema: z.ZodType<Prisma.VideoImageUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      photoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      generationRequestId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageType: z
        .union([
          z.lazy(() => ImageTypeSchema),
          z.lazy(() => EnumImageTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VideoImageCreateManyInputSchema: z.ZodType<Prisma.VideoImageCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      photoId: z.string(),
      generationRequestId: z.string(),
      imageType: z.lazy(() => ImageTypeSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const VideoImageUpdateManyMutationInputSchema: z.ZodType<Prisma.VideoImageUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      photoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageType: z
        .union([
          z.lazy(() => ImageTypeSchema),
          z.lazy(() => EnumImageTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VideoImageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VideoImageUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      photoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      generationRequestId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageType: z
        .union([
          z.lazy(() => ImageTypeSchema),
          z.lazy(() => EnumImageTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoCreateInputSchema: z.ZodType<Prisma.StripePaymentInfoCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      stripePaymentId: z.string(),
      amount: z.number().int(),
      currency: z.string(),
      status: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      generationRequest: z.lazy(
        () =>
          GenerationRequestCreateNestedOneWithoutStripePaymentInfoInputSchema,
      ),
    })
    .strict();

export const StripePaymentInfoUncheckedCreateInputSchema: z.ZodType<Prisma.StripePaymentInfoUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      generationRequestId: z.string(),
      stripePaymentId: z.string(),
      amount: z.number().int(),
      currency: z.string(),
      status: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const StripePaymentInfoUpdateInputSchema: z.ZodType<Prisma.StripePaymentInfoUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripePaymentId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      amount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currency: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      generationRequest: z
        .lazy(
          () =>
            GenerationRequestUpdateOneRequiredWithoutStripePaymentInfoNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const StripePaymentInfoUncheckedUpdateInputSchema: z.ZodType<Prisma.StripePaymentInfoUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      generationRequestId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripePaymentId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      amount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currency: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoCreateManyInputSchema: z.ZodType<Prisma.StripePaymentInfoCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      generationRequestId: z.string(),
      stripePaymentId: z.string(),
      amount: z.number().int(),
      currency: z.string(),
      status: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const StripePaymentInfoUpdateManyMutationInputSchema: z.ZodType<Prisma.StripePaymentInfoUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripePaymentId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      amount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currency: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StripePaymentInfoUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      generationRequestId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripePaymentId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      amount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currency: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const BookCountOrderByAggregateInputSchema: z.ZodType<Prisma.BookCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      author: z.lazy(() => SortOrderSchema).optional(),
      rating: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BookAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BookAvgOrderByAggregateInput> =
  z
    .object({
      rating: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BookMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BookMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      author: z.lazy(() => SortOrderSchema).optional(),
      rating: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BookMinOrderByAggregateInputSchema: z.ZodType<Prisma.BookMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      author: z.lazy(() => SortOrderSchema).optional(),
      rating: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const BookSumOrderByAggregateInputSchema: z.ZodType<Prisma.BookSumOrderByAggregateInput> =
  z
    .object({
      rating: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const EnumRequestStatusFilterSchema: z.ZodType<Prisma.EnumRequestStatusFilter> =
  z
    .object({
      equals: z.lazy(() => RequestStatusSchema).optional(),
      in: z
        .lazy(() => RequestStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RequestStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RequestStatusSchema),
          z.lazy(() => NestedEnumRequestStatusFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z
  .object({
    equals: z.boolean().optional().nullable(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const VideoImageListRelationFilterSchema: z.ZodType<Prisma.VideoImageListRelationFilter> =
  z
    .object({
      every: z.lazy(() => VideoImageWhereInputSchema).optional(),
      some: z.lazy(() => VideoImageWhereInputSchema).optional(),
      none: z.lazy(() => VideoImageWhereInputSchema).optional(),
    })
    .strict();

export const StripePaymentInfoNullableRelationFilterSchema: z.ZodType<Prisma.StripePaymentInfoNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => StripePaymentInfoWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => StripePaymentInfoWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const VideoImageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VideoImageOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GenerationRequestCountOrderByAggregateInputSchema: z.ZodType<Prisma.GenerationRequestCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      occasion: z.lazy(() => SortOrderSchema).optional(),
      recipientName: z.lazy(() => SortOrderSchema).optional(),
      prompt: z.lazy(() => SortOrderSchema).optional(),
      senderName: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      sunoSongId: z.lazy(() => SortOrderSchema).optional(),
      sunoAudioUrl: z.lazy(() => SortOrderSchema).optional(),
      srt: z.lazy(() => SortOrderSchema).optional(),
      isRTL: z.lazy(() => SortOrderSchema).optional(),
      language: z.lazy(() => SortOrderSchema).optional(),
      duration: z.lazy(() => SortOrderSchema).optional(),
      sunoLyrics: z.lazy(() => SortOrderSchema).optional(),
      localVideoPath: z.lazy(() => SortOrderSchema).optional(),
      finalVideoPath: z.lazy(() => SortOrderSchema).optional(),
      recipientPhoneNumber: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GenerationRequestAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GenerationRequestAvgOrderByAggregateInput> =
  z
    .object({
      duration: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GenerationRequestMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GenerationRequestMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      occasion: z.lazy(() => SortOrderSchema).optional(),
      recipientName: z.lazy(() => SortOrderSchema).optional(),
      prompt: z.lazy(() => SortOrderSchema).optional(),
      senderName: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      sunoSongId: z.lazy(() => SortOrderSchema).optional(),
      sunoAudioUrl: z.lazy(() => SortOrderSchema).optional(),
      srt: z.lazy(() => SortOrderSchema).optional(),
      isRTL: z.lazy(() => SortOrderSchema).optional(),
      language: z.lazy(() => SortOrderSchema).optional(),
      duration: z.lazy(() => SortOrderSchema).optional(),
      sunoLyrics: z.lazy(() => SortOrderSchema).optional(),
      localVideoPath: z.lazy(() => SortOrderSchema).optional(),
      finalVideoPath: z.lazy(() => SortOrderSchema).optional(),
      recipientPhoneNumber: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GenerationRequestMinOrderByAggregateInputSchema: z.ZodType<Prisma.GenerationRequestMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      occasion: z.lazy(() => SortOrderSchema).optional(),
      recipientName: z.lazy(() => SortOrderSchema).optional(),
      prompt: z.lazy(() => SortOrderSchema).optional(),
      senderName: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      sunoSongId: z.lazy(() => SortOrderSchema).optional(),
      sunoAudioUrl: z.lazy(() => SortOrderSchema).optional(),
      srt: z.lazy(() => SortOrderSchema).optional(),
      isRTL: z.lazy(() => SortOrderSchema).optional(),
      language: z.lazy(() => SortOrderSchema).optional(),
      duration: z.lazy(() => SortOrderSchema).optional(),
      sunoLyrics: z.lazy(() => SortOrderSchema).optional(),
      localVideoPath: z.lazy(() => SortOrderSchema).optional(),
      finalVideoPath: z.lazy(() => SortOrderSchema).optional(),
      recipientPhoneNumber: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const GenerationRequestSumOrderByAggregateInputSchema: z.ZodType<Prisma.GenerationRequestSumOrderByAggregateInput> =
  z
    .object({
      duration: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumRequestStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRequestStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => RequestStatusSchema).optional(),
      in: z
        .lazy(() => RequestStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RequestStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RequestStatusSchema),
          z.lazy(() => NestedEnumRequestStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumRequestStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumRequestStatusFilterSchema).optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional().nullable(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
    })
    .strict();

export const EnumImageTypeFilterSchema: z.ZodType<Prisma.EnumImageTypeFilter> =
  z
    .object({
      equals: z.lazy(() => ImageTypeSchema).optional(),
      in: z
        .lazy(() => ImageTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ImageTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ImageTypeSchema),
          z.lazy(() => NestedEnumImageTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const GenerationRequestRelationFilterSchema: z.ZodType<Prisma.GenerationRequestRelationFilter> =
  z
    .object({
      is: z.lazy(() => GenerationRequestWhereInputSchema).optional(),
      isNot: z.lazy(() => GenerationRequestWhereInputSchema).optional(),
    })
    .strict();

export const VideoImageCountOrderByAggregateInputSchema: z.ZodType<Prisma.VideoImageCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      photoId: z.lazy(() => SortOrderSchema).optional(),
      generationRequestId: z.lazy(() => SortOrderSchema).optional(),
      imageType: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VideoImageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VideoImageMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      photoId: z.lazy(() => SortOrderSchema).optional(),
      generationRequestId: z.lazy(() => SortOrderSchema).optional(),
      imageType: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VideoImageMinOrderByAggregateInputSchema: z.ZodType<Prisma.VideoImageMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      photoId: z.lazy(() => SortOrderSchema).optional(),
      generationRequestId: z.lazy(() => SortOrderSchema).optional(),
      imageType: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const EnumImageTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumImageTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => ImageTypeSchema).optional(),
      in: z
        .lazy(() => ImageTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ImageTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ImageTypeSchema),
          z.lazy(() => NestedEnumImageTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumImageTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumImageTypeFilterSchema).optional(),
    })
    .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const StripePaymentInfoCountOrderByAggregateInputSchema: z.ZodType<Prisma.StripePaymentInfoCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      generationRequestId: z.lazy(() => SortOrderSchema).optional(),
      stripePaymentId: z.lazy(() => SortOrderSchema).optional(),
      amount: z.lazy(() => SortOrderSchema).optional(),
      currency: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StripePaymentInfoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StripePaymentInfoAvgOrderByAggregateInput> =
  z
    .object({
      amount: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StripePaymentInfoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StripePaymentInfoMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      generationRequestId: z.lazy(() => SortOrderSchema).optional(),
      stripePaymentId: z.lazy(() => SortOrderSchema).optional(),
      amount: z.lazy(() => SortOrderSchema).optional(),
      currency: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StripePaymentInfoMinOrderByAggregateInputSchema: z.ZodType<Prisma.StripePaymentInfoMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      generationRequestId: z.lazy(() => SortOrderSchema).optional(),
      stripePaymentId: z.lazy(() => SortOrderSchema).optional(),
      amount: z.lazy(() => SortOrderSchema).optional(),
      currency: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StripePaymentInfoSumOrderByAggregateInputSchema: z.ZodType<Prisma.StripePaymentInfoSumOrderByAggregateInput> =
  z
    .object({
      amount: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const VideoImageCreateNestedManyWithoutGenerationRequestInputSchema: z.ZodType<Prisma.VideoImageCreateNestedManyWithoutGenerationRequestInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VideoImageCreateWithoutGenerationRequestInputSchema),
          z
            .lazy(() => VideoImageCreateWithoutGenerationRequestInputSchema)
            .array(),
          z.lazy(
            () => VideoImageUncheckedCreateWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageUncheckedCreateWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => VideoImageCreateOrConnectWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageCreateOrConnectWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => VideoImageCreateManyGenerationRequestInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => VideoImageWhereUniqueInputSchema),
          z.lazy(() => VideoImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoCreateNestedOneWithoutGenerationRequestInputSchema: z.ZodType<Prisma.StripePaymentInfoCreateNestedOneWithoutGenerationRequestInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => StripePaymentInfoCreateWithoutGenerationRequestInputSchema,
          ),
          z.lazy(
            () =>
              StripePaymentInfoUncheckedCreateWithoutGenerationRequestInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            StripePaymentInfoCreateOrConnectWithoutGenerationRequestInputSchema,
        )
        .optional(),
      connect: z.lazy(() => StripePaymentInfoWhereUniqueInputSchema).optional(),
    })
    .strict();

export const VideoImageUncheckedCreateNestedManyWithoutGenerationRequestInputSchema: z.ZodType<Prisma.VideoImageUncheckedCreateNestedManyWithoutGenerationRequestInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VideoImageCreateWithoutGenerationRequestInputSchema),
          z
            .lazy(() => VideoImageCreateWithoutGenerationRequestInputSchema)
            .array(),
          z.lazy(
            () => VideoImageUncheckedCreateWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageUncheckedCreateWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => VideoImageCreateOrConnectWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageCreateOrConnectWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => VideoImageCreateManyGenerationRequestInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => VideoImageWhereUniqueInputSchema),
          z.lazy(() => VideoImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoUncheckedCreateNestedOneWithoutGenerationRequestInputSchema: z.ZodType<Prisma.StripePaymentInfoUncheckedCreateNestedOneWithoutGenerationRequestInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => StripePaymentInfoCreateWithoutGenerationRequestInputSchema,
          ),
          z.lazy(
            () =>
              StripePaymentInfoUncheckedCreateWithoutGenerationRequestInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            StripePaymentInfoCreateOrConnectWithoutGenerationRequestInputSchema,
        )
        .optional(),
      connect: z.lazy(() => StripePaymentInfoWhereUniqueInputSchema).optional(),
    })
    .strict();

export const EnumRequestStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRequestStatusFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => RequestStatusSchema).optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> =
  z
    .object({
      set: z.boolean().optional().nullable(),
    })
    .strict();

export const VideoImageUpdateManyWithoutGenerationRequestNestedInputSchema: z.ZodType<Prisma.VideoImageUpdateManyWithoutGenerationRequestNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VideoImageCreateWithoutGenerationRequestInputSchema),
          z
            .lazy(() => VideoImageCreateWithoutGenerationRequestInputSchema)
            .array(),
          z.lazy(
            () => VideoImageUncheckedCreateWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageUncheckedCreateWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => VideoImageCreateOrConnectWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageCreateOrConnectWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              VideoImageUpsertWithWhereUniqueWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageUpsertWithWhereUniqueWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => VideoImageCreateManyGenerationRequestInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => VideoImageWhereUniqueInputSchema),
          z.lazy(() => VideoImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => VideoImageWhereUniqueInputSchema),
          z.lazy(() => VideoImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => VideoImageWhereUniqueInputSchema),
          z.lazy(() => VideoImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => VideoImageWhereUniqueInputSchema),
          z.lazy(() => VideoImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              VideoImageUpdateWithWhereUniqueWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageUpdateWithWhereUniqueWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              VideoImageUpdateManyWithWhereWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageUpdateManyWithWhereWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => VideoImageScalarWhereInputSchema),
          z.lazy(() => VideoImageScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoUpdateOneWithoutGenerationRequestNestedInputSchema: z.ZodType<Prisma.StripePaymentInfoUpdateOneWithoutGenerationRequestNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => StripePaymentInfoCreateWithoutGenerationRequestInputSchema,
          ),
          z.lazy(
            () =>
              StripePaymentInfoUncheckedCreateWithoutGenerationRequestInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            StripePaymentInfoCreateOrConnectWithoutGenerationRequestInputSchema,
        )
        .optional(),
      upsert: z
        .lazy(() => StripePaymentInfoUpsertWithoutGenerationRequestInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => StripePaymentInfoWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => StripePaymentInfoWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => StripePaymentInfoWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () =>
              StripePaymentInfoUpdateToOneWithWhereWithoutGenerationRequestInputSchema,
          ),
          z.lazy(
            () => StripePaymentInfoUpdateWithoutGenerationRequestInputSchema,
          ),
          z.lazy(
            () =>
              StripePaymentInfoUncheckedUpdateWithoutGenerationRequestInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const VideoImageUncheckedUpdateManyWithoutGenerationRequestNestedInputSchema: z.ZodType<Prisma.VideoImageUncheckedUpdateManyWithoutGenerationRequestNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VideoImageCreateWithoutGenerationRequestInputSchema),
          z
            .lazy(() => VideoImageCreateWithoutGenerationRequestInputSchema)
            .array(),
          z.lazy(
            () => VideoImageUncheckedCreateWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageUncheckedCreateWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => VideoImageCreateOrConnectWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageCreateOrConnectWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () =>
              VideoImageUpsertWithWhereUniqueWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageUpsertWithWhereUniqueWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => VideoImageCreateManyGenerationRequestInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => VideoImageWhereUniqueInputSchema),
          z.lazy(() => VideoImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => VideoImageWhereUniqueInputSchema),
          z.lazy(() => VideoImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => VideoImageWhereUniqueInputSchema),
          z.lazy(() => VideoImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => VideoImageWhereUniqueInputSchema),
          z.lazy(() => VideoImageWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              VideoImageUpdateWithWhereUniqueWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageUpdateWithWhereUniqueWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              VideoImageUpdateManyWithWhereWithoutGenerationRequestInputSchema,
          ),
          z
            .lazy(
              () =>
                VideoImageUpdateManyWithWhereWithoutGenerationRequestInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => VideoImageScalarWhereInputSchema),
          z.lazy(() => VideoImageScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoUncheckedUpdateOneWithoutGenerationRequestNestedInputSchema: z.ZodType<Prisma.StripePaymentInfoUncheckedUpdateOneWithoutGenerationRequestNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => StripePaymentInfoCreateWithoutGenerationRequestInputSchema,
          ),
          z.lazy(
            () =>
              StripePaymentInfoUncheckedCreateWithoutGenerationRequestInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            StripePaymentInfoCreateOrConnectWithoutGenerationRequestInputSchema,
        )
        .optional(),
      upsert: z
        .lazy(() => StripePaymentInfoUpsertWithoutGenerationRequestInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => StripePaymentInfoWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => StripePaymentInfoWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => StripePaymentInfoWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () =>
              StripePaymentInfoUpdateToOneWithWhereWithoutGenerationRequestInputSchema,
          ),
          z.lazy(
            () => StripePaymentInfoUpdateWithoutGenerationRequestInputSchema,
          ),
          z.lazy(
            () =>
              StripePaymentInfoUncheckedUpdateWithoutGenerationRequestInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const GenerationRequestCreateNestedOneWithoutVideoImagesInputSchema: z.ZodType<Prisma.GenerationRequestCreateNestedOneWithoutVideoImagesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GenerationRequestCreateWithoutVideoImagesInputSchema),
          z.lazy(
            () => GenerationRequestUncheckedCreateWithoutVideoImagesInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => GenerationRequestCreateOrConnectWithoutVideoImagesInputSchema,
        )
        .optional(),
      connect: z.lazy(() => GenerationRequestWhereUniqueInputSchema).optional(),
    })
    .strict();

export const EnumImageTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumImageTypeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => ImageTypeSchema).optional(),
    })
    .strict();

export const GenerationRequestUpdateOneRequiredWithoutVideoImagesNestedInputSchema: z.ZodType<Prisma.GenerationRequestUpdateOneRequiredWithoutVideoImagesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => GenerationRequestCreateWithoutVideoImagesInputSchema),
          z.lazy(
            () => GenerationRequestUncheckedCreateWithoutVideoImagesInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => GenerationRequestCreateOrConnectWithoutVideoImagesInputSchema,
        )
        .optional(),
      upsert: z
        .lazy(() => GenerationRequestUpsertWithoutVideoImagesInputSchema)
        .optional(),
      connect: z.lazy(() => GenerationRequestWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () =>
              GenerationRequestUpdateToOneWithWhereWithoutVideoImagesInputSchema,
          ),
          z.lazy(() => GenerationRequestUpdateWithoutVideoImagesInputSchema),
          z.lazy(
            () => GenerationRequestUncheckedUpdateWithoutVideoImagesInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const GenerationRequestCreateNestedOneWithoutStripePaymentInfoInputSchema: z.ZodType<Prisma.GenerationRequestCreateNestedOneWithoutStripePaymentInfoInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => GenerationRequestCreateWithoutStripePaymentInfoInputSchema,
          ),
          z.lazy(
            () =>
              GenerationRequestUncheckedCreateWithoutStripePaymentInfoInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            GenerationRequestCreateOrConnectWithoutStripePaymentInfoInputSchema,
        )
        .optional(),
      connect: z.lazy(() => GenerationRequestWhereUniqueInputSchema).optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const GenerationRequestUpdateOneRequiredWithoutStripePaymentInfoNestedInputSchema: z.ZodType<Prisma.GenerationRequestUpdateOneRequiredWithoutStripePaymentInfoNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => GenerationRequestCreateWithoutStripePaymentInfoInputSchema,
          ),
          z.lazy(
            () =>
              GenerationRequestUncheckedCreateWithoutStripePaymentInfoInputSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () =>
            GenerationRequestCreateOrConnectWithoutStripePaymentInfoInputSchema,
        )
        .optional(),
      upsert: z
        .lazy(() => GenerationRequestUpsertWithoutStripePaymentInfoInputSchema)
        .optional(),
      connect: z.lazy(() => GenerationRequestWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () =>
              GenerationRequestUpdateToOneWithWhereWithoutStripePaymentInfoInputSchema,
          ),
          z.lazy(
            () => GenerationRequestUpdateWithoutStripePaymentInfoInputSchema,
          ),
          z.lazy(
            () =>
              GenerationRequestUncheckedUpdateWithoutStripePaymentInfoInputSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedEnumRequestStatusFilterSchema: z.ZodType<Prisma.NestedEnumRequestStatusFilter> =
  z
    .object({
      equals: z.lazy(() => RequestStatusSchema).optional(),
      in: z
        .lazy(() => RequestStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RequestStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RequestStatusSchema),
          z.lazy(() => NestedEnumRequestStatusFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> =
  z
    .object({
      equals: z.boolean().optional().nullable(),
      not: z
        .union([z.boolean(), z.lazy(() => NestedBoolNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedEnumRequestStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRequestStatusWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => RequestStatusSchema).optional(),
      in: z
        .lazy(() => RequestStatusSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RequestStatusSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RequestStatusSchema),
          z.lazy(() => NestedEnumRequestStatusWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumRequestStatusFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumRequestStatusFilterSchema).optional(),
    })
    .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional().nullable(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
    })
    .strict();

export const NestedEnumImageTypeFilterSchema: z.ZodType<Prisma.NestedEnumImageTypeFilter> =
  z
    .object({
      equals: z.lazy(() => ImageTypeSchema).optional(),
      in: z
        .lazy(() => ImageTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ImageTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ImageTypeSchema),
          z.lazy(() => NestedEnumImageTypeFilterSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedEnumImageTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumImageTypeWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => ImageTypeSchema).optional(),
      in: z
        .lazy(() => ImageTypeSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => ImageTypeSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => ImageTypeSchema),
          z.lazy(() => NestedEnumImageTypeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumImageTypeFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumImageTypeFilterSchema).optional(),
    })
    .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const VideoImageCreateWithoutGenerationRequestInputSchema: z.ZodType<Prisma.VideoImageCreateWithoutGenerationRequestInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      photoId: z.string(),
      imageType: z.lazy(() => ImageTypeSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const VideoImageUncheckedCreateWithoutGenerationRequestInputSchema: z.ZodType<Prisma.VideoImageUncheckedCreateWithoutGenerationRequestInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      photoId: z.string(),
      imageType: z.lazy(() => ImageTypeSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const VideoImageCreateOrConnectWithoutGenerationRequestInputSchema: z.ZodType<Prisma.VideoImageCreateOrConnectWithoutGenerationRequestInput> =
  z
    .object({
      where: z.lazy(() => VideoImageWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => VideoImageCreateWithoutGenerationRequestInputSchema),
        z.lazy(
          () => VideoImageUncheckedCreateWithoutGenerationRequestInputSchema,
        ),
      ]),
    })
    .strict();

export const VideoImageCreateManyGenerationRequestInputEnvelopeSchema: z.ZodType<Prisma.VideoImageCreateManyGenerationRequestInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => VideoImageCreateManyGenerationRequestInputSchema),
        z.lazy(() => VideoImageCreateManyGenerationRequestInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const StripePaymentInfoCreateWithoutGenerationRequestInputSchema: z.ZodType<Prisma.StripePaymentInfoCreateWithoutGenerationRequestInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      stripePaymentId: z.string(),
      amount: z.number().int(),
      currency: z.string(),
      status: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const StripePaymentInfoUncheckedCreateWithoutGenerationRequestInputSchema: z.ZodType<Prisma.StripePaymentInfoUncheckedCreateWithoutGenerationRequestInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      stripePaymentId: z.string(),
      amount: z.number().int(),
      currency: z.string(),
      status: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const StripePaymentInfoCreateOrConnectWithoutGenerationRequestInputSchema: z.ZodType<Prisma.StripePaymentInfoCreateOrConnectWithoutGenerationRequestInput> =
  z
    .object({
      where: z.lazy(() => StripePaymentInfoWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () => StripePaymentInfoCreateWithoutGenerationRequestInputSchema,
        ),
        z.lazy(
          () =>
            StripePaymentInfoUncheckedCreateWithoutGenerationRequestInputSchema,
        ),
      ]),
    })
    .strict();

export const VideoImageUpsertWithWhereUniqueWithoutGenerationRequestInputSchema: z.ZodType<Prisma.VideoImageUpsertWithWhereUniqueWithoutGenerationRequestInput> =
  z
    .object({
      where: z.lazy(() => VideoImageWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => VideoImageUpdateWithoutGenerationRequestInputSchema),
        z.lazy(
          () => VideoImageUncheckedUpdateWithoutGenerationRequestInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => VideoImageCreateWithoutGenerationRequestInputSchema),
        z.lazy(
          () => VideoImageUncheckedCreateWithoutGenerationRequestInputSchema,
        ),
      ]),
    })
    .strict();

export const VideoImageUpdateWithWhereUniqueWithoutGenerationRequestInputSchema: z.ZodType<Prisma.VideoImageUpdateWithWhereUniqueWithoutGenerationRequestInput> =
  z
    .object({
      where: z.lazy(() => VideoImageWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => VideoImageUpdateWithoutGenerationRequestInputSchema),
        z.lazy(
          () => VideoImageUncheckedUpdateWithoutGenerationRequestInputSchema,
        ),
      ]),
    })
    .strict();

export const VideoImageUpdateManyWithWhereWithoutGenerationRequestInputSchema: z.ZodType<Prisma.VideoImageUpdateManyWithWhereWithoutGenerationRequestInput> =
  z
    .object({
      where: z.lazy(() => VideoImageScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => VideoImageUpdateManyMutationInputSchema),
        z.lazy(
          () =>
            VideoImageUncheckedUpdateManyWithoutGenerationRequestInputSchema,
        ),
      ]),
    })
    .strict();

export const VideoImageScalarWhereInputSchema: z.ZodType<Prisma.VideoImageScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VideoImageScalarWhereInputSchema),
          z.lazy(() => VideoImageScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VideoImageScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VideoImageScalarWhereInputSchema),
          z.lazy(() => VideoImageScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      photoId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      generationRequestId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      imageType: z
        .union([
          z.lazy(() => EnumImageTypeFilterSchema),
          z.lazy(() => ImageTypeSchema),
        ])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const StripePaymentInfoUpsertWithoutGenerationRequestInputSchema: z.ZodType<Prisma.StripePaymentInfoUpsertWithoutGenerationRequestInput> =
  z
    .object({
      update: z.union([
        z.lazy(
          () => StripePaymentInfoUpdateWithoutGenerationRequestInputSchema,
        ),
        z.lazy(
          () =>
            StripePaymentInfoUncheckedUpdateWithoutGenerationRequestInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () => StripePaymentInfoCreateWithoutGenerationRequestInputSchema,
        ),
        z.lazy(
          () =>
            StripePaymentInfoUncheckedCreateWithoutGenerationRequestInputSchema,
        ),
      ]),
      where: z.lazy(() => StripePaymentInfoWhereInputSchema).optional(),
    })
    .strict();

export const StripePaymentInfoUpdateToOneWithWhereWithoutGenerationRequestInputSchema: z.ZodType<Prisma.StripePaymentInfoUpdateToOneWithWhereWithoutGenerationRequestInput> =
  z
    .object({
      where: z.lazy(() => StripePaymentInfoWhereInputSchema).optional(),
      data: z.union([
        z.lazy(
          () => StripePaymentInfoUpdateWithoutGenerationRequestInputSchema,
        ),
        z.lazy(
          () =>
            StripePaymentInfoUncheckedUpdateWithoutGenerationRequestInputSchema,
        ),
      ]),
    })
    .strict();

export const StripePaymentInfoUpdateWithoutGenerationRequestInputSchema: z.ZodType<Prisma.StripePaymentInfoUpdateWithoutGenerationRequestInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripePaymentId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      amount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currency: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoUncheckedUpdateWithoutGenerationRequestInputSchema: z.ZodType<Prisma.StripePaymentInfoUncheckedUpdateWithoutGenerationRequestInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripePaymentId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      amount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      currency: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const GenerationRequestCreateWithoutVideoImagesInputSchema: z.ZodType<Prisma.GenerationRequestCreateWithoutVideoImagesInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      occasion: z.string(),
      recipientName: z.string(),
      prompt: z.string(),
      senderName: z.string(),
      status: z.lazy(() => RequestStatusSchema).optional(),
      sunoSongId: z.string().optional().nullable(),
      sunoAudioUrl: z.string().optional().nullable(),
      srt: z.string().optional().nullable(),
      isRTL: z.boolean().optional().nullable(),
      language: z.string().optional().nullable(),
      duration: z.number().int().optional().nullable(),
      sunoLyrics: z.string().optional().nullable(),
      localVideoPath: z.string().optional().nullable(),
      finalVideoPath: z.string().optional().nullable(),
      recipientPhoneNumber: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripePaymentInfo: z
        .lazy(
          () =>
            StripePaymentInfoCreateNestedOneWithoutGenerationRequestInputSchema,
        )
        .optional(),
    })
    .strict();

export const GenerationRequestUncheckedCreateWithoutVideoImagesInputSchema: z.ZodType<Prisma.GenerationRequestUncheckedCreateWithoutVideoImagesInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      occasion: z.string(),
      recipientName: z.string(),
      prompt: z.string(),
      senderName: z.string(),
      status: z.lazy(() => RequestStatusSchema).optional(),
      sunoSongId: z.string().optional().nullable(),
      sunoAudioUrl: z.string().optional().nullable(),
      srt: z.string().optional().nullable(),
      isRTL: z.boolean().optional().nullable(),
      language: z.string().optional().nullable(),
      duration: z.number().int().optional().nullable(),
      sunoLyrics: z.string().optional().nullable(),
      localVideoPath: z.string().optional().nullable(),
      finalVideoPath: z.string().optional().nullable(),
      recipientPhoneNumber: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      stripePaymentInfo: z
        .lazy(
          () =>
            StripePaymentInfoUncheckedCreateNestedOneWithoutGenerationRequestInputSchema,
        )
        .optional(),
    })
    .strict();

export const GenerationRequestCreateOrConnectWithoutVideoImagesInputSchema: z.ZodType<Prisma.GenerationRequestCreateOrConnectWithoutVideoImagesInput> =
  z
    .object({
      where: z.lazy(() => GenerationRequestWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => GenerationRequestCreateWithoutVideoImagesInputSchema),
        z.lazy(
          () => GenerationRequestUncheckedCreateWithoutVideoImagesInputSchema,
        ),
      ]),
    })
    .strict();

export const GenerationRequestUpsertWithoutVideoImagesInputSchema: z.ZodType<Prisma.GenerationRequestUpsertWithoutVideoImagesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => GenerationRequestUpdateWithoutVideoImagesInputSchema),
        z.lazy(
          () => GenerationRequestUncheckedUpdateWithoutVideoImagesInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => GenerationRequestCreateWithoutVideoImagesInputSchema),
        z.lazy(
          () => GenerationRequestUncheckedCreateWithoutVideoImagesInputSchema,
        ),
      ]),
      where: z.lazy(() => GenerationRequestWhereInputSchema).optional(),
    })
    .strict();

export const GenerationRequestUpdateToOneWithWhereWithoutVideoImagesInputSchema: z.ZodType<Prisma.GenerationRequestUpdateToOneWithWhereWithoutVideoImagesInput> =
  z
    .object({
      where: z.lazy(() => GenerationRequestWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => GenerationRequestUpdateWithoutVideoImagesInputSchema),
        z.lazy(
          () => GenerationRequestUncheckedUpdateWithoutVideoImagesInputSchema,
        ),
      ]),
    })
    .strict();

export const GenerationRequestUpdateWithoutVideoImagesInputSchema: z.ZodType<Prisma.GenerationRequestUpdateWithoutVideoImagesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      occasion: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      recipientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      senderName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => RequestStatusSchema),
          z.lazy(() => EnumRequestStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sunoSongId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoAudioUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      srt: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isRTL: z
        .union([
          z.boolean(),
          z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      language: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      duration: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoLyrics: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      localVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      finalVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      recipientPhoneNumber: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripePaymentInfo: z
        .lazy(
          () =>
            StripePaymentInfoUpdateOneWithoutGenerationRequestNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const GenerationRequestUncheckedUpdateWithoutVideoImagesInputSchema: z.ZodType<Prisma.GenerationRequestUncheckedUpdateWithoutVideoImagesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      occasion: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      recipientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      senderName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => RequestStatusSchema),
          z.lazy(() => EnumRequestStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sunoSongId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoAudioUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      srt: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isRTL: z
        .union([
          z.boolean(),
          z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      language: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      duration: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoLyrics: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      localVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      finalVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      recipientPhoneNumber: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripePaymentInfo: z
        .lazy(
          () =>
            StripePaymentInfoUncheckedUpdateOneWithoutGenerationRequestNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const GenerationRequestCreateWithoutStripePaymentInfoInputSchema: z.ZodType<Prisma.GenerationRequestCreateWithoutStripePaymentInfoInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      occasion: z.string(),
      recipientName: z.string(),
      prompt: z.string(),
      senderName: z.string(),
      status: z.lazy(() => RequestStatusSchema).optional(),
      sunoSongId: z.string().optional().nullable(),
      sunoAudioUrl: z.string().optional().nullable(),
      srt: z.string().optional().nullable(),
      isRTL: z.boolean().optional().nullable(),
      language: z.string().optional().nullable(),
      duration: z.number().int().optional().nullable(),
      sunoLyrics: z.string().optional().nullable(),
      localVideoPath: z.string().optional().nullable(),
      finalVideoPath: z.string().optional().nullable(),
      recipientPhoneNumber: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      videoImages: z
        .lazy(
          () => VideoImageCreateNestedManyWithoutGenerationRequestInputSchema,
        )
        .optional(),
    })
    .strict();

export const GenerationRequestUncheckedCreateWithoutStripePaymentInfoInputSchema: z.ZodType<Prisma.GenerationRequestUncheckedCreateWithoutStripePaymentInfoInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      userId: z.string(),
      occasion: z.string(),
      recipientName: z.string(),
      prompt: z.string(),
      senderName: z.string(),
      status: z.lazy(() => RequestStatusSchema).optional(),
      sunoSongId: z.string().optional().nullable(),
      sunoAudioUrl: z.string().optional().nullable(),
      srt: z.string().optional().nullable(),
      isRTL: z.boolean().optional().nullable(),
      language: z.string().optional().nullable(),
      duration: z.number().int().optional().nullable(),
      sunoLyrics: z.string().optional().nullable(),
      localVideoPath: z.string().optional().nullable(),
      finalVideoPath: z.string().optional().nullable(),
      recipientPhoneNumber: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      videoImages: z
        .lazy(
          () =>
            VideoImageUncheckedCreateNestedManyWithoutGenerationRequestInputSchema,
        )
        .optional(),
    })
    .strict();

export const GenerationRequestCreateOrConnectWithoutStripePaymentInfoInputSchema: z.ZodType<Prisma.GenerationRequestCreateOrConnectWithoutStripePaymentInfoInput> =
  z
    .object({
      where: z.lazy(() => GenerationRequestWhereUniqueInputSchema),
      create: z.union([
        z.lazy(
          () => GenerationRequestCreateWithoutStripePaymentInfoInputSchema,
        ),
        z.lazy(
          () =>
            GenerationRequestUncheckedCreateWithoutStripePaymentInfoInputSchema,
        ),
      ]),
    })
    .strict();

export const GenerationRequestUpsertWithoutStripePaymentInfoInputSchema: z.ZodType<Prisma.GenerationRequestUpsertWithoutStripePaymentInfoInput> =
  z
    .object({
      update: z.union([
        z.lazy(
          () => GenerationRequestUpdateWithoutStripePaymentInfoInputSchema,
        ),
        z.lazy(
          () =>
            GenerationRequestUncheckedUpdateWithoutStripePaymentInfoInputSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () => GenerationRequestCreateWithoutStripePaymentInfoInputSchema,
        ),
        z.lazy(
          () =>
            GenerationRequestUncheckedCreateWithoutStripePaymentInfoInputSchema,
        ),
      ]),
      where: z.lazy(() => GenerationRequestWhereInputSchema).optional(),
    })
    .strict();

export const GenerationRequestUpdateToOneWithWhereWithoutStripePaymentInfoInputSchema: z.ZodType<Prisma.GenerationRequestUpdateToOneWithWhereWithoutStripePaymentInfoInput> =
  z
    .object({
      where: z.lazy(() => GenerationRequestWhereInputSchema).optional(),
      data: z.union([
        z.lazy(
          () => GenerationRequestUpdateWithoutStripePaymentInfoInputSchema,
        ),
        z.lazy(
          () =>
            GenerationRequestUncheckedUpdateWithoutStripePaymentInfoInputSchema,
        ),
      ]),
    })
    .strict();

export const GenerationRequestUpdateWithoutStripePaymentInfoInputSchema: z.ZodType<Prisma.GenerationRequestUpdateWithoutStripePaymentInfoInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      occasion: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      recipientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      senderName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => RequestStatusSchema),
          z.lazy(() => EnumRequestStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sunoSongId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoAudioUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      srt: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isRTL: z
        .union([
          z.boolean(),
          z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      language: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      duration: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoLyrics: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      localVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      finalVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      recipientPhoneNumber: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      videoImages: z
        .lazy(
          () => VideoImageUpdateManyWithoutGenerationRequestNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const GenerationRequestUncheckedUpdateWithoutStripePaymentInfoInputSchema: z.ZodType<Prisma.GenerationRequestUncheckedUpdateWithoutStripePaymentInfoInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      occasion: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      recipientName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      prompt: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      senderName: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.lazy(() => RequestStatusSchema),
          z.lazy(() => EnumRequestStatusFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sunoSongId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoAudioUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      srt: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      isRTL: z
        .union([
          z.boolean(),
          z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      language: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      duration: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sunoLyrics: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      localVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      finalVideoPath: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      recipientPhoneNumber: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      videoImages: z
        .lazy(
          () =>
            VideoImageUncheckedUpdateManyWithoutGenerationRequestNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const VideoImageCreateManyGenerationRequestInputSchema: z.ZodType<Prisma.VideoImageCreateManyGenerationRequestInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      photoId: z.string(),
      imageType: z.lazy(() => ImageTypeSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const VideoImageUpdateWithoutGenerationRequestInputSchema: z.ZodType<Prisma.VideoImageUpdateWithoutGenerationRequestInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      photoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageType: z
        .union([
          z.lazy(() => ImageTypeSchema),
          z.lazy(() => EnumImageTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VideoImageUncheckedUpdateWithoutGenerationRequestInputSchema: z.ZodType<Prisma.VideoImageUncheckedUpdateWithoutGenerationRequestInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      photoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageType: z
        .union([
          z.lazy(() => ImageTypeSchema),
          z.lazy(() => EnumImageTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VideoImageUncheckedUpdateManyWithoutGenerationRequestInputSchema: z.ZodType<Prisma.VideoImageUncheckedUpdateManyWithoutGenerationRequestInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      photoId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      imageType: z
        .union([
          z.lazy(() => ImageTypeSchema),
          z.lazy(() => EnumImageTypeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const BookFindFirstArgsSchema: z.ZodType<Prisma.BookFindFirstArgs> = z
  .object({
    select: BookSelectSchema.optional(),
    where: BookWhereInputSchema.optional(),
    orderBy: z
      .union([
        BookOrderByWithRelationInputSchema.array(),
        BookOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: BookWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([BookScalarFieldEnumSchema, BookScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const BookFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BookFindFirstOrThrowArgs> =
  z
    .object({
      select: BookSelectSchema.optional(),
      where: BookWhereInputSchema.optional(),
      orderBy: z
        .union([
          BookOrderByWithRelationInputSchema.array(),
          BookOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: BookWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([BookScalarFieldEnumSchema, BookScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const BookFindManyArgsSchema: z.ZodType<Prisma.BookFindManyArgs> = z
  .object({
    select: BookSelectSchema.optional(),
    where: BookWhereInputSchema.optional(),
    orderBy: z
      .union([
        BookOrderByWithRelationInputSchema.array(),
        BookOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: BookWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([BookScalarFieldEnumSchema, BookScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const BookAggregateArgsSchema: z.ZodType<Prisma.BookAggregateArgs> = z
  .object({
    where: BookWhereInputSchema.optional(),
    orderBy: z
      .union([
        BookOrderByWithRelationInputSchema.array(),
        BookOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: BookWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const BookGroupByArgsSchema: z.ZodType<Prisma.BookGroupByArgs> = z
  .object({
    where: BookWhereInputSchema.optional(),
    orderBy: z
      .union([
        BookOrderByWithAggregationInputSchema.array(),
        BookOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: BookScalarFieldEnumSchema.array(),
    having: BookScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const BookFindUniqueArgsSchema: z.ZodType<Prisma.BookFindUniqueArgs> = z
  .object({
    select: BookSelectSchema.optional(),
    where: BookWhereUniqueInputSchema,
  })
  .strict();

export const BookFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BookFindUniqueOrThrowArgs> =
  z
    .object({
      select: BookSelectSchema.optional(),
      where: BookWhereUniqueInputSchema,
    })
    .strict();

export const GenerationRequestFindFirstArgsSchema: z.ZodType<Prisma.GenerationRequestFindFirstArgs> =
  z
    .object({
      select: GenerationRequestSelectSchema.optional(),
      include: GenerationRequestIncludeSchema.optional(),
      where: GenerationRequestWhereInputSchema.optional(),
      orderBy: z
        .union([
          GenerationRequestOrderByWithRelationInputSchema.array(),
          GenerationRequestOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GenerationRequestWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          GenerationRequestScalarFieldEnumSchema,
          GenerationRequestScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const GenerationRequestFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GenerationRequestFindFirstOrThrowArgs> =
  z
    .object({
      select: GenerationRequestSelectSchema.optional(),
      include: GenerationRequestIncludeSchema.optional(),
      where: GenerationRequestWhereInputSchema.optional(),
      orderBy: z
        .union([
          GenerationRequestOrderByWithRelationInputSchema.array(),
          GenerationRequestOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GenerationRequestWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          GenerationRequestScalarFieldEnumSchema,
          GenerationRequestScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const GenerationRequestFindManyArgsSchema: z.ZodType<Prisma.GenerationRequestFindManyArgs> =
  z
    .object({
      select: GenerationRequestSelectSchema.optional(),
      include: GenerationRequestIncludeSchema.optional(),
      where: GenerationRequestWhereInputSchema.optional(),
      orderBy: z
        .union([
          GenerationRequestOrderByWithRelationInputSchema.array(),
          GenerationRequestOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GenerationRequestWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          GenerationRequestScalarFieldEnumSchema,
          GenerationRequestScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const GenerationRequestAggregateArgsSchema: z.ZodType<Prisma.GenerationRequestAggregateArgs> =
  z
    .object({
      where: GenerationRequestWhereInputSchema.optional(),
      orderBy: z
        .union([
          GenerationRequestOrderByWithRelationInputSchema.array(),
          GenerationRequestOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: GenerationRequestWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const GenerationRequestGroupByArgsSchema: z.ZodType<Prisma.GenerationRequestGroupByArgs> =
  z
    .object({
      where: GenerationRequestWhereInputSchema.optional(),
      orderBy: z
        .union([
          GenerationRequestOrderByWithAggregationInputSchema.array(),
          GenerationRequestOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: GenerationRequestScalarFieldEnumSchema.array(),
      having: GenerationRequestScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const GenerationRequestFindUniqueArgsSchema: z.ZodType<Prisma.GenerationRequestFindUniqueArgs> =
  z
    .object({
      select: GenerationRequestSelectSchema.optional(),
      include: GenerationRequestIncludeSchema.optional(),
      where: GenerationRequestWhereUniqueInputSchema,
    })
    .strict();

export const GenerationRequestFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GenerationRequestFindUniqueOrThrowArgs> =
  z
    .object({
      select: GenerationRequestSelectSchema.optional(),
      include: GenerationRequestIncludeSchema.optional(),
      where: GenerationRequestWhereUniqueInputSchema,
    })
    .strict();

export const VideoImageFindFirstArgsSchema: z.ZodType<Prisma.VideoImageFindFirstArgs> =
  z
    .object({
      select: VideoImageSelectSchema.optional(),
      include: VideoImageIncludeSchema.optional(),
      where: VideoImageWhereInputSchema.optional(),
      orderBy: z
        .union([
          VideoImageOrderByWithRelationInputSchema.array(),
          VideoImageOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VideoImageWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VideoImageScalarFieldEnumSchema,
          VideoImageScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VideoImageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VideoImageFindFirstOrThrowArgs> =
  z
    .object({
      select: VideoImageSelectSchema.optional(),
      include: VideoImageIncludeSchema.optional(),
      where: VideoImageWhereInputSchema.optional(),
      orderBy: z
        .union([
          VideoImageOrderByWithRelationInputSchema.array(),
          VideoImageOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VideoImageWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VideoImageScalarFieldEnumSchema,
          VideoImageScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VideoImageFindManyArgsSchema: z.ZodType<Prisma.VideoImageFindManyArgs> =
  z
    .object({
      select: VideoImageSelectSchema.optional(),
      include: VideoImageIncludeSchema.optional(),
      where: VideoImageWhereInputSchema.optional(),
      orderBy: z
        .union([
          VideoImageOrderByWithRelationInputSchema.array(),
          VideoImageOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VideoImageWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VideoImageScalarFieldEnumSchema,
          VideoImageScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VideoImageAggregateArgsSchema: z.ZodType<Prisma.VideoImageAggregateArgs> =
  z
    .object({
      where: VideoImageWhereInputSchema.optional(),
      orderBy: z
        .union([
          VideoImageOrderByWithRelationInputSchema.array(),
          VideoImageOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VideoImageWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VideoImageGroupByArgsSchema: z.ZodType<Prisma.VideoImageGroupByArgs> =
  z
    .object({
      where: VideoImageWhereInputSchema.optional(),
      orderBy: z
        .union([
          VideoImageOrderByWithAggregationInputSchema.array(),
          VideoImageOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: VideoImageScalarFieldEnumSchema.array(),
      having: VideoImageScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VideoImageFindUniqueArgsSchema: z.ZodType<Prisma.VideoImageFindUniqueArgs> =
  z
    .object({
      select: VideoImageSelectSchema.optional(),
      include: VideoImageIncludeSchema.optional(),
      where: VideoImageWhereUniqueInputSchema,
    })
    .strict();

export const VideoImageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VideoImageFindUniqueOrThrowArgs> =
  z
    .object({
      select: VideoImageSelectSchema.optional(),
      include: VideoImageIncludeSchema.optional(),
      where: VideoImageWhereUniqueInputSchema,
    })
    .strict();

export const StripePaymentInfoFindFirstArgsSchema: z.ZodType<Prisma.StripePaymentInfoFindFirstArgs> =
  z
    .object({
      select: StripePaymentInfoSelectSchema.optional(),
      include: StripePaymentInfoIncludeSchema.optional(),
      where: StripePaymentInfoWhereInputSchema.optional(),
      orderBy: z
        .union([
          StripePaymentInfoOrderByWithRelationInputSchema.array(),
          StripePaymentInfoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: StripePaymentInfoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          StripePaymentInfoScalarFieldEnumSchema,
          StripePaymentInfoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StripePaymentInfoFindFirstOrThrowArgs> =
  z
    .object({
      select: StripePaymentInfoSelectSchema.optional(),
      include: StripePaymentInfoIncludeSchema.optional(),
      where: StripePaymentInfoWhereInputSchema.optional(),
      orderBy: z
        .union([
          StripePaymentInfoOrderByWithRelationInputSchema.array(),
          StripePaymentInfoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: StripePaymentInfoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          StripePaymentInfoScalarFieldEnumSchema,
          StripePaymentInfoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoFindManyArgsSchema: z.ZodType<Prisma.StripePaymentInfoFindManyArgs> =
  z
    .object({
      select: StripePaymentInfoSelectSchema.optional(),
      include: StripePaymentInfoIncludeSchema.optional(),
      where: StripePaymentInfoWhereInputSchema.optional(),
      orderBy: z
        .union([
          StripePaymentInfoOrderByWithRelationInputSchema.array(),
          StripePaymentInfoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: StripePaymentInfoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          StripePaymentInfoScalarFieldEnumSchema,
          StripePaymentInfoScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const StripePaymentInfoAggregateArgsSchema: z.ZodType<Prisma.StripePaymentInfoAggregateArgs> =
  z
    .object({
      where: StripePaymentInfoWhereInputSchema.optional(),
      orderBy: z
        .union([
          StripePaymentInfoOrderByWithRelationInputSchema.array(),
          StripePaymentInfoOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: StripePaymentInfoWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const StripePaymentInfoGroupByArgsSchema: z.ZodType<Prisma.StripePaymentInfoGroupByArgs> =
  z
    .object({
      where: StripePaymentInfoWhereInputSchema.optional(),
      orderBy: z
        .union([
          StripePaymentInfoOrderByWithAggregationInputSchema.array(),
          StripePaymentInfoOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: StripePaymentInfoScalarFieldEnumSchema.array(),
      having: StripePaymentInfoScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const StripePaymentInfoFindUniqueArgsSchema: z.ZodType<Prisma.StripePaymentInfoFindUniqueArgs> =
  z
    .object({
      select: StripePaymentInfoSelectSchema.optional(),
      include: StripePaymentInfoIncludeSchema.optional(),
      where: StripePaymentInfoWhereUniqueInputSchema,
    })
    .strict();

export const StripePaymentInfoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StripePaymentInfoFindUniqueOrThrowArgs> =
  z
    .object({
      select: StripePaymentInfoSelectSchema.optional(),
      include: StripePaymentInfoIncludeSchema.optional(),
      where: StripePaymentInfoWhereUniqueInputSchema,
    })
    .strict();

export const BookCreateArgsSchema: z.ZodType<Prisma.BookCreateArgs> = z
  .object({
    select: BookSelectSchema.optional(),
    data: z.union([BookCreateInputSchema, BookUncheckedCreateInputSchema]),
  })
  .strict();

export const BookUpsertArgsSchema: z.ZodType<Prisma.BookUpsertArgs> = z
  .object({
    select: BookSelectSchema.optional(),
    where: BookWhereUniqueInputSchema,
    create: z.union([BookCreateInputSchema, BookUncheckedCreateInputSchema]),
    update: z.union([BookUpdateInputSchema, BookUncheckedUpdateInputSchema]),
  })
  .strict();

export const BookCreateManyArgsSchema: z.ZodType<Prisma.BookCreateManyArgs> = z
  .object({
    data: z.union([
      BookCreateManyInputSchema,
      BookCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const BookCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BookCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        BookCreateManyInputSchema,
        BookCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const BookDeleteArgsSchema: z.ZodType<Prisma.BookDeleteArgs> = z
  .object({
    select: BookSelectSchema.optional(),
    where: BookWhereUniqueInputSchema,
  })
  .strict();

export const BookUpdateArgsSchema: z.ZodType<Prisma.BookUpdateArgs> = z
  .object({
    select: BookSelectSchema.optional(),
    data: z.union([BookUpdateInputSchema, BookUncheckedUpdateInputSchema]),
    where: BookWhereUniqueInputSchema,
  })
  .strict();

export const BookUpdateManyArgsSchema: z.ZodType<Prisma.BookUpdateManyArgs> = z
  .object({
    data: z.union([
      BookUpdateManyMutationInputSchema,
      BookUncheckedUpdateManyInputSchema,
    ]),
    where: BookWhereInputSchema.optional(),
  })
  .strict();

export const BookDeleteManyArgsSchema: z.ZodType<Prisma.BookDeleteManyArgs> = z
  .object({
    where: BookWhereInputSchema.optional(),
  })
  .strict();

export const GenerationRequestCreateArgsSchema: z.ZodType<Prisma.GenerationRequestCreateArgs> =
  z
    .object({
      select: GenerationRequestSelectSchema.optional(),
      include: GenerationRequestIncludeSchema.optional(),
      data: z.union([
        GenerationRequestCreateInputSchema,
        GenerationRequestUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const GenerationRequestUpsertArgsSchema: z.ZodType<Prisma.GenerationRequestUpsertArgs> =
  z
    .object({
      select: GenerationRequestSelectSchema.optional(),
      include: GenerationRequestIncludeSchema.optional(),
      where: GenerationRequestWhereUniqueInputSchema,
      create: z.union([
        GenerationRequestCreateInputSchema,
        GenerationRequestUncheckedCreateInputSchema,
      ]),
      update: z.union([
        GenerationRequestUpdateInputSchema,
        GenerationRequestUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const GenerationRequestCreateManyArgsSchema: z.ZodType<Prisma.GenerationRequestCreateManyArgs> =
  z
    .object({
      data: z.union([
        GenerationRequestCreateManyInputSchema,
        GenerationRequestCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const GenerationRequestCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GenerationRequestCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        GenerationRequestCreateManyInputSchema,
        GenerationRequestCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const GenerationRequestDeleteArgsSchema: z.ZodType<Prisma.GenerationRequestDeleteArgs> =
  z
    .object({
      select: GenerationRequestSelectSchema.optional(),
      include: GenerationRequestIncludeSchema.optional(),
      where: GenerationRequestWhereUniqueInputSchema,
    })
    .strict();

export const GenerationRequestUpdateArgsSchema: z.ZodType<Prisma.GenerationRequestUpdateArgs> =
  z
    .object({
      select: GenerationRequestSelectSchema.optional(),
      include: GenerationRequestIncludeSchema.optional(),
      data: z.union([
        GenerationRequestUpdateInputSchema,
        GenerationRequestUncheckedUpdateInputSchema,
      ]),
      where: GenerationRequestWhereUniqueInputSchema,
    })
    .strict();

export const GenerationRequestUpdateManyArgsSchema: z.ZodType<Prisma.GenerationRequestUpdateManyArgs> =
  z
    .object({
      data: z.union([
        GenerationRequestUpdateManyMutationInputSchema,
        GenerationRequestUncheckedUpdateManyInputSchema,
      ]),
      where: GenerationRequestWhereInputSchema.optional(),
    })
    .strict();

export const GenerationRequestDeleteManyArgsSchema: z.ZodType<Prisma.GenerationRequestDeleteManyArgs> =
  z
    .object({
      where: GenerationRequestWhereInputSchema.optional(),
    })
    .strict();

export const VideoImageCreateArgsSchema: z.ZodType<Prisma.VideoImageCreateArgs> =
  z
    .object({
      select: VideoImageSelectSchema.optional(),
      include: VideoImageIncludeSchema.optional(),
      data: z.union([
        VideoImageCreateInputSchema,
        VideoImageUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const VideoImageUpsertArgsSchema: z.ZodType<Prisma.VideoImageUpsertArgs> =
  z
    .object({
      select: VideoImageSelectSchema.optional(),
      include: VideoImageIncludeSchema.optional(),
      where: VideoImageWhereUniqueInputSchema,
      create: z.union([
        VideoImageCreateInputSchema,
        VideoImageUncheckedCreateInputSchema,
      ]),
      update: z.union([
        VideoImageUpdateInputSchema,
        VideoImageUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const VideoImageCreateManyArgsSchema: z.ZodType<Prisma.VideoImageCreateManyArgs> =
  z
    .object({
      data: z.union([
        VideoImageCreateManyInputSchema,
        VideoImageCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VideoImageCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VideoImageCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VideoImageCreateManyInputSchema,
        VideoImageCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VideoImageDeleteArgsSchema: z.ZodType<Prisma.VideoImageDeleteArgs> =
  z
    .object({
      select: VideoImageSelectSchema.optional(),
      include: VideoImageIncludeSchema.optional(),
      where: VideoImageWhereUniqueInputSchema,
    })
    .strict();

export const VideoImageUpdateArgsSchema: z.ZodType<Prisma.VideoImageUpdateArgs> =
  z
    .object({
      select: VideoImageSelectSchema.optional(),
      include: VideoImageIncludeSchema.optional(),
      data: z.union([
        VideoImageUpdateInputSchema,
        VideoImageUncheckedUpdateInputSchema,
      ]),
      where: VideoImageWhereUniqueInputSchema,
    })
    .strict();

export const VideoImageUpdateManyArgsSchema: z.ZodType<Prisma.VideoImageUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VideoImageUpdateManyMutationInputSchema,
        VideoImageUncheckedUpdateManyInputSchema,
      ]),
      where: VideoImageWhereInputSchema.optional(),
    })
    .strict();

export const VideoImageDeleteManyArgsSchema: z.ZodType<Prisma.VideoImageDeleteManyArgs> =
  z
    .object({
      where: VideoImageWhereInputSchema.optional(),
    })
    .strict();

export const StripePaymentInfoCreateArgsSchema: z.ZodType<Prisma.StripePaymentInfoCreateArgs> =
  z
    .object({
      select: StripePaymentInfoSelectSchema.optional(),
      include: StripePaymentInfoIncludeSchema.optional(),
      data: z.union([
        StripePaymentInfoCreateInputSchema,
        StripePaymentInfoUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const StripePaymentInfoUpsertArgsSchema: z.ZodType<Prisma.StripePaymentInfoUpsertArgs> =
  z
    .object({
      select: StripePaymentInfoSelectSchema.optional(),
      include: StripePaymentInfoIncludeSchema.optional(),
      where: StripePaymentInfoWhereUniqueInputSchema,
      create: z.union([
        StripePaymentInfoCreateInputSchema,
        StripePaymentInfoUncheckedCreateInputSchema,
      ]),
      update: z.union([
        StripePaymentInfoUpdateInputSchema,
        StripePaymentInfoUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const StripePaymentInfoCreateManyArgsSchema: z.ZodType<Prisma.StripePaymentInfoCreateManyArgs> =
  z
    .object({
      data: z.union([
        StripePaymentInfoCreateManyInputSchema,
        StripePaymentInfoCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const StripePaymentInfoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StripePaymentInfoCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        StripePaymentInfoCreateManyInputSchema,
        StripePaymentInfoCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const StripePaymentInfoDeleteArgsSchema: z.ZodType<Prisma.StripePaymentInfoDeleteArgs> =
  z
    .object({
      select: StripePaymentInfoSelectSchema.optional(),
      include: StripePaymentInfoIncludeSchema.optional(),
      where: StripePaymentInfoWhereUniqueInputSchema,
    })
    .strict();

export const StripePaymentInfoUpdateArgsSchema: z.ZodType<Prisma.StripePaymentInfoUpdateArgs> =
  z
    .object({
      select: StripePaymentInfoSelectSchema.optional(),
      include: StripePaymentInfoIncludeSchema.optional(),
      data: z.union([
        StripePaymentInfoUpdateInputSchema,
        StripePaymentInfoUncheckedUpdateInputSchema,
      ]),
      where: StripePaymentInfoWhereUniqueInputSchema,
    })
    .strict();

export const StripePaymentInfoUpdateManyArgsSchema: z.ZodType<Prisma.StripePaymentInfoUpdateManyArgs> =
  z
    .object({
      data: z.union([
        StripePaymentInfoUpdateManyMutationInputSchema,
        StripePaymentInfoUncheckedUpdateManyInputSchema,
      ]),
      where: StripePaymentInfoWhereInputSchema.optional(),
    })
    .strict();

export const StripePaymentInfoDeleteManyArgsSchema: z.ZodType<Prisma.StripePaymentInfoDeleteManyArgs> =
  z
    .object({
      where: StripePaymentInfoWhereInputSchema.optional(),
    })
    .strict();
