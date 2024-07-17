"use client"
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image, Trip } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useParams, useRouter } from 'next/navigation';

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from '@/components/modals/alert-modal';
import {
    Form,
    FormControl,
    FormDescription,
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
    description: z.string().min(1),
    moreInfos: z.string().min(1),
    keywords: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
})


interface TripFormProps {
    initialData: Trip & {
        Images: Image[]
    } | null;
}

type TripFormValues = z.infer<typeof formSchema>

export const TripForm: React.FC<TripFormProps> = ({
    initialData,
}) => {


    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Trip" : 'Create Trip';
    const description = initialData ? "Edit a Trip" : 'Add a new Trip';
    const toastMessage = initialData ? "Trip updated." : 'Trip created.';
    const action = initialData ? "Save changes" : 'Create';

    const form = useForm<TripFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            images: initialData.Images || [],
        } : {
            title: '',
            description: '',
            moreInfos: '',
            keywords: '',
            images: [],
        }
    })

    // Edit Trip

    const onSubmit = async (data: TripFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/trips/${params.tripId}`, data);
            } else {
                await axios.post(`/api/trips`, data);
            }
            router.refresh();
            router.push(`/trips`);
            router.refresh();
            toast.success(toastMessage);
        } catch (err) {
            toast.error("Something went wrong.");
            console.log("Adding trip error : ", err);
        } finally {
            setLoading(false);
        }
    }

    // Delete Trip
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/trips/${params.tripId}`);
            router.refresh();
            router.push(`/trips`);
            router.refresh();
            toast.success("Trip deleted successfully.");
        } catch (err) {
            toast.error("Something went wrong deleting Trip.");
            console.log("Deleting Trip error :", err);
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
                        name='images'
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
                        {/* Trip Title */}
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='Trip Title' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        {/* Trip Description */}
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='Trip Description' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        {/* Trip more Infos */}
                        <FormField
                            control={form.control}
                            name='moreInfos'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>More Infos</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='Infos must be separated by commas' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        {/* Trip keywords */}
                        <FormField
                            control={form.control}
                            name='keywords'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>keywords</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='keywords must be separated bu a comma' {...field} />
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
                        onClick={() => router.push(`/trips`)}
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