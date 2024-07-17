"use client"
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlogImage, Blog } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useParams, useRouter } from 'next/navigation';

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from '@/components/modals/alert-modal';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import ImageUpload from '@/components/ui/image-upload';

const formSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    writer: z.string().min(1),
    BlogImages: z.object({ url: z.string() }).array(),
})


interface BlogFormProps {
    initialData: Blog & {
        BlogImages: BlogImage[]
    } | null;
}

type BlogFormValues = z.infer<typeof formSchema>

export const BlogForm: React.FC<BlogFormProps> = ({
    initialData,
}) => {


    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Blog" : 'Create Blog';
    const description = initialData ? "Edit a Blog" : 'Add a new Blog';
    const toastMessage = initialData ? "Blog updated." : 'Blog created.';
    const action = initialData ? "Save changes" : 'Create';

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            BlogImages: initialData.BlogImages || [],
        } : {
            title: '',
            content: '',
            writer: '',
            BlogImages: [],
        }
    })

    // Edit Blog

    const onSubmit = async (data: BlogFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/blogs/${params.blogId}`, data);
            } else {
                await axios.post(`/api/blogs`, data);
            }
            router.refresh();
            router.push(`/blogs`);
            router.refresh();
            toast.success(toastMessage);
        } catch (err) {
            toast.error("Something went wrong.");
            console.log("Adding blog error : ", err);
        } finally {
            setLoading(false);
        }
    }

    // Delete Blog
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/blogs/${params.blogId}`);
            router.refresh();
            router.push(`/blogs`);
            router.refresh();
            toast.success("blog deleted successfully.");
        } catch (err) {
            toast.error("Something went wrong deleting blog.");
            console.log("Deleting blog error :", err);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading} />

            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        variant="destructive"
                        size="icon"
                        disabled={loading}
                        onClick={() => setOpen(true)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <FormField
                        control={form.control}
                        name='BlogImages'
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value.map((image) => image.url)}
                                            disabled={loading}
                                            onChange={(url) => field.onChange([...field.value, { url }])}
                                            onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }} />
                    <div className='grid grid-cols-3 gap-8'>
                        {/* Blog Title */}
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='Blog Title' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        {/* Blog content */}
                        <FormField
                            control={form.control}
                            name='content'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='Blog' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        {/* Blog writer */}
                        <FormField
                            control={form.control}
                            name='writer'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='Blog Writer' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        className={cn(
                            'mr-4',
                            loading ? 'cursor-not-allowed' : 'cursor-pointer'
                        )}
                        variant="outline"
                        onClick={() => router.push(`/blogs`)}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        className={cn(
                            'ml-auto',
                            loading ? 'cursor-not-allowed' : 'cursor-pointer'
                        )}
                        type='submit'
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
}