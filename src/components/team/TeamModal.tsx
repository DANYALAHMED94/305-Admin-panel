// "use client";
// import React, { useState, useEffect } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import CategorySelector from "@/components/team/CategoryTree";
// import { createTeam, updateTeam } from "@/services/team";
// import { TeamFull } from "@/types";
// import { useDropzone } from "react-dropzone";
// import { UploadCloud } from "lucide-react";
// import { uploadImage } from "@/utils";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import CategorySelectorDropdown from "./CategorySelectorDropdown";
// import { Checkbox } from "@/components/ui/checkbox"; // Add this import

// interface TeamModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   team?: TeamFull | null;
// }

// const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose, team }) => {
//   const [name, setName] = useState("");
//   const [type, setType] = useState<"general" | "school">("general");
//   const [category, setCategory] = useState<string | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [isSuper7, setIsSuper7] = useState(false); // Add this state

//   const queryClient = useQueryClient();

//   useEffect(() => {
//     if (team) {
//       setName(team.name);
//       setType(team.type);
//       setCategory(team?.category?._id || null);
//       setImageUrl(team.imageUrl || null);
//       setIsSuper7(team.isSuper7 || false); // Initialize from team if it exists
//     } else {
//       setName("");
//       setType("general");
//       setCategory(null);
//       setImageUrl(null);
//       setIsSuper7(false); // Default to false for new teams
//     }
//   }, [team]);

//   const onDrop = async (acceptedFiles: File[]) => {
//     if (acceptedFiles.length > 0) {
//       setUploading(true);
//       const uploadedImageUrl = await uploadImage(acceptedFiles[0]);
//       if (uploadedImageUrl) {
//         setImageUrl(uploadedImageUrl);
//       }
//       setUploading(false);
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: { "image/*": [] },
//     multiple: false,
//   });

//   // Mutation for creating/updating a team
//   const { mutate: saveTeam, isPending } = useMutation({
//     mutationFn: async () => {
//       if (!name || !category || !imageUrl) return;
//       const teamData = { name, type, category, imageUrl, isSuper7 }; // Include isSuper7 in teamData

//       return team
//         ? updateTeam({ id: team._id, teamData })
//         : createTeam(teamData);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["teams"] }); // Refresh teams
//       onClose();
//     },
//     onError: (error) => {
//       console.error("Error saving team", error);
//     },
//   });

//   return (
//     <Transition appear show={isOpen} as={React.Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         <div className="fixed inset-0 bg-black/30 bg-opacity-50" />
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
//             <Dialog.Title className="text-lg font-semibold mb-4">
//               {team ? "Edit Team" : "Add Team"}
//             </Dialog.Title>

//             {/* Team Name Input */}
//             <Input
//               placeholder="Team Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />

//             {/* Type Selection */}
//             <RadioGroup
//               value={type}
//               onValueChange={(value) => setType(value as "general" | "school")}
//               className="my-4 "
//             >
//               <div className="flex items-center space-x-4">
//                 <RadioGroupItem value="general" id="general" />
//                 <label htmlFor="general" className="text-sm font-medium">
//                   General
//                 </label>
//                 <RadioGroupItem value="school" id="school" />
//                 <label htmlFor="school" className="text-sm font-medium">
//                   School
//                 </label>
//               </div>
//             </RadioGroup>

//             {/* Category Selector */}
//             <CategorySelectorDropdown
//               selectedCategory={category}
//               onSelect={setCategory}
//             />

//             {/* Super 7 Checkbox */}
//             <div className="flex items-center space-x-2 my-4">
//               <Checkbox
//                 id="super7"
//                 checked={isSuper7}
//                 onCheckedChange={(checked) => setIsSuper7(checked as boolean)}
//               />
//               <label
//                 htmlFor="super7"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 Do you want to add this team to the super 7?
//               </label>
//             </div>

//             {/* Drag & Drop Upload Section */}
//             <div
//               {...getRootProps()}
//               className="border-2 border-dashed border-gray-300 p-4 rounded-md flex flex-col items-center justify-center cursor-pointer mt-4"
//             >
//               <input {...getInputProps()} />
//               {uploading ? (
//                 <p className="text-sm text-gray-600">Uploading...</p>
//               ) : imageUrl ? (
//                 <img
//                   src={imageUrl}
//                   alt="Uploaded"
//                   className="w-full h-32 object-cover rounded-md"
//                 />
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <UploadCloud className="w-10 h-10 text-gray-400" />
//                   <p className="text-sm text-gray-600">
//                     Drag & Drop or Click to Upload
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-end space-x-2 mt-4">
//               <Button variant="outline" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button
//                 onClick={() => saveTeam()}
//                 disabled={isPending || uploading}
//               >
//                 {isPending ? "Saving..." : "Save"}
//               </Button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default TeamModal;

