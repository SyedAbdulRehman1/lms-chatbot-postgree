"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: Course
  courseId: string;
};

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({
  initialData,
  courseId
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null); 


  const toggleEdit = () => {
    setIsEditing((current) => !current);
    if (isEditing) {
      setPreviewImage(null); 
    }
  };

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      setPreviewImage(values.imageUrl); 
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }
  // const handleFileChange = async (file: File) => {
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0]; // Get the first file
        const fileURL = URL.createObjectURL(file);

        setPreviewImage(fileURL); 
        const formData = new FormData();
        formData.append("file", file); // Append the file to FormData
  
        try {
          // Upload the file
          const response = await axios.post(`/api/courses/${courseId}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
          // Check if the response has a URL
          if (response.data.url) {
            onSubmit({ imageUrl: response.data.url }); // Update course with the new image URL
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          toast.error("File upload failed");
        }
      } else {
        setPreviewImage(null); // Reset preview if no file is selected
      }
    };
  console.log(initialData.imageUrl,"initialData.imageUrlinitialData.imageUrl")

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              height={100}
              width={100}
              className="object-cover rounded-md"
              // src={initialData.imageUrl}
              src={`${previewImage || initialData.imageUrl}?t=${Date.now()}`} // Append timestamp to URL

            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          {/* <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          /> */}
                <input
        type="file"
        accept="image/*" // Only allow image files
        onChange={handleFileChange}
      />

          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  )
}