// "use client";
// import React, { useState, useEffect } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Checkbox } from "@/components/ui/checkbox";
// import { UploadCloud } from "lucide-react";
// import { useDropzone } from "react-dropzone";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { z } from "zod"; // Import zod for validation

// // Import your existing components and services
// import CategorySelectorDropdown from "./CategorySelectorDropdown";
// import { createTeam, updateTeam } from "@/services/team";
// import { TeamFull } from "@/types";
// import { uploadImage } from "@/utils";

// // Define validation schema using Zod
// const teamSchema = z.object({
//   name: z.string().min(1, "Team name is required"),
//   type: z.enum(["general", "school"], {
//     errorMap: () => ({ message: "Team type must be selected" }),
//   }),
//   category: z.string({ required_error: "Category is required" }).min(1, "Category is required"),
//   imageUrl: z.string({ required_error: "Team image is required" }).min(1, "Team image is required"),
//   isSuper7: z.boolean().optional(),
// });

// type FormErrors = {
//   [key in keyof z.infer<typeof teamSchema>]?: string;
// };

// interface TeamModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   team?: TeamFull | null;
// }

// const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose, team }) => {
//   const [name, setName] = useState("");
//   const [type, setType] = useState<"general" | "school">("general");
//   const [category, setCategory] = useState<string | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [isSuper7, setIsSuper7] = useState(false);
  
//   // New state for form errors
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const queryClient = useQueryClient();

//   useEffect(() => {
//     if (team) {
//       setName(team.name);
//       setType(team.type);
//       setCategory(team?.category?._id || null);
//       setImageUrl(team.imageUrl || null);
//       setIsSuper7(team.isSuper7 || false);
//     } else {
//       setName("");
//       setType("general");
//       setCategory(null);
//       setImageUrl(null);
//       setIsSuper7(false);
//     }
    
//     // Reset errors when modal opens/reopens
//     setErrors({});
//     setIsSubmitting(false);
//   }, [team, isOpen]);

//   const onDrop = async (acceptedFiles: File[]) => {
//     if (acceptedFiles.length > 0) {
//       setUploading(true);
//       const uploadedImageUrl = await uploadImage(acceptedFiles[0]);
//       if (uploadedImageUrl) {
//         setImageUrl(uploadedImageUrl);
//         // Clear image error if it exists
//         if (errors.imageUrl) {
//           setErrors((prev) => ({ ...prev, imageUrl: undefined }));
//         }
//       }
//       setUploading(false);
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: { "image/*": [] },
//     multiple: false,
//   });

//   // Validate form data
//   const validateForm = () => {
//     try {
//       teamSchema.parse({
//         name,
//         type,
//         category,
//         imageUrl,
//         isSuper7,
//       });
//       setErrors({});
//       return true;
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const formattedErrors: FormErrors = {};
//         error.errors.forEach((err) => {
//           const path = err.path[0] as keyof FormErrors;
//           formattedErrors[path] = err.message;
//         });
//         setErrors(formattedErrors);
//       }
//       return false;
//     }
//   };

//   // Mutation for creating/updating a team
//   const { mutate: saveTeam, isPending } = useMutation({
//     mutationFn: async () => {
//       const teamData = { 
//         name, 
//         type, 
//         category: category as string, 
//         imageUrl: imageUrl as string, 
//         isSuper7 
//       };

//       return team
//         ? updateTeam({ id: team._id, teamData })
//         : createTeam(teamData);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["teams"] });
//       onClose();
//     },
//     onError: (error) => {
//       console.error("Error saving team", error);
//     },
//   });

//   const handleSubmit = () => {
//     setIsSubmitting(true);
//     const isValid = validateForm();
    
//     if (isValid) {
//       saveTeam();
//     }
//   };

//   // Helper function to determine if a field has an error
//   const getInputClassName = (fieldName: keyof FormErrors) => {
//     return `${errors[fieldName] ? 'border-red-500' : ''}`;
//   };

//   return (
//     <Transition appear show={isOpen} as={React.Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         <div className="fixed inset-0 bg-black/30 bg-opacity-50" />
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
//             <Dialog.Title className="text-lg font-semibold mb-4">
//               {team ? "Edit Team" : "Add Team"}
//             </Dialog.Title>

//             {/* Team Name Input */}
//             <div className="mb-4">
//               <Input
//                 placeholder="Team Name"
//                 value={name}
//                 onChange={(e) => {
//                   setName(e.target.value);
//                   if (errors.name) {
//                     setErrors((prev) => ({ ...prev, name: undefined }));
//                   }
//                 }}
//                 className={getInputClassName("name")}
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//               )}
//             </div>

//             {/* Type Selection */}
//             <div className="mb-4">
//               <RadioGroup
//                 value={type}
//                 onValueChange={(value) => {
//                   setType(value as "general" | "school");
//                   if (errors.type) {
//                     setErrors((prev) => ({ ...prev, type: undefined }));
//                   }
//                 }}
//                 className="my-4"
//               >
//                 <div className="flex items-center space-x-4">
//                   <RadioGroupItem value="general" id="general" />
//                   <label htmlFor="general" className="text-sm font-medium">
//                     General
//                   </label>
//                   <RadioGroupItem value="school" id="school" />
//                   <label htmlFor="school" className="text-sm font-medium">
//                     School
//                   </label>
//                 </div>
//               </RadioGroup>
//               {errors.type && (
//                 <p className="text-red-500 text-sm mt-1">{errors.type}</p>
//               )}
//             </div>

//             {/* Category Selector */}
//             <div className="mb-4">
//               <CategorySelectorDropdown
//                 selectedCategory={category}
//                 onSelect={(value) => {
//                   setCategory(value);
//                   if (errors.category) {
//                     setErrors((prev) => ({ ...prev, category: undefined }));
//                   }
//                 }}
//               />
//               {errors.category && (
//                 <p className="text-red-500 text-sm mt-1">{errors.category}</p>
//               )}
//             </div>

//             {/* Super 7 Checkbox */}
//             <div className="flex items-center space-x-2 my-4">
//               <Checkbox
//                 id="super7"
//                 checked={isSuper7}
//                 onCheckedChange={(checked) => setIsSuper7(checked as boolean)}
//               />
//               <label
//                 htmlFor="super7"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 Do you want to add this team to the super 7?
//               </label>
//             </div>

//             {/* Drag & Drop Upload Section */}
//             <div
//               {...getRootProps()}
//               className={`border-2 border-dashed ${
//                 errors.imageUrl ? 'border-red-500' : 'border-gray-300'
//               } p-4 rounded-md flex flex-col items-center justify-center cursor-pointer mt-4`}
//             >
//               <input {...getInputProps()} />
//               {uploading ? (
//                 <p className="text-sm text-gray-600">Uploading...</p>
//               ) : imageUrl ? (
//                 <img
//                   src={imageUrl}
//                   alt="Uploaded"
//                   className="w-full h-32 object-cover rounded-md"
//                 />
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <UploadCloud className="w-10 h-10 text-gray-400" />
//                   <p className="text-sm text-gray-600">
//                     Drag & Drop or Click to Upload
//                   </p>
//                 </div>
//               )}
//             </div>
//             {errors.imageUrl && (
//               <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
//             )}

//             <div className="flex justify-end space-x-2 mt-4">
//               <Button variant="outline" onClick={onClose} disabled={isPending || uploading}>
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleSubmit}
//                 disabled={isPending || uploading}
//               >
//                 {isPending ? "Saving..." : "Save"}
//               </Button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default TeamModal;























"use client";
import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

// Import your existing components and services
import CategorySelectorDropdown from "./CategorySelectorDropdown";
import { createTeam, updateTeam } from "@/services/team";
import { TeamFull } from "@/types";
import { uploadImage } from "@/utils";

// Define validation schema with better error messages
const teamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  type: z.enum(["general", "school"], {
    errorMap: () => ({ message: "Team type must be selected" }),
  }),
  category: z.string().nullable().refine(val => val !== null, {
    message: "Category is required",
  }),
  imageUrl: z.string().nullable().refine(val => val !== null, {
    message: "Team image is required",
  }),
  isSuper7: z.boolean().optional(),
});

type FormErrors = {
  [key in keyof z.infer<typeof teamSchema>]?: string;
};

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team?: TeamFull | null;
}

const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose, team }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<"general" | "school">("general");
  const [category, setCategory] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSuper7, setIsSuper7] = useState(false);
  
  // Form validation states
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (team) {
      setName(team.name);
      setType(team.type);
      setCategory(team?.category?._id || null);
      setImageUrl(team.imageUrl || null);
      setIsSuper7(team.isSuper7 || false);
    } else {
      setName("");
      setType("general");
      setCategory(null);
      setImageUrl(null);
      setIsSuper7(false);
    }
    
    // Reset errors when modal opens/reopens
    setErrors({});
    setIsSubmitting(false);
  }, [team, isOpen]);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploading(true);
      const uploadedImageUrl = await uploadImage(acceptedFiles[0]);
      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl);
        // Clear image error if it exists
        if (errors.imageUrl) {
          setErrors((prev) => ({ ...prev, imageUrl: undefined }));
        }
      }
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Improved validation function
  const validateForm = () => {
    const formData = {
      name,
      type,
      category,
      imageUrl,
      isSuper7,
    };

    const result = teamSchema.safeParse(formData);
    
    if (result.success) {
      setErrors({});
      return true;
    } else {
      // Format errors to be more user-friendly
      const formattedErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const path = err.path[0] as keyof FormErrors;
        formattedErrors[path] = err.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  // Handle form submission with validation
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Check for specific field errors first
    const newErrors: FormErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Team name is required";
    }
    
    if (!category) {
      newErrors.category = "Category is required";
    }
    
    if (!imageUrl) {
      newErrors.imageUrl = "Team image is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Validate with Zod schema
    const isValid = validateForm();
    
    if (isValid) {
      saveTeam();
    }
  };

  // Mutation for creating/updating a team
  const { mutate: saveTeam, isPending } = useMutation({
    mutationFn: async () => {
      if (!category || !imageUrl) return;
      
      const teamData = { 
        name, 
        type, 
        category, 
        imageUrl, 
        isSuper7 
      };

      return team
        ? updateTeam({ id: team._id, teamData })
        : createTeam(teamData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      onClose();
    },
    onError: (error) => {
      console.error("Error saving team", error);
    },
  });

  // Helper function to determine if a field has an error
  const getInputClassName = (fieldName: keyof FormErrors) => {
    return errors[fieldName] ? 'border-red-500' : '';
  };

  // Prevent modal from closing if there are validation errors
  const handleClose = () => {
    if (isSubmitting && Object.keys(errors).length > 0) {
      // Don't close if submitting and there are errors
      return;
    }
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <div className="fixed inset-0 bg-black/30 bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {team ? "Edit Team" : "Add Team"}
            </Dialog.Title>

            {/* Team Name Input */}
            <div className="mb-4">
              <label htmlFor="team-name" className="block text-sm font-medium text-gray-700 mb-1">
                Team Name
              </label>
              <Input
                id="team-name"
                placeholder="Enter team name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                className={getInputClassName("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Type Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team Type
              </label>
              <RadioGroup
                value={type}
                onValueChange={(value) => {
                  setType(value as "general" | "school");
                  if (errors.type) {
                    setErrors((prev) => ({ ...prev, type: undefined }));
                  }
                }}
              >
                <div className="flex items-center space-x-4">
                  <RadioGroupItem value="general" id="general" />
                  <label htmlFor="general" className="text-sm font-medium">
                    General
                  </label>
                  <RadioGroupItem value="school" id="school" />
                  <label htmlFor="school" className="text-sm font-medium">
                    School
                  </label>
                </div>
              </RadioGroup>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            {/* Category Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <CategorySelectorDropdown
                selectedCategory={category}
                onSelect={(value) => {
                  setCategory(value);
                  if (errors.category) {
                    setErrors((prev) => ({ ...prev, category: undefined }));
                  }
                }}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Super 7 Checkbox */}
            <div className="flex items-center space-x-2 my-4">
              <Checkbox
                id="super7"
                checked={isSuper7}
                onCheckedChange={(checked) => setIsSuper7(checked as boolean)}
              />
              <label
                htmlFor="super7"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add this team to the super 7
              </label>
            </div>

            {/* Drag & Drop Upload Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team Image
              </label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed ${
                  errors.imageUrl ? 'border-red-500' : 'border-gray-300'
                } p-4 rounded-md flex flex-col items-center justify-center cursor-pointer`}
              >
                <input {...getInputProps()} />
                {uploading ? (
                  <p className="text-sm text-gray-600">Uploading...</p>
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="w-full h-32 object-cover rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <UploadCloud className="w-10 h-10 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Drag & Drop or Click to Upload
                    </p>
                  </div>
                )}
              </div>
              {errors.imageUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button 
                variant="outline" 
                onClick={onClose} 
                disabled={isPending || uploading}
                type="button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isPending || uploading}
                type="button"
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TeamModal;